"use client"

import { track } from "@vercel/analytics"
import { PageHero } from "@/components/heroes/PageHero"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import type { LaunchpadStage, LaunchpadStageId } from "@/content/launchpad"

type HeroOrientationProps = {
  stages: LaunchpadStage[]
  activeStage: LaunchpadStageId
  onStartFromPressure: () => void
  onSelectStage: (stageId: LaunchpadStageId) => void
}

export function HeroOrientation({
  stages,
  activeStage,
  onStartFromPressure,
  onSelectStage,
}: HeroOrientationProps) {
  return (
    <PageHero
      eyebrow="Your Next Move"
      scale="mediumLarge"
      tone="warm"
      gridClassName="lg:grid-cols-[minmax(0,1fr)_minmax(360px,420px)] lg:items-center lg:gap-12 xl:grid-cols-[minmax(0,1fr)_minmax(380px,440px)]"
      contentClassName="max-w-[34rem] xl:max-w-[35rem] lg:pt-2"
      title={
        <h1 className="max-w-none text-[var(--color-text)]">
          <span className="block">Figure out where you are,</span>
          <span className="hero-title-accent block">then take the right next step.</span>
        </h1>
      }
      support="Pick the situation that sounds most like you. We&apos;ll suggest the best next step."
      supportClassName="max-w-[48ch] text-[clamp(15px,1vw,17px)]"
      artifactClassName="w-full max-w-[440px] lg:justify-self-end"
      actions={
        <Button
          onClick={() => {
            track("hero_cta_clicked", {
              surface_id: "next_move_hero",
              cta_id: "next_move_hero_start_with_pressure",
              cta_label: "Start below",
              cta_variant: "primary",
              destination: "#ynm-pressure",
            })
            onStartFromPressure()
          }}
          withArrow
        >
          Start below
        </Button>
      }
      helper="Not sure where you are? Start below. Know your stage? Pick it on the map."
      artifact={
        <aside
          id="ynm-hero-stage-preview"
          className="rounded-2xl border border-[color-mix(in_srgb,var(--color-border)_80%,var(--color-primary)_20%)] bg-[linear-gradient(158deg,rgba(255,255,255,0.96),rgba(245,247,250,0.88))] p-4 shadow-[0_8px_20px_rgba(15,23,42,0.08)] md:p-5"
        >
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-accent-strong)]">Stage map</p>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Choose a stage to open the matching workspace.
          </p>
          <ol className="mt-4 space-y-2">
            {stages.map((stage) => {
              const isActive = stage.id === activeStage
              return (
                <li key={stage.id}>
                  <button
                    type="button"
                    aria-current={isActive ? "step" : undefined}
                    onClick={() => onSelectStage(stage.id)}
                    className={cn(
                      "interactive group flex w-full items-start gap-3 rounded-xl border px-3.5 py-3 text-left",
                      isActive
                        ? "border-[var(--color-accent-strong)] bg-[color-mix(in_srgb,var(--color-accent-soft)_84%,white_16%)] shadow-[0_8px_18px_rgba(20,131,126,0.14)]"
                        : "border-[color-mix(in_srgb,var(--color-border)_85%,transparent)] bg-[color-mix(in_srgb,var(--color-surface)_96%,transparent)]",
                    )}
                  >
                    <span className="flex items-start gap-2.5">
                      <span
                        className={cn(
                          "mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full border text-[10px] font-semibold",
                          isActive
                            ? "border-[var(--color-accent-strong)] bg-[var(--color-accent-strong)] text-white"
                            : "border-[var(--color-border-strong)] bg-[var(--color-surface-muted)] text-[var(--color-text-subtle)]",
                        )}
                      >
                        {stage.number}
                      </span>
                      <span className="space-y-1">
                        <span className="block text-sm font-semibold text-[var(--color-text)]">{stage.name}</span>
                        {isActive ? (
                          <span className="block text-[11px] text-[var(--color-text-subtle)]">{stage.shortDescriptor}</span>
                        ) : (
                          <span className="block h-[14px]" aria-hidden="true" />
                        )}
                      </span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>
        </aside>
      }
    />
  )
}

