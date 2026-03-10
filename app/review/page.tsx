"use client"

import Link from "next/link"
import { useEffect } from "react"
import { withBasePath } from "@/lib/site-config"

export default function ReviewShortcutPage() {
  const targetHref = `${withBasePath("/")}?review=true`

  useEffect(() => {
    window.location.replace(targetHref)
  }, [targetHref])

  return (
    <main className="min-h-screen bg-background px-6 py-28">
      <div className="mx-auto max-w-lg rounded-2xl border border-border bg-card p-8 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-teal">
          Review Mode
        </p>
        <h1 className="mt-4 text-2xl font-semibold text-foreground">
          Opening review mode...
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          If redirect does not start automatically, use the link below.
        </p>
        <Link
          href={targetHref}
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          Continue
        </Link>
      </div>
    </main>
  )
}
