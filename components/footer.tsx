import Link from "next/link"
import { ArrowRight, CalendarDays, Mail, MapPin, Phone } from "lucide-react"
import { BrandLogo } from "@/components/brand-logo"

type FooterProps = {
  variant?: "default" | "how-we-work"
}

export function Footer({ variant = "default" }: FooterProps) {
  const isHowWeWork = variant === "how-we-work"

  const startHereLinks = isHowWeWork
    ? [
        { href: "/founder-review", label: "Founder Review" },
        { href: "/execution-sprint", label: "Execution Sprint" },
        { href: "/outcome-partnership", label: "Outcome Partnership" },
      ]
    : [
        { href: "/founder-review", label: "Founder Review" },
        { href: "/execution-sprint", label: "Execution Sprint" },
        { href: "/outcome-partnership", label: "Outcome Partnership" },
      ]

  const footerCtaLabel = isHowWeWork
    ? "Book a strategy call"
    : "Book a strategy call"

  const footerIntro = isHowWeWork
    ? "Start with one clear step, then go deeper only when needed."
    : "We help people turn ideas into real products and working systems."

  const bestFitText = isHowWeWork
    ? "Best for founders, entrepreneurs, solopreneurs, and teams building real products."
    : "Best for founders, entrepreneurs, solopreneurs, and teams building real products."

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6">
        <div className="footer-grid grid gap-12 xl:grid-cols-[minmax(0,1.05fr)_0.7fr_0.8fr_minmax(320px,0.98fr)]">
          <div>
            <Link href="/" prefetch={false} className="inline-flex items-center" aria-label="Amalgam home">
              <BrandLogo className="h-8 w-auto" />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {footerIntro}
            </p>
            <div className="footer-credentials text-sm text-muted-foreground">
              <span className="credential-chip rounded-full border border-border bg-background px-3 py-1.5">
                Founded 2012
              </span>
              <span className="credential-chip rounded-full border border-border bg-background px-3 py-1.5">
                Chesterbrook, PA
              </span>
              <span className="credential-chip rounded-full border border-border bg-background px-3 py-1.5">
                Small focused team
              </span>
            </div>
            <Link
              href="/contact?interest=strategy-session"
              prefetch={false}
              className="footer-cta mt-5 inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-medium text-background transition-all duration-200 hover:-translate-y-0.5 hover:opacity-95"
            >
              {footerCtaLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">
              {isHowWeWork ? "How Work Starts" : "Start Here"}
            </h4>
            <ul className="space-y-3">
              {startHereLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    prefetch={false}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" prefetch={false} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link href="/launchpad" prefetch={false} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Launchpad
                </Link>
              </li>
              <li>
                <Link href="/team" prefetch={false} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Team
                </Link>
              </li>
              <li>
                <Link href="/careers" prefetch={false} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/case-studies" prefetch={false} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/knowledge" prefetch={false} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Knowledge
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">Contact</h4>
            <div className="rounded-[28px] border border-border bg-secondary/30 p-5">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                Best fit
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {bestFitText}
              </p>

              <div className="mt-5 space-y-3 text-sm">
                <Link href="/contact?interest=strategy-session" prefetch={false} className="contact-row contact-row--primary">
                  <CalendarDays className="contact-icon h-4 w-4 shrink-0 text-teal" />
                  <span>Book a strategy call</span>
                  <ArrowRight className="ml-auto h-4 w-4 shrink-0" />
                </Link>
                <a href="mailto:hello@amalgam-inc.com" className="contact-row">
                  <Mail className="contact-icon h-4 w-4 shrink-0 text-teal" />
                  <span>hello@amalgam-inc.com</span>
                </a>
                <a href="tel:+14843548498" className="contact-row">
                  <Phone className="contact-icon h-4 w-4 shrink-0 text-teal" />
                  <span>+1 484-354-8498</span>
                </a>
                <div className="contact-row">
                  <MapPin className="contact-icon h-4 w-4 shrink-0 text-teal" />
                  <span>Chesterbrook, PA</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Amalgam Inc. All rights reserved.
          </p>
          <div className="footer-legal-links flex flex-wrap items-center justify-center gap-3">
            <Link href="#main-content" prefetch={false} className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              Back to top
            </Link>
            <span className="text-xs text-muted-foreground/50" aria-hidden="true">&middot;</span>
            <Link href="/privacy-policy" prefetch={false} className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              Privacy Policy
            </Link>
            <span className="text-xs text-muted-foreground/50" aria-hidden="true">&middot;</span>
            <Link href="/terms-and-conditions" prefetch={false} className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              Terms
            </Link>
            <span className="text-xs text-muted-foreground/50" aria-hidden="true">&middot;</span>
            <Link href="/cookie-policy" prefetch={false} className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}


