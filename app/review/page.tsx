import type { Metadata } from "next"
import { LegacyRedirectFallback } from "@/components/navigation/LegacyRedirectFallback"

export const metadata: Metadata = {
  title: "Opening review mode",
  robots: {
    index: false,
    follow: false,
  },
}

export default function LegacyRedirectPage() {
  return <LegacyRedirectFallback target="/?review=true" omitKeys={["review"]} />
}
