"use client"

import { track } from "@vercel/analytics"
import { Button } from "@/components/ui/Button"

const STRATEGY_CALL_HREF = "https://calendly.com/ryan-amalgam-inc/30min"

export function ContactFinalCtaBand() {
  return (
    <section className="section-space bg-[var(--color-surface-dark)]">
      <div className="container-site">
        <div className="mx-auto grid max-w-[980px] gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-center">
          <div>
            <h2 className="text-[var(--color-text-inverse)]">Need a clear next step?</h2>
            <p className="mt-4 max-w-[54ch] text-base text-[color-mix(in_srgb,var(--color-text-inverse)_80%,transparent)]">
              Start with a strategy call or write a quick message.
            </p>
          </div>

          <div className="rounded-2xl border border-[color-mix(in_srgb,var(--color-border)_24%,transparent)] bg-[color-mix(in_srgb,var(--color-surface-dark)_86%,white_14%)] p-5">
            <div className="flex flex-col gap-2.5">
              <Button
                href={STRATEGY_CALL_HREF}
                withArrow
                fullWidth
                onClick={() =>
                  track("strategy_call_clicked", {
                    cta_id: "contact_final_primary",
                    surface_id: "contact_final",
                    location: "contact_final_band",
                    cta_label: "Book a strategy call",
                    destination: STRATEGY_CALL_HREF,
                  })
                }
              >
                Book a strategy call
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
