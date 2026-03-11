"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { Eye, EyeOff, MessageSquare, Plus, Trash2, X } from "lucide-react"

type ReviewCategory = "urgent" | "needs-review" | "suggestion" | "idea"

type ReviewNote = {
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

type DragState = {
  id: string
  offsetX: number
  offsetY: number
}

const REVIEW_MODE_STORAGE_KEY = "amalgam_review_mode"
const REVIEW_REMOTE_NOTES_FALLBACK_URL =
  process.env.NEXT_PUBLIC_REVIEW_NOTES_URL?.trim() ||
  "https://jsonblob.com/api/jsonBlob/019cd9ac-4875-7fa4-9d22-d380a855b21b"
const REVIEW_REMOTE_NOTES_URLS = ["/api/review-notes", REVIEW_REMOTE_NOTES_FALLBACK_URL].filter(
  (value, index, list) => Boolean(value) && list.indexOf(value) === index
)
const REMOTE_SYNC_DEBOUNCE_MS = 700
const REMOTE_PULL_INTERVAL_MS = 3500
const CONFIGURED_BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/+$/, "")
const LEGACY_BASE_PATHS = ["/Amalgam", "/amalgam"] as const

type ReviewRemoteStore = {
  version: 1
  updatedAt: string
  pages: Record<string, ReviewNote[]>
}

const categoryMeta: Record<
  ReviewCategory,
  { label: string; header: string; badge: string }
> = {
  urgent: {
    label: "Urgent",
    header: "#ef4444",
    badge: "rgba(239,68,68,0.12)",
  },
  "needs-review": {
    label: "Needs Review",
    header: "#f59e0b",
    badge: "rgba(245,158,11,0.14)",
  },
  suggestion: {
    label: "Suggestion",
    header: "#2563eb",
    badge: "rgba(37,99,235,0.14)",
  },
  idea: {
    label: "Idea",
    header: "#7c3aed",
    badge: "rgba(124,58,237,0.14)",
  },
}

function normalizeNotesPathname(pathname: string) {
  let normalized = pathname.replace(/\/+$/, "") || "/"
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

function normalizeReviewNote(raw: unknown, fallbackPageUrl?: string): ReviewNote | null {
  if (!raw || typeof raw !== "object") {
    return null
  }

  const note = raw as Partial<ReviewNote>
  if (
    typeof note.id !== "string" ||
    typeof note.x !== "number" ||
    typeof note.y !== "number" ||
    typeof note.text !== "string"
  ) {
    return null
  }

  const category: ReviewCategory =
    note.category === "urgent" ||
    note.category === "needs-review" ||
    note.category === "suggestion" ||
    note.category === "idea"
      ? note.category
      : "needs-review"

  const pageUrl = typeof note.pageUrl === "string" ? note.pageUrl : fallbackPageUrl
  if (!pageUrl) {
    return null
  }

  return {
    id: note.id,
    pageUrl,
    x: note.x,
    y: note.y,
    title: typeof note.title === "string" ? note.title : "",
    text: note.text,
    category,
    collapsed: Boolean(note.collapsed),
    createdAt: typeof note.createdAt === "string" ? note.createdAt : new Date().toISOString(),
    updatedAt: typeof note.updatedAt === "string" ? note.updatedAt : new Date().toISOString(),
  }
}

function normalizeReviewNotes(raw: unknown, fallbackPageUrl?: string): ReviewNote[] {
  if (!Array.isArray(raw)) {
    return []
  }

  return raw
    .map((note) => normalizeReviewNote(note, fallbackPageUrl))
    .filter((note): note is ReviewNote => Boolean(note))
}

function createEmptyRemoteStore(): ReviewRemoteStore {
  return {
    version: 1,
    updatedAt: new Date().toISOString(),
    pages: {},
  }
}

function toIsoMillis(value: string) {
  const parsed = Date.parse(value)
  return Number.isNaN(parsed) ? 0 : parsed
}

function noteSignature(note: ReviewNote) {
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

function notesSignature(notes: ReviewNote[]) {
  return notes.map((note) => noteSignature(note)).sort().join("||")
}

function pageDeletionKey(pageUrl: string, noteId: string) {
  return `${pageUrl}::${noteId}`
}

function replacePageNotes(allNotes: ReviewNote[], pageUrl: string, nextPageNotes: ReviewNote[]) {
  const otherPageNotes = allNotes.filter((note) => note.pageUrl !== pageUrl)
  return [...otherPageNotes, ...nextPageNotes]
}

function mergePageNotesForSync(params: {
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
    const existing = merged.get(localNote.id)
    if (!existing || toIsoMillis(localNote.updatedAt) >= toIsoMillis(existing.updatedAt)) {
      merged.set(localNote.id, localNote)
    }
  }

  return Array.from(merged.values()).sort(
    (left, right) => toIsoMillis(left.createdAt) - toIsoMillis(right.createdAt)
  )
}

function normalizeRemoteStore(raw: unknown): ReviewRemoteStore {
  if (!raw || typeof raw !== "object") {
    return createEmptyRemoteStore()
  }

  const parsed = raw as {
    version?: number
    updatedAt?: string
    pages?: Record<string, unknown>
  }

  const pages: Record<string, ReviewNote[]> = {}
  if (parsed.pages && typeof parsed.pages === "object") {
    for (const [key, value] of Object.entries(parsed.pages)) {
      if (!key) {
        continue
      }
      pages[key] = normalizeReviewNotes(value, key)
    }
  }

  return {
    version: 1,
    updatedAt:
      typeof parsed.updatedAt === "string" && parsed.updatedAt.length > 0
        ? parsed.updatedAt
        : new Date().toISOString(),
    pages,
  }
}

async function fetchRemoteStore(): Promise<ReviewRemoteStore | null> {
  for (const endpoint of REVIEW_REMOTE_NOTES_URLS) {
    try {
      const response = await fetch(endpoint, {
        method: "GET",
        cache: "no-store",
        headers: {
          Accept: "application/json",
        },
      })
      if (!response.ok) {
        continue
      }
      const payload = (await response.json()) as unknown
      return normalizeRemoteStore(payload)
    } catch {
      continue
    }
  }

  return null
}

async function saveRemoteStore(store: ReviewRemoteStore): Promise<boolean> {
  for (const endpoint of REVIEW_REMOTE_NOTES_URLS) {
    try {
      const response = await fetch(endpoint, {
        method: "PUT",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(store),
      })
      if (response.ok) {
        return true
      }
    } catch {
      continue
    }
  }

  return false
}

function getPageUrlForNotes() {
  if (typeof window === "undefined") {
    return "/"
  }

  const url = new URL(window.location.href)
  url.searchParams.delete("review")
  const ignoredParams = new Set(["fbclid", "gclid"])
  const keptParams = Array.from(url.searchParams.entries())
    .filter(([key]) => !key.toLowerCase().startsWith("utm_") && !ignoredParams.has(key.toLowerCase()))
    .sort(([a], [b]) => a.localeCompare(b))
  const normalizedSearch = new URLSearchParams()
  for (const [key, value] of keptParams) {
    normalizedSearch.append(key, value)
  }
  const search = normalizedSearch.toString()
  const cleanPath = normalizeNotesPathname(url.pathname)
  return search ? `${cleanPath}?${search}` : cleanPath
}

function clearLegacyLocalNotes() {
  if (typeof window === "undefined") {
    return
  }

  try {
    const keysToRemove: string[] = []
    for (let index = 0; index < window.localStorage.length; index += 1) {
      const key = window.localStorage.key(index)
      if (key && key.startsWith("review_notes:")) {
        keysToRemove.push(key)
      }
    }
    for (const key of keysToRemove) {
      window.localStorage.removeItem(key)
    }
  } catch {
    // Ignore storage access issues to avoid blocking review mode startup.
  }
}

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) {
    return false
  }
  const tag = target.tagName.toLowerCase()
  return (
    tag === "input" ||
    tag === "textarea" ||
    tag === "select" ||
    (target instanceof HTMLElement && target.isContentEditable)
  )
}

function isReviewUiTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) {
    return false
  }
  return Boolean(target.closest('[data-review-ui="true"]'))
}

function createNoteId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

export function ReviewMode() {
  const pathname = usePathname()
  const [active, setActive] = useState(false)
  const [panelOpen, setPanelOpen] = useState(false)
  const [notesVisible, setNotesVisible] = useState(true)
  const [addingNote, setAddingNote] = useState(false)
  const [dragging, setDragging] = useState<DragState | null>(null)
  const [pageUrl, setPageUrl] = useState("/")
  const [notes, setNotes] = useState<ReviewNote[]>([])
  const [syncStatus, setSyncStatus] = useState<"idle" | "loading" | "synced" | "error">("idle")
  const [highlightRect, setHighlightRect] = useState<{
    left: number
    top: number
    width: number
    height: number
  } | null>(null)
  const pressedKeysRef = useRef<Set<string>>(new Set())
  const remoteStoreRef = useRef<ReviewRemoteStore | null>(null)
  const remoteHydratedPageRef = useRef<string>("")
  const syncTimeoutRef = useRef<number | null>(null)
  const localDirtyRef = useRef(false)
  const localRevisionRef = useRef(0)
  const deletedNotesRef = useRef<Record<string, string>>({})

  const markLocalDirty = useCallback(() => {
    localDirtyRef.current = true
    localRevisionRef.current += 1
  }, [])

  const applyLocalNotesUpdate = useCallback((
    updater: ReviewNote[] | ((previous: ReviewNote[]) => ReviewNote[])
  ) => {
    setNotes((previous) => {
      const next = typeof updater === "function" ? updater(previous) : updater
      if (next !== previous) {
        markLocalDirty()
      }
      return next
    })
  }, [markLocalDirty])

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    clearLegacyLocalNotes()

    const fromSession =
      window.sessionStorage.getItem(REVIEW_MODE_STORAGE_KEY) === "true"
    const reviewParam = new URLSearchParams(window.location.search).get("review")
    const fromQuery = reviewParam !== null && reviewParam !== "false"

    if (fromSession || fromQuery) {
      queueMicrotask(() => setActive(true))
      window.sessionStorage.setItem(REVIEW_MODE_STORAGE_KEY, "true")
    }
  }, [])

  useEffect(() => {
    if (!active) {
      return
    }

    const currentPage = getPageUrlForNotes()
    localDirtyRef.current = false
    localRevisionRef.current = 0
    queueMicrotask(() => {
      setPageUrl(currentPage)
      setNotes([])
      setSyncStatus("loading")
    })
    remoteHydratedPageRef.current = ""

    let cancelled = false
    void (async () => {
      const store = await fetchRemoteStore()
      if (cancelled) {
        return
      }

      remoteHydratedPageRef.current = currentPage
      if (!store) {
        remoteStoreRef.current = null
        setSyncStatus("error")
        return
      }

      remoteStoreRef.current = store
      const remoteNotes = store.pages[currentPage] ?? []
      setNotes((previous) => {
        const currentPageNotes = previous.filter((note) => note.pageUrl === currentPage)
        return notesSignature(currentPageNotes) === notesSignature(remoteNotes)
          ? previous
          : replacePageNotes(previous, currentPage, remoteNotes)
      })
      setSyncStatus("synced")
    })()

    return () => {
      cancelled = true
    }
  }, [active, pathname])

  useEffect(() => {
    if (!active) {
      return
    }

    const pageNotes = notes.filter((note) => note.pageUrl === pageUrl)

    if (remoteHydratedPageRef.current !== pageUrl || !localDirtyRef.current) {
      return
    }

    if (syncTimeoutRef.current !== null) {
      window.clearTimeout(syncTimeoutRef.current)
    }

    const revisionSnapshot = localRevisionRef.current
    syncTimeoutRef.current = window.setTimeout(() => {
      void (async () => {
        setSyncStatus("loading")
        const latestStore = (await fetchRemoteStore()) ?? remoteStoreRef.current ?? createEmptyRemoteStore()
        remoteStoreRef.current = latestStore
        const remotePageNotes = latestStore.pages[pageUrl] ?? []
        const mergedPageNotes = mergePageNotesForSync({
          pageUrl,
          localNotes: pageNotes,
          remoteNotes: remotePageNotes,
          deletedNotes: deletedNotesRef.current,
        })

        const nextPages = { ...latestStore.pages }

        if (mergedPageNotes.length > 0) {
          nextPages[pageUrl] = mergedPageNotes
        } else {
          delete nextPages[pageUrl]
        }

        const nextStore: ReviewRemoteStore = {
          ...latestStore,
          updatedAt: new Date().toISOString(),
          pages: nextPages,
        }

        const saved = await saveRemoteStore(nextStore)
        if (saved) {
          remoteStoreRef.current = nextStore
          if (localRevisionRef.current === revisionSnapshot) {
            localDirtyRef.current = false
          }
          for (const key of Object.keys(deletedNotesRef.current)) {
            if (key.startsWith(`${pageUrl}::`)) {
              delete deletedNotesRef.current[key]
            }
          }
          setSyncStatus("synced")
        } else {
          setSyncStatus("error")
        }
      })()
    }, REMOTE_SYNC_DEBOUNCE_MS)

    return () => {
      if (syncTimeoutRef.current !== null) {
        window.clearTimeout(syncTimeoutRef.current)
        syncTimeoutRef.current = null
      }
    }
  }, [active, notes, pageUrl])

  useEffect(() => {
    if (!active) {
      return
    }

    let cancelled = false
    const pullLatest = async () => {
      const store = await fetchRemoteStore()
      if (cancelled || !store) {
        return
      }

      remoteStoreRef.current = store
      if (localDirtyRef.current) {
        return
      }

      const remotePageNotes = store.pages[pageUrl] ?? []
      setNotes((previous) => {
        const currentPageNotes = previous.filter((note) => note.pageUrl === pageUrl)
        if (notesSignature(currentPageNotes) === notesSignature(remotePageNotes)) {
          return previous
        }
        return replacePageNotes(previous, pageUrl, remotePageNotes)
      })
      setSyncStatus("synced")
    }

    void pullLatest()
    const intervalId = window.setInterval(() => {
      void pullLatest()
    }, REMOTE_PULL_INTERVAL_MS)

    return () => {
      cancelled = true
      window.clearInterval(intervalId)
    }
  }, [active, pageUrl])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (isEditableTarget(event.target)) {
        return
      }

      const key = event.key.toLowerCase()
      pressedKeysRef.current.add(key)

      const hasShift = event.shiftKey || pressedKeysRef.current.has("shift")
      const hasR = pressedKeysRef.current.has("r")
      const hasA = pressedKeysRef.current.has("a")

      if (hasShift && hasR && hasA) {
        setActive(true)
        if (typeof window !== "undefined") {
          window.sessionStorage.setItem(REVIEW_MODE_STORAGE_KEY, "true")
        }
      }

      if (key === "escape") {
        setAddingNote(false)
        setHighlightRect(null)
      }
    }

    const onKeyUp = (event: KeyboardEvent) => {
      pressedKeysRef.current.delete(event.key.toLowerCase())
    }

    const onWindowBlur = () => {
      pressedKeysRef.current.clear()
    }

    window.addEventListener("keydown", onKeyDown)
    window.addEventListener("keyup", onKeyUp)
    window.addEventListener("blur", onWindowBlur)
    return () => {
      window.removeEventListener("keydown", onKeyDown)
      window.removeEventListener("keyup", onKeyUp)
      window.removeEventListener("blur", onWindowBlur)
    }
  }, [])

  useEffect(() => {
    if (!active || !addingNote) {
      document.body.style.removeProperty("cursor")
      return
    }

    document.body.style.cursor = "crosshair"
    return () => {
      document.body.style.removeProperty("cursor")
    }
  }, [active, addingNote])

  useEffect(() => {
    if (!active || !addingNote) {
      return
    }

    const onMouseMove = (event: MouseEvent) => {
      const target = document.elementFromPoint(event.clientX, event.clientY)
      if (!target || isReviewUiTarget(target)) {
        setHighlightRect(null)
        return
      }

      if (!(target instanceof HTMLElement)) {
        setHighlightRect(null)
        return
      }

      const rect = target.getBoundingClientRect()
      if (rect.width < 12 || rect.height < 12) {
        setHighlightRect(null)
        return
      }

      setHighlightRect({
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      })
    }

    const onClick = (event: MouseEvent) => {
      if (isReviewUiTarget(event.target)) {
        return
      }

      event.preventDefault()
      event.stopPropagation()
      const docEl = document.documentElement
      const now = new Date().toISOString()
      const nextNote: ReviewNote = {
        id: createNoteId(),
        pageUrl,
        x: Math.max(8, Math.min(event.pageX + 10, docEl.scrollWidth - 260)),
        y: Math.max(8, Math.min(event.pageY + 10, docEl.scrollHeight - 80)),
        title: "",
        text: "",
        category: "needs-review",
        collapsed: false,
        createdAt: now,
        updatedAt: now,
      }

      applyLocalNotesUpdate((previous) => {
        return [...previous, nextNote]
      })
    }

    window.addEventListener("mousemove", onMouseMove, true)
    window.addEventListener("click", onClick, true)
    return () => {
      window.removeEventListener("mousemove", onMouseMove, true)
      window.removeEventListener("click", onClick, true)
    }
  }, [active, addingNote, applyLocalNotesUpdate, pageUrl])

  useEffect(() => {
    if (!dragging) {
      return
    }

    const onPointerMove = (event: PointerEvent) => {
      const docEl = document.documentElement
      const maxX = Math.max(20, docEl.scrollWidth - 220)
      const maxY = Math.max(20, docEl.scrollHeight - 80)
      const nextX = Math.max(8, Math.min(event.pageX - dragging.offsetX, maxX))
      const nextY = Math.max(8, Math.min(event.pageY - dragging.offsetY, maxY))

      applyLocalNotesUpdate((previous) =>
        previous.map((note) =>
          note.id === dragging.id
            ? { ...note, x: nextX, y: nextY, updatedAt: new Date().toISOString() }
            : note
        )
      )
    }

    const onPointerUp = () => {
      setDragging(null)
    }

    window.addEventListener("pointermove", onPointerMove)
    window.addEventListener("pointerup", onPointerUp)
    return () => {
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerup", onPointerUp)
    }
  }, [applyLocalNotesUpdate, dragging, pageUrl])

  const visibleNotes = useMemo(
    () => (notesVisible ? notes.filter((note) => note.pageUrl === pageUrl) : []),
    [notes, notesVisible, pageUrl]
  )

  const updateNotes = (updater: ReviewNote[] | ((previous: ReviewNote[]) => ReviewNote[])) => {
    applyLocalNotesUpdate((previous) => {
      return typeof updater === "function" ? updater(previous) : updater
    })
  }

  const updateNote = (id: string, updates: Partial<ReviewNote>) => {
    updateNotes((previous) =>
      previous.map((note) =>
        note.id === id ? { ...note, ...updates, updatedAt: new Date().toISOString() } : note
      )
    )
  }

  const deleteNote = (id: string) => {
    deletedNotesRef.current[pageDeletionKey(pageUrl, id)] = new Date().toISOString()
    updateNotes((previous) => previous.filter((note) => note.id !== id))
  }

  const clearCurrentPageNotes = () => {
    const shouldClear = window.confirm(
      "Clear all review notes on this page? This cannot be undone."
    )
    if (!shouldClear) {
      return
    }
    const now = new Date().toISOString()
    for (const note of notes.filter((item) => item.pageUrl === pageUrl)) {
      deletedNotesRef.current[pageDeletionKey(pageUrl, note.id)] = now
    }
    updateNotes((previous) => previous.filter((note) => note.pageUrl !== pageUrl))
  }

  const exitReviewMode = () => {
    setActive(false)
    setPanelOpen(false)
    setAddingNote(false)
    setSyncStatus("idle")
    setHighlightRect(null)
    setDragging(null)
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem(REVIEW_MODE_STORAGE_KEY)
      const url = new URL(window.location.href)
      if (url.searchParams.has("review")) {
        url.searchParams.delete("review")
        const nextSearch = url.searchParams.toString()
        const nextUrl = `${url.pathname}${nextSearch ? `?${nextSearch}` : ""}${url.hash}`
        window.history.replaceState({}, "", nextUrl)
      }
    }
  }

  if (!active) {
    return null
  }

  return (
    <>
      {addingNote && highlightRect ? (
        <div
          data-review-ui="true"
          className="pointer-events-none fixed z-[220] rounded-md border border-teal/70 bg-teal/10 shadow-[0_0_0_1px_rgba(0,191,166,0.3)]"
          style={{
            left: highlightRect.left,
            top: highlightRect.top,
            width: highlightRect.width,
            height: highlightRect.height,
          }}
        />
      ) : null}

      {visibleNotes.map((note) => {
        const meta = categoryMeta[note.category]

        return (
          <article
            key={note.id}
            data-review-ui="true"
            className="absolute z-[230] w-[250px] overflow-hidden rounded-xl border border-border bg-white shadow-xl"
            style={{ left: note.x, top: note.y }}
          >
            <header
              className="flex cursor-grab items-center justify-between gap-2 px-3 py-2 text-white active:cursor-grabbing"
              style={{ backgroundColor: meta.header }}
              onPointerDown={(event) => {
                if (isReviewUiTarget(event.target)) {
                  const maybeControl = (event.target as Element).closest(
                    "button,select,input,textarea"
                  )
                  if (maybeControl) {
                    return
                  }
                }
                event.preventDefault()
                setDragging({
                  id: note.id,
                  offsetX: event.pageX - note.x,
                  offsetY: event.pageY - note.y,
                })
              }}
            >
              <span className="text-xs font-semibold uppercase tracking-[0.16em]">
                {meta.label}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="rounded px-1.5 py-1 text-[11px] font-semibold hover:bg-white/20"
                  onClick={() => updateNote(note.id, { collapsed: !note.collapsed })}
                  aria-label={note.collapsed ? "Expand note" : "Collapse note"}
                >
                  {note.collapsed ? "Open" : "Hide"}
                </button>
                <button
                  type="button"
                  className="rounded p-1 hover:bg-white/20"
                  onClick={() => deleteNote(note.id)}
                  aria-label="Delete note"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </header>

            {!note.collapsed ? (
              <div className="space-y-2 p-3">
                <select
                  className="h-8 w-full rounded-md border border-border bg-background px-2 text-xs text-foreground"
                  value={note.category}
                  onChange={(event) =>
                    updateNote(note.id, {
                      category: event.target.value as ReviewCategory,
                    })
                  }
                >
                  <option value="urgent">Urgent</option>
                  <option value="needs-review">Needs Review</option>
                  <option value="suggestion">Suggestion</option>
                  <option value="idea">Idea</option>
                </select>
                <input
                  value={note.title}
                  onChange={(event) => updateNote(note.id, { title: event.target.value })}
                  placeholder="Title (optional)"
                  className="h-8 w-full rounded-md border border-border bg-background px-2 text-xs text-foreground"
                />
                <textarea
                  value={note.text}
                  onChange={(event) => updateNote(note.id, { text: event.target.value })}
                  placeholder="Add feedback..."
                  rows={4}
                  className="w-full resize-y rounded-md border border-border bg-background px-2 py-1.5 text-xs leading-relaxed text-foreground"
                />
              </div>
            ) : (
              <div className="p-3 text-xs text-muted-foreground">
                <span
                  className="inline-flex items-center rounded-full px-2 py-0.5 font-medium"
                  style={{ backgroundColor: meta.badge }}
                >
                  {note.title || note.text || "Empty note"}
                </span>
              </div>
            )}
          </article>
        )
      })}

      <div
        data-review-ui="true"
        className="fixed bottom-5 right-5 z-[240] flex flex-col items-end gap-3"
      >
        {panelOpen ? (
          <div className="w-[260px] rounded-xl border border-border bg-white p-3 shadow-2xl">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-teal">
              Review Mode
            </p>
            <p className="mb-3 text-xs text-muted-foreground">
              Page: <span className="font-medium text-foreground">{pageUrl}</span>
            </p>
            <p
              className={`mb-3 text-[11px] font-medium ${
                syncStatus === "synced"
                  ? "text-emerald-700"
                  : syncStatus === "error"
                    ? "text-rose-700"
                    : "text-muted-foreground"
              }`}
            >
              Sync:{" "}
              {syncStatus === "synced"
                ? "Shared across devices"
                : syncStatus === "error"
                  ? "Remote sync unavailable"
                  : syncStatus === "loading"
                    ? "Syncing..."
                    : "Idle"}
            </p>
            <div className="space-y-2">
              <button
                type="button"
                className={`flex h-9 w-full items-center justify-between rounded-lg border px-3 text-xs font-medium ${
                  addingNote
                    ? "border-teal/40 bg-teal/10 text-foreground"
                    : "border-border bg-background text-foreground"
                }`}
                onClick={() => setAddingNote((prev) => !prev)}
              >
                <span>{addingNote ? "Stop Adding" : "Add Note"}</span>
                <Plus className="h-3.5 w-3.5" />
              </button>

              <button
                type="button"
                className="flex h-9 w-full items-center justify-between rounded-lg border border-border bg-background px-3 text-xs font-medium text-foreground"
                onClick={() => setNotesVisible((prev) => !prev)}
              >
                <span>{notesVisible ? "Hide Notes" : "Show Notes"}</span>
                {notesVisible ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              </button>

              <button
                type="button"
                className="flex h-9 w-full items-center justify-between rounded-lg border border-rose-200 bg-rose-50 px-3 text-xs font-medium text-rose-700"
                onClick={clearCurrentPageNotes}
              >
                <span>Clear Notes (admin)</span>
                <Trash2 className="h-3.5 w-3.5" />
              </button>

              <button
                type="button"
                className="h-9 w-full rounded-lg border border-border bg-background px-3 text-xs font-medium text-foreground"
                onClick={exitReviewMode}
              >
                Exit Review Mode
              </button>
            </div>
          </div>
        ) : null}

        <button
          type="button"
          className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-foreground px-4 text-sm font-semibold text-background shadow-lg transition-opacity hover:opacity-90"
          onClick={() => setPanelOpen((prev) => !prev)}
          aria-label="Open review toolbar"
        >
          <MessageSquare className="h-4 w-4" />
          Review
        </button>
      </div>
    </>
  )
}
