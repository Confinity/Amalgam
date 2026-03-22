# Amalgam Full-App UX/UI Audit, Strategy, and Execution Plan

Date: March 15, 2026  
Reviewer: Codex (`confinity-design-audit` workflow)

## 1) Executive Verdict

Amalgam is already above-average across trust, structure, and product logic. The strongest parts are the stage-aware `next-move` flow, credible proof placement, and consistent action framing around strategy calls.

The remaining gap is not foundational quality. It is coherence under scale: repeated but slightly different surface patterns, uneven interaction instrumentation outside core flows, and a few mobile orientation points where confidence can drop.

### What is already strong and should be preserved

- Stage logic and journey architecture in `next-move`.
- Clear “self-serve or assisted” escalation model.
- Strong trust cues: case studies, testimonial framing, and logos.
- Accessible baseline: skip link, target sizes, and semantic structure.
- Conversion language consistency on primary pages (“Book a strategy call”).

### Biggest product-level weaknesses

- Analytics coverage is strong in contact + launchpad but thin in global navigation and discovery surfaces.
- Shared visual primitives still rely on scattered, component-level color/overlay expressions.
- Mobile menu interaction is usable but can be more robust (focus/escape behavior, interaction telemetry).
- Case-study filtering is useful but under-instrumented for product-learning and drop-off analysis.
- Contact/Signals forms track outcomes, but not enough intent/attempt context for optimization.

### Biggest creativity opportunities (restrained)

- Improve section pacing with stronger “quiet vs emphasis” surface rhythm.
- Make sticky/final CTA blocks feel more productized and less generic dark-band repetition.
- Sharpen micro-interactions on actionable surfaces (chips, filters, nav, cards) for confidence feedback.

## 2) Page-by-Page Audit

## Home (`/`)

- Purpose: orient quickly, establish trust, route to next move.
- Working: hero clarity, trust progression, clear CTAs.
- Weakness: recurring section pattern can feel repetitive on long scroll.
- Preserve: current narrative order and CTA pair.
- Change: improve surface rhythm and interaction feedback systemically.

## Services (`/services`) and Program Pages

- Purpose: explain support ladder and help users self-identify fit.
- Working: practical language and progression from pressure to support model.
- Weakness: visual blocks can feel too equivalent in weight.
- Preserve: existing offer sequencing and copy architecture.
- Change: increase visual hierarchy contrast between summary, detail, and action modules.

## Next Move (`/next-move`) and Tool/Guide/Program subroutes

- Purpose: diagnose stage and route to action.
- Working: strongest productized flow in the app; meaningful interaction model.
- Weakness: high block count on mobile can increase cognitive overhead; event taxonomy is mixed.
- Preserve: stage mapping logic, pressure model, and core disclosure pattern.
- Change: tighten surface semantics, interaction polish, and analytics consistency.

## Our Work (`/our-work`) + Case Study Detail

- Purpose: proof-led conversion support through relevant examples.
- Working: strong filter utility and rich proof set.
- Weakness: filter interactions and no-match states are weakly instrumented.
- Preserve: featured/library split and pressure-first filtering model.
- Change: instrument filter and result behavior; improve empty-state action clarity.

## Our Take (`/our-take`) + Brief Detail

- Purpose: authority, practical education, and assisted conversion support.
- Working: strong categorization and clear bridge back to action.
- Weakness: click-intent measurement for reading journeys is thin.
- Preserve: domain + pressure framing.
- Change: improve article click instrumentation from cards.

## Contact (`/contact`)

- Purpose: convert uncertainty into structured intake.
- Working: humane copy, clear expectation setting, solid validation.
- Weakness: minimal analytics on form start/progression and submission latency context.
- Preserve: field order and low-friction structure.
- Change: add start/attempt/failure instrumentation detail and in-form confidence cues.

## About/Team/Careers

- Purpose: trust and fit confirmation.
- Working: credible team framing and role clarity.
- Weakness: behavior analytics on deeper exploration links is limited.
- Preserve: content depth and team card system.
- Change: improve shared card interaction consistency and telemetry.

## Legal + Error/NotFound/Redirect routes

- Purpose: resilience and trust continuity.
- Working: consistent style language and fallback clarity.
- Weakness: minor interaction polish opportunities on mobile shell behavior.
- Preserve: current structure and concise recovery actions.
- Change: align shared interaction polish and tracking where meaningful.

## 3) System-Level Audit

## Typography and Hierarchy

- Strong: clear headline scales and readable body defaults.
- Gap: repeated near-identical section block weight lowers information contrast over long pages.

## Spacing and Layout Rhythm

- Strong: broadly consistent section spacing.
- Gap: some card-heavy sections benefit from stronger elevation/surface differentiation.

## Components and Surfaces

- Strong: reusable primitives (`Card`, `Button`, `PageHero`) already exist.
- Gap: semantic token usage is inconsistent in some shared components; some hardcoded gradients remain.

## Interaction and Motion

- Strong: hover/press support exists, reduced-motion handling present globally.
- Gap: mobile menu focus/escape patterns and event instrumentation can be stronger.

## Forms

- Strong: clear labels, inline errors, and useful success messaging.
- Gap: start/attempt telemetry and detailed failure classification are incomplete.

## Conversion Logic

- Strong: clear dual path (self-serve + assisted) throughout.
- Gap: low-level interaction telemetry is uneven across discovery surfaces and global navigation.

## Analytics Instrumentation

- Present: `@vercel/analytics` + custom `track()` events in launchpad/contact/signals.
- Missing or weak:
  - Global nav/footer click tracking.
  - Case-study filter interaction and no-result behavior tracking.
  - Knowledge/case card click tracking consistency.
  - Signals/contact intent events (start/attempt/failure context).
- Taxonomy issue: mixed naming conventions (`launchpad_*`, `ynm_*`) without a clear shared pattern.

## 4) Prioritized Improvement Plan

## Critical

1. Strengthen analytics coverage for global navigation and discovery surfaces.
2. Improve contact/signals instrumentation for attempt/failure/start context.
3. Tighten mobile navigation interaction robustness and accessibility behavior.

## High Leverage

1. Refine global visual tokens and shared surface classes for stronger hierarchy rhythm.
2. Improve card-level and filter-level interaction feedback and telemetry.
3. Reduce repeated low-contrast block patterns through shared style refinement.

## Medium

1. Expand click instrumentation from knowledge/case cards.
2. Align CTA band styling and section contrast for stronger pacing.

## Polish

1. Improve tiny interaction details (focus and state visibility in edge components).
2. Clean residual token leaks in shared components where practical.

## 5) Execution Plan (Implementation Order)

1. Update shared design tokens and `globals.css` surface primitives.
2. Upgrade nav/footer behavior and analytics instrumentation.
3. Instrument discovery surfaces (`CaseStudiesExplorer`, card links).
4. Expand form instrumentation (`ContactIntakeForm`, `SignalsSubscribeForm`).
5. Refine high-impact shared interaction surfaces (`FinalCtaBand`, shared cards).
6. Validate at `380/768/1280` breakpoints and run lint/type checks.
