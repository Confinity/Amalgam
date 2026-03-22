"use client"

import { useEffect, useMemo, useState } from "react"
import { track } from "@vercel/analytics"
import { HeroOrientation } from "@/components/launchpad/HeroOrientation"
import { PressureRecognition } from "@/components/launchpad/PressureRecognition"
import { StageRail } from "@/components/launchpad/StageRail"
import { ActiveStageWorkspace } from "@/components/launchpad/ActiveStageWorkspace"
import { MobileStageSelectorSheet } from "@/components/launchpad/MobileStageSelectorSheet"
import { FinalCtaBand } from "@/components/sections/FinalCtaBand"
import { Button } from "@/components/ui/Button"
import {
  type LaunchpadDisclosureKey,
  getLaunchpadPressureSignal,
  getLaunchpadStage,
  launchpadPressureSignals,
  launchpadStages,
  parseLaunchpadPressureId,
  parseLaunchpadStageId,
  pressureToStageMap,
  type LaunchpadPressureId,
  type LaunchpadSelectionSource,
  type LaunchpadStageId,
} from "@/content/launchpad"

const STORAGE_KEY = "amalgam_ynm_state_v4"

type DisclosureKey = LaunchpadDisclosureKey
const disclosureKeys: DisclosureKey[] = ["breakpoints", "antiFocus", "proof", "comparison"]
type ToolCtaLocation = "next_move" | "sticky_mobile" | "final_cta_primary"

type LaunchpadState = {
  activeStage: LaunchpadStageId
  activePressure: LaunchpadPressureId | null
  selectionSource: LaunchpadSelectionSource
  openDisclosures: Record<DisclosureKey, boolean>
  isMobileSelectorOpen: boolean
  showStickyPrimaryCta: boolean
  hasHydrated: boolean
}

const initialState: LaunchpadState = {
  activeStage: "ideate-prioritize",
  activePressure: null,
  selectionSource: "default",
  openDisclosures: getDefaultDisclosureState("ideate-prioritize", false),
  isMobileSelectorOpen: false,
  showStickyPrimaryCta: false,
  hasHydrated: false,
}

function getDeviceType() {
  if (typeof window === "undefined") return "unknown"
  if (window.innerWidth < 768) return "mobile"
  if (window.innerWidth < 1200) return "tablet"
  return "desktop"
}

function getToolIdFromHref(href: string) {
  const [path] = href.split("?")
  const segments = path.split("/").filter(Boolean)
  return segments[segments.length - 1] ?? "unknown_tool"
}

function scrollToSection(id: string) {
  if (typeof window === "undefined") return
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  document.getElementById(id)?.scrollIntoView({
    behavior: reduceMotion ? "auto" : "smooth",
    block: "start",
  })
}

function isMobileViewport() {
  if (typeof window === "undefined") return false
  return window.matchMedia("(max-width: 767px)").matches
}

function getDefaultDisclosureState(
  stageId: LaunchpadStageId,
  isMobile: boolean = isMobileViewport(),
): Record<DisclosureKey, boolean> {
  const stage = getLaunchpadStage(stageId)
  const open = new Set<DisclosureKey>(stage.defaultExpandedSections)

  if (isMobile) {
    stage.mobileCollapsedSections.forEach((key) => open.delete(key))
  }

  return disclosureKeys.reduce((acc, key) => {
    acc[key] = open.has(key)
    return acc
  }, {} as Record<DisclosureKey, boolean>)
}

export function LaunchpadExperience() {
  const [state, setState] = useState<LaunchpadState>(initialState)

  const stage = useMemo(() => getLaunchpadStage(state.activeStage), [state.activeStage])
  const stageIndex = useMemo(
    () => launchpadStages.findIndex((entry) => entry.id === state.activeStage),
    [state.activeStage],
  )
  const previousStage = useMemo(
    () => (stageIndex > 0 ? launchpadStages[stageIndex - 1] ?? null : null),
    [stageIndex],
  )
  const nextStage = useMemo(
    () =>
      stageIndex >= 0 && stageIndex < launchpadStages.length - 1
        ? launchpadStages[stageIndex + 1] ?? null
        : null,
    [stageIndex],
  )

  const stageConfirmation = state.selectionSource === "pressure" && state.activePressure
    ? `This looks most like Stage ${stage.number}: ${stage.name}.`
    : null

  function withContext(href: string) {
    const [path, existingQuery] = href.split("?")
    const params = new URLSearchParams(existingQuery ?? "")
    params.set("source", "next-move")
    params.set("stage", state.activeStage)
    params.set("selection", state.selectionSource)
    params.set("pressure", state.activePressure ?? "none")
    return `${path}?${params.toString()}`
  }

  function confirmStage(
    stageId: LaunchpadStageId,
    source: LaunchpadSelectionSource,
    options?: {
      pressureId?: LaunchpadPressureId | null
      autoScroll?: boolean
    },
  ) {
    if (options?.autoScroll) {
      scrollToSection("ynm-stage-header")
    }

    const nextOpenDisclosures = getDefaultDisclosureState(stageId)
    const nextPressure =
      options?.pressureId !== undefined ? options.pressureId : source === "pressure" ? state.activePressure : null

    setState((current) => ({
      ...current,
      activeStage: stageId,
      activePressure: nextPressure,
      selectionSource: source,
      isMobileSelectorOpen: false,
      openDisclosures: nextOpenDisclosures,
      showStickyPrimaryCta: false,
    }))

    track("next_move_stage_selected", {
      stage_id: stageId,
      pressure_id: nextPressure ?? "none",
      selection_source: source,
      had_confidence_cue: false,
      device_type: getDeviceType(),
    })
  }

  function onSelectPressure(pressureId: LaunchpadPressureId) {
    const pressureSignal = getLaunchpadPressureSignal(pressureId)
    if (!pressureSignal) return

    const mappedStageId = pressureToStageMap[pressureId]
    const mappedStage = getLaunchpadStage(mappedStageId)

    track("next_move_pressure_selected", {
      pressure_id: pressureId,
      mapped_stage: mappedStage.id,
      source_section: "pressure_recognition",
      device_type: getDeviceType(),
    })

    confirmStage(mappedStage.id, "pressure", {
      pressureId,
      autoScroll: true,
    })
  }

  function onToggleDisclosure(key: DisclosureKey) {
    setState((current) => ({
      ...current,
      openDisclosures: {
        ...current.openDisclosures,
        [key]: !current.openDisclosures[key],
      },
    }))
  }

  function onToggleComparison() {
    const isOpening = !state.openDisclosures.comparison
    if (isOpening) {
      track("next_move_comparison_opened", {
        stage_id: stage.id,
        pressure_id: state.activePressure ?? "none",
        selection_source: state.selectionSource,
        device_type: getDeviceType(),
      })
    }
    onToggleDisclosure("comparison")
  }

  function onPrimaryToolStart(location: ToolCtaLocation) {
    track("tool_started", {
      stage_id: stage.id,
      tool_id: getToolIdFromHref(stage.tool.href),
      cta_location: location,
      selection_source: state.selectionSource,
      device_type: getDeviceType(),
    })
  }

  function onSupportPathStart(location: "workspace_secondary" | "final_cta_secondary") {
    track("service_escalation_clicked", {
      stage_id: stage.id,
      service_type: stage.supportPath.type,
      cta_location: location,
      selection_source: state.selectionSource,
      device_type: getDeviceType(),
    })
  }

  function onProofOpen(proofId: string) {
    track("launchpad_path_click", {
      stage_id: stage.id,
      source: "workspace_proof",
      target: proofId,
      selection_source: state.selectionSource,
      device_type: getDeviceType(),
    })
  }

  function onOpenMobileSelector() {
    track("mobile_stage_selector_opened", {
      stage_id: stage.id,
      pressure_id: state.activePressure ?? "none",
      selection_source: state.selectionSource,
      device_type: getDeviceType(),
    })
    setState((current) => ({ ...current, isMobileSelectorOpen: true }))
  }

  useEffect(() => {
    if (typeof window === "undefined") return

    const params = new URLSearchParams(window.location.search)
    const queryStage = params.get("stage")
    const queryPressure = params.get("pressure")
    const hashValue = window.location.hash?.startsWith("#stage-")
      ? window.location.hash.replace("#stage-", "")
      : null

    let nextStage: LaunchpadStageId = initialState.activeStage
    let nextPressure: LaunchpadPressureId | null = null
    let nextSource: LaunchpadSelectionSource = "default"

    const parsedQueryPressure = parseLaunchpadPressureId(queryPressure)
    if (parsedQueryPressure) {
      const pressure = getLaunchpadPressureSignal(parsedQueryPressure)
      if (pressure) {
        nextPressure = pressure.id
        nextStage = pressure.likelyStage
        nextSource = "url"
      }
    } else if (parseLaunchpadStageId(queryStage)) {
      nextStage = parseLaunchpadStageId(queryStage)!
      nextSource = "url"
    } else if (parseLaunchpadStageId(hashValue)) {
      nextStage = parseLaunchpadStageId(hashValue)!
      nextSource = "url"
    } else {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY)
        if (raw) {
          const parsed = JSON.parse(raw) as Partial<LaunchpadState>
          const cachedStage = parseLaunchpadStageId(parsed.activeStage)
          if (cachedStage) {
            nextStage = cachedStage
            nextSource = parsed.selectionSource ?? "default"
          }
          const cachedPressure = parseLaunchpadPressureId(parsed.activePressure)
          if (cachedPressure) {
            nextPressure = cachedPressure
          }
        }
      } catch {
        // Ignore malformed cache.
      }
    }

    setState((current) => ({
      ...current,
      activeStage: nextStage,
      activePressure: nextPressure,
      selectionSource: nextSource,
      openDisclosures: getDefaultDisclosureState(nextStage),
      hasHydrated: true,
    }))
  }, [])

  useEffect(() => {
    if (!state.hasHydrated || typeof window === "undefined") return

    const params = new URLSearchParams(window.location.search)
    params.set("stage", state.activeStage)
    if (state.activePressure) {
      params.set("pressure", state.activePressure)
    } else {
      params.delete("pressure")
    }

    const query = params.toString()
    window.history.replaceState({}, "", `${window.location.pathname}${query ? `?${query}` : ""}`)

    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          activeStage: state.activeStage,
          activePressure: state.activePressure,
          selectionSource: state.selectionSource,
        }),
      )
    } catch {
      // Ignore write failures.
    }
  }, [state.activeStage, state.activePressure, state.selectionSource, state.hasHydrated])

  useEffect(() => {
    if (!state.hasHydrated || typeof window === "undefined") return
    const nextMoveTarget = document.getElementById("ynm-next-move-block")
    const nextMovePrimaryCta = document.getElementById("ynm-next-move-primary-cta")
    const finalCtaBand = document.getElementById("ynm-final-cta-band")
    if (!nextMoveTarget) return

    const onScroll = () => {
      const nextMoveRect = nextMoveTarget.getBoundingClientRect()
      const nextReached = nextMoveRect.top <= window.innerHeight * 0.72
      const primaryCtaPassed = nextMovePrimaryCta
        ? nextMovePrimaryCta.getBoundingClientRect().bottom < 0
        : nextMoveRect.top <= 0

      const finalBandRect = finalCtaBand?.getBoundingClientRect()
      const finalBandVisible = finalBandRect
        ? finalBandRect.top <= window.innerHeight * 0.94 && finalBandRect.bottom >= window.innerHeight * 0.1
        : false

      const shouldShow = nextReached && primaryCtaPassed && !finalBandVisible

      setState((current) =>
        current.showStickyPrimaryCta === shouldShow
          ? current
          : {
              ...current,
              showStickyPrimaryCta: shouldShow,
            },
      )
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [state.activeStage, state.hasHydrated])

  useEffect(() => {
    if (!state.hasHydrated) return
    track("next_move_stage_selected", {
      stage_id: state.activeStage,
      pressure_id: state.activePressure ?? "none",
      selection_source: state.selectionSource,
      had_confidence_cue: false,
      device_type: getDeviceType(),
    })
    // Track only when stage source changes from hydration stage setup.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.hasHydrated])

  const primaryToolHref = withContext(stage.tool.href)
  const supportPathHref = withContext(stage.supportPath.href)

  return (
    <>
      <HeroOrientation
        stages={launchpadStages}
        activeStage={state.activeStage}
        onStartFromPressure={() => scrollToSection("ynm-pressure")}
        onSelectStage={(stageId) => confirmStage(stageId, "hero", { autoScroll: true })}
      />

      <PressureRecognition
        pressures={launchpadPressureSignals}
        selectedPressure={state.activePressure}
        onSelectPressure={onSelectPressure}
      />

      <StageRail
        stages={launchpadStages}
        activeStage={state.activeStage}
        onSelectStage={(stageId) => confirmStage(stageId, "rail", { autoScroll: true })}
        onOpenMobileSelector={onOpenMobileSelector}
      />

      <div key={stage.id} className="section-reveal">
        <ActiveStageWorkspace
          stage={stage}
          stageConfirmation={stageConfirmation}
          comparisonOpen={state.openDisclosures.comparison}
          previousStage={previousStage}
          nextStage={nextStage}
          openDisclosures={state.openDisclosures}
          onToggleDisclosure={onToggleDisclosure}
          onToggleComparison={onToggleComparison}
          onOpenAdjacentStage={(stageId) => confirmStage(stageId, "rail", { autoScroll: true })}
          primaryToolHref={primaryToolHref}
          supportPathHref={supportPathHref}
          onPrimaryToolStart={onPrimaryToolStart}
          onSupportPathStart={() => onSupportPathStart("workspace_secondary")}
          onProofOpen={onProofOpen}
        />
      </div>

      <FinalCtaBand
        surfaceId={`next_move_final_${stage.id}`}
        eventData={{
          stage_id: stage.id,
          pressure_id: state.activePressure ?? "none",
          selection_source: state.selectionSource,
          device_type: getDeviceType(),
        }}
        headline={stage.finalBand.headline}
        support={stage.finalBand.supportingLine}
        primary={{
          label: stage.finalBand.primaryCtaLabel,
          href: withContext(stage.finalBand.primaryCtaHref),
          onClick: () => {
            onPrimaryToolStart("final_cta_primary")
          },
        }}
      />

      <MobileStageSelectorSheet
        isOpen={state.isMobileSelectorOpen}
        stages={launchpadStages}
        activeStage={state.activeStage}
        onClose={() => setState((current) => ({ ...current, isMobileSelectorOpen: false }))}
        onSelect={(stageId) => confirmStage(stageId, "rail", { autoScroll: true })}
      />

      {state.showStickyPrimaryCta ? (
        <div className="fixed inset-x-0 bottom-4 z-40 px-4 md:hidden">
          <div className="mx-auto max-w-[560px] rounded-2xl border border-[color-mix(in_srgb,var(--color-border)_75%,var(--color-primary)_25%)] bg-[color-mix(in_srgb,var(--color-surface)_96%,white_4%)] p-2 shadow-[0_16px_28px_rgba(15,23,42,0.18)] backdrop-blur">
            <Button href={primaryToolHref} withArrow fullWidth onClick={() => onPrimaryToolStart("sticky_mobile")}>
              {stage.tool.ctaLabel}
            </Button>
          </div>
        </div>
      ) : null}
    </>
  )
}
