import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { JsonLd } from "@/components/json-ld"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ArticleReadingProgress } from "@/components/article-reading-progress"
import { TrackedLink } from "@/components/tracked-link"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { FinalCtaBand } from "@/components/sections/FinalCtaBand"
import { getLaunchpadKnowledgeRecommendation, getLaunchpadTool } from "@/lib/launchpad"
import { absoluteUrl } from "@/lib/site-config"
import { researchTrustMeta } from "@/content/knowledge"
import {
  getKnowledgeBriefBySlug,
  knowledgeBriefs,
} from "@/lib/knowledge-briefs"

type PageProps = {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export async function generateStaticParams() {
  return knowledgeBriefs.map((brief) => ({ slug: brief.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const brief = getKnowledgeBriefBySlug(slug)

  if (!brief) {
    return { title: "Article not found" }
  }

  return {
    title: brief.title,
    description: brief.description,
    alternates: {
      canonical: `/research/${brief.slug}`,
    },
  }
}

export default async function KnowledgeBriefPage({ params }: PageProps) {
  const { slug } = await params
  const brief = getKnowledgeBriefBySlug(slug)

  if (!brief) {
    notFound()
  }

  const related = knowledgeBriefs
    .filter((item) => item.slug !== brief.slug)
    .slice(0, 3)

  const recommendation = getLaunchpadKnowledgeRecommendation(brief.slug)
  const tool = recommendation ? getLaunchpadTool(recommendation.toolId) : null
  const confidenceLabel = researchTrustMeta.confidence[0]?.split(" = ")[0] ?? "High"
  const tocItems = [
    { id: "brief-context", title: "Context", label: "00" },
    ...brief.sections.map((section, index) => ({
      id: section.id,
      title: section.title,
      label: String(index + 1).padStart(2, "0"),
    })),
  ]

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: brief.title,
    description: brief.description,
    url: absoluteUrl(`/research/${brief.slug}`),
  }

  return (
    <>
      <JsonLd data={schema} />
      <Navigation />
      <ArticleReadingProgress
        targetId="brief-content"
        eventName="article_read_depth_reached"
        eventData={{ slug: brief.slug, category: brief.category }}
      />
      <main id="main-content">
        <section className="border-b border-[var(--color-border)] pt-[160px] pb-[72px] md:pt-[180px] md:pb-[88px] lg:pt-[192px] lg:pb-[102px]">
          <div className="container-site">
            <Link
              prefetch={false}
              href="/research"
              className="inline-flex min-h-11 items-center gap-2 py-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to research
            </Link>

            <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
              <div>
                <h1 className="max-w-[20ch] break-words text-4xl font-semibold leading-tight md:text-5xl">{brief.title}</h1>
                <p className="mt-4 max-w-3xl text-lg">{brief.description}</p>
                <p className="mt-3 text-sm text-[var(--color-text-subtle)]">
                  {brief.published} | {brief.readTime}
                </p>
              </div>
              <Card variant="primary" className="p-6">
                <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-accent-strong)]">One-sentence summary</p>
                <p className="mt-3 text-sm text-[var(--color-text)]">{brief.summary}</p>
                <div className="mt-4 space-y-2">
                  {brief.keyTakeaways.slice(0, 3).map((item) => (
                    <div key={item} className="tile-utility p-3 text-sm text-[var(--color-text)]">
                      {item}
                    </div>
                  ))}
                </div>
                <div className="mt-4 border-t border-[var(--color-border)] pt-4">
                  <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">Review metadata</p>
                  <ul className="mt-2 space-y-1.5 text-xs text-[var(--color-text)]">
                    <li>
                      <span className="font-medium">Confidence:</span> {confidenceLabel}
                    </li>
                    <li>
                      <span className="font-medium">Reviewed by:</span> {researchTrustMeta.reviewedBy}
                    </li>
                    <li>
                      <span className="font-medium">Review date:</span> {researchTrustMeta.lastReviewed}
                    </li>
                    <li>
                      <span className="font-medium">Evidence mix:</span> {researchTrustMeta.evidenceMix}
                    </li>
                  </ul>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section className="section-compact">
          <div className="container-site grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
            <article id="brief-content" className="space-y-8">
              <Card className="p-4 lg:hidden">
                <details className="group">
                  <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-[var(--color-text)]">
                    <span>Jump to section</span>
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[var(--color-border)] text-sm text-[var(--color-text-subtle)] transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <ol className="mt-3 space-y-2 border-t border-[var(--color-border)] pt-3">
                    {tocItems.map((item) => (
                      <li key={`mobile-${item.id}`}>
                        <TrackedLink
                          href={`#${item.id}`}
                          eventName="knowledge_section_jump_clicked"
                          eventData={{ source: "brief_toc_mobile", slug: brief.slug, section_id: item.id }}
                          className="interactive flex min-h-11 items-center gap-3 rounded-xl border border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-text)]"
                        >
                          <span className="inline-flex w-7 shrink-0 justify-center text-xs font-medium tracking-[0.08em] text-[var(--color-text-subtle)]">
                            {item.label}
                          </span>
                          <span>{item.title}</span>
                        </TrackedLink>
                      </li>
                    ))}
                  </ol>
                </details>
              </Card>

              <section
                id="brief-context"
                className="rounded-2xl border border-[color-mix(in_srgb,var(--color-border)_82%,transparent)] bg-[var(--color-surface)] p-6 md:p-7"
              >
                <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">Context</p>
                <p className="mt-3 text-base leading-relaxed text-[var(--color-text-muted)]">{brief.intro}</p>
                <p className="mt-4 text-sm text-[var(--color-text)]">
                  <span className="font-medium text-[var(--color-accent-strong)]">Takeaway:</span> {brief.takeaway}
                </p>
              </section>

              {brief.sections.map((section, index) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="border-t border-[var(--color-border)] pt-8 first:border-t-0 first:pt-0"
                >
                  <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">Section {index + 1}</p>
                  <h2 className="mt-2 text-[clamp(28px,3vw,36px)] font-semibold">{section.title}</h2>
                  {section.kicker ? <p className="mt-2 text-sm text-[var(--color-text-subtle)]">{section.kicker}</p> : null}
                  <div className="mt-4 space-y-4 text-base leading-relaxed">
                    {section.paragraphs.slice(0, 1).map((paragraph, paragraphIndex) => (
                      <p key={`${section.id}-visible-${paragraphIndex}`}>{paragraph}</p>
                    ))}
                  </div>
                  {section.paragraphs.length > 1 ? (
                    <details className="group mt-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-3.5">
                      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between text-sm font-medium text-[var(--color-text)]">
                        Read the full section
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[var(--color-border)] text-sm text-[var(--color-text-subtle)] transition-transform group-open:rotate-45">
                          +
                        </span>
                      </summary>
                      <div className="mt-3 space-y-4 text-base leading-relaxed">
                        {section.paragraphs.slice(1).map((paragraph, paragraphIndex) => (
                          <p key={`${section.id}-more-${paragraphIndex}`}>{paragraph}</p>
                        ))}
                      </div>
                    </details>
                  ) : null}
                  {section.bullets ? (
                    <ul className="mt-4 list-disc space-y-2 pl-5 text-base text-[var(--color-text)]">
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </article>

            <aside className="space-y-4 lg:sticky lg:top-28">
              <Card className="p-6">
                <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">On this page</p>
                <nav aria-label="Article sections" className="mt-3">
                  <ol className="space-y-2">
                    {tocItems.map((item) => (
                      <li key={item.id}>
                        <TrackedLink
                          href={`#${item.id}`}
                          eventName="knowledge_section_jump_clicked"
                          eventData={{ source: "brief_toc_desktop", slug: brief.slug, section_id: item.id }}
                          className="interactive flex min-h-11 items-center gap-3 rounded-xl border border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-text)]"
                        >
                          <span className="inline-flex w-7 shrink-0 justify-center text-xs font-medium tracking-[0.08em] text-[var(--color-text-subtle)]">
                            {item.label}
                          </span>
                          <span>{item.title}</span>
                        </TrackedLink>
                      </li>
                    ))}
                  </ol>
                </nav>
              </Card>

              {tool ? (
                <Card variant="primary" className="p-6">
                  <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-accent-strong)]">Recommended next step</p>
                  <h3 className="mt-2 text-xl font-semibold">{tool.title}</h3>
                  <p className="mt-2 text-sm text-[var(--color-text-muted)]">{recommendation?.reason}</p>
                  <Button href={`/next-move/${tool.slug}`} className="mt-4" withArrow>
                    Start diagnostic
                  </Button>
                </Card>
              ) : null}

              <Card className="p-6">
                <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">More to explore</p>
                <ul className="mt-3 space-y-2">
                  {related.map((item) => (
                    <li key={item.slug}>
                      <TrackedLink
                        href={`/research/${item.slug}`}
                        eventName="knowledge_related_article_clicked"
                        eventData={{ source: "brief_sidebar_related", slug: brief.slug, target_slug: item.slug }}
                        className="interactive block rounded-xl border border-[var(--color-border)] px-3 py-3 text-sm text-[var(--color-text)]"
                      >
                        {item.title}
                      </TrackedLink>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-6">
                <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">Need a direct read?</p>
                <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                  Articles help frame thinking. A strategy call applies this to your specific system.
                </p>
                <Button href="/contact" className="mt-4">
                  Get a recommendation
                </Button>
              </Card>
            </aside>
          </div>
        </section>

        <FinalCtaBand
          headline="Want help applying this to your context?"
          support="Bring your situation and we will recommend the clearest next step."
          primary={{ label: "Get a recommendation", href: "/contact" }}
        />

        <section className="section-tight border-t border-[var(--color-border)]">
          <div className="container-site">
            <Link
              prefetch={false}
              href="/research"
              className="inline-flex min-h-11 items-center gap-2 py-2 text-sm text-[var(--color-accent-strong)]"
            >
              Back to research library
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}



