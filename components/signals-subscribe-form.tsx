"use client"

import { FormEvent, useState } from "react"
import { track } from "@vercel/analytics"
import { ArrowRight, MailCheck } from "lucide-react"

type SignalsSubscribeFormProps = {
  source: string
  buttonLabel?: string
  className?: string
}

export function SignalsSubscribeForm({
  source,
  buttonLabel = "Subscribe for practical updates",
  className,
}: SignalsSubscribeFormProps) {
  const [email, setEmail] = useState("")
  const [pending, setPending] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const normalizedEmail = email.trim().toLowerCase()

    track("signals_signup_attempted", {
      source,
      has_email: Boolean(normalizedEmail),
    })

    if (!normalizedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setStatus("error")
      setMessage("Please enter a valid work email address.")
      track("signals_signup_failed", {
        source,
        type: "validation",
      })
      return
    }

    setPending(true)
    setStatus("idle")
    setMessage("")

    try {
      const response = await fetch("/api/signals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: normalizedEmail,
          source,
        }),
      })

      const data = (await response.json()) as { status?: string; message?: string }

      if (!response.ok || data.status !== "success") {
        throw new Error(data.message ?? `Signals API returned ${response.status}`)
      }

      setStatus("success")
      setMessage(data.message ?? "You are in. We only send notes that are useful in live execution.")
      track("signals_signup_success", { source })
      setEmail("")
    } catch {
      setStatus("error")
      setMessage("We could not submit right now. Email hello@amalgam-inc.com and we will add you manually.")
      track("signals_signup_failed", {
        source,
        type: "network_or_server",
      })
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={className ?? "space-y-4"}>
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-[var(--color-text-inverse)]">Work email</span>
        <input
          type="email"
          autoComplete="email"
          required
          placeholder="you@company.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={status === "error"}
          aria-describedby="signals-subscribe-feedback"
          className="min-h-11 w-full rounded-xl border border-[color-mix(in_srgb,var(--color-text-inverse)_28%,transparent)] bg-[color-mix(in_srgb,var(--color-surface-dark)_84%,white_16%)] px-4 py-3 text-sm text-[var(--color-text-inverse)] placeholder:text-[color-mix(in_srgb,var(--color-text-inverse)_50%,transparent)]"
        />
      </label>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-surface)] px-5 py-3 text-sm font-medium text-[var(--color-text)] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Subscribing..." : buttonLabel}
        <ArrowRight className="h-4 w-4" />
      </button>
      <div id="signals-subscribe-feedback" aria-live="polite" className="min-h-6">
        {status === "success" ? (
          <p className="inline-flex items-start gap-2 text-sm text-[var(--color-accent)]">
            <MailCheck className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{message}</span>
          </p>
        ) : null}
        {status === "error" ? (
          <p role="alert" className="text-sm text-[var(--color-danger)]">{message}</p>
        ) : null}
      </div>
    </form>
  )
}
