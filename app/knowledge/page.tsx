import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  BookOpen,
  Compass,
  Filter,
  Layers3,
  Sparkles,
} from "lucide-react"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { knowledgeBriefs, knowledgeCategories } from "@/lib/knowledge-briefs"

export const metadata: Metadata = {
  title: "Knowledge Base",
  description:
    "A practical knowledge base for founders and operators navigating architecture, delivery, data, and organizational complexity.",
  alternates: {
    canonical: "/knowledge",
  },
}

type PageProps = {
  searchParams?: Promise<{
    category?: string
  }>
}

const readingPaths = [
  {
    title: "Shipping slowed after growth",
    description:
      "Start with the operating drag, then move into the execution mechanics underneath it.",
    articleSlugs: [
      "operating-rhythm-after-growth",
      "delivery-velocity-is-a-systems-problem",
      "sequencing-roadmaps-under-uncertainty",
    ],
  },
  {
    title: "Roadmap decisions feel blocked by technical ambiguity",
    description:
      "Use this path when planning keeps collapsing into debate because the system is still under-mapped.",
    articleSlugs: [
      "architecture-map-before-roadmap",
      "modernize-vs-rebuild",
      "sequencing-roadmaps-under-uncertainty",
    ],
  },
  {
    title: "The business no longer trusts its own numbers",
    description:
      "Start with the data foundation, then move toward the metrics and decision model built on top of it.",
    articleSlugs: [
      "post-series-a-data-foundations",
      "metrics-you-can-run-the-company-on",
      "decision-rights-under-complexity",
    ],
  },
]

function getCategoryHref(categoryId?: string) {
  return categoryId ? `/knowledge?category=${categoryId}` : "/knowledge"
}

export default async function KnowledgePage({ searchParams }: PageProps) {
  const resolvedParams = (await searchParams) ?? {}
  const selectedCategory = knowledgeCategories.find(
    (category) => category.id === resolvedParams.category
  )

  const filteredBriefs = selectedCategory
    ? knowledgeBriefs.filter((brief) => brief.category === selectedCategory.id)
    : knowledgeBriefs

  const heroBrief =
    filteredBriefs.find((brief) => brief.featured) ?? filteredBriefs[0] ?? knowledgeBriefs[0]

  const articleCollections = knowledgeCategories.map((category) => ({
    category,
    briefs: knowledgeBriefs.filter((brief) => brief.category === category.id),
    lead:
      knowledgeBriefs.find(
        (brief) => brief.category === category.id && brief.featured
      ) ?? knowledgeBriefs.find((brief) => brief.category === category.id),
  }))

  const curatedPaths = readingPaths.map((path) => ({
    ...path,
    articles: path.articleSlugs
      .map((slug) => knowledgeBriefs.find((brief) => brief.slug === slug))
      .filter((brief) => brief !== undefined),
  }))

  return (
    <>
      <Navigation />
      <main id="main-content" className="min-h-screen bg-background">
        <section className="relative overflow-hidden border-b border-border px-6 pb-18 pt-28 md:px-8 md:pb-24 md:pt-34">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-teal/6 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-teal/10 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-10 h-72 w-72 rounded-full bg-purple/10 blur-3xl" />
          <div className="pointer-events-none absolute left-1/2 top-18 h-px w-[min(1120px,calc(100%-3rem))] -translate-x-1/2 bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="relative mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-end">
            <div className="max-w-3xl">
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-teal">
                  <Sparkles className="h-3.5 w-3.5" />
                  Knowledge Base
                </span>
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  Field notes for founders and senior operators
                </span>
              </div>
              <h1 className="text-4xl font-semibold tracking-tight text-foreground text-balance md:text-5xl lg:text-6xl">
                Clear thinking for leaders{" "}
                <span className="bg-gradient-to-r from-teal via-teal to-purple bg-clip-text text-transparent">
                  operating inside complex systems
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Long-form articles on architecture, data, execution, operating design,
                and the decisions that determine whether a business regains momentum or
                stays trapped in coordination drag.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={heroBrief ? `/knowledge/${heroBrief.slug}` : "/knowledge"}
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-foreground px-6 py-3 font-medium text-background transition-opacity hover:opacity-90"
                >
                  Start with the featured article
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/founder-review"
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border px-6 py-3 font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  Start the Founder Review
                </Link>
              </div>
              <Link
                href="/launchpad"
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-teal transition-colors hover:text-foreground"
              >
                Prefer structured diagnostics and tools? Explore Launchpad
                <ArrowRight className="h-4 w-4" />
              </Link>
              <div className="mt-10 flex flex-wrap gap-3">
                <div className="rounded-full border border-border bg-background/90 px-4 py-2 text-sm text-muted-foreground shadow-sm">
                  <span className="font-semibold text-foreground">{knowledgeBriefs.length}</span>{" "}
                  long-form articles
                </div>
                <div className="rounded-full border border-border bg-background/90 px-4 py-2 text-sm text-muted-foreground shadow-sm">
                  <span className="font-semibold text-foreground">{knowledgeCategories.length}</span>{" "}
                  focus areas
                </div>
                <div className="rounded-full border border-border bg-background/90 px-4 py-2 text-sm text-muted-foreground shadow-sm">
                  Written for founders and senior operators
                </div>
              </div>
            </div>

            {heroBrief ? (
              <div className="relative overflow-hidden rounded-[32px] border border-border bg-background/95 p-7 shadow-sm">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-teal/10 via-transparent to-purple/10" />
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-teal">
                    <Sparkles className="h-3.5 w-3.5" />
                    Featured perspective
                  </span>
                  <span className="text-sm text-muted-foreground">{heroBrief.readTime}</span>
                </div>
                <p className="mt-6 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                  {knowledgeCategories.find((category) => category.id === heroBrief.category)?.label}
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-foreground text-balance">
                  {heroBrief.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {heroBrief.summary}
                </p>
                <div className="mt-6 rounded-[24px] border border-border bg-secondary/35 p-4">
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                    Why this matters
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground">
                    {heroBrief.takeaway}
                  </p>
                </div>
                <div className="mt-6 grid gap-3 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  {heroBrief.keyTakeaways.slice(0, 3).map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-border bg-background px-4 py-4 text-sm leading-relaxed text-foreground"
                    >
                      {item}
                    </div>
                  ))}
                </div>
                <Link
                  href={`/knowledge/${heroBrief.slug}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-teal transition-colors hover:text-foreground"
                >
                  Open article
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : null}
          </div>
        </section>

        <section className="border-b border-border bg-secondary/30 px-6 py-8 md:px-8">
          <div className="mx-auto max-w-[1200px]">
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <Filter className="h-4 w-4" />
                <span>Browse the library by area</span>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/knowledge"
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    selectedCategory
                      ? "border border-border bg-background text-muted-foreground hover:text-foreground"
                      : "bg-foreground text-background"
                  }`}
                >
                  All articles
                </Link>
                {knowledgeCategories.map((category) => {
                  const count = knowledgeBriefs.filter(
                    (brief) => brief.category === category.id
                  ).length

                  return (
                    <Link
                      key={category.id}
                      href={getCategoryHref(category.id)}
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                        selectedCategory?.id === category.id
                          ? "bg-foreground text-background"
                          : "border border-border bg-background text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {category.shortLabel}
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs ${
                          selectedCategory?.id === category.id
                            ? "bg-background/15 text-background"
                            : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        {count}
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="deferred-section px-6 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-[1200px]">
            {!selectedCategory ? (
              <div className="mb-10 grid gap-6 lg:grid-cols-3">
                {curatedPaths.map((path) => (
                  <div
                    key={path.title}
                    className="flex h-full flex-col rounded-[30px] border border-border bg-background p-7"
                  >
                    <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                      Start here if...
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold text-foreground text-balance">
                      {path.title}
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {path.description}
                    </p>
                    <div className="mt-6 space-y-3">
                      {path.articles.map((article, index) => (
                        <Link
                          key={article.slug}
                          href={`/knowledge/${article.slug}`}
                          className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-secondary/25 px-4 py-4 text-sm transition-colors hover:border-teal/40"
                        >
                          <div>
                            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                              Step {index + 1}
                            </p>
                            <p className="mt-1 font-medium text-foreground">{article.title}</p>
                          </div>
                          <ArrowRight className="h-4 w-4 shrink-0 text-teal" />
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            <div className="mb-10 grid gap-6 rounded-[32px] border border-border bg-background p-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                  {selectedCategory ? selectedCategory.label : "Library overview"}
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-foreground text-balance">
                  {selectedCategory
                    ? `Articles in ${selectedCategory.label}`
                    : "A library organized around the real pressure points"}
                </h2>
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
                  {selectedCategory
                    ? selectedCategory.description
                    : "Use the knowledge base the same way leaders use us in practice: start with the area that feels most constrained, then follow the connected articles to build a clearer picture of the system."}
                </p>
              </div>
              <div className="grid gap-3 rounded-[24px] border border-border bg-secondary/40 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-background text-teal">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Knowledge library</p>
                    <p className="text-sm text-muted-foreground">
                      {filteredBriefs.length}{" "}
                      {filteredBriefs.length === 1 ? "article" : "articles"} in view
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-background text-purple">
                    <Layers3 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Built by area</p>
                    <p className="text-sm text-muted-foreground">
                      Architecture, operations, data, execution, and org design
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-background text-teal">
                    <Compass className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Best read in sequence</p>
                    <p className="text-sm text-muted-foreground">
                      Start with one article, then follow the related paths on each page
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredBriefs.map((brief) => {
                const category = knowledgeCategories.find(
                  (item) => item.id === brief.category
                )

                return (
                  <Link
                    key={brief.slug}
                    href={`/knowledge/${brief.slug}`}
                    className="group flex h-full flex-col rounded-[28px] border border-border bg-background p-7 transition-all hover:-translate-y-1 hover:border-teal/40 hover:shadow-xl hover:shadow-teal/5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                        {category?.label}
                      </span>
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {brief.readTime}
                      </span>
                    </div>
                    <h3 className="mt-4 text-2xl font-semibold text-foreground text-balance transition-colors group-hover:text-teal">
                      {brief.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {brief.description}
                    </p>
                    <div className="mt-6 rounded-2xl border border-border bg-secondary/40 p-4">
                      <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                        Best for
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-foreground">
                        {brief.takeaway}
                      </p>
                    </div>
                    <div className="mt-6 grid gap-2">
                      {brief.keyTakeaways.slice(0, 2).map((point) => (
                        <div
                          key={point}
                          className="rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm text-muted-foreground"
                        >
                          {point}
                        </div>
                      ))}
                    </div>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-teal transition-colors group-hover:text-foreground">
                      Read article
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        <section className="deferred-section-tall border-y border-border bg-secondary/25 px-6 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-10 max-w-3xl">
              <h2 className="text-2xl font-semibold text-foreground">Explore by area</h2>
              <p className="mt-3 text-muted-foreground">
                Each collection is built around one kind of problem pressure. Use this
                view if you want to stay inside a single topic instead of browsing the
                full library.
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {articleCollections.map(({ category, briefs, lead }) => (
                <div
                  key={category.id}
                  className="flex h-full flex-col rounded-[28px] border border-border bg-background p-7"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-xl font-semibold text-foreground">{category.label}</h3>
                    <span className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">
                      {briefs.length} {briefs.length === 1 ? "article" : "articles"}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {category.description}
                  </p>
                  {lead ? (
                    <div className="mt-5 rounded-2xl border border-border bg-secondary/35 p-4">
                      <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                        Start here
                      </p>
                      <Link
                        href={`/knowledge/${lead.slug}`}
                        className="mt-2 block text-base font-semibold text-foreground transition-colors hover:text-teal"
                      >
                        {lead.title}
                      </Link>
                    </div>
                  ) : null}
                  <div className="mt-5 space-y-3">
                    {briefs.slice(0, 3).map((brief) => (
                      <Link
                        key={brief.slug}
                        href={`/knowledge/${brief.slug}`}
                        className="flex items-center justify-between gap-4 rounded-2xl border border-border px-4 py-3 text-sm text-foreground transition-colors hover:border-teal/40 hover:text-teal"
                      >
                        <span>{brief.title}</span>
                        <ArrowRight className="h-4 w-4 shrink-0" />
                      </Link>
                    ))}
                  </div>
                  <Link
                    href={getCategoryHref(category.id)}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-teal transition-colors hover:text-foreground"
                  >
                    See all in {category.shortLabel}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="deferred-section px-6 py-20 md:px-8">
          <div className="mx-auto grid max-w-[1200px] gap-8 rounded-[32px] border border-border bg-foreground px-8 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-semibold text-background text-balance">
                Need these ideas applied to your actual system?
              </h2>
              <p className="mt-4 max-w-2xl text-background/70">
                The library is here to sharpen judgment. If you need a direct
                diagnosis, the fastest next step is still a focused conversation about
                where the business is stuck and what should move first.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
              <Link
                href="/founder-review"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-background px-6 py-3 font-medium text-foreground transition-opacity hover:opacity-90"
              >
                Start the Founder Review
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-background/20 px-6 py-3 font-medium text-background transition-colors hover:bg-background/10"
              >
                Start a conversation
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
