"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import type { KeyboardEvent, MouseEvent as ReactMouseEvent } from "react"
import { usePathname, useRouter } from "next/navigation"
import { track } from "@vercel/analytics"
import { ArrowRight, ChevronDown, Compass, Sparkles, Wrench } from "lucide-react"
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
  commonBreaks: [string, string]
  goodLooksLike: string
  amalgamHelp: string
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

type QuickActionCard = {
  id: string
  label: string
  description: string
  href: string
  source: string
  anchorTarget: "launchpad-stage-selector" | "launchpad-next-step" | null
}

type LaunchpadAnchorTarget = "launchpad-stage-selector" | "launchpad-next-step"

const DEFAULT_STAGE: StageId = "build-ship"
const STAGE_ORDER: StageId[] = [
  "ideate-prioritize",
  "validate-derisk",
  "build-ship",
  "productize-systemize",
  "scale-stabilize",
]
const STAGE_SELECTION_ORDER: StageSelection[] = ["all", ...STAGE_ORDER]
const FIXED_NAV_FALLBACK_HEIGHT = 72
const ANCHOR_EXTRA_GAP = 12
const MOBILE_STAGE_SELECTOR_COMPACT_SCROLL_Y = 140
const STAGE_SELECTOR_HIGHLIGHT_MS = 1400
const STRATEGY_CALL_LABEL = "Book a strategy call"
const STAGE_TONE: Record<
  StageId,
  {
    chip: string
    badge: string
  }
> = {
  "ideate-prioritize": {
    chip: "border-emerald-500/55 bg-emerald-600 text-white",
    badge: "border-emerald-500/25 bg-emerald-500/10 text-emerald-700",
  },
  "validate-derisk": {
    chip: "border-cyan-500/55 bg-cyan-600 text-white",
    badge: "border-cyan-500/25 bg-cyan-500/10 text-cyan-700",
  },
  "build-ship": {
    chip: "border-teal/45 bg-teal text-background",
    badge: "border-teal/30 bg-teal/10 text-teal",
  },
  "productize-systemize": {
    chip: "border-blue-500/55 bg-blue-600 text-white",
    badge: "border-blue-500/25 bg-blue-500/10 text-blue-700",
  },
  "scale-stabilize": {
    chip: "border-indigo-500/55 bg-indigo-600 text-white",
    badge: "border-indigo-500/25 bg-indigo-500/10 text-indigo-700",
  },
}

const STAGE_CONFIG: Record<StageId, StageConfig> = {
  "ideate-prioritize": {
    id: "ideate-prioritize",
    label: "Ideate & Prioritize",
    who: "Founders, entrepreneurs, and solopreneurs shaping the first real build.",
    summary:
      "Clarify what to build first so early effort compounds instead of drifting.",
    feelsLike:
      "You have momentum and ideas, but priorities keep changing week to week.",
    commonBreaks: [
      "Too many priorities enter the first roadmap at once.",
      "Teams start building before success criteria are explicit.",
    ],
    goodLooksLike:
      "A tight first-version scope, clear success criteria, and one decision rhythm the team trusts.",
    amalgamHelp:
      "We help you convert early ambiguity into a practical sequence the team can execute.",
    nextStep: "Pick one outcome the first version must prove, then sequence decisions around it.",
    primaryAction: {
      label: "Start the next-step brief",
      href: "/launchpad/guides",
      source: "next_step_brief",
      description: "Use a short brief to lock scope and choose the right first move.",
    },
    secondaryLabel: STRATEGY_CALL_LABEL,
    pressures: [
      {
        id: "unclear-first-move",
        label: "Unclear first move",
        note: "Pick one decision frame before expanding options.",
      },
      {
        id: "too-many-priorities",
        label: "Too many priorities",
        note: "Narrow scope now so delivery speed rises later.",
      },
      {
        id: "scope-risk",
        label: "Scope risk",
        note: "Filter early ideas with feasibility, not ambition alone.",
      },
    ],
    guides: ["architecture-map-before-roadmap", "sequencing-roadmaps-under-uncertainty"],
    signals: ["architecture-map-before-roadmap", "decision-rights-under-complexity", "sequencing-roadmaps-under-uncertainty"],
    proof: "Early alignment now can save months of expensive rework later.",
    testimonialId: "fitzmier-jtf",
    finalHeading: "Not sure what to do first?",
    finalBody: "Start with the brief. If it still feels fuzzy, we can talk it through.",
  },
  "validate-derisk": {
    id: "validate-derisk",
    label: "Validate & De-risk",
    who: "Teams with an MVP that needs stronger proof before scaling investment.",
    summary:
      "Validate the biggest assumptions now so you avoid scaling the wrong thing.",
    feelsLike:
      "Something is working, but roadmap decisions still feel riskier than they should.",
    commonBreaks: [
      "Teams overbuild before they confirm what really matters.",
      "Priority decisions rely on opinions more than shared evidence.",
    ],
    goodLooksLike:
      "Validation targets are explicit, evidence quality is trusted, and next bets are easier to justify.",
    amalgamHelp:
      "We help you define what to test next and which assumptions deserve build time.",
    nextStep: "Before building more, confirm you are validating the right thing in the right order.",
    primaryAction: {
      label: "Start the validation checklist",
      href: "/launchpad/ai-readiness-checklist",
      source: "validation_checklist",
      description: "Run a short checklist before you scale weak assumptions.",
    },
    secondaryLabel: STRATEGY_CALL_LABEL,
    pressures: [
      {
        id: "need-evidence",
        label: "Need stronger evidence",
        note: "Tie priorities to measurable evidence before expanding scope.",
      },
      {
        id: "uncertain-priority",
        label: "Uncertain priorities",
        note: "Use one shared ranking method so decisions stop bouncing.",
      },
      {
        id: "avoid-overbuild",
        label: "Avoid overbuilding",
        note: "Keep effort tied to proof, not assumptions.",
      },
    ],
    guides: ["metrics-you-can-run-the-company-on", "post-series-a-data-foundations"],
    signals: ["metrics-you-can-run-the-company-on", "post-series-a-data-foundations", "operating-rhythm-after-growth"],
    proof: "Better validation now protects speed and confidence later.",
    testimonialId: "mooney-cleanitsupply",
    finalHeading: "Want more confidence before you invest more?",
    finalBody: "Start with the checklist. If it still feels unclear, we can review it with you.",
  },
  "build-ship": {
    id: "build-ship",
    label: "Build & Ship",
    who: "Founders and teams already shipping, but struggling with delivery consistency.",
    summary: "Reduce delivery friction so shipping feels predictable again.",
    feelsLike: "The team is busy, yet progress still feels noisier than it should.",
    commonBreaks: [
      "Hidden dependencies keep breaking expected delivery flow.",
      "Architecture and integration tradeoffs are handled too late.",
    ],
    goodLooksLike:
      "Teams can explain where drag is coming from and sequence work around real constraints.",
    amalgamHelp:
      "We help teams find the delivery friction and prioritize the fixes that restore momentum.",
    nextStep: "If shipping feels messy, find the real delivery blocker first.",
    primaryAction: {
      label: "Start the delivery drag check",
      href: "/launchpad/delivery-drag-diagnostic",
      source: "delivery_drag_diagnostic",
      description: "Get a quick read on delivery friction before bigger work.",
    },
    secondaryLabel: STRATEGY_CALL_LABEL,
    pressures: [
      { id: "delivery-messy", label: "Shipping feels messy", note: "Treat this as a systems issue first." },
      { id: "integration-drag", label: "Integration drag", note: "Fix boundary ownership before adding more process." },
      { id: "need-roadmap", label: "Roadmap sequence", note: "Sequence around dependencies, not preferences." },
    ],
    guides: ["delivery-velocity-is-a-systems-problem", "integration-tax"],
    signals: ["delivery-velocity-is-a-systems-problem", "integration-tax", "sequencing-roadmaps-under-uncertainty"],
    proof: "You can get clear quickly without a big proposal.",
    testimonialId: "mendez-pearlx",
    finalHeading: "Want a clearer read on what is slowing shipping right now?",
    finalBody: "Start with a quick assessment, then go deeper only if needed.",
  },
  "productize-systemize": {
    id: "productize-systemize",
    label: "Productize & Systemize",
    who: "Teams moving from ad hoc execution to repeatable product and system workflows.",
    summary: "Stabilize internals so you can scale without constant fire drills.",
    feelsLike: "The product works, but internals are getting fragile as complexity grows.",
    commonBreaks: [
      "Critical interfaces and tooling boundaries are under-specified.",
      "Cross-team ownership is unclear when workflows collide.",
    ],
    goodLooksLike:
      "System boundaries are explicit, ownership is clear, and delivery remains stable as complexity rises.",
    amalgamHelp:
      "We help you map structural fragility and sequence fixes before complexity gets more expensive.",
    nextStep: "Map where structure is breaking before you add more process.",
    primaryAction: {
      label: "Start the tech stack audit",
      href: "/launchpad/tech-stack-audit",
      source: "tech_stack_audit",
      description: "Get a first-pass read on risk, constraints, and hidden drag.",
    },
    secondaryLabel: STRATEGY_CALL_LABEL,
    pressures: [
      { id: "systems-fragile", label: "Systems feel fragile", note: "Stabilize critical boundaries before adding complexity." },
      { id: "ops-misaligned", label: "Ops misaligned", note: "Clarify ownership around cross-team workflows." },
      { id: "unclear-next-fix", label: "Unsure what to fix first", note: "Use one map of current state first." },
    ],
    guides: ["modernize-vs-rebuild", "structure-follows-architecture"],
    signals: ["modernize-vs-rebuild", "architecture-map-before-roadmap", "structure-follows-architecture"],
    proof: "Productization is usually a system-definition problem before a speed problem.",
    testimonialId: "fitzmier-jtf",
    finalHeading: "Ready to turn ad hoc shipping into repeatable systems?",
    finalBody: "Start with the stack audit, then decide whether sprint or deeper support fits best.",
  },
  "scale-stabilize": {
    id: "scale-stabilize",
    label: "Scale & Stabilize",
    who: "Scaling teams carrying more complexity than their current systems can absorb.",
    summary: "Regain control as complexity rises and execution gets less predictable.",
    feelsLike: "Growth is real, but follow-through and confidence are starting to slip.",
    commonBreaks: [
      "Complexity grows faster than decision and delivery systems.",
      "Leaders lack one shared map of risk, sequencing, and ownership.",
    ],
    goodLooksLike:
      "Leadership can prioritize with confidence, teams execute with fewer collisions, and outcomes stay steadier under growth.",
    amalgamHelp:
      "We help scale-up teams simplify execution complexity into a practical path they can sustain.",
    nextStep: "If growth feels heavier each month, clarify what to fix first.",
    primaryAction: {
      label: "Start the scale readiness check",
      href: "/launchpad/ai-readiness-checklist",
      source: "scale_readiness_path",
      description: "Get a practical read on readiness and what to fix first.",
    },
    secondaryLabel: STRATEGY_CALL_LABEL,
    pressures: [
      { id: "growth-drag", label: "Growth creating drag", note: "Treat this as systems + sequencing, not effort alone." },
      { id: "confidence-slipping", label: "Confidence slipping", note: "Align around one shared view of the system." },
      { id: "need-follow-through", label: "Follow-through support", note: "Continuity support may matter more than new plans." },
    ],
    guides: ["delivery-velocity-is-a-systems-problem", "sequencing-roadmaps-under-uncertainty"],
    signals: ["metrics-you-can-run-the-company-on", "delivery-velocity-is-a-systems-problem", "decision-rights-under-complexity"],
    proof: "Momentum returns when complexity is made clear.",
    testimonialId: "mendez-pearlx",
    finalHeading: "Want a steadier way to run shipping as you scale?",
    finalBody: "Start with readiness. Book a strategy call if you want direct support.",
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
      input.pressure ? `Situation: ${input.pressure}` : "Situation: none selected",
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
  const [showFullMap, setShowFullMap] = useState(false)
  const [showOverviewMap, setShowOverviewMap] = useState(false)
  const [showMobileDock, setShowMobileDock] = useState(false)
  const [isMobileViewport, setIsMobileViewport] = useState(false)
  const [compactStageSelector, setCompactStageSelector] = useState(false)
  const [showMobilePressureFilters, setShowMobilePressureFilters] = useState(false)
  const [stageSelectorHighlighted, setStageSelectorHighlighted] = useState(false)
  const entryTracked = useRef(false)
  const scrollLockYRef = useRef<number | null>(null)
  const pendingScrollTargetRef = useRef<LaunchpadAnchorTarget | null>(null)
  const stageSelectorHighlightTimeoutRef = useRef<number | null>(null)

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
  const showToolIcon = !isOverview && Boolean(tool)

  const talkHref = useMemo(
    () =>
      contactHref({
        stageId: isOverview ? "all" : stage.id,
        stageLabel: isOverview ? "All stages overview" : stage.label,
        pressure: pressureId,
        ctaPath: "contextual",
        ctaLabel: stage.secondaryLabel,
        note: isOverview ? "Looking for guidance on where to start in the journey." : stage.nextStep,
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
        ctaLabel: STRATEGY_CALL_LABEL,
        note: isOverview ? "Looking for a quick read on the right next step." : stage.finalBody,
      }),
    [isOverview, pressureId, stage],
  )
  const nextActionLabel = isOverview
    ? "Find my stage"
    : stage.primaryAction.label
  const nextActionAnchorTarget = isOverview ? "launchpad-stage-selector" : null
  const nextActionHref = isOverview
    ? "#launchpad-stage-selector"
    : stage.primaryAction.href
  const nextActionSource = isOverview
    ? "overview_select_stage"
    : stage.primaryAction.source
  const nextActionDescription = isOverview
    ? "Use the journey map to pick the stage that matches your current situation. The page will tailor your next move instantly."
    : stage.primaryAction.description
  const nextActionNarrative = isOverview
    ? "Choose the stage that feels closest. Everything below updates in place."
    : stage.nextStep
  const confidenceNote = isOverview
    ? "Launchpad keeps the full A-to-Z map visible while tailoring the next move to one stage."
    : stage.proof
  const contextualSecondaryLabel = isOverview
    ? STRATEGY_CALL_LABEL
    : stage.secondaryLabel
  const finalHeading = isOverview
    ? "Not sure which stage fits best yet?"
    : stage.finalHeading
  const finalBody = isOverview
    ? "Pick your stage first. If you want a second opinion, we can help you choose the right next move."
    : stage.finalBody
  const stageNumber = STAGE_ORDER.indexOf(activeStageId) + 1
  const stageProgressPercent = isOverview
    ? 100
    : Math.round((stageNumber / STAGE_ORDER.length) * 100)
  const stageProgressLabel = isOverview
    ? "All five stages are visible. Pick one to get a tailored next move."
    : `Stage ${stageNumber} of ${STAGE_ORDER.length} in the founder journey.`
  const stagePressureSummary = isOverview
    ? "Pick a stage to reveal situation filters and contextual guidance."
    : pressure
      ? pressure.note
      : "Add an optional situation filter to tighten recommendations for this stage."
  const stageBreakSummary = isOverview
    ? "Most teams hit delivery friction when priorities, ownership, and system constraints are not aligned."
    : stage.commonBreaks.join(" ")
  const stageGoodLooksSummary = isOverview
    ? "Clear stage fit, one practical next move, and momentum without overload."
    : stage.goodLooksLike
  const compactMobileSelector = compactStageSelector && isMobileViewport
  const showPressureControls = !isMobileViewport || !compactStageSelector || showMobilePressureFilters
  const stageSelectorGroupClass = compactMobileSelector
    ? "mt-2 flex flex-wrap gap-2"
    : "mt-3 flex gap-3 overflow-x-auto pb-1 md:mt-5"
  const stageChipClass = compactMobileSelector
    ? "min-h-9 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    : "min-h-11 shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
  const pressureSelectorGroupClass = compactMobileSelector
    ? "mt-2 flex flex-wrap gap-2"
    : "mt-2 flex gap-2 overflow-x-auto pb-1"
  const pressureChipClass = compactMobileSelector
    ? "min-h-9 rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    : "min-h-10 shrink-0 rounded-full border px-3.5 py-2 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
  const quickActionCards: QuickActionCard[] = isOverview
    ? [
        {
          id: "pick-stage",
          label: "Find my stage",
          description: "Switch from overview to a focused stage in one click.",
          href: "#launchpad-stage-selector",
          source: "overview_pick_stage",
          anchorTarget: "launchpad-stage-selector",
        },
        {
          id: "diagnostic",
          label: "Start diagnostic",
          description: "Get a practical read before deciding on deeper support.",
          href: "/launchpad/delivery-drag-diagnostic",
          source: "overview_diagnostic",
          anchorTarget: null,
        },
        {
          id: "call",
          label: STRATEGY_CALL_LABEL,
          description: "Get a direct read if the path still feels unclear.",
          href: finalTalkHref,
          source: "overview_book_call",
          anchorTarget: null,
        },
      ]
    : [
        {
          id: "primary",
          label: nextActionLabel,
          description: nextActionDescription,
          href: nextActionHref,
          source: nextActionSource,
          anchorTarget: nextActionAnchorTarget,
        },
        {
          id: "guide",
          label: guides[0] ? `Explore: ${guides[0].title}` : "Explore supporting guide",
          description: guides[0]
            ? guides[0].description
            : "Use a practical guide to validate your next move.",
          href: guides[0] ? `/knowledge/${guides[0].slug}` : "/launchpad/guides",
          source: "stage_supporting_guide",
          anchorTarget: null,
        },
        {
          id: "call",
          label: contextualSecondaryLabel,
          description: "Talk through this stage with a senior builder.",
          href: talkHref,
          source: "stage_talk_path",
          anchorTarget: null,
        },
      ]

  const lockViewportForStateSwap = () => {
    if (typeof window === "undefined") {
      return
    }
    scrollLockYRef.current = window.scrollY
  }

  const releaseViewportLock = () => {
    if (typeof window === "undefined" || scrollLockYRef.current === null) {
      return
    }

    const lockedY = scrollLockYRef.current
    scrollLockYRef.current = null
    const fixScroll = () => {
      window.scrollTo({
        top: lockedY,
        left: window.scrollX,
        behavior: "auto",
      })
    }

    window.requestAnimationFrame(() => {
      fixScroll()
      window.requestAnimationFrame(fixScroll)
    })
  }

  const getLaunchpadAnchorOffset = (targetId: LaunchpadAnchorTarget) => {
    const header = document.querySelector("header")
    const navHeight =
      header instanceof HTMLElement
        ? Math.round(header.getBoundingClientRect().height)
        : FIXED_NAV_FALLBACK_HEIGHT
    if (targetId === "launchpad-stage-selector") {
      return navHeight + ANCHOR_EXTRA_GAP
    }

    const stageSelector = document.getElementById("launchpad-stage-selector")
    if (!(stageSelector instanceof HTMLElement)) {
      return navHeight + ANCHOR_EXTRA_GAP
    }

    const stageSelectorHeight = Math.round(stageSelector.getBoundingClientRect().height)
    const stageSelectorStickyTop = Number.parseFloat(
      window.getComputedStyle(stageSelector).top || "80",
    )
    return stageSelectorStickyTop + stageSelectorHeight + ANCHOR_EXTRA_GAP
  }

  const alignLaunchpadTarget = (
    target: HTMLElement,
    targetId: LaunchpadAnchorTarget,
  ) => {
    const expectedTop = getLaunchpadAnchorOffset(targetId)
    const currentTop = target.getBoundingClientRect().top
    const delta = currentTop - expectedTop
    if (Math.abs(delta) <= 2) {
      return
    }
    window.scrollBy({ top: delta, behavior: "auto" })
  }

  const scrollToLaunchpadSection = (
    targetId: LaunchpadAnchorTarget,
    behaviorOverride?: ScrollBehavior,
  ) => {
    if (typeof window === "undefined") {
      return
    }

    const target = document.getElementById(targetId)
    if (!target) {
      return
    }

    const offset = getLaunchpadAnchorOffset(targetId)
    const targetTop =
      window.scrollY + target.getBoundingClientRect().top - offset
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const behavior = behaviorOverride ?? (prefersReducedMotion ? "auto" : "smooth")

    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior,
    })

    if (behavior === "smooth") {
      window.setTimeout(() => alignLaunchpadTarget(target, targetId), 420)
      window.setTimeout(() => alignLaunchpadTarget(target, targetId), 760)
      return
    }

    window.requestAnimationFrame(() => alignLaunchpadTarget(target, targetId))
  }

  const onAnchorClick = (
    event: ReactMouseEvent<HTMLAnchorElement>,
    targetId: LaunchpadAnchorTarget,
  ) => {
    event.preventDefault()
    const triggerStageSelectorHighlight = () => {
      setStageSelectorHighlighted(true)
      if (stageSelectorHighlightTimeoutRef.current !== null) {
        window.clearTimeout(stageSelectorHighlightTimeoutRef.current)
      }
      stageSelectorHighlightTimeoutRef.current = window.setTimeout(() => {
        setStageSelectorHighlighted(false)
        stageSelectorHighlightTimeoutRef.current = null
      }, STAGE_SELECTOR_HIGHLIGHT_MS)

      const preferredStageTabId =
        stageId === "all" ? "stage-tab-build-ship" : `stage-tab-${stageId}`
      const stageTab = document.getElementById(preferredStageTabId)
      if (stageTab instanceof HTMLElement) {
        stageTab.focus({ preventScroll: true })
      }
    }

    if (targetId === "launchpad-stage-selector") {
      const stageSelector = document.getElementById("launchpad-stage-selector")
      if (stageSelector instanceof HTMLElement) {
        const rect = stageSelector.getBoundingClientRect()
        const selectorAlreadyVisible = rect.top <= 140 && rect.bottom >= 84
        if (selectorAlreadyVisible) {
          triggerStageSelectorHighlight()
          return
        }
      }
      scrollToLaunchpadSection(targetId)
      window.setTimeout(() => triggerStageSelectorHighlight(), 440)
      return
    }

    scrollToLaunchpadSection(targetId)
  }

  const onQuickActionAnchorClick = (
    targetId: QuickActionCard["anchorTarget"],
  ) => {
    if (!targetId) {
      return undefined
    }
    return (event: ReactMouseEvent<HTMLAnchorElement>) =>
      onAnchorClick(event, targetId)
  }

  useEffect(() => {
    if (entryTracked.current) {
      return
    }
    entryTracked.current = true
    track("launchpad_entry_stage", { stage: initialStage, from_query: Boolean(initialStageParam) })
  }, [initialStage, initialStageParam])

  useEffect(() => {
    return () => {
      if (stageSelectorHighlightTimeoutRef.current !== null) {
        window.clearTimeout(stageSelectorHighlightTimeoutRef.current)
        stageSelectorHighlightTimeoutRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    const onPopState = () => {
      const params = new URLSearchParams(window.location.search)
      const urlStage = parseStage(params.get("stage"))
      const rawPressure = params.get("pressure") ?? ""
      const urlPressure =
        urlStage !== "all" &&
        STAGE_CONFIG[urlStage].pressures.some((item) => item.id === rawPressure)
          ? rawPressure
          : ""
      setStageId(urlStage)
      setPressureId(urlPressure)
    }
    window.addEventListener("popstate", onPopState)
    return () => window.removeEventListener("popstate", onPopState)
  }, [])

  useEffect(() => {
    const updateResponsiveUi = () => {
      const hero = document.getElementById("launchpad-hero")
      const finalCta = document.getElementById("launchpad-final-cta")
      const heroBottom = hero?.getBoundingClientRect().bottom ?? 0
      const finalTop = finalCta?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY
      const inMobileViewport = window.innerWidth < 768
      const beforeFinalCta = finalTop > window.innerHeight * 0.72
      setIsMobileViewport(inMobileViewport)
      setCompactStageSelector(
        inMobileViewport && window.scrollY > MOBILE_STAGE_SELECTOR_COMPACT_SCROLL_Y,
      )
      if (!inMobileViewport) {
        setShowMobilePressureFilters(false)
      }
      setShowMobileDock(inMobileViewport && heroBottom < 0 && beforeFinalCta)
    }
    updateResponsiveUi()
    window.addEventListener("scroll", updateResponsiveUi, { passive: true })
    window.addEventListener("resize", updateResponsiveUi)
    return () => {
      window.removeEventListener("scroll", updateResponsiveUi)
      window.removeEventListener("resize", updateResponsiveUi)
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

  const onStageSelect = (
    nextStage: StageSelection,
    options?: { preserveScroll?: boolean; scrollTarget?: LaunchpadAnchorTarget | null },
  ) => {
    const preserveScroll = options?.preserveScroll ?? true
    const scrollTarget = options?.scrollTarget ?? null
    const keepPressure =
      nextStage !== "all" && STAGE_CONFIG[nextStage].pressures.some((item) => item.id === pressureId)
        ? pressureId
        : ""
    if (nextStage === stageId && keepPressure === pressureId) {
      if (scrollTarget) {
        scrollToLaunchpadSection(scrollTarget)
      }
      return
    }
    if (preserveScroll) {
      lockViewportForStateSwap()
    } else {
      scrollLockYRef.current = null
    }
    setStageId(nextStage)
    setPressureId(keepPressure)
    setShowMobilePressureFilters(false)
    if (nextStage !== "all") {
      setShowOverviewMap(false)
    }
    pendingScrollTargetRef.current = scrollTarget
    syncUrl(nextStage, keepPressure)
    track("launchpad_stage_selected", { stage: nextStage, pressure: keepPressure || "none" })
  }

  const openStageFromJourney = (nextStage: StageId) => {
    onStageSelect(nextStage)
  }

  const onPressureSelect = (next: string) => {
    if (isOverview) {
      return
    }
    const nextPressure = next === pressureId ? "" : next
    if (nextPressure === pressureId) {
      return
    }
    lockViewportForStateSwap()
    setPressureId(nextPressure)
    syncUrl(stageId, nextPressure)
    track("launchpad_pressure_selected", { stage: stageId, pressure: nextPressure || "none" })
  }

  useEffect(() => {
    if (scrollLockYRef.current !== null) {
      releaseViewportLock()
    }

    if (!pendingScrollTargetRef.current || typeof window === "undefined") {
      return
    }
    const targetId = pendingScrollTargetRef.current
    pendingScrollTargetRef.current = null
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        scrollToLaunchpadSection(targetId)
      })
    })
    // scrollToLaunchpadSection is intentionally omitted to avoid re-triggering
    // this effect on every render due function identity changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stageId, pressureId])

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

  const onPressureSelectorKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (isOverview) {
      return
    }
    const key = event.key
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(key)) {
      return
    }
    event.preventDefault()
    const pressureOrder = stage.pressures.map((item) => item.id)
    const currentIndex = pressureOrder.indexOf(pressureId)
    const fallbackIndex = 0
    const selectedIndex = currentIndex >= 0 ? currentIndex : fallbackIndex
    if (key === "Home") {
      onPressureSelect(pressureOrder[0])
      return
    }
    if (key === "End") {
      onPressureSelect(pressureOrder[pressureOrder.length - 1])
      return
    }
    const direction = key === "ArrowRight" ? 1 : -1
    const nextIndex = (selectedIndex + direction + pressureOrder.length) % pressureOrder.length
    onPressureSelect(pressureOrder[nextIndex])
  }

  return (
    <>
      <section id="launchpad-hero" className="relative overflow-hidden border-b border-border py-20 lg:py-28">
        <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-teal/10 blur-3xl" />
        <div className="pointer-events-none absolute left-0 top-16 h-64 w-64 rounded-full bg-purple/8 blur-3xl" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-teal/12 to-transparent" />
        <div className="mx-auto grid max-w-[1200px] gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <div className="max-w-3xl">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-teal">
                Launchpad
              </p>
              <span className="inline-flex items-center gap-2 rounded-full border border-teal/25 bg-teal/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-teal">
                A-to-Z founder journey
              </span>
            </div>
            <h1 className="max-w-[20ch] text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              From idea to scale,{" "}
              <span className="bg-gradient-to-r from-teal to-purple bg-clip-text text-transparent">
                find the right next move.
              </span>
            </h1>
            <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-muted-foreground">
              Launchpad helps founders, entrepreneurs, and teams self-locate fast,
              see what usually breaks, and choose one practical next step in under
              a minute.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <TrackedLink
                href="#launchpad-stage-selector"
                eventName="launchpad_primary_cta_click"
                eventData={{ source: "hero", stage: stageId }}
                onClick={(event) => onAnchorClick(event, "launchpad-stage-selector")}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-teal px-6 py-3 font-medium text-background transition-opacity hover:opacity-90"
              >
                Find my stage
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
              <TrackedLink
                href={finalTalkHref}
                eventName="launchpad_secondary_cta_click"
                eventData={{ source: "hero", stage: stageId }}
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-border px-6 py-3 font-medium text-foreground transition-colors hover:bg-secondary"
              >
                {STRATEGY_CALL_LABEL}
              </TrackedLink>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Start self-serve if you want. Human support is always one click away.
            </p>
          </div>

          <aside className="support-panel rounded-[30px] border border-teal/20 p-8 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
              How Launchpad helps
            </p>
            <ol className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <li className="support-panel-item px-0 pb-0 pt-1">
                1. Identify your stage in the journey
              </li>
              <li className="support-panel-item px-0 pb-0 pt-3">
                2. See what usually breaks and what to do next
              </li>
              <li className="support-panel-item px-0 pb-0 pt-3">
                3. Choose self-serve guidance or senior help based on real context
              </li>
            </ol>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Clarity first. Services second.
            </p>
          </aside>
        </div>
      </section>

      <section className="deferred-section border-b border-border bg-secondary/20 py-12">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
            Full journey
          </p>
          <h2 className="mt-3 max-w-3xl text-2xl font-semibold text-foreground text-balance md:text-3xl">
            See the full path from ideation to scale, then open the stage that fits your reality.
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            The full map stays visible. When you pick a stage, everything below
            becomes specific to that stage.
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-5">
            {STAGE_ORDER.map((itemId, index) => {
              const selected = stageId === itemId
              const item = STAGE_CONFIG[itemId]
              return (
                <button
                  key={itemId}
                  type="button"
                  className={`rounded-2xl border px-4 py-4 text-left transition-colors ${
                    selected
                      ? `${STAGE_TONE[itemId].badge} shadow-sm`
                      : "border-border bg-background hover:border-teal/35"
                  }`}
                  onClick={() => {
                    track("launchpad_journey_strip_stage_click", {
                      stage: itemId,
                      from_stage: stageId,
                    })
                    onStageSelect(itemId, {
                      preserveScroll: false,
                      scrollTarget: "launchpad-stage-selector",
                    })
                  }}
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-teal">
                    Stage {index + 1}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-foreground">
                    {item.label}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {item.summary}
                  </p>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <div
        id="launchpad-stage-selector"
        className={`sticky top-[68px] z-40 scroll-mt-24 border-b border-border bg-background/95 backdrop-blur transition-all duration-200 md:top-20 md:scroll-mt-28 md:py-5 ${
          compactMobileSelector
            ? "py-1.5 shadow-sm"
            : compactStageSelector
              ? "py-2 shadow-sm"
              : "py-4"
        }`}
      >
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <h2 className={`font-semibold text-foreground ${compactMobileSelector ? "text-lg" : "text-xl md:text-2xl"}`}>
            {compactStageSelector && isMobileViewport
              ? "Pick stage"
              : "Pick your stage"}
          </h2>
          <p
            className={`mt-2 text-sm leading-relaxed text-muted-foreground ${
              compactStageSelector && isMobileViewport ? "hidden" : ""
            }`}
          >
            Choose what feels closest right now. We&apos;ll tailor everything below
            to your stage and situation.
          </p>
          <div
            role="radiogroup"
            aria-label="Founder journey stages"
            aria-describedby="launchpad-stage-selector-help"
            onKeyDown={onStageSelectorKeyDown}
            className={`${stageSelectorGroupClass} transition-all duration-300 ${
              stageSelectorHighlighted
                ? "rounded-2xl ring-2 ring-teal/55 ring-offset-2 ring-offset-background"
                : ""
            }`}
          >
            <button
              id="stage-tab-all"
              role="radio"
              type="button"
              aria-checked={isOverview}
              className={`${stageChipClass} ${
                isOverview
                  ? "border-teal/45 bg-gradient-to-r from-teal to-teal/80 text-background"
                  : "border-border bg-background text-foreground hover:bg-secondary"
              }`}
              tabIndex={isOverview ? 0 : -1}
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
                  className={`${stageChipClass} ${
                    selected
                      ? STAGE_TONE[itemId].chip
                      : "border-border bg-background text-foreground hover:bg-secondary"
                  }`}
                  tabIndex={selected ? 0 : -1}
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
          <p className="sr-only" aria-live="polite" aria-atomic="true">
            {isOverview
              ? "Viewing all stages overview."
              : `Viewing ${stage.label}${pressure ? ` with situation ${pressure.label}.` : "."}`}
          </p>
          {!isOverview ? (
            <div className="mt-3 flex flex-wrap items-center gap-2 md:mt-4 md:gap-3">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Focused on {stage.label}
              </p>
              <TrackedLink
                href="#launchpad-next-step"
                eventName="launchpad_jump_to_recommendations_click"
                eventData={{ stage: stageId, pressure: pressureId || "none" }}
                onClick={(event) => onAnchorClick(event, "launchpad-next-step")}
                className="inline-flex min-h-9 items-center rounded-full border border-border px-3.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
              >
                See my next move
              </TrackedLink>
              <button
                type="button"
                className="hidden min-h-9 items-center rounded-full border border-border px-3.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-secondary md:inline-flex"
                onClick={() => {
                  track("launchpad_back_to_all_stages_click", { stage: stageId, pressure: pressureId || "none" })
                  onStageSelect("all")
                }}
              >
                Show all stages
              </button>
            </div>
          ) : null}
          {isOverview ? (
            <p
              className={`mt-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground ${
                compactStageSelector && isMobileViewport ? "hidden" : ""
              }`}
            >
              Pick one stage to reveal optional situation filters.
            </p>
          ) : (
            <>
              <div className="mt-4 flex items-center justify-between gap-3">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  Refine by situation (optional)
                </p>
                <button
                  type="button"
                  className={`min-h-11 items-center rounded-full border border-border px-3 py-1 text-[11px] font-medium text-foreground transition-colors hover:bg-secondary md:hidden ${
                    compactStageSelector ? "inline-flex" : "hidden"
                  }`}
                  onClick={() => setShowMobilePressureFilters((current) => !current)}
                >
                  {showPressureControls ? "Hide filters" : "Show filters"}
                </button>
              </div>
              {showPressureControls ? (
                <>
                  <div
                    role="radiogroup"
                    aria-label="Refine by situation"
                    aria-describedby="launchpad-pressure-selector-help"
                    onKeyDown={onPressureSelectorKeyDown}
                    className={pressureSelectorGroupClass}
                  >
                    {stage.pressures.map((option) => {
                      const selected = pressureId === option.id
                      return (
                        <button
                          key={option.id}
                          type="button"
                          role="radio"
                          aria-checked={selected}
                           className={`${pressureChipClass} ${
                             selected
                               ? "border-teal/55 bg-teal/10 text-foreground"
                               : "border-border bg-background text-muted-foreground hover:text-foreground"
                          }`}
                          tabIndex={selected || (!pressureId && option.id === stage.pressures[0]?.id) ? 0 : -1}
                          onClick={() => onPressureSelect(option.id)}
                        >
                          {option.label}
                        </button>
                      )
                    })}
                  </div>
                  <p id="launchpad-pressure-selector-help" className="sr-only">
                    Situation filters are optional. Use left and right arrow keys to move between options.
                  </p>
                  {pressureId ? (
                    <button
                      type="button"
                      className="mt-3 inline-flex min-h-9 items-center rounded-full border border-border px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                      onClick={() => {
                        onPressureSelect("")
                        track("launchpad_pressure_cleared", { stage: stageId })
                      }}
                    >
                      Clear situation filter
                    </button>
                  ) : null}
                </>
              ) : null}
            </>
          )}
        </div>
      </div>

      <section className="deferred-section border-b border-border bg-secondary/20 py-10">
        <div className="mx-auto grid max-w-[1200px] gap-6 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)] lg:items-start">
          <article className="support-panel rounded-[30px] p-7 md:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                Stage snapshot
              </p>
              <span className="inline-flex min-h-8 items-center rounded-full border border-border bg-background px-3 text-xs font-medium text-muted-foreground">
                {isOverview ? "Overview mode" : "Focused mode"}
              </span>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(220px,0.8fr)] md:items-start">
              <div>
                <h2 className="text-2xl font-semibold text-foreground text-balance">
                  {isOverview
                    ? "See the full journey, then focus where the situation is most urgent"
                    : `${stage.label}: your current context`}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {stageProgressLabel}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {stagePressureSummary}
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-background px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-teal">
                  Journey context
                </p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-teal via-teal/85 to-purple/80 transition-all duration-300"
                    style={{ width: `${stageProgressPercent}%` }}
                  />
                </div>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Showing {stageProgressPercent}% of the journey map
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl border border-border bg-background px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-teal">
                  Current stage
                </p>
                <p className="mt-2 text-sm font-semibold text-foreground">
                  {isOverview ? "All stages" : stage.label}
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-background px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-teal">
                  What usually breaks
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {stageBreakSummary}
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-background px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-teal">
                  What good looks like
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {stageGoodLooksSummary}
                </p>
              </div>
            </div>
          </article>

          <aside className="rounded-[30px] border border-border bg-background p-7">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
              Quick paths (optional)
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Pick one strong first move. You can always expand after.
            </p>
            <div className="mt-5 space-y-3">
              {quickActionCards.map((item) => (
                <TrackedLink
                  key={item.id}
                  href={item.href}
                  eventName="launchpad_fast_lane_click"
                  eventData={{
                    stage: stageId,
                    pressure: pressureId || "none",
                    source: item.source,
                  }}
                  onClick={onQuickActionAnchorClick(item.anchorTarget)}
                  className="block rounded-2xl border border-border bg-secondary/35 px-4 py-4 transition-colors hover:border-teal/35 hover:bg-background"
                >
                  <p className="text-sm font-semibold text-foreground">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </TrackedLink>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section
        id={`stage-panel-${isOverview ? "all" : stage.id}`}
        className="deferred-section py-16 lg:py-20"
        aria-live="polite"
        aria-atomic="true"
      >
        <div
          key={`${stageId}-${pressureId || "none"}`}
          className="mx-auto grid max-w-[1200px] gap-8 px-4 sm:px-6 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-200 lg:grid-cols-[minmax(0,1fr)_330px]"
        >
          {isOverview ? (
            <>
              <div className="support-panel rounded-[30px] p-8">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                  Expanded stage map
                </p>
                <h2 className="mt-4 text-3xl font-semibold text-foreground">
                  Need a deeper look before choosing your stage?
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Use this expanded map to compare all five stages in more detail,
                  then open the one that fits best.
                </p>
                <button
                  type="button"
                  className="mt-6 inline-flex min-h-11 items-center rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                  onClick={() =>
                    setShowOverviewMap((current) => {
                      const next = !current
                      track("launchpad_overview_map_toggle", { open: next })
                      return next
                    })
                  }
                >
                  {showOverviewMap ? "Hide full journey" : "Show full journey"}
                </button>
                {showOverviewMap ? (
                  <div className="mt-8 space-y-4">
                    {STAGE_ORDER.map((itemId, index) => {
                      const item = STAGE_CONFIG[itemId]
                      const accentClass =
                        index % 5 === 0
                          ? "from-teal/15 via-teal/5 to-transparent"
                          : index % 5 === 1
                            ? "from-teal/10 via-purple/8 to-transparent"
                          : index % 5 === 2
                              ? "from-purple/14 via-teal/4 to-transparent"
                          : index % 5 === 3
                                ? "from-purple/10 via-teal/8 to-transparent"
                                : "from-teal/8 via-purple/12 to-transparent"
                      return (
                        <article
                          key={item.id}
                          className={`relative overflow-hidden rounded-[24px] border border-border bg-gradient-to-br ${accentClass} p-5 md:p-6`}
                        >
                          <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-teal/70 to-purple/70" />
                          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
                            <div className="pl-2">
                              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-teal">
                                Stage {index + 1}
                              </p>
                              <h3 className="mt-2 text-xl font-semibold text-foreground">
                                {item.label}
                              </h3>
                              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                {item.feelsLike}
                              </p>
                              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                                <p className="rounded-xl border border-border bg-background/70 px-3 py-2 text-xs font-medium text-muted-foreground">
                                  Who this fits: {item.who}
                                </p>
                                <p className="rounded-xl border border-border bg-background/70 px-3 py-2 text-xs font-medium text-foreground/80">
                                  Best first move: {item.primaryAction.label}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-col items-start gap-2 lg:items-end">
                              <button
                                type="button"
                                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
                                onClick={() => {
                                  track("launchpad_overview_stage_open_click", {
                                    stage: item.id,
                                    location: "journey_flow",
                                  })
                                  openStageFromJourney(item.id)
                                }}
                              >
                                Open {item.label}
                                <ArrowRight className="h-4 w-4" />
                              </button>
                              <p className="text-xs text-muted-foreground">
                                The rest of the page updates instantly.
                              </p>
                            </div>
                          </div>
                        </article>
                      )
                    })}
                  </div>
                ) : (
                  <div className="mt-6 grid gap-3 md:grid-cols-2">
                    {STAGE_ORDER.map((itemId, index) => {
                      const item = STAGE_CONFIG[itemId]
                      return (
                        <button
                          key={item.id}
                          type="button"
                          className="rounded-2xl border border-border bg-background px-4 py-4 text-left transition-colors hover:border-teal/35"
                          onClick={() => {
                            track("launchpad_overview_stage_open_click", {
                              stage: item.id,
                              location: "compact_map",
                            })
                            openStageFromJourney(item.id)
                          }}
                        >
                          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-teal">
                            Stage {index + 1}
                          </p>
                          <p className="mt-2 text-sm font-semibold text-foreground">{item.label}</p>
                          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.feelsLike}</p>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
              <aside className="rounded-[30px] border border-border bg-background p-7">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                  What updates when you choose a stage
                </p>
                <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  <p>Your recommended next step becomes stage-specific.</p>
                  <p>Guides, trust notes, and resources become more relevant.</p>
                  <p>Support recommendations and final CTA adapt to your context.</p>
                </div>
                <p className="mt-5 rounded-2xl border border-border bg-secondary/35 px-4 py-3 text-sm leading-relaxed text-foreground">
                  Start broad if you need to. Narrow when you are ready.
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
                  <div className="rounded-2xl border border-border bg-background px-4 py-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-teal">
                      What usually breaks
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                      {stage.commonBreaks.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-border bg-background px-4 py-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-teal">
                      What good looks like
                    </p>
                    <p className="mt-3 text-sm text-muted-foreground">
                      {stage.goodLooksLike}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border bg-background px-4 py-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-teal">
                      How Amalgam helps
                    </p>
                    <p className="mt-3 text-sm text-muted-foreground">
                      {stage.amalgamHelp}
                    </p>
                  </div>
                </div>
              </div>
              <aside className="rounded-[30px] border border-border bg-background p-7">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                  What to do next
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {stage.nextStep}
                </p>
                <p className="mt-4 rounded-2xl border border-border bg-secondary/35 px-4 py-3 text-sm leading-relaxed text-foreground">
                  {pressure
                    ? pressure.note
                    : "Add a situation filter above if you want tighter guidance."}
                </p>
              </aside>
            </>
          )}
        </div>
      </section>

      <section id="launchpad-next-step" className="deferred-section scroll-mt-24 border-y border-border bg-secondary/35 py-20 md:scroll-mt-28 lg:py-24">
        <div
          key={`next-step-${stageId}-${pressureId || "none"}`}
          className="mx-auto max-w-[1200px] px-4 sm:px-6 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-200"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-teal">
            Best next move
          </p>
          <h2 className="mb-10 text-3xl font-semibold text-foreground text-balance">
            {isOverview ? "What should you do first?" : "What should you do next?"}
          </h2>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
            <article className="support-panel flex h-full flex-col rounded-[30px] p-8">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                Start here
              </p>
              <h3 className="mt-4 text-2xl font-semibold text-foreground">
                {nextActionLabel}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {nextActionDescription}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-foreground/80">
                {nextActionNarrative}
              </p>
              {isOverview ? (
                <TrackedLink
                  href="/launchpad/delivery-drag-diagnostic"
                  eventName="launchpad_overview_fallback_diagnostic_click"
                  eventData={{ stage: stageId, source: "next_step_module" }}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-teal transition-colors hover:text-foreground"
                >
                  Not sure yet? Start diagnostic
                  <ArrowRight className="h-4 w-4" />
                </TrackedLink>
              ) : null}
              <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row">
                <TrackedLink
                  href={nextActionHref}
                  eventName="launchpad_primary_action_click"
                  eventData={{
                    stage: stageId,
                    pressure: pressureId || "none",
                    source: nextActionSource,
                  }}
                  onClick={
                    nextActionAnchorTarget
                      ? (event) => onAnchorClick(event, nextActionAnchorTarget)
                      : undefined
                  }
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
                  {confidenceNote}
                </p>
              </div>
              {testimonial ? (
                <div className="rounded-[24px] border border-border bg-background px-6 py-5">
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                    Proof
                  </p>
                  <blockquote className="mt-3 text-sm leading-relaxed text-foreground">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <p className="mt-3 text-xs text-muted-foreground">
                    {testimonial.name}, {testimonial.title} at {testimonial.company}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="deferred-section border-b border-border py-16 lg:py-20">
        <div className="mx-auto grid max-w-[1200px] gap-6 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <article className="support-panel rounded-[30px] p-8">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
              Deeper support (optional)
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-foreground text-balance">
              {isOverview
                ? "If you want senior help after self-serve, this is the usual start"
                : `If ${stage.label.toLowerCase()} needs deeper support, this is the usual fit`}
            </h2>
            <div className="mt-6 rounded-2xl border border-teal/35 bg-background px-5 py-5">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-teal">
                Recommended path
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-foreground">
                {mainProgram.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {mainProgram.description}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-foreground/80">
                {mainProgram.whenItsRight}
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <TrackedLink
                  href={mainProgram.href}
                  eventName="launchpad_primary_program_recommendation_click"
                  eventData={{
                    stage: stageId,
                    pressure: pressureId || "none",
                    program: mainProgram.id,
                  }}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
                >
                  {mainProgram.ctaLabel}
                  <ArrowRight className="h-4 w-4" />
                </TrackedLink>
                <TrackedLink
                  href={talkHref}
                  eventName="launchpad_primary_program_call_click"
                  eventData={{
                    stage: stageId,
                    pressure: pressureId || "none",
                  }}
                  className="inline-flex min-h-11 items-center justify-center rounded-lg border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  {STRATEGY_CALL_LABEL}
                </TrackedLink>
              </div>
            </div>
          </article>
          <aside className="rounded-[30px] border border-border bg-background p-7">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
              Why teams trust this path
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {confidenceNote}
            </p>
            {testimonial ? (
              <>
                <blockquote className="mt-5 rounded-2xl border border-border bg-secondary/35 px-4 py-4 text-sm leading-relaxed text-foreground">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <p className="mt-4 text-xs text-muted-foreground">
                  {testimonial.name}, {testimonial.title} at {testimonial.company}
                </p>
              </>
            ) : null}
          </aside>
        </div>
      </section>

      <section className="deferred-section border-b border-border py-10">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-3 px-4 sm:px-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">
              Need the full support map?
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Open full details for all programs, trust notes, resources, and practical updates.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            onClick={() => {
              setShowFullMap((current) => {
                const next = !current
                track("launchpad_full_map_toggle", {
                  stage: stageId,
                  pressure: pressureId || "none",
                  open: next,
                })
                return next
              })
            }}
          >
            {showFullMap ? "Hide support details" : "Show support details"}
          </button>
        </div>
      </section>

      {showFullMap ? (
        <>
      <section className="deferred-section section-warm py-20 lg:py-24">
        <div
          key={`program-fit-${stageId}-${pressureId || "none"}`}
          className="mx-auto max-w-[1200px] px-4 sm:px-6 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-200"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-teal">
            Program fit
          </p>
          <h2 className="mb-10 text-3xl font-semibold text-foreground text-balance">
            {isOverview
              ? "If you need deeper help after self-serve, start here"
              : "If this stage needs deeper help, this is the usual fit"}
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
        <div className="mx-auto grid max-w-[1200px] gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <div className="support-panel rounded-[30px] p-8">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-teal">
              Fit check
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-foreground text-balance">
              Not every next step has to start with us
            </h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
              If the best move sits outside our core work, we will tell you.
              The goal is the right next step, not a forced engagement.
            </p>
          </div>
          <aside className="rounded-[30px] border border-border bg-background p-7">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
              When this helps
            </p>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>Get a direct read on which path fits your situation.</p>
              <p>Get an adjacent intro once the picture is clearer.</p>
              <p>Get practical judgment before a bigger commitment.</p>
            </div>
            <TrackedLink
              href={contactHref({
                stageId: isOverview ? "all" : stage.id,
                stageLabel: isOverview ? "All stages overview" : stage.label,
                pressure: pressureId,
                ctaPath: "trust_block",
                ctaLabel: STRATEGY_CALL_LABEL,
                note: "Looking for practical direction on the right next move.",
                interest: "general",
              })}
              eventName="launchpad_trust_conversation_click"
              eventData={{ stage: stageId, pressure: pressureId || "none" }}
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-teal transition-colors hover:text-foreground"
            >
              {STRATEGY_CALL_LABEL}
              <ArrowRight className="h-4 w-4" />
            </TrackedLink>
          </aside>
        </div>
      </section>

      <section className="deferred-section border-y border-border py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
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
        <div
          key={`signals-${stageId}-${pressureId || "none"}`}
          className="mx-auto grid max-w-[1200px] gap-8 px-4 sm:px-6 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-200 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start"
        >
          <div className="support-panel rounded-[30px] p-8">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-teal">
              What to read next
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-foreground text-balance">
              {isOverview
                ? "Practical updates across the full journey"
                : `Practical updates for teams in ${stage.label.toLowerCase()}`}
            </h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
              Short notes on what to do next when complexity and delivery friction collide.
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
                    Note preview
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
                Updates
              </p>
            </div>
            <h3 className="mt-4 text-2xl font-semibold text-background">
              {isOverview ? "Get practical updates across all stages" : "Get practical updates for this stage"}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-background/72">
              {isOverview
                ? "Useful notes from idea to scale. No generic noise."
                : `Useful notes for ${stage.label.toLowerCase()} teams. No generic noise.`}
            </p>
            <SignalsSubscribeForm
              source={`launchpad_stage_${stageId}`}
              buttonLabel="Subscribe for practical updates"
              className="mt-6 space-y-4"
            />
            <TrackedLink
              href="/launchpad/signals"
              eventName="launchpad_signals_layer_click"
              eventData={{ stage: stageId }}
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-teal transition-colors hover:text-background"
            >
              Explore all practical updates
              <ArrowRight className="h-4 w-4" />
            </TrackedLink>
          </aside>
        </div>
      </section>

        </>
      ) : null}

      <section id="launchpad-final-cta" className="deferred-section bg-foreground py-20 lg:py-24">
        <div
          key={`final-cta-${stageId}-${pressureId || "none"}`}
          className="mx-auto max-w-[950px] px-4 sm:px-6 text-center motion-safe:animate-in motion-safe:fade-in motion-safe:duration-200"
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-teal">
            Your next step
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
              onClick={
                nextActionAnchorTarget
                  ? (event) => onAnchorClick(event, nextActionAnchorTarget)
                  : undefined
              }
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-background px-6 py-3 font-medium text-foreground transition-opacity hover:opacity-90"
            >
              {nextActionLabel}
              {showToolIcon ? <Wrench className="h-4 w-4" /> : <Compass className="h-4 w-4" />}
            </TrackedLink>
            <TrackedLink
              href={finalTalkHref}
              eventName="launchpad_final_secondary_click"
              eventData={{
                stage: stageId,
                pressure: pressureId || "none",
                source: "book_strategy_call",
              }}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-background/20 px-6 py-3 font-medium text-background transition-colors hover:bg-background/10"
            >
              {STRATEGY_CALL_LABEL}
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
              onClick={
                nextActionAnchorTarget
                  ? (event) => onAnchorClick(event, nextActionAnchorTarget)
                  : undefined
              }
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-foreground px-3 text-center text-xs font-semibold text-background"
            >
              {isOverview ? "Find my stage" : "See next step"}
            </TrackedLink>
            <TrackedLink
              href={finalTalkHref}
              eventName="launchpad_sticky_dock_secondary_click"
              eventData={{ stage: stageId, pressure: pressureId || "none", source: "book_strategy_call" }}
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-border px-3 text-center text-xs font-semibold text-foreground"
            >
              Book a strategy call
            </TrackedLink>
          </div>
        </div>
      </div>
    </>
  )
}

