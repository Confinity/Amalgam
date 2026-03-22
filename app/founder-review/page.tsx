import type { Metadata } from "next"
import { OfferDetailPage } from "@/components/offers/OfferDetailPage"
import { getOfferById } from "@/content/offers"

export const metadata: Metadata = {
  title: "Founder Review",
  description:
    "Founder Review gives teams a clear read on product, system, and delivery pressure before deeper investment.",
  alternates: {
    canonical: "/founder-review",
  },
}

export default function FounderReviewPage() {
  return <OfferDetailPage offer={getOfferById("founder-review")} />
}
