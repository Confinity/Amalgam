import type { Metadata } from "next"
import { permanentRedirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Redirecting to Research",
  robots: {
    index: false,
    follow: true,
  },
}

export default function KnowledgeRedirectPage() {
  permanentRedirect("/research")
}


