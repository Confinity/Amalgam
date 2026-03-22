import type { Metadata } from "next"
import { RoleCard } from "@/components/cards/RoleCard"
import { PageHero } from "@/components/heroes/PageHero"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { TrackedButton } from "@/components/ui/TrackedButton"
import { Card } from "@/components/ui/Card"
import { FinalCtaBand } from "@/components/sections/FinalCtaBand"
import { cultureSignals, roles } from "@/content/careers"

export const metadata: Metadata = {
  title: "Do meaningful work with a small, high-trust team",
  description:
    "Clear role expectations, direct collaboration, and real client outcomes.",
  alternates: {
    canonical: "/careers",
  },
}

export default function CareersPage() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <PageHero
          scale="medium"
          tone="plain"
          title={
            <h1 className="max-w-[20ch]">
              Do meaningful work with a small, <span className="hero-title-accent">high-trust team.</span>
            </h1>
          }
          support="We value clear thinking, strong execution, and real client outcomes."
          actions={
            <>
              <TrackedButton
                href="/contact?interest=careers"
                withArrow
                eventName="careers_interest"
                eventData={{
                  source: "careers_hero",
                  cta_id: "careers_hero_contact",
                  cta_label: "Ask about this role",
                  destination: "/contact?interest=careers",
                }}
              >
                Ask about this role
              </TrackedButton>
              <TrackedButton
                href="mailto:hello@amalgam-inc.com?subject=Careers%20Inquiry"
                variant="secondary"
                eventName="careers_interest"
                eventData={{
                  source: "careers_hero",
                  cta_id: "careers_hero_email",
                  cta_label: "Email directly",
                  destination: "mailto:hello@amalgam-inc.com?subject=Careers%20Inquiry",
                }}
              >
                Email directly
              </TrackedButton>
            </>
          }
        />

        <section className="section-compact border-y border-[var(--color-border)] bg-[var(--color-surface-muted)]">
          <div className="container-site">
            <h2>What working here feels like</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {cultureSignals.map((signal) => (
                <Card key={signal.title} interactive>
                  <h3 className="text-xl font-semibold">{signal.title}</h3>
                  <p className="mt-3 text-sm text-[var(--color-text-muted)]">{signal.detail}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="section-space">
          <div className="container-site">
            <h2>Open roles</h2>
            <p className="mt-4 max-w-2xl text-base">Clear expectations, practical ownership, and direct collaboration.</p>
            <div className="mt-8 grid gap-5">
              {roles.map((role) => (
                <RoleCard key={role.id} role={role} />
              ))}
            </div>
          </div>
        </section>

        <section className="section-compact border-y border-[var(--color-border)] bg-[var(--color-surface-muted)]">
          <div className="container-site">
            <Card variant="primary" className="p-6 md:p-8">
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-accent-strong)]">How to apply</p>
              <h2 className="mt-3 text-3xl font-semibold">Tell us where you fit best</h2>
              <p className="mt-4 max-w-3xl text-base">
                Share the role title and a short note on fit. We reply quickly.
              </p>
            </Card>
          </div>
        </section>

        <FinalCtaBand
          surfaceId="careers_final"
          headline="Interested in one of these roles?"
          support="Reach out directly and we will guide the next step."
          primary={{ label: "Ask about this role", href: "/contact?interest=careers" }}
        />
      </main>
      <Footer />
    </>
  )
}

