import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { NextResponse } from "next/server"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i

type SignalsPayload = {
  email: string
  source: string
}

function parsePayload(input: unknown): SignalsPayload | null {
  if (!input || typeof input !== "object") {
    return null
  }
  const candidate = input as Record<string, unknown>
  const email = String(candidate.email ?? "")
    .trim()
    .toLowerCase()
  const source = String(candidate.source ?? "launchpad").trim()

  if (!email || !EMAIL_PATTERN.test(email)) {
    return null
  }

  return { email, source }
}

async function appendLocalFallback(payload: {
  email: string
  source: string
  subscribedAt: string
}) {
  const dataDir = path.join(process.cwd(), "data", "signals")
  const filePath = path.join(dataDir, "launchpad-signups.ndjson")

  await mkdir(dataDir, { recursive: true })
  let existing = ""

  try {
    existing = await readFile(filePath, "utf8")
  } catch {
    existing = ""
  }

  const alreadySubscribed = existing
    .split("\n")
    .filter(Boolean)
    .some((line) => {
      try {
        const entry = JSON.parse(line) as { email?: string }
        return entry.email?.toLowerCase() === payload.email
      } catch {
        return false
      }
    })

  if (!alreadySubscribed) {
    await writeFile(filePath, `${JSON.stringify(payload)}\n`, {
      flag: "a",
      encoding: "utf8",
    })
  }

  return alreadySubscribed
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { status: "error", message: "Could not read this signup request." },
      { status: 400 },
    )
  }

  const parsed = parsePayload(body)

  if (!parsed) {
    return NextResponse.json(
      { status: "error", message: "Use a valid work email." },
      { status: 400 },
    )
  }

  const payload = {
    email: parsed.email,
    source: parsed.source,
    subscribedAt: new Date().toISOString(),
  }

  const webhookUrl = process.env.SIGNALS_WEBHOOK_URL?.trim()

  if (webhookUrl) {
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
        cache: "no-store",
      })

      if (!response.ok) {
        return NextResponse.json(
          {
            status: "error",
            message: "The signup did not go through. Try again or email us directly.",
          },
          { status: 502 },
        )
      }

      return NextResponse.json({
        status: "success",
        message: "You are in. We will send practical updates when they are worth your attention.",
      })
    } catch {
      return NextResponse.json(
        {
          status: "error",
          message: "The signup did not go through. Try again or email us directly.",
        },
        { status: 502 },
      )
    }
  }

  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      {
        status: "error",
        message: "Signup is temporarily unavailable. Email hello@amalgam-inc.com.",
      },
      { status: 503 },
    )
  }

  try {
    const alreadySubscribed = await appendLocalFallback(payload)
    return NextResponse.json({
      status: "success",
      message: alreadySubscribed
        ? "You are already subscribed."
        : "You are in. We will send practical updates when they are worth your attention.",
    })
  } catch {
    return NextResponse.json(
      {
        status: "error",
        message: "The signup did not go through. Try again or email us directly.",
      },
      { status: 500 },
    )
  }
}
