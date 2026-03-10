"use client"

import { useEffect, useMemo, useRef, useState } from "react"
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

function noteStorageKey(pageUrl: string) {
  return `review_notes:${pageUrl}`
}

function getPageUrlForNotes() {
  if (typeof window === "undefined") {
    return "/"
  }

  const url = new URL(window.location.href)
  url.searchParams.delete("review")
  const search = url.searchParams.toString()
  const cleanPath = url.pathname.replace(/\/+$/, "") || "/"
  return search ? `${cleanPath}?${search}` : cleanPath
}

function loadNotes(pageUrl: string): ReviewNote[] {
  if (typeof window === "undefined") {
    return []
  }

  try {
    const raw = window.localStorage.getItem(noteStorageKey(pageUrl))
    if (!raw) {
      return []
    }
    const parsed = JSON.parse(raw) as ReviewNote[]
    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed.filter(
      (note) =>
        typeof note.id === "string" &&
        typeof note.pageUrl === "string" &&
        typeof note.x === "number" &&
        typeof note.y === "number" &&
        typeof note.text === "string"
    )
  } catch {
    return []
  }
}

function saveNotes(
  pageUrl: string,
  notes: ReviewNote[],
  options: { allowEmpty?: boolean } = {}
) {
  if (typeof window === "undefined") {
    return
  }

  const allowEmpty = options.allowEmpty ?? false
  if (!allowEmpty && notes.length === 0) {
    const existing = loadNotes(pageUrl)
    if (existing.length > 0) {
      return
    }
  }

  window.localStorage.setItem(noteStorageKey(pageUrl), JSON.stringify(notes))
}

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false
  }
  const tag = target.tagName.toLowerCase()
  return (
    tag === "input" ||
    tag === "textarea" ||
    tag === "select" ||
    target.isContentEditable
  )
}

function isReviewUiTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
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
  const [highlightRect, setHighlightRect] = useState<{
    left: number
    top: number
    width: number
    height: number
  } | null>(null)
  const pressedKeysRef = useRef<Set<string>>(new Set())
  const latestNotesRef = useRef<ReviewNote[]>([])

  useEffect(() => {
    latestNotesRef.current = notes
  }, [notes])

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const fromSession =
      window.sessionStorage.getItem(REVIEW_MODE_STORAGE_KEY) === "true"
    const fromQuery =
      new URLSearchParams(window.location.search).get("review") === "true"

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
    queueMicrotask(() => {
      setPageUrl(currentPage)
      setNotes(loadNotes(currentPage))
    })
  }, [active, pathname])

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
      const now = new Date().toISOString()
      const nextNote: ReviewNote = {
        id: createNoteId(),
        pageUrl,
        x: Math.max(8, Math.min(event.clientX + 10, window.innerWidth - 260)),
        y: Math.max(8, Math.min(event.clientY + 10, window.innerHeight - 80)),
        title: "",
        text: "",
        category: "needs-review",
        collapsed: false,
        createdAt: now,
        updatedAt: now,
      }

      setNotes((previous) => {
        const next = [...previous, nextNote]
        saveNotes(pageUrl, next)
        return next
      })
    }

    window.addEventListener("mousemove", onMouseMove, true)
    window.addEventListener("click", onClick, true)
    return () => {
      window.removeEventListener("mousemove", onMouseMove, true)
      window.removeEventListener("click", onClick, true)
    }
  }, [active, addingNote, pageUrl])

  useEffect(() => {
    if (!dragging) {
      return
    }

    const onPointerMove = (event: PointerEvent) => {
      const maxX = Math.max(20, window.innerWidth - 220)
      const maxY = Math.max(20, window.innerHeight - 80)
      const nextX = Math.max(8, Math.min(event.clientX - dragging.offsetX, maxX))
      const nextY = Math.max(8, Math.min(event.clientY - dragging.offsetY, maxY))

      setNotes((previous) =>
        previous.map((note) =>
          note.id === dragging.id
            ? { ...note, x: nextX, y: nextY, updatedAt: new Date().toISOString() }
            : note
        )
      )
    }

    const onPointerUp = () => {
      saveNotes(pageUrl, latestNotesRef.current)
      setDragging(null)
    }

    window.addEventListener("pointermove", onPointerMove)
    window.addEventListener("pointerup", onPointerUp)
    return () => {
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerup", onPointerUp)
    }
  }, [dragging, pageUrl])

  const visibleNotes = useMemo(
    () => (notesVisible ? notes.filter((note) => note.pageUrl === pageUrl) : []),
    [notes, notesVisible, pageUrl]
  )

  const updateNotes = (
    updater: ReviewNote[] | ((previous: ReviewNote[]) => ReviewNote[]),
    options: { allowEmpty?: boolean } = {}
  ) => {
    setNotes((previous) => {
      const next = typeof updater === "function" ? updater(previous) : updater
      saveNotes(pageUrl, next, options)
      return next
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
    updateNotes((previous) => previous.filter((note) => note.id !== id), {
      allowEmpty: true,
    })
  }

  const clearCurrentPageNotes = () => {
    const shouldClear = window.confirm(
      "Clear all review notes on this page? This cannot be undone."
    )
    if (!shouldClear) {
      return
    }
    updateNotes((previous) => previous.filter((note) => note.pageUrl !== pageUrl), {
      allowEmpty: true,
    })
  }

  const exitReviewMode = () => {
    setActive(false)
    setPanelOpen(false)
    setAddingNote(false)
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
            className="fixed z-[230] w-[250px] overflow-hidden rounded-xl border border-border bg-white shadow-xl"
            style={{ left: note.x, top: note.y }}
          >
            <header
              className="flex cursor-grab items-center justify-between gap-2 px-3 py-2 text-white active:cursor-grabbing"
              style={{ backgroundColor: meta.header }}
              onPointerDown={(event) => {
                if (isReviewUiTarget(event.target)) {
                  const maybeControl = (event.target as HTMLElement).closest(
                    "button,select,input,textarea"
                  )
                  if (maybeControl) {
                    return
                  }
                }
                event.preventDefault()
                setDragging({
                  id: note.id,
                  offsetX: event.clientX - note.x,
                  offsetY: event.clientY - note.y,
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
