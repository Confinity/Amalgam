"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { buildRedirectTargetFromQueryString } from "@/lib/redirect-target"

type LegacyRedirectFallbackProps = {
  target: string
  omitKeys?: ReadonlyArray<string>
}

export function LegacyRedirectFallback({ target, omitKeys }: LegacyRedirectFallbackProps) {
  const router = useRouter()

  useEffect(() => {
    const nextHref = buildRedirectTargetFromQueryString(target, window.location.search, {
      omitKeys,
    })
    if (/^https?:\/\//.test(nextHref)) {
      window.location.replace(nextHref)
      return
    }
    router.replace(nextHref)
  }, [omitKeys, router, target])

  return (
    <main id="main-content" className="section-compact">
      <div className="container-site max-w-[680px]">
        <h1 className="text-balance text-3xl font-semibold text-[var(--color-text)] sm:text-4xl">
          Taking you to the current page.
        </h1>
        <p className="mt-3 max-w-[46ch] text-sm text-[var(--color-text-muted)]">
          If the redirect does not start automatically, continue below.
        </p>
        <a
          href={target}
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--color-border-strong)] px-5 text-sm font-medium text-[var(--color-text)] transition-colors duration-150 hover:bg-[var(--color-surface-muted)]"
        >
          Continue
        </a>
      </div>
    </main>
  )
}
