"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"

type LegacyRouteRedirectProps = {
  target: string
  label: string
}

export function LegacyRouteRedirect({ target, label }: LegacyRouteRedirectProps) {
  const router = useRouter()

  useEffect(() => {
    router.replace(target)
  }, [router, target])

  return (
    <main className="min-h-screen bg-background px-6 py-24">
      <div className="mx-auto max-w-xl rounded-[28px] border border-border bg-background p-8 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
          Redirecting
        </p>
        <h1 className="mt-3 text-2xl font-semibold text-foreground">
          This page moved
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          We&apos;re sending you to the current {label} page.
        </p>
        <div className="mx-auto mt-5 h-1 w-40 overflow-hidden rounded-full bg-secondary">
          <span className="block h-full w-full animate-pulse rounded-full bg-gradient-to-r from-teal to-purple" />
        </div>
        <Link
          href={target}
          className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
        >
          Continue to {label}
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/"
          className="mt-3 inline-flex min-h-11 items-center justify-center rounded-lg px-5 py-3 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Go to homepage instead
        </Link>
      </div>
    </main>
  )
}
