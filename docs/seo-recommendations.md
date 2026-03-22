# SEO and Discoverability Recommendations

## Current State Summary
- Core pages have title, description, and canonical metadata.
- Most pages rely on site-level OG/Twitter metadata from `app/layout.tsx`.
- Dynamic article/case pages include JSON-LD, but URL fields are hardcoded to `https://amalgam-inc.com`.
- Sitemap includes major routes, launchpad routes, case studies, and articles, but uses `new Date()` for all `lastModified` values (`app/sitemap.ts`).

## Highest-Impact Gaps
- Missing page-specific OG/Twitter tags on most conversion pages.
- Split content IA between `/our-work` hub and `/case-studies/*` detail routes can dilute topical clustering.
- Link text is often generic (`See how we work`, `Start diagnostic`) without intent specificity.
- Topic browse cards on `/our-take` are more informational than discoverability-driving.

## Page Title and Meta Guidance
## Homepage
- Suggested title: `Execution Clarity for Founders and Product Teams | Amalgam`
- Suggested meta: `Find the blocker, choose the right next move, and keep delivery moving. Self-serve diagnostics and direct senior support.`

## Your Next Move
- Suggested title: `Your Next Move: Find Your Stage and Next Step | Amalgam`
- Suggested meta: `Map your current stage, run a focused diagnostic, and choose the right support path based on real execution pressure.`

## What We Offer
- Suggested title: `Execution Support Services: Founder Review, Sprint, Partnership | Amalgam`
- Suggested meta: `Choose the support depth that fits your situation: clear read, focused execution sprint, or ongoing outcome partnership.`

## Our Work
- Suggested title: `Case Studies: How Teams Unblocked Delivery and Scaled | Amalgam`
- Suggested meta: `Browse situation-first case studies by pressure, stage, and industry to find the closest match to your context.`

## Contact
- Suggested title: `Contact Amalgam | Get a Clear Next Step Within One Business Day`
- Suggested meta: `Share your context and get a direct next-step recommendation. Talk by strategy call or send a quick message.`

## OG and Social Preview Strategy
- Add route-level OG/Twitter metadata to:
  - `/`,
  - `/next-move`,
  - `/services`,
  - `/our-work`,
  - `/contact`.
- Ensure OG title mirrors page intent, not only brand-wide message.
- Use page-specific OG image variants for top 5 conversion routes.

## Structured Data Improvements
- Keep existing `WebSite` and `ProfessionalService` schema.
- Add `Service` schema to offer pages.
- Add `BreadcrumbList` schema for `/our-work`, `/our-take`, and dynamic detail pages.
- Replace hardcoded URLs in dynamic JSON-LD with `absoluteUrl(...)` for environment consistency.

## Internal Linking Guidance
- Add contextual cross-links from each offer detail page to:
  - one matching case study,
  - one matching `Our Take` article,
  - one matching `Your Next Move` tool.
- Ensure every case-study detail page links to:
  - relevant service page,
  - relevant next-move tool,
  - related article.
- Make `Browse by domain` blocks on `/our-take` actionable filters or route links.

## Technical SEO Notes
- Keep canonical consistency on all indexed routes.
- Keep noindex on pure redirect and utility pages.
- Update `lastModified` in sitemap to content-aware dates where possible instead of uniform `new Date()`.
- Preserve redirect coverage for legacy routes to prevent link equity loss.

