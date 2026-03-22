"use client"

import { useEffect, useRef } from "react"
import { Check, X } from "lucide-react"
import { cn } from "@/lib/utils"
import type { LaunchpadStage, LaunchpadStageId } from "@/content/launchpad"

type MobileStageSelectorSheetProps = {
  isOpen: boolean
  stages: LaunchpadStage[]
  activeStage: LaunchpadStageId
  onClose: () => void
  onSelect: (stageId: LaunchpadStageId) => void
}

export function MobileStageSelectorSheet({
  isOpen,
  stages,
  activeStage,
  onClose,
  onSelect,
}: MobileStageSelectorSheetProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const sheetRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeButtonRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
        return
      }

      if (event.key === "Tab" && sheetRef.current) {
        const focusable = sheetRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex=\"-1\"])',
        )
        if (!focusable.length) return

        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (!first || !last) return

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 md:hidden" role="presentation">
      <button
        type="button"
        aria-label="Close stage selector"
        className="absolute inset-0 bg-[rgba(15,23,42,0.45)]"
        onClick={onClose}
      />
      <section
        ref={sheetRef}
        id="ynm-mobile-stage-selector"
        role="dialog"
        aria-modal="true"
        aria-label="Choose stage"
        className="absolute inset-x-0 bottom-0 max-h-[78vh] overflow-y-auto rounded-t-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[0_-22px_34px_rgba(15,23,42,0.2)]"
      >
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-accent-strong)]">Select stage</p>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-[var(--color-border)]"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <ol className="space-y-2">
          {stages.map((stage) => {
            const isActive = stage.id === activeStage
            return (
              <li key={stage.id}>
                <button
                  type="button"
                  onClick={() => {
                    onSelect(stage.id)
                    onClose()
                  }}
                  className={cn(
                    "interactive flex min-h-12 w-full items-start justify-between rounded-2xl border px-4 py-3 text-left",
                    isActive
                      ? "border-[var(--color-accent-strong)] bg-[color-mix(in_srgb,var(--color-accent-soft)_86%,white_14%)]"
                      : "border-[var(--color-border)] bg-[var(--color-surface)]",
                  )}
                  aria-current={isActive ? "step" : undefined}
                >
                  <span>
                    <span className="block text-sm font-semibold text-[var(--color-text)]">
                      Stage {stage.number}: {stage.name}
                    </span>
                    <span className="mt-1 block text-xs text-[var(--color-text-muted)]">{stage.shortDescriptor}</span>
                  </span>
                  {isActive ? (
                    <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full border border-[var(--color-accent-strong)] bg-[var(--color-accent-soft)] text-[var(--color-accent-strong)]">
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  ) : (
                    <span className="mt-1 h-6 w-6 rounded-full border border-[var(--color-border-strong)]" aria-hidden="true" />
                  )}
                </button>
              </li>
            )
          })}
        </ol>
      </section>
    </div>
  )
}
