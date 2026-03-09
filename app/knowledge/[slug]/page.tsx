import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  ArrowRight,
  BookOpenText,
  CalendarDays,
  ChevronRight,
  Clock3,
} from "lucide-react"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import {
  getKnowledgeBriefBySlug,
  getKnowledgeCategory,
  knowledgeBriefs,
} from "@/lib/knowledge-briefs"
import { JsonLd } from "@/components/json-ld"
import { SignalsSubscribeForm } from "@/components/signals-subscribe-form"
import {
  getLaunchpadKnowledgeRecommendation,
  getLaunchpadTool,
} from "@/lib/launchpad"

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export const dynamicParams = false

export async function generateStaticParams() {
  return knowledgeBriefs.map((brief) => ({
    slug: brief.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const brief = getKnowledgeBriefBySlug(slug)

  if (!brief) {
    return {
      title: "Article Not Found",
    }
  }

  return {
    title: brief.title,
    description: brief.description,
    alternates: {
      canonical: `/knowledge/${brief.slug}`,
    },
    openGraph: {
      title: `${brief.title} | Amalgam Knowledge Base`,
      description: brief.description,
      url: `/knowledge/${brief.slug}`,
      type: "article",
    },
  }
}

export default async function KnowledgeBriefPage({ params }: PageProps) {
  const { slug } = await params
  const brief = getKnowledgeBriefBySlug(slug)

  if (!brief) {
    notFound()
  }

  const category = getKnowledgeCategory(brief.category)
  const relatedBriefs = knowledgeBriefs
    .filter((item) => item.slug !== brief.slug && item.category === brief.category)
    .slice(0, 3)
  const fallbackBriefs = knowledgeBriefs
    .filter((item) => item.slug !== brief.slug && item.category !== brief.category)
    .slice(0, Math.max(0, 3 - relatedBriefs.length))
  const moreToExplore = [...relatedBriefs, ...fallbackBriefs]
  const launchpadRecommendation = getLaunchpadKnowledgeRecommendation(brief.slug)
  const recommendedTool = launchpadRecommendation
    ? getLaunchpadTool(launchpadRecommendation.toolId)
    : null
  const articleIndex = knowledgeBriefs.findIndex((item) => item.slug === brief.slug)
  const previousBrief = articleIndex > 0 ? knowledgeBriefs[articleIndex - 1] : null
  const nextBrief =
    articleIndex < knowledgeBriefs.length - 1 ? knowledgeBriefs[articleIndex + 1] : null
  const introPreview = (() => {
    const normalized = brief.intro.replace(/\s+/g, " ").trim()
    const sentences = normalized.match(/[^.!?]+[.!?]?/g) ?? [normalized]
    const condensed = sentences.slice(0, 2).join(" ").trim()
    if (condensed.length <= 300) {
      return condensed
    }

    const trimmed = condensed.slice(0, 300).trim()
    const lastSpace = trimmed.lastIndexOf(" ")
    return `${lastSpace > 100 ? trimmed.slice(0, lastSpace) : trimmed}…`
  })()
  const displayIntroPreview = introPreview.replace(/[^\u0000-\u007F]+$/u, "...")
  const canonicalUrl = `https://amalgam-inc.com/knowledge/${brief.slug}`
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://amalgam-inc.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Knowledge",
          item: "https://amalgam-inc.com/knowledge",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: brief.title,
          item: canonicalUrl,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: brief.title,
      description: brief.description,
      articleSection: category?.label ?? "Knowledge",
      keywords: [category?.label ?? "Knowledge", ...brief.keyTakeaways].join(", "),
      author: {
        "@type": "Organization",
        name: "Amalgam",
      },
      publisher: {
        "@type": "Organization",
        name: "Amalgam",
        logo: {
          "@type": "ImageObject",
          url: "https://amalgam-inc.com/brand/amalgam-logo.webp",
        },
      },
      mainEntityOfPage: canonicalUrl,
      url: canonicalUrl,
    },
  ]

  return (
    <>
      <JsonLd data={schema} />
      <Navigation />
      <main id="main-content" className="min-h-screen bg-background pt-20">
        <section className="relative overflow-hidden border-b border-border px-6 py-16 md:px-8 md:py-24">
          <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-teal/10 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-10 h-64 w-64 rounded-full bg-purple/10 blur-3xl" />
          <div className="relative mx-auto max-w-[1200px]">
            <Link
              href="/knowledge"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to knowledge base
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-3 text-sm">
              {category ? (
                <Link
                  href={`/knowledge?category=${category.id}`}
                  className="rounded-full border border-teal/20 bg-background/90 px-3 py-1 font-semibold uppercase tracking-[0.22em] text-teal transition-colors hover:border-teal/40"
                >
                  {category.label}
                </Link>
              ) : null}
              <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                <CalendarDays className="h-4 w-4" />
                {brief.published}
              </span>
              <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                <Clock3 className="h-4 w-4" />
                {brief.readTime}
              </span>
            </div>

            <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
              <div className="max-w-4xl">
                <h1 className="text-4xl font-semibold tracking-tight text-foreground text-balance md:text-5xl lg:text-6xl">
                  {brief.title}
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                  {displayIntroPreview}
                </p>
              </div>

              <div className="rounded-[28px] border border-border bg-background/95 p-6 shadow-sm">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                  Quick summary
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {brief.summary}
                </p>
                <div className="mt-5 grid gap-3">
                  {brief.keyTakeaways.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-border bg-secondary/40 px-4 py-3 text-sm leading-relaxed text-foreground"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-16 md:px-8 md:py-20">
          <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[minmax(0,720px)_320px] xl:grid-cols-[minmax(0,760px)_320px]">
            <article className="space-y-10">
              {brief.sections.map((section, index) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-28 rounded-[30px] border border-border bg-background px-6 py-7 md:px-8 md:py-9"
                >
                  <div className="mb-6 flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-teal/10 text-sm font-semibold text-teal">
                      {index + 1}
                    </span>
                    <div>
                      {section.kicker ? (
                        <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                          {section.kicker}
                        </p>
                      ) : null}
                      <h2 className="mt-2 text-2xl font-semibold text-foreground md:text-[30px]">
                        {section.title}
                      </h2>
                    </div>
                  </div>

                  <div className="space-y-5">
                    {section.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-base leading-7 text-muted-foreground"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {section.bullets ? (
                    <div className="mt-7 border-t border-border pt-7">
                      <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                        Key takeaways
                      </p>
                      <ul className="space-y-3">
                        {section.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex items-start gap-3 text-[15px] leading-7 text-foreground"
                          >
                            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-teal" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </section>
              ))}

              <section className="rounded-[30px] border border-border bg-secondary/30 px-6 py-7 md:px-8 md:py-8">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                  Continue reading
                </p>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {previousBrief ? (
                    <Link
                      href={`/knowledge/${previousBrief.slug}`}
                      className="rounded-[24px] border border-border bg-background px-5 py-5 transition-colors hover:border-teal/40"
                    >
                      <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                        Previous article
                      </p>
                      <p className="mt-2 text-lg font-semibold text-foreground">
                        {previousBrief.title}
                      </p>
                    </Link>
                  ) : (
                    <div className="rounded-[24px] border border-dashed border-border bg-background px-5 py-5">
                      <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                        Previous article
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        You are at the start of the library.
                      </p>
                    </div>
                  )}
                  {nextBrief ? (
                    <Link
                      href={`/knowledge/${nextBrief.slug}`}
                      className="rounded-[24px] border border-border bg-background px-5 py-5 transition-colors hover:border-teal/40"
                    >
                      <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                        Next article
                      </p>
                      <p className="mt-2 text-lg font-semibold text-foreground">
                        {nextBrief.title}
                      </p>
                    </Link>
                  ) : (
                    <div className="rounded-[24px] border border-dashed border-border bg-background px-5 py-5">
                      <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                        Next article
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        You have reached the end of the current sequence.
                      </p>
                    </div>
                  )}
                </div>
              </section>
            </article>

            <aside className="space-y-5 lg:sticky lg:top-28 lg:h-fit">
              <div className="rounded-[28px] border border-border bg-secondary/45 p-6">
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-teal">
                  <BookOpenText className="h-4 w-4" />
                  In this article
                </div>
                <div className="mt-5 space-y-2">
                  {brief.sections.map((section, index) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="flex items-start gap-3 rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground transition-colors hover:border-teal/40 hover:text-teal"
                    >
                      <span className="text-muted-foreground">{index + 1}</span>
                      <span>{section.title}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-border bg-background p-6">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                  Best for
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground">{brief.takeaway}</p>
                {category ? (
                  <Link
                    href={`/knowledge?category=${category.id}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-teal transition-colors hover:text-foreground"
                  >
                    Explore all {category.label} articles
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : null}
              </div>

              <div className="rounded-[28px] border border-border bg-background p-6">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                  More to explore
                </p>
                <div className="mt-5 space-y-3">
                  {moreToExplore.map((item) => {
                    const itemCategory = getKnowledgeCategory(item.category)

                    return (
                      <Link
                        key={item.slug}
                        href={`/knowledge/${item.slug}`}
                        className="block rounded-2xl border border-border px-4 py-4 transition-colors hover:border-teal/40"
                      >
                        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                          {itemCategory?.label}
                        </p>
                        <p className="mt-2 text-sm font-medium leading-relaxed text-foreground">
                          {item.title}
                        </p>
                      </Link>
                    )
                  })}
                </div>
              </div>

              {recommendedTool ? (
                <div className="rounded-[28px] border border-border bg-background p-6">
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                    Recommended diagnostic
                  </p>
                  <h3 className="mt-3 text-lg font-semibold text-foreground">
                    {recommendedTool.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {launchpadRecommendation?.reason}
                  </p>
                  <p className="mt-4 text-sm text-foreground">
                    {recommendedTool.outputLabel} in {recommendedTool.estimatedTime}.
                  </p>
                  <Link
                    href={`/launchpad/${recommendedTool.slug}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-teal transition-colors hover:text-foreground"
                  >
                    Explore diagnostics
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ) : null}

              <div className="rounded-[28px] border border-border bg-background p-6">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                  Signal
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Get practical notes on systems clarity, execution drag, and architecture judgment when they are worth your attention.
                </p>
                <SignalsSubscribeForm
                  source={`knowledge_article_${brief.slug}`}
                  buttonLabel="Subscribe for signal"
                  className="mt-5 space-y-4"
                />
              </div>

              <div className="rounded-[28px] border border-border bg-foreground p-6">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                  Need help with your specific situation?
                </p>
                <p className="mt-3 text-sm leading-relaxed text-background/75">
                  Articles sharpen judgment. They do not replace a real read on
                  your architecture, operating model, and delivery constraints.
                </p>
                <div className="mt-5 flex flex-col gap-3">
                  <Link
                    href="/contact?interest=strategy-session"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-background px-4 py-3 text-sm font-medium text-foreground transition-opacity hover:opacity-90"
                  >
                    Book a free strategy call
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/founder-review"
                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-background/15 px-4 py-3 text-sm font-medium text-background transition-colors hover:bg-background/10"
                  >
                    See how the diagnostic works
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="border-t border-border bg-secondary/25 px-6 py-16 md:px-8 md:py-18">
          <div className="mx-auto max-w-[1200px]">
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="transition-colors hover:text-foreground">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/knowledge" className="transition-colors hover:text-foreground">
                Knowledge Base
              </Link>
              {category ? (
                <>
                  <ChevronRight className="h-4 w-4" />
                  <Link
                    href={`/knowledge?category=${category.id}`}
                    className="transition-colors hover:text-foreground"
                  >
                    {category.label}
                  </Link>
                </>
              ) : null}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
