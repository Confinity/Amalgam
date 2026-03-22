import Image from "next/image"
import { ArrowRight } from "lucide-react"
import type { CaseStudyMeta } from "@/content/caseStudies"
import { TrackedLink } from "@/components/tracked-link"
import { Card } from "@/components/ui/Card"
import { getCaseStudyPath } from "@/lib/case-study-system"
import { withBasePath } from "@/lib/site-config"

type CaseStudyCardProps = {
  study: CaseStudyMeta
  featured?: boolean
  eventSource?: string
  mode?: "expanded" | "summary" | "compact" | "preview"
}

export function CaseStudyCard({
  study,
  featured = false,
  eventSource = "case_study_card",
  mode = "expanded",
}: CaseStudyCardProps) {
  const isLogoStyleImage = study.source.heroImageSrc.startsWith("/clients/")
  const showExpanded = mode === "expanded"
  const showSummary = mode === "summary"
  const showCompact = mode === "compact"
  const showPreview = mode === "preview"
  const cardLabel = showCompact ? "Read case" : "Read case study"

  return (
    <Card
      as={TrackedLink}
      href={getCaseStudyPath(study.slug)}
      eventName="case_study_opened"
      eventData={{
        source: eventSource,
        slug: study.slug,
        problem: study.problem,
        stage: study.stage,
      }}
      variant={featured ? "primary" : "secondary"}
      interactive
      className="group flex h-full flex-col"
    >
      <div
        className={`overflow-hidden rounded-2xl border border-tier-default ${
          isLogoStyleImage
            ? "bg-[linear-gradient(164deg,rgba(255,255,255,0.96),rgba(243,245,247,0.86))] p-3"
            : "bg-[var(--color-surface)] p-3"
        }`}
      >
        {isLogoStyleImage ? (
          <div className="flex aspect-[16/10] items-center justify-center rounded-xl border border-tier-soft bg-[linear-gradient(160deg,color-mix(in_srgb,var(--color-accent-soft)_42%,white_58%),color-mix(in_srgb,var(--color-surface)_84%,white_16%))] p-4 sm:p-5">
            <Image
              src={withBasePath(study.source.heroImageSrc)}
              alt={study.source.heroImageAlt}
              width={880}
              height={520}
              className="h-full max-h-[108px] w-full object-contain object-center"
            />
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-tier-soft">
            <Image
              src={withBasePath(study.source.heroImageSrc)}
              alt={study.source.heroImageAlt}
              width={880}
              height={520}
              className={`h-auto w-full object-cover ${showCompact ? "aspect-[16/9]" : "aspect-[16/10]"}`}
            />
          </div>
        )}
      </div>

      <div className={`flex flex-wrap gap-2 text-xs ${showCompact ? "mt-4" : "mt-5"}`}>
        <span className="rounded-full border border-tier-emphasis bg-[color-mix(in_srgb,var(--color-accent-soft)_62%,white_38%)] px-2.5 py-1 text-[var(--color-accent-strong)]">
          {study.problem}
        </span>
        {!showCompact && !showPreview ? (
          <span className="rounded-full border border-tier-soft px-2.5 py-1 text-[var(--color-text-subtle)]">
            {study.stage}
          </span>
        ) : null}
        {showExpanded ? (
          <span className="rounded-full border border-tier-soft px-2.5 py-1 text-[var(--color-text-subtle)]">
            {study.service}
          </span>
        ) : null}
      </div>

      <h3 className={`font-semibold ${showCompact ? "mt-3 text-xl" : "mt-4 text-2xl"}`}>{study.company}</h3>
      <p className="copy-clamp-3 mt-2 text-sm leading-6 text-[color-mix(in_srgb,var(--color-text-subtle)_84%,var(--color-text)_16%)]">
        {showCompact || showPreview ? study.context : study.source.headline}
      </p>

      {showExpanded ? (
        <div className="mt-4 space-y-3 rounded-2xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-surface-muted)_72%,white_28%)] p-4">
          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">Situation</p>
            <p className="mt-1.5 text-sm text-[var(--color-text)]">{study.context}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">Challenge</p>
            <p className="mt-1.5 text-sm text-[var(--color-text)]">{study.challenge}</p>
          </div>
          <div className="rounded-xl border border-tier-emphasis bg-[color-mix(in_srgb,var(--color-accent-soft)_48%,white_52%)] p-3">
            <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-accent-strong)]">What changed</p>
            <p className="copy-clamp-3 mt-1.5 text-sm font-medium text-[var(--color-text)]">{study.whatMovedForward}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">Why it mattered</p>
            <p className="mt-1.5 text-sm text-[var(--color-text)]">{study.whyMattered}</p>
          </div>
        </div>
      ) : null}

      {showSummary ? (
        <div className="mt-4 rounded-xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-surface-muted)_62%,white_38%)] p-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--color-text-subtle)]">Situation</p>
          <p className="mt-1 text-sm text-[var(--color-text)]">{study.context}</p>
          <div className="mt-2 rounded-lg border border-tier-emphasis bg-[color-mix(in_srgb,var(--color-accent-soft)_44%,white_56%)] p-2.5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--color-accent-strong)]">What changed</p>
            <p className="copy-clamp-3 mt-1 text-sm font-medium text-[var(--color-text)]">{study.whatMovedForward}</p>
          </div>
        </div>
      ) : null}

      {showPreview ? (
        <div className="mt-4 rounded-xl border border-tier-emphasis bg-[color-mix(in_srgb,var(--color-accent-soft)_38%,white_62%)] p-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--color-accent-strong)]">Outcome</p>
          <p className="copy-clamp-3 mt-1 text-sm font-semibold text-[var(--color-text)]">{study.whatMovedForward}</p>
        </div>
      ) : null}

      {showCompact ? (
        <p className="mt-3 rounded-xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-surface-muted)_58%,white_42%)] px-3 py-2 text-sm font-medium text-[var(--color-text)]">
          {study.whatMovedForward}
        </p>
      ) : null}

      <span className={`mt-auto inline-flex items-center gap-2 text-sm font-medium text-[var(--color-accent-strong)] ${showCompact ? "pt-4" : "pt-6"}`}>
        {cardLabel}
        <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
      </span>
    </Card>
  )
}
