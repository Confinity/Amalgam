"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { summarizeCaseStudyText, type CaseStudy } from "@/lib/case-studies-data"

type HomeFeaturedCaseStudiesProps = {
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

export function HomeFeaturedCaseStudies({ featuredStudies }: HomeFeaturedCaseStudiesProps) {
  const [selected, setSelected] = useState(() => featuredStudies.slice(0, 3))

  useEffect(() => {
    setSelected(shuffle(featuredStudies).slice(0, 3))
  }, [featuredStudies])

  const [flagship, ...supporting] = selected

  if (!flagship) {
    return null
  }

  return (
    <div className="grid gap-7">
      <Link
        href={`/case-studies/${flagship.slug}`}
        className="card-interactive group grid min-w-0 gap-7 rounded-[34px] border border-border bg-background p-8 lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] lg:p-9"
      >
        <div className="min-w-0">
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-teal">
            Featured case
          </p>
          <h3 className="text-2xl font-semibold text-foreground transition-colors group-hover:text-teal">
            {flagship.client}
          </h3>
          <p className="mt-3 text-sm font-medium text-muted-foreground">
            {flagship.industry}
          </p>
          <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-muted-foreground">
            {summarizeCaseStudyText(flagship.problem, { maxSentences: 1, maxChars: 180 })}
          </p>
        </div>
        <div className="support-panel min-w-0 rounded-[26px] p-6">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
            What changed
          </p>
          <p className="mt-3 text-sm leading-relaxed text-foreground">
            {summarizeCaseStudyText(flagship.outcome, { maxSentences: 1, maxChars: 170 })}
          </p>
        </div>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-foreground transition-colors group-hover:text-teal">
          Read case study
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </Link>

      <div className="grid gap-6 md:grid-cols-2">
        {supporting.map((study) => (
          <Link
            key={study.id}
            href={`/case-studies/${study.slug}`}
            className="card-interactive group rounded-[28px] border border-border bg-background p-6"
          >
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-teal">
              {study.industry}
            </p>
            <h3 className="mb-3 text-xl font-semibold text-foreground transition-colors group-hover:text-teal">
              {study.client}
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              {summarizeCaseStudyText(study.problem, { maxSentences: 1, maxChars: 145 })}
            </p>
            <div className="support-panel rounded-[22px] p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                Outcome
              </p>
              <p className="mt-2 text-sm leading-relaxed text-foreground">
                {summarizeCaseStudyText(study.outcome, { maxSentences: 1, maxChars: 145 })}
              </p>
            </div>
            <span className="inline-flex items-center gap-1 pt-5 text-sm font-medium text-foreground transition-colors group-hover:text-teal">
              Read case study
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
