import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { NextResponse } from "next/server"
import {
  enforceRateLimit,
  getClientIp,
  parseJsonBodyWithLimit,
  rejectCrossSiteRequest,
  withNoStore,
} from "@/lib/api-security"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i
const CONTACT_MAX_BODY_BYTES = 20_000
const CONTACT_RATE_LIMIT = {
  windowMs: 10 * 60 * 1000,
  maxRequests: 8,
}

type ContactPayload = {
  fullName: string
  firstName: string
  lastName: string
  email: string
  website: string
  company: string
  interest: string
  message: string
  source: string
  submittedAt: string
}

function normalizeText(input: unknown, maxLength: number) {
  return String(input ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength)
}

function parsePayload(input: unknown): ContactPayload | null {
  if (!input || typeof input !== "object") {
    return null
  }

  const candidate = input as Record<string, unknown>
  const fullName = normalizeText(candidate.fullName, 180)
  let firstName = normalizeText(candidate.firstName, 120)
  let lastName = normalizeText(candidate.lastName, 120)
  const email = normalizeText(candidate.email, 320).toLowerCase()
  const website = normalizeText(candidate.website ?? candidate.company, 320)
  const company = normalizeText(candidate.company ?? candidate.website, 320)
  const interest = normalizeText(candidate.interest, 160)
  const message = normalizeText(candidate.message, 6000)
  const source = normalizeText(candidate.source, 120) || "contact_page"

  if ((!firstName || !lastName) && fullName) {
    const nameParts = fullName.split(/\s+/).filter(Boolean)
    firstName = nameParts[0] ?? ""
    lastName = nameParts.slice(1).join(" ") || "-"
  }

  if (!firstName || !message || !EMAIL_PATTERN.test(email)) {
    return null
  }

  return {
    fullName: fullName || `${firstName}${lastName ? ` ${lastName}` : ""}`.trim(),
    firstName,
    lastName,
    email,
    website,
    company,
    interest,
    message,
    source,
    submittedAt: new Date().toISOString(),
  }
}

async function appendLocalFallback(payload: ContactPayload) {
  const dataDir = path.join(process.cwd(), "data", "contact")
  const filePath = path.join(dataDir, "submissions.ndjson")

  await mkdir(dataDir, { recursive: true })

  let existing = ""
  try {
    existing = await readFile(filePath, "utf8")
  } catch {
    existing = ""
  }

  const alreadyExists = existing
    .split("\n")
    .filter(Boolean)
    .some((line) => {
      try {
        const entry = JSON.parse(line) as Partial<ContactPayload>
      return (
        entry.email?.toLowerCase() === payload.email &&
        entry.message === payload.message &&
        (entry.fullName === payload.fullName ||
          (entry.firstName === payload.firstName && entry.lastName === payload.lastName))
      )
      } catch {
        return false
      }
    })

  if (!alreadyExists) {
    await writeFile(filePath, `${JSON.stringify(payload)}\n`, {
      flag: "a",
      encoding: "utf8",
    })
  }

  return alreadyExists
}

export async function POST(request: Request) {
  const blockedRequest = rejectCrossSiteRequest(request)
  if (blockedRequest) {
    return blockedRequest
  }

  const ipAddress = getClientIp(request)
  const rateLimit = enforceRateLimit({
    key: `contact:${ipAddress}`,
    limit: CONTACT_RATE_LIMIT.maxRequests,
    windowMs: CONTACT_RATE_LIMIT.windowMs,
  })

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        status: "error",
        message: "Too many requests right now. Please wait a moment and try again.",
      },
      {
        status: 429,
        headers: withNoStore({ "Retry-After": String(rateLimit.retryAfterSeconds) }),
      },
    )
  }

  const bodyResult = await parseJsonBodyWithLimit(request, CONTACT_MAX_BODY_BYTES)
  if (!bodyResult.ok) {
    return bodyResult.response
  }

  const body = bodyResult.value
  const parsed = parsePayload(body)
  if (!parsed) {
    return NextResponse.json(
      {
        status: "error",
        message: "Please include your name, work email, and what is happening right now.",
      },
      { status: 400, headers: withNoStore() },
    )
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL?.trim()

  if (webhookUrl) {
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(parsed),
        cache: "no-store",
      })

      if (!response.ok) {
        return NextResponse.json(
          {
            status: "error",
            message: "We could not submit your message right now. Try email and we will respond directly.",
          },
          { status: 502, headers: withNoStore() },
        )
      }

      return NextResponse.json(
        {
          status: "success",
          message:
            "Thanks - we've got it. We'll review your note and reply with a clear next step within one business day.",
        },
        {
          headers: withNoStore(),
        },
      )
    } catch {
      return NextResponse.json(
        {
          status: "error",
          message: "We could not submit your message right now. Try email and we will respond directly.",
        },
        { status: 502, headers: withNoStore() },
      )
    }
  }

  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      {
        status: "error",
        message: "Submission is temporarily unavailable. Email hello@amalgam-inc.com.",
      },
      { status: 503, headers: withNoStore() },
    )
  }

  try {
    const alreadyExists = await appendLocalFallback(parsed)
    return NextResponse.json(
      {
        status: "success",
        message: alreadyExists
          ? "You already sent this context. We will reply directly."
          : "Thanks - we've got it. We'll review your note and reply with a clear next step within one business day.",
      },
      {
        headers: withNoStore(),
      },
    )
  } catch {
    return NextResponse.json(
      {
        status: "error",
        message: "We could not submit your message right now. Try email and we will respond directly.",
      },
      { status: 500, headers: withNoStore() },
    )
  }
}


