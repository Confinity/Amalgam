"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, Compass, ShieldCheck } from "lucide-react"
import { summarizeCaseStudyText, type CaseStudy } from "@/lib/case-studies-data"

type CaseStudiesFeaturedGridProps = {
  featuredStudies: CaseStudy[]
}

function shuffle<T>(items: T[]) {
  const next = [...items]

  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[next[index], next[swapIndex]] = [next[swapIndex], next[index]]
  }

  return next
}

export function CaseStudiesFeaturedGrid({ featuredStudies }: CaseStudiesFeaturedGridProps) {
  const [selected, setSelected] = useState(() => featuredStudies.slice(0, 3))

  useEffect(() => {
    setSelected(shuffle(featuredStudies).slice(0, 3))
  }, [featuredStudies])

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {selected.map((study, index) => (
        <Link
          key={study.id}
          href={`/case-studies/${study.slug}`}
          className="card-interactive group flex h-full flex-col rounded-[30px] border border-border bg-background p-7"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                {index === 0 ? "Lead example" : "Featured example"}
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-foreground transition-colors group-hover:text-teal">
                {study.client}
              </h3>
            </div>
            <span className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">
              {study.location}
            </span>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            {summarizeCaseStudyText(study.problem, { maxSentences: 1, maxChars: 150 })}
          </p>
          <div className="mt-6 space-y-3">
            <div className="rounded-2xl border border-border bg-secondary/35 px-4 py-4">
              <div className="flex items-center gap-3">
                <Compass className="h-5 w-5 text-teal" />
                <p className="font-medium text-foreground">What we did</p>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {summarizeCaseStudyText(study.approach, { maxSentences: 1, maxChars: 140 })}
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-secondary/35 px-4 py-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-teal" />
                <p className="font-medium text-foreground">Outcome</p>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-foreground">
                {summarizeCaseStudyText(study.outcome, { maxSentences: 1, maxChars: 140 })}
              </p>
            </div>
          </div>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-teal transition-colors group-hover:text-foreground">
            Read case study
            <ArrowRight className="h-4 w-4" />
          </span>
        </Link>
      ))}
    </div>
  )
}
