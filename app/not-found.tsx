import type { Metadata } from "next"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ArrowRight, Home } from "lucide-react"

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "The page you were looking for does not exist. Use the navigation to return to Amalgam's services, case studies, knowledge, or contact pages.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="bg-background min-h-screen pt-20">
        <section className="py-28 lg:py-36">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-4 text-8xl font-bold text-teal/20">404</p>
              <h1 className="mb-4 text-3xl font-semibold text-foreground md:text-4xl">
                Page not found
              </h1>
              <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
                The page you&apos;re looking for doesn&apos;t exist or has moved. Try one of these pages next.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  href="/contact?interest=strategy-session"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-foreground px-6 py-3 font-medium text-background transition-all hover:opacity-90"
                >
                  Book a free strategy call
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/case-studies"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 font-medium text-foreground transition-all hover:bg-secondary"
                >
                  See case studies
                </Link>
              </div>
            </div>

            <div className="mx-auto mt-12 grid max-w-[960px] gap-4 md:grid-cols-4">
              {[
                { href: "/", label: "Home" },
                { href: "/services", label: "Services" },
                { href: "/knowledge", label: "Knowledge" },
                { href: "/contact", label: "Contact" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl border border-border bg-background px-5 py-5 text-center text-sm font-medium text-foreground transition-colors hover:border-teal/40 hover:text-teal"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <Home className="h-4 w-4" />
                Go home
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
