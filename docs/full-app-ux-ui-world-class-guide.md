# Amalgam Full-App UX/UI Audit and Upgrade Guide

Date: March 11, 2026  
Reviewer: Codex (UX/UI + conversion + product experience pass)

## 1) Executive Summary

The site is already strong on trust, visual quality, and depth. It feels credible and intentional.  
The biggest gap is not aesthetics. It is decision friction.

The current experience asks visitors to process too many parallel choices before it gives them one obvious next move. Across pages, CTA language and flow logic vary enough to add cognitive load.

### Current score (estimated)

| Area | Score | Notes |
| --- | --- | --- |
| Visual quality | 8.4/10 | Strong hierarchy, modern cards, good section rhythm |
| Brand trust | 8.7/10 | Strong proof, testimonials, enterprise logos, case studies |
| Message clarity | 7.3/10 | Improved, but still has repeated/abstract phrasing in places |
| Conversion architecture | 6.8/10 | CTA taxonomy and path logic are fragmented |
| Information architecture | 7.5/10 | Rich content, but several pages are still too dense |
| Accessibility baseline | 7.8/10 | Good focus/targets; still needs tighter mobile scan behavior checks |
| Design-system hygiene | 6.9/10 | Token system exists, but many hardcoded visual values remain |

### Priority outcome

If you do only one strategic thing: make the entire site feel like one guided decision journey with one primary action language and one clear escalation ladder.

## 2) Critical Opportunities (Highest ROI)

## P0: Unify CTA architecture and labels

Problem:
- Primary CTA language varies by page: `Book a strategy call`, `Book a 15-minute call`, `Start a conversation`, `Learn more`, `See how we can help`.
- Different labels often point to the same intent, making decision confidence weaker.

What to do:
- Define one primary CTA for uncertain visitors: `Book a strategy call`.
- Define one secondary CTA for exploration: `See case studies` or `Use Launchpad`.
- Reserve `Start a conversation` for specific pages where custom engagement is clearly the point.
- Apply consistent labels in navigation, footer, hero sections, and terminal CTAs.

Evidence:
- `components/navigation.tsx`
- `components/footer.tsx`
- `app/page.tsx`
- `app/services/page.tsx`
- `app/team/page.tsx`
- `app/case-studies/page.tsx`

## P0: Reduce homepage decision overload

Problem:
- Homepage has many sections and repeated persuasion blocks.
- Strong content exists, but the first-time path is still long before commitment.

What to do:
- Keep content depth, but compress first-view narrative into 4 decision blocks:
1. What pressure are you under?
2. What is the fastest next move?
3. Why trust Amalgam?
4. Choose path (call, launchpad, proof)
- Move secondary educational sections lower or behind expandable "See deeper context".

Evidence:
- `app/page.tsx` has high section density and repeated CTA clusters.

## P0: Improve contact completion reliability

Problem:
- Contact submission relies on `mailto:` flow with clipboard fallback.
- This can fail or feel broken depending on environment and email client setup.

What to do:
- Keep mailto option, but add first-party API submission as primary fallback.
- Offer explicit choice: `Send through website` or `Open in my email app`.
- Preserve current good behavior of carrying Launchpad context.

Evidence:
- `components/contact-form.tsx`

## P1: Simplify Launchpad progressive disclosure

Problem:
- Launchpad is feature-rich and impressive, but the full-map and deep modules can still feel heavy.
- New users can lose the "one next move" feeling if too many blocks are open.

What to do:
- Keep current flow, but default to "one-screen decision" on first load:
1. Pick stage
2. Pick pressure
3. Show one recommended next action + one backup
- Gate deeper content under explicit "Show full map".

Evidence:
- `components/launchpad-stage-navigator.tsx`

## P1: Complete token-first design system pass

Problem:
- CSS variables exist, but many component utility classes still use hardcoded `rgba(...)` and literal color values.
- This reduces maintainability and theme consistency.

What to do:
- Introduce semantic tokens for panel surfaces, strokes, overlays, and accent shadows.
- Replace hardcoded values in `globals.css` utilities with semantic tokens.
- Keep current visual style; improve consistency and future speed.

Evidence:
- `app/globals.css`
- `components/review-mode.tsx` category colors

## 3) Route-by-Route Opportunities

## Global Shell (`Navigation`, `Footer`, layout)

Working:
- Clean fixed header, active states, scroll progress, strong mobile menu.
- Footer has good trust details and legal structure.

Improve:
- Unify conversion language between desktop and mobile menu.
- Remove intent overlap between footer "Start Here" and "Start a Conversation" blocks.
- Make one canonical path ladder visible everywhere:
`Strategy Call -> Diagnostic -> Execution Sprint -> Outcome Partnership`.

Files:
- `components/navigation.tsx`
- `components/footer.tsx`
- `app/layout.tsx`

## Homepage (`/`)

Working:
- Strong hero question, strong trust strip, strong proof modules.

Improve:
- Collapse repeated "start here" moments into one decisive module.
- Reduce overlap between "What we do", "When teams call us", and "Start here".
- Keep one dominant CTA in hero and one clear secondary path.

File:
- `app/page.tsx`

## Services (`/services`)

Working:
- Clear staged engagement model and practical flow.

Improve:
- Reduce repetitive "start with call" references.
- Replace weaker CTA labels like `Learn more` with intent-specific actions.
- Add one compact "choose your path" decision panel near top.

File:
- `app/services/page.tsx`

## Contact (`/contact`)

Working:
- Strong direct tone and clear expectation setting.
- Good context seeding from Launchpad.

Improve:
- Add non-mailto submission fallback.
- Reduce explanatory copy blocks above form.
- Surface "response time expectation" in one clear, high-contrast line.

Files:
- `app/contact/page.tsx`
- `components/contact-form.tsx`

## Launchpad Hub + Subpages

Working:
- Best-in-class guided interaction architecture.
- Great stage model, pressure filters, contextual paths, and analytics instrumentation.

Improve:
- Default narrower first-run mode for speed.
- Reduce copy density in overview mode blocks.
- Make "recommended next action" sticky above fold on tablet/mobile once selected.
- Keep detailed rationale hidden by default in tools until requested.

Files:
- `components/launchpad-stage-navigator.tsx`
- `components/tool-assessment.tsx`
- `app/launchpad/page.tsx`
- `app/launchpad/tools/page.tsx`
- `app/launchpad/guides/page.tsx`
- `app/launchpad/programs/page.tsx`
- `app/launchpad/signals/page.tsx`

## Knowledge (`/knowledge` + article page)

Working:
- Excellent depth and useful categorization.
- Strong "apply this now" and related-path behavior.

Improve:
- Tighten scan performance on index by reducing card payload above fold.
- In article page sidebar, prioritize one action card and compress lower-priority modules.
- Add reading progress indicator on long-form article pages.

Files:
- `app/knowledge/page.tsx`
- `app/knowledge/[slug]/page.tsx`

## Case Studies (`/case-studies` + detail)

Working:
- Strong social proof structure and clear narrative sections.

Improve:
- Reduce duplicate CTA labels at page bottoms.
- Add quick "situation tags" on cards for faster matching (for example: `integration drag`, `data reliability`, `post-raise scaling`).
- On detail pages, add top summary strip with 3 outcomes for faster executive scan.

Files:
- `app/case-studies/page.tsx`
- `app/case-studies/[slug]/page.tsx`

## About, Team, Careers

Working:
- Human credibility and trust are strong.
- Portrait and team composition presentation is high quality.

Improve:
- Reduce repeated call-to-action variation across closing sections.
- Tighten role-page verbosity in careers so scanning decision is faster.
- Add a short "Who should contact us from your team?" panel on About/Team.

Files:
- `app/about/page.tsx`
- `app/team/page.tsx`
- `app/careers/page.tsx`

## Legal and Edge Routes

Working:
- Clean legal shell and clear structure.
- Good redirect fallback experiences.

Improve:
- Add in-page table of contents for legal pages.
- Harmonize top-level CTA style with primary site system.

Files:
- `components/legal-page-shell.tsx`
- `app/privacy-policy/page.tsx`
- `app/terms-and-conditions/page.tsx`
- `app/cookie-policy/page.tsx`
- `components/legacy-route-redirect.tsx`

## Review Mode Collaboration UX

Working:
- Remote sync architecture is in place and cross-page notes are robust.
- Good merge behavior and polling strategy.

Improve:
- Add visible "Last synced at" timestamp and "Sync source" status.
- Add lightweight collaborator indicators (who last edited note).
- Add optional color-token alignment for note categories to match brand system.

Files:
- `components/review-mode.tsx`
- `app/api/review-notes/route.ts`

## 4) Copy and Voice Framework (Human, Direct, Non-Robotic)

Use this rule across all pages:
- Lead with the pressure they feel now.
- Name the concrete system issue.
- Offer one clear next move.

Preferred copy pattern:
- Question: "Are releases slipping after growth?"
- Clarifier: "We help you find the specific bottleneck across architecture, data, and ownership."
- Action: "Book a strategy call."

Avoid:
- Generic abstractions like "regain momentum" without context.
- Multiple CTAs with similar intent but different labels.
- Repeating the same promise across adjacent sections.

## 5) UX/UI System Upgrades

## Design tokens

- Create semantic tokens for:
`--surface-elevated`, `--surface-soft`, `--surface-contrast`, `--stroke-subtle`, `--stroke-strong`, `--shadow-soft`, `--shadow-focus`.
- Refactor utility classes in `globals.css` to use semantic tokens.

## Interaction model

- Standardize button hierarchy:
`Primary (solid)`, `Secondary (outline)`, `Tertiary (text link)`.
- Enforce one primary CTA per section.

## Motion and performance perception

- Keep existing tasteful motion.
- Cap simultaneous animated elements above fold on mobile.
- Ensure reduced-motion mode is equivalent in information clarity.

## Accessibility hardening

- Add skip-link visibility checks on all route templates.
- Audit tab order for Launchpad stage selector and tool assessments.
- Validate color contrast for text inside translucent surfaces.

## 6) Phased Roadmap to 10/10

## Phase 1 (1-2 weeks): Conversion and clarity

1. Standardize CTA taxonomy across nav/footer/page heroes.
2. Simplify homepage top narrative and decision flow.
3. Add web-submit fallback to contact flow.
4. Tighten Launchpad first-run state.

## Phase 2 (2-4 weeks): UX polish and system consistency

1. Tokenize remaining hardcoded color/stroke/shadow utilities.
2. Reduce dense card copy on knowledge and case-study index pages.
3. Add progress affordances to long article pages.
4. Improve cross-page action consistency and endpoint CTAs.

## Phase 3 (4-8 weeks): Premium product experience

1. Add personalization layer (remember selected stage/pressure from Launchpad).
2. Add contextual proof injection (case study cards matched to selected pressure).
3. Add lightweight guided onboarding on first site visit.
4. Add advanced review-mode collaboration metadata (editor/time/source).

## 7) Success Metrics

Track before and after:

1. Hero CTA click-through rate by route group.
2. Contact form completion rate.
3. Launchpad start-to-completion rate.
4. Launchpad completion-to-strategy-call rate.
5. Knowledge article depth and assisted conversion rate.
6. Mobile bounce rate on home/services/contact.

Target ranges after improvements:
- +20-35% hero-to-primary-action CTR.
- +15-30% contact completion rate.
- +10-20% launchpad completion rate.
- +15-25% launchpad-to-call conversion.

## 8) Final Recommendation

The app is already high quality.  
To make it world class, prioritize decision clarity over additional content.

The fastest path to 10/10:
1. One CTA language system.
2. One guided decision journey.
3. One resilient contact conversion flow.
4. One fully tokenized visual system.



