import type { Metadata } from "next"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ArrowRight, Home } from "lucide-react"

export const metadata: Metadata = {
  title: "Can't find that page?",
  description:
    "The page you were looking for does not exist. Use the navigation to return to Amalgam's services, case studies, research, or contact pages.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="min-h-screen bg-[var(--color-bg)] pt-20">
        <section className="py-28 lg:py-36">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-4 text-8xl font-bold text-[color-mix(in_srgb,var(--color-accent-strong)_28%,white_72%)]">404</p>
              <h1 className="mb-4 text-3xl font-semibold text-[var(--color-text)] md:text-4xl">
                Can&apos;t find that page?
              </h1>
              <p className="mx-auto mb-8 max-w-xl text-[var(--color-text-muted)]">
                The page you&apos;re looking for doesn&apos;t exist or has moved. Try one of these pages next.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-6 py-3 text-sm font-medium text-[var(--color-text-inverse)] transition-colors hover:bg-[var(--color-primary-hover)]"
                >
                  Get a recommendation
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/our-work"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[var(--color-border-strong)] px-6 py-3 text-sm font-medium text-[var(--color-text)] transition-colors hover:bg-[var(--color-surface)]"
                >
                  See case studies
                </Link>
              </div>
            </div>

            <div className="mx-auto mt-12 grid max-w-[960px] gap-4 md:grid-cols-3 lg:grid-cols-5">
              {[
                { href: "/", label: "Home" },
                { href: "/services", label: "What we offer" },
                { href: "/next-move", label: "Your Next Move" },
                { href: "/our-work", label: "Case Studies" },
                { href: "/research", label: "Research" },
                { href: "/contact", label: "Contact" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="interactive inline-flex min-h-11 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-5 text-center text-sm font-medium text-[var(--color-text)] transition-colors hover:border-[color-mix(in_srgb,var(--color-accent-strong)_38%,var(--color-border))] hover:text-[var(--color-accent-strong)]"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-[var(--color-text-subtle)] transition-colors hover:text-[var(--color-text)]"
              >
                <Home className="h-4 w-4" />
                Go home
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}



