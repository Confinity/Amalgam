# Analytics Taxonomy and Instrumentation Plan

## Current Problems
- Generic event names hide intent:
  - `cta_clicked` is reused across final CTA bands.
- Property naming drift:
  - snake_case (`has_email`) and camelCase (`hasInterest`, `hasWebsite`) are mixed.
- Semantic overlap:
  - `launchpad_tool_complete` and `ynm_stage_tool_completed` both describe tool completion.
- Coverage gaps:
  - Homepage, services, and our-work hero/section CTA clicks are mostly untracked.
- Unstable dimensions:
  - `surface` value derives from headline text in final CTA tracking, so copy edits change reporting keys.

## Naming Conventions
- Event names: `snake_case`, verb-first, intent-specific.
- Shared properties: `page_path`, `route_group`, `source`, `device_type`, `session_id` (if available), `timestamp`.
- CTA properties: `cta_id`, `cta_label`, `cta_variant`, `destination`, `surface`.
- Form properties: `form_id`, `field_id`, `error_type`, `attempt_id`.

## Core Event Set
## Navigation and CTA
- `hero_cta_clicked`
- `section_cta_clicked`
- `final_cta_clicked`
- `navigation_link_clicked`
- `navigation_primary_cta_clicked`
- `strategy_call_clicked`

## Next Move Journey
- `next_move_stage_selected`
- `next_move_pressure_selected`
- `next_move_comparison_opened`
- `tool_started`
- `tool_completed`
- `service_escalation_clicked`

## Form and Contact
- `form_started`
- `form_submitted`
- `form_error`
- `contact_success`
- `contact_channel_clicked`

## Content and Proof
- `case_study_opened`
- `case_study_filter_applied`
- `article_opened`
- `article_read_depth_reached`
- `proof_link_clicked`

## Proposed Required Events (Directly Requested)
- `hero_cta_clicked`
- `section_cta_clicked`
- `strategy_call_clicked`
- `next_move_stage_selected`
- `next_move_pressure_selected`
- `tool_started`
- `form_started`
- `form_submitted`
- `form_error`
- `case_study_opened`
- `article_opened`
- `contact_success`
- `careers_interest`

## Mapping from Current to Proposed
- `stage_confirmed` -> `next_move_stage_selected`
- `pressure_selected` -> `next_move_pressure_selected`
- `stage_comparison_opened` -> `next_move_comparison_opened`
- `launchpad_tool_start` -> `tool_started`
- `launchpad_tool_complete` + `ynm_stage_tool_completed` -> `tool_completed`
- `contact_form_started` -> `form_started`
- `contact_form_submitted` -> `form_submitted`
- `contact_form_submit_failure` + `contact_form_validation_error` -> `form_error`
- `contact_form_submit_success` -> `contact_success`
- `case_study_filter_updated` -> `case_study_filter_applied`
- `knowledge_brief_opened` -> `article_opened`
- `contact_strategy_call_clicked` + CTA strategy call variants -> `strategy_call_clicked`

## Immediate Fixes
- Replace `cta_clicked` with explicit event names and static `cta_id`.
- Normalize contact form properties to snake_case:
  - `has_interest`, `has_website`.
- Emit one canonical completion event per tool submission.
- Add CTA events to:
  - homepage hero and section CTAs,
  - services hero and timeline CTAs,
  - our-work hero and spotlight CTAs.

## Event Priority
## P0
- `strategy_call_clicked`
- `hero_cta_clicked`
- `form_started`
- `form_submitted`
- `contact_success`
- `next_move_stage_selected`
- `tool_started`
- `tool_completed`

## P1
- `section_cta_clicked`
- `case_study_filter_applied`
- `proof_link_clicked`
- `article_opened`

## P2
- `careers_interest`
- deep interaction events for low-volume secondary routes.

## Tracking QA Rules
- Every primary CTA must emit one event with stable `cta_id`.
- No event property should depend on editable marketing copy.
- Every conversion funnel must have start, progress, and success events.
- Do not track purely decorative interactions.

