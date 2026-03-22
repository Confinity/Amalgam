"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { track } from "@vercel/analytics"

type AnalyticsValue = string | number | boolean

type ArticleReadingProgressProps = {
  targetId: string
  eventName?: string
  eventData?: Record<string, AnalyticsValue>
  milestones?: ReadonlyArray<number>
}

const defaultMilestones = [25, 50, 75, 100] as const

export function ArticleReadingProgress({
  targetId,
  eventName,
  eventData,
  milestones = defaultMilestones,
}: ArticleReadingProgressProps) {
  const [progress, setProgress] = useState(0)
  const frameRef = useRef<number | null>(null)
  const trackedMilestonesRef = useRef<Set<number>>(new Set())
  const milestoneSteps = useMemo(
    () =>
      [...new Set(milestones.filter((value) => value > 0 && value <= 100))]
        .sort((a, b) => a - b),
    [milestones],
  )

  useEffect(() => {
    trackedMilestonesRef.current.clear()
  }, [targetId, eventName, milestoneSteps])

  useEffect(() => {
    const updateProgress = () => {
      if (frameRef.current !== null) {
        return
      }

      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null

        const target = document.getElementById(targetId)
        if (!target) {
          setProgress((value) => (value === 0 ? value : 0))
          return
        }

        const rect = target.getBoundingClientRect()
        const total = Math.max(1, rect.height - window.innerHeight * 0.45)
        const scrolled = Math.min(total, Math.max(0, -rect.top + window.innerHeight * 0.18))
        const nextProgress = Math.round((scrolled / total) * 100)
        setProgress((value) => (value === nextProgress ? value : nextProgress))
      })
    }

    updateProgress()
    window.addEventListener("scroll", updateProgress, { passive: true })
    window.addEventListener("resize", updateProgress)

    return () => {
      window.removeEventListener("scroll", updateProgress)
      window.removeEventListener("resize", updateProgress)
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current)
      }
    }
  }, [targetId])

  useEffect(() => {
    if (!eventName || progress <= 0) {
      return
    }

    for (const milestone of milestoneSteps) {
      if (progress < milestone || trackedMilestonesRef.current.has(milestone)) {
        continue
      }

      trackedMilestonesRef.current.add(milestone)
      track(eventName, {
        target_id: targetId,
        depth_percent: milestone,
        ...(eventData ?? {}),
      })
    }
  }, [eventData, eventName, milestoneSteps, progress, targetId])

  return (
    <div className="pointer-events-none fixed inset-x-0 top-[72px] z-40 h-1 bg-[color-mix(in_srgb,var(--color-border)_70%,transparent)]">
      <div
        className="h-full bg-[linear-gradient(90deg,var(--color-accent-strong)_0%,var(--color-accent)_62%,color-mix(in_srgb,var(--color-accent)_64%,var(--color-focus)_36%)_100%)] transition-[width] duration-150"
        style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
        aria-hidden="true"
      />
    </div>
  )
}

