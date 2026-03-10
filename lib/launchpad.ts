import { getKnowledgeBriefBySlug, type KnowledgeBrief } from "@/lib/knowledge-briefs"

export type LaunchpadToolId =
  | "delivery-drag-diagnostic"
  | "ai-readiness-checklist"
  | "tech-stack-audit"

export type LaunchpadProgramId =
  | "founder-review"
  | "execution-sprint"
  | "outcome-partnership"

export type LaunchpadToolQuestionOption = {
  id: string
  label: string
  description: string
  weights: Record<string, number>
}

export type LaunchpadToolQuestion = {
  id: string
  prompt: string
  helper: string
  options: LaunchpadToolQuestionOption[]
}

export type LaunchpadToolCategory = {
  id: string
  title: string
  summary: string
  whyItMatters: string
  nextStep: {
    label: string
    href: string
    note: string
  }
  relatedGuideSlugs: string[]
}

export type LaunchpadToolDefinition = {
  id: LaunchpadToolId
  slug: LaunchpadToolId
  title: string
  shortTitle: string
  kicker: string
  description: string
  audience: string
  estimatedTime: string
  outputLabel: string
  completionLabel: string
  questionIntro: string
  categories: LaunchpadToolCategory[]
  questions: LaunchpadToolQuestion[]
}

export type LaunchpadPathCard = {
  title: string
  description: string
  href: string
  nextStep: string
}

export type LaunchpadGuideCollection = {
  id: string
  title: string
  description: string
  articleSlugs: string[]
  relatedTool: LaunchpadToolId
  relatedProgram: LaunchpadProgramId
}

export type LaunchpadProgramCard = {
  id: LaunchpadProgramId
  title: string
  description: string
  whenItsRight: string
  href: string
  ctaLabel: string
  featured?: boolean
}

export type LaunchpadToolResult = {
  tool: LaunchpadToolDefinition
  category: LaunchpadToolCategory
  dominantScore: number
  runnerUp?: LaunchpadToolCategory
  runnerUpScore?: number
  totals: Record<string, number>
  topDrivers: string[]
  confidence: {
    level: "high" | "medium" | "provisional"
    label: string
    summary: string
    answerRatio: number
    margin: number
  }
}

export type LaunchpadResultGuidance = {
  firstMoves: string[]
  riskIfUnchanged: string
}

export type LaunchpadCaseStudyRecommendation = {
  slug: string
  client: string
  reason: string
}

export const launchpadPaths: LaunchpadPathCard[] = [
  {
    title: "I need clarity",
    description:
      "The drag is visible, but the root cause still feels unclear across systems, teams, and decisions.",
    href: "/launchpad/delivery-drag-diagnostic",
    nextStep: "Next: Delivery Drag Diagnostic",
  },
  {
    title: "I need a roadmap",
    description:
      "The system is visibly messy and the business now needs honest sequencing rather than more abstract debate.",
    href: "/launchpad/programs",
    nextStep: "Next: Execution Sprint path",
  },
  {
    title: "I need follow-through",
    description:
      "The direction exists, but momentum still needs clear judgment close enough to protect the work.",
    href: "/launchpad/programs",
    nextStep: "Next: Outcome Partnership path",
  },
  {
    title: "I want tools first",
    description:
      "I want a structured first-pass read before I decide whether the situation needs a deeper engagement.",
    href: "/launchpad/tools",
    nextStep: "Browse Launchpad tools",
  },
  {
    title: "I need the right intro or next step",
    description:
      "The next move may sit outside Amalgam's core work, or I need a direct human read on where to start.",
    href: "/contact",
    nextStep: "Start a conversation",
  },
]

export const launchpadPrograms: LaunchpadProgramCard[] = [
  {
    id: "founder-review",
    title: "Need clarity fast? Diagnostic Review",
    description:
      "A focused diagnostic for situations where the drag is real but the system is still too fuzzy to sequence honestly.",
    whenItsRight:
      "Best when architecture, workflow, integrations, and operating friction are all colliding at once.",
    href: "/founder-review",
    ctaLabel: "See how it works",
    featured: true,
  },
  {
    id: "execution-sprint",
    title: "Need a roadmap you can run? Execution Sprint",
    description:
      "A structured sequencing engagement for teams that already have a credible diagnosis and need a roadmap leadership can trust.",
    whenItsRight:
      "Best when the work is legible enough to plan but still needs cross-functional sequencing and constraint mapping.",
    href: "/execution-sprint",
    ctaLabel: "See what's included",
  },
  {
    id: "outcome-partnership",
    title: "Need ongoing support? Outcome Partnership",
    description:
      "Steady follow-through for situations where the path is real, but execution still needs close support to protect momentum.",
    whenItsRight:
      "Best when clarity exists and the business needs continuity, unblockers, and direct decision support over time.",
    href: "/outcome-partnership",
    ctaLabel: "See how support works",
  },
]

export const launchpadGuideCollections: LaunchpadGuideCollection[] = [
  {
    id: "delivery-is-dragging",
    title: "Start here if delivery is dragging",
    description:
      "Use these when the team is shipping slower, more work is getting stuck, and no one trusts the clean explanation yet.",
    articleSlugs: [
      "delivery-velocity-is-a-systems-problem",
      "operating-rhythm-after-growth",
      "decision-rights-under-complexity",
    ],
    relatedTool: "delivery-drag-diagnostic",
    relatedProgram: "founder-review",
  },
  {
    id: "stack-feels-fragile",
    title: "Start here if the stack feels fragile",
    description:
      "Use these when platform complexity, modernization pressure, and hidden architecture constraints are shaping business decisions.",
    articleSlugs: [
      "modernize-vs-rebuild",
      "architecture-map-before-roadmap",
      "structure-follows-architecture",
    ],
    relatedTool: "tech-stack-audit",
    relatedProgram: "founder-review",
  },
  {
    id: "ai-is-becoming-relevant",
    title: "Start here if AI is becoming relevant",
    description:
      "Use these when the organization is feeling pressure to move on AI, but workflows, data quality, and ownership still need a sober read.",
    articleSlugs: [
      "post-series-a-data-foundations",
      "metrics-you-can-run-the-company-on",
      "operating-rhythm-after-growth",
    ],
    relatedTool: "ai-readiness-checklist",
    relatedProgram: "founder-review",
  },
  {
    id: "sequencing-is-unclear",
    title: "Start here if sequencing is unclear",
    description:
      "Use these when the system is partially visible, the roadmap is fragile, and the next move needs to be planned more honestly.",
    articleSlugs: [
      "sequencing-roadmaps-under-uncertainty",
      "architecture-map-before-roadmap",
      "delivery-velocity-is-a-systems-problem",
    ],
    relatedTool: "delivery-drag-diagnostic",
    relatedProgram: "execution-sprint",
  },
  {
    id: "integrations-are-causing-drag",
    title: "Start here if integrations are causing drag",
    description:
      "Use these when cross-system handoffs, workflow boundaries, and operational coupling are creating hidden cost and decision latency.",
    articleSlugs: [
      "integration-tax",
      "modernize-vs-rebuild",
      "metrics-you-can-run-the-company-on",
    ],
    relatedTool: "tech-stack-audit",
    relatedProgram: "founder-review",
  },
]

export const launchpadStaticRoutes = [
  "/launchpad",
  "/launchpad/tools",
  "/launchpad/guides",
  "/launchpad/programs",
  "/launchpad/signals",
  "/launchpad/delivery-drag-diagnostic",
  "/launchpad/ai-readiness-checklist",
  "/launchpad/tech-stack-audit",
] as const

const launchpadTools: LaunchpadToolDefinition[] = [
  {
    id: "delivery-drag-diagnostic",
    slug: "delivery-drag-diagnostic",
    title: "Is delivery drag slowing you down?",
    shortTitle: "Delivery Drag",
    kicker: "Structured diagnostic",
    description:
      "Pressure-test whether shipping slowdowns are really coming from architecture complexity, coordination overhead, data visibility, or sequencing drag.",
    audience:
      "For teams that know delivery is slower than it should be and need a sharper read on why.",
    estimatedTime: "4-5 minutes",
    outputLabel: "Likely drag profile",
    completionLabel: "You now have a first-pass read on the likely shape of the drag.",
    questionIntro:
      "Answer these questions based on the last one or two quarters, not on your ideal future state.",
    categories: [
      {
        id: "structural-delivery-drag",
        title: "Structural delivery drag",
        summary:
          "The system itself is making change expensive. Core boundaries, architecture shape, or the platform's current structure are likely slowing work down before team effort even becomes the issue.",
        whyItMatters:
          "This usually means pressure is accumulating at the foundation layer. The right next move is to clarify the current state and identify the few structural decisions that are distorting delivery.",
        nextStep: {
          label: "Book a free strategy call",
          href: "/contact?interest=founder-review",
          note: "The root cause still needs a direct diagnostic read.",
        },
        relatedGuideSlugs: [
          "modernize-vs-rebuild",
          "architecture-map-before-roadmap",
          "delivery-velocity-is-a-systems-problem",
        ],
      },
      {
        id: "sequencing-drag",
        title: "Sequencing drag",
        summary:
          "The business can see the work that matters, but the roadmap is entering execution before constraints and dependencies are sequenced honestly.",
        whyItMatters:
          "This kind of drag often looks like a speed problem, but it is really a planning-quality problem. The organization needs a credible map before it asks for faster movement.",
        nextStep: {
          label: "Explore Execution Sprint",
          href: "/execution-sprint",
          note: "The situation may be legible enough to turn into a roadmap.",
        },
        relatedGuideSlugs: [
          "sequencing-roadmaps-under-uncertainty",
          "architecture-map-before-roadmap",
          "decision-rights-under-complexity",
        ],
      },
      {
        id: "ownership-coordination-drag",
        title: "Ownership and coordination drag",
        summary:
          "Work is slowing down because too much effort is being spent on cross-functional translation, escalation, and repeated ownership negotiation.",
        whyItMatters:
          "This usually produces noise that looks like weak execution. In reality, the system may be under-specified in its decision rights, workflow ownership, or operating rhythm.",
        nextStep: {
          label: "Book a free strategy call",
          href: "/contact?interest=founder-review",
          note: "The operating model likely needs a direct read before planning continues.",
        },
        relatedGuideSlugs: [
          "operating-rhythm-after-growth",
          "structure-follows-architecture",
          "decision-rights-under-complexity",
        ],
      },
      {
        id: "visibility-data-drag",
        title: "Visibility and data drag",
        summary:
          "The team is making decisions with weak signal. Reporting, source-of-truth confidence, or operational visibility gaps are likely making it harder to sequence and execute well.",
        whyItMatters:
          "When truth is hard to access, every planning cycle gets noisier. The business can rarely fix this with one more dashboard alone.",
        nextStep: {
          label: "Book a free strategy call",
          href: "/contact?interest=founder-review",
          note: "A direct diagnostic can separate reporting symptoms from system causes.",
        },
        relatedGuideSlugs: [
          "metrics-you-can-run-the-company-on",
          "post-series-a-data-foundations",
          "delivery-velocity-is-a-systems-problem",
        ],
      },
      {
        id: "integration-driven-drag",
        title: "Integration-driven drag",
        summary:
          "Too many tools, handoffs, and hidden dependencies are likely compounding the cost of every meaningful change.",
        whyItMatters:
          "Integration drag makes simple work look deceptively easy on paper. The business needs a clearer view of boundary problems and system authority before it can simplify intelligently.",
        nextStep: {
          label: "Start the Tech Stack Audit",
          href: "/launchpad/tech-stack-audit",
          note: "A stack-level read can sharpen where the integration burden is concentrated.",
        },
        relatedGuideSlugs: [
          "integration-tax",
          "modernize-vs-rebuild",
          "architecture-map-before-roadmap",
        ],
      },
    ],
    questions: [
      {
        id: "change-effort",
        prompt: "When one meaningful change hits the roadmap, what usually makes it slow?",
        helper: "Pick the answer that most often shapes the real delivery timeline.",
        options: [
          {
            id: "architecture",
            label: "The system itself is hard to change safely.",
            description: "Core architecture or platform constraints dominate timelines.",
            weights: { "structural-delivery-drag": 3, "integration-driven-drag": 1 },
          },
          {
            id: "dependencies",
            label: "Dependencies and sequencing keep surprising us.",
            description: "The work looked straightforward until hidden constraints appeared.",
            weights: { "sequencing-drag": 3, "integration-driven-drag": 1 },
          },
          {
            id: "alignment",
            label: "Teams need too much alignment and escalation to move.",
            description: "Cross-functional coordination and ownership questions dominate.",
            weights: { "ownership-coordination-drag": 3, "sequencing-drag": 1 },
          },
          {
            id: "signal",
            label: "We do not trust the signal well enough to decide confidently.",
            description: "Data, reporting, or operating visibility issues keep slowing decisions.",
            weights: { "visibility-data-drag": 3, "ownership-coordination-drag": 1 },
          },
        ],
      },
      {
        id: "delivery-shape",
        prompt: "What does slowdown look like in practice right now?",
        helper: "Choose the pattern that feels most familiar in the last quarter.",
        options: [
          {
            id: "rework",
            label: "Changes create rework because the foundation is brittle.",
            description: "Work lands, but too much of it reopens or breaks adjacent areas.",
            weights: { "structural-delivery-drag": 3, "integration-driven-drag": 1 },
          },
          {
            id: "reprioritized",
            label: "Roadmaps keep shifting because we learn too late.",
            description: "The problem is not effort; it is sequencing without a good map.",
            weights: { "sequencing-drag": 3, "visibility-data-drag": 1 },
          },
          {
            id: "handoffs",
            label: "Work slows as soon as more than one team is involved.",
            description: "Cross-functional coordination adds drag quickly.",
            weights: { "ownership-coordination-drag": 3, "integration-driven-drag": 1 },
          },
          {
            id: "unclear-priority",
            label: "It is hard to know which issue deserves attention first.",
            description: "Signal quality or data trust keeps muddying the call.",
            weights: { "visibility-data-drag": 3, "sequencing-drag": 1 },
          },
        ],
      },
      {
        id: "integration-load",
        prompt: "How much does cross-system behavior shape the pain?",
        helper: "Think about tooling, APIs, data flows, and manual reconciliation.",
        options: [
          {
            id: "low",
            label: "Not much. The core issue is inside the platform itself.",
            description: "The drag feels mainly architectural or structural.",
            weights: { "structural-delivery-drag": 2 },
          },
          {
            id: "moderate",
            label: "Some. Integration issues matter, but they are not the whole story.",
            description: "They add risk but are not the only driver.",
            weights: { "sequencing-drag": 1, "ownership-coordination-drag": 1, "integration-driven-drag": 1 },
          },
          {
            id: "high",
            label: "A lot. Cross-system behavior is where the work gets messy fast.",
            description: "Dependencies, tooling, and handoffs are constant friction points.",
            weights: { "integration-driven-drag": 3, "ownership-coordination-drag": 1 },
          },
          {
            id: "unknown",
            label: "We cannot really tell because visibility is too weak.",
            description: "The organization does not have a trustworthy view of what is happening.",
            weights: { "visibility-data-drag": 3, "integration-driven-drag": 1 },
          },
        ],
      },
      {
        id: "leadership-view",
        prompt: "When leadership asks what is slowing delivery, how clear is the answer?",
        helper: "Choose the answer that best matches executive conversations.",
        options: [
          {
            id: "very-clear",
            label: "Clear enough that the next move is probably a roadmap and sequencing problem.",
            description: "The diagnosis exists. What is missing is the execution plan.",
            weights: { "sequencing-drag": 3 },
          },
          {
            id: "architecture-clear",
            label: "We know the platform is part of the issue, but not how to unwind it safely.",
            description: "The structural shape is visible, but the path forward is not.",
            weights: { "structural-delivery-drag": 3, "integration-driven-drag": 1 },
          },
          {
            id: "people-fuzzy",
            label: "Everyone has a different explanation depending on their function.",
            description: "The organization lacks a shared picture of the problem.",
            weights: { "ownership-coordination-drag": 2, "visibility-data-drag": 2 },
          },
          {
            id: "signal-fuzzy",
            label: "We know it is slow, but the evidence is too noisy to trust.",
            description: "Signal quality and operational visibility are both weak.",
            weights: { "visibility-data-drag": 3, "ownership-coordination-drag": 1 },
          },
        ],
      },
      {
        id: "best-next-move",
        prompt: "What would be most useful right now?",
        helper: "This helps anchor the recommended next step.",
        options: [
          {
            id: "diagnosis",
            label: "A direct read on what is actually creating the drag.",
            description: "The situation still needs diagnosis more than planning.",
            weights: {
              "structural-delivery-drag": 2,
              "ownership-coordination-drag": 2,
              "visibility-data-drag": 2,
            },
          },
          {
            id: "roadmap",
            label: "A roadmap that sequences the work honestly.",
            description: "The diagnosis is good enough that planning should come next.",
            weights: { "sequencing-drag": 3 },
          },
          {
            id: "stack-read",
            label: "A stack-level read on integrations, platform shape, and risk.",
            description: "The business needs clarity on technical posture and weak points.",
            weights: { "integration-driven-drag": 3, "structural-delivery-drag": 1 },
          },
          {
            id: "operating-clarity",
            label: "A better picture of ownership, signal, and operating friction.",
            description: "The process and decision layer need a direct look.",
            weights: { "ownership-coordination-drag": 2, "visibility-data-drag": 2 },
          },
        ],
      },
    ],
  },
  {
    id: "ai-readiness-checklist",
    slug: "ai-readiness-checklist",
    title: "Are you actually ready for AI adoption?",
    shortTitle: "AI Readiness",
    kicker: "Practical checklist",
    description:
      "Assess whether the company is actually ready for meaningful AI usage or still needs better workflows, ownership, and system foundations first.",
    audience:
      "For teams that want a sober read on whether AI will create leverage or simply amplify fragmentation.",
    estimatedTime: "4 minutes",
    outputLabel: "Current readiness posture",
    completionLabel:
      "You now have a clearer read on whether AI is a leverage opportunity or a distraction right now.",
    questionIntro:
      "Answer based on the team's current operating reality, not on the AI roadmap you wish you had.",
    categories: [
      {
        id: "not-ready-yet",
        title: "Not ready yet",
        summary:
          "The current workflows, ownership, or system foundations are too unstable for AI to create reliable leverage right now.",
        whyItMatters:
          "AI tends to amplify ambiguity. If the operating model is still fuzzy, the first gain usually comes from making the system more legible before automating anything meaningful.",
        nextStep: {
          label: "Book a free strategy call",
          href: "/contact?interest=founder-review",
          note: "The system likely needs diagnosis before AI decisions become useful.",
        },
        relatedGuideSlugs: [
          "post-series-a-data-foundations",
          "metrics-you-can-run-the-company-on",
          "operating-rhythm-after-growth",
        ],
      },
      {
        id: "tactically-ready-in-a-few-areas",
        title: "Tactically ready in a few areas",
        summary:
          "There are likely one or two narrow workflows where AI can help, but the broader organization is not ready for company-wide adoption.",
        whyItMatters:
          "This is often the right moment to focus on targeted pilots with clear owners instead of trying to make AI strategy carry too much too soon.",
        nextStep: {
          label: "Start a conversation",
          href: "/contact?interest=founder-review",
          note: "A direct read can help choose the right low-risk starting area.",
        },
        relatedGuideSlugs: [
          "metrics-you-can-run-the-company-on",
          "delivery-velocity-is-a-systems-problem",
          "post-series-a-data-foundations",
        ],
      },
      {
        id: "promising-but-blocked",
        title: "Promising but blocked",
        summary:
          "The organization has promising workflows and real interest, but data trust, tooling fragmentation, or ownership gaps are holding back reliable progress.",
        whyItMatters:
          "This is a classic stage where AI interest is justified, but system cleanup and decision clarity still need to happen before the investment becomes durable.",
        nextStep: {
          label: "Open the Tech Stack Audit",
          href: "/launchpad/tech-stack-audit",
          note: "A stack and workflow read can clarify the blockers that matter most.",
        },
        relatedGuideSlugs: [
          "post-series-a-data-foundations",
          "integration-tax",
          "metrics-you-can-run-the-company-on",
        ],
      },
      {
        id: "ready-for-focused-adoption",
        title: "Ready for focused adoption",
        summary:
          "The company has enough workflow clarity, ownership, and usable signal to move on AI in a focused, practical way.",
        whyItMatters:
          "This is where execution discipline matters more than enthusiasm. The opportunity is real, but it still needs sober sequencing and guardrails.",
        nextStep: {
          label: "Explore Execution Sprint",
          href: "/execution-sprint",
          note: "The next move may be a focused plan rather than another broad diagnostic.",
        },
        relatedGuideSlugs: [
          "sequencing-roadmaps-under-uncertainty",
          "metrics-you-can-run-the-company-on",
          "architecture-map-before-roadmap",
        ],
      },
      {
        id: "ready-governance-is-the-issue",
        title: "Ready, governance is the issue",
        summary:
          "The workflows and system foundations are reasonably strong, but the remaining challenge is governance, guardrails, and ensuring adoption stays accountable.",
        whyItMatters:
          "At this stage, speed is less dangerous than drift. The business needs clear ownership, measurement, and risk boundaries so adoption stays useful over time.",
        nextStep: {
          label: "Start a conversation",
          href: "/contact",
          note: "A focused discussion can help decide whether the next issue is governance, architecture, or operating design.",
        },
        relatedGuideSlugs: [
          "decision-rights-under-complexity",
          "metrics-you-can-run-the-company-on",
          "structure-follows-architecture",
        ],
      },
    ],
    questions: [
      {
        id: "workflow-clarity",
        prompt: "How clear are the workflows you would actually want AI to touch?",
        helper: "Think about real operating work, not general enthusiasm.",
        options: [
          {
            id: "unclear",
            label: "They are still fuzzy or inconsistent across teams.",
            description: "The organization is still arguing about what the workflow really is.",
            weights: { "not-ready-yet": 3, "promising-but-blocked": 1 },
          },
          {
            id: "some-clear",
            label: "A few workflows are clear, but only in specific pockets.",
            description: "There are narrow starting points, not a broad readiness story.",
            weights: { "tactically-ready-in-a-few-areas": 3, "promising-but-blocked": 1 },
          },
          {
            id: "mostly-clear",
            label: "Most target workflows are clear enough to improve deliberately.",
            description: "The operating model is reasonably legible.",
            weights: { "ready-for-focused-adoption": 3, "ready-governance-is-the-issue": 1 },
          },
          {
            id: "clear-and-owned",
            label: "They are clear, owned, and already measured.",
            description: "The remaining work is mostly around guardrails and rollout quality.",
            weights: { "ready-governance-is-the-issue": 3, "ready-for-focused-adoption": 1 },
          },
        ],
      },
      {
        id: "data-quality",
        prompt: "How usable is the underlying data or source-of-truth layer?",
        helper: "If AI touches weak data, it usually creates louder confusion rather than leverage.",
        options: [
          {
            id: "weak",
            label: "Too weak to trust for meaningful automation.",
            description: "Signal quality and source-of-truth design are both shaky.",
            weights: { "not-ready-yet": 3, "promising-but-blocked": 1 },
          },
          {
            id: "mixed",
            label: "Usable in a few places, unreliable in others.",
            description: "There are promising workflows, but the data layer is uneven.",
            weights: { "promising-but-blocked": 3, "tactically-ready-in-a-few-areas": 1 },
          },
          {
            id: "good-enough",
            label: "Good enough for focused use cases.",
            description: "There is enough trust to move carefully in the right areas.",
            weights: { "ready-for-focused-adoption": 3, "tactically-ready-in-a-few-areas": 1 },
          },
          {
            id: "strong",
            label: "Strong enough that governance now matters more than cleanup.",
            description: "The data layer is a foundation, not the blocker.",
            weights: { "ready-governance-is-the-issue": 3, "ready-for-focused-adoption": 1 },
          },
        ],
      },
      {
        id: "ownership",
        prompt: "How real is ownership for AI-related decisions?",
        helper: "This includes who decides, who governs, and who measures outcomes.",
        options: [
          {
            id: "none",
            label: "Ownership is vague or aspirational.",
            description: "Interest exists, but responsibility does not.",
            weights: { "not-ready-yet": 3, "tactically-ready-in-a-few-areas": 1 },
          },
          {
            id: "pilot-owner",
            label: "There are one or two likely owners for a pilot area.",
            description: "Targeted work may be possible even if the system is not broadly ready.",
            weights: { "tactically-ready-in-a-few-areas": 3, "promising-but-blocked": 1 },
          },
          {
            id: "strong-owner",
            label: "Ownership exists, but execution still hits system blockers.",
            description: "The organization is serious, but the foundations are slowing it down.",
            weights: { "promising-but-blocked": 3, "ready-for-focused-adoption": 1 },
          },
          {
            id: "governed",
            label: "Ownership and review structures are already mostly defined.",
            description: "The conversation is now about scale and guardrails, not whether anyone owns it.",
            weights: { "ready-governance-is-the-issue": 3, "ready-for-focused-adoption": 1 },
          },
        ],
      },
      {
        id: "tooling-fragmentation",
        prompt: "How much fragmentation sits beneath the workflows you want to improve?",
        helper: "Think about tools, handoffs, systems of record, and manual work.",
        options: [
          {
            id: "severe",
            label: "A lot. The workflow is still spread across too many tools and unclear boundaries.",
            description: "AI would likely magnify system fragmentation first.",
            weights: { "not-ready-yet": 2, "promising-but-blocked": 2 },
          },
          {
            id: "moderate",
            label: "Some. It is workable, but cleanup would improve confidence.",
            description: "There is enough shape to test a few narrow use cases.",
            weights: { "tactically-ready-in-a-few-areas": 2, "promising-but-blocked": 2 },
          },
          {
            id: "contained",
            label: "It is fairly contained around the highest-value workflows.",
            description: "Tooling complexity exists but is not the main blocker.",
            weights: { "ready-for-focused-adoption": 3, "ready-governance-is-the-issue": 1 },
          },
          {
            id: "minimal",
            label: "Minimal. The bigger issue is how to govern and scale responsibly.",
            description: "The system shape is usable enough to move with discipline.",
            weights: { "ready-governance-is-the-issue": 3 },
          },
        ],
      },
      {
        id: "best-next-move",
        prompt: "What would be most useful right now?",
        helper: "Choose the answer that reflects the real decision in front of the business.",
        options: [
          {
            id: "clarify-foundations",
            label: "A sober read on whether the foundations are ready at all.",
            description: "The business needs clarity before it starts calling things AI strategy.",
            weights: { "not-ready-yet": 3, "promising-but-blocked": 1 },
          },
          {
            id: "find-pilot",
            label: "A narrower read on where one useful pilot could start.",
            description: "The goal is not a grand program, just a credible first use case.",
            weights: { "tactically-ready-in-a-few-areas": 3, "ready-for-focused-adoption": 1 },
          },
          {
            id: "remove-blockers",
            label: "A cleaner view of the blockers slowing good opportunities down.",
            description: "There is appetite and some readiness, but friction still clouds the path.",
            weights: { "promising-but-blocked": 3 },
          },
          {
            id: "sequence-adoption",
            label: "A plan for moving responsibly with AI where it can already help.",
            description: "The organization is ready enough that sequencing now matters most.",
            weights: { "ready-for-focused-adoption": 2, "ready-governance-is-the-issue": 2 },
          },
        ],
      },
    ],
  },
  {
    id: "tech-stack-audit",
    slug: "tech-stack-audit",
    title: "Is your tech stack helping or hurting?",
    shortTitle: "Tech Stack Audit",
    kicker: "First-pass stack read",
    description:
      "Get a credible first-pass view of whether the stack is coherent, fragmented, overgrown, risky, or simply under-documented for the current stage.",
    audience:
      "For teams that can feel technical drag, integration burden, or platform risk but need a sharper read on system posture first.",
    estimatedTime: "5 minutes",
    outputLabel: "Likely stack posture",
    completionLabel:
      "You now have a first-pass view of the stack posture and the likely weak spots worth pressure-testing next.",
    questionIntro:
      "Answer based on the current stack you are actually carrying, not the architecture you would design from a blank slate.",
    categories: [
      {
        id: "stable-but-underdocumented",
        title: "Stable but under-documented",
        summary:
          "The stack is probably workable enough for the stage, but knowledge, documentation, and system legibility are not keeping up with the business.",
        whyItMatters:
          "This posture can feel calm right until key people leave, product scope expands, or the organization needs to move faster than tribal memory allows.",
        nextStep: {
          label: "Browse stack guides",
          href: "/launchpad/guides",
          note: "You may be able to improve the posture with clearer mapping and sequencing first.",
        },
        relatedGuideSlugs: [
          "architecture-map-before-roadmap",
          "structure-follows-architecture",
          "metrics-you-can-run-the-company-on",
        ],
      },
      {
        id: "fragmented-and-fragile",
        title: "Fragmented and fragile",
        summary:
          "Too many tools, unclear boundaries, and handoff risk are likely making simple work harder than it should be.",
        whyItMatters:
          "This is where stack complexity starts shaping product speed, support load, and confidence in change. The business often needs a sharper diagnostic before it can simplify responsibly.",
        nextStep: {
          label: "Book a free strategy call",
          href: "/contact?interest=founder-review",
          note: "A direct diagnostic can separate platform symptoms from the real architecture and workflow issues.",
        },
        relatedGuideSlugs: [
          "integration-tax",
          "modernize-vs-rebuild",
          "delivery-velocity-is-a-systems-problem",
        ],
      },
      {
        id: "scaling-with-risk",
        title: "Scaling with risk",
        summary:
          "The stack is carrying the business, but the margin for error is getting thinner as customer demands, integrations, or operational load increase.",
        whyItMatters:
          "This posture often looks acceptable until a raise, replatform, enterprise customer, or high-stakes rollout suddenly exposes the cost of undocumented or brittle decisions.",
        nextStep: {
          label: "Book a free strategy call",
          href: "/contact?interest=founder-review",
          note: "A direct read can clarify which risks actually matter before the business overreacts.",
        },
        relatedGuideSlugs: [
          "modernize-vs-rebuild",
          "architecture-map-before-roadmap",
          "sequencing-roadmaps-under-uncertainty",
        ],
      },
      {
        id: "over-complex-for-current-stage",
        title: "Over-complex for the current stage",
        summary:
          "The system likely carries more abstraction, tooling, or platform ambition than the business currently needs or can easily support.",
        whyItMatters:
          "This creates hidden tax in onboarding, change effort, and decision-making. Simplification may create more leverage than additional architecture investment.",
        nextStep: {
          label: "Explore Execution Sprint",
          href: "/execution-sprint",
          note: "The situation may be ready for simplification and sequencing rather than another broad diagnostic.",
        },
        relatedGuideSlugs: [
          "modernize-vs-rebuild",
          "delivery-velocity-is-a-systems-problem",
          "sequencing-roadmaps-under-uncertainty",
        ],
      },
      {
        id: "under-instrumented-for-reliable-delivery",
        title: "Under-instrumented for reliable delivery",
        summary:
          "The stack may be more coherent than it feels, but observability, reporting, or operational signal are too weak to support confident decision-making.",
        whyItMatters:
          "When the business cannot see the system well, it tends to overreact to symptoms. Better signal can remove a surprising amount of unnecessary chaos.",
        nextStep: {
          label: "Start a conversation",
          href: "/contact?interest=founder-review",
          note: "A direct read can help decide whether the right move is instrumentation, diagnosis, or sequencing.",
        },
        relatedGuideSlugs: [
          "metrics-you-can-run-the-company-on",
          "post-series-a-data-foundations",
          "architecture-map-before-roadmap",
        ],
      },
    ],
    questions: [
      {
        id: "stack-shape",
        prompt: "How would you describe the current stack shape?",
        helper: "Think about tools, services, platforms, and how many moving parts are involved in normal delivery.",
        options: [
          {
            id: "manageable",
            label: "Fairly manageable, but too much still lives in people's heads.",
            description: "The stack is workable, but knowledge concentration is a risk.",
            weights: { "stable-but-underdocumented": 3, "under-instrumented-for-reliable-delivery": 1 },
          },
          {
            id: "messy",
            label: "Messy, with too many integrations and unclear system boundaries.",
            description: "The stack feels fragmented rather than intentionally designed.",
            weights: { "fragmented-and-fragile": 3, "scaling-with-risk": 1 },
          },
          {
            id: "heavy",
            label: "Powerful, but probably more complex than this stage really needs.",
            description: "The business may be carrying extra architecture weight.",
            weights: { "over-complex-for-current-stage": 3, "scaling-with-risk": 1 },
          },
          {
            id: "opaque",
            label: "Hard to see clearly because instrumentation and visibility are weak.",
            description: "The stack may not be broken, but signal is too poor to judge it well.",
            weights: { "under-instrumented-for-reliable-delivery": 3, "stable-but-underdocumented": 1 },
          },
        ],
      },
      {
        id: "change-confidence",
        prompt: "How safe does meaningful change feel right now?",
        helper: "Think about releases, integrations, and confidence in what a change might break.",
        options: [
          {
            id: "stable",
            label: "Reasonably safe, but dependent on a few people knowing the edges.",
            description: "The stack works, but its safety margin depends on tacit knowledge.",
            weights: { "stable-but-underdocumented": 3 },
          },
          {
            id: "fragile",
            label: "Fragile. Changes can create side effects quickly.",
            description: "Confidence drops as soon as the work touches multiple systems.",
            weights: { "fragmented-and-fragile": 3, "scaling-with-risk": 1 },
          },
          {
            id: "risky-growth",
            label: "Safe enough today, but risk is rising with scale, customers, or complexity.",
            description: "The system is carrying real load, but with thinning margin.",
            weights: { "scaling-with-risk": 3, "under-instrumented-for-reliable-delivery": 1 },
          },
          {
            id: "unknown",
            label: "Hard to judge because observability and reporting are too weak.",
            description: "The risk may be real, but the signal is underpowered.",
            weights: { "under-instrumented-for-reliable-delivery": 3, "fragmented-and-fragile": 1 },
          },
        ],
      },
      {
        id: "onboarding",
        prompt: "How fast can a strong new engineer become productively useful in the current system?",
        helper: "This is often one of the clearest tests of stack legibility.",
        options: [
          {
            id: "fairly-fast",
            label: "Fairly fast, once they get a basic map of the system.",
            description: "The architecture is understandable, but knowledge transfer still needs work.",
            weights: { "stable-but-underdocumented": 3 },
          },
          {
            id: "slow-fragmented",
            label: "Slow, because too much context lives across many tools and handoffs.",
            description: "The stack shape and workflow boundaries are hard to internalize.",
            weights: { "fragmented-and-fragile": 3, "over-complex-for-current-stage": 1 },
          },
          {
            id: "slow-heavy",
            label: "Slow, because the system carries more abstraction than the team can absorb easily.",
            description: "The architecture may be ahead of the stage or team size.",
            weights: { "over-complex-for-current-stage": 3, "stable-but-underdocumented": 1 },
          },
          {
            id: "unclear",
            label: "Hard to tell because the team still lacks consistent visibility into system behavior.",
            description: "The issue is not just onboarding; it is signal quality.",
            weights: { "under-instrumented-for-reliable-delivery": 3, "scaling-with-risk": 1 },
          },
        ],
      },
      {
        id: "business-fit",
        prompt: "How well does the current stack match the business as it exists today?",
        helper: "Ignore the future ideal for a moment and answer for the current operating reality.",
        options: [
          {
            id: "good-enough",
            label: "Pretty well, but it needs better documentation and operating clarity.",
            description: "The core shape is acceptable; the legibility is not.",
            weights: { "stable-but-underdocumented": 3 },
          },
          {
            id: "held-together",
            label: "It works, but mainly through workarounds and careful handling.",
            description: "The stack is functional, but fragility is obvious.",
            weights: { "fragmented-and-fragile": 3, "scaling-with-risk": 1 },
          },
          {
            id: "too-heavy",
            label: "It feels overbuilt for the company's current needs.",
            description: "The business may be paying complexity tax without enough leverage in return.",
            weights: { "over-complex-for-current-stage": 3 },
          },
          {
            id: "hard-to-read",
            label: "We cannot really judge because the system's behavior is hard to observe cleanly.",
            description: "Operational signal is too weak to evaluate fit confidently.",
            weights: { "under-instrumented-for-reliable-delivery": 3 },
          },
        ],
      },
      {
        id: "best-next-move",
        prompt: "What would be most useful next?",
        helper: "Choose the answer that best matches the business decision in front of you.",
        options: [
          {
            id: "map-current-state",
            label: "A current-state read on the stack and where fragility is hiding.",
            description: "The business needs a more honest diagnosis first.",
            weights: { "fragmented-and-fragile": 2, "scaling-with-risk": 2 },
          },
          {
            id: "clean-simplify",
            label: "A plan to simplify and sequence the stack more responsibly.",
            description: "The situation may be legible enough for planning rather than broad diagnosis.",
            weights: { "over-complex-for-current-stage": 3, "stable-but-underdocumented": 1 },
          },
          {
            id: "improve-visibility",
            label: "Better visibility, instrumentation, and signal before bigger decisions.",
            description: "The organization needs to see the system more clearly before moving.",
            weights: { "under-instrumented-for-reliable-delivery": 3, "stable-but-underdocumented": 1 },
          },
          {
            id: "validate-risk",
            label: "A direct read on whether the current posture is risky or just messy.",
            description: "The business needs judgment more than a generic stack cleanup list.",
            weights: { "scaling-with-risk": 3, "fragmented-and-fragile": 1 },
          },
        ],
      },
    ],
  },
]

const launchpadToolMap = new Map(launchpadTools.map((tool) => [tool.slug, tool]))
const launchpadProgramMap = new Map(launchpadPrograms.map((program) => [program.id, program]))
const launchpadGuideCollectionMap = new Map(
  launchpadGuideCollections.map((collection) => [collection.id, collection]),
)

const resultGuidanceMap: Record<string, LaunchpadResultGuidance> = {
  "delivery-drag-diagnostic:structural-delivery-drag": {
    firstMoves: [
      "Map the highest-risk architecture boundaries and change dependencies.",
      "Pick one structural hotspot to stabilize before pushing more feature scope.",
      "Define explicit ownership for platform decisions and review cadence.",
    ],
    riskIfUnchanged:
      "Delivery cost and fragility keep compounding, making every roadmap commitment harder to trust.",
  },
  "delivery-drag-diagnostic:sequencing-drag": {
    firstMoves: [
      "Re-sequence the next quarter around dependency removal, not feature preference.",
      "Publish explicit 30/60/90 execution gates with decision criteria.",
      "Pause low-leverage initiatives until critical path constraints are cleared.",
    ],
    riskIfUnchanged:
      "Teams keep working hard against a brittle sequence, and confidence in planning erodes.",
  },
  "delivery-drag-diagnostic:ownership-coordination-drag": {
    firstMoves: [
      "Define decision-right owners for cross-functional execution points.",
      "Reduce handoff count across the highest-friction workflow.",
      "Establish one operating rhythm for escalation and unblock decisions.",
    ],
    riskIfUnchanged:
      "Coordination overhead grows faster than output, and execution speed keeps degrading.",
  },
  "delivery-drag-diagnostic:visibility-data-drag": {
    firstMoves: [
      "Agree on one source of truth for priority delivery and risk metrics.",
      "Cut low-signal reporting and focus on decision-grade indicators.",
      "Add simple weekly variance checks between plan and observed delivery behavior.",
    ],
    riskIfUnchanged:
      "Leadership decisions stay noisy and reactive, increasing rework and plan churn.",
  },
  "delivery-drag-diagnostic:integration-driven-drag": {
    firstMoves: [
      "Inventory the most failure-prone integrations and rank by business impact.",
      "Add clear interface ownership for each high-risk boundary.",
      "Stabilize one integration path end-to-end before expanding scope.",
    ],
    riskIfUnchanged:
      "Integration failures continue to tax delivery and absorb capacity from core work.",
  },
  "ai-readiness-checklist:not-ready-yet": {
    firstMoves: [
      "Clarify one workflow where value is measurable before discussing broad AI plans.",
      "Assign a single accountable owner for readiness decisions.",
      "Stabilize baseline data quality and access before tooling decisions.",
    ],
    riskIfUnchanged:
      "AI initiatives become performative, with low adoption and high distraction cost.",
  },
  "ai-readiness-checklist:tactically-ready-in-a-few-areas": {
    firstMoves: [
      "Select one narrow pilot with a clear success metric and owner.",
      "Set a 6-week evaluation window with adoption and quality checkpoints.",
      "Document constraints before scaling beyond the pilot scope.",
    ],
    riskIfUnchanged:
      "Potential value remains trapped in isolated wins without a reusable execution model.",
  },
  "ai-readiness-checklist:promising-but-blocked": {
    firstMoves: [
      "List the top three blockers by impact on adoption velocity.",
      "Fix ownership and workflow clarity before adding more tools.",
      "Sequence blocker removal with one practical business use case.",
    ],
    riskIfUnchanged:
      "Teams stay stuck between ambition and execution, with little measurable progress.",
  },
  "ai-readiness-checklist:ready-for-focused-adoption": {
    firstMoves: [
      "Launch a focused adoption plan for highest-value workflows first.",
      "Add lightweight governance around quality, risk, and review.",
      "Create a repeatable rollout pattern for adjacent teams.",
    ],
    riskIfUnchanged:
      "Readiness advantage decays while competitors operationalize faster.",
  },
  "ai-readiness-checklist:ready-governance-is-the-issue": {
    firstMoves: [
      "Establish explicit governance owners and escalation paths.",
      "Define minimum quality, risk, and compliance controls by workflow.",
      "Run monthly governance reviews tied to delivery outcomes.",
    ],
    riskIfUnchanged:
      "Adoption continues but risk exposure grows faster than control maturity.",
  },
  "tech-stack-audit:stable-but-underdocumented": {
    firstMoves: [
      "Document critical workflows and architecture decisions with owners.",
      "Create onboarding maps for top dependency paths.",
      "Set a lightweight monthly system review to prevent knowledge drift.",
    ],
    riskIfUnchanged:
      "Execution quality stays person-dependent and fragile under team or scope change.",
  },
  "tech-stack-audit:fragmented-and-fragile": {
    firstMoves: [
      "Identify top fragility zones across integrations and deployment boundaries.",
      "Consolidate overlapping tooling where operational cost is highest.",
      "Define one stabilization backlog with ownership and near-term sequence.",
    ],
    riskIfUnchanged:
      "Small changes keep producing outsized operational risk and delivery stalls.",
  },
  "tech-stack-audit:scaling-with-risk": {
    firstMoves: [
      "Prioritize risk controls on the highest-growth system paths.",
      "Add explicit reliability checkpoints to roadmap decisions.",
      "Stress-test one critical flow before scaling adjacent complexity.",
    ],
    riskIfUnchanged:
      "Growth pressure exposes hidden risk faster than teams can respond.",
  },
  "tech-stack-audit:over-complex-for-current-stage": {
    firstMoves: [
      "Remove non-essential abstraction from highest-friction delivery paths.",
      "Right-size platform decisions to current business stage and team capacity.",
      "Sequence simplification work before adding new architecture layers.",
    ],
    riskIfUnchanged:
      "Complexity tax keeps absorbing time and budget without proportional business value.",
  },
  "tech-stack-audit:under-instrumented-for-reliable-delivery": {
    firstMoves: [
      "Define minimum observability baseline for critical workflows.",
      "Instrument error, latency, and quality signals tied to business outcomes.",
      "Add weekly signal review to guide delivery and risk decisions.",
    ],
    riskIfUnchanged:
      "The team keeps making decisions with weak signal, increasing rework and uncertainty.",
  },
}

const caseStudyRecommendationMap: Record<string, LaunchpadCaseStudyRecommendation> = {
  "delivery-drag-diagnostic:structural-delivery-drag": {
    slug: "mt-bank",
    client: "M&T Bank",
    reason: "Legacy platform constraints and sequencing risk under real delivery pressure.",
  },
  "delivery-drag-diagnostic:sequencing-drag": {
    slug: "confinity",
    client: "Confinity",
    reason: "Roadmap sequencing and execution structure in a fast-evolving operating context.",
  },
  "delivery-drag-diagnostic:ownership-coordination-drag": {
    slug: "premier-financial-alliance",
    client: "Premier Financial Alliance",
    reason: "Cross-functional ownership clarity and operating workflow alignment.",
  },
  "delivery-drag-diagnostic:visibility-data-drag": {
    slug: "john-templeton-foundation",
    client: "John Templeton Foundation",
    reason: "Data quality and signal clarity improvements for better decisions.",
  },
  "delivery-drag-diagnostic:integration-driven-drag": {
    slug: "barclays-bank-us",
    client: "Barclays Bank US",
    reason: "Integration-heavy modernization and complex environment execution.",
  },
  "ai-readiness-checklist:not-ready-yet": {
    slug: "john-templeton-foundation",
    client: "John Templeton Foundation",
    reason: "Readiness starts with data and workflow foundations, not tooling hype.",
  },
  "ai-readiness-checklist:tactically-ready-in-a-few-areas": {
    slug: "pearlx",
    client: "PearlX",
    reason: "Focused execution around practical workflows and staged rollout.",
  },
  "ai-readiness-checklist:promising-but-blocked": {
    slug: "sofi",
    client: "SoFi",
    reason: "Operational decision support in a high-velocity financial environment.",
  },
  "ai-readiness-checklist:ready-for-focused-adoption": {
    slug: "moodys",
    client: "Moody's",
    reason: "Specialized intelligence workflows deployed for enterprise use.",
  },
  "ai-readiness-checklist:ready-governance-is-the-issue": {
    slug: "tiaa",
    client: "TIAA",
    reason: "Execution in a regulated environment where governance quality matters.",
  },
  "tech-stack-audit:stable-but-underdocumented": {
    slug: "admin-partners",
    client: "Admin Partners",
    reason: "System legibility and process quality improvements for sustainable execution.",
  },
  "tech-stack-audit:fragmented-and-fragile": {
    slug: "cleanitsupply",
    client: "CleanItSupply",
    reason: "Modernization and operational simplification in a legacy-heavy stack.",
  },
  "tech-stack-audit:scaling-with-risk": {
    slug: "barclays-bank-us",
    client: "Barclays Bank US",
    reason: "Platform evolution and reliability constraints at enterprise scale.",
  },
  "tech-stack-audit:over-complex-for-current-stage": {
    slug: "confinity",
    client: "Confinity",
    reason: "Right-sizing architecture and execution patterns to current business stage.",
  },
  "tech-stack-audit:under-instrumented-for-reliable-delivery": {
    slug: "premier-financial-alliance",
    client: "Premier Financial Alliance",
    reason: "Operational signal and workflow clarity in critical system processes.",
  },
}

export function getLaunchpadTool(toolId: LaunchpadToolId): LaunchpadToolDefinition {
  return launchpadToolMap.get(toolId)!
}

export function getLaunchpadProgram(programId: LaunchpadProgramId): LaunchpadProgramCard {
  return launchpadProgramMap.get(programId)!
}

export function getLaunchpadGuideCollection(collectionId: string) {
  return launchpadGuideCollectionMap.get(collectionId)
}

export function getLaunchpadGuideArticles(collection: LaunchpadGuideCollection): KnowledgeBrief[] {
  return collection.articleSlugs
    .map((slug) => getKnowledgeBriefBySlug(slug))
    .filter((brief): brief is KnowledgeBrief => Boolean(brief))
}

export function getFeaturedLaunchpadGuides() {
  return launchpadGuideCollections.slice(0, 4)
}

export function getFeaturedLaunchpadTools() {
  return launchpadTools
}

export function getLaunchpadSignalArticles() {
  return [
    getKnowledgeBriefBySlug("delivery-velocity-is-a-systems-problem"),
    getKnowledgeBriefBySlug("modernize-vs-rebuild"),
    getKnowledgeBriefBySlug("metrics-you-can-run-the-company-on"),
  ].filter((brief): brief is KnowledgeBrief => Boolean(brief))
}

function toConfidenceLabel(level: "high" | "medium" | "provisional") {
  if (level === "high") {
    return "High confidence"
  }
  if (level === "medium") {
    return "Medium confidence"
  }
  return "Provisional confidence"
}

function toConfidenceSummary(
  level: "high" | "medium" | "provisional",
  answerRatio: number,
  margin: number,
) {
  const answered = Math.round(answerRatio * 100)
  if (level === "high") {
    return `Strong pattern match (${answered}% of core questions answered, score margin ${margin}).`
  }
  if (level === "medium") {
    return `Useful directional read (${answered}% of core questions answered, score margin ${margin}).`
  }
  return `Early signal only (${answered}% of core questions answered, score margin ${margin}). Validate before committing.`
}

function getConfidenceLevel(answerRatio: number, margin: number) {
  if (answerRatio >= 0.85 && margin >= 4) {
    return "high" as const
  }
  if (answerRatio >= 0.6 && margin >= 2) {
    return "medium" as const
  }
  return "provisional" as const
}

function truncateDriverPrompt(prompt: string) {
  if (prompt.length <= 78) {
    return prompt
  }
  const trimmed = prompt.slice(0, 78).trim()
  const safeCut = trimmed.lastIndexOf(" ")
  return `${safeCut > 35 ? trimmed.slice(0, safeCut) : trimmed}...`
}

export function evaluateLaunchpadTool(
  toolId: LaunchpadToolId,
  answers: Record<string, string>,
): LaunchpadToolResult | null {
  const tool = getLaunchpadTool(toolId)

  if (!tool) {
    return null
  }

  const totals = Object.fromEntries(tool.categories.map((category) => [category.id, 0]))

  for (const question of tool.questions) {
    const answerId = answers[question.id]

    if (!answerId) {
      continue
    }

    const option = question.options.find((item) => item.id === answerId)

    if (!option) {
      continue
    }

    for (const [categoryId, weight] of Object.entries(option.weights)) {
      totals[categoryId] = (totals[categoryId] ?? 0) + weight
    }
  }

  const ranked = [...tool.categories]
    .map((category, index) => ({
      category,
      index,
      score: totals[category.id] ?? 0,
    }))
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score
      }

      return left.index - right.index
    })

  const top = ranked[0]

  if (!top) {
    return null
  }

  const runnerUp = ranked[1]
  const margin = Math.max(0, top.score - (runnerUp?.score ?? 0))
  const answeredCount = tool.questions.reduce(
    (count, question) => (answers[question.id] ? count + 1 : count),
    0,
  )
  const answerRatio = tool.questions.length > 0 ? answeredCount / tool.questions.length : 0
  const confidenceLevel = getConfidenceLevel(answerRatio, margin)

  const topDrivers = tool.questions
    .map((question) => {
      const answerId = answers[question.id]
      const option = question.options.find((item) => item.id === answerId)
      if (!option) {
        return null
      }
      const dominantWeight = option.weights[top.category.id] ?? 0
      if (dominantWeight <= 0) {
        return null
      }
      return {
        score: dominantWeight,
        signal: `${truncateDriverPrompt(question.prompt)} -> ${option.label}`,
      }
    })
    .filter((item): item is { score: number; signal: string } => Boolean(item))
    .sort((left, right) => right.score - left.score)
    .slice(0, 3)
    .map((item) => item.signal)

  return {
    tool,
    category: top.category,
    dominantScore: top.score,
    runnerUp: runnerUp?.category,
    runnerUpScore: runnerUp?.score,
    totals,
    topDrivers,
    confidence: {
      level: confidenceLevel,
      label: toConfidenceLabel(confidenceLevel),
      summary: toConfidenceSummary(confidenceLevel, answerRatio, margin),
      answerRatio,
      margin,
    },
  }
}

export function getLaunchpadResultGuidance(
  toolId: LaunchpadToolId,
  categoryId: string,
): LaunchpadResultGuidance {
  return (
    resultGuidanceMap[`${toolId}:${categoryId}`] ?? {
      firstMoves: [
        "Identify the highest-friction workflow and assign a single owner.",
        "Reduce cross-functional handoffs in the next planning cycle.",
        "Run a 2-week checkpoint against delivery and risk outcomes.",
      ],
      riskIfUnchanged:
        "Execution drag and uncertainty continue to compound while decisions stay noisy.",
    }
  )
}

export function getLaunchpadCaseStudyRecommendation(
  toolId: LaunchpadToolId,
  categoryId: string,
): LaunchpadCaseStudyRecommendation | null {
  return caseStudyRecommendationMap[`${toolId}:${categoryId}`] ?? null
}

export function getToolStrategyCallHref(
  result: LaunchpadToolResult,
  confidenceLabelOverride?: string,
) {
  const params = new URLSearchParams()
  params.set("interest", "strategy-session")
  params.set(
    "context",
    [
      `Tool: ${result.tool.title}`,
      `Profile: ${result.category.title}`,
      `Confidence: ${confidenceLabelOverride ?? result.confidence.label}`,
      `Top driver: ${result.topDrivers[0] ?? "Not enough signal yet"}`,
      "I would like a 60-minute strategy call to pressure-test this result.",
    ].join("\n"),
  )
  return `/contact?${params.toString()}`
}

export function getLaunchpadKnowledgeRecommendation(slug: string): {
  toolId: LaunchpadToolId
  reason: string
} | null {
  const toolMap: Record<string, { toolId: LaunchpadToolId; reason: string }> = {
    "delivery-velocity-is-a-systems-problem": {
      toolId: "delivery-drag-diagnostic",
      reason: "This article is strongest when the next step is testing what kind of drag is really shaping delivery.",
    },
    "operating-rhythm-after-growth": {
      toolId: "delivery-drag-diagnostic",
      reason: "Use the diagnostic if growth has increased drag but the specific source is still unclear.",
    },
    "decision-rights-under-complexity": {
      toolId: "delivery-drag-diagnostic",
      reason: "This article often surfaces ownership drag. The diagnostic can tell you whether coordination is the main problem or just one symptom.",
    },
    "modernize-vs-rebuild": {
      toolId: "tech-stack-audit",
      reason: "Use the stack audit when the modernization debate needs a clearer first-pass read on posture and weak spots.",
    },
    "architecture-map-before-roadmap": {
      toolId: "tech-stack-audit",
      reason: "This article pairs well with a stack read when the current system still needs to become legible enough to plan honestly.",
    },
    "integration-tax": {
      toolId: "tech-stack-audit",
      reason: "The stack audit is the clearest next move when integration burden is distorting the cost of change.",
    },
    "post-series-a-data-foundations": {
      toolId: "ai-readiness-checklist",
      reason: "Use the AI checklist if the business is starting to ask for automation but the data layer may not be ready.",
    },
    "metrics-you-can-run-the-company-on": {
      toolId: "ai-readiness-checklist",
      reason: "This helps test whether signal quality and source-of-truth maturity are strong enough for meaningful AI adoption.",
    },
  }

  return toolMap[slug] ?? null
}
