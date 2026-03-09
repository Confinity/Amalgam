import type { Metadata } from "next"
import { LegacyRouteRedirect } from "@/components/legacy-route-redirect"

export const metadata: Metadata = {
  title: "Redirecting to Case Studies",
  robots: {
    index: false,
    follow: true,
  },
}

export default function OurWorkRedirectPage() {
  return <LegacyRouteRedirect target="/case-studies" label="Case Studies" />
}
