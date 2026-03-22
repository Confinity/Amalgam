"use client"

import { useMemo, useState } from "react"
import { ArrowRight } from "lucide-react"
import { ArticleCard } from "@/components/cards/ArticleCard"
import { TrackedLink } from "@/components/tracked-link"

type ResearchArticle = {
  slug: string
  title: string
  categoryLabel: string
  promise: string
  readTime: string
  bestFor: string
  contentType?: string
  topicFamily?: string
  published?: string
}

type TopicChip = {
  id: string
  label: string
  matches: (article: ResearchArticle) => boolean
}

type ResearchBrowsePreviewProps = {
  articles: ResearchArticle[]
  maxCards?: number
  viewAllHref?: string
}

const topicChips: TopicChip[] = [
  { id: "all", label: "All", matches: () => true },
  {
    id: "ai",
    label: "AI",
    matches: (article) => {
      const topic = article.topicFamily ?? ""
      return topic === "AI systems" || topic === "Agent reliability"
    },
  },
  { id: "security", label: "Security", matches: (article) => (article.topicFamily ?? "") === "Security" },
  {
    id: "architecture",
    label: "Architecture",
    matches: (article) => (article.topicFamily ?? "") === "Architecture",
  },
  { id: "delivery", label: "Delivery", matches: (article) => (article.topicFamily ?? "") === "Delivery" },
  {
    id: "data",
    label: "Data",
    matches: (article) => (article.topicFamily ?? "") === "Data and decisions",
  },
  {
    id: "methods",
    label: "Methods",
    matches: (article) => {
      const topic = article.topicFamily ?? ""
      return topic === "Methods" || topic === "Governance and risk"
    },
  },
]

const chipBaseClass =
  "inline-flex min-h-9 items-center rounded-full border px-3 py-1.5 text-xs font-medium transition-colors"

export function ResearchBrowsePreview({
  articles,
  maxCards = 6,
  viewAllHref = "/research/library",
}: ResearchBrowsePreviewProps) {
  const [activeTopic, setActiveTopic] = useState<string>("all")

  const filtered = useMemo(() => {
    const selectedTopic = topicChips.find((topic) => topic.id === activeTopic) ?? topicChips[0]

    return articles.filter((article) => selectedTopic.matches(article))
  }, [activeTopic, articles])

  const visible = filtered.slice(0, maxCards)

  return (
    <div>
      <div className="sticky top-[78px] z-30 -mx-2 border-y border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-surface)_97%,white_3%)] px-2 py-2.5">
        <div className="overflow-x-auto">
          <div className="flex min-w-max items-center gap-2" role="group" aria-label="Browse research by topic">
            {topicChips.map((chip) => {
              const active = chip.id === activeTopic
              return (
                <button
                  key={chip.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setActiveTopic(chip.id)}
                  className={
                    active
                      ? `${chipBaseClass} border-[var(--color-accent-strong)] bg-[var(--color-accent-soft)] text-[var(--color-accent-strong)]`
                      : `${chipBaseClass} border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)]`
                  }
                >
                  {chip.label}
                </button>
              )
            })}
          </div>
        </div>

      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-[var(--color-text-subtle)]">
          <span className="font-medium text-[var(--color-text)]">{filtered.length}</span> results
        </p>
        <TrackedLink
          href={viewAllHref}
          eventName="section_cta_clicked"
          eventData={{
            surface_id: "research_browse_preview",
            cta_id: "view_all_research",
            cta_label: "View all research",
            destination: viewAllHref,
          }}
          className="inline-flex min-h-10 items-center gap-2 text-sm font-medium text-[var(--color-accent-strong)]"
        >
          View all research
          <ArrowRight className="h-4 w-4" />
        </TrackedLink>
      </div>

      {visible.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <p className="text-sm text-[var(--color-text-muted)]">No results for this selection. Try another topic.</p>
        </div>
      ) : (
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((article) => (
            <ArticleCard key={article.slug} article={article} mode="compact" eventSource="research_browse_preview" />
          ))}
        </div>
      )}
    </div>
  )
}
