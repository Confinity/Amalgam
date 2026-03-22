import type { Metadata } from "next"
import { Footer } from "@/components/footer"
import { ContactFinalCtaBand } from "@/components/contact/ContactFinalCtaBand"
import { ContactHero } from "@/components/contact/ContactHero"
import { ContactIntakeForm } from "@/components/contact/ContactIntakeForm"
import { ContactMethodsStrip } from "@/components/contact/ContactMethodsStrip"
import { Navigation } from "@/components/navigation"
import { buildRouteMetadata } from "@/lib/seo"

export const metadata: Metadata = buildRouteMetadata({
  title: "Contact Amalgam | Get a Clear Next Step Within One Business Day",
  description:
    "Share your context and get a direct next-step recommendation. Talk by strategy call or send a quick message.",
  canonicalPath: "/contact",
})

export default function ContactPage() {
  return (
    <>
      <Navigation
        primaryCtaLabel="Book a strategy call"
        primaryCtaHref="https://calendly.com/ryan-amalgam-inc/30min"
      />
      <main id="main-content">
        <ContactHero />
        <ContactMethodsStrip />
        <ContactIntakeForm />
        <ContactFinalCtaBand />
      </main>
      <Footer />
    </>
  )
}
