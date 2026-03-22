# Launchpad World-Class Strategy, UX, UI, Content, Conversion, and Execution Spec

Date: 2026-03-12
Owner: Product + UX + Growth + Engineering
Scope: `app/launchpad/page.tsx` and `components/launchpad-stage-navigator.tsx`

## 1. Executive Verdict

### What is working
- Stage-first model is strong and maps to founder mental models.
- URL state (`stage`, `pressure`) supports sharing, campaign segmentation, and contextual continuity.
- Accessibility baseline is strong (radiogroup behavior, keyboard handling, live updates).
- Self-serve and human support paths both exist.

### What was blocking world-class performance
- The page read like stacked sections instead of one guided decision system.
- A-to-Z support was not obvious enough in the first 10 seconds.
- Trust appeared too late in the flow.
- CTA language was fragmented.
- Stage selection did not feel contextually decisive fast enough.

### Core strategic opportunity
Turn Launchpad into the orientation and decision layer for Amalgam:
- orient
- self-locate
- choose next move
- escalate when needed

## 2. Recommended Model (Winner)

## Hybrid orientation + stage-aware guided journey

Why this wins:
- Instant comprehension of the full idea-to-scale journey.
- Same-page continuity with low cognitive overhead.
- One clear next move plus optional depth.
- Better conversion through earlier trust and clearer context.
- Future-proof for productization (structured stage logic, modular content).

Non-goals:
- Not a blog hub.
- Not a services catalog.
- Not five long sections with equal visual weight.
- Not a quiz-only funnel.

## 3. Final IA and Interaction Model

### IA sequence
1. Hero (A-to-Z promise + entry CTA)
2. Journey strip (always-visible 5-stage orientation)
3. Sticky stage selector (primary interaction)
4. Stage snapshot (where user is, what breaks, what good looks like)
5. Best next move (primary conversion + secondary human path)
6. Early deeper-support + trust module (always visible)
7. Optional full support map (expanded details)
8. Stage-aware resources/updates
9. Final stage-aware CTA

### Interaction rules
- Stage selection is first.
- Pressure filters appear only after stage selection.
- Same-page contextual updates only.
- Module shells stay stable while payload swaps.
- Scroll context remains stable.
- URL state remains synced.

### Mobile rules
- Keep sticky stage rail compact.
- Keep primary action visible without overwhelming controls.
- Preserve mobile dock for conversion continuity.

## 4. CTA and Conversion System

### Three CTA families
- `Find my stage`
- `Start ...` (contextual next action)
- `Book a strategy call`

### Conversion architecture
- Self-serve path: stage -> next action/tool/guide.
- Human path: stage-aware strategy call from any major decision point.

### Context propagation
All human-path links should carry:
- stage
- pressure
- cta path
- user context note

## 5. Copy and Messaging System

### Tone rules
- Founder-friendly, practical, direct.
- One clear idea per block.
- Avoid internal jargon and consulting-speak.

### Stage content structure
Each stage should explicitly answer:
- who it is for
- what it feels like
- what usually breaks
- what good looks like
- what to do next
- how Amalgam helps

## 6. Trust Strategy

Trust appears in two layers:
- Early trust: proof card and confidence framing near next-step action.
- Deeper trust: optional expanded support map with full program/resource detail.

Principle:
- Do not hide all trust behind expansion toggles.

## 7. Visual and Experience Direction

Design intent:
- calm
- premium
- warm
- guided
- high-signal

Execution patterns:
- staged hierarchy
- restrained surface contrast
- clear section purpose
- no decorative overload
- one dominant action per module

## 8. Implementation Status (Completed)

### Implemented in code
- Hero reframed to A-to-Z positioning.
- New always-visible journey strip added near top.
- Sticky selector copy and interaction simplified.
- Stage model expanded with richer context (`commonBreaks`, `goodLooksLike`, `amalgamHelp`).
- Snapshot and stage-context sections rewritten for clarity and guidance.
- Best-next-move module refined and CTA language standardized.
- Early deeper-support + trust module added before optional expansion.
- Disclosure relabeled to `full support map` language.
- Metadata updated to reflect A-to-Z and stage-aware clarity.
- Navigation contact removal kept (`headerNavItems` filter).

## 9. Measurement Plan

### Primary events
- `launchpad_primary_cta_click`
- `launchpad_journey_strip_stage_click`
- `launchpad_stage_selected`
- `launchpad_pressure_selected`
- `launchpad_jump_to_recommendations_click`
- `launchpad_primary_action_click`
- `launchpad_secondary_action_click`
- `launchpad_primary_program_recommendation_click`
- `launchpad_primary_program_call_click`
- `launchpad_full_map_toggle`
- `launchpad_final_primary_click`
- `launchpad_final_secondary_click`

### Success metrics
- Time to stage selection.
- Stage selection rate.
- Next-step CTA CTR by stage.
- Strategy call CTR by stage and pressure.
- Full support map open rate.
- Newsletter/signup conversion from stage pages.

## 10. Launch QA Checklist

### Desktop (1280+)
- Hero communicates A-to-Z in one scan.
- Journey strip is visible and clear.
- Stage selector remains readable and non-crowded while sticky.
- Stage switch updates modules without jumpy layout.
- Primary and secondary CTAs remain visually distinct.

### Tablet (768)
- Sticky selector remains usable with wrapped chips.
- Pressure controls do not bury primary actions.
- Program/trust cards remain legible and balanced.

### Mobile (380)
- Above-the-fold has one clear first action.
- Sticky selector compact mode keeps touch targets >= 44px.
- Mobile dock appears and hides at expected moments.
- No horizontal overflow.
- Final CTA remains easy to reach and understand.

### Accessibility
- Keyboard-only path: stage -> pressure -> next action -> call.
- Focus visibility and order remain clear.
- Live region updates are meaningful and not noisy.
- Contrast remains AA for actionable text and controls.

### Technical validation
- `pnpm typecheck` passes.
- Modified files lint clean.
- URL state and back/forward behavior remain intact.

## 11. Future-Proofing Notes

The current structure is intentionally modular for future productization:
- stage-aware recommendation layer
- richer diagnostics integration
- account-based saved context
- structured intent scoring
- campaign and lifecycle personalization

Principle:
Keep Launchpad as a decision system, not a content pile.

