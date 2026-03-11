"use client"

import { useEffect, useState } from "react"

type ArticleReadingProgressProps = {
  targetId: string
}

export function ArticleReadingProgress({ targetId }: ArticleReadingProgressProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const target = document.getElementById(targetId)
      if (!target) {
        setProgress(0)
        return
      }

      const rect = target.getBoundingClientRect()
      const total = Math.max(1, rect.height - window.innerHeight * 0.45)
      const scrolled = Math.min(total, Math.max(0, -rect.top + window.innerHeight * 0.18))
      setProgress(Math.round((scrolled / total) * 100))
    }

    updateProgress()
    window.addEventListener("scroll", updateProgress, { passive: true })
    window.addEventListener("resize", updateProgress)

    return () => {
      window.removeEventListener("scroll", updateProgress)
      window.removeEventListener("resize", updateProgress)
    }
  }, [targetId])

  return (
    <div className="pointer-events-none fixed inset-x-0 top-[72px] z-40 hidden h-1 bg-border/70 md:block">
      <div
        className="h-full bg-gradient-to-r from-teal via-teal/85 to-purple/80 transition-[width] duration-150"
        style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
        aria-hidden="true"
      />
    </div>
  )
}

