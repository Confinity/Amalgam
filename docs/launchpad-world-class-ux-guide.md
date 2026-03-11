# Launchpad UX Review and Upgrade Guide

Date: 2026-03-11
Scope: Launchpad journey, tools, guides, programs, signals, and shared Launchpad components.

## 1) Findings First (Ordered by Severity)

### High

1. Journey progress in overview mode is misleading.
   - In overview mode, the progress label says "Viewing all five stages" but the percentage is calculated from a default stage (`build-ship`), so users see ~60% instead of 100%.
   - Impact: Trust and orientation issue in the first 30 seconds.
   - File: `components/launchpad-stage-navigator.tsx` (around lines 429-433 and 990-995)

2. Primary decision path is still too dense on `/launchpad`.
   - Hero + stage selector + pressure + briefing + stage map + next step + program fit + trust + resource map + signals + proof + final CTA creates high cognitive load before users commit to a first action.
   - Impact: Drop-off before stage selection or diagnostic start.
   - File: `components/launchpad-stage-navigator.tsx` (overall flow, around lines 730-1731)

3. CTA language is fragmented across the same funnel.
   - Variants include: "Book a quick call", "Book a strategic call", "Talk to us", "Start a conversation", "Talk through your situation".
   - Impact: Users cannot instantly tell if these are the same action or different commitments.
   - Files:
   - `components/launchpad-stage-navigator.tsx` (multiple sections)
   - `app/launchpad/programs/page.tsx`
   - `components/navigation.tsx`
   - `components/footer.tsx`

### Medium

4. Signals signup is client-side webhook driven while server action exists.
   - `SignalsSubscribeForm` posts directly to `NEXT_PUBLIC_SIGNALS_WEBHOOK_URL`; `app/launchpad/actions.ts` contains stronger server handling but is not used here.
   - Impact: Operational risk (spam, endpoint exposure, inconsistent behavior), harder reliability controls.
   - Files:
   - `components/signals-subscribe-form.tsx`
   - `app/launchpad/actions.ts`

5. Tool result page has a strong structure, but copy weight is high in key moments.
   - "Why this profile won", "First 2-week moves", "Risk if unchanged", "Recommended next move", related guides, proof, email summary appear at once.
   - Impact: Good information, but users can feel "done reading" before acting.
   - File: `components/tool-assessment.tsx`

6. Color semantics are partly token-based, partly hard-coded utility palettes.
   - Stage chips and alert blocks use direct palette classes (`emerald`, `cyan`, `blue`, `indigo`, `amber`) instead of semantic design tokens.
   - Impact: Theme consistency and future brand adjustments become harder.
   - Files:
   - `components/launchpad-stage-navigator.tsx`
   - `components/tool-assessment.tsx`
   - `app/globals.css`

### Low

7. Mobile sticky dock trigger is hardcoded to fixed scroll thresholds.
   - `window.scrollY > 760 && remaining > 420` can feel late or inconsistent by device/content height.
   - Impact: Missed assistive CTA on shorter sessions.
   - File: `components/launchpad-stage-navigator.tsx` (around lines 605-610)

8. Some hero/support copy still sounds "internal framework" vs "founder language".
   - Examples: "decision layer", "recommendation mode", "signals layer", "escalate to deeper support".
   - Impact: Sounds polished but less human; slight conversion drag.
   - Files:
   - `components/launchpad-stage-navigator.tsx`
   - `app/launchpad/guides/page.tsx`
   - `app/launchpad/programs/page.tsx`

---

## 2) North-Star Launchpad Experience

Use this target UX:

1. User lands and immediately answers: "Where am I stuck right now?"
2. User gets one clear next move in under 20 seconds.
3. User can choose self-serve or human help without confusion.
4. Every page answers:
   - What is this?
   - Is it for me?
   - What happens if I click?
   - How long will this take?

Tone:
- Conversational, specific, and direct.
- Short sentences.
- Founder-first language, not consulting language.

---

## 3) High-Impact IA and Flow Changes

### Keep
- Stage selector concept.
- Tool-driven self-serve wedge.
- Program ladder.
- Signals as ongoing value channel.

### Change

1. Compress `/launchpad` into a "one-screen decision start."
   - Keep only:
   - Hero
   - Stage selector
   - One next step card
   - One secondary path ("Not sure? talk to us")
   - Move deeper sections behind "See full map".

2. Standardize CTA taxonomy across Launchpad.
   - Primary consultative CTA: `Book a strategy call`
   - Self-serve CTA: `Run the diagnostic`
   - Learn CTA: `Read the guide`
   - Keep labels stable everywhere.

3. Make progression explicit after stage selection.
   - Show: `You are here -> Next action -> What you get in 15 min`
   - Remove duplicate reinforcement blocks.

4. Convert "resource map" accordion into "I want..." quick intents.
   - `I want to diagnose delivery drag`
   - `I want to prioritize what to fix first`
   - `I need senior help now`

---

## 4) Page-by-Page Copy and UX Upgrade (Recommended)

## `/launchpad`

Current issue:
- Strong design, but too many sections and repeated concepts.

Recommended hero rewrite:
- Headline: `Where is delivery getting stuck right now?`
- Subhead: `Pick your stage and we will show your best next move in under a minute.`
- Primary CTA: `Find my stage`
- Secondary CTA: `Book a strategy call`
- Support line: `Prefer self-serve first? Start with a quick diagnostic.`

Section rename suggestions:
- `Personalized briefing` -> `Your current picture`
- `Fast-lane actions` -> `Best next move`
- `Program fit` -> `If you need deeper help`
- `Signals` -> `Practical updates`

## `/launchpad/tools`

Current issue:
- Solid structure, but cards can feel descriptive before they feel actionable.

Recommended card pattern:
- Q headline: `Is delivery slowing for reasons you cannot see clearly?`
- Outcome line: `In 5 minutes, get your likely drag profile and first two-week moves.`
- CTA: `Run diagnostic`

Add one "What happens next" strip:
- `Answer 5 questions -> Get your profile -> Choose self-serve or strategy call`

## `/launchpad/guides`

Current issue:
- Good taxonomy; still read-heavy.

Recommended simplification:
- Each collection gets:
  - One sentence problem statement
  - 3 article cards
  - One CTA button only: `Start with this path`

Collection title style:
- From `Start here if delivery is dragging`
- To `Delivery is slowing. Start here.`

## `/launchpad/programs`

Current issue:
- Program cards are strong, but titles are too long and question-heavy.

Program title rewrite:
- `Diagnostic Review`
- `Execution Sprint`
- `Outcome Partnership`

Move question into subcopy:
- `Not sure what is slowing delivery? Start with Diagnostic Review.`

Decision map rewrite:
- Header: `Which level of support fits right now?`
- Three chips:
  - `Need diagnosis`
  - `Need a plan`
  - `Need continuity`

## `/launchpad/signals`

Current issue:
- Good positioning, but subscription value can be crisper.

Hero rewrite:
- Headline: `Want practical notes you can use this quarter?`
- Subhead: `Short updates on delivery pressure, architecture decisions, and what to do next.`

Subscription box tweak:
- Add trust line under field:
  - `1-2 useful notes per month. No noise.`

---

## 5) Tool Assessment Experience (World-Class Upgrade)

## What is already good
- Clear stepper.
- Useful result model.
- Strong path to next action.

## What to improve

1. Reduce result cognitive load.
   - Show one primary result card first.
   - Collapse details behind "See why we mapped you here".

2. Make confidence easier to understand.
   - Replace "Provisional confidence" with:
   - `Early signal - answer a few follow-ups for higher confidence`.

3. Clarify expected outcome before start.
   - Add microcopy under start button:
   - `Takes ~5 minutes. You will leave with a specific next move.`

4. Improve email summary UX.
   - Keep current mailto fallback, but add `Copy summary` button.
   - For world-class reliability, send summary server-side and email via backend.

---

## 6) Visual and Interaction Quality Upgrades

1. Create one semantic color set for stage chips and risk states.
   - Avoid mixed raw palette utilities across components.

2. Tighten vertical rhythm on Launchpad page.
   - Reduce repeated section paddings from `py-20/24` where adjacent sections are conceptually linked.

3. Use stronger "one primary action per screen" discipline.
   - Keep one filled button and one outline button per major section.

4. Improve mobile dock behavior.
   - Trigger based on intersection observer (hide when hero/next-step CTA visible) rather than static pixel thresholds.

5. Keep testimonial but reduce depth.
   - One short quote + single proof point, not another large narrative block.

---

## 7) Accessibility and Clarity Checklist

1. Ensure overview progress is truthful (100% or hidden).
2. Preserve 44px+ touch targets (already mostly met).
3. Validate focus order after stage and pressure selection changes.
4. Keep CTA verbs consistent for screen reader predictability.
5. Ensure warning card contrast meets AA with current amber styling.

---

## 8) Data and Experiment Plan

North-star metrics:
1. Stage selection rate from `/launchpad` hero.
2. Tool start rate from stage-selected sessions.
3. Tool completion rate.
4. Strategy call click-through from completed tool results.
5. Signals signup conversion.

Priority experiments:
1. Short hero variant vs current hero.
2. Compressed launchpad flow vs full current flow.
3. Single CTA label system vs mixed CTA labels.
4. Result screen "collapsed details" vs current full details.

---

## 9) 30-Day Implementation Plan

Week 1 (Critical fixes)
1. Fix overview progress bug.
2. Standardize CTA labels across Launchpad routes.
3. Trim top-level `/launchpad` section density (ship compact mode).

Week 2 (Copy and flow)
1. Apply hero/section rewrites.
2. Simplify tools and guides intros.
3. Shorten program naming and decision chips.

Week 3 (Interaction and reliability)
1. Move signals submission to server endpoint/action only.
2. Add copy-summary fallback in tool result.
3. Improve mobile dock trigger logic.

Week 4 (QA and optimization)
1. Accessibility pass.
2. Mobile readability pass at 380/768/1280.
3. Launch first A/B tests and baseline metrics.

---

## 10) Definition of "World Class" for Launchpad

Use this acceptance bar:
1. A first-time founder can choose a path in under 20 seconds.
2. Every page has one clear primary action.
3. Copy sounds like a trusted operator, not a framework.
4. Result screens feel useful in under 15 seconds.
5. Signals and call CTAs feel like continuation, not pressure.

