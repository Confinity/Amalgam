"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { Eye, EyeOff, MessageSquare, Plus, Trash2, X } from "lucide-react"
import {
  hasReviewNoteContent,
  normalizePagePath,
  normalizeReviewNotes,
  notesSignature,
  pageDeletionKey,
  sortReviewNotesByCreated,
  type ReviewCategory,
  type ReviewNote,
} from "@/lib/review-notes"

type DragState = {
  id: string
  offsetX: number
  offsetY: number
}

type SyncStatus = "idle" | "loading" | "saving" | "synced" | "error" | "offline"

type ReviewNotesStorageStatus = {
  backend: "kv" | "file"
  globallyShared: boolean
  warning?: string
}

type ReviewNotesResponse = {
  notes: ReviewNote[]
  storage: ReviewNotesStorageStatus | null
}

const REVIEW_MODE_STORAGE_KEY = "amalgam_review_mode"
const REVIEW_ADMIN_TOKEN_STORAGE_KEY = "amalgam_review_admin_token"
const REVIEW_API_PATH = "/api/review-notes/"
const REMOTE_SYNC_DEBOUNCE_MS = 700
const REMOTE_PULL_INTERVAL_MS = 3500

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

function resolveSyncFailureStatus(): SyncStatus {
  if (typeof navigator !== "undefined" && !navigator.onLine) {
    return "offline"
  }
  return "error"
}

function getPageUrlForNotes() {
  if (typeof window === "undefined") {
    return "/"
  }

  const url = new URL(window.location.href)
  // Normalize all review notes to route path only so query params do not fork note buckets.
  return normalizePagePath(url.pathname)
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

function normalizeStorageStatus(input: unknown): ReviewNotesStorageStatus | null {
  if (!input || typeof input !== "object") {
    return null
  }

  const parsed = input as Partial<ReviewNotesStorageStatus>
  const backend = parsed.backend === "kv" || parsed.backend === "file" ? parsed.backend : null
  if (!backend) {
    return null
  }

  return {
    backend,
    globallyShared: Boolean(parsed.globallyShared),
    warning: typeof parsed.warning === "string" && parsed.warning.trim() ? parsed.warning : undefined,
  }
}

async function fetchRemotePageNotes(pagePath: string): Promise<ReviewNotesResponse | null> {
  try {
    const response = await fetch(
      `${REVIEW_API_PATH}?pagePath=${encodeURIComponent(pagePath)}`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          Accept: "application/json",
        },
      }
    )
    if (!response.ok) {
      return null
    }

    const payload = (await response.json()) as { notes?: unknown; storage?: unknown }
    return {
      notes: normalizeReviewNotes(payload.notes, pagePath).filter((note) =>
        hasReviewNoteContent(note)
      ),
      storage: normalizeStorageStatus(payload.storage),
    }
  } catch {
    return null
  }
}

async function syncRemotePageNotes(params: {
  pagePath: string
  notes: ReviewNote[]
  deletedNotes: Record<string, string>
}): Promise<ReviewNotesResponse | null> {
  const { pagePath, notes, deletedNotes } = params
  const deletions = Object.entries(deletedNotes)
    .filter(([key]) => key.startsWith(`${pagePath}::`))
    .map(([key, deletedAt]) => ({
      id: key.slice(`${pagePath}::`.length),
      deletedAt,
    }))

  try {
    const response = await fetch(REVIEW_API_PATH, {
      method: "PUT",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pagePath,
        notes,
        deletions,
      }),
    })

    if (!response.ok) {
      return null
    }

    const payload = (await response.json()) as { notes?: unknown; storage?: unknown }
    return {
      notes: normalizeReviewNotes(payload.notes, pagePath).filter((note) =>
        hasReviewNoteContent(note)
      ),
      storage: normalizeStorageStatus(payload.storage),
    }
  } catch {
    return null
  }
}

type ClearPageResult = {
  ok: boolean
  status: number
}

async function clearRemotePageNotes(
  pagePath: string,
  adminToken: string
): Promise<ClearPageResult> {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    }
    if (adminToken.trim()) {
      headers["x-review-admin-token"] = adminToken.trim()
    }

    const response = await fetch(REVIEW_API_PATH, {
      method: "DELETE",
      cache: "no-store",
      headers,
      body: JSON.stringify({
        pagePath,
        clear: true,
      }),
    })
    return {
      ok: response.ok,
      status: response.status,
    }
  } catch {
    return {
      ok: false,
      status: 0,
    }
  }
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
  const [storageStatus, setStorageStatus] = useState<ReviewNotesStorageStatus | null>(null)
  const [syncStatus, setSyncStatus] = useState<SyncStatus>("idle")
  const [highlightRect, setHighlightRect] = useState<{
    left: number
    top: number
    width: number
    height: number
  } | null>(null)
  const pressedKeysRef = useRef<Set<string>>(new Set())
  const remoteHydratedPageRef = useRef("")
  const syncTimeoutRef = useRef<number | null>(null)
  const retryTimeoutRef = useRef<number | null>(null)
  const nextPullAllowedAtRef = useRef(0)
  const localDirtyRef = useRef(false)
  const localRevisionRef = useRef(0)
  const deletedNotesRef = useRef<Record<string, string>>({})

  const markLocalDirty = useCallback(() => {
    localDirtyRef.current = true
    localRevisionRef.current += 1
  }, [])

  const applyLocalNotesUpdate = useCallback(
    (updater: ReviewNote[] | ((previous: ReviewNote[]) => ReviewNote[])) => {
      setNotes((previous) => {
        const next = typeof updater === "function" ? updater(previous) : updater
        if (next !== previous) {
          markLocalDirty()
        }
        return next
      })
    },
    [markLocalDirty]
  )

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    clearLegacyLocalNotes()

    const fromSession = window.sessionStorage.getItem(REVIEW_MODE_STORAGE_KEY) === "true"
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
    nextPullAllowedAtRef.current = 0
    remoteHydratedPageRef.current = ""

    queueMicrotask(() => {
      setPageUrl(currentPage)
      setNotes([])
      setStorageStatus(null)
      setSyncStatus("loading")
    })

    let cancelled = false
    void (async () => {
      const remoteResult = await fetchRemotePageNotes(currentPage)
      if (cancelled) {
        return
      }

      remoteHydratedPageRef.current = currentPage
      if (!remoteResult) {
        setSyncStatus(resolveSyncFailureStatus())
        return
      }

      setNotes(remoteResult.notes)
      setStorageStatus(remoteResult.storage)
      setSyncStatus("synced")
    })()

    return () => {
      cancelled = true
    }
  }, [active, pathname])

  useEffect(() => {
    if (!active || remoteHydratedPageRef.current !== pageUrl || !localDirtyRef.current) {
      return
    }

    if (syncTimeoutRef.current !== null) {
      window.clearTimeout(syncTimeoutRef.current)
    }

    const revisionSnapshot = localRevisionRef.current

    syncTimeoutRef.current = window.setTimeout(() => {
      void (async () => {
        const draftNotes = notes.filter((note) => !hasReviewNoteContent(note))
        const syncableNotes = notes.filter((note) => hasReviewNoteContent(note))

        setSyncStatus("saving")
        const syncedRemote = await syncRemotePageNotes({
          pagePath: pageUrl,
          notes: syncableNotes,
          deletedNotes: deletedNotesRef.current,
        })

        if (!syncedRemote) {
          setSyncStatus(resolveSyncFailureStatus())
          if (retryTimeoutRef.current !== null) {
            window.clearTimeout(retryTimeoutRef.current)
          }
          retryTimeoutRef.current = window.setTimeout(() => {
            setNotes((previous) => [...previous])
          }, 6000)
          return
        }

        setStorageStatus(syncedRemote.storage)
        const mergedForView = sortReviewNotesByCreated([
          ...syncedRemote.notes,
          ...draftNotes,
        ])

        setNotes((previous) =>
          notesSignature(previous) === notesSignature(mergedForView)
            ? previous
            : mergedForView
        )

        if (localRevisionRef.current === revisionSnapshot) {
          localDirtyRef.current = false
        }

        for (const key of Object.keys(deletedNotesRef.current)) {
          if (key.startsWith(`${pageUrl}::`)) {
            delete deletedNotesRef.current[key]
          }
        }

        setSyncStatus("synced")
      })()
    }, REMOTE_SYNC_DEBOUNCE_MS)

    return () => {
      if (syncTimeoutRef.current !== null) {
        window.clearTimeout(syncTimeoutRef.current)
        syncTimeoutRef.current = null
      }
      if (retryTimeoutRef.current !== null) {
        window.clearTimeout(retryTimeoutRef.current)
        retryTimeoutRef.current = null
      }
    }
  }, [active, notes, pageUrl])

  useEffect(() => {
    if (!active) {
      return
    }

    let cancelled = false

    const pullLatest = async () => {
      const now = Date.now()
      if (now < nextPullAllowedAtRef.current) {
        return
      }

      if (typeof navigator !== "undefined" && !navigator.onLine) {
        if (!localDirtyRef.current) {
          setSyncStatus("offline")
        }
        nextPullAllowedAtRef.current = now + 12000
        return
      }

      const remoteResult = await fetchRemotePageNotes(pageUrl)
      if (cancelled || !remoteResult) {
        if (!localDirtyRef.current) {
          setSyncStatus(resolveSyncFailureStatus())
        }
        nextPullAllowedAtRef.current = Date.now() + 12000
        return
      }

      nextPullAllowedAtRef.current = 0

      if (localDirtyRef.current) {
        return
      }

      setStorageStatus(remoteResult.storage)
      setNotes((previous) => {
        const draftNotes = previous.filter((note) => !hasReviewNoteContent(note))
        const next = sortReviewNotesByCreated([...remoteResult.notes, ...draftNotes])
        return notesSignature(previous) === notesSignature(next) ? previous : next
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

      applyLocalNotesUpdate((previous) => [...previous, nextNote])
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
  }, [applyLocalNotesUpdate, dragging])

  const visibleNotes = useMemo(() => (notesVisible ? notes : []), [notes, notesVisible])

  const updateNotes = (updater: ReviewNote[] | ((previous: ReviewNote[]) => ReviewNote[])) => {
    applyLocalNotesUpdate((previous) =>
      typeof updater === "function" ? updater(previous) : updater
    )
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

  const clearCurrentPageNotes = async () => {
    const shouldClear = window.confirm(
      "Clear all review notes on this page? This cannot be undone."
    )
    if (!shouldClear) {
      return
    }

    let adminToken = ""
    if (typeof window !== "undefined") {
      adminToken =
        window.sessionStorage.getItem(REVIEW_ADMIN_TOKEN_STORAGE_KEY)?.trim() ?? ""
    }
    if (!adminToken) {
      const promptedToken = window.prompt(
        "Enter admin token to clear notes for this page."
      )
      if (!promptedToken) {
        return
      }
      adminToken = promptedToken.trim()
      if (!adminToken) {
        return
      }
    }

    setSyncStatus("saving")
    const clearResult = await clearRemotePageNotes(pageUrl, adminToken)
    if (!clearResult.ok) {
      setSyncStatus(clearResult.status === 0 ? resolveSyncFailureStatus() : "error")
      if (clearResult.status === 401 || clearResult.status === 403) {
        if (typeof window !== "undefined") {
          window.sessionStorage.removeItem(REVIEW_ADMIN_TOKEN_STORAGE_KEY)
        }
        window.alert("Clear failed: admin authorization is required.")
      } else if (clearResult.status === 503) {
        window.alert("Clear failed: admin clear token is not configured on the server.")
      } else {
        window.alert("Clear failed. Please try again.")
      }
      return
    }

    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(REVIEW_ADMIN_TOKEN_STORAGE_KEY, adminToken)
    }
    deletedNotesRef.current = {}
    localDirtyRef.current = false
    localRevisionRef.current += 1
    setNotes([])
    setSyncStatus("synced")
  }

  const exitReviewMode = () => {
    if (syncTimeoutRef.current !== null) {
      window.clearTimeout(syncTimeoutRef.current)
      syncTimeoutRef.current = null
    }
    if (retryTimeoutRef.current !== null) {
      window.clearTimeout(retryTimeoutRef.current)
      retryTimeoutRef.current = null
    }
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
          className="pointer-events-none fixed z-[220] rounded-md border border-[color-mix(in_srgb,var(--color-accent-strong)_70%,transparent)] bg-[color-mix(in_srgb,var(--color-accent-soft)_44%,transparent)] shadow-[0_0_0_1px_color-mix(in_srgb,var(--color-accent)_34%,transparent)]"
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
            className="absolute z-[230] w-[250px] overflow-hidden rounded-xl border border-border bg-[var(--color-surface)] shadow-xl"
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
                  className="rounded px-1.5 py-1 text-[11px] font-semibold hover:bg-[color-mix(in_srgb,white_22%,transparent)]"
                  onClick={() => updateNote(note.id, { collapsed: !note.collapsed })}
                  aria-label={note.collapsed ? "Expand note" : "Collapse note"}
                >
                  {note.collapsed ? "Open" : "Hide"}
                </button>
                <button
                  type="button"
                  className="rounded p-1 hover:bg-[color-mix(in_srgb,white_22%,transparent)]"
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
          <div className="w-[260px] rounded-xl border border-border bg-[var(--color-surface)] p-3 shadow-2xl">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-strong)]">
              Review Mode
            </p>
            <p className="mb-3 text-xs text-muted-foreground">
              Page: <span className="font-medium text-foreground">{pageUrl}</span>
            </p>
            {storageStatus ? (
              <p className="mb-2 text-[11px] text-muted-foreground">
                Storage:{" "}
                <span className="font-medium text-foreground">
                  {storageStatus.globallyShared
                    ? `Global (${storageStatus.backend.toUpperCase()})`
                    : "This server only"}
                </span>
              </p>
            ) : null}
            <p
              className={`mb-3 text-[11px] font-medium ${
                syncStatus === "synced"
                  ? "text-emerald-700"
                  : syncStatus === "error"
                    ? "text-rose-700"
                    : syncStatus === "offline"
                      ? "text-amber-700"
                      : "text-muted-foreground"
              }`}
            >
              Sync:{" "}
              {syncStatus === "synced"
                ? "Connected"
                : syncStatus === "saving"
                  ? "Saving..."
                  : syncStatus === "loading"
                    ? "Loading..."
                    : syncStatus === "offline"
                      ? "Offline - not synced"
                      : syncStatus === "error"
                        ? "Failed - retrying"
                        : "Idle"}
            </p>
            {storageStatus?.warning ? (
              <p className="mb-3 text-[11px] text-amber-700">{storageStatus.warning}</p>
            ) : null}
            <div className="space-y-2">
              <button
                type="button"
                className={`flex h-9 w-full items-center justify-between rounded-lg border px-3 text-xs font-medium ${
                  addingNote
                    ? "border-[color-mix(in_srgb,var(--color-accent-strong)_40%,var(--color-border)_60%)] bg-[color-mix(in_srgb,var(--color-accent-soft)_64%,white_36%)] text-foreground"
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
                {notesVisible ? (
                  <EyeOff className="h-3.5 w-3.5" />
                ) : (
                  <Eye className="h-3.5 w-3.5" />
                )}
              </button>

              <button
                type="button"
                className="flex h-9 w-full items-center justify-between rounded-lg border border-rose-200 bg-rose-50 px-3 text-xs font-medium text-rose-700"
                onClick={() => {
                  void clearCurrentPageNotes()
                }}
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
