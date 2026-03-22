import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

type RouteHighlightItem = {
  label: string
  value: string
  detail: string
  href?: string
}

type RouteHighlightsStripProps = {
  items: RouteHighlightItem[]
  className?: string
}

function HighlightTile({ item }: { item: RouteHighlightItem }) {
  const content = (
    <div className="h-full rounded-2xl border border-[color-mix(in_srgb,var(--color-border)_82%,transparent)] bg-[color-mix(in_srgb,var(--color-surface)_94%,white_6%)] p-4">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-text-subtle)]">
          {item.label}
        </p>
        {item.href ? <ArrowUpRight className="h-4 w-4 text-[var(--color-accent-strong)]" /> : null}
      </div>
      <p className="mt-3 text-lg font-semibold text-[var(--color-text)]">{item.value}</p>
      <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">{item.detail}</p>
    </div>
  )

  if (!item.href) {
    return content
  }

  return (
    <Link href={item.href} prefetch={false} className="interactive block h-full rounded-2xl">
      {content}
    </Link>
  )
}

export function RouteHighlightsStrip({ items, className }: RouteHighlightsStripProps) {
  return (
    <div
      className={cn(
        "support-panel grid gap-3 p-4 md:grid-cols-3 md:p-5",
        className,
      )}
    >
      {items.map((item) => (
        <HighlightTile key={`${item.label}-${item.value}`} item={item} />
      ))}
    </div>
  )
}
