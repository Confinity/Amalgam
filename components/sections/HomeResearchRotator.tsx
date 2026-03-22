"use client"

import { useMemo, useState, useSyncExternalStore } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ArticleCard } from "@/components/cards/ArticleCard"

const MOBILE_QUERY = "(max-width: 767px)"
const FADE_MS = 320

type ResearchCardArticle = {
  slug: string
  title: string
  promise: string
  readTime: string
  bestFor: string
  categoryLabel: string
  contentType?: string
  topicFamily?: string
  published?: string
}

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined") {
        return () => {}
      }

      const mediaQueryList = window.matchMedia(query)
      mediaQueryList.addEventListener("change", onStoreChange)
      return () => mediaQueryList.removeEventListener("change", onStoreChange)
    },
    () => (typeof window !== "undefined" ? window.matchMedia(query).matches : false),
    () => false,
  )
}

function getNextIndex(current: number, step: number, total: number) {
  if (total <= 0) return 0
  return (current + step + total) % total
}

function getWindowItems<T>(items: T[], startIndex: number, count: number) {
  if (items.length === 0 || count <= 0) {
    return []
  }

  return Array.from({ length: count }, (_, offset) => {
    const safeIndex = (startIndex + offset) % items.length
    return items[safeIndex]
  })
}

type HomeResearchRotatorProps = {
  articles: ResearchCardArticle[]
}

export function HomeResearchRotator({ articles }: HomeResearchRotatorProps) {
  const isMobile = useMediaQuery(MOBILE_QUERY)
  const visibleCount = Math.min(isMobile ? 1 : 2, articles.length)
  const canRotate = articles.length > visibleCount
  const step = Math.max(1, visibleCount)
  const deckId = "home-research-rotator-grid"

  const [activeStart, setActiveStart] = useState(0)
  const [transitionKey, setTransitionKey] = useState(0)
  const totalSets = Math.max(1, Math.ceil(articles.length / step))
  const currentSet = Math.min(totalSets, Math.floor(activeStart / step) + 1)

  function moveBy(offset: number) {
    setTransitionKey((current) => current + 1)
    setActiveStart((current) => getNextIndex(current, offset, articles.length))
  }

  function goNext() {
    if (!canRotate) return
    moveBy(step)
  }

  function goPrev() {
    if (!canRotate) return
    moveBy(-step)
  }

  const visibleArticles = useMemo(
    () => getWindowItems(articles, activeStart, visibleCount),
    [activeStart, articles, visibleCount],
  )

  if (visibleArticles.length === 0) {
    return null
  }

  return (
    <div role="region" aria-label="Featured research">
      {canRotate ? (
        <div className="mt-4 flex flex-wrap items-center justify-start gap-1.5 sm:mt-0 sm:justify-end sm:gap-2">
          <p className="sr-only" aria-live="polite">
            Showing set {currentSet} of {totalSets}
          </p>
          <button
            type="button"
            onClick={goPrev}
            aria-controls={deckId}
            className="inline-flex min-h-10 items-center gap-1 rounded-xl border border-tier-soft bg-[color-mix(in_srgb,var(--color-surface)_96%,white_4%)] px-3 text-sm text-[var(--color-text-subtle)] transition-colors hover:text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--color-accent-strong)_48%,white_52%)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)]"
            aria-label="Show previous research"
          >
            <ChevronLeft className="h-4 w-4" />
            Prev
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-controls={deckId}
            className="inline-flex min-h-10 items-center gap-1 rounded-xl border border-tier-soft bg-[color-mix(in_srgb,var(--color-surface)_96%,white_4%)] px-3 text-sm text-[var(--color-text-subtle)] transition-colors hover:text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--color-accent-strong)_48%,white_52%)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)]"
            aria-label="Show next research"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      ) : null}

      <div
        id={deckId}
        key={transitionKey}
        className={`mt-8 grid gap-5 ${isMobile ? "" : "md:grid-cols-2"}`}
        style={{ animation: `fade-in-soft ${FADE_MS}ms cubic-bezier(0.22, 1, 0.36, 1) both` }}
      >
        {visibleArticles.map((article) => (
          <div key={article.slug} className="min-h-[244px] md:min-h-[278px]">
            <ArticleCard
              article={article}
              mode="compact"
              eventSource="home_featured_briefings"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
