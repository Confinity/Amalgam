import type { Metadata } from "next"
import { permanentRedirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Redirecting to Case Studies",
  robots: {
    index: false,
    follow: true,
  },
}

export default function OurWorkLegacyRedirectPage() {
  permanentRedirect("/our-work")
}
