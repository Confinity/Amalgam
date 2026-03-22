import { Metadata } from "next"
import { LegalPageShell } from "@/components/legal-page-shell"

export const metadata: Metadata = {
  title: "How we protect your information",
  description:
    "Amalgam's privacy policy explains how we collect, use, and protect personal information shared through this website and our services.",
  alternates: {
    canonical: "/privacy-policy",
  },
}

const privacyToc = [
  { id: "overview", label: "Overview" },
  { id: "information-we-collect", label: "Information We Collect" },
  { id: "how-we-use-information", label: "How We Use Information" },
  { id: "information-sharing", label: "Information Sharing" },
  { id: "data-security", label: "Data Security" },
  { id: "your-choices", label: "Your Choices" },
  { id: "contact", label: "Contact" },
] as const

export default function PrivacyPolicyPage() {
  return (
    <LegalPageShell
      title="Privacy Policy"
      description="This policy explains how Amalgam collects, uses, and protects personal information shared through our website and service conversations."
      lastUpdated="March 9, 2026"
      toc={privacyToc}
      tocEventContext="privacy-policy"
    >
      <section id="overview" className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--color-text)]">Overview</h2>
        <p className="leading-relaxed text-[var(--color-text-muted)]">
          Amalgam Inc. (&quot;Amalgam,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your privacy.
          This policy explains how we collect, use, and protect information when you visit our website or contact us.
        </p>
      </section>

      <section id="information-we-collect" className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--color-text)]">Information We Collect</h2>
        <div className="space-y-4 text-[var(--color-text-muted)]">
          <p className="leading-relaxed">
            We collect information based on how you use the site.
          </p>
          <div className="space-y-3">
            <div className="rounded-[24px] border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-5">
              <p className="font-medium text-[var(--color-text)]">Contact information</p>
              <p className="mt-2 text-sm leading-relaxed">
                Name, work email, phone number, company name, and other details you
                choose to share when contacting us.
              </p>
            </div>
            <div className="rounded-[24px] border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-5">
              <p className="font-medium text-[var(--color-text)]">Usage information</p>
              <p className="mt-2 text-sm leading-relaxed">
                Information about how visitors use the website, such as pages
                visited, navigation patterns, and approximate device or browser context.
              </p>
            </div>
            <div className="rounded-[24px] border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-5">
              <p className="font-medium text-[var(--color-text)]">Technical information</p>
              <p className="mt-2 text-sm leading-relaxed">
                IP address, browser type, operating system, and related technical
                data typically collected during normal website use.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-we-use-information" className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--color-text)]">How We Use Information</h2>
        <div className="grid gap-3">
          {[
            "Respond to inquiries and continue relevant service conversations",
            "Deliver and improve consulting services",
            "Understand website usage and improve the experience",
            "Maintain appropriate security, recordkeeping, and compliance practices",
            "Send relevant service-related communications when appropriate",
          ].map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-text-muted)]"
            >
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--color-accent-strong)]" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="information-sharing" className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--color-text)]">Information Sharing</h2>
        <p className="leading-relaxed text-[var(--color-text-muted)]">
          We do not sell personal information. We may share information with
          service providers who help us operate the site or support our business,
          with professional advisers such as legal or accounting counsel, or when
          required by law, regulation, or a valid legal process.
        </p>
      </section>

      <section id="data-security" className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--color-text)]">Data Security</h2>
        <p className="leading-relaxed text-[var(--color-text-muted)]">
          We use reasonable technical and organizational measures to protect
          information against unauthorized access, alteration, disclosure, or
          destruction. No website or transmission method can guarantee absolute
          security, so visitors should use appropriate judgment when sharing
          sensitive information online.
        </p>
      </section>

      <section id="your-choices" className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--color-text)]">Your Choices</h2>
        <p className="leading-relaxed text-[var(--color-text-muted)]">
          Depending on your location, you may have rights to request access to,
          correction of, or deletion of personal information, or to opt out of
          certain communications. To make a request, contact us using the details
          provided on this page.
        </p>
      </section>

      <section id="contact" className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--color-text)]">Contact</h2>
        <address className="not-italic leading-relaxed text-[var(--color-text-muted)]">
          <p>Amalgam Inc.</p>
          <p>851 Duportail Road, 2nd Floor</p>
          <p>Chesterbrook, PA 19087</p>
          <p className="mt-2">hello@amalgam-inc.com</p>
          <p>+1 484-354-8498</p>
        </address>
      </section>
    </LegalPageShell>
  )
}
