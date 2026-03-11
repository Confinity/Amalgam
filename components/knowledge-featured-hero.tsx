"use client"

import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import type { KnowledgeBrief, KnowledgeCategoryId } from "@/lib/knowledge-briefs"

type Category = {
  id: KnowledgeCategoryId
  label: string
}

type KnowledgeFeaturedHeroProps = {
  candidates: readonly KnowledgeBrief[]
  categories: readonly Category[]
}

export function KnowledgeFeaturedHero({
  candidates,
  categories,
}: KnowledgeFeaturedHeroProps) {
  const active = candidates[0] ?? null

  if (!active) {
    return null
  }

  const category = categories.find((item) => item.id === active.category)

  return (
    <div className="relative overflow-hidden rounded-[32px] border border-border bg-background/95 p-7 shadow-sm">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-teal/10 via-transparent to-purple/10" />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-teal">
          <Sparkles className="h-3.5 w-3.5" />
          Featured article
        </span>
        <span className="text-sm text-muted-foreground">{active.readTime}</span>
      </div>
      <p className="mt-6 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
        {category?.label}
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-foreground text-balance">
        {active.title}
      </h2>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{active.description}</p>
      <div className="mt-6 rounded-[24px] border border-border bg-secondary/35 p-4">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
          Why this matters
        </p>
        <p className="mt-2 text-sm leading-relaxed text-foreground">{active.takeaway}</p>
      </div>
      <div className="mt-6">
        {active.keyTakeaways.slice(0, 1).map((item) => (
          <div key={item} className="rounded-2xl border border-border bg-background px-4 py-4 text-sm leading-relaxed text-foreground">
            {item}
          </div>
        ))}
      </div>
      <Link
        href={`/knowledge/${active.slug}`}
        className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-teal transition-colors hover:text-foreground"
      >
        Start with this article
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  )
}
