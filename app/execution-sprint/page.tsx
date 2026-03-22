import type { Metadata } from "next"
import { permanentRedirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Focused Intervention",
  description: "Redirecting to Focused Intervention.",
  alternates: {
    canonical: "/focused-intervention",
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function ExecutionSprintPage() {
  permanentRedirect("/focused-intervention")
}
