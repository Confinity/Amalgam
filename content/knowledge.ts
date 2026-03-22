import {
  knowledgeBriefs as knowledgeLibrary,
  knowledgeCategories,
} from "@/lib/knowledge-briefs"

export type ResearchContentType =
  | "Research Brief"
  | "Explainer"
  | "Field Note"
  | "Deep Report"
  | "Method"
  | "Security Advisory"
  | "Benchmark Update"
  | "Partner Case"

export type ResearchTopicFamily =
  | "AI systems"
  | "Security"
  | "Architecture"
  | "Delivery"
  | "Data and decisions"
  | "Agent reliability"
  | "Governance and risk"
  | "Methods"

export type KnowledgePressurePath = {
  id: string
  label: string
  summary: string
  articleSlugs: string[]
}

type ArticleMetaConfig = {
  contentType: ResearchContentType
  topicFamily: ResearchTopicFamily
}

export type ExternalResearchCard = {
  id: string
  source: string
  sourceUrl: string
  sourceStamp: string
  title: string
  summary: string
  whatItMeans: string
  href: string
  ctaLabel: string
  dateLabel: string
  readTime: string
  contentType: ResearchContentType
  topicFamily: ResearchTopicFamily
}

export type ResearchTrackingCard = {
  id: string
  title: string
  detail: string
  href: string
  dateLabel: string
  readTime: string
  contentType: ResearchContentType
  topicFamily: ResearchTopicFamily
}

function shorten(text: string, max = 140) {
  if (text.length <= max) {
    return text
  }
  const slice = text.slice(0, max).trim()
  const edge = slice.lastIndexOf(" ")
  return `${edge > 60 ? slice.slice(0, edge) : slice}...`
}

const articleMetaBySlug: Record<string, ArticleMetaConfig> = {
  "modernize-vs-rebuild": { contentType: "Deep Report", topicFamily: "Architecture" },
  "architecture-map-before-roadmap": { contentType: "Method", topicFamily: "Architecture" },
  "integration-tax": { contentType: "Field Note", topicFamily: "Delivery" },
  "operating-rhythm-after-growth": { contentType: "Field Note", topicFamily: "Delivery" },
  "post-series-a-data-foundations": { contentType: "Research Brief", topicFamily: "Data and decisions" },
  "metrics-you-can-run-the-company-on": { contentType: "Method", topicFamily: "Data and decisions" },
  "delivery-velocity-is-a-systems-problem": { contentType: "Field Note", topicFamily: "Delivery" },
  "sequencing-roadmaps-under-uncertainty": { contentType: "Method", topicFamily: "Governance and risk" },
  "structure-follows-architecture": { contentType: "Deep Report", topicFamily: "Architecture" },
  "decision-rights-under-complexity": { contentType: "Research Brief", topicFamily: "Governance and risk" },
}

export const knowledgeArticles = knowledgeLibrary.map((brief) => ({
  id: brief.slug,
  slug: brief.slug,
  title: brief.title,
  category: brief.category,
  categoryLabel:
    knowledgeCategories.find((category) => category.id === brief.category)?.label ??
    "Briefing",
  promise: shorten(brief.description, 116),
  bestFor: shorten(brief.takeaway, 108),
  thesis: shorten(brief.summary, 124),
  readTime: brief.readTime,
  published: brief.published,
  contentType: articleMetaBySlug[brief.slug]?.contentType ?? "Research Brief",
  topicFamily: articleMetaBySlug[brief.slug]?.topicFamily ?? "Methods",
  featured: brief.featured,
}))

const knowledgeArticleBySlug = new Map(knowledgeArticles.map((article) => [article.slug, article]))

export const homeResearchFeaturedSlugs = [
  "modernize-vs-rebuild",
  "delivery-velocity-is-a-systems-problem",
  "post-series-a-data-foundations",
  "decision-rights-under-complexity",
  "architecture-map-before-roadmap",
  "integration-tax",
] as const

export const homeResearchFeaturedArticles = homeResearchFeaturedSlugs
  .map((slug) => knowledgeArticleBySlug.get(slug))
  .filter((article): article is (typeof knowledgeArticles)[number] => Boolean(article))

export const homeResearchQuickLinks = [
  { slug: "modernize-vs-rebuild", label: "Modernize or rebuild?" },
  { slug: "delivery-velocity-is-a-systems-problem", label: "Why delivery slows" },
  { slug: "post-series-a-data-foundations", label: "Fix your data foundation" },
] as const

export const researchTopicFamilies: Array<{
  id: ResearchTopicFamily
  label: string
  description: string
}> = [
  {
    id: "AI systems",
    label: "AI systems",
    description: "How model capability is changing and where teams should be careful before committing.",
  },
  {
    id: "Security",
    label: "Security",
    description: "Operational guidance for reducing real risk in AI-enabled systems and workflows.",
  },
  {
    id: "Architecture",
    label: "Architecture",
    description: "System shape decisions that affect reliability, speed, and change cost.",
  },
  {
    id: "Delivery",
    label: "Delivery",
    description: "Execution patterns that keep product and engineering work moving under pressure.",
  },
  {
    id: "Data and decisions",
    label: "Data and decisions",
    description: "Metrics trust, data foundations, and decision quality in fast-moving teams.",
  },
  {
    id: "Agent reliability",
    label: "Agent reliability",
    description: "Where agent performance is improving and where reliability still breaks down.",
  },
  {
    id: "Governance and risk",
    label: "Governance and risk",
    description: "How leadership can set decision rights and safeguards without slowing execution.",
  },
  {
    id: "Methods",
    label: "Methods",
    description: "Practical frameworks teams can use to evaluate and sequence high-stakes decisions.",
  },
]

export const knowledgePressurePaths: KnowledgePressurePath[] = [
  {
    id: "delivery-slipping",
    label: "When delivery keeps slipping",
    summary: "Find where drag is really coming from before adding more process.",
    articleSlugs: [
      "delivery-velocity-is-a-systems-problem",
      "integration-tax",
      "sequencing-roadmaps-under-uncertainty",
    ],
  },
  {
    id: "next-move-unclear",
    label: "When the next move is unclear",
    summary: "Use system mapping and sequencing guidance to reduce uncertainty fast.",
    articleSlugs: [
      "architecture-map-before-roadmap",
      "sequencing-roadmaps-under-uncertainty",
      "decision-rights-under-complexity",
    ],
  },
  {
    id: "systems-getting-harder",
    label: "When systems are getting harder to manage",
    summary: "Right-size architecture and ownership before complexity compounds.",
    articleSlugs: [
      "modernize-vs-rebuild",
      "structure-follows-architecture",
      "operating-rhythm-after-growth",
    ],
  },
  {
    id: "numbers-not-trustworthy",
    label: "When the numbers no longer feel trustworthy",
    summary: "Stabilize the data foundation so decisions can move with confidence.",
    articleSlugs: [
      "post-series-a-data-foundations",
      "metrics-you-can-run-the-company-on",
      "decision-rights-under-complexity",
    ],
  },
  {
    id: "decisions-stall",
    label: "When decisions stall across teams",
    summary: "Clarify authority and team-system fit to reduce escalation drag.",
    articleSlugs: [
      "decision-rights-under-complexity",
      "structure-follows-architecture",
      "operating-rhythm-after-growth",
    ],
  },
  {
    id: "priorities-keep-colliding",
    label: "When priorities keep colliding",
    summary: "Sequence by risk and decision value before committing full scope.",
    articleSlugs: [
      "sequencing-roadmaps-under-uncertainty",
      "architecture-map-before-roadmap",
      "delivery-velocity-is-a-systems-problem",
    ],
  },
]

export const featuredKnowledgeArticle =
  knowledgeArticles.find((article) => article.featured) ?? knowledgeArticles[0]

export const knowledgeTopics = knowledgeCategories.map((category) => ({
  id: category.id,
  label: category.label,
  description: category.description,
  count: knowledgeArticles.filter((article) => article.category === category.id).length,
}))

export const researchTrackingNow: ResearchTrackingCard[] = [
  {
    id: "agent-reliability",
    title: "AI systems and agent reliability",
    detail:
      "We are tracking where agents fail in real workflows, not just demo environments, so teams can set safer rollout boundaries.",
    href: "/research/delivery-velocity-is-a-systems-problem",
    dateLabel: "Updated Mar 22, 2026",
    readTime: "6 min read",
    contentType: "Benchmark Update",
    topicFamily: "Agent reliability",
  },
  {
    id: "security-risk",
    title: "Security and risk in real deployments",
    detail:
      "We are watching how AI attack surfaces are evolving and translating guidance into controls teams can apply right now.",
    href: "/research/post-series-a-data-foundations",
    dateLabel: "Reviewed Mar 22, 2026",
    readTime: "7 min read",
    contentType: "Security Advisory",
    topicFamily: "Security",
  },
  {
    id: "architecture-complexity",
    title: "Architecture and operating complexity",
    detail:
      "We are mapping where integration drag and system coupling are quietly reducing delivery confidence.",
    href: "/research/architecture-map-before-roadmap",
    dateLabel: "Updated Mar 22, 2026",
    readTime: "8 min read",
    contentType: "Research Brief",
    topicFamily: "Architecture",
  },
  {
    id: "decision-quality",
    title: "Decision quality under delivery pressure",
    detail:
      "We are comparing planning assumptions to execution reality so leaders can make sharper, lower-regret calls.",
    href: "/research/sequencing-roadmaps-under-uncertainty",
    dateLabel: "Updated Mar 22, 2026",
    readTime: "8 min read",
    contentType: "Research Brief",
    topicFamily: "Governance and risk",
  },
]

export const researchStreams = [
  {
    id: "research-briefs",
    title: "Research briefs",
    detail: "Fast reads on useful research and what to do with it.",
  },
  {
    id: "external-explainers",
    title: "Outside research explainers",
    detail: "Important outside papers and what they mean in practice.",
  },
  {
    id: "field-notes",
    title: "Field notes",
    detail: "What we are seeing in real delivery work.",
  },
  {
    id: "deep-reports",
    title: "Deep reports",
    detail: "Longer synthesis, themes, and recommendations.",
  },
  {
    id: "methods-frameworks",
    title: "Methods and frameworks",
    detail: "Practical ways to evaluate, decide, and act.",
  },
]

export const externalResearchCards: ExternalResearchCard[] = [
  {
    id: "anthropic-81000",
    source: "Anthropic",
    sourceUrl: "https://www.anthropic.com/research",
    sourceStamp: "Source: Anthropic | Published Dec 2025",
    title: "What 81,000 people want from AI and what product teams should learn",
    summary:
      "A large qualitative study shows people care most about reliability, usefulness, and trust in day-to-day AI use.",
    whatItMeans:
      "Companies should prioritize dependable workflows and clear value over novelty-first launches.",
    href: "/research/metrics-you-can-run-the-company-on",
    ctaLabel: "Read research",
    dateLabel: "Published December 18, 2025",
    readTime: "6 min read",
    contentType: "Explainer",
    topicFamily: "AI systems",
  },
  {
    id: "anthropic-vend",
    source: "Anthropic",
    sourceUrl: "https://www.anthropic.com/research",
    sourceStamp: "Source: Anthropic | Project Vend | Published Dec 2025",
    title: "What Project Vend shows about AI agents in messy real-world tasks",
    summary:
      "Project Vend highlights how quickly real-world context creates coordination and reliability gaps for autonomous agents.",
    whatItMeans:
      "Operators should treat autonomy as staged capability and design explicit review loops from day one.",
    href: "/research/delivery-velocity-is-a-systems-problem",
    ctaLabel: "What it means",
    dateLabel: "Published December 18, 2025",
    readTime: "5 min read",
    contentType: "Benchmark Update",
    topicFamily: "Agent reliability",
  },
  {
    id: "stanford-ai-index-2025",
    source: "Stanford HAI AI Index",
    sourceUrl: "https://hai.stanford.edu/ai-index",
    sourceStamp: "Source: Stanford HAI | AI Index 2025",
    title: "The AI Index 2025: what changed, and what matters for companies now",
    summary:
      "The 2025 report tracks capability growth, policy shifts, and adoption signals across industry and government.",
    whatItMeans:
      "Leaders need to separate headline momentum from real operating readiness, staffing reality, and risk exposure.",
    href: "/research/sequencing-roadmaps-under-uncertainty",
    ctaLabel: "Read research",
    dateLabel: "Released April 2025",
    readTime: "7 min read",
    contentType: "Explainer",
    topicFamily: "Governance and risk",
  },
  {
    id: "owasp-nist-security",
    source: "OWASP GenAI + NIST AI RMF",
    sourceUrl:
      "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
    sourceStamp: "Original source: OWASP GenAI Top 10 | NIST AI RMF",
    title: "How to read AI security guidance without drowning in frameworks",
    summary:
      "Current framework guidance is useful, but teams still need an operating translation for build, launch, and monitoring decisions.",
    whatItMeans:
      "Security teams should convert standards into decision checklists tied to model behavior, data flow, and incident response.",
    href: "/research/post-series-a-data-foundations",
    ctaLabel: "What it means",
    dateLabel: "Reviewed Mar 22, 2026",
    readTime: "7 min read",
    contentType: "Security Advisory",
    topicFamily: "Security",
  },
  {
    id: "frontier-progress-claims",
    source: "Frontier publications landscape",
    sourceUrl: "https://deepmind.google/research/publications/",
    sourceStamp: "Source: Google DeepMind publications | Updated Mar 2026",
    title: "How to interpret AGI progress claims without losing operational focus",
    summary:
      "Frontier milestones can signal genuine model progress, but they rarely map one-to-one to controllable deployment performance.",
    whatItMeans:
      "Startups and operators should evaluate production reliability and guardrails before translating headline progress into roadmap bets.",
    href: "/research/architecture-map-before-roadmap",
    ctaLabel: "Read research",
    dateLabel: "Updated Mar 22, 2026",
    readTime: "6 min read",
    contentType: "Explainer",
    topicFamily: "AI systems",
  },
]

export const researchMethodPoints = [
  {
    id: "track",
    title: "We track published research and major frameworks",
    detail:
      "We monitor important external sources and focus on signals that affect real product and operating decisions.",
  },
  {
    id: "compare",
    title: "We compare research with active delivery work",
    detail:
      "We test where findings hold up or break down against what we see in live systems and teams.",
  },
  {
    id: "translate",
    title: "We turn findings into practical recommendations",
    detail:
      "Each piece explains what the research says, what it means in practice, and what teams can do next.",
  },
  {
    id: "update",
    title: "We update recommendations as conditions change",
    detail:
      "When evidence shifts, we revise guidance and call out what changed so teams can adjust quickly.",
  },
]

export const researchTrustMeta = {
  lastReviewed: "Mar 22, 2026",
  reviewedBy: "Ryan Ward, Head of Research, Amalgam",
  evidenceMix: "Published studies, benchmarks, and field notes",
  confidence: [
    "High = strong evidence and stable guidance",
    "Medium = useful but still evolving",
    "Emerging = early signal, review with caution",
  ],
} as const

export const researchSourcesTracked = [
  "Anthropic",
  "OpenAI",
  "Google DeepMind",
  "Google Research",
  "Meta AI",
  "NVIDIA",
  "Microsoft Research",
  "Stanford HAI",
  "MIT CSAIL",
  "University of Oxford",
  "University of Cambridge",
  "Harvard University",
  "Princeton University",
  "ETH Zurich",
  "Carnegie Mellon University",
  "UC Berkeley AI Research",
  "NIST",
  "OWASP",
  "CISA",
  "MITRE ATLAS",
] as const

export const homeResearchSourcesPreview = [
  "Anthropic",
  "OpenAI",
  "Google DeepMind",
  "Google Research",
  "Meta AI",
  "NVIDIA",
  "Microsoft Research",
  "Stanford HAI",
  "MIT CSAIL",
  "University of Oxford",
  "University of Cambridge",
  "Harvard University",
  "NIST",
  "OWASP",
  "CISA",
  "MITRE ATLAS",
] as const satisfies ReadonlyArray<(typeof researchSourcesTracked)[number]>


