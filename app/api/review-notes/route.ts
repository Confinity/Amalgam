import { NextResponse } from "next/server"

const DEFAULT_REVIEW_NOTES_STORE_URL =
  "https://jsonblob.com/api/jsonBlob/019cd9ac-4875-7fa4-9d22-d380a855b21b"
const REVIEW_NOTES_STORE_URL =
  process.env.REVIEW_NOTES_STORE_URL?.trim() ||
  process.env.NEXT_PUBLIC_REVIEW_NOTES_URL?.trim() ||
  DEFAULT_REVIEW_NOTES_STORE_URL

export const dynamic = "force-dynamic"

function emptyStore() {
  return {
    version: 1,
    updatedAt: new Date().toISOString(),
    pages: {},
  }
}

function noStoreHeaders() {
  return {
    "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
  }
}

function isJsonObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value)
}

export async function GET() {
  try {
    const response = await fetch(REVIEW_NOTES_STORE_URL, {
      method: "GET",
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      return NextResponse.json(
        { ok: false, error: "Could not read review notes upstream." },
        { status: 502, headers: noStoreHeaders() }
      )
    }

    const payload = (await response.json().catch(() => null)) as unknown
    return NextResponse.json(isJsonObject(payload) ? payload : emptyStore(), {
      headers: noStoreHeaders(),
    })
  } catch {
    return NextResponse.json(
      { ok: false, error: "Review notes upstream is unavailable." },
      { status: 502, headers: noStoreHeaders() }
    )
  }
}

export async function PUT(request: Request) {
  let payload: unknown
  try {
    payload = (await request.json()) as unknown
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400, headers: noStoreHeaders() }
    )
  }

  if (!isJsonObject(payload)) {
    return NextResponse.json(
      { ok: false, error: "Payload must be a JSON object." },
      { status: 400, headers: noStoreHeaders() }
    )
  }

  try {
    const upstream = await fetch(REVIEW_NOTES_STORE_URL, {
      method: "PUT",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!upstream.ok) {
      return NextResponse.json(
        { ok: false, error: "Could not write review notes upstream." },
        { status: 502, headers: noStoreHeaders() }
      )
    }

    return NextResponse.json(
      { ok: true },
      {
        headers: noStoreHeaders(),
      }
    )
  } catch {
    return NextResponse.json(
      { ok: false, error: "Review notes upstream is unavailable." },
      { status: 502, headers: noStoreHeaders() }
    )
  }
}
