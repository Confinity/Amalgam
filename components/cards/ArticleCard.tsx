import { ArrowRight } from "lucide-react"
import { TrackedLink } from "@/components/tracked-link"
import { Card } from "@/components/ui/Card"

type ArticleCardProps = {
  article: {
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
  featured?: boolean
  eventSource?: string
  mode?: "default" | "compact"
}

export function ArticleCard({
  article,
  featured = false,
  eventSource = "article_card",
  mode = "default",
}: ArticleCardProps) {
  const compact = mode === "compact"
  const topicLabel = article.topicFamily ?? article.categoryLabel
  const contentTypeLabel = article.contentType ?? "Research Brief"
  const freshnessLabel = article.published ?? "Current"
  const ctaLabel =
    contentTypeLabel === "Field Note"
      ? "Read field note"
      : contentTypeLabel === "Method"
        ? "Use this method"
        : contentTypeLabel === "Research Brief" || contentTypeLabel === "Deep Report"
          ? "Read brief"
          : "Read research"

  return (
    <Card
      as={TrackedLink}
      href={`/research/${article.slug}`}
      eventName="article_opened"
      eventData={{ source: eventSource, slug: article.slug, category: article.categoryLabel }}
      variant={featured ? "primary" : "secondary"}
      interactive
      className="group flex h-full flex-col"
    >
      <div className="flex flex-wrap items-center gap-2">
        <p className="inline-flex min-h-7 items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-2.5 text-[11px] font-medium text-[var(--color-text-subtle)]">
          {topicLabel}
        </p>
        <span className="inline-flex min-h-7 items-center rounded-full border border-[color-mix(in_srgb,var(--color-accent)_34%,var(--color-border))] bg-[color-mix(in_srgb,var(--color-accent-soft)_74%,white_26%)] px-2.5 text-[11px] font-medium text-[var(--color-accent-strong)]">
          {contentTypeLabel}
        </span>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-[var(--color-text-subtle)]">
        <span>{freshnessLabel}</span>
        <span aria-hidden="true">|</span>
        <span>{article.readTime}</span>
      </div>

      <h3 className={`font-semibold ${compact ? "mt-3 text-xl" : "mt-4 text-2xl"}`}>{article.title}</h3>
      <p className={`copy-clamp-3 text-sm leading-6 text-[var(--color-text-muted)] ${compact ? "mt-2" : "mt-3"}`}>
        {article.promise}
      </p>

      <span className={`inline-flex items-center gap-2 text-sm font-medium text-[var(--color-accent-strong)] ${compact ? "mt-4" : "mt-5"}`}>
        {ctaLabel}
        <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
      </span>
    </Card>
  )
}


