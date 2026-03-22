# Conversion Experiment Backlog

## A) Ship Immediately (No Test Needed)
## 1. Fix Next Move compile regression
- Hypothesis: Restoring build integrity prevents hidden runtime failures and analytics gaps.
- Pages: `/next-move` and related stage workspace components.
- User benefit: Stable experience.
- Business benefit: Lower reliability risk.
- Success events: build passes, no runtime errors.

## 2. Add missing CTA instrumentation on top conversion pages
- Hypothesis: Full CTA coverage will reveal highest-performing action paths quickly.
- Pages: `/`, `/services`, `/our-work`.
- User benefit: none direct, but enables better optimization.
- Business benefit: actionable attribution.
- Success events: `hero_cta_clicked`, `section_cta_clicked`, `strategy_call_clicked`.

## 3. Replace generic `cta_clicked` with scoped events
- Hypothesis: Specific events improve interpretability and reduce analytics cleanup.
- Pages: shared final CTA component and all consumers.
- User benefit: none direct.
- Business benefit: better reporting trust.
- Success events: event schema validation with zero generic CTA events in new data.

## 4. Standardize contact event property style
- Hypothesis: Unified property schema enables reliable funnel analysis.
- Pages: `/contact`, `signals` signup.
- User benefit: none direct.
- Business benefit: accurate form analytics.
- Success events: all contact and signals properties in snake_case.

## B) Test Next
## 1. Homepage primary CTA wording
- Hypothesis: `Map my stage in 2 minutes` will outperform `Find my stage`.
- Pages: `/`.
- User benefit: clearer expectation.
- Business benefit: more next-move starts.
- Success events: `hero_cta_clicked`, `next_move_stage_selected`.

## 2. Contact form field friction
- Hypothesis: one-name field variant increases submit rate without reducing lead quality.
- Pages: `/contact`.
- User benefit: faster submission.
- Business benefit: more qualified starts and submissions.
- Success events: `form_started`, `form_submitted`, `contact_success`.

## 3. Services page proof placement
- Hypothesis: placing service-specific proof above each service CTA increases escalation confidence.
- Pages: `/services`.
- User benefit: clearer trust signal near decision.
- Business benefit: higher strategy-call conversion from services route.
- Success events: `section_cta_clicked`, `strategy_call_clicked`.

## 4. Our Work spotlight CTA framing
- Hypothesis: contextual CTA (`See if this matches your situation`) increases clickthrough over `Read case study`.
- Pages: `/our-work`.
- User benefit: clearer relevance cue.
- Business benefit: more case-study depth visits.
- Success events: `section_cta_clicked`, `case_study_opened`.

## 5. Final CTA band copy on key pages
- Hypothesis: outcome-specific headline outperforms generic `Need a clear next step?`.
- Pages: `/services`, `/about`, `/contact`.
- User benefit: reduced ambiguity.
- Business benefit: higher CTA clickthrough.
- Success events: `final_cta_clicked`, `strategy_call_clicked`.

## C) Monitor
## 1. Next Move stage-to-contact lift
- Metric: stage selection to strategy-call click rate.
- Pages: `/next-move` plus tool pages.
- Events: `next_move_stage_selected`, `strategy_call_clicked`.

## 2. Case-study filter quality
- Metric: filter usage to case-study open ratio.
- Pages: `/our-work`.
- Events: `case_study_filter_applied`, `case_study_opened`.

## 3. Content-to-conversion path
- Metric: article/case-study readers who initiate contact within same session window.
- Pages: `/our-take/*`, `/case-studies/*`.
- Events: `article_opened`, `case_study_opened`, `strategy_call_clicked`, `form_started`.

