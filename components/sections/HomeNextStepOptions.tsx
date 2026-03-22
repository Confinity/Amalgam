"use client"

import { TrackedButton } from "@/components/ui/TrackedButton"
import { Card } from "@/components/ui/Card"

const surfaceId = "home_final"

export function HomeNextStepOptions() {
  return (
    <section className="section-space relative overflow-hidden border-t border-[var(--color-border)] bg-[linear-gradient(176deg,color-mix(in_srgb,var(--color-surface)_90%,white_10%)_0%,color-mix(in_srgb,var(--color-surface-muted)_72%,white_28%)_100%)]">
      <div className="pointer-events-none absolute -left-16 top-8 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(27,167,161,0.14)_0%,transparent_70%)]" />
      <div className="pointer-events-none absolute -right-12 bottom-6 h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(15,23,42,0.08)_0%,transparent_72%)]" />
      <div className="container-site relative">
        <div className="section-reveal mx-auto max-w-[760px] text-center">
          <h2>Choose your next step.</h2>
          <p className="mx-auto mt-3 max-w-[56ch] text-base text-[var(--color-text-muted)]">
            Start on your own or talk with us directly. Either way, you leave with a clear next move.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-stretch">
          <Card className="section-reveal interactive relative flex h-full min-h-0 lg:min-h-[360px] flex-col overflow-hidden border-tier-emphasis bg-[linear-gradient(168deg,color-mix(in_srgb,var(--color-surface)_94%,white_6%),color-mix(in_srgb,var(--color-accent-soft)_34%,white_66%))] p-6 sm:p-7 md:p-7 shadow-[0_14px_26px_rgba(15,23,42,0.08)] [animation-delay:120ms]">
            <div className="pointer-events-none absolute right-0 top-0 h-32 w-36 rounded-bl-[40px] bg-[radial-gradient(circle_at_100%_0%,rgba(27,167,161,0.14)_0%,transparent_68%)]" />
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h3 className="text-2xl font-semibold">Find your next move</h3>
              <p className="w-fit rounded-full border border-[color-mix(in_srgb,var(--color-accent-strong)_28%,var(--color-border))] bg-[color-mix(in_srgb,var(--color-accent-soft)_70%,white_30%)] px-3 py-1 text-xs font-medium text-[var(--color-accent-strong)]">
                Most teams start here
              </p>
            </div>
            <p className="mt-3 text-base text-[var(--color-text-muted)]">
              Answer a few quick questions and get one practical next step.
            </p>
            <div className="mt-4 space-y-3">
              <div className="brand-key-row">
                <span aria-hidden="true" className="brand-key-dot" />
                <p className="text-sm leading-6 text-[var(--color-text)]">
                  <span className="font-semibold">Best for:</span> Teams that want quick clarity and prefer to start on their own.
                </p>
              </div>
              <div className="brand-key-row">
                <span aria-hidden="true" className="brand-key-dot" />
                <p className="text-sm leading-6 text-[var(--color-text)]">
                  <span className="font-semibold">What you get:</span> Your likely stage, one practical recommendation, and a clear next step.
                </p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">
                How it works
              </p>
              <ol className="mt-2.5 list-decimal space-y-1.5 pl-5 text-sm text-[var(--color-text)] marker:font-medium">
                <li>Tell us what&rsquo;s in the way</li>
                <li>See your likely stage</li>
                <li>Get one practical next step</li>
              </ol>
            </div>

            <div className="mt-auto pt-4 sm:pt-5">
              <TrackedButton
                href="/next-move"
                withArrow
                eventName="final_cta_clicked"
                eventData={{
                  surface_id: surfaceId,
                  cta_id: `${surfaceId}_primary`,
                  cta_label: "Start the quick self-check",
                  cta_variant: "primary",
                  destination: "/next-move",
                  location: "final_cta_band",
                }}
              >
                Start the quick self-check
              </TrackedButton>
              <p className="mt-3 text-sm text-[var(--color-text-subtle)]">Takes 3&ndash;5 minutes.</p>
            </div>
          </Card>

          <Card className="section-reveal interactive flex h-full min-h-0 lg:min-h-[360px] flex-col border-tier-default bg-[color-mix(in_srgb,var(--color-surface)_97%,white_3%)] p-6 sm:p-7 md:p-8 [animation-delay:220ms]">
            <div>
              <h3 className="text-2xl font-semibold">Request a recommendation</h3>
              <p className="mt-3 text-base text-[var(--color-text-muted)]">
                Tell us what&rsquo;s happening and we&rsquo;ll send the best next step.
              </p>
              <div className="mt-4 space-y-3">
                <div className="brand-key-row">
                  <span aria-hidden="true" className="brand-key-dot" />
                  <p className="text-sm leading-6 text-[var(--color-text)]">
                    <span className="font-semibold">Best for:</span> More complex situations where you want direct guidance.
                  </p>
                </div>
                <div className="brand-key-row">
                  <span aria-hidden="true" className="brand-key-dot" />
                  <p className="text-sm leading-6 text-[var(--color-text)]">
                    <span className="font-semibold">What you get:</span> A tailored recommendation from a senior lead, without a long intake.
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm text-[color-mix(in_srgb,var(--color-text-subtle)_84%,var(--color-text)_16%)]">
                Share context &rarr; receive a recommendation within 1&ndash;2 days.
              </p>
            </div>

            <div className="mt-auto border-t border-[color-mix(in_srgb,var(--color-border)_88%,transparent)] pt-5">
              <p className="text-sm text-[color-mix(in_srgb,var(--color-text-subtle)_62%,var(--color-text)_38%)]">
                Used by teams at SoFi, M&amp;T Bank, and Barclays US.
              </p>

              <div className="mt-4">
                <TrackedButton
                  href="/contact"
                  variant="secondary"
                  withArrow
                  eventName="final_cta_clicked"
                  eventData={{
                    surface_id: surfaceId,
                    cta_id: `${surfaceId}_secondary`,
                    cta_label: "Request a recommendation",
                    cta_variant: "secondary",
                    destination: "/contact",
                    location: "final_cta_band",
                  }}
                >
                  Request a recommendation
                </TrackedButton>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

