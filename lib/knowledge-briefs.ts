export type KnowledgeCategoryId =
  | "architecture"
  | "operations"
  | "data"
  | "execution"
  | "org-design"

export type KnowledgeSection = {
  id: string
  title: string
  kicker?: string
  paragraphs: string[]
  bullets?: string[]
}

export type KnowledgeBrief = {
  slug: string
  category: KnowledgeCategoryId
  title: string
  description: string
  takeaway: string
  readTime: string
  published: string
  featured: boolean
  intro: string
  summary: string
  keyTakeaways: string[]
  sections: KnowledgeSection[]
}

export const knowledgeCategories = [
  {
    id: "architecture",
    label: "Architecture",
    shortLabel: "Architecture",
    description:
      "System shape, modernization choices, and the boundary decisions that determine how hard change becomes.",
  },
  {
    id: "operations",
    label: "Operations",
    shortLabel: "Operations",
    description:
      "Operating friction, workflow complexity, and the hidden tax that appears when growth outruns coordination.",
  },
  {
    id: "data",
    label: "Data",
    shortLabel: "Data",
    description:
      "Metrics trust, source-of-truth design, and the foundations required before automation becomes reliable.",
  },
  {
    id: "execution",
    label: "Execution",
    shortLabel: "Execution",
    description:
      "Roadmaps, sequencing, and the practical mechanics of turning diagnosis into momentum.",
  },
  {
    id: "org-design",
    label: "Org Design",
    shortLabel: "Org Design",
    description:
      "Decision rights, ownership, and the way team structure either reinforces or fights the system underneath it.",
  },
] as const satisfies ReadonlyArray<{
  id: KnowledgeCategoryId
  label: string
  shortLabel: string
  description: string
}>

export const knowledgeBriefs: KnowledgeBrief[] = [
  {
    slug: "modernize-vs-rebuild",
    category: "architecture",
    title: "When to modernize vs. rebuild",
    description:
      "A practical decision framework for choosing between targeted modernization, phased replacement, and a true rebuild.",
    takeaway:
      "Use this when leadership is debating a rewrite and needs a decision tied to business risk rather than engineering taste.",
    readTime: "8 min read",
    published: "March 2026",
    featured: true,
    intro:
      "The rebuild debate usually starts too late. Delivery has slowed, integrations are brittle, onboarding new engineers takes too long, and every roadmap discussion turns into an argument about the platform. At that point, teams tend to polarize into two camps: patch what exists forever, or throw it all away and start clean. Both instincts are understandable. Neither is a strategy.",
    summary:
      "A useful modernization decision starts with business constraint, not technical frustration. Most teams need less heroism and more sequence: isolate critical risk, preserve continuity where it matters, and only rebuild where old assumptions now block the business itself.",
    keyTakeaways: [
      "A rebuild is justified when the current system blocks core business moves or creates unacceptable operating risk.",
      "Modernization is usually the stronger choice when continuity matters more than architectural elegance.",
      "The real decision is not whether a new stack would be cleaner. It is whether the migration can happen without breaking revenue, trust, and timing.",
    ],
    sections: [
      {
        id: "start-with-constraint",
        title: "Start with the constraint, not the complaint",
        kicker: "Most rewrite discussions are really business discussions in disguise.",
        paragraphs: [
          "Teams often frame the problem as technical debt, but leadership rarely feels debt directly. Leadership feels missed commitments, operational fragility, poor forecasting, and rising cost of change. That difference matters. If the system is ugly but stable, the right answer may be disciplined modernization. If the system makes key business moves unsafe or prohibitively slow, then the business is already paying for the wrong architecture every quarter.",
          "This is why the first question should never be 'How bad is the codebase?' It should be 'What is the business no longer able to do confidently because of the current system?' If the answer is vague, the team probably does not yet know enough to justify a rebuild.",
        ],
        bullets: [
          "Good signal: customer-facing continuity is at risk because the system cannot support core product changes safely.",
          "Weak signal: engineers are frustrated because the current stack feels dated or unpleasant.",
          "Critical signal: business priorities are repeatedly being reshaped to accommodate platform weakness rather than market opportunity.",
        ],
      },
      {
        id: "where-modernization-wins",
        title: "Where modernization usually wins",
        kicker: "Most companies need less disruption, not more.",
        paragraphs: [
          "Modernization is strongest when the business cannot tolerate interruption. You improve observability, isolate unstable integrations, simplify core workflows, and gradually replace the areas where fragility is actually concentrated. This path is less dramatic, but it protects the system while you learn where the true risk lives.",
          "It also creates better information. A phased modernization forces the team to articulate ownership boundaries, expose hidden dependencies, and identify where the real handoff failures occur. That learning often removes the need for a rebuild entirely, or at least narrows its scope to a few high-leverage domains.",
        ],
      },
      {
        id: "when-rebuild-is-real",
        title: "When a rebuild becomes the right call",
        kicker: "Rebuild only when old assumptions have become the trap.",
        paragraphs: [
          "A rebuild becomes defensible when the system is not just hard to change, but fundamentally shaped around assumptions the business can no longer live with. That can mean a broken domain model, an unsafe deployment pattern, a vendor or stack the company cannot staff, or a platform structure that makes new revenue-critical capabilities unnaturally expensive.",
          "Even then, the rebuild should be framed as a migration strategy. The work is not 'build a cleaner thing.' The work is to move the business from one operating substrate to another without breaking trust. That means coexistence planning, data synchronization, boundary clarity, and ruthless sequencing.",
        ],
        bullets: [
          "Define which capabilities move first and why.",
          "Design for old and new coexistence instead of pretending the cutover will be clean.",
          "Tie milestones to risk removed and delivery regained, not code rewritten.",
        ],
      },
      {
        id: "decision-standard",
        title: "A better decision standard",
        paragraphs: [
          "The right architecture decision is the one that creates the most future freedom at the least avoidable risk. Sometimes that means modernization with discipline. Sometimes it means targeted replacement. Sometimes it means a rebuild. What it should never mean is letting technical ideology masquerade as strategy.",
          "If the team cannot explain the path in terms leadership can weigh, the decision is not mature yet. Good technical strategy is legible, defensible, and connected to what the business is trying to make possible next.",
        ],
      },
    ],
  },
  {
    slug: "architecture-map-before-roadmap",
    category: "architecture",
    title: "You need an architecture map before a roadmap",
    description:
      "Why strategic roadmaps fail when nobody has a trustworthy picture of the current system, dependencies, and ownership boundaries.",
    takeaway:
      "Use this when roadmap planning keeps collapsing into debate because technical reality is still fuzzy.",
    readTime: "7 min read",
    published: "March 2026",
    featured: false,
    intro:
      "Many teams try to roadmap their way out of uncertainty. The result is a plan full of implied assumptions: which systems matter, which dependencies are real, where ownership starts and ends, and what can safely move in parallel. If those assumptions are wrong, the roadmap is just an attractive way of scheduling future confusion.",
    summary:
      "A usable roadmap depends on a usable map. Before sequencing work, teams need a clear picture of architecture boundaries, critical workflows, ownership lines, and the places where hidden coupling will distort timelines.",
    keyTakeaways: [
      "Roadmaps degrade when system boundaries are implicit rather than explicit.",
      "Current-state mapping is not documentation theater. It is the basis for sequencing work honestly.",
      "If nobody can explain the system end to end, leadership should distrust precise delivery promises.",
    ],
    sections: [
      {
        id: "why-roadmaps-fail",
        title: "Why roadmaps fail before execution even starts",
        paragraphs: [
          "Most failed roadmaps are not failures of ambition. They are failures of visibility. A team promises work based on an imagined system, then discovers the real system only after execution begins: a hidden dependency, a brittle integration, an unowned workflow, a compliance constraint nobody surfaced in planning.",
          "When that happens repeatedly, the organization starts blaming estimation. The deeper problem is that sequencing happened before the architecture and operating model were legible enough to sequence honestly.",
        ],
      },
      {
        id: "what-a-real-map-includes",
        title: "What a real architecture map includes",
        paragraphs: [
          "A useful map is not a giant system diagram built for posterity. It is a working view of what matters for decision-making now. That means core domains, external dependencies, systems of record, integration points, deployment boundaries, and ownership.",
          "It should also identify where business-critical workflows cross too many boundaries. Those are the places where a roadmap will look confident on paper but collapse under real coordination load.",
        ],
        bullets: [
          "Core business workflows and the systems they traverse.",
          "Known fragile interfaces and manual interventions.",
          "Ownership boundaries, including the parts nobody really owns.",
          "Constraints that shape sequencing: vendor, compliance, staffing, or platform limits.",
        ],
      },
      {
        id: "how-to-use-it",
        title: "How the map changes roadmap quality",
        paragraphs: [
          "Once the current state is legible, prioritization becomes more honest. Teams can distinguish foundational work from optional enhancement, separate visible roadmap progress from hidden risk reduction, and sequence around the real pressure points instead of the loudest opinions.",
          "This also improves leadership communication. Instead of vague language about technical debt, you can point to the specific architectural boundaries or workflow collisions that make certain promises unsafe today.",
        ],
      },
      {
        id: "practical-standard",
        title: "The practical standard",
        paragraphs: [
          "If your roadmap requires everyone to 'just understand the system,' it is underbuilt. Teams should be able to explain why an initiative is first, what it depends on, and what gets safer or easier once it lands.",
          "That is the point of the map: not exhaustive documentation, but better decisions with fewer unpleasant surprises.",
        ],
      },
    ],
  },
  {
    slug: "integration-tax",
    category: "operations",
    title: "The integration tax",
    description:
      "Why delivery slows when workflows span too many tools, owners, and hidden dependencies, and what to simplify first.",
    takeaway:
      "Use this when work looks simple on paper but repeatedly gets slower, noisier, and harder to coordinate in practice.",
    readTime: "7 min read",
    published: "March 2026",
    featured: true,
    intro:
      "The integration tax rarely appears as a single failure. It accumulates as small delays, duplicate entry, reconciliation work, edge-case breakage, and growing uncertainty about where responsibility actually sits. By the time leadership notices, teams feel slower without being able to explain exactly why.",
    summary:
      "Every cross-system workflow carries coordination cost. When too many tools share authority, teams pay the tax through manual work, unclear ownership, and collapsing delivery confidence. The fix is usually simpler boundaries, not more software.",
    keyTakeaways: [
      "Hidden integration work is often the real reason delivery feels slower after growth.",
      "Buying another orchestration layer rarely helps if system authority is still unclear.",
      "The fastest wins usually come from simplifying high-frequency operational paths, not every workflow in the company.",
    ],
    sections: [
      {
        id: "where-tax-shows-up",
        title: "Where the tax actually shows up",
        paragraphs: [
          "The tax is visible in operational behavior long before it is visible in architecture diagrams. Teams create shadow processes to compensate for tool disagreement. Support incidents bounce between teams because no single owner can see the full workflow. Reporting differs depending on who pulled the number and from where.",
          "At a certain point, the system is technically integrated but operationally incoherent. Data moves, yet decisions remain slow because the human coordination burden keeps rising.",
        ],
        bullets: [
          "Manual re-entry because systems disagree.",
          "Escalations caused by failures that span multiple tools.",
          "Planning overhead rising faster than product complexity.",
        ],
      },
      {
        id: "why-more-tools-fails",
        title: "Why adding more tooling often makes it worse",
        paragraphs: [
          "When friction becomes visible, the default response is often additive: another dashboard, another sync, another automation service, another layer to normalize the chaos. This can help temporarily, but if the underlying workflow is still unclear, the new tool becomes one more place where partial truth lives.",
          "The real issue is usually boundary clarity. Teams need to know which system is authoritative, which events matter, where state changes should happen, and who owns failures when those flows break.",
        ],
      },
      {
        id: "where-to-start",
        title: "Where to simplify first",
        paragraphs: [
          "Do not begin with a company-wide integration cleanup. Start with the workflows that matter most to revenue, onboarding, support burden, or reporting trust. These are the places where simplification buys back confidence fastest.",
          "The right first move is not always technical. Sometimes it is documenting the real workflow, eliminating duplicate ownership, or removing a low-value sync that only exists because nobody wanted to challenge it.",
        ],
        bullets: [
          "Reduce duplicate systems of record.",
          "Make hidden manual work visible before automating it.",
          "Name a single owner for each critical workflow, not just each tool.",
        ],
      },
      {
        id: "leadership-language",
        title: "A better way to explain the problem to leadership",
        paragraphs: [
          "Leaders rarely need another warning about complexity in the abstract. They need to understand where complexity is producing specific cost: slower launches, support load, reporting drift, implementation risk, or inability to delegate decisions confidently.",
          "Once the tax is framed in those terms, simplification becomes easier to prioritize because it is no longer presented as cleanup. It becomes capacity recovery.",
        ],
      },
    ],
  },
  {
    slug: "operating-rhythm-after-growth",
    category: "operations",
    title: "Rebuilding operating rhythm after growth",
    description:
      "How companies lose execution cadence after hiring, fundraising, or product expansion, and what restores it without adding bureaucracy.",
    takeaway:
      "Use this when the company has more people and more tooling but less shared momentum than it had a year ago.",
    readTime: "7 min read",
    published: "March 2026",
    featured: false,
    intro:
      "Growth is supposed to create leverage. Instead, many teams experience the opposite: more meetings, slower alignment, and increasing uncertainty about what is actually on track. The company is not lacking effort. It is lacking operating rhythm that still fits the size and complexity of the system.",
    summary:
      "Execution cadence degrades after growth when old coordination habits break but new ones are never designed. Restoring rhythm requires clearer decision points, fewer ambiguous handoffs, and a cadence that matches actual work, not management theater.",
    keyTakeaways: [
      "The pre-growth operating model rarely survives hiring and complexity intact.",
      "Rhythm is about decision clarity and sequencing, not just meeting frequency.",
      "You do not fix slow execution by layering more reporting on top of unclear ownership.",
    ],
    sections: [
      {
        id: "how-rhythm-breaks",
        title: "How rhythm breaks",
        paragraphs: [
          "Early-stage teams often rely on high-context coordination. A few people know enough to keep priorities aligned informally. Once the team grows, that model collapses. Work depends on more functions, more approvals, and more systems, but the company still behaves as if alignment will happen by osmosis.",
          "This is when execution starts to feel slippery. Commitments become soft, updates become less trustworthy, and planning conversations are crowded with uncertainty nobody has named directly.",
        ],
      },
      {
        id: "what-rhythm-requires",
        title: "What strong rhythm actually requires",
        paragraphs: [
          "A strong operating rhythm creates predictable decision points, clear escalation paths, and a shared understanding of what constitutes progress. It reduces ambiguity without drowning people in process.",
          "The best rhythms are not heavy. They are specific. Teams know what needs to be decided weekly, what should only be reviewed monthly, what metrics are trustworthy, and who resolves cross-functional conflict when work stalls.",
        ],
        bullets: [
          "A small set of decisions that happen on a reliable cadence.",
          "Clear definition of who owns each cross-functional issue.",
          "A progress model tied to shipped outcomes, not performative updates.",
        ],
      },
      {
        id: "what-to-change-first",
        title: "What to change first",
        paragraphs: [
          "Start by reducing ambiguity, not by adding ceremony. Clarify the handful of operating meetings that actually need to exist. Remove duplicate reporting. Tighten ownership for cross-functional work. Ensure the same metrics appear in the same way across the same conversations.",
          "Then look at the system beneath the rhythm. If teams are using cadence to compensate for poor system boundaries, process alone will not fix the problem. The operating model and architecture have to reinforce each other.",
        ],
      },
      {
        id: "what-good-feels-like",
        title: "What good feels like",
        paragraphs: [
          "When rhythm is working, the company feels calmer without slowing down. Fewer issues require executive intervention. Teams are clearer about what matters now. Escalations are faster because people know where they belong. Delivery becomes more predictable because coordination no longer depends on heroics.",
        ],
      },
    ],
  },
  {
    slug: "post-series-a-data-foundations",
    category: "data",
    title: "Post-Series A data foundations",
    description:
      "What needs to be true in your data layer before reporting, forecasting, and automation become trustworthy at scale.",
    takeaway:
      "Use this when metrics trust is falling apart and leadership is asking for more automation anyway.",
    readTime: "8 min read",
    published: "March 2026",
    featured: true,
    intro:
      "After a raise, expectations accelerate faster than the data foundation. Leaders want tighter forecasting, clearer unit economics, and more automated workflows. The problem is that many post-Series A companies are still running on a loose collection of source systems, spreadsheets, and partially trusted dashboards. The company is scaling decisions faster than it is scaling truth.",
    summary:
      "Before a business needs sophisticated analytics, it needs trusted definitions, legible source systems, and reviewable transformation logic. Without that substrate, automation and forecasting only make ambiguity faster.",
    keyTakeaways: [
      "Metrics trust is the real milestone, not dashboard count.",
      "A post-Series A data system should optimize for consistency and clarity before advanced complexity.",
      "Automation becomes a force multiplier only after the operating data model is stable enough to trust.",
    ],
    sections: [
      {
        id: "trust-before-tools",
        title: "Trust is the first milestone",
        paragraphs: [
          "If sales, product, operations, and finance produce different answers to the same question, the company does not have a tooling problem first. It has a trust problem. Leaders start compensating with side conversations and manual reconciliation, which means important decisions drift away from the supposedly official system.",
          "A sound data foundation makes core operating metrics boring. The number is easy to find, the definition is explicit, and the path back to source systems is understandable enough that teams can challenge it constructively.",
        ],
      },
      {
        id: "good-enough-standard",
        title: "What good enough actually looks like",
        paragraphs: [
          "A post-Series A company usually does not need a giant centralized data platform immediately. It needs coherence around the handful of entities and metrics leadership uses every week: customers, deals, revenue, delivery, retention, onboarding, support load, or whatever truly drives the business.",
          "That means documenting critical sources, normalizing definitions, and ensuring transformation logic is visible and reviewable. The system should help the company make better operating decisions, not merely generate prettier reporting.",
        ],
        bullets: [
          "Critical sources are known and treated as intentional systems of record.",
          "Core business entities have stable definitions across teams.",
          "Transformations are explicit enough to review when numbers drift.",
          "Dashboards correspond to decisions, not vanity visibility.",
        ],
      },
      {
        id: "automation-sequence",
        title: "Why automation has to come in the right sequence",
        paragraphs: [
          "Teams often reach for automation as soon as manual work becomes painful. That instinct makes sense. But automating on top of unclear definitions only accelerates inconsistency. You end up with faster confusion, not better leverage.",
          "The better sequence is clarity, then reliability, then automation. Once definitions and ownership are solid, automation becomes a way to remove toil. Before that, it tends to hide broken assumptions.",
        ],
      },
      {
        id: "leadership-standard",
        title: "The leadership standard to aim for",
        paragraphs: [
          "A good data foundation allows leadership to ask harder questions without restarting the argument over whose number is right. That does not require perfection. It requires a system where disagreements become tractable and where the path to resolution is visible.",
          "That is what makes forecasting, planning, and automation possible at a higher level of confidence. The business moves faster because truth is easier to access, not because there are more dashboards floating around.",
        ],
      },
    ],
  },
  {
    slug: "metrics-you-can-run-the-company-on",
    category: "data",
    title: "Metrics you can actually run the company on",
    description:
      "How to choose a small set of operating metrics that help leadership make decisions instead of creating reporting theater.",
    takeaway:
      "Use this when the company has dozens of dashboards but very little confidence in what should drive action.",
    readTime: "6 min read",
    published: "March 2026",
    featured: false,
    intro:
      "Many teams mistake visibility for clarity. They accumulate dashboards, scorecards, and alerts, then discover that the business is still arguing about what matters. A company rarely suffers from too few numbers. It suffers from too many numbers with too little decision weight attached to them.",
    summary:
      "A strong operating metric earns its place by shaping action. The best metrics are few, stable enough to trust, and directly connected to the decisions leadership and teams have to make repeatedly.",
    keyTakeaways: [
      "Metrics should exist to improve decisions, not to decorate updates.",
      "A smaller metric set with strong definitions beats a broad reporting surface nobody really trusts.",
      "Every metric should answer a practical question about movement, risk, or capacity.",
    ],
    sections: [
      {
        id: "why-dashboard-sprawl-happens",
        title: "Why dashboard sprawl happens",
        paragraphs: [
          "As companies grow, every function starts building visibility for its own needs. That is normal. The problem begins when none of those views are reconciled into a common operating picture, so leadership sees many snapshots but no durable signal.",
          "This creates a familiar pattern: status meetings turn into interpretation exercises. People present numbers, but the organization still cannot agree what those numbers mean for priorities, risk, or execution.",
        ],
      },
      {
        id: "what-good-metrics-do",
        title: "What good operating metrics actually do",
        paragraphs: [
          "A good metric reduces ambiguity around a recurring decision. It helps leadership recognize whether the business is healthier, riskier, or less capable than it appears. It should also be stable enough to compare over time without constant redefinition.",
          "The best metrics often sit closer to the system than teams expect: lead time, onboarding completion, support burden, conversion by stage, rework rate, delivery predictability, or churn pattern by segment. These are metrics with operational consequences.",
        ],
      },
      {
        id: "selection-standard",
        title: "A better selection standard",
        paragraphs: [
          "Before adding a metric, ask three questions: what decision will this improve, who will act on it, and what would we do differently if it changed materially? If those answers are weak, the metric is probably informational but not operational.",
        ],
        bullets: [
          "Keep the top layer small enough to review consistently.",
          "Define each metric in business language, not only warehouse language.",
          "Pair each metric with an owner and an expected response when it drifts.",
        ],
      },
      {
        id: "where-this-lands",
        title: "Where this lands in practice",
        paragraphs: [
          "A useful metric system gives leaders a cleaner view of reality and gives teams a fairer basis for action. It does not remove judgment, but it keeps the organization from repeatedly burning time on arguments that should already be settled.",
        ],
      },
    ],
  },
  {
    slug: "delivery-velocity-is-a-systems-problem",
    category: "execution",
    title: "Delivery velocity is a systems problem",
    description:
      "Why shipping slows for structural reasons, not just team performance, and how to diagnose the real drag.",
    takeaway:
      "Use this when leadership is asking teams to move faster without understanding the system that is making work slow.",
    readTime: "7 min read",
    published: "March 2026",
    featured: true,
    intro:
      "When delivery slows, organizations often search for a people explanation first: weak execution, poor planning, unclear accountability, or low urgency. Those can be real. But in many teams, shipping is slow because the system is slow. Work crosses too many boundaries, approvals arrive too late, dependencies are hidden, and the architecture makes every change more expensive than it looks at kickoff.",
    summary:
      "Velocity is not just a measure of effort. It is an outcome produced by system design, architecture boundaries, ownership clarity, and decision cadence. Teams move faster when the system makes progress easier, not when leadership simply asks harder.",
    keyTakeaways: [
      "Slow delivery is often the result of structural friction, not lack of urgency.",
      "A team can look underperforming when the surrounding system makes every change expensive.",
      "Improving velocity usually means removing friction from the operating system, not pressuring individuals harder.",
    ],
    sections: [
      {
        id: "why-speed-framing-fails",
        title: "Why the usual framing fails",
        paragraphs: [
          "The standard response to slow shipping is to tighten management: more check-ins, more escalation, more status detail, more pressure. This can temporarily increase visible motion, but it rarely changes the structural reasons work was slow in the first place.",
          "If a change requires five approvals, crosses three systems, and depends on an undocumented interface, no amount of urgency language will make it truly fast. It may only make the organization noisier.",
        ],
      },
      {
        id: "where-friction-lives",
        title: "Where friction actually lives",
        paragraphs: [
          "Friction tends to cluster in a few places: handoffs between teams, high-risk architectural boundaries, unclear product or data ownership, and work that enters execution before requirements or constraints are legible enough.",
          "You are not trying to remove all complexity. You are trying to stop treating this as a performance problem when the system is still set up to manufacture delay.",
        ],
        bullets: [
          "Too many cross-functional approvals.",
          "Unowned dependencies and hidden technical risk.",
          "Roadmaps that commit before sequencing is real.",
          "Metrics that reward activity but obscure rework.",
        ],
      },
      {
        id: "what-to-measure",
        title: "What to measure instead",
        paragraphs: [
          "If leadership wants a more honest view of velocity, it should measure what shapes flow: lead time, blocked work, rework rate, cross-team dependency load, release confidence, and time lost to manual coordination. These signals reveal where the system is making work expensive.",
          "This does not replace judgment. It gives judgment better material to work with. The goal is not a more complicated dashboard. It is a clearer picture of why delivery feels slow.",
        ],
      },
      {
        id: "what-improves-speed",
        title: "What actually improves speed",
        paragraphs: [
          "Teams move faster when architecture boundaries are clearer, decision rights are tighter, work enters planning with fewer hidden assumptions, and integrations are simpler to reason about. In other words: when the operating system of delivery becomes less fragile.",
          "That is why meaningful velocity work often looks indirect. You simplify workflows, reduce ambiguity, sequence foundational work properly, and remove sources of predictable delay. The result is not just faster shipping. It is shipping that feels less chaotic.",
        ],
      },
    ],
  },
  {
    slug: "sequencing-roadmaps-under-uncertainty",
    category: "execution",
    title: "Sequencing roadmaps under uncertainty",
    description:
      "How to prioritize when the current state is only partially visible and leadership still needs a plan it can trust.",
    takeaway:
      "Use this when the roadmap needs to move forward but the organization does not yet have perfect certainty.",
    readTime: "7 min read",
    published: "March 2026",
    featured: false,
    intro:
      "Real roadmaps are built under uncertainty. Waiting for complete clarity is unrealistic. Pretending clarity exists when it does not is worse. Strong sequencing is the discipline of making the next decisions obvious enough, while keeping later commitments flexible enough to survive what the team will still learn on the way.",
    summary:
      "Good sequencing does not eliminate uncertainty. It contains it. Teams should front-load the work that removes risk, clarifies architecture, and makes later commitments easier to trust.",
    keyTakeaways: [
      "The earliest roadmap items should often be the ones that create better information, not just visible feature output.",
      "A roadmap can be decisive without pretending the future is fully knowable.",
      "If later phases depend on assumptions not yet tested, the roadmap should say so explicitly.",
    ],
    sections: [
      {
        id: "certainty-trap",
        title: "Avoid the certainty trap",
        paragraphs: [
          "Teams under pressure often over-specify later work because leadership wants confidence now. That usually creates fragile commitments. The organization acts as if sequence is settled, then gets destabilized when the first foundational work exposes new constraints.",
          "A better pattern is to be explicit about what is known, what is assumed, and which early initiatives exist to reduce uncertainty itself.",
        ],
      },
      {
        id: "what-goes-first",
        title: "What should go first",
        paragraphs: [
          "Early roadmap work should buy leverage. That means reducing architectural risk, clarifying system ownership, cleaning up core workflow bottlenecks, or producing enough operating visibility that later decisions become meaningfully better.",
          "Visible customer outcomes matter, but if the foundation underneath them is still unstable, those wins can create a misleading sense of progress.",
        ],
        bullets: [
          "Prioritize work that reduces future rework.",
          "Sequence around dependencies that threaten multiple later initiatives.",
          "Treat clarity-producing work as strategic, not administrative.",
        ],
      },
      {
        id: "communicating-sequence",
        title: "How to communicate the plan",
        paragraphs: [
          "Leadership generally accepts uncertainty when it is named clearly and handled responsibly. The problem is not saying 'we do not know everything yet.' The problem is hiding uncertainty inside confident-looking plans.",
          "A good roadmap tells leadership what is fixed, what is conditional, and what new information the next phase is intended to produce.",
        ],
      },
      {
        id: "why-this-builds-trust",
        title: "Why this builds more trust, not less",
        paragraphs: [
          "Roadmap trust comes from honest sequence, not polished certainty. Teams that acknowledge where they are still learning tend to make fewer avoidable promises and earn more credibility when later commitments become firmer.",
        ],
      },
    ],
  },
  {
    slug: "structure-follows-architecture",
    category: "org-design",
    title: "Structure follows architecture",
    description:
      "How system boundaries, decision ownership, and team design reinforce each other for better or worse.",
    takeaway:
      "Use this when reorg conversations are happening without a clear view of how the system itself is shaped.",
    readTime: "7 min read",
    published: "March 2026",
    featured: true,
    intro:
      "When teams feel misaligned, the problem is not always cultural first. Often the organization is mirroring the structure of the system underneath it: fuzzy ownership, overlapping boundaries, too many shared dependencies, and work that crosses domains without clean interfaces. Changing the org chart without changing that reality usually just renames the confusion.",
    summary:
      "Team design and system design are tightly linked. If the architecture encourages constant cross-boundary negotiation, the organization will feel slow and misaligned no matter how many reporting lines get redrawn.",
    keyTakeaways: [
      "Reorgs fail when they ignore the system boundaries generating the friction.",
      "Healthy boundaries make collaboration clearer, not more siloed.",
      "Ownership becomes easier when teams and architecture are designed together rather than independently.",
    ],
    sections: [
      {
        id: "mirror-effect",
        title: "The org chart mirrors the system",
        paragraphs: [
          "If a routine product change needs engineering, operations, data, and support to renegotiate ownership every time, the architecture likely has the same boundary problem the teams do. Work is not slow because people are uncooperative. It is slow because the system does not make responsibility legible.",
          "This is why many reorgs disappoint. They change reporting relationships but leave dependencies, domain overlap, and escalation ambiguity intact.",
        ],
      },
      {
        id: "what-good-boundaries-do",
        title: "What good boundaries actually enable",
        paragraphs: [
          "Good boundaries do not isolate teams from one another. They make collaboration cleaner. Teams know what they own, where their interfaces begin and end, and which decisions they can make without performing cross-functional diplomacy every day.",
          "That clarity improves both execution and morale because fewer issues require negotiation simply to get work moving.",
        ],
        bullets: [
          "Fewer meetings to resolve basic ownership questions.",
          "Cleaner handoffs between product, platform, and operations work.",
          "Roadmaps that reflect actual system dependencies instead of optimistic guesses.",
        ],
      },
      {
        id: "design-together",
        title: "Design team shape and system shape together",
        paragraphs: [
          "If responsibilities are being redrawn, redraw the system map at the same time. Decide which domains deserve dedicated ownership, which shared services need clearer contracts, and which decisions leadership should stop having to referee.",
          "The objective is not maximum decentralization. It is fewer avoidable collisions and more confident autonomous execution.",
        ],
      },
      {
        id: "standard",
        title: "The standard to hold",
        paragraphs: [
          "A healthy organization makes it easier to predict where a decision belongs. A healthy architecture makes it easier to implement that decision without touching five unrelated systems. When those two conditions reinforce each other, the company feels meaningfully more coherent.",
        ],
      },
    ],
  },
  {
    slug: "decision-rights-under-complexity",
    category: "org-design",
    title: "Decision rights under complexity",
    description:
      "How to reduce escalation load by clarifying which decisions belong to teams, leaders, and cross-functional forums.",
    takeaway:
      "Use this when too many issues are floating upward because nobody is confident about where authority actually sits.",
    readTime: "6 min read",
    published: "March 2026",
    featured: false,
    intro:
      "In complex organizations, execution often slows not because decisions are impossible, but because decision rights are blurred. Teams hesitate, leaders intervene too late or too often, and recurring issues keep reappearing in forums that should not need to own them.",
    summary:
      "Clear decision rights reduce escalation noise and speed up execution. The goal is not to centralize everything. It is to make authority legible enough that teams can act with confidence and leadership can intervene deliberately instead of constantly.",
    keyTakeaways: [
      "Escalation load is often a symptom of unclear authority, not weak individual judgment.",
      "Teams need explicit space to decide within boundaries, not vague permission to be empowered.",
      "Cross-functional forums should exist for genuine coordination, not routine ownership confusion.",
    ],
    sections: [
      {
        id: "how-blur-happens",
        title: "How decision blur happens",
        paragraphs: [
          "As systems and teams expand, authority becomes easier to imply than define. Product thinks engineering owns the decision. Engineering thinks it needs leadership alignment. Operations assumes the answer depends on downstream constraints. Everyone is being reasonable, but the system has stopped making authority obvious.",
          "The result is predictable: issues float upward, decisions are delayed, and recurring work keeps returning to senior forums because nobody trusts the boundary.",
        ],
      },
      {
        id: "what-good-looks-like",
        title: "What good decision rights look like",
        paragraphs: [
          "Good decision rights are specific enough that people know when they can act and when they must escalate. They define scope, not just titles. You do not need to document every edge case. You need to remove the recurring ambiguity that keeps slowing work.",
          "This is particularly important in cross-functional areas like platform investment, data quality, workflow changes, and delivery sequencing, where technical and operational decisions overlap.",
        ],
        bullets: [
          "Clarify the boundary of team-owned decisions.",
          "Name the triggers that require escalation.",
          "Use leadership forums for trade-offs, not routine execution questions.",
        ],
      },
      {
        id: "how-to-tighten",
        title: "How to tighten the system",
        paragraphs: [
          "Start with the decisions that recur most often and create the most delay. Document who decides, who is consulted, what inputs are required, and what constitutes enough information to move forward. Then test those boundaries in live work rather than treating them as static policy.",
          "The real proof is behavioral. If the same question still returns to the same senior meeting every two weeks, the decision right is not actually clear yet.",
        ],
      },
      {
        id: "outcome",
        title: "What changes when this is working",
        paragraphs: [
          "Teams move faster, leaders spend less time arbitrating routine issues, and cross-functional forums focus on the trade-offs that actually deserve senior attention. That is what clearer authority buys: less friction, not more hierarchy.",
        ],
      },
    ],
  },
]

export function getKnowledgeBriefBySlug(slug: string) {
  return knowledgeBriefs.find((brief) => brief.slug === slug)
}

export function getKnowledgeCategory(categoryId: KnowledgeCategoryId) {
  return knowledgeCategories.find((category) => category.id === categoryId)
}

export function getKnowledgeBriefsByCategory(categoryId: KnowledgeCategoryId) {
  return knowledgeBriefs.filter((brief) => brief.category === categoryId)
}
