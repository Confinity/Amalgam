import { offers, type OfferId } from "@/content/offers"
import { TrackedButton } from "@/components/ui/TrackedButton"
import { Card } from "@/components/ui/Card"

type HomepageOfferDetails = {
  title: string
  contextLine: string
  summary: string
  bullets: [string, string]
  bestWhen: string
  typicalScope: string
}

const homepageOfferDetails: Record<OfferId, HomepageOfferDetails> = {
  "founder-review": {
    title: "Founder Review",
    contextLine: "For unclear priorities and important decisions",
    summary: "Get a clear read on the blocker and the strongest next step.",
    bullets: [
      "Clarity on the core blocker",
      "Decision-ready next steps",
    ],
    bestWhen: "The next move is unclear and important decisions are coming fast.",
    typicalScope: "1 to 2 focused weeks.",
  },
  "execution-sprint": {
    title: "Expert Guidance",
    contextLine: "For one known bottleneck in active work",
    summary: "Turn one bottleneck into a plan your team can run.",
    bullets: [
      "A practical plan with clear owners",
      "Faster progress on one critical path",
    ],
    bestWhen: "You can see the bottleneck and need faster sequencing.",
    typicalScope: "2 to 6 focused weeks on one critical path.",
  },
  "outcome-partnership": {
    title: "Outcome Partnership",
    contextLine: "For teams that need steady support while work moves",
    summary: "Keep senior guidance close so momentum holds as priorities shift.",
    bullets: [
      "Senior continuity in key decisions",
      "Fast unblocking when new issues appear",
    ],
    bestWhen: "Work is active and decisions need steady follow-through.",
    typicalScope: "Ongoing monthly support.",
  },
}

function getOfferCtaLabel(offerId: OfferId) {
  if (offerId === "founder-review") return "Explore Founder Review"
  if (offerId === "execution-sprint") return "Explore Expert Guidance"
  return "Explore Outcome Partnership"
}

export function OfferComparison() {
  return (
    <section className="section-compact border-b border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="container-site">
        <h2>How we can support you right now</h2>
        <p className="copy-support-strong mt-4 max-w-2xl text-base">
          Choose the level of support that fits where you are right now.
        </p>

        <div className="mt-9 grid gap-5 lg:grid-cols-3">
          {offers.map((offer) => {
            const copy = homepageOfferDetails[offer.id]
            const ctaLabel = getOfferCtaLabel(offer.id)

            return (
              <Card
                key={offer.id}
                variant={offer.primary ? "primary" : "secondary"}
                className={
                  offer.primary
                    ? "flex h-full min-h-[380px] flex-col border-tier-emphasis shadow-[0_16px_34px_rgba(15,23,42,0.08)]"
                    : "flex h-full min-h-[380px] flex-col"
                }
              >
                {offer.primary ? (
                  <span className="w-fit rounded-full border border-[color-mix(in_srgb,var(--color-accent-strong)_30%,transparent)] bg-[var(--color-accent-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-accent-strong)]">
                    Recommended first step
                  </span>
                ) : null}

                <h3 className="mt-4 text-2xl font-semibold">{copy.title}</h3>
                <p className="mt-2 text-sm font-semibold text-[var(--color-accent-strong)]">{copy.contextLine}</p>
                <p className="copy-clamp-3 mt-2.5 text-sm leading-6 text-[var(--color-text-muted)]">{copy.summary}</p>

                <ul className="mt-4 space-y-1.5">
                  {copy.bullets.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[var(--color-text)]">
                      <span aria-hidden="true" className="brand-key-dot" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 space-y-2 text-xs text-[var(--color-text-subtle)]">
                  <p className="brand-key-row leading-5">
                    <span aria-hidden="true" className="brand-key-dot" />
                    <span className="copy-clamp-3">
                      <span className="font-semibold text-[var(--color-text)]">Best when:</span> {copy.bestWhen}
                    </span>
                  </p>
                  <p className="brand-key-row leading-5">
                    <span aria-hidden="true" className="brand-key-dot" />
                    <span className="copy-clamp-3">
                      <span className="font-semibold text-[var(--color-text)]">Typical scope:</span> {copy.typicalScope}
                    </span>
                  </p>
                </div>

                <div className="flex-1" />
                <TrackedButton
                  href={offer.href}
                  withArrow
                  className="mt-6"
                  eventName="section_cta_clicked"
                  eventData={{
                    surface_id: "offer_comparison",
                    cta_id: `offer_comparison_${offer.id}`,
                    cta_label: ctaLabel,
                    cta_variant: offer.primary ? "primary" : "secondary",
                    destination: offer.href,
                    offer_id: offer.id,
                  }}
                >
                  {ctaLabel}
                </TrackedButton>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
