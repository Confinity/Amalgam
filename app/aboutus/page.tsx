import type { Metadata } from "next"
import { LegacyRedirectFallback } from "@/components/navigation/LegacyRedirectFallback"

export const metadata: Metadata = {
  title: "Taking you to About",
  robots: {
    index: false,
    follow: true,
  },
}

export default function LegacyRedirectPage() {
  return <LegacyRedirectFallback target="/about" />
}
