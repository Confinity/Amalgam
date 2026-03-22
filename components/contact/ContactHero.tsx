"use client"

import { track } from "@vercel/analytics"
import { Button } from "@/components/ui/Button"

const STRATEGY_CALL_HREF = "https://calendly.com/ryan-amalgam-inc/30min"

const responsePoints = [
  "A direct reply within one business day",
  "A recommendation on the clearest next step",
  "A strategy call if talking live would help faster",
] as const

export function ContactHero() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--color-border)] hero-page-soft pt-[162px] pb-[66px] md:pt-[182px] md:pb-[82px] lg:pt-[194px] lg:pb-[94px]">
      <div className="pointer-events-none absolute -top-28 left-1/2 h-72 w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(27,167,161,0.1)_0%,transparent_74%)]" />
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <div className="max-w-[44rem]">
            <h1 className="text-[clamp(34px,4.1vw,48px)] leading-[1.06]">
              What is slowing your team down right now?
            </h1>
            <p className="mt-5 max-w-[62ch] text-lg text-[var(--color-text-muted)]">
              Tell us what is happening, where progress is stalling, and what kind of clarity you
              need. We will respond directly and recommend the cleanest next move.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                href="#contact-intake"
                withArrow
                className="sm:min-w-[220px]"
                onClick={() =>
                  track("section_cta_clicked", {
                    cta_id: "contact_hero_write_message",
                    surface_id: "contact_hero",
                    location: "contact_hero",
                    cta_label: "Write a message",
                    destination: "#contact-intake",
                  })
                }
              >
                Write a message
              </Button>
              <a
                href={STRATEGY_CALL_HREF}
                className="inline-flex min-h-11 items-center text-sm font-medium text-[var(--color-text-muted)] underline underline-offset-4 hover:text-[var(--color-text)]"
                onClick={() =>
                  track("strategy_call_clicked", {
                    cta_id: "contact_hero_secondary_call",
                    surface_id: "contact_hero",
                    location: "contact_hero",
                    cta_label: "Book a strategy call",
                    destination: STRATEGY_CALL_HREF,
                  })
                }
              >
                Prefer live? Book a strategy call
              </a>
            </div>
          </div>

          <div className="card-primary p-6 md:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-accent-strong)]">
              What happens after you reach out
            </p>
            <ul className="mt-4 space-y-2.5">
              {responsePoints.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm text-[var(--color-text)]">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--color-accent-strong)]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-[var(--color-text-muted)]">Prefer email first? Send a note to</p>
            <a
              href="mailto:hello@amalgam-inc.com"
              className="mt-1 inline-flex min-h-11 items-center font-medium text-[var(--color-text)] underline underline-offset-4"
              onClick={() =>
                track("contact_channel_clicked", {
                  channel: "email",
                  location: "contact_hero",
                })
              }
            >
              hello@amalgam-inc.com
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
