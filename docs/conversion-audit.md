# Amalgam Conversion System Audit

Date: 2026-03-16  
Mode: Parallel audit lane (no broad UI refactors)

## 1) Executive Verdict
Overall quality: **strong foundation, not yet a disciplined conversion operating system**.

- Strongest elements:
  - Clear top-level positioning and differentiated offer architecture.
  - Strong self-serve funnel design in `Your Next Move`.
  - Good route hygiene with legacy redirects and canonical tags on core pages.
  - Contact funnel has robust validation and meaningful event coverage.
- Biggest weaknesses:
  - CTA tracking is incomplete on high-value routes.
  - CTA language is over-reused (`Book a strategy call`, `Need a clear next step`) and flattens hierarchy.
  - Trust blocks are present but often repetitive and not stage-specific.
  - Event taxonomy has naming/property drift that blocks clean analysis.
  - SEO social metadata is mostly global, not page-specific.
- Fastest wins:
  - Fix analytics gaps on homepage/services/our-work hero and section CTAs.
  - Replace generic `cta_clicked` with scoped CTA events.
  - Standardize event properties to snake_case.
  - Tighten repeated support copy and CTA labels.
  - Add page-level OG/Twitter metadata templates for key routes.
- Biggest risks if unchanged:
  - Attribution blind spots on primary conversion paths.
  - Proof fatigue from repeated trust patterns with low specificity.
  - Higher experimentation cost due inconsistent event schema.
  - Lower share/search performance because most pages inherit generic social metadata.

## Audit Evidence Snapshot
- `pnpm -s typecheck` currently fails:
  - `components/launchpad/ActiveStageWorkspace.tsx:416`
  - `Cannot find name 'ToolActionBlock'`.
- Existing QA scripts:
  - `node scripts/next_move_acceptance_audit.mjs` -> pass.
  - `node scripts/responsive_audit.mjs` -> pass (56 routes, 5 viewports, 0 failures).

## 2) What Is Already Working (Preserve)
- **Homepage information architecture** is clear:
  - Problem signals -> offer framing -> trust -> case studies -> knowledge -> final CTA.
- **Your Next Move** is the strongest conversion system component:
  - Stage mapping, pressure recognition, tool pathways, escalation logic, and stage-aware final CTAs.
- **Contact UX** has practical reassurance:
  - Human response-time promise, clear microcopy, and sensible validation.
- **Case study explorer** is genuinely useful:
  - Filtering by problem/stage/industry/service supports relevance-first browsing.
- **Legacy route redirects** reduce dead-end traffic:
  - `/aboutus`, `/contactus`, `/ourwork`, `/launchpad/*`, `/knowledge/*` all route correctly.

What not to overcorrect:
- Do not remove the self-serve + assisted dual-path model.
- Do not collapse all CTAs into one universal phrase.
- Do not add heavy visual changes in this lane.

## 3) Whole-Site Conversion Problems
### CTA Issues
- High-frequency reuse of the same CTA language reduces specificity.
- High-value pages rely heavily on shared CTA components but not all primary buttons are tracked.
- Generic `cta_clicked` event obscures route and intent context (`components/sections/FinalCtaBand.tsx:62`, `:77`).

### Proof and Trust Issues
- Trust is visible, but often repeated with similar framing:
  - Reused trust-band structure across major pages can feel decorative.
- Offer detail pages are light on concrete, quantified outcomes.
- Some case-study outcomes are strong narratively but weak numerically.

### Friction Issues
- Contact form requires first + last name, which adds entry friction for early-intent visitors.
- Interest routing exists via URL params, but there is no visible in-form interest selector.
- Production contact reliability depends on `CONTACT_WEBHOOK_URL`; otherwise submission is unavailable.

### Messaging Issues
- Repeated phrases across routes dilute sharpness:
  - `clear next step`, `under pressure`, `keep momentum`.
- Support lines are often one clause too long and lose rhythm.
- Some long-form sections (especially the flagship self-case-study) read repetitive and over-explained.

### Mobile Issues
- Responsive checks passed. No route-level overflow defects in current automated sweep.
- Remaining mobile risk is cognitive, not layout: high information density in stage workspace.

### Analytics Issues
- Event naming and property schema are inconsistent (snake_case and camelCase mix).
- Semantically similar events exist under multiple names (`launchpad_tool_complete` and `ynm_stage_tool_completed`).
- High-intent button clicks on homepage/services/our-work are mostly untracked because many `Button` links have no `onClick` tracking hook.

## 4) High-Priority Page Review
## Homepage (`/`)
Page purpose:
- Convert uncertain visitors into either:
  - self-serve stage discovery (`/next-move`), or
  - assisted support (`/contact`).

Current strengths:
- Strong problem-to-action narrative.
- Good journey from symptom to support options.
- Featured work and knowledge provide depth and credibility.

Current weaknesses:
- Critical CTAs are not explicitly tracked.
- Trust framing is broad and repeated.
- CTA labels are clear but not always specific to user state.

Conversion issues:
- Hero and section button instrumentation is absent (`app/page.tsx:59`, `:62`, `:133`).
- Primary CTA `Find my stage` is useful but non-specific in expected outcome/time.

Trust issues:
- Trust band is useful but generic; not tied to stage-specific proof.

Copy issues:
- Repetition of clarity/momentum language across adjacent sections.

CTA issues:
- Multiple good options, but weak event visibility on which option wins.

Recommended improvements:
- Track hero and section CTAs with route-scoped events.
- Update primary CTA to an outcome-framed label (example: `Map my stage in 2 minutes`).
- Pair trust band with 1 contextual metric callout from a matching case study.

## Your Next Move (`/next-move`)
Page purpose:
- Diagnose stage and pressure, then route users to the best self-serve or support path.

Current strengths:
- Best conversion logic in the site.
- Strong stage-aware pathways and escalation options.
- Most mature event coverage in the product.

Current weaknesses:
- Typecheck regression in core workspace component.
- Event schema drift and duplication.
- Cognitive load can spike due stacked disclosure surfaces.

Conversion issues:
- Multiple action surfaces can dilute focus for first-time users.

Trust issues:
- Proof is present but should include more measurable outcomes.

Copy issues:
- Some stage descriptions and support logic are verbose.

CTA issues:
- Good stage-aware CTA model, but analytics naming needs normalization.

Recommended improvements:
- Fix `ToolActionBlock` regression first (`components/launchpad/ActiveStageWorkspace.tsx:416`).
- Keep one dominant action visible above fold in workspace.
- Consolidate event names/properties under one next-move taxonomy.

## What We Offer (`/services`)
Page purpose:
- Help visitors choose support depth and move to contact.

Current strengths:
- Clear tier structure and progression.
- `No drawn-out sales process` reassurance is conversion-positive.

Current weaknesses:
- Weak service-specific proof near service decisions.
- Hero and timeline CTAs are largely untracked.

Conversion issues:
- Service cards and timeline buttons need click visibility.

Trust issues:
- Trust section is credible but repeated from other pages without new proof.

Copy issues:
- Several statements are strong but interchangeable with other pages.

CTA issues:
- Primary CTA is consistent but not context-tuned by service interest.

Recommended improvements:
- Add one proof snippet per service (result + context + link) directly near each service CTA.
- Instrument all service-card and timeline CTA interactions.

## Our Work (`/our-work`)
Page purpose:
- Match prospects to similar situations and drive contact escalation.

Current strengths:
- Situation-first filtering is strong.
- Explorer interaction events exist and are useful.

Current weaknesses:
- Hero and spotlight CTA clicks are not tracked.
- Case-study URL strategy is split (`/our-work` hub vs `/case-studies/*` details).
- Proof quality varies; many outcomes lack hard metrics.

Conversion issues:
- You cannot measure hero and spotlight influence reliably.

Trust issues:
- Some cards feel narrative but not decisively evidential.

Copy issues:
- Many summaries are long and similar in tone.

CTA issues:
- `Read case study`, `Explore full library`, and `Book a strategy call` hierarchy is good visually, but measurement is partial.

Recommended improvements:
- Track all hero/spotlight CTA interactions.
- Standardize case-study proof formatting with at least one measurable result per featured card.
- Clarify URL IA strategy in SEO plan (keep current pathing but normalize metadata and internal links).

## Contact (`/contact`)
Page purpose:
- Capture high-intent inbound and convert to qualified conversation.

Current strengths:
- Clear ask, clear fallback options, and strong reassurance.
- Good tracking depth in form lifecycle.

Current weaknesses:
- Field burden is higher than needed for first contact.
- Event property style is inconsistent (`hasInterest` vs `has_email`).
- Interest capture is mostly hidden in URL state.

Conversion issues:
- Requiring both first and last name can reduce starts-to-submit rate.

Trust issues:
- Good response promise, but add explicit privacy/handling reassurance near submit.

Copy issues:
- Slight repetition around `clear next step` phrasing.

CTA issues:
- Multiple strategy-call prompts can compete with the core form completion action.

Recommended improvements:
- Test single-name field or deferred last-name capture.
- Add visible `What do you need help with?` selector in-form.
- Normalize contact event schema and add `contact_success` alias event.

## 5) Secondary Page Review
## Offer Detail Pages (`/founder-review`, `/execution-sprint`, `/outcome-partnership`)
- Strong: clear use-when and output framing.
- Weak: templated similarity, low proof specificity, low CTA tracking.
- Recommendation: attach 1 case study and 1 metric tile per offer section.

## Case Studies (`/case-studies/[slug]`)
- Strong: structured layout, schema, related links.
- Weak: metadata is minimal beyond title/description/canonical, no per-page OG/Twitter; mixed proof quality.
- Recommendation: add OG/Twitter per dynamic case-study page and enforce quantified result standard.

## Our Take (`/our-take`, `/our-take/[slug]`)
- Strong: deep content quality and strong article schema usage.
- Weak: domain browse cards are informational more than navigational; limited conversion event coverage beyond reads/jumps.
- Recommendation: make domain cards actionable to filtered lists and track domain-level intent.

## About/Team (`/about`, `/team`)
- Strong: human tone and founder note.
- Weak: proof is mostly value language rather than operational credibility.
- Recommendation: add concise `how we work in practice` proof with measurable outcomes.

## Careers (`/careers`)
- Strong: role clarity and expectations.
- Weak: conversion path is split between contact and mailto without explicit application flow tracking.
- Recommendation: add `careers_interest` event and one clear primary apply action path.

## 6) Copy Improvement Guide
See `docs/copy-standards.md`.

## 7) Trust and Proof Guide
See `docs/trust-proof-guide.md`.

## 8) SEO / Metadata Guide
See `docs/seo-recommendations.md`.

## 9) Analytics Guide
See `docs/analytics-taxonomy.md`.

## 10) Experiment Backlog
See `docs/experiment-backlog.md`.

## 11) QA / Governance Checklist
See `docs/site-qa-checklist.md`.

## 12) Codex-Ready Implementation Notes
See `docs/implementation-notes.md`.

