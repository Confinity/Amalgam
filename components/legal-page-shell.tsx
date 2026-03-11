import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowRight, Mail, Phone } from "lucide-react"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"

type LegalPageShellProps = {
  title: string
  description: string
  lastUpdated: string
  children: ReactNode
}

export function LegalPageShell({
  title,
  description,
  lastUpdated,
  children,
}: LegalPageShellProps) {
  return (
    <>
      <Navigation />
      <main id="main-content" className="min-h-screen bg-background pt-20">
        <section className="border-b border-border px-6 py-16 md:py-22">
          <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="max-w-3xl">
              <p className="mb-4 text-sm font-medium uppercase tracking-widest text-teal">
                Legal
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-foreground text-balance md:text-5xl">
                {title}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                {description}
              </p>
              <p className="mt-5 text-sm text-muted-foreground">
                Last updated: {lastUpdated}
              </p>
            </div>

            <aside className="rounded-[28px] border border-border bg-secondary/35 p-6">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                Questions?
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                If you have a question about this policy or how Amalgam handles your
                information, reach out directly.
              </p>
              <div className="mt-5 space-y-3">
                <a
                  href="mailto:hello@amalgam-inc.com"
                  className="flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground transition-colors hover:border-teal/40"
                >
                  <Mail className="h-4 w-4 text-teal" />
                  hello@amalgam-inc.com
                </a>
                <a
                  href="tel:+14843548498"
                  className="flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground transition-colors hover:border-teal/40"
                >
                  <Phone className="h-4 w-4 text-teal" />
                  +1 484-354-8498
                </a>
              </div>
              <Link
                href="/contact"
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-teal transition-colors hover:text-foreground"
              >
                Contact Amalgam
                <ArrowRight className="h-4 w-4" />
              </Link>
            </aside>
          </div>
        </section>

        <article className="px-6 py-16 md:py-20">
          <div className="mx-auto max-w-[820px] space-y-10">{children}</div>
        </article>
      </main>
      <Footer />
    </>
  )
}
