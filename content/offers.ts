export type OfferId = "founder-review" | "execution-sprint" | "outcome-partnership"

export type OfferRouteHighlight = {
  label: string
  value: string
  detail: string
  href?: string
}

export type OfferRunStep = {
  title: string
  detail: string
}

export type OfferRelatedLink = {
  label: string
  title: string
  description: string
  href: string
}

export type OfferFaqItem = {
  question: string
  answer: string
}

export type Offer = {
  id: OfferId
  title: string
  href: string
  summary: string
  bestFor: string
  scopeSignal: string
  whenToChoose: string[]
  leaveWith: string[]
  whyExists: string
  heroTitle: string
  heroSupport: string
  heroHelper: string
  heroPrimaryCtaLabel: string
  heroPrimaryCtaHref: string
  heroSecondaryCtaLabel: string
  heroSecondaryCtaHref: string
  routeHighlights: OfferRouteHighlight[]
  howItRuns: OfferRunStep[]
  relatedLinks: OfferRelatedLink[]
  faq: OfferFaqItem[]
  finalCta: {
    headline: string
    support: string
    primaryLabel: string
    primaryHref: string
    secondaryLabel: string
    secondaryHref: string
  }
  primary?: boolean
}

export const offers: Offer[] = [
  {
    id: "founder-review",
    title: "Founder Review",
    href: "/founder-review",
    summary: "Best first step when the next move still needs a clean read.",
    heroTitle: "Start here when the next move still feels unclear.",
    heroSupport:
      "Founder Review is the best first step when pressure is rising and you need a clear read before more planning.",
    heroHelper:
      "Best when you need a direct read on what is blocking progress and one next plan you can trust.",
    heroPrimaryCtaLabel: "Talk through Founder Review",
    heroPrimaryCtaHref: "https://calendly.com/ryan-amalgam-inc/30min",
    heroSecondaryCtaLabel: "Find your next move first",
    heroSecondaryCtaHref: "/next-move",
    bestFor: "When the next move is unclear and pressure is rising.",
    scopeSignal: "Typical scope: 1 to 2 focused weeks",
    whenToChoose: [
      "The next move is unclear",
      "Delivery is slowing down",
      "Priorities are competing",
      "Architecture concerns are emerging",
    ],
    leaveWith: [
      "Clear read of what is happening",
      "Recommended next-step path",
      "Execution brief leadership can trust",
    ],
    whyExists:
      "Most teams do not need a long sales process. They need clarity first, then the right kind of help.",
    routeHighlights: [
      {
        label: "Best first move",
        value: "Get the real read first",
        detail: "Use this when the situation is noisy and the business needs a clear call before more scope expands.",
      },
      {
        label: "Typical scope",
        value: "1 to 2 focused weeks",
        detail: "Enough time to isolate the main blocker and recommend the strongest next path.",
      },
      {
        label: "What moves forward",
        value: "One trusted next-step brief",
        detail: "You leave with a clear read, a recommended path, and immediate execution priorities.",
        href: "/our-work",
      },
    ],
    howItRuns: [
      {
        title: "Read the real pressure",
        detail: "We start by understanding where work is getting blocked across product, systems, decisions, and delivery.",
      },
      {
        title: "Diagnose the blocker",
        detail: "We separate visible symptoms from the actual constraint so the business is not solving the wrong problem.",
      },
      {
        title: "Recommend the strongest move",
        detail: "We turn that read into one next path that fits the situation, not a generic engagement recommendation.",
      },
      {
        title: "Align on what happens next",
        detail: "The work ends with a usable brief leadership can act on immediately, whether the next move is self-serve or deeper support.",
      },
    ],
    relatedLinks: [
      {
        label: "Related case study",
        title: "Confinity",
        description: "A clearer read on the real problem helped focus direction and unlock execution momentum.",
        href: "/our-work/confinity",
      },
      {
        label: "Related article",
        title: "Create an architecture map before a roadmap",
        description: "Ground roadmap choices in system reality before planning spreads in the wrong direction.",
        href: "/research/architecture-map-before-roadmap",
      },
      {
        label: "Self-serve first",
        title: "Find your stage in Your Next Move",
        description: "Use the decision layer if you want a structured self-serve read before talking through the situation.",
        href: "/next-move",
      },
    ],
    faq: [
      {
        question: "When is Founder Review a better first move than Expert Intervention?",
        answer:
          "Founder Review is the stronger first move when the real blocker still needs diagnosis. If the team already knows the blocker and mainly needs fast delivery help, that usually points to Expert Intervention instead.",
      },
      {
        question: "What do teams typically leave with after Founder Review?",
        answer:
          "Usually a clearer read on the pressure, a recommended next-step path, and an execution brief leadership can use to decide what should happen next.",
      },
      {
        question: "How much context do you need before Founder Review is useful?",
        answer:
          "Not much. The point is to create clarity from a messy situation, not to wait until every detail is already organized internally.",
      },
    ],
    finalCta: {
      headline: "Need the clearest first move before more work stacks up?",
      support:
        "Talk through the situation and we will confirm whether Founder Review is the right starting point or whether another path makes more sense.",
      primaryLabel: "Talk through Founder Review",
      primaryHref: "https://calendly.com/ryan-amalgam-inc/30min",
      secondaryLabel: "Find your next move",
      secondaryHref: "/next-move",
    },
    primary: true,
  },
  {
    id: "execution-sprint",
    title: "Expert Intervention",
    href: "/focused-intervention",
    summary: "Resolve one known blocker fast and give the team a plan it can execute.",
    heroTitle: "Use this when the blocker is visible and speed matters.",
    heroSupport:
      "Expert Intervention is for moments when you can see the blocker but still need senior hands-on help and a plan your team can run.",
    heroHelper:
      "Best when the core issue is clear enough to act on, but the current plan still needs a cleaner path through execution.",
    heroPrimaryCtaLabel: "Talk through Expert Intervention",
    heroPrimaryCtaHref: "/contact?interest=focused-intervention",
    heroSecondaryCtaLabel: "Run the delivery slowdown diagnostic",
    heroSecondaryCtaHref: "/next-move/delivery-drag-diagnostic",
    bestFor: "When the problem is known but execution keeps slowing down.",
    scopeSignal: "Typical scope: 2 to 6 focused weeks on one critical blocker",
    whenToChoose: [
      "The problem is known",
      "Execution is slowing down",
      "A blocker needs to be resolved fast",
    ],
    leaveWith: [
      "Practical plan and next steps",
      "Team-ready execution path",
      "Roadmap slice with risk visibility",
    ],
    whyExists:
      "Teams often need expert intervention in one critical path, not broad discovery.",
    routeHighlights: [
      {
        label: "Best when",
        value: "One blocker is now visible",
        detail: "Use this when the team can see the blocker and needs a clear path through it.",
      },
      {
        label: "Typical scope",
        value: "2 to 6 focused weeks",
        detail: "Tight intervention around one high-value path, not a broad transformation program.",
      },
      {
        label: "What moves forward",
        value: "A team-ready execution path",
        detail: "You leave with next steps, risks, and actions the team can carry forward.",
        href: "/our-work",
      },
    ],
    howItRuns: [
      {
        title: "Define the critical path",
        detail: "We narrow the work to the constraint that is actually distorting delivery, not the loudest visible symptom.",
      },
      {
        title: "Plan the work in the right order",
        detail: "We map dependencies, risk, and order so the roadmap matches reality.",
      },
      {
        title: "Resolve the biggest blocker",
        detail: "We focus where help changes delivery fastest, whether the issue is technical, workflow, or coordination.",
      },
      {
        title: "Leave the team with a usable path",
        detail: "The sprint ends with a practical plan and next steps the team can keep moving with.",
      },
    ],
    relatedLinks: [
      {
        label: "Related case study",
        title: "PearlX",
        description: "Execution pressure eased once the team focused on the real blocker instead of broad scope.",
        href: "/our-work/pearlx",
      },
      {
        label: "Related article",
        title: "Planning roadmaps under uncertainty",
        description: "A better roadmap starts with honest dependency logic, not just more detail.",
        href: "/research/sequencing-roadmaps-under-uncertainty",
      },
      {
        label: "Self-serve first",
        title: "Diagnose delivery slowdown",
        description: "Use the diagnostic if the team feels the slowdown but still needs a sharper read on what is actually causing it.",
        href: "/next-move/delivery-drag-diagnostic",
      },
    ],
    faq: [
      {
        question: "When is Expert Intervention the right fit?",
        answer:
          "It is the right fit when the business already has a clear read on the problem and mainly needs senior help resolving one critical blocker quickly.",
      },
      {
        question: "What do teams usually leave with after Expert Intervention?",
        answer:
          "Usually a practical roadmap slice, clearer risks, and next actions the team can run with.",
      },
      {
        question: "What if the blocker turns out to be less clear than expected?",
        answer:
          "If the core issue is still too fuzzy, we would say so directly. In those cases the work often needs a clearer assessment before a sprint-style intervention is the right move.",
      },
    ],
    finalCta: {
      headline: "Need a faster path through one critical blocker?",
      support:
        "Talk through the situation and we will confirm whether the constraint is clear enough for Expert Intervention or whether it still needs diagnosis first.",
      primaryLabel: "Talk through Expert Intervention",
      primaryHref: "/contact?interest=focused-intervention",
      secondaryLabel: "Run the delivery slowdown diagnostic",
      secondaryHref: "/next-move/delivery-drag-diagnostic",
    },
  },
  {
    id: "outcome-partnership",
    title: "Outcome Partnership",
    href: "/outcome-partnership",
    summary: "Ongoing senior support that keeps alignment and momentum steady during execution.",
    heroTitle: "Use this when the work is active and continuity matters most.",
    heroSupport:
      "Outcome Partnership keeps senior support close to live execution when complexity and changing priorities make continuity the real risk.",
    heroHelper:
      "Best when work is already moving and you need steady support, faster unblockers, and clear decisions over time.",
    heroPrimaryCtaLabel: "Talk through Outcome Partnership",
    heroPrimaryCtaHref: "/contact?interest=outcome-partnership",
    heroSecondaryCtaLabel: "Run the scale readiness check",
    heroSecondaryCtaHref: "/next-move/scale-readiness-check",
    bestFor: "When work is active and you need continuity in the loop.",
    scopeSignal: "Typical scope: ongoing monthly execution continuity",
    whenToChoose: [
      "Work is active and complex",
      "Senior support needs to stay in the loop",
      "Alignment and momentum must hold",
    ],
    leaveWith: [
      "Steady senior support",
      "Decision continuity and unblock support",
      "Operating loop that holds under pressure",
    ],
    whyExists:
      "Some situations are not solved in one sprint. They need calm continuity while complexity rises.",
    routeHighlights: [
      {
        label: "Best when",
        value: "Execution is already in motion",
        detail: "Use this when plans exist but continuity and alignment are starting to slip.",
      },
      {
        label: "Typical scope",
        value: "Ongoing monthly continuity",
        detail: "Senior support stays close to the work while complexity keeps changing the shape of execution.",
      },
      {
        label: "What moves forward",
        value: "A steadier operating rhythm",
        detail: "The team gets clearer decisions, faster unblockers, and continuity as priorities shift.",
        href: "/our-work",
      },
    ],
    howItRuns: [
      {
        title: "Stay close to active decisions",
        detail: "We stay close enough to help with the decisions that would otherwise slow or distort the work.",
      },
      {
        title: "Hold the operating rhythm",
        detail: "We protect the cadence and execution loop that keep teams aligned as complexity rises.",
      },
      {
        title: "Resolve blockers without spinning up a new project",
        detail: "The support is designed for continuity, not another heavy standalone initiative every time pressure shifts.",
      },
      {
        title: "Protect momentum as priorities change",
        detail: "The work stays grounded in outcomes while priorities change and new information comes in.",
      },
    ],
    relatedLinks: [
      {
        label: "Related case study",
        title: "M&T Bank",
        description: "Execution continuity held under modernization pressure because the work stayed grounded in clear priorities.",
        href: "/our-work/mt-bank",
      },
      {
        label: "Related article",
        title: "Operating rhythm after growth",
        description: "A stronger operating rhythm is often the difference between active work and sustainable momentum.",
        href: "/research/operating-rhythm-after-growth",
      },
      {
        label: "Self-serve first",
        title: "Run the scale readiness check",
        description: "Use the readiness check if complexity is rising and you want a structured first-pass read before deciding on deeper support.",
        href: "/next-move/scale-readiness-check",
      },
    ],
    faq: [
      {
        question: "When does Outcome Partnership make more sense than a sprint?",
        answer:
          "Outcome Partnership is the better fit when work is already active and you need continuity, ongoing unblock support, and steadier senior support in the loop over time.",
      },
      {
        question: "How hands-on is Outcome Partnership?",
        answer:
          "It is hands-on enough to stay close to important decisions, blockers, and operating rhythm, while still fitting the reality of a live team and live roadmap.",
      },
      {
        question: "What kind of teams benefit most from this model?",
        answer:
          "Usually teams already carrying meaningful execution load, where complexity is rising faster than alignment and decision confidence can keep up on their own.",
      },
    ],
    finalCta: {
      headline: "Need steadier senior continuity while the work keeps moving?",
      support:
        "Talk through the situation and we will confirm whether Outcome Partnership is the right fit for the current execution load and complexity.",
      primaryLabel: "Talk through Outcome Partnership",
      primaryHref: "/contact?interest=outcome-partnership",
      secondaryLabel: "Run the scale readiness check",
      secondaryHref: "/next-move/scale-readiness-check",
    },
  },
]

export function getOfferById(offerId: OfferId) {
  return offers.find((offer) => offer.id === offerId)!
}

export const engagementTimeline = [
  {
    id: "founder-review",
    title: "Founder Review",
    href: "/founder-review",
    ctaLabel: "Explore Founder Review",
    contextLine: "For unclear priorities and important decisions",
    summary: "We help you understand what's wrong, what matters most, and what to do next.",
    bestWhen: "The next move is unclear and big decisions are coming fast.",
    typicalScope: "1 to 2 focused weeks.",
    whatYouGet: [
      "A clear read on what is blocking progress.",
      "A practical next plan your team can start right away.",
    ],
  },
  {
    id: "execution-sprint",
    title: "Expert Guidance",
    href: "/focused-intervention",
    ctaLabel: "Explore Expert Guidance",
    contextLine: "For one known blocker in active work",
    summary: "We turn one hard problem into a clear plan your team can run with.",
    bestWhen: "You can see the blocker and need to fix it fast.",
    typicalScope: "2 to 6 focused weeks.",
    whatYouGet: [
      "A focused plan for one critical path.",
      "Hands-on help to unblock work and keep delivery moving.",
    ],
  },
  {
    id: "outcome-partnership",
    title: "Outcome Partnership",
    href: "/outcome-partnership",
    ctaLabel: "Explore Outcome Partnership",
    contextLine: "For teams that need steady support while work moves",
    summary: "We stay close while work moves so decisions and delivery keep moving.",
    bestWhen: "Work is active and you need steady follow-through.",
    typicalScope: "Ongoing monthly support.",
    whatYouGet: [
      "Steady support while your team builds and ships.",
      "Fast help when new blockers show up.",
    ],
  },
] as const

export const deeperSupportAreas = [
  {
    title: "Set the right foundation",
    detail: "We fix weak spots early so the work is easier to build and scale.",
  },
  {
    title: "Build with a clear plan",
    detail: "We shape the work, reduce guesswork, and help your team move with confidence.",
  },
  {
    title: "Stay close through delivery",
    detail: "We stay involved while work moves so execution and follow-through stay clear.",
  },
]



