# Amalgam Unified Implementation Roadmap

Date: 2026-03-16  
Inputs merged:
1. Full UX/UI refinement execution audit.
2. Conversion, copy, analytics, SEO, trust, and QA audit.

## 1) Merge Decisions (Duplicates Removed, Conflicts Resolved)
## Duplicates removed
- CTA inconsistency findings from both audits merged into one initiative set.
- Analytics coverage and taxonomy findings merged into one instrumentation workstream.
- Trust/proof placement findings merged into one trust architecture workstream.
- Copy clarity and anti-AI phrasing findings merged into one copy governance workstream.

## Conflicts resolved
1. CTA consistency vs specificity:
   - Decision: keep one global escalation action label (`Book a strategy call`) for recognition.
   - Decision: increase context specificity in adjacent copy and secondary CTA labels.
2. Launchpad vs Next Move naming:
   - Decision: treat `/launchpad/*` as legacy redirect surface.
   - Decision: all strategic UX improvements execute on `/next-move/*`.
3. Broad visual refactor vs safe rollout:
   - Decision: prioritize no-regret logic, measurement, copy, and metadata improvements first.
   - Decision: visual consistency upgrades remain incremental and component-safe.
4. Instrument everything vs instrument meaningfully:
   - Decision: track only decision-grade interactions, not decorative clicks.

## 2) Prioritization Logic
Prioritized by:
1. Highest-conversion pages.
2. Highest impact UX clarity.
3. Largest conversion and trust gains.
4. Lowest implementation risk.
5. Fastest delivery of measurable gains.

Page priority sequence:
1. Homepage.
2. Your Next Move.
3. What We Offer.
4. Our Work.
5. Contact.
6. Offer detail pages.
7. Case studies.
8. Our Take.
9. Team.
10. Careers.

## 3) Phase Plan Overview
## Phase 1
- Goal: remove blockers, fix measurement blind spots, secure top-funnel reliability.

## Phase 2
- Goal: strengthen structural clarity and trust architecture across top pages.

## Phase 3
- Goal: run focused conversion experiments on proven high-impact levers.

## Phase 4
- Goal: tighten consistency, polish interaction quality, and close secondary-route gaps.

## Phase 5
- Goal: establish long-term optimization systems and operating cadence.

## 4) Detailed Roadmap
## Phase 1 - Critical Improvements
| ID | Page focus | Description | Why it matters | User benefit | Business benefit | Difficulty | Risk | Dependencies | Implementation order |
|---|---|---|---|---|---|---|---|---|---|
| P1-01 | 2 | Fix `ToolActionBlock` compile regression in Next Move workspace and add guard test. | Current typecheck failure blocks safe iteration and can mask runtime issues. | Reliable diagnostic journey. | Reduced technical risk and release friction. | Low | Low | None | 1 |
| P1-02 | 1,3,4,5 | Add missing CTA tracking to hero and section CTAs on homepage, services, our-work, and contact high-intent actions. | Top conversion pages are under-measured. | Cleaner action flow tuning over time. | Immediate attribution visibility on primary funnel paths. | Medium | Low | P1-01 | 2 |
| P1-03 | 1-5 | Replace generic `cta_clicked`; normalize to snake_case taxonomy and stable `cta_id` values. | Mixed event naming blocks trustworthy analysis. | More consistent experience decisions driven by real data. | Faster experiment cycle and cleaner dashboards. | Medium | Medium | P1-02 | 3 |
| P1-04 | 1-5 | Add page-level OG/Twitter metadata for top 5 routes and align titles/descriptions with route intent. | Social/search previews are too generic. | Better message match before click. | Higher qualified traffic and improved discoverability. | Medium | Low | None | 4 |
| P1-05 | 5 | Harden contact conversion baseline: add `contact_success` canonical event, preserve fallback reliability path, and tighten failure classification. | Contact is core monetization point; reliability and measurement must be exact. | More predictable form completion and trust. | Better lead funnel visibility and lower drop-off loss. | Medium | Low | P1-03 | 5 |

## Phase 2 - Structural Improvements
| ID | Page focus | Description | Why it matters | User benefit | Business benefit | Difficulty | Risk | Dependencies | Implementation order |
|---|---|---|---|---|---|---|---|---|---|
| P2-01 | 2 | Reduce Next Move cognitive load: enforce one dominant action per stage view, tighten disclosure defaults, keep comparison behind explicit intent. | Stage engine is strong but can overwhelm early users. | Faster orientation and higher decision confidence. | More tool starts and lower early drop-off. | Medium | Medium | P1-01, P1-03 | 1 |
| P2-02 | 1,3,4,5 | Rebuild trust architecture for top pages: place one context-specific proof element before escalation CTA; reduce repetitive generic trust bands. | Trust exists but is often repetitive and late. | Better confidence at decision points. | Higher CTA conversion quality. | Medium | Low | P1-02 | 2 |
| P2-03 | 3,6 | Add service-specific proof modules on services and offer detail pages with direct case-study linkage. | Offer pages lack concrete evidence near action. | Easier self-qualification by visitors. | Improved offer-to-contact conversion. | Medium | Low | P2-02 | 3 |
| P2-04 | 3,4,7,8 | Implement internal linking spine across services, case studies, our-take, and next-move tools. | Discovery paths are not fully connected. | Less dead-end browsing. | Better discoverability and assisted conversion flow. | Medium | Low | P1-04 | 4 |
| P2-05 | 4,7 | Standardize case-study proof model: require at least one quantified outcome field for featured stories. | Proof quality is uneven; some outcomes are decorative. | Clearer evidence, faster trust. | Stronger persuasion and better content reuse. | High | Medium | P2-03 | 5 |

## Phase 3 - Conversion Improvements
| ID | Page focus | Description | Why it matters | User benefit | Business benefit | Difficulty | Risk | Dependencies | Implementation order |
|---|---|---|---|---|---|---|---|---|---|
| P3-01 | 1 | A/B test homepage primary CTA label (`Find my stage` vs outcome-specific variant). | Hero CTA is high-leverage and currently generic. | Clearer expectation before click. | Higher next-move entry rate. | Medium | Low | P1-02, P1-03 | 1 |
| P3-02 | 5 | A/B test contact friction: single-name variant vs current first+last structure. | Name-field burden may suppress submissions. | Faster form completion. | Increased qualified lead volume. | Medium | Medium | P1-05 | 2 |
| P3-03 | 3 | A/B test proof placement on services page (proof-above-CTA vs current flow). | Services is major assisted-conversion page. | Earlier confidence in support choice. | Higher strategy-call CTR from services. | Medium | Low | P2-03 | 3 |
| P3-04 | 4 | A/B test our-work spotlight CTA framing (`Read case study` vs relevance-framed variant). | Spotlight module influences deep proof entry. | Better relevance signal. | Higher case-study engagement rate. | Low | Low | P1-02 | 4 |
| P3-05 | 2 | A/B test stage-aware final CTA copy variants on Next Move. | Final CTA is high-intent conversion surface. | Clearer next step after diagnosis. | Higher escalation conversion from self-serve flow. | Medium | Medium | P2-01, P1-03 | 5 |

## Phase 4 - Polish and Consistency
| ID | Page focus | Description | Why it matters | User benefit | Business benefit | Difficulty | Risk | Dependencies | Implementation order |
|---|---|---|---|---|---|---|---|---|---|
| P4-01 | 1-10 | Apply unified copy standards: headline/support length rules, anti-AI checks, CTA hierarchy consistency. | Copy tone and rhythm still vary between routes. | Cleaner reading and faster comprehension. | Better conversion consistency across pages. | Medium | Low | P2-02 | 1 |
| P4-02 | 1-10 | Refine visual hierarchy rhythm through shared component-level surface and spacing adjustments (no broad layout rewrite). | Repetitive section weight reduces scannability. | Easier page scanning and lower cognitive fatigue. | Better engagement depth. | Medium | Medium | P2-01 | 2 |
| P4-03 | 2,1,3,4 | Interaction polish and accessibility hardening: mobile sticky CTA trigger logic, focus behavior consistency, disclosure ergonomics. | UX confidence dips on some mobile interaction paths. | Smoother mobile usage and accessibility quality. | Reduced mobile abandonment risk. | Medium | Medium | P2-01 | 3 |
| P4-04 | 8,9,10 | Add secondary-route event coverage (`article_opened` context enrichments, `careers_interest`, team exploration). | Secondary routes are under-measured for nurturing value. | More coherent pathing from content to action. | Better long-tail conversion understanding. | Low | Low | P1-03 | 4 |

## Phase 5 - Long-Term Optimizations
| ID | Page focus | Description | Why it matters | User benefit | Business benefit | Difficulty | Risk | Dependencies | Implementation order |
|---|---|---|---|---|---|---|---|---|---|
| P5-01 | 1-10 | Introduce experiment operations layer (flagging, experiment registry, decision logs). | Phase 3 tests need repeatable governance. | Faster, safer iteration quality. | Compounding optimization velocity. | High | Medium | P3-01 to P3-05 | 1 |
| P5-02 | 1-10 | Build funnel and attribution dashboards aligned to normalized taxonomy. | Data will improve only if decision loops exist. | Indirect, but better prioritization quality. | Better resource allocation and ROI visibility. | Medium | Low | P1-03, P4-04 | 2 |
| P5-03 | 2,4,8 | Add stage-aware content and proof personalization (rules-based first, ML later). | Current experience is strong but mostly static. | More relevant recommendations faster. | Higher conversion rate from returning users. | High | Medium | P2-04, P5-02 | 3 |
| P5-04 | 7,8 | Establish content governance automation: freshness checks, schema validation, metadata QA jobs. | Content quality decays without operational controls. | More reliable and current content experiences. | Sustained SEO and trust performance. | Medium | Low | P2-05, P1-04 | 4 |

## 5) What Ships Immediately vs Tests vs Monitoring
## Ship immediately (no experiment gate)
1. P1-01
2. P1-02
3. P1-03
4. P1-04
5. P1-05
6. P2-02

## Should be tested
1. P3-01
2. P3-02
3. P3-03
4. P3-04
5. P3-05

## Should be monitored continuously
1. `hero_cta_clicked` -> `next_move_stage_selected` rate.
2. `form_started` -> `form_submitted` -> `contact_success` funnel.
3. `case_study_filter_applied` -> `case_study_opened` efficiency.
4. `article_opened` and content-assisted contact initiation.
5. Stage-specific escalation (`strategy_call_clicked`) by `stage_id` and `pressure_id`.

## 6) Dependency-Safe Sequential Execution
1. Complete all Phase 1 work in order.
2. Start Phase 2 only after Phase 1 instrumentation and taxonomy are stable.
3. Start Phase 3 experiments only after Phase 2 structural changes settle.
4. Run Phase 4 consistency pass after winning variants are identified.
5. Start Phase 5 systems after at least one full optimization cycle is complete.

## 7) Suggested Sprint Packaging
## Sprint 1
- P1-01, P1-02.

## Sprint 2
- P1-03, P1-04, P1-05.

## Sprint 3
- P2-01, P2-02.

## Sprint 4
- P2-03, P2-04, P2-05.

## Sprint 5
- P3-01, P3-02.

## Sprint 6
- P3-03, P3-04, P3-05.

## Sprint 7
- P4-01, P4-02.

## Sprint 8
- P4-03, P4-04.

## Sprint 9+
- P5-01 to P5-04.

