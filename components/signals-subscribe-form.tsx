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

    if (!normalizedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setStatus("error")
      setMessage("Please enter a valid work email address.")
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
      setMessage(
        data.message ??
          "You are in. We will only send notes when they are genuinely useful.",
      )
      track("signals_signup_success", { source })
      setEmail("")
    } catch {
      setStatus("error")
      setMessage(
        "We could not submit right now. Email hello@amalgam-inc.com and we will add you manually.",
      )
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={className ?? "space-y-4"}>
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-foreground">
          Work email
        </span>
        <input
          type="email"
          autoComplete="email"
          required
          placeholder="you@company.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="contact-field min-h-11 w-full rounded-xl border px-4 py-3 text-sm text-foreground"
        />
      </label>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Subscribing..." : buttonLabel}
        <ArrowRight className="h-4 w-4" />
      </button>
      <div aria-live="polite" className="min-h-6">
        {status === "success" ? (
          <p className="inline-flex items-start gap-2 text-sm text-teal">
            <MailCheck className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{message}</span>
          </p>
        ) : null}
        {status === "error" ? (
          <p className="text-sm text-destructive">{message}</p>
        ) : null}
      </div>
    </form>
  )
}
