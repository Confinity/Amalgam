"use server"

import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"

export type SignalsActionState = {
  status: "idle" | "success" | "error"
  message?: string
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i

export async function subscribeToSignals(
  _previousState: SignalsActionState,
  formData: FormData,
): Promise<SignalsActionState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase()
  const source = String(formData.get("source") ?? "launchpad").trim()

  if (!email || !EMAIL_PATTERN.test(email)) {
    return {
      status: "error",
      message: "Use a valid work email.",
    }
  }

  const payload = {
    email,
    source,
    subscribedAt: new Date().toISOString(),
  }

  const webhookUrl = process.env.SIGNALS_WEBHOOK_URL?.trim()

  if (webhookUrl) {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    })

    if (!response.ok) {
      return {
        status: "error",
        message: "The signup did not go through. Try again or email us directly.",
      }
    }

    return {
      status: "success",
      message: "You are in. We will send practical Launchpad updates when they are worth your attention.",
    }
  }

  const dataDir = path.join(process.cwd(), "data", "signals")
  const filePath = path.join(dataDir, "launchpad-signups.ndjson")

  try {
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
          return entry.email?.toLowerCase() === email
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

    return {
      status: "success",
      message: alreadySubscribed
        ? "You are already subscribed."
        : "You are in. We will send practical Launchpad updates when they are worth your attention.",
    }
  } catch {
    return {
      status: "error",
      message: "The signup did not go through. Try again or email us directly.",
    }
  }
}
