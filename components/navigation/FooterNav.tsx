"use client"

import Link from "next/link"
import { track } from "@vercel/analytics"
import { BrandLogo } from "@/components/brand-logo"
import { Button } from "@/components/ui/Button"
import { TrackedLink } from "@/components/tracked-link"

type FooterNavProps = {
  primaryCtaLabel?: string
  primaryCtaHref?: string
}

const exploreLinks = [
  { label: "What we offer", href: "/services", location: "footer_desktop_explore" },
  { label: "Case studies", href: "/our-work", location: "footer_desktop_explore" },
  { label: "Your Next Move", href: "/next-move", location: "footer_desktop_explore" },
] as const

const researchCompanyLinks = [
  { label: "Research", href: "/research", location: "footer_desktop_research_company" },
  { label: "Who we are", href: "/about", location: "footer_desktop_research_company" },
  { label: "Meet our team", href: "/team", location: "footer_desktop_research_company" },
  { label: "Build with us", href: "/careers", location: "footer_desktop_research_company" },
] as const

export function FooterNav({
  primaryCtaLabel = "Get a recommendation",
  primaryCtaHref = "/contact",
}: FooterNavProps) {
  const legal = [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms", href: "/terms-and-conditions" },
    { label: "Cookies", href: "/cookie-policy" },
  ]

  return (
    <footer className="border-t border-[var(--color-border-strong)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-surface)_90%,white_10%)_0%,color-mix(in_srgb,var(--color-surface-muted)_62%,white_38%)_100%)]">
      <div className="container-site py-16 md:py-[4.5rem]">
        <div className="mx-auto max-w-[1120px]">
          <div className="grid items-start gap-y-10 md:grid-cols-2 md:gap-x-10 lg:grid-cols-[minmax(300px,1.34fr)_minmax(170px,0.78fr)_minmax(210px,0.94fr)_minmax(220px,0.82fr)] lg:gap-x-9 xl:gap-x-10">
            <div className="max-w-[36ch]">
              <BrandLogo className="h-8 w-auto" />
              <p className="mt-5 text-sm leading-6 text-[color-mix(in_srgb,var(--color-text-muted)_76%,var(--color-text)_24%)]">
                We help teams make clearer delivery decisions under pressure.
              </p>
            </div>

            <div>
              <h3 className="text-[1rem] font-semibold tracking-[-0.01em] text-[color-mix(in_srgb,var(--color-text)_94%,black_6%)]">Explore</h3>
              <ul className="mt-3.5 grid gap-1.5">
                {exploreLinks.map((item) => (
                  <li key={item.href}>
                    <TrackedLink
                      prefetch={false}
                      href={item.href}
                      eventName="navigation_link_clicked"
                      eventData={{ location: item.location, href: item.href, link_label: item.label }}
                      className="inline-flex min-h-8 items-center px-0.5 text-sm leading-6 text-[color-mix(in_srgb,var(--color-text-muted)_80%,var(--color-text)_20%)] underline-offset-4 hover:text-[var(--color-text)] hover:underline"
                    >
                      {item.label}
                    </TrackedLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[1rem] font-semibold tracking-[-0.01em] text-[color-mix(in_srgb,var(--color-text)_94%,black_6%)]">Research & Company</h3>
              <ul className="mt-3.5 grid gap-1.5">
                {researchCompanyLinks.map((item) => (
                  <li key={item.href}>
                    <TrackedLink
                      prefetch={false}
                      href={item.href}
                      eventName="navigation_link_clicked"
                      eventData={{ location: item.location, href: item.href, link_label: item.label }}
                      className="inline-flex min-h-8 items-center px-0.5 text-sm leading-6 text-[color-mix(in_srgb,var(--color-text-muted)_80%,var(--color-text)_20%)] underline-offset-4 hover:text-[var(--color-text)] hover:underline"
                    >
                      {item.label}
                    </TrackedLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="max-w-[30ch]">
              <h3 className="text-[1rem] font-semibold tracking-[-0.01em] text-[color-mix(in_srgb,var(--color-text)_94%,black_6%)]">Talk with us</h3>
              <p className="mt-3.5 text-sm leading-6 text-[color-mix(in_srgb,var(--color-text-muted)_76%,var(--color-text)_24%)]">
                Tell us what&apos;s happening. We&apos;ll reply in one business day with a clear next step.
              </p>

              <Button
                href={primaryCtaHref}
                className="mt-3.5 min-h-10 px-4 py-2 text-sm"
                onClick={() =>
                  track("strategy_call_clicked", {
                    cta_id: "footer_utility_primary",
                    location: "footer_utility",
                    cta_label: primaryCtaLabel,
                    destination: primaryCtaHref,
                  })
                }
              >
                {primaryCtaLabel}
              </Button>

              <p className="mt-2.5 text-xs leading-5 text-[color-mix(in_srgb,var(--color-text-subtle)_80%,var(--color-text-muted)_20%)]">
                Prefer email:{" "}
                <a
                  href="mailto:hello@amalgam-inc.com"
                  className="font-medium text-[var(--color-text-muted)] underline underline-offset-4 hover:text-[var(--color-text)]"
                  onClick={() =>
                    track("contact_channel_clicked", {
                      channel: "email",
                      location: "footer_utility",
                    })
                  }
                >
                  hello@amalgam-inc.com
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-[1120px] border-t border-[color-mix(in_srgb,var(--color-border-strong)_78%,white_22%)] pt-7">
          <div className="flex flex-col gap-3 text-xs text-[color-mix(in_srgb,var(--color-text-subtle)_84%,var(--color-text-muted)_16%)] sm:flex-row sm:items-center sm:justify-between">
            <p>(c) {new Date().getFullYear()} Amalgam Inc. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              {legal.map((item) => (
                <TrackedLink
                  key={item.href}
                  prefetch={false}
                  href={item.href}
                  eventName="navigation_link_clicked"
                  eventData={{ location: "footer_legal", href: item.href, link_label: item.label }}
                  className="inline-flex min-h-7 items-center px-1.5 underline-offset-4 hover:text-[var(--color-text)] hover:underline"
                >
                  {item.label}
                </TrackedLink>
              ))}
              <Link
                href="/sitemap.xml"
                className="inline-flex min-h-7 items-center px-1.5 underline-offset-4 hover:text-[var(--color-text)] hover:underline"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}


