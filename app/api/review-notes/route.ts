import { timingSafeEqual } from "node:crypto"
import { NextResponse } from "next/server"
import {
  hasReviewNoteContent,
  mergePageNotesForSync,
  normalizePagePath,
  normalizeReviewNotes,
  pageDeletionKey,
  type ReviewNote,
} from "@/lib/review-notes"
import {
  clearPageNotesStore,
  getReviewNotesStorageStatus,
  isReviewNotesSharedStorageConfigured,
  readPageNotesStore,
  writePageNotesStore,
} from "@/lib/review-notes-store"
import {
  enforceRateLimit,
  getClientIp,
  parseJsonBodyWithLimit,
  rejectCrossSiteRequest,
  withNoStore,
} from "@/lib/api-security"

const REVIEW_NOTES_MAX_BODY_BYTES = 1_000_000
const REVIEW_NOTES_RATE_LIMIT = {
  windowMs: 60 * 1000,
  maxRequests: 80,
}

const REVIEW_NOTES_ADMIN_TOKEN = process.env.REVIEW_NOTES_ADMIN_TOKEN?.trim() ?? ""

type ReviewDeletionEntry = {
  id: string
  deletedAt: string
}

type ReviewSyncPayload = {
  pagePath: string
  notes: unknown[]
  deletions?: unknown[]
}

type ReviewDeletePayload = {
  pagePath: string
  id?: string
  clear?: boolean
}

function jsonError(
  message: string,
  status: number,
  headers?: HeadersInit
) {
  return NextResponse.json(
    { status: "error", message },
    {
      status,
      headers: withNoStore(headers),
    }
  )
}

function safeTokenEquals(input: string, expected: string) {
  const left = Buffer.from(input)
  const right = Buffer.from(expected)
  if (left.length !== right.length) {
    return false
  }
  return timingSafeEqual(left, right)
}

function requireAdminClearAccess(request: Request) {
  if (!REVIEW_NOTES_ADMIN_TOKEN) {
    return jsonError(
      "Admin clear token is not configured on this server.",
      503
    )
  }

  const providedToken = request.headers.get("x-review-admin-token")?.trim() ?? ""
  if (!providedToken) {
    return jsonError(
      "Admin authorization is required to clear notes.",
      401
    )
  }

  if (!safeTokenEquals(providedToken, REVIEW_NOTES_ADMIN_TOKEN)) {
    return jsonError(
      "Admin authorization failed for clear action.",
      403
    )
  }

  return null
}

function parseDeletions(raw: unknown): ReviewDeletionEntry[] {
  if (!Array.isArray(raw)) {
    return []
  }

  return raw
    .map((entry) => {
      if (!entry || typeof entry !== "object") {
        return null
      }
      const candidate = entry as Partial<ReviewDeletionEntry>
      const id = String(candidate.id ?? "").trim().slice(0, 120)
      if (!id) {
        return null
      }
      const deletedAt =
        typeof candidate.deletedAt === "string" && !Number.isNaN(Date.parse(candidate.deletedAt))
          ? candidate.deletedAt
          : new Date().toISOString()
      return {
        id,
        deletedAt,
      }
    })
    .filter((entry): entry is ReviewDeletionEntry => Boolean(entry))
}

function mergeDeletionMaps(
  left: Record<string, string>,
  right: Record<string, string>
) {
  const next: Record<string, string> = {
    ...left,
  }

  for (const [id, deletedAt] of Object.entries(right)) {
    const existing = next[id]
    if (!existing || Date.parse(deletedAt) >= Date.parse(existing)) {
      next[id] = deletedAt
    }
  }

  return next
}

function toDeletionMap(entries: ReviewDeletionEntry[]) {
  const next: Record<string, string> = {}
  for (const entry of entries) {
    const existing = next[entry.id]
    if (!existing || Date.parse(entry.deletedAt) >= Date.parse(existing)) {
      next[entry.id] = entry.deletedAt
    }
  }
  return next
}

function toScopedDeletionMap(pagePath: string, deletions: Record<string, string>) {
  const scoped: Record<string, string> = {}
  for (const [id, deletedAt] of Object.entries(deletions)) {
    scoped[pageDeletionKey(pagePath, id)] = deletedAt
  }
  return scoped
}

function parseSyncPayload(input: unknown): { pagePath: string; notes: ReviewNote[]; deletions: ReviewDeletionEntry[] } | null {
  if (!input || typeof input !== "object") {
    return null
  }

  const payload = input as ReviewSyncPayload
  const pagePath = normalizePagePath(payload.pagePath)
  if (!pagePath) {
    return null
  }

  const notes = normalizeReviewNotes(payload.notes, pagePath)
  const hasInvalidOrEmptyNote = notes.some((note) => !hasReviewNoteContent(note))
  if (hasInvalidOrEmptyNote) {
    return null
  }

  return {
    pagePath,
    notes,
    deletions: parseDeletions(payload.deletions),
  }
}

function parseDeletePayload(input: unknown): { pagePath: string; id?: string; clear: boolean } | null {
  if (!input || typeof input !== "object") {
    return null
  }

  const payload = input as ReviewDeletePayload
  const pagePath = normalizePagePath(payload.pagePath)
  if (!pagePath) {
    return null
  }

  const id = typeof payload.id === "string" ? payload.id.trim().slice(0, 120) : undefined
  const clear = Boolean(payload.clear)

  if (!clear && !id) {
    return null
  }

  return { pagePath, id, clear }
}

function enforceReviewNotesRateLimit(request: Request) {
  const ipAddress = getClientIp(request)
  return enforceRateLimit({
    key: `review-notes:${ipAddress}`,
    limit: REVIEW_NOTES_RATE_LIMIT.maxRequests,
    windowMs: REVIEW_NOTES_RATE_LIMIT.windowMs,
  })
}

function rejectBlockedRequest(request: Request) {
  const blockedRequest = rejectCrossSiteRequest(request)
  if (blockedRequest) {
    return blockedRequest
  }

  const rateLimit = enforceReviewNotesRateLimit(request)
  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        status: "error",
        message: "Too many review-note requests right now. Please wait and try again.",
      },
      {
        status: 429,
        headers: withNoStore({ "Retry-After": String(rateLimit.retryAfterSeconds) }),
      }
    )
  }

  return null
}

function requireSharedStorageInProduction() {
  if (process.env.NODE_ENV !== "production") {
    return null
  }

  if (isReviewNotesSharedStorageConfigured()) {
    return null
  }

  return jsonError(
    "Review notes shared storage is not configured on this deployment.",
    503
  )
}

export async function GET(request: Request) {
  const blocked = rejectBlockedRequest(request)
  if (blocked) {
    return blocked
  }

  const storageGate = requireSharedStorageInProduction()
  if (storageGate) {
    return storageGate
  }

  const { searchParams } = new URL(request.url)
  const pagePathRaw = searchParams.get("pagePath")
  if (!pagePathRaw) {
    return jsonError("Missing pagePath query parameter.", 400)
  }

  const pagePath = normalizePagePath(pagePathRaw)
  const { notes, updatedAt } = await readPageNotesStore(pagePath)
  const storage = getReviewNotesStorageStatus()

  return NextResponse.json(
    {
      status: "success",
      pagePath,
      notes,
      updatedAt,
      storage,
    },
    {
      headers: withNoStore(),
    }
  )
}

export async function PUT(request: Request) {
  const blocked = rejectBlockedRequest(request)
  if (blocked) {
    return blocked
  }

  const storageGate = requireSharedStorageInProduction()
  if (storageGate) {
    return storageGate
  }

  const bodyResult = await parseJsonBodyWithLimit(request, REVIEW_NOTES_MAX_BODY_BYTES)
  if (!bodyResult.ok) {
    return bodyResult.response
  }

  const parsed = parseSyncPayload(bodyResult.value)
  if (!parsed) {
    return jsonError("Invalid review note payload. Notes must include valid content and pagePath.", 400)
  }

  const { notes: remotePageNotes, deletions: remoteDeletions } = await readPageNotesStore(
    parsed.pagePath
  )

  const clientDeletionMap = toDeletionMap(parsed.deletions)
  const mergedDeletions = mergeDeletionMaps(remoteDeletions, clientDeletionMap)

  const mergedPageNotes = mergePageNotesForSync({
    pageUrl: parsed.pagePath,
    localNotes: parsed.notes,
    remoteNotes: remotePageNotes,
    deletedNotes: toScopedDeletionMap(parsed.pagePath, mergedDeletions),
  }).filter((note) => hasReviewNoteContent(note))
  const writeResult = await writePageNotesStore(parsed.pagePath, mergedPageNotes, {
    deletions: mergedDeletions,
  })
  const storage = getReviewNotesStorageStatus()

  return NextResponse.json(
    {
      status: "success",
      pagePath: parsed.pagePath,
      notes: writeResult.notes,
      updatedAt: writeResult.updatedAt,
      storage,
    },
    {
      headers: withNoStore(),
    }
  )
}

export async function DELETE(request: Request) {
  const blocked = rejectBlockedRequest(request)
  if (blocked) {
    return blocked
  }

  const storageGate = requireSharedStorageInProduction()
  if (storageGate) {
    return storageGate
  }

  const bodyResult = await parseJsonBodyWithLimit(request, REVIEW_NOTES_MAX_BODY_BYTES)
  if (!bodyResult.ok) {
    return bodyResult.response
  }

  const parsed = parseDeletePayload(bodyResult.value)
  if (!parsed) {
    return jsonError("Invalid delete payload. Include pagePath and either id or clear=true.", 400)
  }

  if (parsed.clear) {
    const blocked = requireAdminClearAccess(request)
    if (blocked) {
      return blocked
    }
  }

  let nextPageNotes: ReviewNote[] = []
  let updatedAt = new Date().toISOString()
  if (parsed.clear) {
    const clearResult = await clearPageNotesStore(parsed.pagePath)
    updatedAt = clearResult.updatedAt
  } else {
    const { notes: currentPageNotes, deletions: currentDeletions } = await readPageNotesStore(
      parsed.pagePath
    )
    nextPageNotes = currentPageNotes.filter((note) => note.id !== parsed.id)
    const updatedDeletions = parsed.id
      ? mergeDeletionMaps(currentDeletions, {
          [parsed.id]: new Date().toISOString(),
        })
      : currentDeletions
    const writeResult = await writePageNotesStore(parsed.pagePath, nextPageNotes, {
      deletions: updatedDeletions,
    })
    updatedAt = writeResult.updatedAt
    nextPageNotes = writeResult.notes
  }
  const storage = getReviewNotesStorageStatus()

  return NextResponse.json(
    {
      status: "success",
      pagePath: parsed.pagePath,
      notes: nextPageNotes,
      updatedAt,
      storage,
    },
    {
      headers: withNoStore(),
    }
  )
}
