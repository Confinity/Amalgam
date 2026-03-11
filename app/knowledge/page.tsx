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
import { KnowledgeFeaturedHero } from "@/components/knowledge-featured-hero"
import { knowledgeBriefs, knowledgeCategories } from "@/lib/knowledge-briefs"

export const metadata: Metadata = {
  title: "Read this when product delivery feels stuck",
  description:
    "Short practical reads on architecture, delivery systems, data foundations, and leadership decisions.",
  alternates: {
    canonical: "/knowledge",
  },
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
    title: "Roadmap decisions keep stalling in technical ambiguity",
    description:
      "Use this path when planning keeps collapsing into debate because the system is still under-mapped.",
    articleSlugs: [
      "architecture-map-before-roadmap",
      "modernize-vs-rebuild",
      "sequencing-roadmaps-under-uncertainty",
    ],
  },
  {
    title: "Your team no longer trusts the numbers",
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

type KnowledgePageProps = {
  searchParams?: {
    category?: string | string[]
  }
}

export default function KnowledgePage({ searchParams }: KnowledgePageProps) {
  const featuredCandidates = knowledgeBriefs.filter((brief) => brief.featured)
  const requestedCategory = Array.isArray(searchParams?.category)
    ? searchParams?.category[0]
    : searchParams?.category
  const selectedCategoryId = knowledgeCategories.some(
    (category) => category.id === requestedCategory,
  )
    ? requestedCategory
    : undefined
  const filteredBriefs = selectedCategoryId
    ? knowledgeBriefs.filter((brief) => brief.category === selectedCategoryId)
    : knowledgeBriefs

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
                  Practical notes on architecture, systems, execution, and leadership
                </span>
              </div>
              <h1 className="text-4xl font-semibold tracking-tight text-foreground text-balance md:text-5xl lg:text-6xl">
                Start with the pressure you feel right now
                {" "}
                <span className="bg-gradient-to-r from-teal via-teal to-purple bg-clip-text text-transparent">
                  and move one step at a time.
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Short practical reads on architecture, delivery systems, data foundations, and leadership decisions.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={featuredCandidates[0] ? `/knowledge/${featuredCandidates[0].slug}` : "/knowledge"}
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-foreground px-6 py-3 font-medium text-background transition-opacity hover:opacity-90"
                >
                  Start with a featured article
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact?interest=strategy-session"
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border px-6 py-3 font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  Book a strategy call
                </Link>
              </div>
              <Link
                href="/launchpad"
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-teal transition-colors hover:text-foreground"
              >
                Prefer tools first? Explore Launchpad
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
                  Written for business and technical leaders
                </div>
              </div>
            </div>

            <KnowledgeFeaturedHero candidates={featuredCandidates} categories={knowledgeCategories} />
          </div>
        </section>

        <section className="border-b border-border bg-secondary/30 px-6 py-8 md:px-8">
          <div className="mx-auto max-w-[1200px]">
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <Filter className="h-4 w-4" />
                <span>Browse by area</span>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/knowledge"
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    !selectedCategoryId
                      ? "bg-foreground text-background"
                      : "border border-border bg-background text-muted-foreground hover:text-foreground"
                  }`}
                >
                  All articles
                </Link>
                {knowledgeCategories.map((category) => {
                  const count = knowledgeBriefs.filter(
                    (brief) => brief.category === category.id
                  ).length
                  const selected = selectedCategoryId === category.id

                  return (
                    <Link
                      key={category.id}
                      href={getCategoryHref(category.id)}
                      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                        selected
                          ? "border-teal/45 bg-teal/10 text-foreground"
                          : "border-border bg-background text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {category.shortLabel}
                      <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
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
                    Guided reading paths based on what is happening inside your team right now.
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

            <div className="mb-10 grid gap-6 rounded-[32px] border border-border bg-background p-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                  Library overview
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-foreground text-balance">
                  This library is organized around real pressure points
                </h2>
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
                  Start with the area that feels most constrained, then follow connected reads to build a clearer view of your system.
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
                      Architecture, systems strategy, data, execution, and leadership
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
                      Start with one article, then follow related paths on each page
                  </p>
                </div>
              </div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredBriefs.length > 0 ? (
                filteredBriefs.map((brief) => {
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
                })
              ) : (
                <div className="md:col-span-2 xl:col-span-3 rounded-[28px] border border-dashed border-border bg-background p-7">
                  <h3 className="text-xl font-semibold text-foreground">
                    No articles in this category yet
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Switch to another area or view all articles.
                  </p>
                  <Link
                    href="/knowledge"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-teal transition-colors hover:text-foreground"
                  >
                    View all articles
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="deferred-section-tall border-y border-border bg-secondary/25 px-6 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-10 max-w-3xl">
                <h2 className="text-2xl font-semibold text-foreground">Choose the area that feels most stuck</h2>
                <p className="mt-3 text-muted-foreground">
                  Each collection is built around one situation we see repeatedly.
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
                Want help applying this to your exact situation?
              </h2>
              <p className="mt-4 max-w-2xl text-background/70">
                If you want a direct read on your own situation, start with a strategy call.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
              <Link
                href="/contact?interest=strategy-session"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-background px-6 py-3 font-medium text-foreground transition-opacity hover:opacity-90"
              >
                Book a strategy call
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-background/20 px-6 py-3 font-medium text-background transition-colors hover:bg-background/10"
              >
                Contact us directly
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

