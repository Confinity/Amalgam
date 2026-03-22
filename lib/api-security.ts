import { NextResponse } from "next/server"

type RateLimitBucket = {
  count: number
  resetAt: number
}

type RateLimitOptions = {
  key: string
  limit: number
  windowMs: number
}

type JsonBodyParseResult =
  | { ok: true; value: unknown }
  | { ok: false; response: NextResponse }

const RATE_LIMIT_BUCKETS = new Map<string, RateLimitBucket>()
const MAX_RATE_BUCKETS = 5000

const SAME_SITE_VALUES = new Set(["same-origin", "same-site", "none"])

function nowMs() {
  return Date.now()
}

function jsonError(message: string, status: number, headers?: HeadersInit) {
  return NextResponse.json(
    { status: "error", message },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
        ...headers,
      },
    },
  )
}

function pruneRateLimitBuckets(currentTime: number) {
  if (RATE_LIMIT_BUCKETS.size < MAX_RATE_BUCKETS) {
    return
  }

  for (const [key, bucket] of RATE_LIMIT_BUCKETS.entries()) {
    if (bucket.resetAt <= currentTime) {
      RATE_LIMIT_BUCKETS.delete(key)
    }
  }

  // If still oversized (e.g., high-traffic burst), remove oldest-ish entries.
  if (RATE_LIMIT_BUCKETS.size <= MAX_RATE_BUCKETS) {
    return
  }

  const overflow = RATE_LIMIT_BUCKETS.size - MAX_RATE_BUCKETS
  let removed = 0
  for (const key of RATE_LIMIT_BUCKETS.keys()) {
    RATE_LIMIT_BUCKETS.delete(key)
    removed += 1
    if (removed >= overflow) {
      break
    }
  }
}

export function getClientIp(request: Request) {
  const fromForwarded = request.headers.get("x-forwarded-for")
  if (fromForwarded) {
    const [first] = fromForwarded.split(",")
    const candidate = first?.trim()
    if (candidate) {
      return candidate
    }
  }

  const fromRealIp = request.headers.get("x-real-ip")?.trim()
  if (fromRealIp) {
    return fromRealIp
  }

  return "unknown"
}

export function enforceRateLimit(options: RateLimitOptions) {
  const { key, limit, windowMs } = options
  const currentTime = nowMs()
  pruneRateLimitBuckets(currentTime)

  const existing = RATE_LIMIT_BUCKETS.get(key)
  if (!existing || existing.resetAt <= currentTime) {
    RATE_LIMIT_BUCKETS.set(key, {
      count: 1,
      resetAt: currentTime + windowMs,
    })
    return { allowed: true, retryAfterSeconds: 0 }
  }

  existing.count += 1
  RATE_LIMIT_BUCKETS.set(key, existing)

  if (existing.count <= limit) {
    return { allowed: true, retryAfterSeconds: 0 }
  }

  return {
    allowed: false,
    retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - currentTime) / 1000)),
  }
}

export function rejectCrossSiteRequest(request: Request) {
  const secFetchSite = request.headers.get("sec-fetch-site")?.toLowerCase()
  if (!secFetchSite) {
    return null
  }

  if (SAME_SITE_VALUES.has(secFetchSite)) {
    return null
  }

  return jsonError("This request origin is not allowed.", 403)
}

export async function parseJsonBodyWithLimit(request: Request, maxBytes: number): Promise<JsonBodyParseResult> {
  const contentType = request.headers.get("content-type")?.toLowerCase() ?? ""
  if (!contentType.includes("application/json")) {
    return {
      ok: false,
      response: jsonError("Expected JSON request body.", 415),
    }
  }

  let rawBody = ""
  try {
    rawBody = await request.text()
  } catch {
    return {
      ok: false,
      response: jsonError("Could not read this request.", 400),
    }
  }

  const bodyBytes = new TextEncoder().encode(rawBody).byteLength
  if (bodyBytes > maxBytes) {
    return {
      ok: false,
      response: jsonError("Request body is too large.", 413),
    }
  }

  try {
    return {
      ok: true,
      value: JSON.parse(rawBody) as unknown,
    }
  } catch {
    return {
      ok: false,
      response: jsonError("Could not read this request.", 400),
    }
  }
}

export function withNoStore(headers?: HeadersInit): HeadersInit {
  return {
    "Cache-Control": "no-store",
    ...headers,
  }
}
