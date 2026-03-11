"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ArrowRight, Mail } from "lucide-react"
import { BrandLogo } from "@/components/brand-logo"

type NavigationProps = {
  servicesLabel?: string
  primaryCtaLabel?: string
  primaryCtaHref?: string
  mobilePrompt?: string
}

export function Navigation({
  servicesLabel = "Services",
  primaryCtaLabel = "Talk with our team",
  primaryCtaHref = "/contact?interest=strategy-session",
  mobilePrompt = "If releases are slipping and the cause is not obvious, start with a strategy call.",
}: NavigationProps) {
  const navItems = [
    { href: "/services", label: servicesLabel },
    { href: "/launchpad", label: "Launchpad" },
    { href: "/case-studies", label: "Case Studies" },
    { href: "/knowledge", label: "Knowledge" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ]

  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const totalScrollable = document.documentElement.scrollHeight - window.innerHeight
      const progress = totalScrollable > 0 ? Math.min(1, window.scrollY / totalScrollable) : 0
      setScrolled(window.scrollY > 10)
      setScrollProgress(progress)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (!mobileOpen) {
      document.body.style.removeProperty("overflow")
      document.body.style.removeProperty("padding-right")
      return
    }

    document.body.style.overflow = "hidden"
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false)
      }
    }

    window.addEventListener("keydown", handleEscape)
    return () => {
      document.body.style.removeProperty("overflow")
      document.body.style.removeProperty("padding-right")
      window.removeEventListener("keydown", handleEscape)
    }
  }, [mobileOpen])

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? "border-b border-border/90 bg-background/88 shadow-sm backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center" aria-label="Amalgam home">
          <BrandLogo priority className="h-8 w-auto sm:h-9" />
        </Link>

        <div className="hidden items-center gap-4 md:ml-10 lg:ml-12 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch={false}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`rounded-full px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none ${
                isActive(item.href)
                  ? "bg-teal/10 text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <Link
            href={primaryCtaHref}
            prefetch={false}
            className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-all hover:opacity-90 focus-visible:outline-none"
          >
            {primaryCtaLabel}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/90 text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-site-menu"
        >
          {mobileOpen ? (
            <X className="h-5 w-5 text-foreground" />
          ) : (
            <Menu className="h-5 w-5 text-foreground" />
          )}
        </button>
      </nav>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-border/70">
        <span
          className="block h-full bg-gradient-to-r from-teal via-teal/90 to-purple/85 transition-[width] duration-200"
          style={{ width: `${Math.round(scrollProgress * 100)}%` }}
        />
      </div>

      {mobileOpen && (
        <div id="mobile-site-menu" className="md:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 top-[72px] bg-foreground/20 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-x-0 top-full border-t border-border bg-background px-6 py-6 shadow-2xl">
            <div className="rounded-[28px] border border-border bg-background p-5">
              <div className="mb-5 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                Navigation
              </div>
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    prefetch={false}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`rounded-2xl border px-4 py-3 text-base font-medium transition-colors focus-visible:outline-none ${
                      isActive(item.href)
                        ? "border-border bg-secondary/85 text-foreground"
                        : "border-transparent text-muted-foreground hover:border-border/70 hover:bg-secondary/70 hover:text-foreground"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <hr className="my-5 border-border" />
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                {mobilePrompt}
              </p>
              <div className="grid gap-3">
                <Link
                  href={primaryCtaHref}
                  prefetch={false}
                  className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl bg-foreground px-4 py-3 text-sm font-medium text-background"
                  onClick={() => setMobileOpen(false)}
                >
                  {primaryCtaLabel}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/contact"
                  prefetch={false}
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-2xl border border-border px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                  onClick={() => setMobileOpen(false)}
                >
                  Start a conversation
                </Link>
              </div>
              <div className="mt-5 rounded-2xl border border-border bg-secondary/35 px-4 py-4">
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                  <Mail className="h-3.5 w-3.5 text-teal" />
                  Direct contact
                </div>
                <a
                  href="mailto:hello@amalgam-inc.com"
                  className="mt-2 block text-sm font-medium text-foreground"
                >
                  hello@amalgam-inc.com
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
