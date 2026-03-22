# Site QA and Governance Checklist

## Release Gates
All items below must pass before launch.

## 1) Copy Standards
- Headline is one idea only.
- Support line is one sentence by default.
- No repeated claim in adjacent blocks.
- CTA labels are specific and non-duplicative for the same page.
- Anti-AI check passes.

## 2) Structure Standards
- Each page has one dominant primary action.
- Secondary actions are clearly subordinate.
- Proof appears before or next to escalation CTA on high-intent pages.
- No section intro exceeds what is needed to support action.

## 3) Visual Standards (Non-refactor QA)
- CTA hierarchy is visually obvious.
- Cards do not create decision clutter.
- Section density remains scannable on mobile.
- Uppercase micro-labels are not overused.

## 4) Conversion Standards
- Primary CTA exists above fold on priority pages.
- Final CTA is aligned to page intent, not generic.
- Contact path has low friction and clear fallback.
- Self-serve and assisted paths are both explicit when relevant.

## 5) Analytics Standards
- Every primary CTA emits one stable event.
- All event names and properties use snake_case.
- Every key funnel has start, progress, and success events.
- No copy-derived analytics dimensions for core reporting keys.

## 6) Metadata and SEO Standards
- Unique title and description for each indexed route.
- Canonical tag present on all indexed routes.
- OG/Twitter metadata defined for top conversion pages.
- Structured data valid and URL-safe for current deployment origin.
- Internal links use intent-rich anchor text.

## 7) Accessibility Standards
- Focus order is logical.
- Keyboard navigation covers nav, forms, dialogs, and disclosures.
- Touch targets are at least 44px on mobile.
- Error and success messages are announced (`aria-live`).
- Color contrast meets AA for text and controls.

## 8) Device QA
- Desktop review at 1280px and 1536px.
- Tablet review at 768px.
- Mobile review at 390px and 320px.
- No horizontal overflow on audited routes.

## 9) Tracking Verification
- Verify event fire in browser devtools for:
  - homepage hero CTA,
  - next-move stage selection,
  - tool start/completion,
  - contact form start/submit/success,
  - case-study filter and open.
- Verify event payload schema matches taxonomy.

## 10) Automation Checks
- `pnpm -s typecheck` must pass.
- `node scripts/next_move_acceptance_audit.mjs` must pass.
- `node scripts/responsive_audit.mjs` must pass.

Current baseline notes:
- Typecheck currently fails on missing `ToolActionBlock` reference in `components/launchpad/ActiveStageWorkspace.tsx:416`.
- Responsive and next-move acceptance scripts pass.

## 11) Content Governance Cadence
- Weekly:
  - review top CTA performance and form funnel.
- Monthly:
  - review copy consistency and trust-proof freshness.
- Quarterly:
  - review metadata, schema coverage, and internal linking map.

## 12) Ownership Model
- Growth/PMM:
  - CTA strategy, experiment backlog, funnel KPI reviews.
- Product/Engineering:
  - event implementation quality, QA automation, routing/metadata integrity.
- Content Lead:
  - copy standards and anti-AI quality checks.

