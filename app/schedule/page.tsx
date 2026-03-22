import type { Metadata } from "next"
import { LegacyRedirectFallback } from "@/components/navigation/LegacyRedirectFallback"

export const metadata: Metadata = {
  title: "Taking you to your strategy call",
  robots: {
    index: false,
    follow: true,
  },
}

export default function LegacyRedirectPage() {
  return <LegacyRedirectFallback target="https://calendly.com/ryan-amalgam-inc/30min" omitKeys={["interest"]} />
}
