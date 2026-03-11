import { chromium } from 'playwright';

const base = 'http://localhost:3001';
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

for (const vp of viewportSet) {
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
      const resp = await page.goto(base + route, { waitUntil: 'domcontentloaded', timeout: 30000 });
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
      if (pageErrors.length) {
        failures.push({ type: 'pageerror', viewport: vp.name, route, detail: pageErrors.slice(0, 3).join(' | ') });
      }
    } catch (e) {
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
