"use client"

import { useMemo, useState, useSyncExternalStore } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { CaseStudyMeta } from "@/content/caseStudies"
import { CaseStudyCard } from "@/components/cards/CaseStudyCard"

const MOBILE_QUERY = "(max-width: 767px)"
const FADE_MS = 340

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

type HomeCaseStudyRotatorProps = {
  studies: CaseStudyMeta[]
}

export function HomeCaseStudyRotator({ studies }: HomeCaseStudyRotatorProps) {
  const isMobile = useMediaQuery(MOBILE_QUERY)
  const visibleCount = Math.min(isMobile ? 1 : 3, studies.length)
  const canRotate = studies.length > visibleCount
  const step = Math.max(1, visibleCount)
  const deckId = "home-case-study-rotator-grid"

  const [activeStart, setActiveStart] = useState(0)
  const [transitionKey, setTransitionKey] = useState(0)
  const totalSets = Math.max(1, Math.ceil(studies.length / step))
  const currentSet = Math.min(totalSets, Math.floor(activeStart / step) + 1)

  function moveBy(offset: number) {
    setTransitionKey((current) => current + 1)
    setActiveStart((current) => getNextIndex(current, offset, studies.length))
  }

  function goNext() {
    if (!canRotate) return
    moveBy(step)
  }

  function goPrev() {
    if (!canRotate) return
    moveBy(-step)
  }

  const visibleStudies = useMemo(
    () => getWindowItems(studies, activeStart, visibleCount),
    [activeStart, studies, visibleCount],
  )

  if (visibleStudies.length === 0) {
    return null
  }

  return (
    <div role="region" aria-label="Featured case studies">
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
            aria-label="Show previous case studies"
          >
            <ChevronLeft className="h-4 w-4" />
            Prev
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-controls={deckId}
            className="inline-flex min-h-10 items-center gap-1 rounded-xl border border-tier-soft bg-[color-mix(in_srgb,var(--color-surface)_96%,white_4%)] px-3 text-sm text-[var(--color-text-subtle)] transition-colors hover:text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--color-accent-strong)_48%,white_52%)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)]"
            aria-label="Show next case studies"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      ) : null}

      <div
        id={deckId}
        key={transitionKey}
        className={`mt-9 grid gap-5 ${isMobile ? "" : "lg:grid-cols-3 lg:auto-rows-fr"}`}
        style={{ animation: `fade-in-soft ${FADE_MS}ms cubic-bezier(0.22, 1, 0.36, 1) both` }}
      >
        {visibleStudies.map((study) => (
          <div key={study.slug} className="h-full min-h-[470px] lg:min-h-[510px]">
            <CaseStudyCard
              study={study}
              mode="preview"
              eventSource="home_featured_case_studies"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
