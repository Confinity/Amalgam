"use client"

import Image from "next/image"
import { useEffect, useMemo, useRef, useState } from "react"
import type { KeyboardEvent } from "react"
import { usePathname, useRouter } from "next/navigation"
import { track } from "@vercel/analytics"
import { ArrowRight, ChevronDown, ChevronRight, Compass, Sparkles, Wrench } from "lucide-react"
import { SignalsSubscribeForm } from "@/components/signals-subscribe-form"
import { TrackedLink } from "@/components/tracked-link"
import {
  getLaunchpadProgram,
  getLaunchpadTool,
  launchpadGuideCollections,
  launchpadPrograms,
  type LaunchpadProgramId,
  type LaunchpadToolId,
} from "@/lib/launchpad"
import { getKnowledgeBriefBySlug, type KnowledgeBrief } from "@/lib/knowledge-briefs"
import { withBasePath } from "@/lib/site-config"
import { testimonials } from "@/lib/testimonials"

type StageId =
  | "ideate-prioritize"
  | "validate-derisk"
  | "build-ship"
  | "productize-systemize"
  | "scale-stabilize"
type StageSelection = StageId | "all"

type StageConfig = {
  id: StageId
  label: string
  who: string
  summary: string
  feelsLike: string
  helpBullets: [string, string, string]
  nextStep: string
  primaryAction: { label: string; href: string; source: string; description: string }
  secondaryLabel: string
  pressures: Array<{ id: string; label: string; note: string }>
  guides: [string, string]
  signals: [string, string, string]
  proof: string
  testimonialId: string
  finalHeading: string
  finalBody: string
}

const DEFAULT_STAGE: StageId = "build-ship"
const STAGE_ORDER: StageId[] = [
  "ideate-prioritize",
  "validate-derisk",
  "build-ship",
  "productize-systemize",
  "scale-stabilize",
]
const STAGE_SELECTION_ORDER: StageSelection[] = ["all", ...STAGE_ORDER]

const STAGE_CONFIG: Record<StageId, StageConfig> = {
  "ideate-prioritize": {
    id: "ideate-prioritize",
    label: "Ideate & Prioritize",
    who: "Early founders and pre-build teams.",
    summary: "Clarify what to build first and avoid early complexity debt.",
    feelsLike: "There is potential, but the first move and scope still feel fuzzy.",
    helpBullets: [
      "Shape MVP scope around what must be true first.",
      "Pressure-test feasibility before commitments.",
      "Set practical decision rhythm from day one.",
    ],
    nextStep:
      "If you are still shaping the idea, start by clarifying what the first version must do.",
    primaryAction: {
      label: "Get your next-step brief",
      href: "/launchpad/guides",
      source: "next_step_brief",
      description: "Start with practical guidance before deeper commitments.",
    },
    secondaryLabel: "Talk through your situation",
    pressures: [
      { id: "unclear-first-move", label: "Unclear first move", note: "Use one decision frame before expanding options." },
      { id: "too-many-priorities", label: "Too many priorities", note: "Reduce scope now to protect speed later." },
      { id: "scope-risk", label: "Scope risk", note: "Filter with feasibility, not ambition." },
    ],
    guides: ["architecture-map-before-roadmap", "sequencing-roadmaps-under-uncertainty"],
    signals: ["architecture-map-before-roadmap", "decision-rights-under-complexity", "sequencing-roadmaps-under-uncertainty"],
    proof: "Early clarity removes months of rework later.",
    testimonialId: "fitzmier-jtf",
    finalHeading: "Need a clearer first move before committing engineering effort?",
    finalBody: "Start with the brief, then talk with us if you want a sharper read.",
  },
  "validate-derisk": {
    id: "validate-derisk",
    label: "Validate & De-risk",
    who: "Teams with an MVP that still needs stronger proof.",
    summary: "Validate the right things before scaling effort and complexity.",
    feelsLike: "Something is working, but priority calls still feel risky.",
    helpBullets: [
      "Reduce wasted build effort.",
      "Improve decision quality with stronger evidence.",
      "Clarify what to prove next.",
    ],
    nextStep: "Before building further, make sure you are validating the right things.",
    primaryAction: {
      label: "Run the validation checklist",
      href: "/launchpad/ai-readiness-checklist",
      source: "validation_checklist",
      description: "Use a practical checklist to avoid scaling weak assumptions.",
    },
    secondaryLabel: "Book a triage call",
    pressures: [
      { id: "need-evidence", label: "Need better evidence", note: "Tie priorities to measurable signal." },
      { id: "uncertain-priority", label: "Uncertain priorities", note: "Use one shared prioritization lens." },
      { id: "avoid-overbuild", label: "Avoid overbuilding", note: "Keep effort tied to proof." },
    ],
    guides: ["metrics-you-can-run-the-company-on", "post-series-a-data-foundations"],
    signals: ["metrics-you-can-run-the-company-on", "post-series-a-data-foundations", "operating-rhythm-after-growth"],
    proof: "Tighter validation now protects speed and trust later.",
    testimonialId: "mooney-cleanitsupply",
    finalHeading: "Need confidence in what to validate before investing more?",
    finalBody: "Run the checklist first. If the picture stays fuzzy, we can pressure-test it with you.",
  },
  "build-ship": {
    id: "build-ship",
    label: "Build & Ship",
    who: "Teams actively delivering product under pressure.",
    summary: "Reduce delivery drag and make execution more predictable.",
    feelsLike: "The team is working hard, but progress is harder to forecast.",
    helpBullets: [
      "Diagnose what is actually slowing delivery.",
      "Sequence work around real constraints.",
      "Clarify architecture and integration tradeoffs.",
    ],
    nextStep: "If execution is getting messy, start by identifying the real drag pattern.",
    primaryAction: {
      label: "Start the Delivery Drag Diagnostic",
      href: "/launchpad/delivery-drag-diagnostic",
      source: "delivery_drag_diagnostic",
      description: "Pressure-test drag before choosing a bigger intervention.",
    },
    secondaryLabel: "Talk to Amalgam",
    pressures: [
      { id: "delivery-messy", label: "Delivery feels messy", note: "Treat this as a systems issue first." },
      { id: "integration-drag", label: "Integration drag", note: "Fix boundary ownership before adding more process." },
      { id: "need-roadmap", label: "Need a roadmap", note: "Sequence around dependencies, not preferences." },
    ],
    guides: ["delivery-velocity-is-a-systems-problem", "integration-tax"],
    signals: ["delivery-velocity-is-a-systems-problem", "integration-tax", "sequencing-roadmaps-under-uncertainty"],
    proof: "You do not need a large proposal to get useful clarity.",
    testimonialId: "mendez-pearlx",
    finalHeading: "Need a clearer read on what is slowing delivery right now?",
    finalBody: "Start with the diagnostic, then go deeper only if needed.",
  },
  "productize-systemize": {
    id: "productize-systemize",
    label: "Productize & Systemize",
    who: "Teams moving from ad hoc execution into repeatable systems.",
    summary: "Turn what works into coherent internal systems and operating rhythm.",
    feelsLike: "The product works, but internals are becoming fragile.",
    helpBullets: [
      "Pressure-test tooling and stack posture.",
      "Stabilize high-risk interfaces.",
      "Improve operating clarity for repeatable delivery.",
    ],
    nextStep: "If internals are getting messy, map where structure is breaking first.",
    primaryAction: {
      label: "Start the Tech Stack Audit",
      href: "/launchpad/tech-stack-audit",
      source: "tech_stack_audit",
      description: "Get a first-pass read on coherence, risk, and hidden drag.",
    },
    secondaryLabel: "See program fit",
    pressures: [
      { id: "systems-fragile", label: "Systems feel fragile", note: "Stabilize critical boundaries before adding complexity." },
      { id: "ops-misaligned", label: "Ops misaligned", note: "Clarify ownership around cross-team workflows." },
      { id: "unclear-next-fix", label: "Unsure what to fix first", note: "Use one map of current state first." },
    ],
    guides: ["modernize-vs-rebuild", "structure-follows-architecture"],
    signals: ["modernize-vs-rebuild", "architecture-map-before-roadmap", "structure-follows-architecture"],
    proof: "Productization is usually a coherence problem before it is a speed problem.",
    testimonialId: "fitzmier-jtf",
    finalHeading: "Need to turn ad hoc delivery into repeatable systems?",
    finalBody: "Start with the stack audit, then decide whether sprint or deeper support fits best.",
  },
  "scale-stabilize": {
    id: "scale-stabilize",
    label: "Scale & Stabilize",
    who: "Scale-ups and complex teams carrying rising systems pressure.",
    summary: "Regain control as complexity rises and confidence starts slipping.",
    feelsLike: "Growth is real, but systems are less predictable than they should be.",
    helpBullets: [
      "Diagnose where complexity is creating drag.",
      "Stabilize architecture and integration pressure points.",
      "Support leadership with clearer sequencing and follow-through.",
    ],
    nextStep: "If complexity is dragging momentum, start by clarifying where intervention matters most.",
    primaryAction: {
      label: "Get your scale readiness path",
      href: "/launchpad/ai-readiness-checklist",
      source: "scale_readiness_path",
      description: "Get a practical first read on readiness and intervention order.",
    },
    secondaryLabel: "Book a strategic call",
    pressures: [
      { id: "growth-drag", label: "Growth creating drag", note: "Treat this as systems + sequencing, not effort alone." },
      { id: "confidence-slipping", label: "Confidence slipping", note: "Align around one shared diagnostic picture." },
      { id: "need-follow-through", label: "Need follow-through", note: "Continuity support may matter more than new plans." },
    ],
    guides: ["delivery-velocity-is-a-systems-problem", "sequencing-roadmaps-under-uncertainty"],
    signals: ["metrics-you-can-run-the-company-on", "delivery-velocity-is-a-systems-problem", "decision-rights-under-complexity"],
    proof: "Teams recover momentum when complexity is made legible.",
    testimonialId: "mendez-pearlx",
    finalHeading: "Need a stronger operating read as growth pressure rises?",
    finalBody: "Start with readiness, then book a strategic call for direct support.",
  },
}

function parseStage(value: string | null): StageSelection {
  if (!value) {
    return "all"
  }
  if (value === "all") {
    return "all"
  }
  return STAGE_ORDER.includes(value as StageId) ? (value as StageId) : "all"
}

function guidesFromSlugs(slugs: string[]): KnowledgeBrief[] {
  return slugs.map((slug) => getKnowledgeBriefBySlug(slug)).filter((x): x is KnowledgeBrief => Boolean(x))
}

function recommendedProgramId(stage: StageSelection, pressure: string): LaunchpadProgramId {
  if (stage === "all") {
    return "founder-review"
  }
  if (stage === "productize-systemize") {
    return pressure === "systems-fragile" ? "founder-review" : "execution-sprint"
  }
  if (stage === "scale-stabilize") {
    return pressure === "need-follow-through" ? "outcome-partnership" : "execution-sprint"
  }
  return "founder-review"
}

function contactHref(input: {
  stageId: StageSelection
  stageLabel: string
  pressure: string
  ctaPath: string
  ctaLabel: string
  note: string
  interest?: string
}) {
  const params = new URLSearchParams()
  params.set("interest", input.interest ?? "strategy-session")
  params.set("source", "launchpad")
  params.set("stage", input.stageId)
  params.set("cta_path", input.ctaPath)
  if (input.pressure) {
    params.set("pressure", input.pressure)
  }
  params.set(
    "context",
    [
      "Source: Launchpad",
      `Stage: ${input.stageLabel}`,
      input.pressure ? `Pressure: ${input.pressure}` : "Pressure: none selected",
      `CTA: ${input.ctaLabel}`,
      `Note: ${input.note}`,
    ].join("\n"),
  )
  return `/contact?${params.toString()}`
}

type LaunchpadStageNavigatorProps = {
  initialStageParam?: string
  initialPressureParam?: string
}

export function LaunchpadStageNavigator({
  initialStageParam,
  initialPressureParam,
}: LaunchpadStageNavigatorProps) {
  const pathname = usePathname()
  const router = useRouter()
  const initialStage = parseStage(initialStageParam ?? null)
  const initialPressure = (() => {
    const rawPressure = initialPressureParam ?? ""
    if (initialStage === "all") {
      return ""
    }
    return STAGE_CONFIG[initialStage].pressures.some((item) => item.id === rawPressure)
      ? rawPressure
      : ""
  })()
  const [stageId, setStageId] = useState<StageSelection>(initialStage)
  const [pressureId, setPressureId] = useState(initialPressure)
  const [exploreOpen, setExploreOpen] = useState(false)
  const [showMobileDock, setShowMobileDock] = useState(false)
  const entryTracked = useRef(false)

  const isOverview = stageId === "all"
  const activeStageId: StageId = isOverview ? DEFAULT_STAGE : stageId
  const stage = STAGE_CONFIG[activeStageId]
  const pressure = isOverview
    ? null
    : stage.pressures.find((item) => item.id === pressureId) ?? null
  const guides = isOverview
    ? guidesFromSlugs(["delivery-velocity-is-a-systems-problem", "modernize-vs-rebuild"])
    : guidesFromSlugs(stage.guides)
  const signals = isOverview
    ? guidesFromSlugs([
        "delivery-velocity-is-a-systems-problem",
        "modernize-vs-rebuild",
        "metrics-you-can-run-the-company-on",
      ])
    : guidesFromSlugs(stage.signals)
  const programId = recommendedProgramId(stageId, pressureId)
  const mainProgram = getLaunchpadProgram(programId)
  const otherPrograms = launchpadPrograms.filter((p) => p.id !== programId)
  const testimonial = isOverview
    ? testimonials.find((item) => item.id === "mendez-pearlx") ?? testimonials[0]
    : testimonials.find((item) => item.id === stage.testimonialId) ?? testimonials[0]
  const toolId: LaunchpadToolId | null =
    stage.primaryAction.source === "delivery_drag_diagnostic"
      ? "delivery-drag-diagnostic"
      : stage.primaryAction.source === "tech_stack_audit"
        ? "tech-stack-audit"
        : stage.primaryAction.source === "scale_readiness_path" || stage.primaryAction.source === "validation_checklist"
          ? "ai-readiness-checklist"
          : null
  const tool = toolId ? getLaunchpadTool(toolId) : null

  const talkHref = useMemo(
    () =>
      contactHref({
        stageId: isOverview ? "all" : stage.id,
        stageLabel: isOverview ? "All stages overview" : stage.label,
        pressure: pressureId,
        ctaPath: "contextual",
        ctaLabel: isOverview ? "Talk through your situation" : stage.secondaryLabel,
        note: isOverview ? "Need guidance on where to start in the journey." : stage.nextStep,
      }),
    [isOverview, pressureId, stage],
  )
  const finalTalkHref = useMemo(
    () =>
      contactHref({
        stageId: isOverview ? "all" : stage.id,
        stageLabel: isOverview ? "All stages overview" : stage.label,
        pressure: pressureId,
        ctaPath: "final",
        ctaLabel: "Book a quick call",
        note: isOverview ? "Need a quick read on the right next step." : stage.finalBody,
      }),
    [isOverview, pressureId, stage],
  )
  const nextActionLabel = isOverview
    ? "Start with the Delivery Drag Diagnostic"
    : stage.primaryAction.label
  const nextActionHref = isOverview
    ? "/launchpad/delivery-drag-diagnostic"
    : stage.primaryAction.href
  const nextActionSource = isOverview
    ? "overview_default_diagnostic"
    : stage.primaryAction.source
  const nextActionDescription = isOverview
    ? "If you are not sure where to start, run a practical diagnostic first, then choose a focused stage."
    : stage.primaryAction.description
  const contextualSecondaryLabel = isOverview
    ? "Talk through your situation"
    : stage.secondaryLabel
  const finalHeading = isOverview
    ? "Need help identifying the right stage and next step?"
    : stage.finalHeading
  const finalBody = isOverview
    ? "Start with a practical diagnostic, then choose focused support only when it clearly makes sense."
    : stage.finalBody

  useEffect(() => {
    if (entryTracked.current) {
      return
    }
    entryTracked.current = true
    track("launchpad_entry_stage", { stage: initialStage, from_query: Boolean(initialStageParam) })
  }, [initialStage, initialStageParam])

  useEffect(() => {
    const updateDock = () => {
      const viewportBottom = window.scrollY + window.innerHeight
      const remaining = document.documentElement.scrollHeight - viewportBottom
      setShowMobileDock(window.scrollY > 760 && remaining > 420)
    }
    updateDock()
    window.addEventListener("scroll", updateDock, { passive: true })
    window.addEventListener("resize", updateDock)
    return () => {
      window.removeEventListener("scroll", updateDock)
      window.removeEventListener("resize", updateDock)
    }
  }, [])

  const syncUrl = (nextStage: StageSelection, nextPressure: string) => {
    const params = new URLSearchParams(
      typeof window !== "undefined" ? window.location.search : "",
    )
    if (nextStage === "all") {
      params.delete("stage")
      params.delete("pressure")
    } else {
      params.set("stage", nextStage)
    }
    if (nextStage !== "all" && nextPressure) {
      params.set("pressure", nextPressure)
    } else {
      params.delete("pressure")
    }
    const query = params.toString()
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false })
  }

  const onStageSelect = (nextStage: StageSelection) => {
    const keepPressure =
      nextStage !== "all" && STAGE_CONFIG[nextStage].pressures.some((item) => item.id === pressureId)
        ? pressureId
        : ""
    setStageId(nextStage)
    setPressureId(keepPressure)
    syncUrl(nextStage, keepPressure)
    track("launchpad_stage_selected", { stage: nextStage, pressure: keepPressure || "none" })
  }

  const onPressureSelect = (next: string) => {
    if (isOverview) {
      return
    }
    const nextPressure = next === pressureId ? "" : next
    setPressureId(nextPressure)
    syncUrl(stageId, nextPressure)
    track("launchpad_pressure_selected", { stage: stageId, pressure: nextPressure || "none" })
  }

  const onStageSelectorKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const key = event.key
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(key)) {
      return
    }
    event.preventDefault()
    const currentIndex = STAGE_SELECTION_ORDER.indexOf(stageId)
    if (currentIndex < 0) {
      return
    }
    if (key === "Home") {
      onStageSelect(STAGE_SELECTION_ORDER[0])
      return
    }
    if (key === "End") {
      onStageSelect(STAGE_SELECTION_ORDER[STAGE_SELECTION_ORDER.length - 1])
      return
    }
    const direction = key === "ArrowRight" ? 1 : -1
    const nextIndex = (currentIndex + direction + STAGE_SELECTION_ORDER.length) % STAGE_SELECTION_ORDER.length
    onStageSelect(STAGE_SELECTION_ORDER[nextIndex])
  }

  return (
    <>
      <section className="relative overflow-hidden border-b border-border py-20 lg:py-28">
        <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-teal/10 blur-3xl" />
        <div className="pointer-events-none absolute left-0 top-16 h-64 w-64 rounded-full bg-purple/8 blur-3xl" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-teal/12 to-transparent" />
        <div className="mx-auto grid max-w-[1200px] gap-10 px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-teal/25 bg-teal/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-teal">
              A-to-Z founder operating navigator
            </span>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-teal">
              Launchpad
            </p>
            <h1 className="max-w-[20ch] text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              From first idea to scale pressure, Launchpad helps you choose the{" "}
              <span className="bg-gradient-to-r from-teal to-purple bg-clip-text text-transparent">
                right next move.
              </span>
            </h1>
            <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-muted-foreground">
              Find your stage, see what matters now, and choose the next best
              step whether that means using a practical tool, exploring a
              guide, or talking to us.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <TrackedLink
                href="#launchpad-stage-selector"
                eventName="launchpad_primary_cta_click"
                eventData={{ source: "hero", stage: stageId }}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-teal px-6 py-3 font-medium text-background transition-opacity hover:opacity-90"
              >
                Find your stage
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
              <TrackedLink
                href={finalTalkHref}
                eventName="launchpad_secondary_cta_click"
                eventData={{ source: "hero", stage: stageId }}
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-border px-6 py-3 font-medium text-foreground transition-colors hover:bg-secondary"
              >
                Book a quick call
              </TrackedLink>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Self-serve first. Human support when useful.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
              {["Idea", "Validation", "Build", "Productize", "Scale"].map(
                (step, index) => (
                  <span key={step} className="inline-flex items-center gap-2">
                    <span className="rounded-full border border-border bg-background px-3 py-1.5">
                      {step}
                    </span>
                    {index < 4 ? (
                      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/70" />
                    ) : null}
                  </span>
                ),
              )}
            </div>
          </div>

          <aside className="support-panel rounded-[30px] border border-teal/20 p-8 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
              How Launchpad works
            </p>
            <ol className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <li className="support-panel-item px-0 pb-0 pt-1">
                1. Select your stage
              </li>
              <li className="support-panel-item px-0 pb-0 pt-3">
                2. See your next best step
              </li>
              <li className="support-panel-item px-0 pb-0 pt-3">
                3. Go deeper only if needed
              </li>
            </ol>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Self-serve first. Human support when useful.
            </p>
          </aside>
        </div>
      </section>

      <div
        id="launchpad-stage-selector"
        className="sticky top-20 z-40 border-b border-border bg-background/95 py-5 backdrop-blur"
      >
        <div className="mx-auto max-w-[1200px] px-6">
          <h2 className="text-2xl font-semibold text-foreground">
            Where are you right now?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Pick the stage that feels closest to your situation. We&apos;ll
            show tools, guidance, and next steps that fit best.
          </p>
          <div
            role="radiogroup"
            aria-label="Founder journey stages"
            aria-describedby="launchpad-stage-selector-help"
            onKeyDown={onStageSelectorKeyDown}
            className="mt-5 flex gap-3 overflow-x-auto pb-1"
          >
            <button
              id="stage-tab-all"
              role="radio"
              type="button"
              aria-checked={isOverview}
              className={`min-h-11 shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                isOverview
                  ? "border-teal/45 bg-gradient-to-r from-teal to-teal/80 text-background"
                  : "border-border bg-background text-foreground hover:bg-secondary"
              }`}
              onClick={() => onStageSelect("all")}
            >
              All stages
            </button>
            {STAGE_ORDER.map((itemId) => {
              const selected = stageId === itemId
              return (
                <button
                  key={itemId}
                  id={`stage-tab-${itemId}`}
                  role="radio"
                  type="button"
                  aria-checked={selected}
                  className={`min-h-11 shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    selected
                      ? "border-teal/45 bg-gradient-to-r from-teal to-teal/80 text-background"
                      : "border-border bg-background text-foreground hover:bg-secondary"
                  }`}
                  onClick={() => onStageSelect(itemId)}
                >
                  {STAGE_CONFIG[itemId].label}
                </button>
              )
            })}
          </div>
          <p id="launchpad-stage-selector-help" className="sr-only">
            Choose one stage to load focused recommendations. Use left and right arrow keys to move between options.
          </p>
          {isOverview ? (
            <p className="mt-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Select a stage to add pressure-state refinement.
            </p>
          ) : (
            <>
              <p className="mt-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Pressure state (optional)
              </p>
              <div
                role="radiogroup"
                aria-label="Refine by pressure"
                className="mt-2 flex gap-2 overflow-x-auto pb-1"
              >
                {stage.pressures.map((option) => {
                  const selected = pressureId === option.id
                  return (
                    <button
                      key={option.id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      className={`min-h-10 shrink-0 rounded-full border px-3.5 py-2 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                        selected
                          ? "border-teal/55 bg-teal/10 text-foreground"
                          : "border-border bg-background text-muted-foreground hover:text-foreground"
                      }`}
                      onClick={() => onPressureSelect(option.id)}
                    >
                      {option.label}
                    </button>
                  )
                })}
              </div>
            </>
          )}
        </div>
      </div>

      <section
        id={`stage-panel-${isOverview ? "all" : stage.id}`}
        className="deferred-section py-16 lg:py-20"
        aria-live="polite"
        aria-atomic="true"
      >
        <div
          key={`${stageId}-${pressureId || "none"}`}
          className="mx-auto grid max-w-[1200px] gap-8 px-6 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-200 lg:grid-cols-[minmax(0,1fr)_330px]"
        >
          {isOverview ? (
            <>
              <div className="support-panel rounded-[30px] p-8">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                  Full journey overview
                </p>
                <h2 className="mt-4 text-3xl font-semibold text-foreground">
                  See the full entrepreneurial journey, then choose where you are now
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Launchpad supports the full path from ideation through scale. Pick
                  any stage below to switch into focused guidance.
                </p>
                <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {STAGE_ORDER.map((itemId, index) => {
                    const item = STAGE_CONFIG[itemId]
                    const accentClass =
                      index % 5 === 0
                        ? "from-teal/16 to-transparent"
                        : index % 5 === 1
                          ? "from-teal/10 via-purple/6 to-transparent"
                        : index % 5 === 2
                            ? "from-purple/12 to-transparent"
                        : index % 5 === 3
                              ? "from-teal/8 via-purple/8 to-transparent"
                              : "from-purple/8 via-teal/8 to-transparent"
                    return (
                      <article
                        key={item.id}
                        className={`rounded-2xl border border-border bg-gradient-to-br ${accentClass} p-4`}
                      >
                        <p className="text-xs font-medium uppercase tracking-[0.16em] text-teal">
                          {item.label}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {item.summary}
                        </p>
                        <button
                          type="button"
                          className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-teal transition-colors hover:text-foreground"
                          onClick={() => onStageSelect(item.id)}
                        >
                          Show this stage
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </article>
                    )
                  })}
                </div>
              </div>
              <aside className="rounded-[30px] border border-border bg-background p-7">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                  Current signal
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Start in overview mode when you need the full map. Select a stage
                  anytime for focused next-step guidance and stage-specific tools.
                </p>
              </aside>
            </>
          ) : (
            <>
              <div className="support-panel rounded-[30px] p-8">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                  Stage context
                </p>
                <h2 className="mt-4 text-3xl font-semibold text-foreground">
                  {stage.label}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  <span className="font-medium text-foreground">Who it is for: </span>
                  {stage.who}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {stage.summary}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {stage.feelsLike}
                </p>
                <div className="mt-6 grid gap-3 md:grid-cols-3">
                  {stage.helpBullets.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-border bg-background px-4 py-4 text-sm text-muted-foreground"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <aside className="rounded-[30px] border border-border bg-background p-7">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                  Current signal
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {stage.nextStep}
                </p>
                <p className="mt-4 rounded-2xl border border-border bg-secondary/35 px-4 py-3 text-sm leading-relaxed text-foreground">
                  {pressure
                    ? pressure.note
                    : "Add a pressure state above if you want a tighter recommendation."}
                </p>
              </aside>
            </>
          )}
        </div>
      </section>

      <section className="deferred-section border-y border-border bg-secondary/35 py-20 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-6">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-teal">
            Next best step
          </p>
          <h2 className="mb-10 text-3xl font-semibold text-foreground text-balance">
            {isOverview ? "Choose your starting move across the full journey" : "What to do next in this stage"}
          </h2>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
            <article className="support-panel flex h-full flex-col rounded-[30px] p-8">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                Recommended next action
              </p>
              <h3 className="mt-4 text-2xl font-semibold text-foreground">
                {nextActionLabel}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {nextActionDescription}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-foreground/80">
                {stage.nextStep}
              </p>
              <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row">
                <TrackedLink
                  href={nextActionHref}
                  eventName="launchpad_primary_action_click"
                  eventData={{
                    stage: stageId,
                    pressure: pressureId || "none",
                    source: nextActionSource,
                  }}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
                >
                  {nextActionLabel}
                  <ArrowRight className="h-4 w-4" />
                </TrackedLink>
                <TrackedLink
                  href={talkHref}
                  eventName="launchpad_secondary_action_click"
                  eventData={{
                    stage: stageId,
                    pressure: pressureId || "none",
                    source: "contextual_talk_path",
                  }}
                  className="inline-flex min-h-11 items-center justify-center rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-background"
                >
                  {contextualSecondaryLabel}
                </TrackedLink>
              </div>
            </article>

            <div className="grid gap-5">
              {guides.map((guide) => (
                <TrackedLink
                  key={guide.slug}
                  href={`/knowledge/${guide.slug}`}
                  eventName="launchpad_supporting_guide_click"
                  eventData={{
                    stage: stageId,
                    pressure: pressureId || "none",
                    guide: guide.slug,
                  }}
                  className="rounded-[24px] border border-border bg-background px-6 py-5 transition-colors hover:border-teal/35"
                >
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                    Supporting guide
                  </p>
                  <h3 className="mt-3 text-lg font-semibold text-foreground">
                    {guide.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {guide.description}
                  </p>
                </TrackedLink>
              ))}
              <div className="rounded-[24px] border border-border bg-background px-6 py-5">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                  Confidence note
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {stage.proof}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="deferred-section section-warm py-20 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-6">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-teal">
            Program fit
          </p>
          <h2 className="mb-10 text-3xl font-semibold text-foreground text-balance">
            {isOverview
              ? "If self-serve work points to deeper support, this is how it usually starts"
              : "If this stage needs deeper support, here is the usual fit"}
          </h2>
          <div className="grid gap-6 lg:grid-cols-3">
            <article className="rounded-[28px] border border-teal/45 bg-background p-7 shadow-[0_14px_30px_rgba(0,191,166,0.08)]">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                Recommended for this stage
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-foreground">
                {mainProgram.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {mainProgram.description}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-foreground/75">
                {mainProgram.whenItsRight}
              </p>
              <TrackedLink
                href={mainProgram.href}
                eventName="launchpad_program_fit_click"
                eventData={{
                  stage: stageId,
                  pressure: pressureId || "none",
                  program: mainProgram.id,
                }}
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-teal transition-colors hover:text-foreground"
              >
                {mainProgram.ctaLabel}
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
            </article>
            {otherPrograms.map((program) => (
              <article key={program.id} className="support-panel rounded-[28px] p-7">
                <h3 className="text-xl font-semibold text-foreground">
                  {program.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {program.description}
                </p>
                <TrackedLink
                  href={program.href}
                  eventName="launchpad_program_fit_click"
                  eventData={{
                    stage: stageId,
                    pressure: pressureId || "none",
                    program: program.id,
                  }}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-teal transition-colors hover:text-foreground"
                >
                  {program.ctaLabel}
                  <ArrowRight className="h-4 w-4" />
                </TrackedLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="deferred-section py-18 lg:py-20">
        <div className="mx-auto grid max-w-[1200px] gap-8 px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <div className="support-panel rounded-[30px] p-8">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-teal">
              Trust note
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-foreground text-balance">
              Not every next step has to start with us
            </h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
              If the right move is adjacent to our core work, we will point you
              there directly. The goal is a better next move, not a forced
              engagement.
            </p>
          </div>
          <aside className="rounded-[30px] border border-border bg-background p-7">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
              When this helps
            </p>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>Need a direct read on which path fits your situation.</p>
              <p>Need an adjacent introduction once the situation is clearer.</p>
              <p>Need practical judgment before a larger commitment.</p>
            </div>
            <TrackedLink
              href={contactHref({
                stageId: isOverview ? "all" : stage.id,
                stageLabel: isOverview ? "All stages overview" : stage.label,
                pressure: pressureId,
                ctaPath: "trust_block",
                ctaLabel: "Start a conversation",
                note: "Need practical direction on where to start.",
                interest: "general",
              })}
              eventName="launchpad_trust_conversation_click"
              eventData={{ stage: stageId, pressure: pressureId || "none" }}
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-teal transition-colors hover:text-foreground"
            >
              Start a conversation
              <ArrowRight className="h-4 w-4" />
            </TrackedLink>
          </aside>
        </div>
      </section>

      <section className="deferred-section border-y border-border py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6">
          <button
            type="button"
            aria-expanded={exploreOpen}
            aria-controls="launchpad-explore-all"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            onClick={() => {
              setExploreOpen((current) => {
                const next = !current
                track("launchpad_explore_all_toggle", {
                  stage: stageId,
                  open: next,
                })
                return next
              })
            }}
          >
            {exploreOpen
              ? "Hide full resource map"
              : "Explore all tools, guides, and programs"}
            <ChevronDown
              className={`h-4 w-4 transition-transform motion-reduce:transition-none ${
                exploreOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {exploreOpen ? (
            <div
              id="launchpad-explore-all"
              className="mt-6 grid gap-6 rounded-[28px] border border-border bg-secondary/30 p-6 md:grid-cols-3"
            >
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                  Tools
                </p>
                <div className="mt-4 space-y-3">
                  {(
                    ["delivery-drag-diagnostic", "ai-readiness-checklist", "tech-stack-audit"] as LaunchpadToolId[]
                  ).map((itemId) => {
                    const item = getLaunchpadTool(itemId)
                    return (
                      <TrackedLink
                        key={item.id}
                        href={`/launchpad/${item.slug}`}
                        eventName="launchpad_explore_tool_click"
                        eventData={{ stage: stageId, tool: item.id }}
                        className="block rounded-2xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-teal/35"
                      >
                        {item.title}
                      </TrackedLink>
                    )
                  })}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                  Guide paths
                </p>
                <div className="mt-4 space-y-3">
                  {launchpadGuideCollections.map((collection) => (
                    <TrackedLink
                      key={collection.id}
                      href="/launchpad/guides"
                      eventName="launchpad_explore_guide_path_click"
                      eventData={{ stage: stageId, path: collection.id }}
                      className="block rounded-2xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-teal/35"
                    >
                      {collection.title}
                    </TrackedLink>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                  Programs
                </p>
                <div className="mt-4 space-y-3">
                  {launchpadPrograms.map((program) => (
                    <TrackedLink
                      key={program.id}
                      href={program.href}
                      eventName="launchpad_explore_program_click"
                      eventData={{ stage: stageId, program: program.id }}
                      className="block rounded-2xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-teal/35"
                    >
                      {program.title}
                    </TrackedLink>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="deferred-section py-20 lg:py-24">
        <div className="mx-auto grid max-w-[1200px] gap-8 px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <div className="support-panel rounded-[30px] p-8">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-teal">
              Signals
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-foreground text-balance">
              {isOverview
                ? "Practical updates across the full founder journey"
                : `Practical updates for teams in ${stage.label.toLowerCase()}`}
            </h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
              Notes on what to do next when complexity, priorities, and delivery pressure collide.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {signals.map((article) => (
                <TrackedLink
                  key={article.slug}
                  href={`/knowledge/${article.slug}`}
                  eventName="launchpad_signal_article_click"
                  eventData={{
                    stage: stageId,
                    pressure: pressureId || "none",
                    article: article.slug,
                  }}
                  className="rounded-[24px] border border-border bg-background px-5 py-5 transition-colors hover:border-teal/35"
                >
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                    Signal preview
                  </p>
                  <p className="mt-3 text-lg font-semibold text-foreground">
                    {article.title}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {article.description}
                  </p>
                </TrackedLink>
              ))}
            </div>
          </div>

          <aside className="rounded-[30px] border border-border bg-foreground p-8">
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-teal" />
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                Subscribe
              </p>
            </div>
            <h3 className="mt-4 text-2xl font-semibold text-background">
              {isOverview ? "Get practical updates across all stages" : "Get practical updates for this stage"}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-background/72">
              {isOverview
                ? "Useful notes from idea to scale without generic noise."
                : `Useful notes for ${stage.label.toLowerCase()} teams without generic noise.`}
            </p>
            <SignalsSubscribeForm
              source={`launchpad_stage_${stageId}`}
              buttonLabel="Subscribe for practical signal"
              className="mt-6 space-y-4"
            />
            <TrackedLink
              href="/launchpad/signals"
              eventName="launchpad_signals_layer_click"
              eventData={{ stage: stageId }}
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-teal transition-colors hover:text-background"
            >
              Explore the signals layer
              <ArrowRight className="h-4 w-4" />
            </TrackedLink>
          </aside>
        </div>
      </section>

      {testimonial ? (
        <section className="deferred-section border-y border-border bg-secondary/25 py-16 lg:py-20">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="rounded-[30px] border border-border bg-background p-8 md:p-10">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                Proof
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-foreground text-balance">
                What teams notice after choosing the right next step
              </h2>
              <blockquote className="mt-6 text-base leading-relaxed text-foreground md:text-lg">
                <span className="mr-1 text-xl leading-none text-teal/65">
                  &ldquo;
                </span>
                {testimonial.quote}
              </blockquote>
              <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                <div className="relative h-12 w-12 overflow-hidden rounded-full border border-border/70 bg-background/70">
                  <Image
                    src={withBasePath(testimonial.image)}
                    alt={`Portrait of ${testimonial.name}`}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.title}, {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="deferred-section bg-foreground py-20 lg:py-24">
        <div className="mx-auto max-w-[950px] px-6 text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-teal">
            Final next step
          </p>
          <h2 className="text-3xl font-semibold text-background text-balance md:text-4xl">
            {finalHeading}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-background/72">
            {finalBody}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <TrackedLink
              href={nextActionHref}
              eventName="launchpad_final_primary_click"
              eventData={{
                stage: stageId,
                pressure: pressureId || "none",
                source: nextActionSource,
              }}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-background px-6 py-3 font-medium text-foreground transition-opacity hover:opacity-90"
            >
              {nextActionLabel}
              {tool ? <Wrench className="h-4 w-4" /> : <Compass className="h-4 w-4" />}
            </TrackedLink>
            <TrackedLink
              href={finalTalkHref}
              eventName="launchpad_final_secondary_click"
              eventData={{
                stage: stageId,
                pressure: pressureId || "none",
                source: "book_quick_call",
              }}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-background/20 px-6 py-3 font-medium text-background transition-colors hover:bg-background/10"
            >
              Book a quick call
            </TrackedLink>
          </div>
        </div>
      </section>

      <div
        className={`fixed inset-x-0 bottom-3 z-50 px-4 transition-all duration-200 md:hidden motion-reduce:transition-none ${
          showMobileDock
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-5 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-md rounded-2xl border border-border/80 bg-background/96 p-2 shadow-[0_16px_35px_rgba(15,23,42,0.18)] backdrop-blur">
          <div className="grid grid-cols-2 gap-2">
            <TrackedLink
              href={nextActionHref}
              eventName="launchpad_sticky_dock_primary_click"
              eventData={{ stage: stageId, pressure: pressureId || "none", source: nextActionSource }}
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-foreground px-3 text-center text-xs font-semibold text-background"
            >
              Start next step
            </TrackedLink>
            <TrackedLink
              href={finalTalkHref}
              eventName="launchpad_sticky_dock_secondary_click"
              eventData={{ stage: stageId, pressure: pressureId || "none", source: "book_quick_call" }}
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-border px-3 text-center text-xs font-semibold text-foreground"
            >
              Talk to us
            </TrackedLink>
          </div>
        </div>
      </div>
    </>
  )
}
