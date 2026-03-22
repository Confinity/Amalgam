import { expect, test } from "@playwright/test";

const BASE = 'http://localhost:3001';
const VIEWPORTS = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1536, height: 960 },
];

const EXTRA_ROUTES = ['/404', '/_not-found', '/aboutus', '/contactus', '/ourwork', '/schedule', '/review'];

async function getRoutes() {
  const sm = await fetch(`${BASE}/sitemap.xml`);
  if (!sm.ok) throw new Error(`sitemap fetch failed: ${sm.status}`);
  const xml = await sm.text();
  const fromSitemap = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].replace(/^https?:\/\/[^/]+/, '') || '/');
  return [...new Set(['/', ...fromSitemap, ...EXTRA_ROUTES])];
}

test('runtime + overflow audit (core breakpoints)', async ({ browser }) => {
  const routes = await getRoutes();
  const failures = [];

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await context.newPage();

    for (const route of routes) {
      const consoleErrors = [];
      const pageErrors = [];
      page.removeAllListeners('console');
      page.removeAllListeners('pageerror');
      page.on('console', (msg) => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      });
      page.on('pageerror', (err) => pageErrors.push(String(err)));

      try {
        const resp = await page.goto(`${BASE}${route}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
        const status = resp ? resp.status() : 0;
        const allowed404 = route === '/404' || route === '/_not-found';
        if (status >= 400 && !(allowed404 && status === 404)) {
          failures.push(`[http][${vp.name}] ${route} :: ${status}`);
          continue;
        }

        await page.waitForTimeout(300);

        const m = await page.evaluate(() => {
          const doc = document.documentElement;
          const body = document.body;
          return {
            scrollWidth: doc.scrollWidth,
            clientWidth: doc.clientWidth,
            bodyScrollWidth: body ? body.scrollWidth : 0,
          };
        });

        const overflow = (m.scrollWidth - m.clientWidth) > 1 || (m.bodyScrollWidth - m.clientWidth) > 1;
        if (overflow) {
          failures.push(`[overflow][${vp.name}] ${route} :: ${JSON.stringify(m)}`);
        }

        const filteredConsole = consoleErrors.filter((e) => {
          if ((route === '/404' || route === '/_not-found') && e.includes('404 (Not Found)')) return false;
          return true;
        });

        if (filteredConsole.length) {
          failures.push(`[console][${vp.name}] ${route} :: ${filteredConsole.slice(0, 2).join(' | ')}`);
        }
        if (pageErrors.length) {
          failures.push(`[pageerror][${vp.name}] ${route} :: ${pageErrors.slice(0, 2).join(' | ')}`);
        }
      } catch (e) {
        // /review intentionally redirects immediately; ignore transient context-destroy errors there.
        if (route === '/review' && String(e).includes('Execution context was destroyed')) {
          continue;
        }
        failures.push(`[exception][${vp.name}] ${route} :: ${String(e)}`);
      }
    }

    await context.close();
  }

  if (failures.length) {
    console.log(`Audit failures (${failures.length}):`);
    for (const f of failures) console.log(f);
  }

  expect(failures, 'No runtime/overflow issues expected').toEqual([]);
});

