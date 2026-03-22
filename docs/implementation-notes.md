# Codex-Ready Implementation Notes

## Priority Sequence
## Phase 0 - Stabilize (Immediate)
1. Fix `ToolActionBlock` compile regression in `components/launchpad/ActiveStageWorkspace.tsx`.
2. Ensure `pnpm -s typecheck` passes.
3. Lock event taxonomy naming conventions before adding new events.

## Phase 1 - Measurement Coverage (Fastest ROI)
1. Instrument missing CTA events on:
   - homepage hero and section CTAs,
   - services hero and timeline CTAs,
   - our-work hero and spotlight CTAs.
2. Replace generic `cta_clicked` with scoped events (`hero_cta_clicked`, `section_cta_clicked`, `final_cta_clicked`).
3. Normalize contact and signals properties to snake_case.

## Phase 2 - Messaging Tightening (Low Conflict)
1. Apply copy standards to top 5 routes first:
   - `/`,
   - `/next-move`,
   - `/services`,
   - `/our-work`,
   - `/contact`.
2. Remove repeated generic phrasing and tighten support lines.
3. Make CTA labels more outcome-explicit.

## Phase 3 - Trust and Proof Upgrade
1. Add one service-specific proof tile per offer section on `/services`.
2. Add one quantified proof callout near final CTA on top routes.
3. Enforce measurable-result requirement for featured case-study cards.

## Phase 4 - SEO and Discoverability
1. Add page-specific OG/Twitter metadata templates for top conversion pages.
2. Replace hardcoded schema URLs with environment-aware `absoluteUrl(...)`.
3. Improve internal linking between offers, cases, tools, and articles.
4. Revisit sitemap `lastModified` strategy for content-aware dates.

## Phase 5 - Experiments
1. Run homepage hero CTA copy test.
2. Run contact form friction test (name field simplification).
3. Run services proof placement test.
4. Run our-work spotlight CTA framing test.

## Acceptance Criteria
- Build and typecheck pass.
- Core CTA instrumentation coverage reaches 100 percent on top 5 routes.
- Contact funnel reports start, submit, error, and success with consistent properties.
- Top-page metadata has route-specific OG/Twitter values.
- At least 3 high-priority experiments are ready with success metrics defined.

