"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { track } from "@vercel/analytics"
import { Menu, X } from "lucide-react"
import { BrandLogo } from "@/components/brand-logo"
import { mainNav } from "@/content/site"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

type NavbarProps = {
  primaryCtaLabel?: string
  primaryCtaHref?: string
  servicesLabel?: string
}

export function Navbar({
  primaryCtaLabel = "Get a recommendation",
  primaryCtaHref = "/contact",
  servicesLabel,
}: NavbarProps) {
  const pathname = usePathname()
  const [mobileMenuPath, setMobileMenuPath] = useState<string | null>(null)
  const open = mobileMenuPath === pathname
  const [scrolled, setScrolled] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement | null>(null)
  const menuToggleRef = useRef<HTMLButtonElement | null>(null)

  const links = mainNav.map((item) =>
    item.href === "/services" && servicesLabel
      ? { ...item, label: servicesLabel }
      : item,
  )

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  const toggleMobileMenu = useCallback(
    (nextOpen: boolean, source: "toggle" | "backdrop" | "escape" | "link" | "cta") => {
      setMobileMenuPath(nextOpen ? pathname : null)
      track("navigation_menu_toggled", {
        menu_state: nextOpen ? "open" : "closed",
        source,
        page_path: pathname,
      })
    },
    [pathname],
  )

  useEffect(() => {
    if (!open || !mobileMenuRef.current) {
      return
    }

    const focusableSelectors =
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

    const focusable = mobileMenuRef.current.querySelectorAll<HTMLElement>(focusableSelectors)
    focusable[0]?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        toggleMobileMenu(false, "escape")
        menuToggleRef.current?.focus()
        return
      }

      if (event.key !== "Tab" || !mobileMenuRef.current) {
        return
      }

      const nodes = mobileMenuRef.current.querySelectorAll<HTMLElement>(focusableSelectors)
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (!first || !last) {
        return
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open, pathname, toggleMobileMenu])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-150",
        scrolled || open
          ? "border-tier-default bg-[color-mix(in_srgb,var(--color-bg)_90%,white_10%)] backdrop-blur"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="container-site flex min-h-[76px] items-center justify-between">
        <Link href="/" prefetch={false} aria-label="Amalgam home" className="inline-flex min-h-11 items-center">
          <BrandLogo priority className="h-8 w-auto" />
        </Link>

        <div className="hidden lg:flex lg:items-center lg:gap-4 xl:gap-5">
          <nav className="items-center gap-1.5 lg:flex" aria-label="Primary">
            {links.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={false}
                  aria-current={active ? "page" : undefined}
                  onClick={() =>
                    track("navigation_link_clicked", {
                      location: "header_desktop",
                      link_label: item.label,
                      href: item.href,
                      page_path: pathname,
                    })
                  }
                  className={cn(
                    "inline-flex min-h-11 items-center rounded-full border border-transparent px-4 py-2 text-sm font-medium transition-colors",
                    active
                      ? "border-tier-default bg-[color-mix(in_srgb,var(--color-accent-soft)_72%,white_28%)] text-[color-mix(in_srgb,var(--color-accent-strong)_88%,var(--color-text)_12%)]"
                      : "text-[color-mix(in_srgb,var(--color-text-muted)_70%,var(--color-text)_30%)] hover:border-tier-soft hover:bg-[color-mix(in_srgb,var(--color-surface)_92%,white_8%)] hover:text-[var(--color-text)]",
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <Button
            href={primaryCtaHref}
            onClick={() =>
              track("navigation_primary_cta_clicked", {
                cta_id: "header_desktop_primary",
                location: "header_desktop",
                cta_label: primaryCtaLabel,
                destination: primaryCtaHref,
                page_path: pathname,
              })
            }
          >
            {primaryCtaLabel}
          </Button>
        </div>

        <button
          ref={menuToggleRef}
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => toggleMobileMenu(!open, "toggle")}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="lg:hidden">
          <button
            type="button"
            aria-label="Close mobile menu"
            className="fixed inset-0 top-[76px] z-40 bg-[rgba(15,23,42,0.24)] backdrop-blur-[1px]"
            onClick={() => toggleMobileMenu(false, "backdrop")}
          />
          <div
            id="mobile-menu"
            ref={mobileMenuRef}
            className="relative z-50 border-t border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_96%,white_4%)]"
          >
            <div className="container-site section-compact">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-text-subtle)]">Navigate</p>
              <nav className="space-y-2" aria-label="Mobile">
                {links.map((item) => {
                  const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      prefetch={false}
                      onClick={() => {
                        track("navigation_link_clicked", {
                          location: "header_mobile",
                          link_label: item.label,
                          href: item.href,
                          page_path: pathname,
                        })
                        toggleMobileMenu(false, "link")
                      }}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "block rounded-xl border px-4 py-3 text-sm font-medium",
                        active
                          ? "border-[var(--color-accent-strong)] bg-[var(--color-accent-soft)] text-[var(--color-accent-strong)]"
                          : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)]",
                      )}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </nav>
              <Button
                href={primaryCtaHref}
                className="mt-4 w-full"
                onClick={() => {
                  track("navigation_primary_cta_clicked", {
                    cta_id: "header_mobile_primary",
                    location: "header_mobile",
                    cta_label: primaryCtaLabel,
                    destination: primaryCtaHref,
                    page_path: pathname,
                  })
                  toggleMobileMenu(false, "cta")
                }}
              >
                {primaryCtaLabel}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}

