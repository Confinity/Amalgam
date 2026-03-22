"use client"

import { useEffect, useState } from "react"
import { TrackedLink } from "@/components/tracked-link"
import type { CaseStudyOutlineItem } from "@/lib/case-study-system"
import { cn } from "@/lib/utils"

type CaseStudyOutlineProps = {
  items: ReadonlyArray<CaseStudyOutlineItem>
  slug: string
  pageSource: string
  mode: "desktop" | "mobile"
}

function getSectionId(href: string) {
  return href.replace(/^#/, "")
}

export function CaseStudyOutline({
  items,
  slug,
  pageSource,
  mode,
}: CaseStudyOutlineProps) {
  const [activeHref, setActiveHref] = useState(items[0]?.href ?? "")

  useEffect(() => {
    if (items.length === 0) {
      return
    }

    const updateActive = () => {
      const offset = mode === "desktop" ? 190 : 140
      let nextActive = items[0]!.href

      for (const item of items) {
        const element = document.getElementById(getSectionId(item.href))
        if (!element) {
          continue
        }

        const rect = element.getBoundingClientRect()
        if (rect.top <= offset) {
          nextActive = item.href
          continue
        }

        break
      }

      setActiveHref((value) => (value === nextActive ? value : nextActive))
    }

    updateActive()
    window.addEventListener("scroll", updateActive, { passive: true })
    window.addEventListener("resize", updateActive)
    window.addEventListener("hashchange", updateActive)

    return () => {
      window.removeEventListener("scroll", updateActive)
      window.removeEventListener("resize", updateActive)
      window.removeEventListener("hashchange", updateActive)
    }
  }, [items, mode])

  const linkClassName =
    mode === "desktop"
      ? "inline-flex min-h-11 w-full items-center rounded-xl px-3 py-2 text-sm transition-colors"
      : "interactive block min-h-11 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 text-sm"

  const eventSource = mode === "desktop" ? "case_study_toc_desktop" : "case_study_toc_mobile"

  if (mode === "mobile") {
    return (
      <details className="group rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-4">
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-[var(--color-text)]">
          <span>Jump to section</span>
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[var(--color-border)] text-sm text-[var(--color-text-subtle)] transition-transform group-open:rotate-45">
            +
          </span>
        </summary>
        <ol className="mt-3 space-y-2 border-t border-[var(--color-border)] pt-3">
          {items.map((item) => {
            const isActive = item.href === activeHref

            return (
              <li key={`mobile-${item.href}`}>
                <TrackedLink
                  href={item.href}
                  eventName="our_work_section_jump_clicked"
                  eventData={{
                    source: eventSource,
                    page_source: pageSource,
                    slug,
                    section: getSectionId(item.href),
                  }}
                  onClick={() => setActiveHref(item.href)}
                  className={cn(
                    linkClassName,
                    isActive
                      ? "border-[color-mix(in_srgb,var(--color-accent)_32%,var(--color-border))] bg-[color-mix(in_srgb,var(--color-accent-soft)_68%,white_32%)] text-[var(--color-text)]"
                      : "text-[var(--color-text)]",
                  )}
                >
                  {item.label}
                </TrackedLink>
              </li>
            )
          })}
        </ol>
      </details>
    )
  }

  return (
    <nav className="mt-3">
      <ul className="space-y-1.5">
        {items.map((item) => {
          const isActive = item.href === activeHref

          return (
            <li key={item.href}>
              <TrackedLink
                href={item.href}
                eventName="our_work_section_jump_clicked"
                eventData={{
                  source: eventSource,
                  page_source: pageSource,
                  slug,
                  section: getSectionId(item.href),
                }}
                onClick={() => setActiveHref(item.href)}
                className={cn(
                  linkClassName,
                  isActive
                    ? "bg-[color-mix(in_srgb,var(--color-accent-soft)_78%,white_22%)] text-[var(--color-text)]"
                    : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text)]",
                )}
              >
                <span
                  className={cn(
                    "mr-3 h-2 w-2 rounded-full transition-colors",
                    isActive
                      ? "bg-[var(--color-accent-strong)]"
                      : "bg-[color-mix(in_srgb,var(--color-border-strong)_76%,white_24%)]",
                  )}
                />
                <span>{item.label}</span>
              </TrackedLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
