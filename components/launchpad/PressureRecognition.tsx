"use client"

import { CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  getLaunchpadStage,
  type LaunchpadPressureId,
  type LaunchpadPressureSignal,
} from "@/content/launchpad"

type PressureRecognitionProps = {
  pressures: LaunchpadPressureSignal[]
  selectedPressure: LaunchpadPressureId | null
  onSelectPressure: (pressureId: LaunchpadPressureId) => void
}

export function PressureRecognition({
  pressures,
  selectedPressure,
  onSelectPressure,
}: PressureRecognitionProps) {
  return (
    <section id="ynm-pressure" className="section-compact border-y border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="container-site">
        <div className="max-w-3xl">
          <h2>What sounds most like your situation right now?</h2>
          <p className="mt-3 max-w-[60ch] text-base">
            Pick the one that feels closest. We&apos;ll show you the next move from there.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {pressures.map((pressure) => {
            const isSelected = selectedPressure === pressure.id
            return (
              <button
                key={pressure.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => onSelectPressure(pressure.id)}
                className={cn(
                  "interactive min-h-12 rounded-2xl border px-4 py-4 text-left focus-visible:shadow-[0_0_0_4px_color-mix(in_srgb,var(--color-accent)_18%,transparent)]",
                  isSelected
                    ? "border-[var(--color-accent-strong)] bg-[color-mix(in_srgb,var(--color-accent-soft)_86%,white_14%)] shadow-[0_10px_24px_rgba(20,131,126,0.16)]"
                    : "border-[color-mix(in_srgb,var(--color-border)_86%,transparent)] bg-[var(--color-surface)]",
                )}
              >
                <span className="flex items-start justify-between gap-2">
                  <span
                    className={cn(
                      "text-base font-semibold leading-[1.28]",
                      isSelected ? "text-[var(--color-accent-strong)]" : "text-[var(--color-text)]",
                    )}
                  >
                    {pressure.label}
                  </span>
                  {isSelected ? <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 text-[var(--color-accent-strong)]" aria-hidden="true" /> : null}
                </span>
                <span className="mt-2 block text-sm text-[var(--color-text-muted)]">{pressure.detail}</span>
                {isSelected ? (
                  <span className="mt-3 inline-flex rounded-full border border-[color-mix(in_srgb,var(--color-accent-strong)_36%,var(--color-border)_64%)] bg-[var(--color-accent-soft)] px-2.5 py-1 text-[11px] font-semibold tracking-[0.06em] text-[var(--color-accent-strong)]">
                    Best fit: Stage {getLaunchpadStage(pressure.likelyStage).number}
                  </span>
                ) : null}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
