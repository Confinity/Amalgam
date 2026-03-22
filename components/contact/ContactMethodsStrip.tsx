"use client"

import { Mail, MapPin, Phone, TimerReset } from "lucide-react"
import { track } from "@vercel/analytics"

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@amalgam-inc.com",
    href: "mailto:hello@amalgam-inc.com",
    channel: "email",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 484-354-8498",
    href: "tel:+14843548498",
    channel: "phone",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Chesterbrook, PA",
  },
  {
    icon: TimerReset,
    label: "Response",
    value: "Within one business day",
  },
] as const

export function ContactMethodsStrip() {
  return (
    <section className="section-tight border-y border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-surface-muted)_72%,white_28%)]">
      <div className="container-site grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {contactItems.map((item) => {
          const Icon = item.icon
          const content = (
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <div className="flex items-start gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--color-accent-strong)_18%,var(--color-border))] bg-[color-mix(in_srgb,var(--color-accent-soft)_72%,white_28%)]">
                  <Icon className="h-4.5 w-4.5 text-[var(--color-accent-strong)]" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm font-medium text-[var(--color-text)]">{item.value}</p>
                </div>
              </div>
            </div>
          )

          if (!("href" in item) || !item.href) {
            return <div key={item.label}>{content}</div>
          }

          return (
            <a
              key={item.label}
              href={item.href}
              className="interactive block rounded-2xl"
              onClick={() =>
                track("contact_channel_clicked", {
                  channel: item.channel,
                  location: "contact_methods_strip",
                })
              }
            >
              {content}
            </a>
          )
        })}
      </div>
    </section>
  )
}
