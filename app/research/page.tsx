import type { Metadata } from "next"
import Image from "next/image"
import { ArrowRight, ExternalLink } from "lucide-react"
import { ArticleCard } from "@/components/cards/ArticleCard"
import { PageHero } from "@/components/heroes/PageHero"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { TrackedButton } from "@/components/ui/TrackedButton"
import { Card } from "@/components/ui/Card"
import { FinalCtaBand } from "@/components/sections/FinalCtaBand"
import { TrackedLink } from "@/components/tracked-link"
import { ResearchBrowsePreview } from "@/components/sections/ResearchBrowsePreview"
import { ResearchSourcesMarquee } from "@/components/sections/ResearchSourcesMarquee"
import {
  sourceBrandColor,
  sourceIconPathByName,
  sourceLogoAssetByName,
  sourceMonogram,
  withAlpha,
} from "@/lib/research-sources"
import {
  externalResearchCards,
  featuredKnowledgeArticle,
  knowledgeArticles,
  knowledgePressurePaths,
  researchMethodPoints,
  researchSourcesTracked,
  researchTrustMeta,
} from "@/content/knowledge"

export const metadata: Metadata = {
  title: "Research | Practical research for product and systems teams",
  description:
    "Research for teams making tough product and systems decisions. We explain what it means and what to do next.",
  alternates: {
    canonical: "/research",
  },
}

const primarySituationOrder = [
  { id: "delivery-slipping", label: "When delivery keeps slipping" },
  { id: "next-move-unclear", label: "When the next move is unclear" },
  { id: "systems-getting-harder", label: "When systems are getting harder to manage" },
  { id: "numbers-not-trustworthy", label: "When data is hard to trust" },
] as const

const whyThisFirstBySlug: Record<string, string> = {
  "modernize-vs-rebuild":
    "Teams ask this question when delivery debates are stalling decisions.",
  "architecture-map-before-roadmap":
    "This is the fastest way to reduce planning risk before committing the roadmap.",
  "post-series-a-data-foundations":
    "If teams do not trust the numbers, every next decision stays expensive.",
}

export default function ResearchPage() {
  const featured = featuredKnowledgeArticle
  if (!featured) {
    return null
  }

  const articleBySlug = new Map(knowledgeArticles.map((article) => [article.slug, article]))
  const researchLibrary = [featured, ...knowledgeArticles.filter((article) => article.slug !== featured.slug)]
  const researchOnly = researchLibrary.filter((article) => article.contentType !== "Field Note")
  const fieldNotes = knowledgeArticles.filter((article) => article.contentType === "Field Note").slice(0, 3)

  const startWithSituation = primarySituationOrder
    .map((entry) => {
      const pressurePath = knowledgePressurePaths.find((path) => path.id === entry.id)
      if (!pressurePath) return null

      const leadArticle = articleBySlug.get(pressurePath.articleSlugs[0] ?? "")
      if (!leadArticle) return null

      return {
        ...pressurePath,
        label: entry.label,
        leadArticle,
      }
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item))

  const supportingRecommended = researchLibrary
    .filter((article) => article.slug !== featured.slug)
    .filter((article) => article.contentType !== "Field Note")
    .slice(0, 1)

  const browsePreviewArticles = researchOnly.filter(
    (article) =>
      article.slug !== featured.slug &&
      !supportingRecommended.some((recommended) => recommended.slug === article.slug),
  )

  const whyThisFirst =
    whyThisFirstBySlug[featured.slug] ??
    "This is usually the first question teams ask when progress starts to slow."

  const recentResearch = externalResearchCards.slice(0, 3)
  const thisWeekSignals = [
    "Agent demos still overstate what teams can trust in production.",
    "Architecture choices are still the biggest hidden driver of delivery speed.",
  ]
  return (
    <>
      <Navigation />
      <main id="main-content">
        <PageHero
          scale="mediumLarge"
          tone="soft"
          title={<h1 className="max-w-[22ch]">Research to help you decide what to do next.</h1>}
          support="We break down important research and show what it means for your product, systems, and delivery."
          helper="Updated weekly from published research and active delivery work."
          artifact={
            <Card className="p-5 md:p-6">
              <h2 className="text-2xl font-semibold">This week</h2>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-[var(--color-text-muted)]">
                {thisWeekSignals.map((signal) => (
                  <li key={signal} className="brand-key-row">
                    <span aria-hidden="true" className="brand-key-dot" />
                    <span>{signal}</span>
                  </li>
                ))}
              </ul>
              <TrackedButton
                href="#recent-research-learning"
                variant="tertiary"
                withArrow
                className="mt-4"
                eventName="hero_cta_clicked"
                eventData={{
                  surface_id: "research_hero_this_week",
                  cta_id: "hero_this_week_recent_research",
                  cta_label: "See what we're learning",
                  cta_variant: "tertiary",
                  destination: "#recent-research-learning",
                }}
              >
                See what we&apos;re learning
              </TrackedButton>
            </Card>
          }
          actions={
            <>
              <TrackedButton
                href="#start-with-your-situation"
                withArrow
                eventName="hero_cta_clicked"
                eventData={{
                  surface_id: "research_hero",
                  cta_id: "research_hero_start_with_situation",
                  cta_label: "Start with your situation",
                  cta_variant: "primary",
                  destination: "#start-with-your-situation",
                }}
              >
                Start with your situation
              </TrackedButton>
              <TrackedButton
                href="/research/library"
                variant="secondary"
                eventName="hero_cta_clicked"
                eventData={{
                  surface_id: "research_hero",
                  cta_id: "research_hero_browse_library",
                  cta_label: "Browse all research",
                  cta_variant: "secondary",
                  destination: "/research/library",
                }}
              >
                Browse all research
              </TrackedButton>
            </>
          }
          afterContent={
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 md:p-5">
              <h2 className="text-lg font-semibold">Sources we regularly review</h2>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                We track research from leading labs, standards bodies, and public-interest institutions.
              </p>
              <ResearchSourcesMarquee className="mt-4" />
              <p className="mt-3 text-xs text-[var(--color-text-subtle)]">
                These sources inform our work. They do not endorse our conclusions.
              </p>
            </div>
          }
        />

        <section id="start-with-your-situation" className="section-compact border-y border-[var(--color-border)] bg-[var(--color-surface-muted)]">
          <div className="container-site">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2>Start with your situation</h2>
                <p className="mt-3 max-w-2xl text-base text-[var(--color-text-muted)]">
                  Pick the situation that looks most like what you&apos;re dealing with.
                </p>
              </div>
              <TrackedLink
                href="/next-move"
                eventName="section_cta_clicked"
                eventData={{
                  surface_id: "research_situation",
                  cta_id: "view_all_situations",
                  cta_label: "View all situations",
                  destination: "/next-move",
                }}
                className="inline-flex min-h-10 items-center gap-2 text-sm font-medium text-[var(--color-accent-strong)]"
              >
                View all situations
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {startWithSituation.map((path) => {
                const situationTopicHref = path.leadArticle.topicFamily
                  ? `/research/library?topic=${encodeURIComponent(path.leadArticle.topicFamily)}`
                  : "/research/library"

                return (
                  <Card key={path.id} className="h-full p-5">
                    <h3 className="text-xl font-semibold">{path.label}</h3>
                    <p className="mt-2 text-sm text-[var(--color-text-muted)]">{path.summary}</p>

                    <div className="mt-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5">
                      <p className="text-xs text-[var(--color-text-subtle)]">
                        {path.leadArticle.contentType} | {path.leadArticle.topicFamily} | {path.leadArticle.published} | {path.leadArticle.readTime}
                      </p>
                      <p className="mt-3 text-xs font-medium uppercase tracking-[0.08em] text-[var(--color-text-subtle)]">
                        Start with:
                      </p>
                      <TrackedLink
                        href={`/research/${path.leadArticle.slug}`}
                        eventName="article_opened"
                        eventData={{
                          source: "research_start_with_situation_first_read",
                          pressure_path_id: path.id,
                          slug: path.leadArticle.slug,
                        }}
                        className="mt-1 inline-flex min-h-10 items-center text-sm font-medium text-[var(--color-accent-strong)] underline-offset-4 hover:underline"
                      >
                        {path.leadArticle.title}
                      </TrackedLink>
                      <TrackedLink
                        href={situationTopicHref}
                        eventName="section_cta_clicked"
                        eventData={{
                          surface_id: "research_start_with_situation",
                          cta_id: "see_all_for_situation",
                          pressure_path_id: path.id,
                          destination: situationTopicHref,
                        }}
                        className="mt-2 inline-flex min-h-9 items-center gap-1.5 text-xs font-medium text-[var(--color-accent-strong)]"
                      >
                        See all for this situation
                        <ArrowRight className="h-3.5 w-3.5" />
                      </TrackedLink>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        <section id="start-with-this" className="section-compact border-b border-[var(--color-border)] bg-[var(--color-surface)]">
          <div className="container-site">
            <h2>Start with this</h2>
            <p className="mt-3 max-w-3xl text-base text-[var(--color-text-muted)]">
              If you&apos;re not sure where to begin, start with the most useful brief below.
            </p>

            <Card variant="primary" className="mt-6 p-6 md:p-7">
              <p className="text-xs text-[var(--color-text-subtle)]">
                {featured.contentType} | {featured.topicFamily} | {featured.published} | {featured.readTime}
              </p>
              <h3 className="mt-3 text-[clamp(28px,3vw,38px)] font-semibold">{featured.title}</h3>
              <p className="mt-3 max-w-3xl text-base text-[var(--color-text-muted)]">{featured.promise}</p>
              <p className="mt-4 max-w-3xl text-sm text-[var(--color-text)]">
                <span className="font-medium">Why this first:</span> {whyThisFirst}
              </p>
              <p className="mt-4 max-w-3xl text-sm text-[var(--color-text)]">
                <span className="font-medium">What this means:</span> {featured.bestFor}
              </p>
              <TrackedButton
                href={`/research/${featured.slug}`}
                className="mt-6"
                withArrow
                eventName="article_opened"
                eventData={{
                  source: "research_start_with_this",
                  slug: featured.slug,
                }}
              >
                Read brief
              </TrackedButton>
            </Card>

            <div className="mt-6 grid gap-4 md:grid-cols-1">
              {supportingRecommended.map((article) => (
                <ArticleCard
                  key={article.slug}
                  article={article}
                  mode="compact"
                  eventSource="research_start_with_this_supporting"
                />
              ))}
            </div>
          </div>
        </section>

        <section id="recent-research-learning" className="section-compact border-b border-[var(--color-border)] bg-[var(--color-surface-muted)]">
          <div className="container-site">
            <h2>What we&apos;re learning from recent research</h2>
            <p className="mt-3 max-w-3xl text-base text-[var(--color-text-muted)]">
              Recent research we think is worth understanding now.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {recentResearch.map((card) => (
                <Card key={card.id} className="h-full p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-accent-strong)]">
                    {card.source}
                  </p>
                  <p className="mt-2 text-xs text-[var(--color-text-subtle)]">{card.sourceStamp}</p>
                  <p className="mt-1 text-xs text-[var(--color-text-subtle)]">
                    {card.contentType} | {card.topicFamily} | {card.readTime}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold">{card.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--color-text-muted)]">
                    <span className="font-medium text-[var(--color-text)]">What the research says:</span> {card.summary}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[var(--color-text-muted)]">
                    <span className="font-medium text-[var(--color-text)]">What it means for teams:</span> {card.whatItMeans}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <TrackedLink
                      href={card.href}
                      eventName="article_opened"
                      eventData={{
                        source: "research_recent_learning",
                        research_id: card.id,
                        destination: card.href,
                      }}
                      className="inline-flex min-h-10 items-center gap-2 text-sm font-medium text-[var(--color-accent-strong)]"
                    >
                      Read our take
                      <ArrowRight className="h-4 w-4" />
                    </TrackedLink>
                    <a
                      href={card.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-10 items-center gap-1.5 text-sm text-[var(--color-text-subtle)] underline-offset-4 hover:text-[var(--color-text)] hover:underline"
                    >
                      View original report
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="browse-research" className="section-tight border-b border-[var(--color-border)] bg-[var(--color-surface)]">
          <div className="container-site">
            <h2>Browse research</h2>
            <p className="mt-3 max-w-2xl text-base text-[var(--color-text-muted)]">
              Browse by topic or jump into the full library.
            </p>
            <div className="mt-5">
              <ResearchBrowsePreview articles={browsePreviewArticles} maxCards={6} viewAllHref="/research/library" />
            </div>
          </div>
        </section>

        <section id="field-notes" className="section-tight border-b border-[var(--color-border)] bg-[var(--color-surface-muted)]">
          <div className="container-site">
            <h2>Field notes from real work</h2>
            <p className="mt-3 max-w-2xl text-base text-[var(--color-text-muted)]">
              What we see when teams try to apply this in practice.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {fieldNotes.map((article) => (
                <ArticleCard key={article.slug} article={article} mode="compact" eventSource="research_field_notes" />
              ))}
            </div>
          </div>
        </section>

        <section id="how-we-research" className="section-tight border-b border-[var(--color-border)] bg-[var(--color-surface)]">
          <div className="container-site">
            <h2>How we research</h2>
            <p className="mt-3 max-w-3xl text-base text-[var(--color-text-muted)]">
              We track outside research, compare it with real delivery work, and update our guidance as things change.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {researchMethodPoints.slice(0, 4).map((point) => (
                <Card key={point.id} className="h-full p-5">
                  <h3 className="text-lg font-semibold">{point.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--color-text-muted)]">{point.detail}</p>
                </Card>
              ))}
            </div>

            <Card className="mt-4 p-5">
              <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">Research metadata</p>
              <ul className="mt-3 space-y-1.5 text-sm text-[var(--color-text)]">
                <li>
                  <span className="font-medium">Last reviewed:</span> {researchTrustMeta.lastReviewed}
                </li>
                <li>
                  <span className="font-medium">Reviewed by:</span> {researchTrustMeta.reviewedBy}
                </li>
                <li>
                  <span className="font-medium">Evidence mix:</span> {researchTrustMeta.evidenceMix}
                </li>
              </ul>
              <div className="mt-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-3.5">
                <p className="text-xs font-medium uppercase tracking-[0.1em] text-[var(--color-text-subtle)]">
                  Confidence guide
                </p>
                <ul className="mt-2 space-y-1.5 text-xs text-[var(--color-text)]">
                  {researchTrustMeta.confidence.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </Card>

            <Card className="mt-4 p-5">
              <h3 className="text-lg font-semibold">Sources we regularly review</h3>
              <p className="mt-2 max-w-3xl text-sm text-[var(--color-text-muted)]">
                We regularly review research from major labs, standards bodies, and public-interest institutions.
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {researchSourcesTracked.map((source) => {
                  const brandColor = sourceBrandColor(source)
                  const logoAsset = sourceLogoAssetByName[source]
                  return (
                    <div
                      key={source}
                      className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 text-xs font-medium text-[var(--color-text)]"
                    >
                      {logoAsset ? (
                        <Image
                          src={logoAsset}
                          alt=""
                          width={120}
                          height={24}
                          className="h-[18px] w-auto max-w-[6.5rem] shrink-0 object-contain opacity-90"
                        />
                      ) : sourceIconPathByName[source] ? (
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          className="h-5 w-5 shrink-0 fill-current"
                          style={{ color: withAlpha(brandColor, 0.9) }}
                        >
                          <path d={sourceIconPathByName[source]} />
                        </svg>
                      ) : (
                        <span
                          aria-hidden="true"
                          style={{
                            borderColor: withAlpha(brandColor, 0.35),
                            backgroundColor: withAlpha(brandColor, 0.12),
                            color: withAlpha(brandColor, 0.9),
                          }}
                          className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[9px] font-semibold tracking-[0.03em]"
                        >
                          {sourceMonogram(source)}
                        </span>
                      )}
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: withAlpha(brandColor, 0.95) }}
                      />
                      <span className="text-[color-mix(in_srgb,var(--color-text-subtle)_40%,var(--color-text)_60%)]">{source}</span>
                    </div>
                  )
                })}
              </div>
              <p className="mt-3 text-xs text-[var(--color-text-subtle)]">
                These sources inform our work. They do not endorse our conclusions.
              </p>
            </Card>
          </div>
        </section>

        <FinalCtaBand
          surfaceId="research_final"
          headline="Want help deciding what to do next?"
          support="Tell us what&apos;s happening and we&apos;ll recommend the clearest next step."
          primary={{ label: "Get a recommendation", href: "/contact" }}
        />
      </main>
      <Footer />
    </>
  )
}
