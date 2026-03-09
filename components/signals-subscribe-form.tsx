"use client"

import { useActionState, useEffect, useRef } from "react"
import { track } from "@vercel/analytics"
import { ArrowRight, MailCheck } from "lucide-react"
import { subscribeToSignals, type SignalsActionState } from "@/app/launchpad/actions"

const initialState: SignalsActionState = {
  status: "idle",
}

type SignalsSubscribeFormProps = {
  source: string
  buttonLabel?: string
  className?: string
}

export function SignalsSubscribeForm({
  source,
  buttonLabel = "Subscribe for signal",
  className,
}: SignalsSubscribeFormProps) {
  const [state, formAction, pending] = useActionState(subscribeToSignals, initialState)
  const trackedStatus = useRef<string | null>(null)

  useEffect(() => {
    if (state.status !== "success" || trackedStatus.current === state.message) {
      return
    }

    trackedStatus.current = state.message ?? "success"
    track("signals_signup_success", { source })
  }, [source, state.message, state.status])

  return (
    <form action={formAction} className={className ?? "space-y-4"}>
      <input type="hidden" name="source" value={source} />
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-foreground">
          Work email
        </span>
        <input
          type="email"
          name="email"
          autoComplete="email"
          required
          placeholder="you@company.com"
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
        {state.status === "success" ? (
          <p className="inline-flex items-start gap-2 text-sm text-teal">
            <MailCheck className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{state.message}</span>
          </p>
        ) : null}
        {state.status === "error" ? (
          <p className="text-sm text-destructive">{state.message}</p>
        ) : null}
      </div>
    </form>
  )
}
