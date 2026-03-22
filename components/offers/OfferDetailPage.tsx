import { ArrowUpRight, Check } from "lucide-react"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/heroes/PageHero"
import { JsonLd } from "@/components/json-ld"
import { Navigation } from "@/components/navigation"
import { FinalCtaBand } from "@/components/sections/FinalCtaBand"
import { FaqAccordion } from "@/components/sections/FaqAccordion"
import { TrackedLink } from "@/components/tracked-link"
import { Card } from "@/components/ui/Card"
import { TrackedButton } from "@/components/ui/TrackedButton"
import type { Offer } from "@/content/offers"

type OfferDetailPageProps = {
  offer: Offer
}

export function OfferDetailPage({ offer }: OfferDetailPageProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: offer.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }

  return (
    <>
      <JsonLd data={faqSchema} />
      <Navigation />
      <main id="main-content">
        <PageHero
          eyebrow="Support path"
          scale="medium"
          tone="plain"
          title={<h1 className="max-w-[20ch]">{offer.heroTitle}</h1>}
          support={offer.heroSupport}
          helper={offer.heroHelper}
          actions={
            <>
              <TrackedButton
                href={offer.heroPrimaryCtaHref}
                withArrow
                eventName="section_cta_clicked"
                eventData={{
                  surface_id: `offer_hero_${offer.id}`,
                  cta_id: `offer_hero_primary_${offer.id}`,
                  cta_label: offer.heroPrimaryCtaLabel,
                  cta_variant: "primary",
                  destination: offer.heroPrimaryCtaHref,
                  offer_id: offer.id,
                }}
              >
                {offer.heroPrimaryCtaLabel}
              </TrackedButton>
              <TrackedButton
                href={offer.heroSecondaryCtaHref}
                variant="secondary"
                eventName="section_cta_clicked"
                eventData={{
                  surface_id: `offer_hero_${offer.id}`,
                  cta_id: `offer_hero_secondary_${offer.id}`,
                  cta_label: offer.heroSecondaryCtaLabel,
                  cta_variant: "secondary",
                  destination: offer.heroSecondaryCtaHref,
                  offer_id: offer.id,
                }}
              >
                {offer.heroSecondaryCtaLabel}
              </TrackedButton>
            </>
          }
        />

        <section className="section-tight border-y border-[var(--color-border)] bg-[linear-gradient(164deg,rgba(255,255,255,0.96),rgba(243,245,247,0.84))]">
          <div className="container-site grid gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
            <Card variant="primary" className="p-6 md:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-accent-strong)]">
                Where this fits best
              </p>
              <p className="mt-3 text-lg font-semibold text-[var(--color-text)]">{offer.bestFor}</p>
              <ul className="mt-5 space-y-2.5 border-l-2 border-[color-mix(in_srgb,var(--color-accent-strong)_30%,transparent)] pl-3">
                {offer.whenToChoose.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-[var(--color-text)]">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent-strong)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6 md:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-text-subtle)]">
                Why this path exists
              </p>
              <p className="mt-3 text-base leading-relaxed text-[var(--color-text)]">{offer.whyExists}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">
                    Typical scope
                  </p>
                  <p className="mt-2 text-sm text-[var(--color-text)]">{offer.scopeSignal}</p>
                </div>
                <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">
                    What you leave with
                  </p>
                  <p className="mt-2 text-sm text-[var(--color-text)]">{offer.leaveWith[0]}</p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section className="section-space">
          <div className="container-site">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-accent-strong)]">
              How it runs
            </p>
            <h2 className="mt-3">How the engagement is structured</h2>
            <p className="mt-4 max-w-3xl text-base text-[var(--color-text-muted)]">
              The structure stays disciplined so the work keeps moving toward one useful outcome instead of spreading into a broad, vague engagement.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {offer.howItRuns.map((step) => (
                <Card key={step.title} interactive className="flex h-full flex-col p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-accent-strong)]">
                    {step.title}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">{step.detail}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="section-tight border-y border-[var(--color-border)] bg-[var(--color-surface-muted)]">
          <div className="container-site">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-accent-strong)]">
              What moves forward
            </p>
            <h2 className="mt-3">What the team is meant to leave with</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {offer.leaveWith.map((item) => (
                <Card key={item} interactive className="p-5">
                  <p className="text-sm leading-relaxed text-[var(--color-text)]">{item}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="section-compact">
          <div className="container-site">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-accent-strong)]">
              Related proof and next steps
            </p>
            <h2 className="mt-3">Keep going from the closest adjacent surface</h2>
            <p className="mt-4 max-w-3xl text-base text-[var(--color-text-muted)]">
              Use the path that matches how you want to continue: proof from case studies, context from research, or a structured self-serve read in Your Next Move.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {offer.relatedLinks.map((item) => (
                <Card
                  key={`${offer.id}-${item.title}`}
                  as={TrackedLink}
                  href={item.href}
                  eventName="offer_internal_link_clicked"
                  eventData={{ source: `offer_detail_${offer.id}`, target: item.href, offer_id: offer.id }}
                  interactive
                  className="p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">
                        {item.label}
                      </p>
                      <p className="mt-2 text-lg font-semibold text-[var(--color-text)]">{item.title}</p>
                    </div>
                    <ArrowUpRight className="mt-0.5 h-4 w-4 text-[var(--color-accent-strong)]" />
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">{item.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <FaqAccordion
          items={offer.faq}
          support="Short answers to the questions teams usually ask while deciding whether this is the right level of support."
        />

        <FinalCtaBand
          tone="dark"
          surfaceId={`offer_detail_${offer.id}`}
          headline={offer.finalCta.headline}
          support={offer.finalCta.support}
          primary={{ label: offer.finalCta.primaryLabel, href: offer.finalCta.primaryHref }}
        />
      </main>
      <Footer />
    </>
  )
}
