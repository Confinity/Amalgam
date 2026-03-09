"use client"

import { FormEvent, useMemo, useState } from "react"
import { ArrowRight, CheckCircle2, Copy, Mail, Phone } from "lucide-react"

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
  "strategy-session": "Free strategy call",
  "founder-review": "Diagnostic Review",
  "execution-sprint": "Execution Sprint",
  "outcome-partnership": "Outcome Partnership",
  careers: "Careers",
  general: "General inquiry",
}

type ContactFormProps = {
  initialInterest?: string
}

export function ContactForm({ initialInterest = "" }: ContactFormProps) {
  const normalizeInterest = (value: string) => (value in interestLabels ? value : "")
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

  const [form, setForm] = useState<FormState>({
    ...initialState,
    interest: getInitialInterest(),
  })
  const [error, setError] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [copied, setCopied] = useState(false)

  const mailtoHref = useMemo(() => {
    const subject = `${interestLabels[form.interest] ?? "General inquiry"} - ${form.firstName} ${form.lastName}`.trim()
    const body = [
      `Name: ${form.firstName} ${form.lastName}`.trim(),
      `Email: ${form.email}`,
      `Company: ${form.company || "Not provided"}`,
      `Interest: ${interestLabels[form.interest] ?? "General inquiry"}`,
      "",
      "Situation:",
      form.message,
    ].join("\n")

    return `mailto:hello@amalgam-inc.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`
  }, [form])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")

    if (!form.firstName || !form.lastName || !form.email || !form.message) {
      setError("Please complete the required fields before sending.")
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid work email address.")
      return
    }

    const clipboardBody = [
      `Name: ${form.firstName} ${form.lastName}`.trim(),
      `Email: ${form.email}`,
      `Company: ${form.company || "Not provided"}`,
      `Interest: ${interestLabels[form.interest] ?? "General inquiry"}`,
      "",
      "Situation:",
      form.message,
    ].join("\n")

    try {
      await navigator.clipboard.writeText(clipboardBody)
      setCopied(true)
    } catch {
      setCopied(false)
    }

    setSubmitted(true)
    window.location.href = mailtoHref
  }

  return (
    <div className="contact-intake-panel rounded-[28px] border border-border bg-background p-8 shadow-sm">
      <div className="contact-intake-note mb-6 rounded-[24px] border border-border bg-secondary/30 p-5">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
          Direct intake
        </p>
        <div className="contact-intake-note-grid mt-3 grid gap-3 sm:grid-cols-2">
          <div className="contact-intake-note-item rounded-2xl bg-background px-4 py-4">
            <p className="text-sm font-medium text-foreground">Best for serious situations</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Use this when the business is genuinely stuck and you want the message to land clearly.
            </p>
          </div>
          <div className="contact-intake-note-item rounded-2xl bg-background px-4 py-4">
            <p className="text-sm font-medium text-foreground">No black-box handoff</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              The form drafts the email so your exact context stays visible and reusable.
            </p>
          </div>
        </div>
      </div>
      <h2 className="mb-2 text-xl font-semibold text-foreground">Send us a message</h2>
      <p className="mb-6 text-sm text-muted-foreground">
        This opens a drafted email to hello@amalgam-inc.com with your notes already formatted.
      </p>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <p className="mb-3 text-sm font-medium text-foreground">Common paths</p>
          <div className="contact-common-paths flex flex-wrap gap-2">
            {[
              { value: "strategy-session", label: "Free strategy call" },
              { value: "founder-review", label: "Diagnostic Review" },
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
              onChange={(event) => setForm((current) => ({ ...current, firstName: event.target.value }))}
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
              onChange={(event) => setForm((current) => ({ ...current, lastName: event.target.value }))}
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
            What are you interested in?
          </label>
          <select
            id="interest"
            name="interest"
            value={form.interest}
            onChange={(event) => setForm((current) => ({ ...current, interest: event.target.value }))}
            className="contact-field w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
          >
            <option value="">Select an option</option>
            <option value="strategy-session">Free strategy call</option>
            <option value="founder-review">Diagnostic Review</option>
            <option value="execution-sprint">Execution Sprint</option>
            <option value="outcome-partnership">Outcome Partnership</option>
            <option value="careers">Careers</option>
            <option value="general">General inquiry</option>
          </select>
          <p className="mt-2 text-xs text-muted-foreground">
            Choose the closest fit. If you are unsure, leave it as a general inquiry.
          </p>
        </div>

        <div>
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
            Tell us about your situation
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            value={form.message}
            onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
            className="contact-field contact-field--textarea w-full resize-none rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
            placeholder="What is happening, what are you trying to solve, and where is the friction showing up?"
          />
        </div>

        {error ? (
          <p
            role="alert"
            aria-live="polite"
            className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
          >
            {error}
          </p>
        ) : null}

        {submitted ? (
          <div
            role="status"
            aria-live="polite"
            className="rounded-2xl border border-teal/20 bg-teal/5 p-4 text-sm text-muted-foreground"
          >
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
              <div className="space-y-2">
                <p className="font-medium text-foreground">Draft ready.</p>
                <p>
                  Your email app should now be open with the message prefilled for
                  hello@amalgam-inc.com.
                </p>
                <p>
                  {copied
                    ? "The message details were also copied to your clipboard as a fallback."
                    : "If the draft did not open, use the direct email link below."}
                </p>
              </div>
            </div>
          </div>
        ) : null}

        <button
          type="submit"
          className="contact-primary-cta inline-flex w-full items-center justify-center gap-2 rounded-lg bg-foreground px-6 py-3 font-medium text-background transition-all hover:opacity-90"
        >
          Open email draft
          <ArrowRight className="h-4 w-4" />
        </button>
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

      <div className="contact-control-note mt-4 inline-flex items-center gap-2 text-xs text-muted-foreground">
        <Copy className="h-3.5 w-3.5" />
        No black-box submission flow. You stay in control, and the message can be copied if your mail app does not open.
      </div>
    </div>
  )
}
