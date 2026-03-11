"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ArrowRight, RefreshCw } from "lucide-react"

type ErrorPageProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main id="main-content" className="min-h-screen bg-background px-6 pt-28 pb-20">
      <div className="mx-auto max-w-3xl rounded-[30px] border border-border bg-background p-8 text-center md:p-12">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal">Something went wrong</p>
        <h1 className="mt-4 text-3xl font-semibold text-foreground md:text-4xl">
          We hit an unexpected issue loading this page.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
          Try again. If the issue continues, start a conversation and we&apos;ll help right away.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Try again
            <RefreshCw className="h-4 w-4" />
          </button>
          <Link
            href="/contact?interest=strategy-session"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Contact Amalgam
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  )
}
