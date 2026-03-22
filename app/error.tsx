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
    <main id="main-content" className="min-h-screen bg-[var(--color-bg)] px-6 pb-20 pt-28">
      <div className="mx-auto max-w-3xl rounded-[30px] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center md:p-12">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-accent-strong)]">Something went wrong</p>
        <h1 className="mt-4 text-3xl font-semibold text-[var(--color-text)] md:text-4xl">
          We hit an unexpected issue loading this page.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[var(--color-text-muted)] md:text-base">
          Try again. If the issue continues, start a conversation and we&apos;ll help right away.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-6 py-3 text-sm font-medium text-[var(--color-text-inverse)] transition-colors hover:bg-[var(--color-primary-hover)]"
          >
            Try again
            <RefreshCw className="h-4 w-4" />
          </button>
          <Link
            href="/contact"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[var(--color-border-strong)] px-6 py-3 text-sm font-medium text-[var(--color-text)] transition-colors hover:bg-[var(--color-surface)]"
          >
            Contact Amalgam
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  )
}
