import { Metadata } from "next"
import { LegalPageShell } from "@/components/legal-page-shell"

export const metadata: Metadata = {
  title: "How cookies are used on this site",
  description:
    "Learn how Amalgam uses cookies and similar technologies on this website.",
  alternates: {
    canonical: "/cookie-policy",
  },
}

export default function CookiePolicyPage() {
  return (
    <LegalPageShell
      title="Cookie Policy"
      description="This page explains what cookies are, how we use them on the Amalgam website, and what choices visitors have through browser settings."
      lastUpdated="March 9, 2026"
    >
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">What Cookies Are</h2>
        <p className="leading-relaxed text-muted-foreground">
          Cookies are small text files stored on your device when you visit a website.
          We use them to help the site run, remember settings, and understand usage patterns.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">How We Use Cookies</h2>
        <div className="space-y-3">
          <div className="rounded-[24px] border border-border bg-secondary/25 p-5">
            <p className="font-medium text-foreground">Essential cookies</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              These support core website functions such as page delivery and basic
              navigation behavior.
            </p>
          </div>
          <div className="rounded-[24px] border border-border bg-secondary/25 p-5">
            <p className="font-medium text-foreground">Analytics-related cookies</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              We use these to understand site usage and improve clarity, performance, and usability over time.
            </p>
          </div>
          <div className="rounded-[24px] border border-border bg-secondary/25 p-5">
            <p className="font-medium text-foreground">Functional cookies</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              These can help remember preferences or support a smoother browsing experience.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Managing Cookies</h2>
        <div className="grid gap-3">
          {[
            "Most browsers allow users to view, block, or delete cookies",
            "Browser settings can often notify you when cookies are being set",
            "Disabling certain cookies may affect how some website functions behave",
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
        <h2 className="text-2xl font-semibold text-foreground">Changes to This Policy</h2>
        <p className="leading-relaxed text-muted-foreground">
          We may update this Cookie Policy from time to time to reflect changes in
          website practices, operations, or legal requirements. Updates will be
          reflected by revising the &quot;Last updated&quot; date on this page.
        </p>
      </section>
    </LegalPageShell>
  )
}
