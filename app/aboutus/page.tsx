import type { Metadata } from "next"
import { LegacyRouteRedirect } from "@/components/legacy-route-redirect"

export const metadata: Metadata = {
  title: "Taking you to About",
  robots: {
    index: false,
    follow: true,
  },
}

export default function AboutUsRedirectPage() {
  return <LegacyRouteRedirect target="/about" label="About" />
}
