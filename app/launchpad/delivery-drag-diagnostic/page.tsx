import type { Metadata } from "next"
import { LegacyRedirectFallback } from "@/components/navigation/LegacyRedirectFallback"

export const metadata: Metadata = {
  title: "Redirecting to Your Next Move diagnostic",
  robots: {
    index: false,
    follow: true,
  },
}

export default function LegacyRedirectPage() {
  return <LegacyRedirectFallback target="/next-move/delivery-drag-diagnostic" />
}
