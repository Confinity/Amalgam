import { Metadata } from "next"
import { LegalPageShell } from "@/components/legal-page-shell"

export const metadata: Metadata = {
  title: "Website terms you should know",
  description:
    "Terms and conditions governing the use of Amalgam's website and the general framing of our services.",
  alternates: {
    canonical: "/terms-and-conditions",
  },
}

const termsToc = [
  { id: "agreement-to-terms", label: "Agreement to Terms" },
  { id: "services", label: "Services" },
  { id: "intellectual-property", label: "Intellectual Property" },
  { id: "acceptable-use", label: "Acceptable Use" },
  { id: "disclaimers", label: "Disclaimers" },
  { id: "limitation-of-liability", label: "Limitation of Liability" },
  { id: "governing-law", label: "Governing Law" },
  { id: "changes", label: "Changes" },
] as const

export default function TermsPage() {
  return (
    <LegalPageShell
      title="Terms and Conditions"
      description="These terms govern use of the Amalgam website. Commercial terms for consulting work are defined separately in statements of work and service agreements."
      lastUpdated="March 9, 2026"
      toc={termsToc}
      tocEventContext="terms-and-conditions"
    >
      <section id="agreement-to-terms" className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--color-text)]">Agreement to Terms</h2>
        <p className="leading-relaxed text-[var(--color-text-muted)]">
          By using the Amalgam website, you agree to these Terms and Conditions.
          If you do not agree, please do not use the website.
        </p>
      </section>

      <section id="services" className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--color-text)]">Services</h2>
        <p className="leading-relaxed text-[var(--color-text-muted)]">
          Amalgam provides consulting services that may include Founder Review
          engagements, Focused Intervention roadmapping work, Outcome Partnership
          support, systems architecture consulting, and related technical
          advisory services.
        </p>
        <p className="leading-relaxed text-[var(--color-text-muted)]">
          Specific terms, deliverables, and responsibilities for any paid
          engagement are defined separately in a statement of work or
          service agreement.
        </p>
      </section>

      <section id="intellectual-property" className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--color-text)]">Intellectual Property</h2>
        <p className="leading-relaxed text-[var(--color-text-muted)]">
          Unless otherwise stated, content on this website, including text,
          graphics, logos, and design elements, is the property of Amalgam Inc.
          and is protected by applicable intellectual property laws. You may not
          reproduce or distribute website content without prior written permission.
        </p>
      </section>

      <section id="acceptable-use" className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--color-text)]">Acceptable Use</h2>
        <div className="grid gap-3">
          {[
            "Use the website only for lawful purposes",
            "Do not interfere with the operation or security of the site",
            "Do not attempt to access restricted areas without authorization",
            "Provide accurate information when contacting us",
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

      <section id="disclaimers" className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--color-text)]">Disclaimers</h2>
        <p className="leading-relaxed text-[var(--color-text-muted)]">
          The website and its content are provided on an &quot;as is&quot; and &quot;as
          available&quot; basis without warranties of any kind, whether express or
          implied. We do not guarantee uninterrupted operation of the site or that
          website content will always be complete, current, or error-free.
        </p>
      </section>

      <section id="limitation-of-liability" className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--color-text)]">Limitation of Liability</h2>
        <p className="leading-relaxed text-[var(--color-text-muted)]">
          To the maximum extent permitted by law, Amalgam will not be liable for
          indirect, incidental, special, consequential, or punitive damages arising
          from use of the website. Any liability relating to a paid engagement is
          governed by the specific contract for that work.
        </p>
      </section>

      <section id="governing-law" className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--color-text)]">Governing Law</h2>
        <p className="leading-relaxed text-[var(--color-text-muted)]">
          These terms are governed by the laws of the Commonwealth of Pennsylvania,
          without regard to conflict of law principles.
        </p>
      </section>

      <section id="changes" className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--color-text)]">Changes</h2>
        <p className="leading-relaxed text-[var(--color-text-muted)]">
          We may update these Terms and Conditions from time to time. Material
          updates will be reflected by revising the &quot;Last updated&quot; date on this page.
        </p>
      </section>
    </LegalPageShell>
  )
}

