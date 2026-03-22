import { mkdir, readFile, rename, writeFile } from "node:fs/promises"
import path from "node:path"
import {
  createEmptyReviewNotesStore,
  normalizeReviewNotes,
  normalizeReviewNotesStore,
  sortReviewNotesByCreated,
  type ReviewNote,
  type ReviewNoteTombstones,
} from "@/lib/review-notes"

const REVIEW_DATA_DIR = path.join(process.cwd(), "data", "review")
const REVIEW_DATA_FILE = path.join(REVIEW_DATA_DIR, "notes-store.json")

const KV_REST_URL =
  process.env.KV_REST_API_URL?.trim() ??
  process.env.UPSTASH_REDIS_REST_URL?.trim() ??
  ""
const KV_REST_TOKEN =
  process.env.KV_REST_API_TOKEN?.trim() ??
  process.env.UPSTASH_REDIS_REST_TOKEN?.trim() ??
  ""
const KV_KEY_PREFIX = (process.env.REVIEW_NOTES_KV_PREFIX ?? "amalgam:review-notes:v1").trim()
const KV_ENABLED = Boolean(KV_REST_URL && KV_REST_TOKEN)
const TOMBSTONE_MAX_AGE_MS_FALLBACK = 30 * 24 * 60 * 60 * 1000
const TOMBSTONE_MAX_AGE_MS = Math.max(
  60_000,
  Number(process.env.REVIEW_NOTES_TOMBSTONE_MAX_AGE_MS ?? TOMBSTONE_MAX_AGE_MS_FALLBACK)
)
let fileStoreOperationQueue: Promise<void> = Promise.resolve()

type StoredPagePayload = {
  updatedAt?: unknown
  notes?: unknown
  deletions?: unknown
}

type StoreReadResult = {
  notes: ReviewNote[]
  updatedAt: string
  deletions: ReviewNoteTombstones
}

type StoreWriteInput = {
  notes: ReviewNote[]
  deletions?: ReviewNoteTombstones
}

type UpstashResult<T> = {
  result?: T
  error?: string
}

function toIsoOrNow(input: unknown) {
  return typeof input === "string" && !Number.isNaN(Date.parse(input))
    ? input
    : new Date().toISOString()
}

function toIsoOrEmpty(input: unknown) {
  const iso = typeof input === "string" ? input.trim() : ""
  if (!iso) {
    return ""
  }
  return Number.isNaN(Date.parse(iso)) ? "" : iso
}

function toMillis(iso: string) {
  const parsed = Date.parse(iso)
  return Number.isNaN(parsed) ? 0 : parsed
}

function normalizeDeletionMap(raw: unknown): ReviewNoteTombstones {
  if (!raw || typeof raw !== "object") {
    return {}
  }

  const next: ReviewNoteTombstones = {}
  for (const [idRaw, deletedAtRaw] of Object.entries(raw)) {
    const id = String(idRaw ?? "").trim().slice(0, 120)
    const deletedAt = toIsoOrEmpty(deletedAtRaw)
    if (!id || !deletedAt) {
      continue
    }
    next[id] = deletedAt
  }
  return next
}

function mergeDeletionMaps(...maps: ReviewNoteTombstones[]) {
  const merged: ReviewNoteTombstones = {}

  for (const map of maps) {
    for (const [id, deletedAt] of Object.entries(map)) {
      const current = merged[id]
      if (!current || toMillis(deletedAt) >= toMillis(current)) {
        merged[id] = deletedAt
      }
    }
  }

  return merged
}

function pruneDeletionMap(raw: ReviewNoteTombstones, nowIso = new Date().toISOString()) {
  const maxAgeMs = Number.isFinite(TOMBSTONE_MAX_AGE_MS)
    ? TOMBSTONE_MAX_AGE_MS
    : TOMBSTONE_MAX_AGE_MS_FALLBACK
  const thresholdMs = toMillis(nowIso) - maxAgeMs
  const next: ReviewNoteTombstones = {}

  for (const [id, deletedAt] of Object.entries(raw)) {
    if (toMillis(deletedAt) >= thresholdMs) {
      next[id] = deletedAt
    }
  }

  return next
}

function normalizePersistedDeletions(
  notes: ReviewNote[],
  deletions: ReviewNoteTombstones,
  nowIso = new Date().toISOString()
) {
  const pruned = pruneDeletionMap(deletions, nowIso)

  for (const note of notes) {
    const tombstone = pruned[note.id]
    if (!tombstone) {
      continue
    }

    if (toMillis(note.updatedAt) >= toMillis(tombstone)) {
      delete pruned[note.id]
    }
  }

  return pruned
}

function toPagePayload(pagePath: string, payload: unknown): StoreReadResult {
  if (!payload || typeof payload !== "object") {
    return { notes: [], updatedAt: new Date().toISOString(), deletions: {} }
  }

  const parsed = payload as StoredPagePayload
  const notes = sortReviewNotesByCreated(normalizeReviewNotes(parsed.notes, pagePath))
  return {
    notes,
    updatedAt: toIsoOrNow(parsed.updatedAt),
    deletions: normalizePersistedDeletions(notes, normalizeDeletionMap(parsed.deletions)),
  }
}

function kvPageKey(pagePath: string) {
  const encoded = Buffer.from(pagePath, "utf8").toString("base64url")
  return `${KV_KEY_PREFIX}:page:${encoded}`
}

async function runKvCommand<T>(command: Array<string | number>) {
  const response = await fetch(KV_REST_URL, {
    method: "POST",
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${KV_REST_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
  })

  if (!response.ok) {
    throw new Error(`KV request failed (${response.status}).`)
  }

  const payload = (await response.json()) as UpstashResult<T>
  if (payload && typeof payload.error === "string" && payload.error.trim()) {
    throw new Error(payload.error)
  }

  return payload?.result ?? null
}

async function kvReadPage(pagePath: string): Promise<StoreReadResult> {
  const raw = await runKvCommand<unknown>(["GET", kvPageKey(pagePath)])
  if (raw == null) {
    return { notes: [], updatedAt: new Date().toISOString(), deletions: {} }
  }

  if (typeof raw === "string") {
    try {
      return toPagePayload(pagePath, JSON.parse(raw) as unknown)
    } catch {
      return { notes: [], updatedAt: new Date().toISOString(), deletions: {} }
    }
  }

  return toPagePayload(pagePath, raw)
}

async function kvWritePage(pagePath: string, input: StoreWriteInput): Promise<StoreReadResult> {
  const notes = sortReviewNotesByCreated(input.notes)
  const nowIso = new Date().toISOString()
  const deletions = normalizePersistedDeletions(notes, input.deletions ?? {}, nowIso)
  const payload = {
    updatedAt: nowIso,
    notes,
    ...(Object.keys(deletions).length > 0 ? { deletions } : {}),
  }
  await runKvCommand(["SET", kvPageKey(pagePath), JSON.stringify(payload)])
  return {
    updatedAt: nowIso,
    notes,
    deletions,
  }
}

async function kvClearPage(pagePath: string): Promise<StoreReadResult> {
  await runKvCommand(["DEL", kvPageKey(pagePath)])
  return { updatedAt: new Date().toISOString(), notes: [], deletions: {} }
}

async function readFileStore() {
  try {
    const raw = await readFile(REVIEW_DATA_FILE, "utf8")
    return normalizeReviewNotesStore(JSON.parse(raw) as unknown)
  } catch {
    return createEmptyReviewNotesStore()
  }
}

async function writeFileStore(rawStore: unknown) {
  const store = normalizeReviewNotesStore(rawStore)
  await mkdir(REVIEW_DATA_DIR, { recursive: true })
  const tempFile = path.join(REVIEW_DATA_DIR, `notes-store.tmp.${process.pid}.${Date.now()}.json`)
  await writeFile(tempFile, JSON.stringify(store, null, 2), {
    encoding: "utf8",
  })
  await rename(tempFile, REVIEW_DATA_FILE)
}

async function fileReadPage(pagePath: string): Promise<StoreReadResult> {
  const store = await readFileStore()
  const notes = sortReviewNotesByCreated(store.pages[pagePath] ?? [])
  return {
    notes,
    updatedAt: store.updatedAt,
    deletions: normalizePersistedDeletions(notes, store.deletions[pagePath] ?? {}),
  }
}

async function fileWritePage(pagePath: string, input: StoreWriteInput): Promise<StoreReadResult> {
  const store = await readFileStore()
  const updatedAt = new Date().toISOString()
  const nextPageNotes = sortReviewNotesByCreated(input.notes)
  const existingDeletions = store.deletions[pagePath] ?? {}
  const incomingDeletions = input.deletions ?? {}
  const mergedDeletions = mergeDeletionMaps(existingDeletions, incomingDeletions)
  const nextPageDeletions = normalizePersistedDeletions(nextPageNotes, mergedDeletions, updatedAt)

  const nextStore = {
    ...store,
    updatedAt,
    pages: {
      ...store.pages,
      [pagePath]: nextPageNotes,
    },
    deletions: {
      ...store.deletions,
      [pagePath]: nextPageDeletions,
    },
  }

  if (nextPageNotes.length === 0) {
    delete nextStore.pages[pagePath]
  }
  if (Object.keys(nextPageDeletions).length === 0) {
    delete nextStore.deletions[pagePath]
  }

  await writeFileStore(nextStore)
  return {
    updatedAt,
    notes: nextPageNotes,
    deletions: nextPageDeletions,
  }
}

async function fileClearPage(pagePath: string): Promise<StoreReadResult> {
  const store = await readFileStore()
  const updatedAt = new Date().toISOString()
  const hasPageNotes = Boolean(store.pages[pagePath]?.length)
  const hasPageDeletions = Boolean(
    store.deletions[pagePath] && Object.keys(store.deletions[pagePath]).length > 0
  )

  if (!hasPageNotes && !hasPageDeletions) {
    return { updatedAt, notes: [], deletions: {} }
  }

  const nextStore = {
    ...store,
    updatedAt,
    pages: {
      ...store.pages,
    },
    deletions: {
      ...store.deletions,
    },
  }
  delete nextStore.pages[pagePath]
  delete nextStore.deletions[pagePath]

  await writeFileStore(nextStore)
  return { updatedAt, notes: [], deletions: {} }
}

export type ReviewNotesStorageBackend = "kv" | "file"
export type ReviewNotesStorageStatus = {
  backend: ReviewNotesStorageBackend
  globallyShared: boolean
  warning?: string
}

function enqueueFileStoreOperation<T>(operation: () => Promise<T>) {
  const run = fileStoreOperationQueue.then(operation, operation)
  fileStoreOperationQueue = run.then(
    () => undefined,
    () => undefined
  )
  return run
}

export function getReviewNotesStorageBackend(): ReviewNotesStorageBackend {
  return KV_ENABLED ? "kv" : "file"
}

export function isReviewNotesSharedStorageConfigured() {
  return KV_ENABLED
}

export function getReviewNotesStorageStatus(): ReviewNotesStorageStatus {
  if (KV_ENABLED) {
    return {
      backend: "kv",
      globallyShared: true,
    }
  }

  const baseWarning =
    "Review notes are stored in local file mode. Notes sync only for users connected to this same server instance."

  if (process.env.NODE_ENV === "production") {
    return {
      backend: "file",
      globallyShared: false,
      warning:
        `${baseWarning} Configure KV_REST_API_URL/KV_REST_API_TOKEN ` +
        "or UPSTASH_REDIS_REST_URL/UPSTASH_REDIS_REST_TOKEN for globally shared persistence.",
    }
  }

  return {
    backend: "file",
    globallyShared: false,
    warning: `${baseWarning} This is expected for local development.`,
  }
}

export async function readPageNotesStore(pagePath: string): Promise<StoreReadResult> {
  if (KV_ENABLED) {
    return kvReadPage(pagePath)
  }
  return enqueueFileStoreOperation(() => fileReadPage(pagePath))
}

export async function writePageNotesStore(
  pagePath: string,
  notes: ReviewNote[],
  options?: { deletions?: ReviewNoteTombstones }
) {
  const input: StoreWriteInput = {
    notes,
    deletions: options?.deletions,
  }
  if (KV_ENABLED) {
    return kvWritePage(pagePath, input)
  }
  return enqueueFileStoreOperation(() => fileWritePage(pagePath, input))
}

export async function clearPageNotesStore(pagePath: string) {
  if (KV_ENABLED) {
    return kvClearPage(pagePath)
  }
  return enqueueFileStoreOperation(() => fileClearPage(pagePath))
}
