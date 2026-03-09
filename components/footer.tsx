import Link from "next/link"
import { ArrowRight, CalendarDays, Mail, MapPin, Phone } from "lucide-react"
import { BrandLogo } from "@/components/brand-logo"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="footer-grid grid gap-12 xl:grid-cols-[minmax(0,1.05fr)_0.7fr_0.8fr_minmax(320px,0.98fr)]">
          <div>
            <Link href="/" prefetch={false} className="inline-flex items-center" aria-label="Amalgam home">
              <BrandLogo className="h-8 w-auto" />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Senior operators helping founders untangle complex systems and restore delivery velocity.
            </p>
            <div className="footer-credentials text-sm text-muted-foreground">
              <span className="credential-chip rounded-full border border-border bg-background px-3 py-1.5">
                Founded 2012
              </span>
              <span className="credential-chip rounded-full border border-border bg-background px-3 py-1.5">
                Chesterbrook, PA
              </span>
              <span className="credential-chip rounded-full border border-border bg-background px-3 py-1.5">
                Small senior team
              </span>
            </div>
            <Link
              href="/founder-review"
              prefetch={false}
              className="footer-cta mt-5 inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Start the Founder Review
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">Start Here</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/founder-review" prefetch={false} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Founder Review
                </Link>
              </li>
              <li>
                <Link href="/execution-sprint" prefetch={false} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Execution Sprint
                </Link>
              </li>
              <li>
                <Link href="/outcome-partnership" prefetch={false} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Outcome Partnership
                </Link>
              </li>
              <li>
                <Link href="/contact" prefetch={false} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Contact
                </Link>
              </li>
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
                <Link href="/case-studies" prefetch={false} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/knowledge" prefetch={false} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Knowledge
                </Link>
              </li>
              <li>
                <Link href="/contact" prefetch={false} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">Start a Conversation</h4>
            <div className="rounded-[28px] border border-border bg-secondary/30 p-5">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                Best fit
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Founders, fractional CTOs, product leaders, and cross-functional operators carrying complexity.
              </p>

              <div className="mt-5 space-y-3 text-sm">
                <Link href="/contact" prefetch={false} className="contact-row contact-row--primary">
                  <CalendarDays className="contact-icon h-4 w-4 shrink-0 text-teal" />
                  <span>Start a conversation</span>
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
            <Link href="/privacy-policy" prefetch={false} className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              Privacy Policy
            </Link>
            <span className="text-xs text-muted-foreground/50" aria-hidden="true">•</span>
            <Link href="/terms-and-conditions" prefetch={false} className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              Terms
            </Link>
            <span className="text-xs text-muted-foreground/50" aria-hidden="true">•</span>
            <Link href="/cookie-policy" prefetch={false} className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
