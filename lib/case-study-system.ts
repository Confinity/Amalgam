import type {
  CaseStudyMeta,
  CaseStudyProblemTag,
  CaseStudyStage,
} from "@/content/caseStudies"

export type CaseStudyFaqItem = {
  question: string
  answer: string
}

export type CaseStudyInternalLink = {
  title: string
  description: string
  href: string
}

export type CaseStudyExecutionSection = {
  id: string
  title: string
  description: string
  challenge?: string
  result?: {
    metric: string
    value: string
    description: string
  }
}

export type CaseStudyOutlineItem = {
  href: string
  label: string
}

export type CaseStudySectionCopy = {
  contextTitle: string
  pressureTitle: string
  pressureSupport: string
  structureTitle: string
  structureSupport: string
  outcomesTitle: string
  outcomesSupport: string
  fitTitle: string
}

type StageNextMove = {
  label: string
  href: string
  description: string
}

const stageNextMoveByStage: Record<CaseStudyStage, StageNextMove> = {
  "Ideate & Prioritize": {
    label: "Start the Next-Step Brief",
    href: "/next-move/next-step-brief",
    description:
      "Turn competing ideas into one clear, testable direction before execution expands.",
  },
  "Validate & De-risk": {
    label: "Run the Validation Checklist",
    href: "/next-move/validation-checklist",
    description:
      "Pressure-test assumptions and reduce avoidable risk before deeper investment.",
  },
  "Build & Ship": {
    label: "Diagnose Delivery Drag",
    href: "/next-move/delivery-drag-diagnostic",
    description:
      "Find the bottleneck that is slowing delivery and sequence a sharper intervention.",
  },
  "Productize & Systemize": {
    label: "Run the Tech Stack Audit",
    href: "/next-move/tech-stack-audit",
    description:
      "Map system fragility, ownership gaps, and reporting risk before they compound.",
  },
  "Scale & Stabilize": {
    label: "Run the Scale Readiness Check",
    href: "/next-move/scale-readiness-check",
    description:
      "Surface decision drag and reliability gaps as team and system complexity increase.",
  },
}

const serviceHrefByService: Record<CaseStudyMeta["service"], string> = {
  "Founder Review": "/founder-review",
  "Expert Guidance": "/focused-intervention",
  "Outcome Partnership": "/outcome-partnership",
}

const problemGuideByTag: Record<
  CaseStudyProblemTag,
  { title: string; href: string; description: string }
> = {
  "Delivery slipping": {
    title: "Why delivery velocity is a systems problem",
    href: "/research/delivery-velocity-is-a-systems-problem",
    description:
      "A practical read on why shipping friction is usually structural, not just execution effort.",
  },
  "Direction unclear": {
    title: "Do you need an architecture map before your roadmap?",
    href: "/research/architecture-map-before-roadmap",
    description:
      "Clarify boundaries and dependencies before committing to fragile sequencing decisions.",
  },
  "Systems fragile": {
    title: "Should you modernize or rebuild?",
    href: "/research/modernize-vs-rebuild",
    description:
      "Use a risk-based decision standard when current systems are under pressure.",
  },
  "It's hard to trust the data": {
    title: "Post-Series A data foundations",
    href: "/research/post-series-a-data-foundations",
    description:
      "Build stronger source-of-truth foundations before automation and reporting drift further.",
  },
  "Coordination is slowing work": {
    title: "Are integrations quietly slowing you down?",
    href: "/research/integration-tax",
    description:
      "See where cross-system handoffs create hidden delivery and decision overhead.",
  },
  "Modernization pressure": {
    title: "Should you modernize or rebuild?",
    href: "/research/modernize-vs-rebuild",
    description:
      "Choose between phased modernization and replacement without avoidable disruption.",
  },
}

const fitByProblemTag: Record<CaseStudyProblemTag, string> = {
  "Delivery slipping":
    "Teams already building but missing commitments because bottlenecks and dependencies are compounding.",
  "Direction unclear":
    "Founders or product leads who need to turn early conviction into a credible build plan.",
  "Systems fragile":
    "Operators with a live product that works, but relies on brittle workflows and workarounds.",
  "It's hard to trust the data":
    "Organizations where reporting confidence and data consistency now block reliable decisions.",
  "Coordination is slowing work":
    "Growing teams spending too much time on handoffs, alignment loops, and workflow friction.",
  "Modernization pressure":
    "Leaders navigating legacy-platform risk while protecting delivery continuity.",
}

const fitByStage: Record<CaseStudyStage, string> = {
  "Ideate & Prioritize":
    "Most relevant when early decisions need sharper prioritization before work expands.",
  "Validate & De-risk":
    "Best fit when one direction exists but confidence and evidence quality are still limited.",
  "Build & Ship":
    "Most useful when active delivery is underway but execution drag is increasing.",
  "Productize & Systemize":
    "Strong fit when a live product needs tighter operating loops and system reliability.",
  "Scale & Stabilize":
    "Most relevant when growth is amplifying complexity, decision load, and reliability risk.",
}

const sectionCopyByProblem: Record<
  CaseStudyProblemTag,
  Omit<CaseStudySectionCopy, "contextTitle" | "fitTitle">
> = {
  "Delivery slipping": {
    pressureTitle: "Where delivery was getting stuck",
    pressureSupport:
      "The work had to remove the bottlenecks behind missed commitments without lowering implementation quality.",
    structureTitle: "How we reduced the delivery drag",
    structureSupport:
      "The sequence focused on the highest-friction constraints first so delivery could move with less rework and less avoidable delay.",
    outcomesTitle: "What changed after the work",
    outcomesSupport:
      "The clearest shifts showed up in delivery flow, team confidence, and how much friction still sat in the system.",
  },
  "Direction unclear": {
    pressureTitle: "What needed to become clearer",
    pressureSupport:
      "The first job was turning broad conviction into a product and technical direction the team could actually execute.",
    structureTitle: "How we turned direction into a buildable plan",
    structureSupport:
      "The sequence linked product choices, architecture decisions, and delivery support so the foundation could hold as the work expanded.",
    outcomesTitle: "What changed once the foundation was clearer",
    outcomesSupport:
      "The clearest shifts showed up in product direction, decision quality, and the team's ability to move with more confidence.",
  },
  "Systems fragile": {
    pressureTitle: "Where the system was breaking down",
    pressureSupport:
      "The work had to strengthen the weak loops in the operating system before more complexity piled on top of them.",
    structureTitle: "How we stabilized the system",
    structureSupport:
      "The sequence focused on the parts of the workflow where reliability, usability, and system clarity were under the most pressure.",
    outcomesTitle: "What changed after the system work landed",
    outcomesSupport:
      "The clearest gains showed up in reliability, workflow stability, and day-to-day operating confidence.",
  },
  "It's hard to trust the data": {
    pressureTitle: "Where confidence was breaking down",
    pressureSupport:
      "The work had to improve trust in the data flow before better reporting, classification, or operational decisions were possible.",
    structureTitle: "How we rebuilt trust in the data flow",
    structureSupport:
      "The sequence focused on the areas where business logic, reporting, or classification had to become more reliable before the rest of the work could scale.",
    outcomesTitle: "What changed once the data became more usable",
    outcomesSupport:
      "The clearest gains showed up in reporting confidence, workflow consistency, and the quality of day-to-day decisions.",
  },
  "Coordination is slowing work": {
    pressureTitle: "Where coordination was slowing things down",
    pressureSupport:
      "The main issue was not effort. It was the cost of handoffs, duplicate handling, and unclear workflow boundaries.",
    structureTitle: "How we reduced the coordination load",
    structureSupport:
      "The sequence focused on the workflows where friction, duplicate effort, and unclear ownership were compounding fastest.",
    outcomesTitle: "What changed once the workflows were cleaner",
    outcomesSupport:
      "The clearest gains showed up in workflow continuity, visibility, and the amount of manual coordination still required.",
  },
  "Modernization pressure": {
    pressureTitle: "What made modernization urgent",
    pressureSupport:
      "The work had to protect continuity while changing the system underneath the team.",
    structureTitle: "How we sequenced the modernization",
    structureSupport:
      "The sequence focused on risk removal first so the platform could move without avoidable disruption or hidden migration debt.",
    outcomesTitle: "What changed once the new foundation was in place",
    outcomesSupport:
      "The clearest gains showed up in platform resilience, migration confidence, and the team's ability to move forward safely.",
  },
}

const stageGuideByStage: Record<
  CaseStudyStage,
  { title: string; href: string; description: string }
> = {
  "Ideate & Prioritize": {
    title: "How to sequence your roadmap when certainty is low",
    href: "/research/sequencing-roadmaps-under-uncertainty",
    description:
      "A practical guide for turning early conviction into a plan that stays honest about what is still unknown.",
  },
  "Validate & De-risk": {
    title: "Do you need an architecture map before your roadmap?",
    href: "/research/architecture-map-before-roadmap",
    description:
      "Clarify the current system and dependencies before committing to fragile delivery promises.",
  },
  "Build & Ship": {
    title: "Why your delivery velocity problem is really a systems problem",
    href: "/research/delivery-velocity-is-a-systems-problem",
    description:
      "See why shipping friction usually lives in the system around the team, not just inside execution effort.",
  },
  "Productize & Systemize": {
    title: "Your team structure follows your architecture",
    href: "/research/structure-follows-architecture",
    description:
      "A useful read when system boundaries, ownership, and coordination have started to drift apart.",
  },
  "Scale & Stabilize": {
    title: "Did growth break your operating rhythm?",
    href: "/research/operating-rhythm-after-growth",
    description:
      "Restore execution rhythm as team size, delivery load, and systems complexity keep increasing.",
  },
}

function formatList(items: string[], max = 3) {
  const normalized = items.map((item) => item.trim()).filter(Boolean).slice(0, max)

  if (normalized.length === 0) {
    return "a focused technology stack aligned to the business constraint"
  }

  if (normalized.length === 1) {
    return normalized[0]!
  }

  if (normalized.length === 2) {
    return `${normalized[0]} and ${normalized[1]}`
  }

  return `${normalized.slice(0, -1).join(", ")}, and ${normalized.at(-1)}`
}

function hasTechnology(study: CaseStudyMeta, pattern: string | RegExp) {
  const haystack = [
    ...study.source.technologies,
    study.source.headline,
    study.source.problem,
    study.source.approach,
  ].join(" ")

  return typeof pattern === "string"
    ? haystack.toLowerCase().includes(pattern.toLowerCase())
    : pattern.test(haystack)
}

function dedupeLinks(links: CaseStudyInternalLink[]) {
  const seen = new Set<string>()

  return links.filter((link) => {
    if (seen.has(link.href)) {
      return false
    }

    seen.add(link.href)
    return true
  })
}

function getCaseStudyTechnologyFaq(study: CaseStudyMeta): CaseStudyFaqItem[] {
  const technologySummary = formatList(study.source.technologies)

  if (
    hasTechnology(study, "WordPress") ||
    hasTechnology(study, "React.js") ||
    hasTechnology(study, "Magnolia CMS") ||
    hasTechnology(study, "WCAG")
  ) {
    return [
      {
        question: "What matters most in a website or platform modernization like this?",
        answer:
          "The critical moves are usually performance, content flexibility, and long-term maintainability. In this case, the work centered on making the experience easier to manage while improving how the platform performed for users.",
      },
      {
        question: "How do you protect discoverability during a website rebuild?",
        answer:
          "The safest path is to preserve core page structure, metadata intent, and technical SEO signals while improving rendering and performance. The implementation decisions here were shaped around that balance rather than treating launch as a purely visual redesign.",
      },
    ]
  }

  if (
    hasTechnology(study, "Q2") ||
    hasTechnology(study, "Microservices") ||
    hasTechnology(study, "REST API") ||
    hasTechnology(study, "ASP.net")
  ) {
    return [
      {
        question: "How do you modernize a live platform without creating more delivery risk?",
        answer:
          "The safest path is phased modernization. Work starts by isolating the highest-risk constraint, then sequencing migration, integration, and change-management decisions so continuity is protected while the new foundation is introduced.",
      },
      {
        question: "What architecture choices usually matter most in platform replacement work?",
        answer: `Clear system boundaries, reliable integration behavior, and maintainable technology choices matter more than novelty. In this case, the implementation centered on ${technologySummary}.`,
      },
    ]
  }

  if (
    hasTechnology(study, "OpenAlex") ||
    hasTechnology(study, "Machine Learning") ||
    hasTechnology(study, "Text Classification")
  ) {
    return [
      {
        question: "How do you improve classification quality without turning the project into a research exercise?",
        answer:
          "The practical path is to tune around the real taxonomy and workflow first, then validate behavior against the decisions the team actually needs to make. This case focused on operational usefulness, not abstract model work.",
      },
      {
        question: "What usually matters most in AI-assisted classification work?",
        answer:
          "Accuracy is only part of it. Teams also need reliable integration, usable outputs, and enough confidence in the system that it can support real day-to-day decisions.",
      },
    ]
  }

  if (
    hasTechnology(study, "Name Matching") ||
    hasTechnology(study, "Transliteration") ||
    hasTechnology(study, "Search Engineering")
  ) {
    return [
      {
        question: "How do you make name-screening workflows more usable when ambiguity is unavoidable?",
        answer:
          "The goal is not to eliminate ambiguity entirely. It is to structure matching, review, and evidence handling so teams can move through difficult cases with better consistency and less manual re-checking.",
      },
      {
        question: "Why do transliteration-heavy datasets need a different approach?",
        answer:
          "Because spelling variation, alias behavior, and fragmented source data quickly undermine simple matching logic. The work has to account for those realities in both the matching model and the review workflow around it.",
      },
    ]
  }

  if (
    hasTechnology(study, "Systems Integration") ||
    hasTechnology(study, "Workflow Coordination") ||
    hasTechnology(study, "Process Improvement")
  ) {
    return [
      {
        question: "Where do you start when disconnected systems are slowing operations down?",
        answer:
          "Start with the highest-friction workflow, not a broad integration program. That creates a clearer picture of where authority, data flow, and handoffs are really breaking down.",
      },
      {
        question: "How do you reduce coordination drag without adding another layer of process?",
        answer:
          "The strongest moves usually simplify workflow boundaries and clarify ownership before adding more tooling. That is what creates durable gains in day-to-day execution quality.",
      },
    ]
  }

  if (study.stage === "Ideate & Prioritize") {
    return [
      {
        question: "What kind of technical support matters most before a full engineering team exists?",
        answer:
          "Early-stage teams usually need architecture judgment, product sequencing, and close execution support more than a large delivery process. This case reflects that pattern directly.",
      },
      {
        question: "How do you make early product decisions without locking the company into bad assumptions?",
        answer:
          "By tying product choices to the immediate business constraint, keeping the first system flexible enough to learn from, and avoiding unnecessary complexity before the roadmap is clearer.",
      },
    ]
  }

  return [
    {
      question: "Which implementation choices mattered most in this engagement?",
      answer: `The work centered on ${technologySummary}. The choices mattered because they supported the real operating constraint instead of adding unnecessary complexity.`,
    },
    {
      question: "How do you keep this kind of work practical instead of over-engineered?",
      answer:
        "By sequencing around the highest-leverage constraint, using technology choices that fit the operating context, and staying focused on what actually needs to move for the team.",
    },
  ]
}

export function toCaseStudySectionId(title: string) {
  return title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function getCaseStudyPath(slug: string) {
  return `/our-work/${slug}`
}

export function getCaseStudyStageMove(stage: CaseStudyStage) {
  return stageNextMoveByStage[stage]
}

export function getCaseStudyGuide(problem: CaseStudyProblemTag) {
  return problemGuideByTag[problem]
}

export function getCaseStudyServicePath(service: CaseStudyMeta["service"]) {
  return serviceHrefByService[service]
}

export function buildCaseStudyInternalLinks(study: CaseStudyMeta): CaseStudyInternalLink[] {
  const stageMove = getCaseStudyStageMove(study.stage)
  const guide = getCaseStudyGuide(study.problem)
  const stageGuide = stageGuideByStage[study.stage]

  return dedupeLinks([
    {
      title: "Browse similar situations",
      description:
        "Browse the full library by pressure, stage, and industry context.",
      href: "/our-work",
    },
    {
      title: stageMove.label,
      description: stageMove.description,
      href: stageMove.href,
    },
    {
      title: `Read: ${guide.title}`,
      description: guide.description,
      href: guide.href,
    },
    {
      title: `Read: ${stageGuide.title}`,
      description: stageGuide.description,
      href: stageGuide.href,
    },
    {
      title: `Explore ${study.service}`,
      description:
        "See how this support path is structured when similar constraints are in play.",
      href: getCaseStudyServicePath(study.service),
    },
  ])
}

export function buildCaseStudyFaq(study: CaseStudyMeta): CaseStudyFaqItem[] {
  const firstChallenge = study.source.challenges[0] ?? study.source.problem
  const secondChallenge = study.source.challenges[1] ?? study.source.challenges[0] ?? study.source.problem
  const firstResult = study.source.results[0]?.description ?? study.outcome
  const firstSolution = study.source.solution[0]?.description ?? study.source.approach
  const firstSolutionTitle = study.source.solution[0]?.title ?? "initial systems work"
  const stageMove = getCaseStudyStageMove(study.stage)
  const technologyFaq = getCaseStudyTechnologyFaq(study)

  const stageSpecificQuestionByStage: Record<CaseStudyStage, CaseStudyFaqItem> = {
    "Ideate & Prioritize": {
      question: "How does this kind of engagement help when direction is still forming?",
      answer:
        "The work helps teams connect early conviction to practical technical and product choices so execution can start on a clearer foundation.",
    },
    "Validate & De-risk": {
      question: "How do you reduce implementation risk in this stage?",
      answer:
        "Risk is reduced by testing critical assumptions early, sequencing integration and model decisions carefully, and validating quality before broader rollout.",
    },
    "Build & Ship": {
      question: "How do you keep delivery moving when constraints are active?",
      answer:
        "The approach prioritizes bottleneck removal and practical sequencing so teams can ship while reducing structural drag.",
    },
    "Productize & Systemize": {
      question: "How do you improve reliability in a live operating environment?",
      answer:
        "By tightening core system boundaries, improving workflow consistency, and making day-to-day operations easier to run with confidence.",
    },
    "Scale & Stabilize": {
      question: "What matters most when complexity increases during growth?",
      answer:
        "Clear ownership, reliable operating loops, and stronger coordination patterns become critical so growth does not erode delivery confidence.",
    },
  }

  const problemSpecificQuestionByTag: Record<CaseStudyProblemTag, CaseStudyFaqItem[]> = {
    "Delivery slipping": [
      {
        question: "How did this work address delivery drag without lowering standards?",
        answer: `The intervention focused on concrete constraints first, including ${firstChallenge}. Quality was preserved by using scoped implementation steps instead of shortcutting architecture and review decisions.`,
      },
      {
        question: "Which delivery bottlenecks are common in similar situations?",
        answer: `Common bottlenecks include ${firstChallenge} and ${secondChallenge}. The work typically starts by isolating one high-leverage bottleneck, then sequencing from there.`,
      },
    ],
    "Direction unclear": [
      {
        question: "How do you move from early concept to an executable plan?",
        answer: `The process turns broad direction into a practical foundation by clarifying the core constraint, then making implementation choices around that constraint.`,
      },
      {
        question: "What kind of support matters most before a full internal team exists?",
        answer: `Teams usually need architecture judgment and reliable execution support close to the work. In this case, early priorities centered on ${firstSolutionTitle.toLowerCase()} and clearer sequencing decisions.`,
      },
    ],
    "Systems fragile": [
      {
        question: "What is the first move when systems are running but unstable?",
        answer: `The first move is usually a focused systems read: identify where reliability is breaking down, then address the highest-risk loop first.`,
      },
      {
        question: "How do you modernize without creating more operational risk?",
        answer: `The approach is phased and practical. This engagement started with ${firstSolutionTitle.toLowerCase()} and expanded from there once core stability improved.`,
      },
    ],
    "It's hard to trust the data": [
      {
        question: "How do you improve reporting confidence in complex environments?",
        answer: `The work improves data trust by tightening data flow and business logic in critical workflows. In this case, the team focused early on ${firstSolutionTitle.toLowerCase()}.`,
      },
      {
        question: "What usually blocks better data-driven decisions?",
        answer: `In many engagements, decision quality is limited by inconsistent data handling, workflow friction, and reporting constraints such as ${firstChallenge}.`,
      },
    ],
    "Coordination is slowing work": [
      {
        question: "How does this approach reduce cross-team coordination drag?",
        answer: `It reduces drag by clarifying system boundaries and improving workflow continuity in high-friction handoff areas.`,
      },
      {
        question: "Where do teams usually see the biggest coordination gains first?",
        answer: `Early gains often appear where manual rework and handoff ambiguity are highest. In this case, one early pressure point was ${firstChallenge}.`,
      },
    ],
    "Modernization pressure": [
      {
        question: "How do you handle legacy modernization pressure safely?",
        answer: `By treating modernization as a sequenced operating change, not a single technical event. Work starts with the most critical risk and expands once continuity is protected.`,
      },
      {
        question: "What helps teams avoid disruption during platform transitions?",
        answer: `Clear migration sequencing, explicit ownership, and practical change-management support. This engagement reflected that with emphasis on ${firstSolutionTitle.toLowerCase()}.`,
      },
    ],
  }

  const commonQuestions: CaseStudyFaqItem[] = [
    {
      question: `What was the core constraint in the ${study.company} engagement?`,
      answer: `${study.source.problem} One early constraint was: ${firstChallenge}.`,
    },
    {
      question: "What moved forward after implementation?",
      answer: `${study.source.outcome} A concrete shift was: ${firstResult}`,
    },
    {
      question: "When is this approach relevant for a similar team?",
      answer: `This case is most relevant for teams facing ${study.problem.toLowerCase()} during the ${study.stage.toLowerCase()} stage. A strong next step in similar situations is to ${stageMove.label}.`,
    },
  ]

  return [
    commonQuestions[0],
    commonQuestions[1],
    ...technologyFaq.slice(0, 2),
    ...problemSpecificQuestionByTag[study.problem].slice(0, 2),
    stageSpecificQuestionByStage[study.stage],
    {
      question: `Why did ${firstSolutionTitle.toLowerCase()} matter in this engagement?`,
      answer: `${firstSolution} That mattered because it directly addressed constraints such as ${secondChallenge.toLowerCase()}.`,
    },
    commonQuestions[2],
  ]
}

export function buildCaseStudyExecutionSections(study: CaseStudyMeta): CaseStudyExecutionSection[] {
  return study.source.solution.map((step, index) => ({
    id: toCaseStudySectionId(step.title),
    title: step.title,
    description: step.description,
    challenge: study.source.challenges[index] ?? study.source.challenges[0],
    result: study.source.results[index] ?? study.source.results[0],
  }))
}

export function buildCaseStudySectionCopy(study: CaseStudyMeta): CaseStudySectionCopy {
  const base = sectionCopyByProblem[study.problem]

  return {
    contextTitle: "Context snapshot",
    fitTitle: "Where this approach fits",
    ...base,
  }
}

export function buildCaseStudyOutline(study: CaseStudyMeta, hasRelated = true): CaseStudyOutlineItem[] {
  const executionSections = buildCaseStudyExecutionSections(study)
  const sectionCopy = buildCaseStudySectionCopy(study)

  return [
    { href: "#context-snapshot", label: sectionCopy.contextTitle },
    { href: "#what-needed-to-change", label: sectionCopy.pressureTitle },
    { href: "#how-we-structured-the-work", label: sectionCopy.structureTitle },
    ...executionSections.map((section) => ({
      href: `#${section.id}`,
      label: section.title,
    })),
    { href: "#what-changed", label: sectionCopy.outcomesTitle },
    { href: "#where-this-fits", label: sectionCopy.fitTitle },
    ...(hasRelated ? [{ href: "#similar-situations", label: "Similar situations" }] : []),
    { href: "#faq", label: "FAQ" },
  ]
}

export function buildCaseStudyFitBullets(study: CaseStudyMeta) {
  return [
    fitByProblemTag[study.problem],
    fitByStage[study.stage],
    `Common in ${study.industry.toLowerCase()} and comparable operating environments where the cost of execution drift is high.`,
  ]
}

export function buildCaseStudyFinalSupport(study: CaseStudyMeta) {
  return `If your team is dealing with ${study.problem.toLowerCase()} during the ${study.stage.toLowerCase()} stage, we can help diagnose the constraint, sequence the next move, and stay close through execution.`
}


