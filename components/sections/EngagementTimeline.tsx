import { engagementTimeline } from "@/content/offers"
import { TrackedButton } from "@/components/ui/TrackedButton"
import { Card } from "@/components/ui/Card"
import { cn } from "@/lib/utils"

type EngagementTimelineProps = {
  className?: string
  supportClassName?: string
}

export function EngagementTimeline({ className, supportClassName }: EngagementTimelineProps) {
  return (
    <section
      className={cn(
        "section-space border-y border-[var(--color-border)] bg-[var(--color-surface-muted)]",
        className,
      )}
    >
      <div className="container-site">
        <h2 className="mx-auto max-w-[24ch] text-center">How we can support you right now</h2>
        <p className={cn("copy-support-strong mx-auto mt-4 max-w-2xl text-center text-base", supportClassName)}>
          Choose the kind of help that fits where you are right now.
        </p>

        <div className="mt-11 grid gap-5 lg:grid-cols-3">
          {engagementTimeline.map((step, index) => (
            <Card
              key={step.id}
              variant={index === 0 ? "primary" : "secondary"}
              className={
                index === 0
                  ? "flex h-full min-h-[380px] flex-col border-tier-emphasis shadow-[0_16px_34px_rgba(15,23,42,0.08)]"
                  : "flex h-full min-h-[380px] flex-col"
              }
            >
              {index === 0 ? (
                <span className="w-fit rounded-full border border-[color-mix(in_srgb,var(--color-accent-strong)_30%,transparent)] bg-[var(--color-accent-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-accent-strong)]">
                  Recommended first step
                </span>
              ) : null}

              <h3 className="mt-4 text-2xl font-semibold lg:min-h-[3.1rem]">{step.title}</h3>
              <p className="mt-2 text-sm font-semibold text-[var(--color-accent-strong)] lg:min-h-[2.5rem]">
                {step.contextLine}
              </p>
              <p className="copy-clamp-3 mt-2.5 text-sm leading-6 text-[var(--color-text-muted)] lg:min-h-[4.75rem]">
                {step.summary}
              </p>

              <ul className="mt-4 space-y-1.5 lg:min-h-[5.25rem]">
                {step.whatYouGet.slice(0, 2).map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[var(--color-text)]">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--color-accent-strong)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 space-y-2 text-xs text-[var(--color-text-subtle)] lg:min-h-[5.75rem]">
                <p className="leading-5">
                  <span className="font-semibold text-[var(--color-text)]">Best when:</span> {step.bestWhen}
                </p>
                <p className="leading-5">
                  <span className="font-semibold text-[var(--color-text)]">Typical scope:</span> {step.typicalScope}
                </p>
              </div>

              <div className="flex-1" />
              <TrackedButton
                href={step.href}
                withArrow
                className="mt-6"
                eventName={step.href.startsWith("/contact") ? "strategy_call_clicked" : "section_cta_clicked"}
                eventData={{
                  surface_id: "engagement_timeline",
                  cta_id: `engagement_timeline_${step.id}`,
                  cta_label: step.ctaLabel,
                  cta_variant: "primary",
                  destination: step.href,
                  step_id: step.id,
                }}
              >
                {step.ctaLabel}
              </TrackedButton>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
