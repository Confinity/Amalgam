# Amalgam Safe Engineering Execution Plan

Date: 2026-03-16  
Source roadmap: `docs/unified-implementation-roadmap.md` (P1-01 -> P5-04)

## 1) Safety Guardrails
- Use component-safe changes first (logic, analytics, metadata, copy), then visual polish.
- Avoid broad refactors in top-conversion routes until instrumentation and reliability are stable.
- Keep `/launchpad/*` behavior as legacy redirect only; implement behavior on `/next-move/*`.
- For all conversion changes, ship behind explicit QA gates:
  - `pnpm -s typecheck`
  - `node scripts/next_move_acceptance_audit.mjs`
  - `node scripts/responsive_audit.mjs`

## 2) System Impact Map

## Core route files (highest conversion)
- Homepage: `app/page.tsx`
- Your Next Move: `app/next-move/page.tsx`
- What We Offer: `app/services/page.tsx`
- Our Work: `app/our-work/page.tsx`
- Contact: `app/contact/page.tsx`

## Shared component systems involved
- Navigation and global CTA surfaces:
  - `components/navigation/Navbar.tsx`
  - `components/navigation/FooterNav.tsx`
  - `components/navigation.tsx`
- Hero and CTA system:
  - `components/heroes/PageHero.tsx`
  - `components/sections/FinalCtaBand.tsx`
  - `components/contact/ContactHero.tsx`
  - `components/contact/ContactFinalCtaBand.tsx`
- Next Move engine:
  - `components/launchpad/LaunchpadExperience.tsx`
  - `components/launchpad/ActiveStageWorkspace.tsx`
  - `components/launchpad/HeroOrientation.tsx`
  - `components/launchpad/PressureRecognition.tsx`
  - `components/launchpad/StageRail.tsx`
  - `components/launchpad/MobileStageSelectorSheet.tsx`
- Trust/proof and content cards:
  - `components/ui/TrustBand.tsx`
  - `components/ui/TestimonialCard.tsx`
  - `components/ui/RotatingLogoGrid.tsx`
  - `components/cards/CaseStudyCard.tsx`
  - `components/cards/ArticleCard.tsx`
  - `components/sections/CaseStudiesExplorer.tsx`
- Contact and API:
  - `components/contact/ContactIntakeForm.tsx`
  - `app/api/contact/route.ts`

## Layout systems involved
- Global shell: `app/layout.tsx`
- Layout primitives:
  - `components/layout/Container.tsx`
  - `components/layout/Section.tsx`
  - `components/layout/Grid.tsx`
  - `components/layout/Stack.tsx`
- Surface/interaction primitives:
  - `components/ui/Card.tsx`
  - `components/ui/Button.tsx`

## CSS/token system involved
- Global styles and CSS variables: `app/globals.css`
- Design token constants: `lib/tokens.ts`

## Routing and discoverability surfaces
- Redirect/legacy handling:
  - `app/launchpad/*` redirects
  - `next.config.mjs` redirects
  - `lib/redirect-target.ts`
- Metadata/sitemap/robots:
  - `app/layout.tsx`
  - `app/opengraph-image.tsx`
  - `app/sitemap.ts`
  - `app/robots.ts`

## Analytics surfaces
- Current event entry points:
  - `components/tracked-link.tsx`
  - `@vercel/analytics` calls across route/components
- Highest-impact event emitters:
  - `components/navigation/Navbar.tsx`
  - `components/navigation/FooterNav.tsx`
  - `components/sections/FinalCtaBand.tsx`
  - `components/launchpad/LaunchpadExperience.tsx`
  - `components/contact/ContactIntakeForm.tsx`
  - `components/sections/CaseStudiesExplorer.tsx`
  - `components/cards/ArticleCard.tsx`
  - `components/cards/CaseStudyCard.tsx`

## 3) File-Level Plan Per Improvement

## Phase 1 - Critical Improvements

### P1-01 - Next Move compile reliability guard
- Description: Ensure Next Move workspace compiles cleanly and remains guarded by acceptance checks.
- Files that must change:
  - `components/launchpad/ActiveStageWorkspace.tsx` (if regression appears)
  - `scripts/next_move_acceptance_audit.mjs` (add/maintain regression check)
- Components that must change:
  - `ActiveStageWorkspace`
- Layout systems involved:
  - `Section`, `Container` (indirect)
- CSS/token impacts:
  - None expected.
- Routing impacts:
  - None.
- Analytics impacts:
  - None direct.
- Estimated complexity: Low
- Potential risks:
  - Reintroducing stale component references during adjacent Next Move edits.
- Safe implementation order:
  1. Validate `pnpm -s typecheck` baseline.
  2. Patch workspace only if failing.
  3. Lock regression with acceptance script assertions.

### P1-02 - Missing CTA coverage on top conversion pages
- Description: Track hero/section CTAs on homepage, services, our-work, and contact.
- Files that must change:
  - `app/page.tsx`
  - `app/services/page.tsx`
  - `app/our-work/page.tsx`
  - `components/contact/ContactHero.tsx`
  - `components/contact/ContactFinalCtaBand.tsx`
- Components that must change:
  - `HomePage`, `ServicesPage`, `OurWorkPage`, `ContactHero`, `ContactFinalCtaBand`
- Layout systems involved:
  - `PageHero`, `FinalCtaBand`, `Button`
- CSS/token impacts:
  - None expected.
- Routing impacts:
  - None.
- Analytics impacts:
  - Add explicit click coverage for high-intent CTA surfaces.
- Estimated complexity: Medium
- Potential risks:
  - Duplicate events from nested click handlers.
- Safe implementation order:
  1. Add events to top-level CTA surfaces only.
  2. Verify one event per user click in browser devtools.
  3. Roll to secondary CTA surfaces after validation.

### P1-03 - Event taxonomy normalization (`snake_case`, stable ids)
- Description: Replace generic `cta_clicked` drift with stable event naming and `cta_id`.
- Files that must change:
  - `components/tracked-link.tsx`
  - `components/navigation/Navbar.tsx`
  - `components/navigation/FooterNav.tsx`
  - `components/sections/FinalCtaBand.tsx`
  - `components/contact/ContactIntakeForm.tsx`
  - `components/launchpad/LaunchpadExperience.tsx`
  - `components/sections/CaseStudiesExplorer.tsx`
  - `components/cards/ArticleCard.tsx`
  - `components/cards/CaseStudyCard.tsx`
  - New recommended helper: `lib/analytics/taxonomy.ts`
- Components that must change:
  - `TrackedLink`, `Navbar`, `FooterNav`, `FinalCtaBand`, `ContactIntakeForm`, `LaunchpadExperience`, `CaseStudiesExplorer`, `ArticleCard`, `CaseStudyCard`
- Layout systems involved:
  - None direct.
- CSS/token impacts:
  - None.
- Routing impacts:
  - None.
- Analytics impacts:
  - Canonical event names and normalized properties (`cta_id`, `cta_label`, `destination`, etc.).
- Estimated complexity: Medium-High
- Potential risks:
  - Breaking dashboards during event migration.
  - Mixed old/new events if rollout is partial.
- Safe implementation order:
  1. Add taxonomy helper and event contract.
  2. Migrate high-conversion pages first.
  3. Migrate shared components (`TrackedLink`, nav, bands).
  4. Leave temporary compatibility mapping in dashboards.

### P1-04 - Route-specific OG/Twitter metadata on top 5 pages
- Description: Strengthen pre-click message quality and social preview fidelity.
- Files that must change:
  - `app/page.tsx`
  - `app/next-move/page.tsx`
  - `app/services/page.tsx`
  - `app/our-work/page.tsx`
  - `app/contact/page.tsx`
  - `app/layout.tsx` (shared defaults if needed)
  - Optional shared helper: `lib/seo.ts`
- Components that must change:
  - Route `metadata` exports
- Layout systems involved:
  - None.
- CSS/token impacts:
  - None.
- Routing impacts:
  - Canonical/OG consistency only.
- Analytics impacts:
  - None direct.
- Estimated complexity: Medium
- Potential risks:
  - Metadata duplication drift between route files.
- Safe implementation order:
  1. Define metadata helper contract.
  2. Apply top 5 route metadata.
  3. Validate rendered head tags per route.

### P1-05 - Contact conversion reliability and canonical success tracking
- Description: Make contact funnel state unambiguous (`form_started` -> `form_submitted` -> `contact_success`).
- Files that must change:
  - `components/contact/ContactIntakeForm.tsx`
  - `app/api/contact/route.ts`
  - `app/contact/page.tsx` (if success state wiring is needed)
- Components that must change:
  - `ContactIntakeForm`
- Layout systems involved:
  - `ContactHero`, `ContactMethodsStrip`, `ContactFinalCtaBand` (indirect funnel)
- CSS/token impacts:
  - None.
- Routing impacts:
  - Query-param handling for seeded context remains stable.
- Analytics impacts:
  - Canonical `contact_success`; normalized error classes.
- Estimated complexity: Medium
- Potential risks:
  - Breaking submission behavior in production webhook flow.
- Safe implementation order:
  1. Keep API contract backward-compatible.
  2. Add canonical event emission on successful submit.
  3. Verify webhook and fallback path behavior.

## Phase 2 - Structural Improvements

### P2-01 - Reduce Next Move cognitive load
- Description: One dominant action per stage; keep comparisons behind explicit intent.
- Files that must change:
  - `components/launchpad/LaunchpadExperience.tsx`
  - `components/launchpad/ActiveStageWorkspace.tsx`
  - `components/launchpad/PressureRecognition.tsx`
  - `content/launchpad.ts`
- Components that must change:
  - `LaunchpadExperience`, `ActiveStageWorkspace`, `PressureRecognition`
- Layout systems involved:
  - `PageHero`, sticky rail, disclosure stack
- CSS/token impacts:
  - Minor spacing/order updates in workspace sections.
- Routing impacts:
  - None.
- Analytics impacts:
  - Ensure `next_move_stage_selected`, `next_move_comparison_opened`, `tool_started` still fire.
- Estimated complexity: Medium
- Potential risks:
  - Lowering discoverability of alternate paths if disclosure defaults are too aggressive.
- Safe implementation order:
  1. Change content defaults in `content/launchpad.ts`.
  2. Apply UI behavior in workspace.
  3. Re-run Next Move acceptance audit.

### P2-02 - Trust architecture rebuild on top pages
- Description: Place contextual proof before escalation CTA; reduce repeated generic trust bands.
- Files that must change:
  - `app/page.tsx`
  - `app/services/page.tsx`
  - `app/our-work/page.tsx`
  - `app/contact/page.tsx`
  - `components/ui/TrustBand.tsx`
  - `lib/testimonials.ts`
  - `lib/client-logos.ts`
- Components that must change:
  - `TrustBand` and route-level trust placement
- Layout systems involved:
  - `TrustBand`, `Card`, `FinalCtaBand`
- CSS/token impacts:
  - Usually none; optional density tuning in `TrustBand`.
- Routing impacts:
  - None.
- Analytics impacts:
  - Add proof engagement event if links are introduced (`proof_link_clicked`).
- Estimated complexity: Medium
- Potential risks:
  - Over-rotating proof and reducing scan speed.
- Safe implementation order:
  1. Adjust section order on top 5 pages.
  2. Tighten trust copy + proof selection.
  3. Validate mobile fold behavior.

### P2-03 - Service-specific proof modules (services + offer details)
- Description: Attach concrete proof near service selection and escalation CTAs.
- Files that must change:
  - `app/services/page.tsx`
  - `app/founder-review/page.tsx`
  - `app/execution-sprint/page.tsx`
  - `app/outcome-partnership/page.tsx`
  - New recommended component: `components/sections/ServiceProofModule.tsx`
  - `content/offers.ts`
  - `content/caseStudies.ts`
- Components that must change:
  - `ServicesPage`, offer detail pages, new `ServiceProofModule`
- Layout systems involved:
  - `Card`, `Grid`, `FinalCtaBand`
- CSS/token impacts:
  - Minor card density tuning possible.
- Routing impacts:
  - New internal links to `/case-studies/[slug]`.
- Analytics impacts:
  - `proof_link_clicked` from proof module CTA.
- Estimated complexity: Medium
- Potential risks:
  - Linking low-relevance case studies to wrong offer.
- Safe implementation order:
  1. Add offer -> proof mapping in content.
  2. Build proof module component.
  3. Roll to services, then offer detail pages.

### P2-04 - Internal linking spine
- Description: Create intentional discovery path across services, work, take, and next-move tools.
- Files that must change:
  - `app/services/page.tsx`
  - `app/our-work/page.tsx`
  - `app/our-take/page.tsx`
  - `app/next-move/page.tsx`
  - `app/next-move/tools/page.tsx`
  - `app/next-move/guides/page.tsx`
  - `components/cards/CaseStudyCard.tsx`
  - `components/cards/ArticleCard.tsx`
- Components that must change:
  - Route-level CTA/link blocks and content cards
- Layout systems involved:
  - `PageHero`, section action rows, card footer links
- CSS/token impacts:
  - None expected.
- Routing impacts:
  - Internal navigation graph changes only.
- Analytics impacts:
  - Track linked-path transitions (`section_cta_clicked`, `article_opened`, `case_study_opened`).
- Estimated complexity: Medium
- Potential risks:
  - Too many links causing decision overload.
- Safe implementation order:
  1. Define link map by page intent.
  2. Add 1-2 high-value links per section only.
  3. Measure engagement change before expanding.

### P2-05 - Quantified proof standard for case studies
- Description: Ensure each featured case has at least one quantitative outcome.
- Files that must change:
  - `lib/case-studies-data.ts`
  - `content/caseStudies.ts`
  - `components/cards/CaseStudyCard.tsx`
  - `app/case-studies/[slug]/page.tsx`
  - Optional validation script: `scripts/check-case-study-proof.mjs`
- Components that must change:
  - `CaseStudyCard`, case-study detail outcome section
- Layout systems involved:
  - Card stats, outcome grid
- CSS/token impacts:
  - None or minor stat formatting.
- Routing impacts:
  - None.
- Analytics impacts:
  - None direct.
- Estimated complexity: High
- Potential risks:
  - Content debt: missing quantified data for existing studies.
- Safe implementation order:
  1. Add schema/data requirements.
  2. Backfill top featured studies first.
  3. Enforce with script/check.

## Phase 3 - Conversion Improvements (Experimented)

### P3-01 - Homepage hero CTA experiment
- Description: Test primary hero CTA language.
- Files that must change:
  - `app/page.tsx`
  - Recommended experiment infra: `lib/experiments/*`
- Components that must change:
  - `HomePage` hero CTA
- Layout systems involved:
  - `PageHero`, `Button`
- CSS/token impacts:
  - None.
- Routing impacts:
  - None.
- Analytics impacts:
  - Variant-tagged `hero_cta_clicked` + downstream funnel mapping.
- Estimated complexity: Medium
- Potential risks:
  - Uneven traffic allocation without stable assignment.
- Safe implementation order:
  1. Implement deterministic variant assignment.
  2. Fire variant property with event.
  3. Verify event split quality.

### P3-02 - Contact form friction experiment (single-name variant)
- Description: Compare current first+last flow vs single-name flow.
- Files that must change:
  - `components/contact/ContactIntakeForm.tsx`
  - `app/api/contact/route.ts`
  - `app/contact/page.tsx` (if variant entry)
- Components that must change:
  - `ContactIntakeForm`
- Layout systems involved:
  - Form layout grid and validation messaging
- CSS/token impacts:
  - Minor form spacing updates.
- Routing impacts:
  - None.
- Analytics impacts:
  - `form_started`, `form_submitted`, `contact_success` with `variant`.
- Estimated complexity: Medium
- Potential risks:
  - Breaking backend required-field assumptions.
- Safe implementation order:
  1. Make API accept both payload shapes.
  2. Add UI variant toggle.
  3. Validate success/error handling for both.

### P3-03 - Services proof placement experiment
- Description: Test proof module placement relative to CTA.
- Files that must change:
  - `app/services/page.tsx`
  - `components/sections/ServiceProofModule.tsx` (if created)
- Components that must change:
  - `ServicesPage`, proof component
- Layout systems involved:
  - Section ordering and CTA container
- CSS/token impacts:
  - None expected.
- Routing impacts:
  - None.
- Analytics impacts:
  - `section_cta_clicked` by variant and surface.
- Estimated complexity: Medium
- Potential risks:
  - Layout jump/regression on mobile if section reorder is not stable.
- Safe implementation order:
  1. Introduce reorder flag only.
  2. Keep content identical between variants.
  3. Validate CLS/mobile rendering.

### P3-04 - Our Work spotlight CTA framing experiment
- Description: Test case-study spotlight CTA copy framing.
- Files that must change:
  - `app/our-work/page.tsx`
- Components that must change:
  - `OurWorkPage` spotlight block
- Layout systems involved:
  - Spotlight card CTA stack
- CSS/token impacts:
  - None.
- Routing impacts:
  - None.
- Analytics impacts:
  - Variant-tagged `section_cta_clicked` and `case_study_opened`.
- Estimated complexity: Low
- Potential risks:
  - None major; copy-only variant.
- Safe implementation order:
  1. Add variant text only.
  2. Validate event payload includes variant.

### P3-05 - Stage-aware final CTA copy experiment (Next Move)
- Description: Test final CTA copy variants by stage context.
- Files that must change:
  - `components/launchpad/LaunchpadExperience.tsx`
  - `content/launchpad.ts`
  - `components/sections/FinalCtaBand.tsx` (if variant prop needed)
- Components that must change:
  - `LaunchpadExperience`, `FinalCtaBand`
- Layout systems involved:
  - Final CTA band
- CSS/token impacts:
  - None.
- Routing impacts:
  - None.
- Analytics impacts:
  - `final_cta_clicked` with `stage_id`, `variant`.
- Estimated complexity: Medium
- Potential risks:
  - Copy/content mismatch for some stage variants.
- Safe implementation order:
  1. Variant map in content.
  2. Variant selection in experience component.
  3. Validate per-stage payload correctness.

## Phase 4 - Polish and Consistency

### P4-01 - Sitewide copy standardization
- Description: Apply headline/support/CTA and anti-AI checks across top and secondary pages.
- Files that must change:
  - `content/site.ts`
  - `content/offers.ts`
  - `content/launchpad.ts`
  - `content/knowledge.ts`
  - `content/careers.ts`
  - `content/team.ts`
  - Route pages with inline copy (`app/*/page.tsx` for top 10 pages)
- Components that must change:
  - Route-level copy blocks, CTA labels, section intros
- Layout systems involved:
  - `PageHero`, `FinalCtaBand`, `Card`
- CSS/token impacts:
  - None.
- Routing impacts:
  - None.
- Analytics impacts:
  - Ensure copy edits do not alter stable analytics IDs.
- Estimated complexity: Medium
- Potential risks:
  - Inconsistent voice if updates are done page-by-page without checklist.
- Safe implementation order:
  1. Update content sources first.
  2. Update inline route copy second.
  3. Run copy QA checklist before merge.

### P4-02 - Component-safe visual hierarchy rhythm
- Description: Improve scanability via spacing/surface consistency without layout rewrite.
- Files that must change:
  - `app/globals.css`
  - `lib/tokens.ts`
  - `components/heroes/PageHero.tsx`
  - `components/ui/Card.tsx`
  - `components/sections/FinalCtaBand.tsx`
  - `components/layout/Section.tsx`
- Components that must change:
  - `PageHero`, `Card`, `FinalCtaBand`, section spacing primitives
- Layout systems involved:
  - `Section`, `Container`, shared utility classes
- CSS/token impacts:
  - Yes (spacing/surface variables and utility class tuning).
- Routing impacts:
  - Global visual effect across all pages.
- Analytics impacts:
  - None.
- Estimated complexity: Medium
- Potential risks:
  - Broad visual regressions due global CSS changes.
- Safe implementation order:
  1. Modify tokens only.
  2. Apply to shared components.
  3. Regressions test on priority routes first.

### P4-03 - Interaction polish + accessibility hardening
- Description: Tighten mobile sticky CTA behavior, keyboard/focus, and disclosure ergonomics.
- Files that must change:
  - `components/launchpad/LaunchpadExperience.tsx`
  - `components/launchpad/StageRail.tsx`
  - `components/launchpad/MobileStageSelectorSheet.tsx`
  - `components/navigation/Navbar.tsx`
  - `components/contact/ContactIntakeForm.tsx`
  - `scripts/next_move_acceptance_audit.mjs`
  - `scripts/responsive_audit.mjs`
- Components that must change:
  - Next Move interaction layer, nav mobile menu, contact form accessibility
- Layout systems involved:
  - Sticky components and disclosure stack
- CSS/token impacts:
  - Small focus/spacing updates possible.
- Routing impacts:
  - None.
- Analytics impacts:
  - Ensure no duplicate CTA fires after interaction changes.
- Estimated complexity: Medium
- Potential risks:
  - Focus trap bugs on mobile dialogs/menu.
- Safe implementation order:
  1. Keyboard/focus fixes first.
  2. Sticky CTA trigger tuning second.
  3. Re-run acceptance/responsive audits.

### P4-04 - Secondary-route analytics coverage
- Description: Add nurture-route events for Our Take, Team, Careers paths.
- Files that must change:
  - `components/cards/ArticleCard.tsx`
  - `app/our-take/page.tsx`
  - `app/our-take/[slug]/page.tsx`
  - `app/careers/page.tsx`
  - `components/cards/RoleCard.tsx`
  - `app/team/page.tsx`
- Components that must change:
  - `ArticleCard`, `RoleCard`, route CTA surfaces
- Layout systems involved:
  - None direct.
- CSS/token impacts:
  - None.
- Routing impacts:
  - None.
- Analytics impacts:
  - `article_opened`, `careers_interest`, team exploration events.
- Estimated complexity: Low-Medium
- Potential risks:
  - Event inflation from noisy low-value interactions.
- Safe implementation order:
  1. Implement only intent-rich events.
  2. Validate payload minimality.

## Phase 5 - Long-Term Optimizations

### P5-01 - Experiment operations layer
- Description: Add reusable experiment assignment and tracking governance.
- Files that must change:
  - New:
    - `lib/experiments/types.ts`
    - `lib/experiments/assign.ts`
    - `lib/experiments/registry.ts`
    - `docs/experiment-registry.md`
  - Consumers in experimental routes:
    - `app/page.tsx`
    - `app/services/page.tsx`
    - `app/our-work/page.tsx`
    - `components/contact/ContactIntakeForm.tsx`
    - `components/launchpad/LaunchpadExperience.tsx`
- Components that must change:
  - All experiment-enabled route components
- Layout systems involved:
  - None.
- CSS/token impacts:
  - None.
- Routing impacts:
  - Optional query override support for QA.
- Analytics impacts:
  - Add `experiment_id`, `variant_id` on key events.
- Estimated complexity: High
- Potential risks:
  - Non-deterministic bucketing causing noisy results.
- Safe implementation order:
  1. Build assignment + registry layer.
  2. Enable one experiment first.
  3. Expand only after assignment QA passes.

### P5-02 - Funnel/attribution dashboards aligned to taxonomy
- Description: Build decision-ready dashboard layer.
- Files that must change:
  - New recommended docs:
    - `docs/analytics-dashboard-spec.md`
    - `docs/event-dictionary.md`
  - Optional validation tooling:
    - `scripts/check-analytics-schema.mjs`
- Components that must change:
  - None required in UI.
- Layout systems involved:
  - None.
- CSS/token impacts:
  - None.
- Routing impacts:
  - None.
- Analytics impacts:
  - Uses normalized event model from P1-03/P4-04.
- Estimated complexity: Medium
- Potential risks:
  - Dashboard mismatch if event migration not fully complete.
- Safe implementation order:
  1. Freeze taxonomy.
  2. Ship event dictionary.
  3. Build dashboard queries.

### P5-03 - Rules-based personalization (stage-aware proof/content)
- Description: Personalize recommendations by stage/pressure with deterministic rules.
- Files that must change:
  - `components/launchpad/LaunchpadExperience.tsx`
  - `content/launchpad.ts`
  - `lib/launchpad.ts`
  - `app/our-work/page.tsx`
  - `app/our-take/page.tsx`
- Components that must change:
  - `LaunchpadExperience`, route-level featured recommendations
- Layout systems involved:
  - Next Move stage workspace, spotlight modules
- CSS/token impacts:
  - Minimal.
- Routing impacts:
  - None.
- Analytics impacts:
  - Track recommendation exposure + click-through by stage.
- Estimated complexity: High
- Potential risks:
  - Incorrect personalization reducing trust if context mapping is wrong.
- Safe implementation order:
  1. Start with transparent rules only.
  2. Add opt-out/default fallback.
  3. Validate lift before expanding scope.

### P5-04 - Content governance automation
- Description: Add repeatable freshness/metadata/schema checks.
- Files that must change:
  - New scripts:
    - `scripts/check-content-freshness.mjs`
    - `scripts/check-metadata-consistency.mjs`
    - `scripts/check-schema-validity.mjs`
  - CI workflow:
    - `.github/workflows/content-governance.yml`
  - Existing metadata surfaces:
    - `app/sitemap.ts`
    - `app/layout.tsx`
    - route metadata files under `app/**/page.tsx`
- Components that must change:
  - None required in UI.
- Layout systems involved:
  - None.
- CSS/token impacts:
  - None.
- Routing impacts:
  - Metadata consistency and indexability only.
- Analytics impacts:
  - None direct.
- Estimated complexity: Medium
- Potential risks:
  - False positives causing CI noise.
- Safe implementation order:
  1. Build report-only mode.
  2. Tune thresholds.
  3. Turn on blocking checks for high-signal failures.

## 4) Parallelization Plan

## Can be parallelized safely
- Lane A (Analytics):
  - P1-02, P1-03, P4-04
- Lane B (Metadata/SEO):
  - P1-04, portions of P5-04
- Lane C (Contact reliability):
  - P1-05, then P3-02
- Lane D (Next Move UX):
  - P2-01, P3-05, P4-03
- Lane E (Trust/content):
  - P2-02, P2-03, P2-05, P4-01
- Lane F (Visual consistency):
  - P4-02 only after P2 structural work stabilizes

## Must stay sequential
1. P1-03 before P3 experiments (otherwise measurement invalid).
2. P1-05 before P3-02 (contact experiment depends on reliable baseline).
3. P2-03 before P3-03 (must have proof module before testing placement).
4. P2-01 before P3-05 (stage CTA variant tests require stable stage flow).
5. P3 test cycle before P4 broad polish and P5 ops expansion.

## 5) Highest Regression-Risk Areas
- Next Move stage state and disclosure logic (`LaunchpadExperience` + `ActiveStageWorkspace`).
- Contact form validation and API payload compatibility (`ContactIntakeForm` + `/api/contact`).
- Global analytics changes in shared components (`TrackedLink`, nav, final CTA bands).
- Global style token changes in `app/globals.css` and `components/ui/Card.tsx`.
- Route metadata edits for top pages (risk of duplicate/incorrect OG tags).

## 6) Extra QA Required

## Functional QA
- Top 5 pages:
  - CTA click paths, final CTA, and route transitions.
- Contact:
  - success/failure paths, fallback messaging, webhook + local fallback.
- Next Move:
  - stage select, pressure map, comparison toggle, sticky CTA visibility.

## Analytics QA
- Verify one event per interaction on:
  - homepage hero CTA
  - services hero/final CTA
  - our-work spotlight CTA
  - next-move stage selection/tool start
  - contact form start/submit/success/error
- Validate required payloads:
  - `cta_id`, `destination`, `page_path`, `variant` (for experiments)

## Responsive + accessibility QA
- Keyboard-only navigation:
  - header mobile menu
  - mobile stage selector dialog
  - contact form error focus
- Viewports:
  - 320, 390, 768, 1280, 1536
- Scripts:
  - `node scripts/next_move_acceptance_audit.mjs`
  - `node scripts/responsive_audit.mjs`

## SEO QA
- Inspect rendered head tags for top 5 pages:
  - title, description, canonical, OG title/description/image, Twitter card.
- Verify sitemap includes canonical target routes only.

## 7) Safe Step-by-Step Execution Sequence

1. Stabilize baseline (P1-01).
2. Add missing CTA coverage (P1-02).
3. Normalize event taxonomy and payloads (P1-03).
4. Ship top-5 route metadata upgrades (P1-04).
5. Harden contact success/error baseline (P1-05).
6. Reduce Next Move cognitive load (P2-01).
7. Reorder/tighten trust on top pages (P2-02).
8. Add service-specific proof modules (P2-03).
9. Add internal-linking spine (P2-04).
10. Enforce quantified case-study proof model (P2-05).
11. Launch controlled experiments P3-01 through P3-05.
12. Apply copy consistency pass (P4-01).
13. Apply component-safe visual rhythm pass (P4-02).
14. Hardening pass for interaction/accessibility (P4-03).
15. Add secondary-route analytics coverage (P4-04).
16. Introduce experiment operations layer (P5-01).
17. Build analytics dashboards/specs (P5-02).
18. Roll out rules-based personalization (P5-03).
19. Enable governance automation in CI (P5-04).

This order minimizes risk by locking reliability and measurement before structural and conversion experiments, then polishing only after signal quality is trustworthy.
