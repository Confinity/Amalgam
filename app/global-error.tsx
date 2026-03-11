"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function GlobalError() {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans antialiased">
        <main id="main-content" className="min-h-screen px-6 pt-28 pb-20">
          <div className="mx-auto max-w-3xl rounded-[30px] border border-border bg-background p-8 text-center md:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal">Site unavailable</p>
            <h1 className="mt-4 text-3xl font-semibold text-foreground md:text-4xl">
              We couldn&apos;t load this experience.
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Please refresh in a moment, or continue to the homepage and try again.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                Back to homepage
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  )
}
