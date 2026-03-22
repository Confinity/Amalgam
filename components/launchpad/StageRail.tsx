"use client"

import type { KeyboardEvent } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import type { LaunchpadStage, LaunchpadStageId } from "@/content/launchpad"

type StageRailProps = {
  stages: LaunchpadStage[]
  activeStage: LaunchpadStageId
  onSelectStage: (stageId: LaunchpadStageId) => void
  onOpenMobileSelector: () => void
}

export function StageRail({ stages, activeStage, onSelectStage, onOpenMobileSelector }: StageRailProps) {
  const active = stages.find((stage) => stage.id === activeStage) ?? stages[0]
  const activeIndex = stages.findIndex((stage) => stage.id === activeStage)

  function onRailKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (activeIndex < 0) return
    if (event.key === "ArrowRight") {
      event.preventDefault()
      onSelectStage(stages[(activeIndex + 1) % stages.length]!.id)
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault()
      onSelectStage(stages[(activeIndex - 1 + stages.length) % stages.length]!.id)
    }
  }

  return (
    <section
      id="ynm-stage-rail"
      className="sticky top-[76px] z-30 border-b border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-surface)_95%,white_5%)]/95 backdrop-blur"
      aria-label="Stage selection spine"
    >
      <div className="container-site py-3">
        <div className="mb-3 hidden md:block">
          <p className="text-sm text-[var(--color-text-muted)]">
            Move one stage earlier or later if this feels slightly off.
          </p>
        </div>

        <div
          className="hidden gap-2 md:grid md:grid-cols-5"
          role="listbox"
          aria-label="Execution stages"
          onKeyDown={onRailKeyDown}
        >
          {stages.map((stage) => {
            const isActive = stage.id === activeStage
            return (
              <button
                key={stage.id}
                role="option"
                type="button"
                onClick={() => onSelectStage(stage.id)}
                aria-selected={isActive}
                aria-current={isActive ? "step" : undefined}
                className={cn(
                  "interactive min-h-12 rounded-xl border px-3 py-2.5 text-left",
                  isActive
                    ? "border-[var(--color-accent-strong)] bg-[color-mix(in_srgb,var(--color-accent-soft)_86%,white_14%)] shadow-[0_8px_20px_rgba(20,131,126,0.14)]"
                    : "border-[color-mix(in_srgb,var(--color-border)_88%,transparent)] bg-[color-mix(in_srgb,var(--color-surface)_96%,transparent)] text-[var(--color-text-subtle)]",
                )}
              >
                <span className="block text-[11px] font-semibold tracking-[0.06em] text-[var(--color-accent-strong)]">
                  Stage {stage.number}
                </span>
                <span className="mt-0.5 block text-sm font-semibold text-[var(--color-text)]">{stage.name}</span>
                {isActive ? (
                  <span className="mt-0.5 block text-xs text-[var(--color-text-subtle)]">{stage.shortDescriptor}</span>
                ) : (
                  <span className="mt-0.5 block h-[16px]" aria-hidden="true" />
                )}
              </button>
            )
          })}
        </div>

        <button
          type="button"
          onClick={onOpenMobileSelector}
          className="interactive flex min-h-12 w-full items-center justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 md:hidden"
          aria-haspopup="dialog"
          aria-controls="ynm-mobile-stage-selector"
        >
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-text)]">
            Stage {active?.number}: {active?.name}
            <ChevronDown className="h-4 w-4 text-[var(--color-accent-strong)]" aria-hidden="true" />
          </span>
        </button>
      </div>
    </section>
  )
}
