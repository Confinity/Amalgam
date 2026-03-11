import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { NextResponse } from "next/server"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i

type ContactPayload = {
  firstName: string
  lastName: string
  email: string
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
  const firstName = normalizeText(candidate.firstName, 120)
  const lastName = normalizeText(candidate.lastName, 120)
  const email = normalizeText(candidate.email, 320).toLowerCase()
  const company = normalizeText(candidate.company, 320)
  const interest = normalizeText(candidate.interest, 160)
  const message = normalizeText(candidate.message, 6000)
  const source = normalizeText(candidate.source, 120) || "contact-page"

  if (!firstName || !lastName || !message || !EMAIL_PATTERN.test(email)) {
    return null
  }

  return {
    firstName,
    lastName,
    email,
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
          entry.firstName === payload.firstName &&
          entry.lastName === payload.lastName
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
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { status: "error", message: "Could not read this request." },
      { status: 400 },
    )
  }

  const parsed = parsePayload(body)
  if (!parsed) {
    return NextResponse.json(
      {
        status: "error",
        message: "Please include first name, last name, work email, and a clear situation summary.",
      },
      { status: 400 },
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
          { status: 502 },
        )
      }

      return NextResponse.json({
        status: "success",
        message: "Message sent. We will reply directly within one business day.",
      })
    } catch {
      return NextResponse.json(
        {
          status: "error",
          message: "We could not submit your message right now. Try email and we will respond directly.",
        },
        { status: 502 },
      )
    }
  }

  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      {
        status: "error",
        message: "Submission is temporarily unavailable. Email hello@amalgam-inc.com.",
      },
      { status: 503 },
    )
  }

  try {
    const alreadyExists = await appendLocalFallback(parsed)
    return NextResponse.json({
      status: "success",
      message: alreadyExists
        ? "You already sent this context. We will reply directly."
        : "Message sent. We will reply directly within one business day.",
    })
  } catch {
    return NextResponse.json(
      {
        status: "error",
        message: "We could not submit your message right now. Try email and we will respond directly.",
      },
      { status: 500 },
    )
  }
}

