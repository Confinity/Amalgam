"use client"

import { useEffect, useMemo, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { track } from "@vercel/analytics"
import { ArrowRight } from "lucide-react"
import { ArticleCard } from "@/components/cards/ArticleCard"
import { TrackedLink } from "@/components/tracked-link"

type KnowledgeTopic = {
  id: string
  label: string
  description?: string
}

type KnowledgeArticle = {
  slug: string
  title: string
  category: string
  categoryLabel: string
  promise: string
  readTime: string
  bestFor: string
  contentType?: string
  topicFamily?: string
  published?: string
  featured?: boolean
}

type KnowledgeLibraryFiltersProps = {
  topics: KnowledgeTopic[]
  articles: KnowledgeArticle[]
  maxVisible?: number
  viewAllHref?: string
  viewAllLabel?: string
  surfaceId?: string
}

const ALL_TOPICS_ID = "all-topics"
const ALL_TYPES_ID = "all-types"
const DEFAULT_SORT = "most-useful"

const sortOptions = [
  { id: "most-useful", label: "Most useful" },
  { id: "newest", label: "Newest" },
  { id: "most-recently-reviewed", label: "Most recently reviewed" },
] as const

type SortOptionId = (typeof sortOptions)[number]["id"]

const chipClass =
  "inline-flex min-h-9 items-center rounded-full border px-3 py-1.5 text-xs font-medium transition-colors"

function parsePublishedDate(value?: string) {
  if (!value) return 0
  const parsed = Date.parse(`1 ${value}`)
  return Number.isNaN(parsed) ? 0 : parsed
}

export function KnowledgeLibraryFilters({
  topics,
  articles,
  maxVisible,
  viewAllHref,
  viewAllLabel = "View all research",
  surfaceId = "research_library",
}: KnowledgeLibraryFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const contentTypes = useMemo(
    () =>
      [...new Set(articles.map((article) => article.contentType ?? "Research Brief"))].sort((a, b) =>
        a.localeCompare(b),
      ),
    [articles],
  )

  const topicIds = useMemo(() => new Set(topics.map((topic) => topic.id)), [topics])
  const contentTypeIds = useMemo(() => new Set(contentTypes), [contentTypes])

  const [activeTopic, setActiveTopic] = useState<string>(() => {
    const urlTopic = searchParams.get("topic")
    return urlTopic && topicIds.has(urlTopic) ? urlTopic : ALL_TOPICS_ID
  })
  const [activeType, setActiveType] = useState<string>(() => {
    const urlType = searchParams.get("type")
    return urlType && contentTypeIds.has(urlType) ? urlType : ALL_TYPES_ID
  })
  const [query, setQuery] = useState<string>(() => (searchParams.get("q") ?? "").trim())
  const [sortBy, setSortBy] = useState<SortOptionId>(() => {
    const urlSort = searchParams.get("sort") as SortOptionId | null
    return sortOptions.some((option) => option.id === urlSort) ? (urlSort as SortOptionId) : DEFAULT_SORT
  })

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams.toString())

    if (activeTopic !== ALL_TOPICS_ID) nextParams.set("topic", activeTopic)
    else nextParams.delete("topic")

    if (activeType !== ALL_TYPES_ID) nextParams.set("type", activeType)
    else nextParams.delete("type")

    if (query.trim()) nextParams.set("q", query.trim())
    else nextParams.delete("q")

    if (sortBy !== DEFAULT_SORT) nextParams.set("sort", sortBy)
    else nextParams.delete("sort")

    const nextQueryString = nextParams.toString()
    const currentQueryString = searchParams.toString()

    if (nextQueryString !== currentQueryString) {
      router.replace(nextQueryString ? `${pathname}?${nextQueryString}` : pathname, {
        scroll: false,
      })
    }
  }, [activeTopic, activeType, pathname, query, router, searchParams, sortBy])

  const filteredArticles = useMemo(
    () =>
      articles.filter((article) => {
        const topic = article.topicFamily ?? article.categoryLabel
        const type = article.contentType ?? "Research Brief"
        const searchText = `${article.title} ${article.promise} ${article.bestFor} ${topic} ${type}`.toLowerCase()
        const normalizedQuery = query.trim().toLowerCase()

        if (activeTopic !== ALL_TOPICS_ID && topic !== activeTopic) return false
        if (activeType !== ALL_TYPES_ID && type !== activeType) return false
        if (normalizedQuery && !searchText.includes(normalizedQuery)) return false

        return true
      }),
    [activeTopic, activeType, articles, query],
  )

  const sortedArticles = useMemo(() => {
    if (sortBy === DEFAULT_SORT) {
      return filteredArticles
    }

    const list = [...filteredArticles]
    list.sort((left, right) => {
      const rightDate = parsePublishedDate(right.published)
      const leftDate = parsePublishedDate(left.published)
      const dateDiff = rightDate - leftDate
      if (dateDiff !== 0) return dateDiff

      if (sortBy === "most-recently-reviewed") {
        const reviewedDiff = Number(Boolean(right.featured)) - Number(Boolean(left.featured))
        if (reviewedDiff !== 0) return reviewedDiff
      }

      return left.title.localeCompare(right.title)
    })

    return list
  }, [filteredArticles, sortBy])

  const visibleArticles =
    typeof maxVisible === "number" ? sortedArticles.slice(0, Math.max(0, maxVisible)) : sortedArticles

  const hasActiveFilters =
    activeTopic !== ALL_TOPICS_ID ||
    activeType !== ALL_TYPES_ID ||
    Boolean(query.trim()) ||
    sortBy !== DEFAULT_SORT

  const hiddenCount = Math.max(0, sortedArticles.length - visibleArticles.length)

  function onTopicChange(topicId: string, label: string) {
    setActiveTopic(topicId)
    track("research_filter_changed", {
      surface_id: surfaceId,
      filter_group: "topic",
      filter_value: label,
    })
  }

  function onTypeChange(typeId: string) {
    setActiveType(typeId)
    track("research_filter_changed", {
      surface_id: surfaceId,
      filter_group: "content_type",
      filter_value: typeId,
    })
  }

  function onSortChange(value: SortOptionId) {
    setSortBy(value)
    track("research_filter_changed", {
      surface_id: surfaceId,
      filter_group: "sort",
      filter_value: value,
    })
  }

  function resetFilters() {
    setActiveTopic(ALL_TOPICS_ID)
    setActiveType(ALL_TYPES_ID)
    setQuery("")
    setSortBy(DEFAULT_SORT)
    track("research_filters_reset", {
      surface_id: surfaceId,
      result_count: articles.length,
    })
  }

  const activeFilterPills = [
    activeTopic !== ALL_TOPICS_ID
      ? {
          id: `topic-${activeTopic}`,
          label: `Topic: ${activeTopic}`,
          onClear: () => setActiveTopic(ALL_TOPICS_ID),
        }
      : null,
    activeType !== ALL_TYPES_ID
      ? {
          id: `type-${activeType}`,
          label: `Type: ${activeType}`,
          onClear: () => setActiveType(ALL_TYPES_ID),
        }
      : null,
    query.trim()
      ? {
          id: "query",
          label: `Search: ${query.trim()}`,
          onClear: () => setQuery(""),
        }
      : null,
    sortBy !== DEFAULT_SORT
      ? {
          id: `sort-${sortBy}`,
          label: `Sort: ${sortOptions.find((option) => option.id === sortBy)?.label ?? sortBy}`,
          onClear: () => setSortBy(DEFAULT_SORT),
        }
      : null,
  ].filter((pill): pill is { id: string; label: string; onClear: () => void } => Boolean(pill))

  return (
    <div>
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3 md:p-3.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">Filter library</p>
          <button
            type="button"
            onClick={resetFilters}
            disabled={!hasActiveFilters}
            className="inline-flex min-h-8 items-center rounded-full px-2.5 text-xs text-[var(--color-text-subtle)] disabled:cursor-not-allowed disabled:opacity-45"
          >
            Reset filters
          </button>
        </div>

        <div className="mt-3 grid gap-2 md:grid-cols-[minmax(0,1fr)_220px] md:items-end">
          <label className="text-xs text-[var(--color-text-subtle)]">
            Search
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search titles, topics, and takeaways"
              className="mt-1.5 block min-h-10 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-subtle)] focus-visible:border-[var(--color-accent-strong)] focus-visible:outline-none"
            />
          </label>

          <label className="text-xs text-[var(--color-text-subtle)]">
            Sort
            <select
              value={sortBy}
              onChange={(event) => onSortChange(event.target.value as SortOptionId)}
              className="mt-1.5 block min-h-10 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 text-sm text-[var(--color-text)] focus-visible:border-[var(--color-accent-strong)] focus-visible:outline-none"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-3">
          <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">Topic</p>
          <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Filter research library by topic">
            <button
              type="button"
              aria-pressed={activeTopic === ALL_TOPICS_ID}
              onClick={() => onTopicChange(ALL_TOPICS_ID, "All topics")}
              className={
                activeTopic === ALL_TOPICS_ID
                  ? `${chipClass} border-[var(--color-accent-strong)] bg-[var(--color-accent-soft)] text-[var(--color-accent-strong)]`
                  : `${chipClass} border-[var(--color-border)] bg-[var(--color-surface-muted)] text-[var(--color-text)]`
              }
            >
              All topics
            </button>
            {topics.map((topic) => {
              const active = activeTopic === topic.id
              return (
                <button
                  key={topic.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => onTopicChange(topic.id, topic.label)}
                  className={
                    active
                      ? `${chipClass} border-[var(--color-accent-strong)] bg-[var(--color-accent-soft)] text-[var(--color-accent-strong)]`
                      : `${chipClass} border-[var(--color-border)] bg-[var(--color-surface-muted)] text-[var(--color-text)]`
                  }
                >
                  {topic.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-3">
          <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">Content type</p>
          <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Filter research library by content type">
            <button
              type="button"
              aria-pressed={activeType === ALL_TYPES_ID}
              onClick={() => onTypeChange(ALL_TYPES_ID)}
              className={
                activeType === ALL_TYPES_ID
                  ? `${chipClass} border-[var(--color-accent-strong)] bg-[var(--color-accent-soft)] text-[var(--color-accent-strong)]`
                  : `${chipClass} border-[var(--color-border)] bg-[var(--color-surface-muted)] text-[var(--color-text-subtle)]`
              }
            >
              All types
            </button>
            {contentTypes.map((type) => {
              const active = activeType === type
              return (
                <button
                  key={type}
                  type="button"
                  aria-pressed={active}
                  onClick={() => onTypeChange(type)}
                  className={
                    active
                      ? `${chipClass} border-[var(--color-accent-strong)] bg-[var(--color-accent-soft)] text-[var(--color-accent-strong)]`
                      : `${chipClass} border-[var(--color-border)] bg-[var(--color-surface-muted)] text-[var(--color-text-subtle)]`
                  }
                >
                  {type}
                </button>
              )
            })}
          </div>
        </div>

        {activeFilterPills.length > 0 ? (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {activeFilterPills.map((pill) => (
              <button
                key={pill.id}
                type="button"
                onClick={pill.onClear}
                className="inline-flex min-h-8 items-center gap-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-2.5 text-xs text-[var(--color-text)]"
              >
                {pill.label}
                <span aria-hidden="true">x</span>
              </button>
            ))}
          </div>
        ) : null}

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs text-[var(--color-text-subtle)]">
            <span className="font-medium text-[var(--color-text)]">{sortedArticles.length}</span> results
          </p>
          {viewAllHref ? (
            <TrackedLink
              href={viewAllHref}
              eventName="section_cta_clicked"
              eventData={{
                surface_id: surfaceId,
                cta_id: "view_all_research",
                cta_label: viewAllLabel,
                destination: viewAllHref,
              }}
              className="inline-flex min-h-8 items-center gap-1.5 text-xs font-medium text-[var(--color-accent-strong)]"
            >
              {viewAllLabel}
              <ArrowRight className="h-3.5 w-3.5" />
            </TrackedLink>
          ) : null}
        </div>
      </div>

      {visibleArticles.length === 0 ? (
        <div className="mt-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <p className="text-sm text-[var(--color-text-muted)]">No results for this filter combination yet.</p>
        </div>
      ) : (
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} mode="compact" eventSource={`${surfaceId}_filtered`} />
          ))}
        </div>
      )}

      {hiddenCount > 0 ? (
        <p className="mt-3 text-xs text-[var(--color-text-subtle)]">
          Showing {visibleArticles.length} of {sortedArticles.length}.
        </p>
      ) : null}
    </div>
  )
}
