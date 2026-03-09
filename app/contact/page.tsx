import { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Compass,
  Mail,
  MapPin,
  Phone,
} from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Amalgam. Whether you're ready to start the Founder Review or have questions, we're here to help.",
  alternates: {
    canonical: "/contact",
  },
}

const nextSteps = [
  {
    title: "You share the situation",
    description:
      "Tell us what is slowing delivery down, where the system feels tangled, or which engagement path seems closest.",
  },
  {
    title: "Amalgam replies directly",
    description:
      "You hear back from the team, not a sales queue, so the response can actually address the situation you described.",
  },
  {
    title: "We point to the right next step",
    description:
      "That may be the Founder Review, a deeper conversation, or a recommendation to keep the work internal for now.",
  },
]

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="min-h-screen bg-background pt-20">
        <section className="contact-hero-section relative overflow-hidden border-b border-border py-20 lg:py-28">
          <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-teal/10 blur-3xl" />
          <div className="pointer-events-none absolute left-10 top-24 h-56 w-56 rounded-full bg-purple/8 blur-3xl" />
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="contact-hero-layout grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div className="contact-hero-copy">
                <p className="mb-4 text-sm font-medium uppercase tracking-widest text-teal">
                  Contact
                </p>
                <h1 className="text-4xl font-semibold leading-tight tracking-tight text-foreground text-balance md:text-5xl">
                  Start the conversation
                </h1>
                <p className="contact-hero-body mt-6 text-lg leading-relaxed text-muted-foreground">
                  Whether you already know the likely path or just need a quick
                  fit check, we will point you to the right next step.
                </p>
                <Link
                  href="/launchpad/tools"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-teal transition-colors hover:text-foreground"
                >
                  Not ready to reach out yet? Start with a diagnostic
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <div className="contact-path-grid mt-8 grid gap-4 sm:grid-cols-3">
                  <div className="contact-path-card support-panel p-5">
                    <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                      Founder Review
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      Best when the root problem is still unclear and leadership needs a sharper read fast.
                    </p>
                  </div>
                  <div className="contact-path-card support-panel p-5">
                    <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                      Execution Sprint
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      Best when the diagnosis is visible and the business needs sequence, not more debate.
                    </p>
                  </div>
                  <div className="contact-path-card support-panel p-5">
                    <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                      Outcome Partnership
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      Best when the roadmap exists and senior follow-through is what protects momentum.
                    </p>
                  </div>
                </div>

                <div className="contact-methods mt-10 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal/10">
                      <Mail className="h-5 w-5 text-teal" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Email</p>
                      <a
                        href="mailto:hello@amalgam-inc.com"
                        className="text-foreground transition-colors hover:text-teal"
                      >
                        hello@amalgam-inc.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal/10">
                      <Phone className="h-5 w-5 text-teal" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Phone</p>
                      <a
                        href="tel:+14843548498"
                        className="text-foreground transition-colors hover:text-teal"
                      >
                        +1 484-354-8498
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal/10">
                      <MapPin className="h-5 w-5 text-teal" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Office</p>
                      <p className="text-foreground">
                        851 Duportail Road, 2nd Floor
                        <br />
                        Chesterbrook, PA 19087
                      </p>
                    </div>
                  </div>

                  <div className="contact-response-note flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal/10">
                      <Clock3 className="h-5 w-5 text-teal" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">How we reply</p>
                      <p className="text-foreground">
                        You hear back directly from Amalgam, not a ticket queue.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <ContactForm
                key=""
                initialInterest=""
              />
            </div>
          </div>
        </section>

        <section className="contact-next-section py-16 lg:py-20">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="contact-next-layout grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
              <div className="contact-next-panel rounded-[32px] border border-border bg-secondary/30 p-8 md:p-12">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                  What happens next
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-foreground">
                  A direct path, not a lead funnel
                </h2>
                <div className="contact-next-steps mt-8 grid gap-4 md:grid-cols-3">
                  {nextSteps.map((step, index) => (
                    <div
                      key={step.title}
                      className="contact-next-step support-panel px-5 py-5"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-teal/10 text-sm font-semibold text-teal">
                        0{index + 1}
                      </div>
                      <h3 className="mt-4 text-lg font-semibold text-foreground">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="contact-review-panel rounded-[32px] border border-border bg-foreground p-8">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                  Best first move
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-background">
                  Start with the Founder Review
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-background/70">
                  If you know something in the business is slowing down but the
                  root cause is still fuzzy, that remains the cleanest entry point.
                </p>
                <div className="contact-review-points mt-6 space-y-3">
                  {[
                    "Two-week senior diagnostic",
                    "Clear diagnosis and next step",
                    "Useful even if you keep execution internal",
                  ].map((item) => (
                    <div
                      key={item}
                      className="contact-review-point flex items-start gap-3 px-1 py-3 text-sm text-background"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/founder-review"
                  className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-background px-6 py-3 font-medium text-foreground transition-opacity hover:opacity-90"
                >
                  See the Founder Review
                  <Compass className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact?interest=founder-review"
                  className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-background/15 px-6 py-3 font-medium text-background transition-colors hover:bg-background/10"
                >
                  Start the conversation
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/launchpad/tools"
                  className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-background/15 px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-background/10"
                >
                  Start with a diagnostic instead
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
