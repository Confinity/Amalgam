import type { Metadata } from "next"
import { OfferDetailPage } from "@/components/offers/OfferDetailPage"
import { getOfferById } from "@/content/offers"

export const metadata: Metadata = {
  title: "Outcome Partnership",
  description:
    "Outcome Partnership keeps senior judgment close to active work so alignment and momentum hold through complexity.",
  alternates: {
    canonical: "/outcome-partnership",
  },
}

export default function OutcomePartnershipPage() {
  return <OfferDetailPage offer={getOfferById("outcome-partnership")} />
}
