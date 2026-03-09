import { Metadata } from "next"
import { LegalPageShell } from "@/components/legal-page-shell"

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Terms and conditions governing the use of Amalgam's website and the general framing of our services.",
  alternates: {
    canonical: "/terms-and-conditions",
  },
}

export default function TermsPage() {
  return (
    <LegalPageShell
      title="Terms and Conditions"
      description="These terms govern use of the Amalgam website. Specific commercial terms for consulting work are defined separately in statements of work and service agreements."
      lastUpdated="March 9, 2026"
    >
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Agreement to Terms</h2>
        <p className="leading-relaxed text-muted-foreground">
          By accessing or using the Amalgam website, you agree to be bound by these
          Terms and Conditions. If you do not agree to these terms, please do not
          use the website.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Services</h2>
        <p className="leading-relaxed text-muted-foreground">
          Amalgam provides consulting services that may include Diagnostic Review
          engagements, Execution Sprint roadmapping work, Outcome Partnership
          support, systems architecture consulting, and related technical
          advisory services.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          Specific terms, fees, deliverables, and responsibilities for any paid
          engagement are defined separately in a statement of work, proposal, or
          service agreement.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Intellectual Property</h2>
        <p className="leading-relaxed text-muted-foreground">
          Unless otherwise stated, content on this website, including text,
          graphics, logos, and design elements, is the property of Amalgam Inc.
          and is protected by applicable intellectual property laws. You may not
          reproduce or distribute website content without prior written permission.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Acceptable Use</h2>
        <div className="grid gap-3">
          {[
            "Use the website only for lawful purposes",
            "Do not interfere with the operation or security of the site",
            "Do not attempt to access restricted areas without authorization",
            "Provide accurate information when contacting us",
          ].map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-2xl border border-border bg-background px-4 py-3 text-sm text-muted-foreground"
            >
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-teal" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Disclaimers</h2>
        <p className="leading-relaxed text-muted-foreground">
          The website and its content are provided on an &quot;as is&quot; and &quot;as
          available&quot; basis without warranties of any kind, whether express or
          implied. We do not guarantee uninterrupted operation of the site or that
          website content will always be complete, current, or error-free.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Limitation of Liability</h2>
        <p className="leading-relaxed text-muted-foreground">
          To the maximum extent permitted by law, Amalgam will not be liable for
          indirect, incidental, special, consequential, or punitive damages arising
          from use of the website. Any liability relating to a paid engagement is
          governed by the specific contract for that work.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Governing Law</h2>
        <p className="leading-relaxed text-muted-foreground">
          These terms are governed by the laws of the Commonwealth of Pennsylvania,
          without regard to conflict of law principles.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Changes</h2>
        <p className="leading-relaxed text-muted-foreground">
          We may update these Terms and Conditions from time to time. Material
          updates will be reflected by revising the &quot;Last updated&quot; date on this page.
        </p>
      </section>
    </LegalPageShell>
  )
}
