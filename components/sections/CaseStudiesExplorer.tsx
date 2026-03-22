"use client"

import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"
import { track } from "@vercel/analytics"
import { CaseStudyCard } from "@/components/cards/CaseStudyCard"
import { caseStudies, caseStudyFilters, featuredCaseStudies } from "@/content/caseStudies"

type FilterKey = "problem" | "stage" | "industry" | "service"

type CaseStudiesExplorerProps = {
  showFeaturedSection?: boolean
}

const stageOrder = [
  "Ideate & Prioritize",
  "Validate & De-risk",
  "Build & Ship",
  "Productize & Systemize",
  "Scale & Stabilize",
] as const

const filterConfig: Array<{
  key: FilterKey
  label: string
  allLabel: string
  ariaLabel: string
}> = [
  { key: "problem", label: "Problem", allLabel: "All problems", ariaLabel: "Problem filter" },
  { key: "stage", label: "Stage", allLabel: "All stages", ariaLabel: "Stage filter" },
  { key: "industry", label: "Industry", allLabel: "All industries", ariaLabel: "Industry filter" },
  { key: "service", label: "Service", allLabel: "All services", ariaLabel: "Service filter" },
]

function getStageRank(stage: string) {
  const idx = stageOrder.indexOf(stage as (typeof stageOrder)[number])
  return idx === -1 ? Number.MAX_SAFE_INTEGER : idx
}

export function CaseStudiesExplorer({ showFeaturedSection = true }: CaseStudiesExplorerProps) {
  const [filters, setFilters] = useState<Record<FilterKey, string>>({
    problem: "",
    stage: "",
    industry: "",
    service: "",
  })
  const [showStickyFilters, setShowStickyFilters] = useState(false)
  const filtersRef = useRef<HTMLElement | null>(null)

  function setFilterValue(key: FilterKey, value: string) {
    setFilters((current) => {
      track("case_study_filter_applied", {
        surface_id: "case_studies",
        filter_key: key,
        filter_value: value || "all",
        interaction: "select",
      })

      return {
        ...current,
        [key]: value,
      }
    })
  }

  function clearAllFilters() {
    setFilters({
      problem: "",
      stage: "",
      industry: "",
      service: "",
    })

    track("case_study_filters_cleared", { surface_id: "case_studies" })
  }

  const filtered = useMemo(
    () =>
      caseStudies.filter((study) => {
        if (filters.problem && study.problem !== filters.problem) return false
        if (filters.stage && study.stage !== filters.stage) return false
        if (filters.industry && study.industry !== filters.industry) return false
        if (filters.service && study.service !== filters.service) return false
        return true
      }),
    [filters],
  )

  const activeFilters = useMemo(
    () =>
      (Object.keys(filters) as FilterKey[])
        .filter((key) => Boolean(filters[key]))
        .map((key) => ({ key, value: filters[key] })),
    [filters],
  )

  const hasActiveFilters = activeFilters.length > 0

  useEffect(() => {
    const filterState = activeFilters.map((item) => `${item.key}:${item.value}`).join("|")

    track("case_study_results_viewed", {
      surface_id: "case_studies",
      result_count: filtered.length,
      has_filters: hasActiveFilters,
      filters: filterState || "none",
    })
  }, [activeFilters, filtered.length, hasActiveFilters])

  useEffect(() => {
    function updateStickyState() {
      if (typeof window === "undefined") return

      if (window.innerWidth < 1024) {
        setShowStickyFilters(false)
        return
      }

      const filterSection = filtersRef.current
      if (!filterSection) {
        setShowStickyFilters(false)
        return
      }

      const threshold = filterSection.offsetTop + filterSection.offsetHeight + 8
      setShowStickyFilters(window.scrollY > threshold)
    }

    updateStickyState()

    window.addEventListener("scroll", updateStickyState, { passive: true })
    window.addEventListener("resize", updateStickyState)

    return () => {
      window.removeEventListener("scroll", updateStickyState)
      window.removeEventListener("resize", updateStickyState)
    }
  }, [])

  const featuredStudies = useMemo(
    () => (featuredCaseStudies.length > 0 ? featuredCaseStudies : caseStudies.slice(0, 3)),
    [],
  )

  const featuredIds = useMemo(() => new Set(featuredStudies.map((study) => study.id)), [featuredStudies])

  const sortedLibraryMatches = useMemo(
    () =>
      [...filtered].sort((a, b) => {
        const stageDelta = getStageRank(a.stage) - getStageRank(b.stage)
        if (stageDelta !== 0) return stageDelta
        return a.company.localeCompare(b.company)
      }),
    [filtered],
  )

  const { standardLibraryStudies, compactLibraryStudies } = useMemo(() => {
    const shouldDeprioritizeFeatured = showFeaturedSection && !hasActiveFilters

    if (!shouldDeprioritizeFeatured) {
      const firstRow = sortedLibraryMatches.slice(0, Math.min(6, sortedLibraryMatches.length))
      return {
        standardLibraryStudies: firstRow,
        compactLibraryStudies: sortedLibraryMatches.slice(firstRow.length),
      }
    }

    const nonFeatured = sortedLibraryMatches.filter((study) => !featuredIds.has(study.id))
    const featuredRemainder = sortedLibraryMatches.filter((study) => featuredIds.has(study.id))
    const firstRow = nonFeatured.slice(0, Math.min(6, nonFeatured.length))

    return {
      standardLibraryStudies: firstRow,
      compactLibraryStudies: [...nonFeatured.slice(firstRow.length), ...featuredRemainder],
    }
  }, [featuredIds, hasActiveFilters, showFeaturedSection, sortedLibraryMatches])

  return (
    <>
      {showStickyFilters ? (
        <div className="pointer-events-none fixed inset-x-0 top-[78px] z-40 hidden lg:block">
          <div className="container-site">
            <div className="pointer-events-auto rounded-xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-surface)_95%,white_5%)] px-3 py-2 shadow-[0_8px_16px_rgba(15,23,42,0.08)]">
              <div className="grid grid-cols-[repeat(4,minmax(0,1fr))_auto] items-center gap-2">
                {filterConfig.map((field) => (
                  <label key={field.key} className="block">
                    <span className="sr-only">{field.label}</span>
                    <select
                      aria-label={`${field.ariaLabel} (sticky)`}
                      value={filters[field.key]}
                      onChange={(event) => setFilterValue(field.key, event.target.value)}
                      className="h-10 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 text-xs text-[var(--color-text)]"
                    >
                      <option value="">{field.allLabel}</option>
                      {caseStudyFilters[field.key].map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </label>
                ))}
                <div className="flex items-center justify-end gap-2">
                  <p className="inline-flex min-h-8 items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-2.5 text-[11px] font-medium text-[var(--color-text-muted)]">
                    <span className="mr-1 text-[var(--color-text)]">{filtered.length}</span>
                    <span>matches</span>
                  </p>
                  {hasActiveFilters ? (
                    <button
                      type="button"
                      onClick={clearAllFilters}
                      className="inline-flex min-h-10 items-center rounded-lg border border-[var(--color-border)] px-2.5 py-1.5 text-xs font-medium text-[var(--color-text)] transition-colors hover:bg-[var(--color-surface-muted)]"
                    >
                      Clear all
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <section
        id="case-filters"
        ref={filtersRef}
        className="border-y border-[var(--color-border)] bg-[var(--color-bg)] py-6 md:py-7"
      >
        <div className="container-site">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-3xl font-semibold">Find case studies like yours</h2>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">Pick one or two filters to narrow results.</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="inline-flex min-h-9 items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 text-xs font-medium text-[var(--color-text-muted)]">
                <span className="mr-1 text-[var(--color-text)]">{filtered.length}</span>
                <span>matches</span>
              </p>
              {hasActiveFilters ? (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="inline-flex min-h-11 items-center rounded-lg border border-[var(--color-border)] px-3.5 py-2 text-sm font-medium text-[var(--color-text)] transition-colors hover:bg-[var(--color-surface-muted)]"
                >
                  Clear all
                </button>
              ) : null}
            </div>
          </div>

          <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {filterConfig.map((field) => (
              <label key={field.key} className="block">
                <span className="text-xs font-medium uppercase tracking-[0.08em] text-[var(--color-text-subtle)]">
                  {field.label}
                </span>
                <select
                  aria-label={field.ariaLabel}
                  value={filters[field.key]}
                  onChange={(event) => setFilterValue(field.key, event.target.value)}
                  className="mt-1.5 h-11 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-sm text-[var(--color-text)]"
                >
                  <option value="">{field.allLabel}</option>
                  {caseStudyFilters[field.key].map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
        </div>
      </section>

      {showFeaturedSection && !hasActiveFilters && featuredStudies.length > 0 ? (
        <section className="section-space border-b border-[var(--color-border)] bg-[var(--color-surface)]">
          <div className="container-site">
            <h2>Start with a few proven examples</h2>
            <p className="mt-3 max-w-2xl text-base text-[var(--color-text-muted)]">
              Start with a few real examples, then browse more below.
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {featuredStudies.map((study) => (
                <CaseStudyCard
                  key={study.id}
                  study={study}
                  featured
                  mode="summary"
                  eventSource="case_studies_featured_default"
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {filtered.length === 0 ? (
        <section className="section-space">
          <div className="container-site">
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
              <p className="text-base font-semibold text-[var(--color-text)]">No exact matches yet</p>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                Try one fewer filter, or share your situation and we will point you to the closest case.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[var(--color-border-strong)] px-4 py-2 text-sm font-medium text-[var(--color-text)]"
                >
                  Clear filters
                </button>
                <Link
                  href="/contact"
                  className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-[var(--color-text-inverse)]"
                  onClick={() =>
                    track("strategy_call_clicked", {
                      cta_id: "case_studies_empty_primary",
                      location: "case_studies_empty_state",
                      cta_label: "Get a recommendation",
                      destination: "/contact",
                    })
                  }
                >
                  Get a recommendation
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {filtered.length > 0 ? (
        <section className="section-compact border-t border-[var(--color-border)] bg-[var(--color-surface-muted)]">
          <div className="container-site">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2>Browse all case studies</h2>
              <p className="text-sm text-[var(--color-text-subtle)]">{filtered.length} matches</p>
            </div>

            {standardLibraryStudies.length > 0 ? (
              <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {standardLibraryStudies.map((study) => (
                  <CaseStudyCard
                    key={study.id}
                    study={study}
                    mode="summary"
                    eventSource="case_studies_library_standard"
                  />
                ))}
              </div>
            ) : null}

            {compactLibraryStudies.length > 0 ? (
              <section className="mt-8 border-t border-[var(--color-border)] pt-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h3 className="text-xl font-semibold">More case studies</h3>
                  <p className="text-xs uppercase tracking-[0.08em] text-[var(--color-text-subtle)]">
                    {compactLibraryStudies.length} more
                  </p>
                </div>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {compactLibraryStudies.map((study) => (
                    <CaseStudyCard
                      key={study.id}
                      study={study}
                      mode="compact"
                      eventSource="case_studies_library_compact"
                    />
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        </section>
      ) : null}
    </>
  )
}

