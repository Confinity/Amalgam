import type { Metadata } from "next"
import { LegacyRouteRedirect } from "@/components/legacy-route-redirect"

export const metadata: Metadata = {
  title: "Redirecting to Contact",
  robots: {
    index: false,
    follow: true,
  },
}

export default function ContactUsRedirectPage() {
  return <LegacyRouteRedirect target="/contact" label="Contact" />
}
