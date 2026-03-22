import { chromium } from 'playwright';

const BASE = process.env.AUDIT_BASE_URL ?? 'http://localhost:3001';

async function runDesktopChecks() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const page = await context.newPage();
  const failures = [];

  await page.goto(`${BASE}/next-move/`, { waitUntil: 'networkidle' });

  const defaultStage = await page.textContent('#ynm-stage-header h2');
  if (!defaultStage?.includes('Stage 1: Ideate & Prioritize')) {
    failures.push(`Default stage mismatch: ${defaultStage ?? 'missing'}`);
  }

  const breakDisclosure = page.locator('button[aria-controls="ynm-disclosure-breakpoints"]');
  if ((await breakDisclosure.getAttribute('aria-expanded')) !== 'false') {
    failures.push('Breakpoints disclosure should default to collapsed.');
  }

  const pressureCard = page.getByRole('button', { name: /building is slower than expected/i }).first();
  await pressureCard.click();
  await page.waitForTimeout(400);

  const pressureCue = await page.textContent('#ynm-pressure');
  if (!pressureCue?.toLowerCase().includes('this likely maps to build & ship')) {
    failures.push('Pressure cue did not map to Build & Ship.');
  }

  const mappedStage = await page.textContent('#ynm-stage-header h2');
  if (!mappedStage?.includes('Stage 3: Build & Ship')) {
    failures.push(`Pressure routing stage mismatch: ${mappedStage ?? 'missing'}`);
  }

  const finalCtaHeadline = await page.textContent('#ynm-final-cta-band h2');
  if (!finalCtaHeadline?.trim()) {
    failures.push('Final CTA headline was missing for stage 3.');
  } else if (!/delivery|build|ship/i.test(finalCtaHeadline)) {
    failures.push(`Final CTA did not appear stage-aware for stage 3: ${finalCtaHeadline}`);
  }

  await page.goto(`${BASE}/next-move/?stage=validate`, { waitUntil: 'networkidle' });
  const aliasStage = await page.textContent('#ynm-stage-header h2');
  if (!aliasStage?.includes('Stage 2: Validate & De-risk')) {
    failures.push(`Alias query stage mismatch: ${aliasStage ?? 'missing'}`);
  }

  await page.goto(`${BASE}/next-move/#stage-build`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  const hashStage = await page.textContent('#ynm-stage-header h2');
  if (!hashStage?.includes('Stage 3: Build & Ship')) {
    failures.push(`Hash stage mismatch: ${hashStage ?? 'missing'}`);
  }

  await context.close();
  await browser.close();
  return failures;
}

async function runMobileChecks() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  const failures = [];

  await page.goto(`${BASE}/next-move/`, { waitUntil: 'networkidle' });

  const mobileStageButton = page
    .getByRole('button', { name: /current stage|stage\s+\d+/i })
    .first();

  if (!(await mobileStageButton.isVisible())) {
    failures.push('Mobile stage selector trigger button was not visible.');
    await context.close();
    await browser.close();
    return failures;
  }

  await mobileStageButton.click();

  const dialog = page.locator('#ynm-mobile-stage-selector');
  if (!(await dialog.isVisible())) {
    failures.push('Mobile stage selector dialog did not open.');
    await context.close();
    await browser.close();
    return failures;
  }

  const scaleStageOption = dialog
    .getByRole('button', { name: /scale\s*&\s*stabilize/i })
    .first();

  if (!(await scaleStageOption.isVisible())) {
    failures.push('Stage 5 option was not visible in the mobile selector.');
    await context.close();
    await browser.close();
    return failures;
  }

  await scaleStageOption.click();
  await page.waitForTimeout(400);

  const selectedStage = await page.textContent('#ynm-stage-header h2');
  if (!selectedStage?.includes('Stage 5: Scale & Stabilize')) {
    failures.push(`Mobile stage selection failed: ${selectedStage ?? 'missing'}`);
  }

  await page.locator('#ynm-next-move-block').scrollIntoViewIfNeeded();
  await page.waitForTimeout(350);

  const stickyCta = page.getByRole('link', { name: /run the scale readiness check/i }).first();
  if (!(await stickyCta.isVisible())) {
    failures.push('Mobile sticky primary CTA did not appear after next move section.');
  }

  await context.close();
  await browser.close();
  return failures;
}

(async () => {
  const failures = [
    ...(await runDesktopChecks()),
    ...(await runMobileChecks()),
  ];

  if (failures.length) {
    console.log('NEXT_MOVE_ACCEPTANCE_FAIL');
    for (const failure of failures) {
      console.log(`- ${failure}`);
    }
    process.exit(1);
  }

  console.log('NEXT_MOVE_ACCEPTANCE_PASS');
})();
