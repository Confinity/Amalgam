import type { OfferId } from "@/content/offers"

export type LaunchpadEntryPoint = "hero" | "pressure" | "journey" | "deep-link"

export type LaunchpadStageId =
  | "ideate-prioritize"
  | "validate-derisk"
  | "build-ship"
  | "productize-systemize"
  | "scale-stabilize"

export type LaunchpadPressureId =
  | "ideas-competing"
  | "clear-next-move"
  | "validation-unclear"
  | "delivery-slowing"
  | "systems-fragile"
  | "scale-complexity"

export type LaunchpadStageConfidence = "high" | "medium" | "low"
export type LaunchpadMomentumLevel = "Low" | "Medium" | "High"
export type LaunchpadSelectionSource = "url" | "pressure" | "hero" | "rail" | "default"
export type LaunchpadDisclosureKey = "breakpoints" | "antiFocus" | "proof" | "comparison"

export type SupportPathType =
  | "founder-review"
  | "execution-sprint"
  | "outcome-partnership"
  | "execution-sprint-or-outcome-partnership"

export type LaunchpadPressureSignal = {
  id: LaunchpadPressureId
  title: string
  label: string
  detail: string
  likelyStage: LaunchpadStageId
  stage: LaunchpadStageId
  confidence: LaunchpadStageConfidence
  adjacentStage: LaunchpadStageId
  rationale: string
  compareSuggestion: string
}

export type LaunchpadPrompt = {
  id: string
  question: string
  stage: LaunchpadStageId
}

export type LaunchpadResourceLink = {
  id: string
  type: "Article" | "Case study" | "Guide" | "Tool"
  title: string
  summary: string
  why: string
  href: string
  pressureTags: LaunchpadPressureId[]
  entryTags?: LaunchpadEntryPoint[]
}

export type LaunchpadServiceRecommendation = {
  service:
    | "Founder Review"
    | "Focused Intervention"
    | "Outcome Partnership"
    | "Focused Intervention or Outcome Partnership"
  stageHeadline: string
  whySupportFits: string
  bringInWhen: string
  bringAmalgamInWhen: string
  unlocks: string
  proofCue: string
  ctaLabel: string
  href: string
  secondaryLabel?: string
  secondaryHref?: string
}

export type LaunchpadSelfServe = {
  title: string
  summary: string
  href: string
  output: string
  purpose: string
  artifactOutput: string
  whyNow: string
  timeEstimate: string
  estimatedTime?: string
  ownerRole?: string
  expectedOutput?: string
  ctaLabel: string
  previewItems: string[]
}

export type LaunchpadAiHelp = {
  headline: string
  outputType: string
  promptIntent: string
  ctaLabel: string
  summary: string
  examples: string[]
}

export type LaunchpadProofSnippet = {
  label: string
  text: string
  href: string
}

export type LaunchpadStage = {
  id: LaunchpadStageId
  slug: LaunchpadStageId
  number: number
  title: string
  canonicalLabel: string
  name: string
  label: string
  shortLabel: string
  recognition: string
  meaning: string
  breakpoints: string[]
  priority: string
  antiFocus: string[]
  shortDescriptor: string
  oneLineObjective: string
  objective: string
  stageStateSummary: string
  snapshot: string
  feelsLike: string[]
  breaksHere: string[]
  notYetFocus: string[]
  notYet: string[]
  mattersNow: string
  nextMove: {
    title: string
    summary: string
    cta: {
      label: string
      href: string
    }
  }
  selfServe: LaunchpadSelfServe
  selfServeEnough: string
  bringInCondition: string
  aiHelp: LaunchpadAiHelp
  supportPath: {
    type: SupportPathType
    label: string
    description: string
    ctaLabel: string
    href: string
    secondaryLabel?: string
    secondaryHref?: string
  }
  proof: {
    featuredSupport: {
      label: string
      description: string
      href: string
    }
    article?: {
      label: string
      description: string
      href: string
    }
    caseStudy?: {
      label: string
      description: string
      href: string
    }
  }
  serviceRecommendation: LaunchpadServiceRecommendation
  proofSnippet: LaunchpadProofSnippet
  proofCue: LaunchpadProofSnippet
  supportResources: LaunchpadResourceLink[]
  resources: LaunchpadResourceLink[]
  tool: LaunchpadSelfServe
  aiAction: LaunchpadAiHelp
  cta: {
    headline: string
    support: string
    primaryLabel: string
    primaryHref: string
    secondaryLabel: string
    secondaryHref: string
  }
  finalBand: {
    headline: string
    supportingLine: string
    primaryCtaLabel: string
    primaryCtaHref: string
    optionalSecondaryLabel?: string
    optionalSecondaryHref?: string
  }
  supportDepth: "self-serve" | "guided-intervention" | "continuity-partnership"
  confidenceGuardrail?: string
  pressureConfidenceCopy: string
  adjacentCompareLabels: {
    previous?: string
    next?: string
  }
  defaultExpandedSections: LaunchpadDisclosureKey[]
  mobileCollapsedSections: LaunchpadDisclosureKey[]
  analyticsKey: string
  finalCTA: {
    headline: string
    support: string
    primaryLabel: string
    primaryHref: string
    secondaryLabel: string
    secondaryHref: string
  }
  adjacentStages: LaunchpadStageId[]
  pressureMappings: LaunchpadPressureId[]

  // Compatibility fields used by older components.
  summary: string
  looksLike: string[]
  blockers: string[]
  recommendedNextStep: string
  bestFitOffer: OfferId | "execution-sprint-or-outcome-partnership"
  finalCta: {
    headline: string
    support: string
  }
}

const stageOrder: LaunchpadStageId[] = [
  "ideate-prioritize",
  "validate-derisk",
  "build-ship",
  "productize-systemize",
  "scale-stabilize",
]

const stageNameById: Record<LaunchpadStageId, string> = {
  "ideate-prioritize": "Ideate & Prioritize",
  "validate-derisk": "Validate & De-risk",
  "build-ship": "Build & Ship",
  "productize-systemize": "Productize & Systemize",
  "scale-stabilize": "Scale & Stabilize",
}

export const launchpadPressureSignals: LaunchpadPressureSignal[] = [
  {
    id: "ideas-competing",
    label: "I have too many ideas competing",
    title: "I have too many ideas competing",
    detail: "There are too many directions and no clear focus.",
    likelyStage: "ideate-prioritize",
    stage: "ideate-prioritize",
    confidence: "high",
    adjacentStage: "validate-derisk",
    rationale:
      "You are likely still narrowing what is worth pursuing, not scaling execution yet.",
    compareSuggestion: "Compare with Validate & De-risk if evidence confidence is the real blocker.",
  },
  {
    id: "clear-next-move",
    label: "I need a clearer next move",
    title: "I need a clearer next move",
    detail: "I can see the friction, but not the next step.",
    likelyStage: "ideate-prioritize",
    stage: "ideate-prioritize",
    confidence: "medium",
    adjacentStage: "validate-derisk",
    rationale:
      "The immediate blocker is prioritization clarity: what to pursue first and what to ignore for now.",
    compareSuggestion: "Compare with Validate & De-risk if one concept is already clear and needs testing.",
  },
  {
    id: "validation-unclear",
    label: "I need to validate demand",
    title: "I need to validate demand",
    detail: "There is direction, but confidence is still weak.",
    likelyStage: "validate-derisk",
    stage: "validate-derisk",
    confidence: "high",
    adjacentStage: "ideate-prioritize",
    rationale:
      "The pressure is about reducing uncertainty before deeper commitment, which points to validation work.",
    compareSuggestion: "Compare with Ideate & Prioritize if the core problem framing is still unstable.",
  },
  {
    id: "delivery-slowing",
    label: "We're building, but delivery is slowing down",
    title: "We're building, but delivery is slowing down",
    detail: "Work is moving, but drag keeps stacking up.",
    likelyStage: "build-ship",
    stage: "build-ship",
    confidence: "high",
    adjacentStage: "productize-systemize",
    rationale:
      "Delivery friction is likely the immediate constraint. Productize next if system fragility is also rising.",
    compareSuggestion: "Compare with Productize & Systemize if reliability fragility is now driving the drag.",
  },
  {
    id: "systems-fragile",
    label: "Our product works, but the foundations are weak",
    title: "Our product works, but the foundations are weak",
    detail: "What is live is harder to run than it should be.",
    likelyStage: "productize-systemize",
    stage: "productize-systemize",
    confidence: "high",
    adjacentStage: "scale-stabilize",
    rationale:
      "The core issue appears to be operating reliability and system shape, not just delivery speed.",
    compareSuggestion: "Compare with Scale & Stabilize if cross-team decision drag is the dominant pressure.",
  },
  {
    id: "scale-complexity",
    label: "We're growing, and execution is getting harder",
    title: "We're growing, and execution is getting harder",
    detail: "Complexity is creating alignment and reliability drag.",
    likelyStage: "scale-stabilize",
    stage: "scale-stabilize",
    confidence: "high",
    adjacentStage: "productize-systemize",
    rationale:
      "The pressure is around alignment and consistency under growth, which is a scale stabilization problem.",
    compareSuggestion: "Compare with Productize & Systemize if system reliability is the clearer issue right now.",
  },
]

function buildStage(
  stage: Omit<
    LaunchpadStage,
    | "label"
    | "shortLabel"
    | "recognition"
    | "meaning"
    | "breakpoints"
    | "priority"
    | "antiFocus"
    | "selfServeEnough"
    | "bringInCondition"
    | "supportPath"
    | "proof"
    | "finalBand"
    | "supportDepth"
    | "confidenceGuardrail"
    | "analyticsKey"
    | "title"
    | "oneLineObjective"
    | "stageStateSummary"
    | "notYetFocus"
    | "proofCue"
    | "supportResources"
    | "canonicalLabel"
    | "pressureConfidenceCopy"
    | "adjacentCompareLabels"
    | "defaultExpandedSections"
    | "mobileCollapsedSections"
    | "tool"
    | "aiAction"
    | "finalCTA"
    | "summary"
    | "looksLike"
    | "blockers"
    | "recommendedNextStep"
    | "finalCta"
  > & { blockers: string[] },
): LaunchpadStage {
  const featuredSupport = stage.resources.find((resource) => resource.type === "Tool") ?? stage.resources[0]
  const featuredArticle = stage.resources.find((resource) => resource.type === "Article")
  const featuredCaseStudy = stage.resources.find((resource) => resource.type === "Case study")

  const supportPathType: SupportPathType =
    stage.serviceRecommendation.service === "Founder Review"
      ? "founder-review"
      : stage.serviceRecommendation.service === "Focused Intervention"
        ? "execution-sprint"
      : stage.serviceRecommendation.service === "Outcome Partnership"
        ? "outcome-partnership"
        : "execution-sprint-or-outcome-partnership"
  const stageOrderIndex = stageOrder.findIndex((entry) => entry === stage.id)
  const previousStageId = stageOrderIndex > 0 ? stageOrder[stageOrderIndex - 1] : undefined
  const nextStageId =
    stageOrderIndex >= 0 && stageOrderIndex < stageOrder.length - 1
      ? stageOrder[stageOrderIndex + 1]
      : undefined

  return {
    ...stage,
    canonicalLabel: stage.name,
    label: stage.name,
    shortLabel: stage.name,
    recognition: stage.snapshot,
    meaning: stage.objective,
    breakpoints: stage.breaksHere,
    priority: stage.mattersNow,
    antiFocus: stage.notYet,
    title: stage.name,
    oneLineObjective: stage.objective,
    stageStateSummary: stage.snapshot,
    selfServeEnough:
      "Self-serve is enough when one owner can move the next artifact forward this week.",
    bringInCondition: stage.serviceRecommendation.bringAmalgamInWhen,
    supportPath: {
      type: supportPathType,
      label: stage.serviceRecommendation.service,
      description: stage.serviceRecommendation.whySupportFits,
      ctaLabel: stage.serviceRecommendation.ctaLabel,
      href: stage.serviceRecommendation.href,
      secondaryLabel: stage.serviceRecommendation.secondaryLabel,
      secondaryHref: stage.serviceRecommendation.secondaryHref,
    },
    proof: {
      featuredSupport: {
        label: featuredSupport?.title ?? stage.nextMove.title,
        description: featuredSupport?.summary ?? stage.nextMove.summary,
        href: featuredSupport?.href ?? stage.nextMove.cta.href,
      },
      article: featuredArticle
        ? {
            label: featuredArticle.title,
            description: featuredArticle.summary,
            href: featuredArticle.href,
          }
        : undefined,
      caseStudy: featuredCaseStudy
        ? {
            label: featuredCaseStudy.title,
            description: featuredCaseStudy.summary,
            href: featuredCaseStudy.href,
          }
        : undefined,
    },
    notYetFocus: stage.notYet,
    proofCue: stage.proofSnippet,
    supportResources: stage.resources,
    tool: {
      ...stage.selfServe,
      estimatedTime: stage.selfServe.timeEstimate,
      ownerRole: stage.selfServe.ownerRole ?? "Founder or delivery lead",
      expectedOutput: stage.selfServe.expectedOutput ?? stage.selfServe.artifactOutput,
    },
    aiAction: stage.aiHelp,
    finalBand: {
      headline: stage.cta.headline,
      supportingLine: stage.cta.support,
      primaryCtaLabel: stage.cta.primaryLabel,
      primaryCtaHref: stage.cta.primaryHref,
      optionalSecondaryLabel: stage.cta.secondaryLabel,
      optionalSecondaryHref: stage.cta.secondaryHref,
    },
    supportDepth:
      supportPathType === "founder-review"
        ? "guided-intervention"
        : supportPathType === "execution-sprint"
          ? "guided-intervention"
          : supportPathType === "outcome-partnership"
            ? "continuity-partnership"
            : "guided-intervention",
    confidenceGuardrail: stage.serviceRecommendation.proofCue,
    pressureConfidenceCopy: `This likely maps to ${stage.name}`,
    adjacentCompareLabels: {
      previous: previousStageId ? stageNameById[previousStageId] : undefined,
      next: nextStageId ? stageNameById[nextStageId] : undefined,
    },
    defaultExpandedSections: [],
    mobileCollapsedSections: ["breakpoints", "antiFocus", "proof", "comparison"],
    analyticsKey: stage.id,
    finalCTA: stage.cta,
    summary: stage.snapshot,
    looksLike: stage.feelsLike,
    recommendedNextStep: stage.nextMove.summary,
    finalCta: {
      headline: stage.cta.headline,
      support: stage.cta.support,
    },
  }
}

export const launchpadStages: LaunchpadStage[] = [
  buildStage({
    id: "ideate-prioritize",
    slug: "ideate-prioritize",
    number: 1,
    name: "Ideate & Prioritize",
    shortDescriptor: "Pick the right problem",
    objective: "Choose one problem worth committing to this week.",
    snapshot:
      "You have ideas and opportunities, but clarity on what matters most is still forming.",
    feelsLike: [
      "Too many possible directions",
      "Unclear priorities",
      "Weak problem framing",
      "No shared decision criteria",
    ],
    breaksHere: [
      "Priorities change every week",
      "Teams start work before criteria are clear",
      "Momentum gets mistaken for evidence",
    ],
    blockers: [
      "Everything feels urgent",
      "Teams move before criteria are explicit",
      "Evidence and intuition are mixed together",
    ],
    notYet: [
      "Do not expand features before the core problem is chosen",
      "Do not build process around weak signals",
      "Do not scale effort before decision criteria are explicit",
    ],
    mattersNow:
      "Choose one problem worth committing to this week.",
    nextMove: {
      title: "Start the next-step brief",
      summary:
        "Capture one opportunity, key assumptions, and decision criteria in one brief.",
      cta: {
        label: "Start the next-step brief",
        href: "/next-move/next-step-brief",
      },
    },
    selfServe: {
      title: "Next-Step Brief",
      summary:
        "Create a one-page decision artifact before committing heavier build work.",
      href: "/next-move/next-step-brief",
      output:
        "Opportunity brief with assumptions, decision criteria, and immediate test plan.",
      purpose: "Clarify one opportunity, the key assumptions, and decision criteria in one working brief.",
      artifactOutput: "Opportunity brief with assumptions, decision criteria, and immediate test plan.",
      whyNow: "The team needs one clear frame before priorities and scope spread again.",
      timeEstimate: "12-15 minutes",
      ownerRole: "Founder or product lead",
      ctaLabel: "Start the next-step brief",
      previewItems: ["Chosen opportunity", "Core assumptions", "Decision criteria", "Immediate next test"],
    },
    aiHelp: {
      headline: "Accelerate this stage read",
      outputType: "Stage context brief",
      promptIntent: "Cluster early signals and draft a sharper prioritization brief.",
      ctaLabel: "Summarize my stage context",
      summary:
        "AI can help cluster opportunity signals and reduce decision fog quickly.",
      examples: [
        "Cluster opportunity signals",
        "Summarize customer interview patterns",
        "Draft initial decision criteria",
      ],
    },
    serviceRecommendation: {
      service: "Founder Review",
      stageHeadline: "Break the prioritization deadlock",
      whySupportFits:
        "Best when prioritization loops keep repeating and no decision frame sticks.",
      bringInWhen:
        "Bring Amalgam in when the same prioritization debate keeps repeating.",
      bringAmalgamInWhen:
        "Bring Amalgam in when prioritization loops repeat and no decision frame sticks.",
      unlocks:
        "A structured read on the real blocker and a clear recommended next move before work expands.",
      proofCue:
        "Teams here usually move once one opportunity and decision criteria are made explicit.",
      ctaLabel: "Talk this through with us",
      href: "/founder-review",
      secondaryLabel: "Get a recommendation",
      secondaryHref: "/contact",
    },
    proofSnippet: {
      label: "Proof cue",
      text: "Teams in this stage usually need clearer decision criteria before planning helps.",
      href: "/our-work/confinity",
    },
    resources: [
      {
        id: "ideate-tool",
        type: "Tool",
        title: "Next-Step Brief",
        summary: "Turn ambiguity into a clear opportunity brief in one pass.",
        why: "Fastest way to turn early ambiguity into an actionable next step.",
        href: "/next-move/next-step-brief",
        pressureTags: ["ideas-competing", "clear-next-move"],
        entryTags: ["pressure", "deep-link"],
      },
      {
        id: "ideate-article-map",
        type: "Article",
        title: "Create an architecture map before a roadmap",
        summary: "Use system context early so priorities are grounded in reality.",
        why: "Best for narrowing which opportunity is actually viable first.",
        href: "/research/architecture-map-before-roadmap",
        pressureTags: ["ideas-competing", "clear-next-move"],
      },
      {
        id: "ideate-case-confinity",
        type: "Case study",
        title: "Confinity",
        summary: "Aligned the team on one direction and unlocked execution momentum.",
        why: "Shows how a clearer problem definition changed execution quality.",
        href: "/our-work/confinity",
        pressureTags: ["ideas-competing"],
      },
    ],
    cta: {
      headline: "Need help choosing what to do next?",
      support:
        "Start with the brief. If you're still circling, we'll help you pick the right move.",
      primaryLabel: "Start the next-step brief",
      primaryHref: "/next-move/next-step-brief",
      secondaryLabel: "Start with Founder Review",
      secondaryHref: "/founder-review",
    },
    adjacentStages: ["validate-derisk"],
    pressureMappings: ["ideas-competing", "clear-next-move"],
    bestFitOffer: "founder-review",
  }),
  buildStage({
    id: "validate-derisk",
    slug: "validate-derisk",
    number: 2,
    name: "Validate & De-risk",
    shortDescriptor: "Reduce uncertainty",
    objective: "Define what evidence is enough to continue or stop.",
    snapshot:
      "There is a direction, but confidence is not strong enough to justify deeper investment yet.",
    feelsLike: [
      "Validation path is unclear",
      "Evidence quality is mixed",
      "Pressure to move before confidence exists",
      "Different leaders interpret signals differently",
    ],
    breaksHere: [
      "Teams commit before assumptions are tested",
      "Validation criteria stay vague",
      "Signals get interpreted differently across leaders",
    ],
    blockers: [
      "Validation criteria are vague",
      "Assumptions and evidence are mixed together",
      "Roadmap pressure outruns proof quality",
    ],
    notYet: [
      "Do not scale implementation before assumptions are tested",
      "Do not overbuild process before evidence thresholds are clear",
      "Do not treat a weak positive signal as proof",
    ],
    mattersNow:
      "Define what evidence is enough to continue or stop.",
    nextMove: {
      title: "Run the validation plan",
      summary:
        "Set tests and thresholds, then decide what to continue or stop.",
      cta: {
        label: "Run the validation plan",
        href: "/next-move/validation-checklist",
      },
    },
    selfServe: {
      title: "Validation Plan",
      summary:
        "Structure the next validation cycle with explicit pass/fail thresholds.",
      href: "/next-move/validation-checklist",
      output:
        "Validation plan with assumptions, tests, thresholds, and stop/continue guidance.",
      purpose: "Define what must be proven next before deeper commitment.",
      artifactOutput: "Validation plan with assumptions, tests, thresholds, and stop/continue guidance.",
      whyNow: "Confidence is still weak, and decisions need clearer evidence gates.",
      timeEstimate: "14-18 minutes",
      ownerRole: "Founder or product manager",
      ctaLabel: "Run the validation plan",
      previewItems: ["Top assumptions", "Evidence needed", "Test methods", "Pass/fail thresholds"],
    },
    aiHelp: {
      headline: "Turn this stage into a working brief",
      outputType: "Validation summary brief",
      promptIntent: "Summarize evidence patterns and surface what still must be proven.",
      ctaLabel: "Summarize my stage context",
      summary:
        "AI can help summarize evidence patterns and reveal assumption gaps quickly.",
      examples: [
        "Summarize interview themes",
        "Identify missing evidence links",
        "Draft clearer test statements",
      ],
    },
    serviceRecommendation: {
      service: "Founder Review",
      stageHeadline: "Sharpen what must be proven next",
      whySupportFits:
        "Best when evidence quality is debated and the team needs clear decision thresholds.",
      bringInWhen:
        "Bring Amalgam in when the team cannot agree on what evidence is strong enough to decide.",
      bringAmalgamInWhen:
        "Bring Amalgam in when the team cannot agree what evidence is enough to decide.",
      unlocks:
        "A clear validation sequence and next-step recommendation grounded in real signal quality.",
      proofCue:
        "Most teams here need explicit thresholds before additional investment improves outcomes.",
      ctaLabel: "Talk this through with us",
      href: "/founder-review",
      secondaryLabel: "Get a recommendation",
      secondaryHref: "/contact",
    },
    proofSnippet: {
      label: "Proof cue",
      text: "Most teams here need tighter evidence thresholds before more investment helps.",
      href: "/our-work/john-templeton-foundation",
    },
    resources: [
      {
        id: "validate-tool-plan",
        type: "Tool",
        title: "Validation Plan",
        summary: "Build one decision-ready validation artifact.",
        why: "Useful when uncertainty is the blocker and confidence is uneven.",
        href: "/next-move/validation-checklist",
        pressureTags: ["validation-unclear", "clear-next-move"],
      },
      {
        id: "validate-tool-ai",
        type: "Tool",
        title: "AI readiness checklist",
        summary: "Assess data and ownership readiness before AI commitments.",
        why: "Useful when validation pressure includes AI adoption uncertainty.",
        href: "/next-move/ai-readiness-checklist",
        pressureTags: ["validation-unclear"],
      },
      {
        id: "validate-case-jtf",
        type: "Case study",
        title: "John Templeton Foundation",
        summary: "Improved decision quality by tightening evidence thresholds.",
        why: "Shows how better evidence framing improves strategic choices.",
        href: "/our-work/john-templeton-foundation",
        pressureTags: ["validation-unclear"],
      },
    ],
    cta: {
      headline: "Want a clearer read on what's worth doing now?",
      support:
        "Run the validation plan first. If confidence is still low, we'll help you decide.",
      primaryLabel: "Run the validation plan",
      primaryHref: "/next-move/validation-checklist",
      secondaryLabel: "Start with Founder Review",
      secondaryHref: "/founder-review",
    },
    adjacentStages: ["ideate-prioritize", "build-ship"],
    pressureMappings: ["validation-unclear"],
    bestFitOffer: "founder-review",
  }),
  buildStage({
    id: "build-ship",
    slug: "build-ship",
    number: 3,
    name: "Build & Ship",
    shortDescriptor: "Ship working product",
    objective: "Find the one bottleneck slowing delivery most.",
    snapshot:
      "Work is active, but delivery is slower than expected and execution drag is compounding.",
    feelsLike: [
      "Shipping cadence is slipping",
      "Dependencies create surprises",
      "Coordination overhead is rising",
      "Architecture drag appears mid-delivery",
    ],
    breaksHere: [
      "Hidden dependencies cause recurring rework",
      "Execution sequence does not match system reality",
      "Ownership overlap slows decisions",
    ],
    blockers: [
      "Too many hidden dependencies",
      "Execution sequence is unrealistic",
      "System constraints surface too late",
    ],
    notYet: [
      "Do not add more process before isolating the main bottleneck",
      "Do not expand roadmap scope while core flow is unstable",
      "Do not reorganize teams before the friction source is clear",
    ],
    mattersNow:
      "Find the one bottleneck slowing delivery most.",
    nextMove: {
      title: "Diagnose delivery drag",
      summary:
        "Pinpoint whether drag is structural, sequencing, coordination, or visibility-related.",
      cta: {
        label: "Diagnose delivery drag",
        href: "/next-move/delivery-drag-diagnostic",
      },
    },
    selfServe: {
      title: "Bottleneck Map",
      summary:
        "Generate a practical map of the top execution bottleneck and immediate intervention focus.",
      href: "/next-move/delivery-drag-diagnostic",
      output:
        "Bottleneck profile with root causes, dependency risk, and first intervention target.",
      purpose: "Pinpoint the dominant delivery constraint so the team can intervene with precision.",
      artifactOutput: "Bottleneck profile with root causes, dependency risk, and first intervention target.",
      whyNow: "Delivery drag is compounding and broad planning is not reducing friction.",
      timeEstimate: "10-14 minutes",
      ownerRole: "Engineering lead or delivery lead",
      ctaLabel: "Diagnose delivery drag",
      previewItems: ["Primary constraint", "Root causes", "Dependency risk", "First intervention focus"],
    },
    aiHelp: {
      headline: "Summarize the constraint pattern",
      outputType: "Delivery bottleneck brief",
      promptIntent: "Condense recurring blockers and draft a sharper intervention readout.",
      ctaLabel: "Summarize my stage context",
      summary:
        "AI can help detect recurring bottlenecks and summarize friction patterns faster.",
      examples: [
        "Detect recurring blockers from sprint notes",
        "Summarize dependency risk from issue data",
        "Draft bottleneck-focused intervention options",
      ],
    },
    serviceRecommendation: {
      service: "Focused Intervention",
      stageHeadline: "Find the real delivery bottleneck",
      whySupportFits:
        "Best when delivery drag is visible but the root bottleneck is still unclear.",
      bringInWhen:
        "Bring Amalgam in when the team can see drag but cannot isolate the highest-leverage fix quickly.",
      bringAmalgamInWhen:
        "Bring Amalgam in when delivery stays slow after internal bottleneck fixes.",
      unlocks:
        "A focused plan that resolves the key bottleneck and restores execution continuity.",
      proofCue:
        "Teams in this stage typically regain momentum once one bottleneck is isolated and sequenced directly.",
      ctaLabel: "Talk through this bottleneck",
      href: "/focused-intervention",
      secondaryLabel: "Get a recommendation",
      secondaryHref: "/contact?interest=focused-intervention",
    },
    proofSnippet: {
      label: "Proof cue",
      text: "Teams here usually move faster once one constraint is isolated and addressed directly.",
      href: "/our-work/pearlx",
    },
    resources: [
      {
        id: "build-tool-diagnostic",
        type: "Tool",
        title: "Delivery drag diagnostic",
        summary: "Identify the most likely drag profile in minutes.",
        why: "Best first move when shipping is slower but root cause is unclear.",
        href: "/next-move/delivery-drag-diagnostic",
        pressureTags: ["delivery-slowing", "clear-next-move"],
      },
      {
        id: "build-article-delivery",
        type: "Article",
        title: "Delivery velocity is a systems problem",
        summary:
          "Understand why execution speed is rarely just a team performance issue.",
        why: "Useful when bottlenecks keep moving across functions.",
        href: "/research/delivery-velocity-is-a-systems-problem",
        pressureTags: ["delivery-slowing"],
      },
      {
        id: "build-case-pearlx",
        type: "Case study",
        title: "PearlX",
        summary: "Removed key delivery bottlenecks and improved shipping cadence.",
        why: "Shows a practical path from delivery drag to forward momentum.",
        href: "/our-work/pearlx",
        pressureTags: ["delivery-slowing"],
      },
    ],
    cta: {
      headline: "Need help getting delivery moving again?",
      support:
        "Run the diagnostic first. If the bottleneck is still unclear, bring us in.",
      primaryLabel: "Diagnose delivery drag",
      primaryHref: "/next-move/delivery-drag-diagnostic",
      secondaryLabel: "Explore Focused Intervention",
      secondaryHref: "/focused-intervention",
    },
    adjacentStages: ["productize-systemize", "validate-derisk"],
    pressureMappings: ["delivery-slowing"],
    bestFitOffer: "execution-sprint",
  }),
  buildStage({
    id: "productize-systemize",
    slug: "productize-systemize",
    number: 4,
    name: "Productize & Systemize",
    shortDescriptor: "Stabilize systems",
    objective: "Stabilize key workflows and assign clear owners.",
    snapshot:
      "The product is live, but supporting systems, data, and operating cadence are not holding together reliably.",
    feelsLike: [
      "System complexity is rising",
      "Reporting confidence is inconsistent",
      "Critical workflows rely on workarounds",
      "Coordination overhead is heavy",
    ],
    breaksHere: [
      "Ownership boundaries stay unclear",
      "Operating cadence varies by team",
      "Visibility gaps hide reliability risk",
    ],
    blockers: [
      "System boundaries are unclear",
      "Decision rights are fuzzy",
      "Operational loops are fragile",
    ],
    notYet: [
      "Do not optimize every subsystem at once",
      "Do not expand tooling before ownership is clear",
      "Do not scale rituals before core loops are stable",
    ],
    mattersNow:
      "Stabilize key workflows and assign clear owners.",
    nextMove: {
      title: "Start the tech stack audit",
      summary:
        "Map fragility, ownership gaps, and reporting risks to prioritize the highest-value system fixes.",
      cta: {
        label: "Start the tech stack audit",
        href: "/next-move/tech-stack-audit",
      },
    },
    selfServe: {
      title: "Tech Stack Audit",
      summary:
        "Create a practical map of workflows, ownership, and reliability gaps that need immediate attention.",
      href: "/next-move/tech-stack-audit",
      output:
        "Operating loop map with fragile handoffs, ownership gaps, and prioritized fixes.",
      purpose: "Map the system behind the product and isolate operating fragility before it compounds.",
      artifactOutput: "Operating loop map with fragile handoffs, ownership gaps, and prioritized fixes.",
      whyNow: "Reliability and reporting trust are falling as complexity rises.",
      timeEstimate: "15-20 minutes",
      ownerRole: "Engineering manager or operations lead",
      ctaLabel: "Start the tech stack audit",
      previewItems: ["Critical workflows", "Ownership gaps", "Reporting gaps", "Priority fixes"],
    },
    aiHelp: {
      headline: "Draft a sharper internal readout",
      outputType: "System reliability brief",
      promptIntent: "Map operating friction patterns and summarize boundary risks for the team.",
      ctaLabel: "Summarize my stage context",
      summary:
        "AI can help map workflow complexity and reveal fragile handoff patterns faster.",
      examples: [
        "Map workflow complexity",
        "Highlight recurring operating friction",
        "Summarize ownership ambiguity signals",
      ],
    },
    serviceRecommendation: {
      service: "Focused Intervention or Outcome Partnership",
      stageHeadline: "Stabilize the system behind the product",
      whySupportFits:
        "Best when system issues are known but ownership and sequencing remain unstable.",
      bringInWhen:
        "Bring Amalgam in when system-level issues are clear but prioritization and execution continuity are hard to hold.",
      bringAmalgamInWhen:
        "Bring Amalgam in when reliability issues are clear but ownership and sequencing are still unstable.",
      unlocks:
        "Focused intervention for one critical bottleneck or ongoing support to stabilize the operating loop.",
      proofCue:
        "Most teams here improve by clarifying boundaries and operating loops before adding more process.",
      ctaLabel: "Get help with this stage",
      href: "/focused-intervention",
      secondaryLabel: "Talk through Outcome Partnership",
      secondaryHref: "/outcome-partnership",
    },
    proofSnippet: {
      label: "Proof cue",
      text: "Most teams here improve fastest by clarifying boundaries before adding more process.",
      href: "/our-work/premier-financial-alliance",
    },
    resources: [
      {
        id: "prod-tool-audit",
        type: "Tool",
        title: "Tech stack audit",
        summary:
          "Assess platform fragility and reporting risk in one structured pass.",
        why: "Best when systems feel fragile and reliability confidence is falling.",
        href: "/next-move/tech-stack-audit",
        pressureTags: ["systems-fragile", "delivery-slowing"],
      },
      {
        id: "prod-article-modernize",
        type: "Article",
        title: "Modernize or rebuild",
        summary: "Choose the right path when core systems are under pressure.",
        why: "Useful when the team is debating architecture direction under pressure.",
        href: "/research/modernize-vs-rebuild",
        pressureTags: ["systems-fragile", "scale-complexity"],
      },
      {
        id: "prod-case-pfa",
        type: "Case study",
        title: "Premier Financial Alliance",
        summary:
          "Improved system reliability and data confidence under execution pressure.",
        why: "Shows how system simplification improves decision confidence.",
        href: "/our-work/premier-financial-alliance",
        pressureTags: ["systems-fragile"],
      },
    ],
    cta: {
      headline: "Want help reducing complexity before it grows?",
      support:
        "Start with the tech stack audit. If reliability issues keep piling up, we'll help you stabilize the system.",
      primaryLabel: "Start the tech stack audit",
      primaryHref: "/next-move/tech-stack-audit",
      secondaryLabel: "Talk through Outcome Partnership",
      secondaryHref: "/outcome-partnership",
    },
    adjacentStages: ["build-ship", "scale-stabilize"],
    pressureMappings: ["systems-fragile"],
    bestFitOffer: "execution-sprint-or-outcome-partnership",
  }),
  buildStage({
    id: "scale-stabilize",
    slug: "scale-stabilize",
    number: 5,
    name: "Scale & Stabilize",
    shortDescriptor: "Scale without drag",
    objective: "Tighten ownership and decision cadence as complexity grows.",
    snapshot:
      "Growth is real, but complexity is increasing faster than alignment and reliability confidence.",
    feelsLike: [
      "Decision drag across teams",
      "Reporting trust is uneven",
      "Escalations increase",
      "Execution slows as complexity rises",
    ],
    breaksHere: [
      "Decision ownership becomes unclear",
      "Operating consistency drifts across teams",
      "Escalation replaces direct ownership",
    ],
    blockers: [
      "Operating model did not evolve with scale",
      "Ownership overlap across teams",
      "Leadership context is inconsistent",
    ],
    notYet: [
      "Do not scale headcount before ownership is clear",
      "Do not add governance overhead before decision loops are explicit",
      "Do not chase every metric before trust in critical numbers is restored",
    ],
    mattersNow:
      "Tighten ownership and decision cadence as complexity grows.",
    nextMove: {
      title: "Run the scale readiness check",
      summary:
        "Map alignment, ownership, and reliability risks that are slowing execution.",
      cta: {
        label: "Run the scale readiness check",
        href: "/next-move/scale-readiness-check",
      },
    },
    selfServe: {
      title: "Decision-Drag Risk Map",
      summary:
        "Create a practical map of alignment and reliability risks before they compound further.",
      href: "/next-move/scale-readiness-check",
      output:
        "Decision-drag map with ownership, escalation, and reliability risk priorities.",
      purpose: "Surface where decision drag and reliability risk are compounding under growth.",
      artifactOutput: "Decision-drag map with ownership, escalation, and reliability risk priorities.",
      whyNow: "Complexity is rising faster than operating consistency and decision clarity.",
      timeEstimate: "12-16 minutes",
      ownerRole: "Founder, operator, or cross-functional lead",
      ctaLabel: "Run the scale readiness check",
      previewItems: ["Alignment risks", "Reliability risks", "Ownership gaps", "Escalation friction"],
    },
    aiHelp: {
      headline: "Turn this stage into a working brief",
      outputType: "Scale stabilization brief",
      promptIntent: "Summarize decision drag and draft a practical stabilization readout.",
      ctaLabel: "Summarize my stage context",
      summary:
        "AI can help identify recurring decision drag and alignment friction patterns.",
      examples: [
        "Identify escalation hotspots",
        "Summarize cross-team alignment gaps",
        "Highlight recurring reliability risk patterns",
      ],
    },
    serviceRecommendation: {
      service: "Outcome Partnership",
      stageHeadline: "Reduce decision drag as complexity rises",
      whySupportFits:
        "Best when growth keeps creating decision drag and leadership needs steadier execution support.",
      bringInWhen:
        "Bring Amalgam in when complexity keeps producing alignment drag and the team needs steady senior judgment in the loop.",
      bringAmalgamInWhen:
        "Bring Amalgam in when growth keeps amplifying decision drag and alignment keeps slipping.",
      unlocks:
        "More reliable decision cadence and execution continuity while complexity rises.",
      proofCue:
        "Teams in this stage stay steady by tightening ownership and escalation paths before complexity compounds.",
      ctaLabel: "Get help with this stage",
      href: "/outcome-partnership",
      secondaryLabel: "Get a recommendation",
      secondaryHref: "/contact?interest=outcome-partnership",
    },
    proofSnippet: {
      label: "Proof cue",
      text: "Teams in this stage sustain momentum by tightening ownership and reliability loops.",
      href: "/our-work/mt-bank",
    },
    resources: [
      {
        id: "scale-tool-readiness",
        type: "Tool",
        title: "Scale readiness check",
        summary: "Assess decision drag and reliability risk before they compound.",
        why: "Best when growth introduces coordination and consistency drag.",
        href: "/next-move/scale-readiness-check",
        pressureTags: ["scale-complexity", "systems-fragile"],
      },
      {
        id: "scale-article-rhythm",
        type: "Article",
        title: "Operating rhythm after growth",
        summary: "Set cadence that keeps teams aligned as complexity rises.",
        why: "Useful when teams are active but operating cadence is inconsistent.",
        href: "/research/operating-rhythm-after-growth",
        pressureTags: ["scale-complexity"],
      },
      {
        id: "scale-case-mtbank",
        type: "Case study",
        title: "M&T Bank",
        summary: "Reduced decision drag and sustained execution continuity at scale.",
        why: "Shows how steady operating judgment holds momentum through complexity.",
        href: "/our-work/mt-bank",
        pressureTags: ["scale-complexity"],
      },
    ],
    cta: {
      headline: "Need steadier execution as things get bigger?",
      support:
        "Run the readiness check first. If complexity keeps slowing execution, we'll help you stabilize the work.",
      primaryLabel: "Run the scale readiness check",
      primaryHref: "/next-move/scale-readiness-check",
      secondaryLabel: "Talk through Outcome Partnership",
      secondaryHref: "/outcome-partnership",
    },
    adjacentStages: ["productize-systemize"],
    pressureMappings: ["scale-complexity"],
    bestFitOffer: "outcome-partnership",
  }),
]

export const launchpadPrompts: LaunchpadPrompt[] = [
  {
    id: "prompt-1",
    question: "Do you mostly need clarity on what to pursue?",
    stage: "ideate-prioritize",
  },
  {
    id: "prompt-2",
    question: "Are you trying to reduce risk before committing harder?",
    stage: "validate-derisk",
  },
  {
    id: "prompt-3",
    question: "Are you already building, but delivery keeps getting harder?",
    stage: "build-ship",
  },
  {
    id: "prompt-4",
    question: "Is the product live, but the surrounding systems feel shaky?",
    stage: "productize-systemize",
  },
  {
    id: "prompt-5",
    question: "Is growth creating alignment and reliability problems?",
    stage: "scale-stabilize",
  },
]

const stageMap = new Map(launchpadStages.map((stage) => [stage.id, stage]))
const pressureMap = new Map(
  launchpadPressureSignals.map((signal) => [signal.id, signal]),
)
const stageAliases: Record<string, LaunchpadStageId> = {
  ideate: "ideate-prioritize",
  prioritize: "ideate-prioritize",
  validate: "validate-derisk",
  derisk: "validate-derisk",
  build: "build-ship",
  ship: "build-ship",
  productize: "productize-systemize",
  systemize: "productize-systemize",
  scale: "scale-stabilize",
  stabilize: "scale-stabilize",
}
const legacyPressureAliases: Record<string, LaunchpadPressureId> = {
  "build-first-unclear": "clear-next-move",
}

export const pressureToStageMap: Record<LaunchpadPressureId, LaunchpadStageId> =
  launchpadPressureSignals.reduce(
    (acc, signal) => {
      acc[signal.id] = signal.likelyStage
      return acc
    },
    {} as Record<LaunchpadPressureId, LaunchpadStageId>,
  )

export const stageToServiceBiasMap: Record<LaunchpadStageId, SupportPathType> =
  launchpadStages.reduce(
    (acc, stage) => {
      acc[stage.id] = stage.supportPath.type
      return acc
    },
    {} as Record<LaunchpadStageId, SupportPathType>,
  )

export function getLaunchpadStage(stageId: LaunchpadStageId) {
  return stageMap.get(stageId) ?? launchpadStages[0]!
}

export function getLaunchpadPressureSignal(pressureId: LaunchpadPressureId) {
  return pressureMap.get(pressureId) ?? null
}

export function isLaunchpadStageId(value: string): value is LaunchpadStageId {
  return stageMap.has(value as LaunchpadStageId)
}

export function isLaunchpadPressureId(
  value: string,
): value is LaunchpadPressureId {
  return pressureMap.has(value as LaunchpadPressureId)
}

export function parseLaunchpadPressureId(value: string | null | undefined): LaunchpadPressureId | null {
  if (!value) return null
  if (isLaunchpadPressureId(value)) return value
  return legacyPressureAliases[value] ?? null
}

export function parseLaunchpadStageId(value: string | null | undefined): LaunchpadStageId | null {
  if (!value) return null
  if (isLaunchpadStageId(value)) return value
  return stageAliases[value] ?? null
}



