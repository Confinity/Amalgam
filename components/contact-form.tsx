"use client"

import { FormEvent, useEffect, useMemo, useState } from "react"
import { ArrowRight, CheckCircle2, Copy, Mail, Phone, Send } from "lucide-react"

type FormState = {
  firstName: string
  lastName: string
  email: string
  company: string
  interest: string
  message: string
}

const initialState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  interest: "",
  message: "",
}

const interestLabels: Record<string, string> = {
  "": "General inquiry",
  "strategy-session": "Strategy call",
  "founder-review": "Founder Review",
  "execution-sprint": "Execution Sprint",
  "outcome-partnership": "Outcome Partnership",
  careers: "Careers",
  general: "General inquiry",
}

const CONTACT_DRAFT_STORAGE_KEY = "amalgam_contact_draft_v1"

type ContactFormProps = {
  initialInterest?: string
}

type ContactApiResponse = {
  status?: "success" | "error"
  message?: string
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function buildSummary(form: FormState) {
  return [
    `Name: ${form.firstName} ${form.lastName}`.trim(),
    `Email: ${form.email}`,
    `Company: ${form.company || "Not provided"}`,
    `Interest: ${interestLabels[form.interest] ?? "General inquiry"}`,
    "",
    "Situation:",
    form.message,
  ].join("\n")
}

export function ContactForm({ initialInterest = "" }: ContactFormProps) {
  const normalizeInterest = (value: string) => (value in interestLabels ? value : "")
  const normalizeContext = (value: string) =>
    value.replace(/\s+/g, " ").trim().slice(0, 1200)

  const getInitialInterest = () => {
    const seededInterest = normalizeInterest(initialInterest)
    if (seededInterest) {
      return seededInterest
    }

    if (typeof window === "undefined") {
      return ""
    }

    const urlInterest = new URLSearchParams(window.location.search).get("interest") ?? ""
    return normalizeInterest(urlInterest)
  }

  const getInitialMessage = () => {
    if (typeof window === "undefined") {
      return ""
    }

    const rawContext = new URLSearchParams(window.location.search).get("context") ?? ""
    if (!rawContext) {
      return ""
    }

    const context = normalizeContext(rawContext)
    if (!context) {
      return ""
    }

    return `Context shared from Launchpad:\n${context}\n\nWhat is happening, what are you trying to solve, and where is friction showing up?`
  }

  const loadDraft = () => {
    if (typeof window === "undefined") {
      return null
    }

    try {
      const raw = window.sessionStorage.getItem(CONTACT_DRAFT_STORAGE_KEY)
      if (!raw) {
        return null
      }
      const parsed = JSON.parse(raw) as Partial<FormState>
      if (!parsed || typeof parsed !== "object") {
        return null
      }
      return {
        firstName: typeof parsed.firstName === "string" ? parsed.firstName : "",
        lastName: typeof parsed.lastName === "string" ? parsed.lastName : "",
        email: typeof parsed.email === "string" ? parsed.email : "",
        company: typeof parsed.company === "string" ? parsed.company : "",
        interest: typeof parsed.interest === "string" ? normalizeInterest(parsed.interest) : "",
        message: typeof parsed.message === "string" ? parsed.message.slice(0, 6000) : "",
      } satisfies FormState
    } catch {
      return null
    }
  }

  const resetToSeededState = () => ({
    ...initialState,
    interest: getInitialInterest(),
    message: getInitialMessage(),
  })

  const [form, setForm] = useState<FormState>(() => {
    const draft = loadDraft()
    const seeded = resetToSeededState()

    return {
      ...seeded,
      ...(draft ?? {}),
      interest: seeded.interest || draft?.interest || "",
      message: seeded.message || draft?.message || "",
    }
  })
  const [error, setError] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle")
  const [draftCleared, setDraftCleared] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }
    window.sessionStorage.setItem(CONTACT_DRAFT_STORAGE_KEY, JSON.stringify(form))
  }, [form])

  useEffect(() => {
    if (copyStatus === "idle") {
      return
    }
    const timeout = window.setTimeout(() => setCopyStatus("idle"), 1800)
    return () => window.clearTimeout(timeout)
  }, [copyStatus])

  const hasDraftContent = useMemo(
    () =>
      Boolean(
        form.firstName ||
          form.lastName ||
          form.email ||
          form.company ||
          form.interest ||
          form.message,
      ),
    [form],
  )

  const summaryBody = useMemo(() => buildSummary(form), [form])
  const mailtoHref = useMemo(() => {
    const subject = `${interestLabels[form.interest] ?? "General inquiry"} - ${form.firstName} ${form.lastName}`.trim()
    return `mailto:hello@amalgam-inc.com?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(summaryBody)}`
  }, [form, summaryBody])

  async function copySummaryToClipboard() {
    try {
      await navigator.clipboard.writeText(summaryBody)
      setCopyStatus("copied")
      return true
    } catch {
      setCopyStatus("error")
      return false
    }
  }

  async function handleOpenEmailDraft() {
    if (!form.message.trim()) {
      setError("Add a short situation summary first so the draft is useful.")
      return
    }

    setError("")
    await copySummaryToClipboard()
    window.location.href = mailtoHref
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    setSubmitted(false)

    if (!form.firstName || !form.lastName || !form.email || !form.message) {
      setError("Please complete first name, last name, work email, and your situation summary.")
      return
    }

    if (!isValidEmail(form.email)) {
      setError("Please enter a valid work email address.")
      return
    }

    setSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          source: "contact-page",
        }),
      })

      const data = (await response.json()) as ContactApiResponse

      if (!response.ok || data.status !== "success") {
        throw new Error(
          data.message ??
            "We could not submit your message right now. Open an email draft instead.",
        )
      }

      setSubmitted(true)
      setSuccessMessage(
        data.message ?? "Message sent. We will reply directly within one business day.",
      )
      if (typeof window !== "undefined") {
        window.sessionStorage.removeItem(CONTACT_DRAFT_STORAGE_KEY)
      }
      setForm(resetToSeededState())
    } catch (submissionError) {
      const message =
        submissionError instanceof Error
          ? submissionError.message
          : "We could not submit your message right now. Open an email draft instead."
      setError(message)
      await copySummaryToClipboard()
    } finally {
      setSubmitting(false)
    }
  }

  function clearDraft() {
    setForm(resetToSeededState())
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem(CONTACT_DRAFT_STORAGE_KEY)
    }
    setDraftCleared(true)
    setTimeout(() => setDraftCleared(false), 1800)
  }

  return (
    <div id="contact-intake" className="contact-intake-panel rounded-[28px] border border-border bg-background p-8 shadow-sm">
      <div className="contact-intake-note mb-6 rounded-[24px] border border-border bg-secondary/30 p-5">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
          Direct intake
        </p>
        <div className="contact-intake-note-grid mt-3 grid gap-3 sm:grid-cols-2">
          <div className="contact-intake-note-item rounded-2xl bg-background px-4 py-4">
            <p className="text-sm font-medium text-foreground">Best when you want a direct read quickly</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Send context directly through the site and we route it to the team.
            </p>
          </div>
          <div className="contact-intake-note-item rounded-2xl bg-background px-4 py-4">
            <p className="text-sm font-medium text-foreground">Prefer email? That still works</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              You can open a ready-to-send email draft with your details prefilled.
            </p>
          </div>
        </div>
      </div>

      <h2 className="mb-2 text-xl font-semibold text-foreground">Share your situation</h2>
      <p className="mb-6 text-sm text-muted-foreground">
        We usually reply within one business day.
      </p>
      <p className="mb-6 text-xs text-muted-foreground">
        Your draft autosaves in this browser tab while you write.
      </p>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <p className="mb-3 text-sm font-medium text-foreground">Quick paths</p>
          <div className="contact-common-paths flex flex-wrap gap-2">
            {[
              { value: "strategy-session", label: "Strategy call" },
              { value: "founder-review", label: "Founder Review" },
              { value: "execution-sprint", label: "Execution Sprint" },
              { value: "outcome-partnership", label: "Outcome Partnership" },
              { value: "careers", label: "Careers" },
              { value: "general", label: "General inquiry" },
            ].map((option) => {
              const selected = form.interest === option.value

              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={selected}
                  className={`contact-path-button min-h-11 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    selected
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-background text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() =>
                    setForm((current) => ({
                      ...current,
                      interest: option.value,
                    }))
                  }
                >
                  {option.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="mb-1.5 block text-sm font-medium text-foreground">
              First name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              value={form.firstName}
              onChange={(event) =>
                setForm((current) => ({ ...current, firstName: event.target.value }))
              }
              className="contact-field w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
              placeholder="Jane"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="mb-1.5 block text-sm font-medium text-foreground">
              Last name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              value={form.lastName}
              onChange={(event) =>
                setForm((current) => ({ ...current, lastName: event.target.value }))
              }
              className="contact-field w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
              placeholder="Smith"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
            Work email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            className="contact-field w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
            placeholder="jane@company.com"
          />
        </div>

        <div>
          <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-foreground">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={form.company}
            onChange={(event) => setForm((current) => ({ ...current, company: event.target.value }))}
            className="contact-field w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
            placeholder="Your company"
          />
        </div>

        <div>
          <label htmlFor="interest" className="mb-1.5 block text-sm font-medium text-foreground">
            What kind of help do you want?
          </label>
          <select
            id="interest"
            name="interest"
            value={form.interest}
            onChange={(event) => setForm((current) => ({ ...current, interest: event.target.value }))}
            className="contact-field w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
          >
            <option value="">Select an option</option>
            <option value="strategy-session">Strategy call</option>
            <option value="founder-review">Founder Review</option>
            <option value="execution-sprint">Execution Sprint</option>
            <option value="outcome-partnership">Outcome Partnership</option>
            <option value="careers">Careers</option>
            <option value="general">General inquiry</option>
          </select>
          <p className="mt-2 text-xs text-muted-foreground">
            Pick the closest fit. If unsure, choose general inquiry.
          </p>
        </div>

        <div>
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
            What is happening right now?
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            value={form.message}
            onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
            className="contact-field contact-field--textarea w-full resize-none rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
            placeholder="What is slowing things down, what outcome do you need, and where is the risk showing up?"
          />
        </div>

        {submitted ? (
          <div
            role="status"
            aria-live="polite"
            className="rounded-2xl border border-teal/20 bg-teal/5 p-4 text-sm text-muted-foreground"
          >
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
              <div className="space-y-1">
                <p className="font-medium text-foreground">Message sent.</p>
                <p>{successMessage}</p>
              </div>
            </div>
          </div>
        ) : null}

        {error ? (
          <p
            role="alert"
            aria-live="polite"
            className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
          >
            {error}
          </p>
        ) : null}

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="submit"
            disabled={submitting}
            className="contact-primary-cta inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-foreground px-6 py-3 font-medium text-background transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Sending..." : "Send through website"}
            <Send className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleOpenEmailDraft}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Open email draft
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>

      <div className="contact-secondary-actions mt-6 grid gap-3 sm:grid-cols-2">
        <a
          href="mailto:hello@amalgam-inc.com"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          <Mail className="h-4 w-4" />
          Email directly
        </a>
        <a
          href="tel:+14843548498"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          <Phone className="h-4 w-4" />
          Call Amalgam
        </a>
      </div>

      <div className="mt-3">
        <button
          type="button"
          onClick={clearDraft}
          disabled={!hasDraftContent}
          className="inline-flex min-h-11 items-center justify-center rounded-lg border border-border px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:cursor-not-allowed disabled:opacity-45"
        >
          {draftCleared ? "Draft cleared" : "Clear saved draft"}
        </button>
      </div>

      <div className="contact-control-note mt-4 inline-flex items-center gap-2 text-xs text-muted-foreground">
        <Copy className="h-3.5 w-3.5" />
        {copyStatus === "copied"
          ? "Copied to clipboard."
          : copyStatus === "error"
            ? "Clipboard unavailable. Use direct email if needed."
            : "If web submit fails, the email draft flow keeps your message intact."}
      </div>
    </div>
  )
}

