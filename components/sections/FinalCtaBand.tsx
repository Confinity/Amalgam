"use client"

import { usePathname } from "next/navigation"
import { track } from "@vercel/analytics"
import { Button } from "@/components/ui/Button"

type TrackValue = string | number | boolean

type FinalCtaBandProps = {
  headline: string
  support: string
  surfaceId?: string
  tone?: "neutral" | "dark"
  eventData?: Record<string, TrackValue>
  primary: {
    label: string
    href: string
    onClick?: () => void
  }
  secondary?: {
    label: string
    href: string
    onClick?: () => void
  }
}

function toSurfaceKey(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 80)
}

function getSurfaceFromPath(pathname: string) {
  if (pathname === "/") {
    return "home"
  }

  const normalized = pathname.replace(/^\/+|\/+$/g, "")
  return normalized || "unknown"
}

function isStrategyCallCta(label: string, href: string) {
  if (/strategy call/i.test(label)) {
    return true
  }

  if (href.includes("calendly.com/ryan-amalgam-inc/30min")) {
    return true
  }

  if (!href.startsWith("/contact")) {
    return false
  }

  const [, query = ""] = href.split("?")
  const interest = new URLSearchParams(query).get("interest")
  return interest === "strategy-session"
}

export function FinalCtaBand({
  headline,
  support,
  surfaceId,
  tone = "neutral",
  eventData,
  primary,
  secondary,
}: FinalCtaBandProps) {
  const pathname = usePathname() ?? "/"
  const surface = toSurfaceKey(surfaceId ?? `final_cta_${getSurfaceFromPath(pathname)}`)

  function trackFinalCta({
    label,
    href,
    variant,
    ctaId,
  }: {
    label: string
    href: string
    variant: "primary" | "secondary"
    ctaId: string
  }) {
    track("final_cta_clicked", {
      surface_id: surface,
      cta_id: ctaId,
      cta_label: label,
      cta_variant: variant,
      destination: href,
      location: "final_cta_band",
      ...(eventData ?? {}),
    })

    if (isStrategyCallCta(label, href)) {
      track("strategy_call_clicked", {
        surface_id: surface,
        cta_id: ctaId,
        cta_label: label,
        destination: href,
        location: "final_cta_band",
        ...(eventData ?? {}),
      })
    }
  }

  return (
    <section
      id="ynm-final-cta-band"
      className={
        tone === "dark"
          ? "section-space bg-[linear-gradient(176deg,var(--color-surface-dark)_0%,color-mix(in_srgb,var(--color-surface-dark)_84%,#13253a_16%)_100%)]"
          : "section-space border-t border-[var(--color-border)] bg-[linear-gradient(176deg,color-mix(in_srgb,var(--color-surface)_90%,white_10%)_0%,color-mix(in_srgb,var(--color-surface-muted)_72%,white_28%)_100%)]"
      }
    >
      <div className="container-site">
        <div className="mx-auto max-w-[760px] text-center">
          <h2 className={tone === "dark" ? "text-[var(--color-text-inverse)]" : "text-[var(--color-text)]"}>
            {headline}
          </h2>
          <p
            className={
              tone === "dark"
                ? "mx-auto mt-3 max-w-[56ch] text-base text-[color-mix(in_srgb,var(--color-text-inverse)_78%,transparent)]"
                : "mx-auto mt-3 max-w-[56ch] text-base text-[var(--color-text-muted)]"
            }
          >
            {support}
          </p>

          <div className="mt-6 flex justify-center">
            <Button
              href={primary.href}
              withArrow
              onClick={() => {
                trackFinalCta({
                  label: primary.label,
                  href: primary.href,
                  variant: "primary",
                  ctaId: `${surface}_primary`,
                })
                primary.onClick?.()
              }}
            >
              {primary.label}
            </Button>
          </div>
          {secondary ? (
            <div className="mt-3">
              <Button
                href={secondary.href}
                onClick={() => {
                  trackFinalCta({
                    label: secondary.label,
                    href: secondary.href,
                    variant: "secondary",
                    ctaId: `${surface}_secondary`,
                  })
                  secondary.onClick?.()
                }}
                variant="tertiary"
                className={
                  tone === "dark"
                    ? "justify-center text-[color-mix(in_srgb,var(--color-text-inverse)_82%,transparent)] hover:text-[var(--color-text-inverse)]"
                    : "justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                }
              >
                {secondary.label}
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
