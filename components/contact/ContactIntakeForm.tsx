"use client"

import { FormEvent, useEffect, useRef, useState } from "react"
import { track } from "@vercel/analytics"

type FormState = {
  fullName: string
  email: string
  message: string
  interest: string
}

type ContactApiResponse = {
  status?: "success" | "error"
  message?: string
}

type FieldName = "fullName" | "email" | "message"
type FieldErrors = Partial<Record<FieldName, string>>

type ContactIntakeFormProps = {
  initialInterest?: string
  initialContext?: string
}

const initialState: FormState = {
  fullName: "",
  email: "",
  message: "",
  interest: "",
}

const CONTACT_DRAFT_STORAGE_KEY = "amalgam_contact_draft_v3"
const FIELD_ORDER: FieldName[] = ["fullName", "email", "message"]
const EMAIL_HELP_ID = "contact-email-help"
const MESSAGE_HELP_ID = "contact-message-help"

const ALLOWED_INTERESTS = new Set([
  "",
  "strategy-session",
  "founder-review",
  "focused-intervention",
  "execution-sprint",
  "outcome-partnership",
  "careers",
  "general",
])

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function normalizeContext(value: string) {
  return value.replace(/\s+/g, " ").trim().slice(0, 1200)
}

function normalizeInterest(value: string) {
  return ALLOWED_INTERESTS.has(value) ? value : ""
}

function buildSeededMessage(context: string) {
  const normalizedContext = normalizeContext(context)
  if (!normalizedContext) return ""

  return `Context shared from Your Next Move:\n${normalizedContext}\n\nWhat is happening, what are you trying to solve, and where is friction showing up?`
}

function getFieldErrorId(field: FieldName) {
  return `${field}-error`
}

function mergeDescribedBy(...ids: Array<string | undefined>) {
  const value = ids.filter(Boolean).join(" ")
  return value || undefined
}

function mapServerMessageToFieldErrors(message: string) {
  const errors: FieldErrors = {}
  const normalized = message.toLowerCase()

  if (normalized.includes("name")) {
    errors.fullName = "Please add your name."
  }

  if (normalized.includes("work email") || normalized.includes("email")) {
    errors.email = "Please add your email so we can reply."
  }

  if (normalized.includes("happening right now") || normalized.includes("situation")) {
    errors.message = "Please tell us what is happening so we have enough context."
  }

  return errors
}

function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) {
    return { firstName: "", lastName: "" }
  }
  if (parts.length === 1) {
    return { firstName: parts[0]!, lastName: "-" }
  }

  return {
    firstName: parts[0]!,
    lastName: parts.slice(1).join(" "),
  }
}

export function ContactIntakeForm({
  initialInterest = "",
  initialContext = "",
}: ContactIntakeFormProps) {
  const fieldRefs = useRef<{
    fullName: HTMLInputElement | null
    email: HTMLInputElement | null
    message: HTMLTextAreaElement | null
  }>({
    fullName: null,
    email: null,
    message: null,
  })
  const hasTrackedFormStart = useRef(false)
  const submitStartedAt = useRef<number | null>(null)
  const seededInterestFromProps = normalizeInterest(initialInterest)
  const seededMessageFromProps = buildSeededMessage(initialContext)

  const [form, setForm] = useState<FormState>({
    ...initialState,
    interest: seededInterestFromProps,
    message: seededMessageFromProps,
  })
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [hydratedDraft, setHydratedDraft] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const params = new URLSearchParams(window.location.search)
    const urlInterest = normalizeInterest(params.get("interest") ?? "")
    const seededMessage = buildSeededMessage(params.get("context") ?? "")

    const draftRaw = window.sessionStorage.getItem(CONTACT_DRAFT_STORAGE_KEY)
    const draft = draftRaw ? (JSON.parse(draftRaw) as Partial<FormState>) : null

    setForm((current) => ({
      fullName: draft?.fullName ?? current.fullName,
      email: draft?.email ?? current.email,
      message: seededMessageFromProps || seededMessage || draft?.message || current.message,
      interest: seededInterestFromProps || urlInterest || draft?.interest || current.interest || "",
    }))

    setHydratedDraft(true)
  }, [seededInterestFromProps, seededMessageFromProps])

  useEffect(() => {
    if (typeof window === "undefined" || !hydratedDraft) return
    window.sessionStorage.setItem(CONTACT_DRAFT_STORAGE_KEY, JSON.stringify(form))
  }, [form, hydratedDraft])

  function trackFormStart(entryPoint: FieldName) {
    if (hasTrackedFormStart.current) return
    hasTrackedFormStart.current = true

    track("form_started", {
      form_id: "contact_intake",
      source: "contact_page",
      entry_point: entryPoint,
      seeded_interest: form.interest || "none",
    })
  }

  function clearFieldError(field: FieldName) {
    setFieldErrors((current) => {
      if (!current[field]) return current
      const next = { ...current }
      delete next[field]
      return next
    })
  }

  function validate(nextForm: FormState) {
    const errors: FieldErrors = {}

    if (!nextForm.fullName.trim()) {
      errors.fullName = "Please add your name."
    }

    if (!nextForm.email.trim()) {
      errors.email = "Please add your email so we can reply."
    } else if (!isValidEmail(nextForm.email)) {
      errors.email = "Please enter a valid work email."
    }

    if (!nextForm.message.trim()) {
      errors.message = "Please tell us what is happening so we have enough context."
    }

    return errors
  }

  function focusFirstInvalidField(errors: FieldErrors) {
    const firstInvalid = FIELD_ORDER.find((field) => errors[field])
    if (!firstInvalid) return
    fieldRefs.current[firstInvalid]?.focus()
  }

  function setFieldValue(field: FieldName, value: string) {
    trackFormStart(field)
    setForm((current) => ({ ...current, [field]: value }))
    clearFieldError(field)
    if (formError) setFormError("")
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(false)
    setFormError("")
    submitStartedAt.current =
      typeof performance !== "undefined" ? performance.now() : Date.now()

    const errors = validate(form)
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      focusFirstInvalidField(errors)
      track("form_error", {
        form_id: "contact_intake",
        source: "contact_page",
        error_type: "validation",
        invalid_field_count: Object.keys(errors).length,
      })
      return
    }

    setSubmitting(true)
    setFieldErrors({})

    try {
      const { firstName, lastName } = splitName(form.fullName)
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: form.fullName,
          firstName,
          lastName,
          email: form.email,
          website: "",
          company: "",
          message: form.message,
          interest: form.interest,
          source: "contact_page",
        }),
      })

      const data = (await response.json().catch(() => ({}))) as ContactApiResponse

      if (!response.ok || data.status !== "success") {
        const message =
          data.message ??
          "We could not send this right now. Please try again or email hello@amalgam-inc.com."

        if (response.status === 400) {
          const mappedErrors = mapServerMessageToFieldErrors(message)
          if (Object.keys(mappedErrors).length > 0) {
            setFieldErrors(mappedErrors)
            focusFirstInvalidField(mappedErrors)
          } else {
            setFormError(message)
          }
          return
        }

        throw new Error(message)
      }

      const endedAt = typeof performance !== "undefined" ? performance.now() : Date.now()
      track("contact_success", {
        form_id: "contact_intake",
        source: "contact_page",
        latency_ms: Math.round(endedAt - (submitStartedAt.current ?? endedAt)),
      })

      setSubmitted(true)
      setSuccessMessage(
        data.message ??
          "Thanks - we've got it. We'll review your note and reply with the clearest next step within one business day.",
      )
      if (typeof window !== "undefined") {
        window.sessionStorage.removeItem(CONTACT_DRAFT_STORAGE_KEY)
      }
      setForm({
        ...initialState,
        interest: form.interest,
        message: seededMessageFromProps,
      })
    } catch (submissionError) {
      const message =
        submissionError instanceof Error
          ? submissionError.message
          : "We could not send this right now. Please try again or email hello@amalgam-inc.com."
      setFormError(message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact-intake" className="section-space pb-7">
      <div className="container-site">
        <div className="mx-auto max-w-[760px] rounded-[28px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-soft)] md:p-9">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-semibold text-[var(--color-text)]">Share your situation</h2>
            <p className="inline-flex min-h-9 items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-text-subtle)]">
              ~2 min
            </p>
          </div>
          <p className="mt-3 text-sm text-[var(--color-text-muted)]">We usually reply within one business day.</p>

          {submitted ? (
            <div
              role="status"
              aria-live="polite"
              className="mt-5 rounded-2xl border border-[color-mix(in_srgb,var(--color-accent)_24%,var(--color-border))] bg-[var(--color-accent-soft)] px-4 py-3 text-sm text-[var(--color-text)]"
            >
              <p className="font-medium">Thanks - we&apos;ve got it.</p>
              <p className="mt-1">{successMessage}</p>
            </div>
          ) : null}

          <form className="mt-6 space-y-5" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium text-[var(--color-text)]">
                Full name
              </label>
              <input
                ref={(node) => {
                  fieldRefs.current.fullName = node
                }}
                type="text"
                id="fullName"
                name="fullName"
                required
                autoComplete="name"
                maxLength={180}
                value={form.fullName}
                onChange={(event) => setFieldValue("fullName", event.target.value)}
                className="contact-field min-h-11 w-full rounded-xl px-4 py-2.5 text-[var(--color-text)] placeholder:text-[var(--color-text-subtle)] focus:outline-none focus:ring-2 focus:ring-[color-mix(in_srgb,var(--color-accent)_20%,transparent)]"
                placeholder="Jane Smith"
                aria-invalid={Boolean(fieldErrors.fullName)}
                aria-describedby={fieldErrors.fullName ? getFieldErrorId("fullName") : undefined}
              />
              {fieldErrors.fullName ? (
                <p id={getFieldErrorId("fullName")} className="mt-1.5 text-sm text-[var(--color-danger)]">
                  {fieldErrors.fullName}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[var(--color-text)]">
                Work email
              </label>
              <input
                ref={(node) => {
                  fieldRefs.current.email = node
                }}
                type="email"
                id="email"
                name="email"
                required
                autoComplete="email"
                inputMode="email"
                spellCheck={false}
                maxLength={320}
                value={form.email}
                onChange={(event) => setFieldValue("email", event.target.value)}
                className="contact-field min-h-11 w-full rounded-xl px-4 py-2.5 text-[var(--color-text)] placeholder:text-[var(--color-text-subtle)] focus:outline-none focus:ring-2 focus:ring-[color-mix(in_srgb,var(--color-accent)_20%,transparent)]"
                placeholder="jane@company.com"
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={mergeDescribedBy(
                  fieldErrors.email ? getFieldErrorId("email") : undefined,
                  EMAIL_HELP_ID,
                )}
              />
              <p id={EMAIL_HELP_ID} className="mt-1 text-xs text-[var(--color-text-subtle)]">
                We only use this to reply.
              </p>
              {fieldErrors.email ? (
                <p id={getFieldErrorId("email")} className="mt-1.5 text-sm text-[var(--color-danger)]">
                  {fieldErrors.email}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-[var(--color-text)]">
                What&apos;s happening right now?
              </label>
              <textarea
                ref={(node) => {
                  fieldRefs.current.message = node
                }}
                id="message"
                name="message"
                rows={6}
                required
                maxLength={6000}
                value={form.message}
                onChange={(event) => setFieldValue("message", event.target.value)}
                className="contact-field min-h-[176px] w-full resize-y rounded-xl px-4 py-3 text-[var(--color-text)] placeholder:text-[var(--color-text-subtle)] focus:outline-none focus:ring-2 focus:ring-[color-mix(in_srgb,var(--color-accent)_20%,transparent)]"
                placeholder="What is slowing things down, what outcome do you need, and where is the risk showing up?"
                aria-invalid={Boolean(fieldErrors.message)}
                aria-describedby={mergeDescribedBy(
                  fieldErrors.message ? getFieldErrorId("message") : undefined,
                  MESSAGE_HELP_ID,
                )}
              />
              <p id={MESSAGE_HELP_ID} className="mt-1 text-xs text-[var(--color-text-subtle)]">
                Include the blocker, timeline pressure, and the outcome you need.
              </p>
              {fieldErrors.message ? (
                <p id={getFieldErrorId("message")} className="mt-1.5 text-sm text-[var(--color-danger)]">
                  {fieldErrors.message}
                </p>
              ) : null}
            </div>

            {formError ? (
              <p
                role="alert"
                aria-live="polite"
                className="rounded-xl border border-[color-mix(in_srgb,var(--color-danger)_24%,var(--color-border))] bg-[color-mix(in_srgb,var(--color-danger)_10%,white)] px-4 py-3 text-sm text-[var(--color-danger)]"
              >
                {formError}
              </p>
            ) : null}

            <div className="pt-1">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-[var(--color-primary)] px-6 py-3 font-medium text-[var(--color-text-inverse)] transition-colors duration-150 hover:bg-[var(--color-primary-hover)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Sending..." : "Send message"}
              </button>
            </div>
          </form>

          <p className="mt-4 text-center text-sm text-[var(--color-text-muted)]">Prefer email?</p>
          <a
            href="mailto:hello@amalgam-inc.com?subject=Contact%20Amalgam"
            className="mt-1 flex min-h-11 w-fit items-center justify-center mx-auto font-medium text-[var(--color-text)] underline underline-offset-4"
            onClick={() =>
              track("contact_channel_clicked", {
                channel: "email",
                location: "contact_form_fallback",
              })
            }
          >
            hello@amalgam-inc.com
          </a>
        </div>
      </div>
    </section>
  )
}
