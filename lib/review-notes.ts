export type ReviewCategory = "urgent" | "needs-review" | "suggestion" | "idea"

export type ReviewNote = {
  id: string
  pageUrl: string
  x: number
  y: number
  title: string
  text: string
  category: ReviewCategory
  collapsed: boolean
  createdAt: string
  updatedAt: string
}

export type ReviewNoteTombstones = Record<string, string>

export type ReviewNotesStore = {
  version: 2
  updatedAt: string
  pages: Record<string, ReviewNote[]>
  deletions: Record<string, ReviewNoteTombstones>
}

const CONFIGURED_BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/+$/, "")
const LEGACY_BASE_PATHS = ["/Amalgam", "/amalgam"] as const

export function createEmptyReviewNotesStore(): ReviewNotesStore {
  return {
    version: 2,
    updatedAt: new Date().toISOString(),
    pages: {},
    deletions: {},
  }
}

export function normalizeNotesPathname(pathname: string) {
  let normalized = String(pathname || "/").replace(/\/+$/, "") || "/"
  const prefixes = [CONFIGURED_BASE_PATH, ...LEGACY_BASE_PATHS].filter(Boolean)

  for (const prefix of prefixes) {
    if (!prefix || prefix === "/") {
      continue
    }

    if (normalized === prefix) {
      normalized = "/"
      continue
    }

    if (normalized.startsWith(`${prefix}/`)) {
      normalized = normalized.slice(prefix.length) || "/"
    }
  }

  return normalized
}

export function normalizePagePath(input: string) {
  const raw = String(input || "").trim()
  if (!raw) {
    return "/"
  }

  try {
    if (/^https?:\/\//i.test(raw)) {
      const url = new URL(raw)
      return normalizeNotesPathname(url.pathname)
    }

    const url = new URL(raw.startsWith("/") ? raw : `/${raw}`, "http://review.local")
    return normalizeNotesPathname(url.pathname)
  } catch {
    return normalizeNotesPathname(raw)
  }
}

function normalizeText(input: unknown, maxLength: number) {
  return String(input ?? "").replace(/\s+/g, " ").trim().slice(0, maxLength)
}

function normalizeIsoOrEmpty(input: unknown) {
  const iso = typeof input === "string" ? input.trim() : ""
  if (!iso) {
    return ""
  }
  return Number.isNaN(Date.parse(iso)) ? "" : iso
}

function toFiniteNumber(input: unknown, fallback = 0) {
  const numeric = Number(input)
  return Number.isFinite(numeric) ? numeric : fallback
}

export function hasReviewNoteContent(note: ReviewNote) {
  return note.title.trim().length > 0 || note.text.trim().length > 0
}

export function normalizeReviewNote(raw: unknown, fallbackPageUrl?: string): ReviewNote | null {
  if (!raw || typeof raw !== "object") {
    return null
  }

  const note = raw as Partial<ReviewNote>
  const id = normalizeText(note.id, 120)
  if (!id) {
    return null
  }

  const category: ReviewCategory =
    note.category === "urgent" ||
    note.category === "needs-review" ||
    note.category === "suggestion" ||
    note.category === "idea"
      ? note.category
      : "needs-review"

  const pageUrl = normalizePagePath(
    typeof note.pageUrl === "string" && note.pageUrl ? note.pageUrl : fallbackPageUrl ?? "/"
  )

  const createdAt =
    typeof note.createdAt === "string" && !Number.isNaN(Date.parse(note.createdAt))
      ? note.createdAt
      : new Date().toISOString()
  const updatedAt =
    typeof note.updatedAt === "string" && !Number.isNaN(Date.parse(note.updatedAt))
      ? note.updatedAt
      : createdAt

  return {
    id,
    pageUrl,
    x: toFiniteNumber(note.x),
    y: toFiniteNumber(note.y),
    title: normalizeText(note.title, 240),
    text: normalizeText(note.text, 6000),
    category,
    collapsed: Boolean(note.collapsed),
    createdAt,
    updatedAt,
  }
}

export function normalizeReviewNotes(raw: unknown, fallbackPageUrl?: string): ReviewNote[] {
  if (!Array.isArray(raw)) {
    return []
  }

  return raw
    .map((note) => normalizeReviewNote(note, fallbackPageUrl))
    .filter((note): note is ReviewNote => Boolean(note))
}

export function normalizeReviewNotesStore(raw: unknown): ReviewNotesStore {
  if (!raw || typeof raw !== "object") {
    return createEmptyReviewNotesStore()
  }

  const parsed = raw as Partial<ReviewNotesStore> & {
    pages?: Record<string, unknown>
    deletions?: Record<string, unknown>
  }
  const pages: Record<string, ReviewNote[]> = {}
  const deletions: Record<string, ReviewNoteTombstones> = {}

  if (parsed.pages && typeof parsed.pages === "object") {
    for (const [key, value] of Object.entries(parsed.pages)) {
      const normalizedKey = normalizePagePath(key)
      pages[normalizedKey] = normalizeReviewNotes(value, normalizedKey)
    }
  }

  if (parsed.deletions && typeof parsed.deletions === "object") {
    for (const [pagePath, rawPageDeletions] of Object.entries(parsed.deletions)) {
      const normalizedPagePath = normalizePagePath(pagePath)
      const pageDeletions: ReviewNoteTombstones = {}
      if (rawPageDeletions && typeof rawPageDeletions === "object") {
        for (const [noteId, deletedAt] of Object.entries(rawPageDeletions)) {
          const normalizedNoteId = normalizeText(noteId, 120)
          const normalizedDeletedAt = normalizeIsoOrEmpty(deletedAt)
          if (!normalizedNoteId || !normalizedDeletedAt) {
            continue
          }
          pageDeletions[normalizedNoteId] = normalizedDeletedAt
        }
      }

      if (Object.keys(pageDeletions).length > 0) {
        deletions[normalizedPagePath] = pageDeletions
      }
    }
  }

  return {
    version: 2,
    updatedAt:
      typeof parsed.updatedAt === "string" && !Number.isNaN(Date.parse(parsed.updatedAt))
        ? parsed.updatedAt
        : new Date().toISOString(),
    pages,
    deletions,
  }
}

function toIsoMillis(value: string) {
  const parsed = Date.parse(value)
  return Number.isNaN(parsed) ? 0 : parsed
}

export function sortReviewNotesByCreated(notes: ReviewNote[]) {
  return [...notes].sort((left, right) => toIsoMillis(left.createdAt) - toIsoMillis(right.createdAt))
}

export function pageDeletionKey(pageUrl: string, noteId: string) {
  return `${pageUrl}::${noteId}`
}

export function replacePageNotes(allNotes: ReviewNote[], pageUrl: string, nextPageNotes: ReviewNote[]) {
  const otherPageNotes = allNotes.filter((note) => note.pageUrl !== pageUrl)
  return [...otherPageNotes, ...sortReviewNotesByCreated(nextPageNotes)]
}

export function mergePageNotesForSync(params: {
  pageUrl: string
  localNotes: ReviewNote[]
  remoteNotes: ReviewNote[]
  deletedNotes: Record<string, string>
}) {
  const { pageUrl, localNotes, remoteNotes, deletedNotes } = params
  const merged = new Map<string, ReviewNote>()

  for (const remoteNote of remoteNotes) {
    const deletionIso = deletedNotes[pageDeletionKey(pageUrl, remoteNote.id)]
    if (deletionIso && toIsoMillis(deletionIso) >= toIsoMillis(remoteNote.updatedAt)) {
      continue
    }
    merged.set(remoteNote.id, remoteNote)
  }

  for (const localNote of localNotes) {
    const deletionIso = deletedNotes[pageDeletionKey(pageUrl, localNote.id)]
    if (deletionIso && toIsoMillis(deletionIso) >= toIsoMillis(localNote.updatedAt)) {
      continue
    }

    const existing = merged.get(localNote.id)
    if (!existing || toIsoMillis(localNote.updatedAt) >= toIsoMillis(existing.updatedAt)) {
      merged.set(localNote.id, localNote)
    }
  }

  return sortReviewNotesByCreated(Array.from(merged.values()))
}

export function noteSignature(note: ReviewNote) {
  return [
    note.id,
    note.pageUrl,
    note.updatedAt,
    note.x,
    note.y,
    note.category,
    note.collapsed ? 1 : 0,
    note.title,
    note.text,
  ].join("|")
}

export function notesSignature(notes: ReviewNote[]) {
  return notes.map((note) => noteSignature(note)).sort().join("||")
}
