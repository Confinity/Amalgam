import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowRight, Mail, Phone } from "lucide-react"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { TrackedLink } from "@/components/tracked-link"

type LegalTocItem = {
  id: string
  label: string
}

type LegalPageShellProps = {
  title: string
  description: string
  lastUpdated: string
  toc?: ReadonlyArray<LegalTocItem>
  tocEventContext?: string
  children: ReactNode
}

export function LegalPageShell({
  title,
  description,
  lastUpdated,
  toc = [],
  tocEventContext,
  children,
}: LegalPageShellProps) {
  const eventPolicy = tocEventContext ?? title.toLowerCase().replace(/\s+/g, "-")

  return (
    <>
      <Navigation />
      <main id="main-content" className="min-h-screen bg-[var(--color-bg)] pt-[132px] md:pt-[148px] lg:pt-[166px]">
        <section className="section-space border-b border-[var(--color-border)]">
          <div className="container-site grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="max-w-3xl">
              <h1 className="text-balance text-4xl font-semibold tracking-tight text-[var(--color-text)] md:text-5xl">
                {title}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-muted)]">
                {description}
              </p>
              <p className="mt-5 text-sm text-[var(--color-text-subtle)]">
                Last updated: {lastUpdated}
              </p>
            </div>

            <aside className="space-y-4 self-start lg:sticky lg:top-28">
              {toc.length ? (
                <section className="rounded-[28px] border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-6">
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--color-accent-strong)]">
                    On this page
                  </p>
                  <nav className="mt-4" aria-label={`${title} sections`}>
                    <ol className="space-y-2">
                      {toc.map((item, index) => (
                        <li key={item.id}>
                          <TrackedLink
                            href={`#${item.id}`}
                            eventName="legal_toc_section_clicked"
                            eventData={{ policy: eventPolicy, section_id: item.id }}
                            className="interactive flex min-h-11 items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)]"
                          >
                            <span className="inline-flex w-7 shrink-0 justify-center text-xs font-medium tracking-[0.08em] text-[var(--color-text-subtle)]">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span>{item.label}</span>
                          </TrackedLink>
                        </li>
                      ))}
                    </ol>
                  </nav>
                </section>
              ) : null}

              <section className="rounded-[28px] border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-6">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--color-accent-strong)]">
                  Questions?
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
                  If you have a question about this policy or how Amalgam handles your
                  information, reach out directly.
                </p>
                <div className="mt-5 space-y-3">
                  <a
                    href="mailto:hello@amalgam-inc.com"
                    className="card-interactive flex min-h-11 items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-text)]"
                  >
                    <Mail className="h-4 w-4 text-[var(--color-accent-strong)]" />
                    hello@amalgam-inc.com
                  </a>
                  <a
                    href="tel:+14843548498"
                    className="card-interactive flex min-h-11 items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-text)]"
                  >
                    <Phone className="h-4 w-4 text-[var(--color-accent-strong)]" />
                    +1 484-354-8498
                  </a>
                </div>
                <Link
                  href="/contact"
                  prefetch={false}
                  className="mt-5 inline-flex min-h-11 items-center gap-2 py-2 text-sm font-medium text-[var(--color-accent-strong)] transition-colors hover:text-[var(--color-text)]"
                >
                  Contact Amalgam
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </section>
            </aside>
          </div>
        </section>

        <article className="section-space">
          <div className="container-site">
            <div className="mx-auto max-w-[820px] space-y-10">{children}</div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
