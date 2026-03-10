import type { Metadata } from "next"
import { LegacyRouteRedirect } from "@/components/legacy-route-redirect"

export const metadata: Metadata = {
  title: "Taking you to your strategy call",
  robots: {
    index: false,
    follow: true,
  },
}

export default function ScheduleRedirectPage() {
  return (
    <LegacyRouteRedirect
      target="/contact?interest=strategy-session"
      label="strategy call"
    />
  )
}
