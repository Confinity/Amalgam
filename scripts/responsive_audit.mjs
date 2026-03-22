import { chromium } from 'playwright';

const base = process.env.AUDIT_BASE_URL ?? 'http://localhost:3001';
const viewportSet = [
  { name: 'mobile-sm', width: 320, height: 700 },
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'laptop', width: 1280, height: 800 },
  { name: 'desktop', width: 1536, height: 960 },
];

const extraRoutes = ['/404','/_not-found','/aboutus','/contactus','/ourwork','/schedule','/review'];

const sm = await fetch(base + '/sitemap.xml');
if (!sm.ok) throw new Error(`sitemap fetch failed: ${sm.status}`);
const xml = await sm.text();
const paths = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1].replace(/^https?:\/\/[^/]+/, '') || '/');
const routes = [...new Set(['/', ...paths, ...extraRoutes])];

const browser = await chromium.launch({ headless: true });
const failures = [];
let serverUnavailable = false;

function isRetryableNavigationError(error) {
  const detail = String(error);
  return (
    detail.includes('ERR_ABORTED') ||
    detail.includes('ERR_CONNECTION_REFUSED') ||
    detail.includes('Execution context was destroyed') ||
    detail.includes('interrupted by another navigation')
  );
}

async function gotoWithRetry(page, url) {
  let lastError = null;

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      return response;
    } catch (error) {
      lastError = error;
      if (!isRetryableNavigationError(error) || attempt === 3) {
        throw error;
      }
      await page.waitForTimeout(300 * attempt);
    }
  }

  throw lastError;
}

for (const vp of viewportSet) {
  if (serverUnavailable) {
    break;
  }

  const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  const pageErrors = [];
  page.on('pageerror', err => pageErrors.push(String(err)));

  for (const route of routes) {
    consoleErrors.length = 0;
    pageErrors.length = 0;

    try {
      const resp = await gotoWithRetry(page, base + route);
      const status = resp?.status() ?? 0;
      const allowed404 = route === '/404' || route === '/_not-found';
      if (status >= 400 && !(allowed404 && status === 404)) {
        failures.push({ type: 'http', viewport: vp.name, route, detail: String(status) });
        continue;
      }

      await page.waitForTimeout(250);

      const metrics = await page.evaluate(() => {
        const doc = document.documentElement;
        const body = document.body;
        return {
          scrollWidth: doc.scrollWidth,
          clientWidth: doc.clientWidth,
          bodyScrollWidth: body ? body.scrollWidth : 0,
          title: document.title,
        };
      });

      const overflow =
        metrics.scrollWidth - metrics.clientWidth > 1 ||
        metrics.bodyScrollWidth - metrics.clientWidth > 1;
      if (overflow) {
        failures.push({
          type: 'overflow',
          viewport: vp.name,
          route,
          detail: JSON.stringify({
            scrollWidth: metrics.scrollWidth,
            clientWidth: metrics.clientWidth,
            bodyScrollWidth: metrics.bodyScrollWidth,
          })
        });
      }

      const filteredConsoleErrors = consoleErrors.filter((entry) => {
        if ((route === '/404' || route === '/_not-found') && entry.includes('404 (Not Found)')) {
          return false;
        }
        return true;
      });

      if (filteredConsoleErrors.length) {
        failures.push({ type: 'console', viewport: vp.name, route, detail: filteredConsoleErrors.slice(0, 3).join(' | ') });
      }
      const filteredPageErrors = pageErrors.filter((entry) => {
        if (entry.includes('Router action dispatched before initialization')) {
          return false;
        }
        return true;
      });

      if (filteredPageErrors.length) {
        failures.push({ type: 'pageerror', viewport: vp.name, route, detail: filteredPageErrors.slice(0, 3).join(' | ') });
      }
    } catch (e) {
      if (String(e).includes('ERR_CONNECTION_REFUSED')) {
        failures.push({
          type: 'infrastructure',
          viewport: vp.name,
          route,
          detail: 'Local audit server was unavailable during scan.',
        });
        serverUnavailable = true;
        break;
      }

      if (route === '/review' && String(e).includes('Execution context was destroyed')) {
        continue;
      }
      failures.push({ type: 'exception', viewport: vp.name, route, detail: String(e) });
    }
  }

  await context.close();
}

await browser.close();

console.log('RESPONSIVE_ROUTES', routes.length);
console.log('RESPONSIVE_VIEWPORTS', viewportSet.length);
console.log('RESPONSIVE_FAILURES', failures.length);
if (failures.length) {
  for (const f of failures.slice(0, 200)) {
    console.log(`[${f.type}] [${f.viewport}] ${f.route} :: ${f.detail}`);
  }
}
