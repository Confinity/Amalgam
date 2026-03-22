import type { Metadata } from "next"
import { OfferDetailPage } from "@/components/offers/OfferDetailPage"
import { getOfferById } from "@/content/offers"

export const metadata: Metadata = {
  title: "Focused Intervention",
  description:
    "Focused Intervention resolves a known bottleneck quickly and turns it into an owner-ready execution path.",
  alternates: {
    canonical: "/focused-intervention",
  },
}

export default function FocusedInterventionPage() {
  return <OfferDetailPage offer={getOfferById("execution-sprint")} />
}
