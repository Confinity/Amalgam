"use client"

import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"

type NodeKey =
  | "api"
  | "identity"
  | "core"
  | "data"
  | "infra"
  | "observability"

type TooltipPlacement =
  | "top-center"
  | "top-start"
  | "top-end"
  | "bottom-start"
  | "bottom-end"
  | "left-center"
  | "right-center"

type NodeConfig = {
  key: NodeKey
  label: string
  title: string
  mobileTitle?: string
  tooltip: string
  x: number
  y: number
  width: number
  height: number
  preferredPlacement: TooltipPlacement
  isCore?: boolean
}

type TooltipState = {
  nodeKey: NodeKey
  placement: TooltipPlacement
  style: {
    left: number
    top: number
  }
}

const nodes: NodeConfig[] = [
  {
    key: "api",
    label: "API",
    title: "Gateway",
    tooltip: "API orchestration often hides latency and integration drag.",
    x: 32,
    y: 23,
    width: 104,
    height: 58,
    preferredPlacement: "bottom-start",
  },
  {
    key: "identity",
    label: "Auth",
    title: "Identity",
    tooltip: "Auth complexity creates unexpected product friction.",
    x: 68,
    y: 23,
    width: 104,
    height: 58,
    preferredPlacement: "bottom-end",
  },
  {
    key: "core",
    label: "Core",
    title: "Platform",
    tooltip: "Strong platform ownership supports consistent shipping.",
    x: 50,
    y: 42,
    width: 112,
    height: 62,
    preferredPlacement: "top-center",
    isCore: true,
  },
  {
    key: "data",
    label: "Data",
    title: "Pipeline",
    tooltip: "Data pipeline instability frequently blocks iteration.",
    x: 35,
    y: 58,
    width: 108,
    height: 60,
    preferredPlacement: "top-start",
  },
  {
    key: "infra",
    label: "Infra",
    title: "Deploy",
    tooltip: "Deployment friction slows shipping pace.",
    x: 65,
    y: 58,
    width: 108,
    height: 60,
    preferredPlacement: "top-end",
  },
  {
    key: "observability",
    label: "Monitoring",
    title: "Observability",
    mobileTitle: "Observe",
    tooltip: "Weak visibility makes the system harder to read clearly.",
    x: 50,
    y: 73,
    width: 132,
    height: 54,
    preferredPlacement: "top-center",
  },
]

const nodeMap = Object.fromEntries(nodes.map((node) => [node.key, node])) as Record<
  NodeKey,
  NodeConfig
>

const corePairs: Array<[NodeKey, NodeKey]> = [
  ["core", "api"],
  ["core", "identity"],
  ["core", "data"],
  ["core", "infra"],
  ["core", "observability"],
]

const supportingPairs: Array<[NodeKey, NodeKey]> = [
  ["data", "observability"],
  ["infra", "observability"],
]

const linePairs = [...corePairs, ...supportingPairs]
const orderedBranches: NodeKey[] = ["api", "identity", "data", "infra", "observability"]
const cycleDuration = 7000
const tooltipWidth = 176
const tooltipHeight = 68
const tooltipGap = 14
const fallbackMap: Record<TooltipPlacement, TooltipPlacement[]> = {
  "bottom-start": ["top-start", "right-center", "left-center", "bottom-end"],
  "bottom-end": ["top-end", "left-center", "right-center", "bottom-start"],
  "top-start": ["bottom-start", "right-center", "left-center", "top-center"],
  "top-end": ["bottom-end", "left-center", "right-center", "top-center"],
  "top-center": ["bottom-end", "right-center", "left-center", "top-start"],
  "left-center": ["right-center", "top-end", "bottom-end", "top-center"],
  "right-center": ["left-center", "top-start", "bottom-start", "top-center"],
}

function buildTooltipRect(rect: DOMRect, placement: TooltipPlacement) {
  switch (placement) {
    case "top-center":
      return {
        left: rect.left + rect.width / 2 - tooltipWidth / 2,
        top: rect.top - tooltipHeight - tooltipGap,
      }
    case "top-start":
      return {
        left: rect.left,
        top: rect.top - tooltipHeight - tooltipGap,
      }
    case "top-end":
      return {
        left: rect.right - tooltipWidth,
        top: rect.top - tooltipHeight - tooltipGap,
      }
    case "bottom-start":
      return {
        left: rect.left,
        top: rect.bottom + tooltipGap,
      }
    case "bottom-end":
      return {
        left: rect.right - tooltipWidth,
        top: rect.bottom + tooltipGap,
      }
    case "left-center":
      return {
        left: rect.left - tooltipWidth - tooltipGap,
        top: rect.top + rect.height / 2 - tooltipHeight / 2,
      }
    case "right-center":
      return {
        left: rect.right + tooltipGap,
        top: rect.top + rect.height / 2 - tooltipHeight / 2,
      }
  }
}

function intersects(
  a: { left: number; top: number; right: number; bottom: number },
  b: { left: number; top: number; right: number; bottom: number }
) {
  return !(
    a.right <= b.left ||
    a.left >= b.right ||
    a.bottom <= b.top ||
    a.top >= b.bottom
  )
}

function distanceFromBounds(
  rect: { left: number; top: number; right: number; bottom: number },
  bounds: { left: number; top: number; right: number; bottom: number }
) {
  return {
    left: rect.left - bounds.left,
    right: bounds.right - rect.right,
    top: rect.top - bounds.top,
    bottom: bounds.bottom - rect.bottom,
  }
}

function getTransformForPlacement(placement: TooltipPlacement) {
  if (placement.startsWith("top")) {
    return "translateY(4px)"
  }
  if (placement.startsWith("bottom")) {
    return "translateY(-4px)"
  }
  if (placement.startsWith("left")) {
    return "translateX(4px)"
  }
  return "translateX(-4px)"
}

export function HeroDiagnosticPanel() {
  const panelRef = useRef<HTMLDivElement>(null)
  const insetRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<Record<NodeKey, HTMLButtonElement | null>>({
    api: null,
    identity: null,
    core: null,
    data: null,
    infra: null,
    observability: null,
  })

  const [isTouch, setIsTouch] = useState(false)
  const [isSmallMobile, setIsSmallMobile] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(true)
  const [cycleMs, setCycleMs] = useState(cycleDuration - 1)
  const [activeNode, setActiveNode] = useState<NodeKey | null>(null)
  const [tooltipState, setTooltipState] = useState<TooltipState | null>(null)

  useEffect(() => {
    const pointerQuery = window.matchMedia("(hover: none), (pointer: coarse)")
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const smallMobileQuery = window.matchMedia("(max-width: 639px)")

    const sync = () => {
      setIsTouch(pointerQuery.matches)
      setReduceMotion(motionQuery.matches)
      setIsSmallMobile(smallMobileQuery.matches)
      if (smallMobileQuery.matches) {
        setActiveNode(null)
        setTooltipState(null)
      }
    }

    const id = window.requestAnimationFrame(sync)
    pointerQuery.addEventListener("change", sync)
    motionQuery.addEventListener("change", sync)
    smallMobileQuery.addEventListener("change", sync)

    return () => {
      window.cancelAnimationFrame(id)
      pointerQuery.removeEventListener("change", sync)
      motionQuery.removeEventListener("change", sync)
      smallMobileQuery.removeEventListener("change", sync)
    }
  }, [])

  useEffect(() => {
    if (reduceMotion) {
      const frameId = window.requestAnimationFrame(() => {
        setCycleMs(cycleDuration - 1)
      })
      return () => window.cancelAnimationFrame(frameId)
    }

    const start = performance.now()
    const intervalId = window.setInterval(() => {
      setCycleMs((performance.now() - start) % cycleDuration)
    }, 120)

    return () => window.clearInterval(intervalId)
  }, [reduceMotion])

  const phase = useMemo(() => {
    if (reduceMotion) {
      return "rest" as const
    }
    if (cycleMs < 1700) {
      return "pulse" as const
    }
    if (cycleMs < 3200) {
      return "highlight" as const
    }
    if (cycleMs < 5000) {
      return "stabilize" as const
    }
    if (cycleMs < 6100) {
      return "activate" as const
    }
    return "rest" as const
  }, [cycleMs, reduceMotion])

  const ambientBranch = useMemo(() => {
    if (reduceMotion) {
      return "observability" as NodeKey
    }

    const index = Math.floor((cycleMs / cycleDuration) * orderedBranches.length)
    return orderedBranches[index % orderedBranches.length]
  }, [cycleMs, reduceMotion])

  const highlightBranch = phase === "highlight" ? ambientBranch : null
  const stabilizeBranch = phase === "stabilize" || phase === "activate" ? ambientBranch : null
  const showInteractiveTooltips = !(isTouch && isSmallMobile)

  const displayNodes = useMemo(
    () =>
      isSmallMobile
        ? nodes.map((node) => {
            switch (node.key) {
              case "api":
                return { ...node, x: 30, y: 19, width: 76, height: 44 }
              case "identity":
                return { ...node, x: 70, y: 19, width: 76, height: 44 }
              case "core":
                return { ...node, x: 50, y: 34, width: 92, height: 50 }
              case "data":
                return { ...node, x: 30, y: 50, width: 82, height: 48 }
              case "infra":
                return { ...node, x: 70, y: 50, width: 82, height: 48 }
              case "observability":
                return { ...node, x: 50, y: 64, width: 110, height: 44 }
            }
          })
        : nodes,
    [isSmallMobile]
  )

  const displayNodeMap = useMemo(
    () =>
      Object.fromEntries(displayNodes.map((node) => [node.key, node])) as Record<
        NodeKey,
        NodeConfig
      >,
    [displayNodes]
  )

  const diagramFieldStyle = isSmallMobile
    ? { left: 18, right: 18, top: 16, bottom: 176 }
    : undefined

  const insetStyle = isSmallMobile
    ? { left: "18px", bottom: "18px" }
    : { left: "30px", bottom: "28px" }

  useEffect(() => {
    if (!isTouch || !activeNode || !showInteractiveTooltips) {
      return
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!panelRef.current?.contains(event.target as Node)) {
        setActiveNode(null)
        setTooltipState(null)
      }
    }

    window.addEventListener("pointerdown", handlePointerDown)
    return () => window.removeEventListener("pointerdown", handlePointerDown)
  }, [activeNode, isTouch, showInteractiveTooltips])

  function computeTooltip(nodeKey: NodeKey) {
    const panel = panelRef.current
    const nodeElement = nodeRefs.current[nodeKey]
    const insetElement = insetRef.current
    const coreElement = nodeRefs.current.core

    if (!panel || !nodeElement) {
      return null
    }

    const panelRect = panel.getBoundingClientRect()
    const nodeRect = nodeElement.getBoundingClientRect()
    const insetRect = insetElement?.getBoundingClientRect()
    const coreRect = coreElement?.getBoundingClientRect()
    const bounds = {
      left: 12,
      top: 12,
      right: panelRect.width - 12,
      bottom: panelRect.height - 12,
    }

    const blockedRects = [
      insetRect
        ? {
            left: insetRect.left - panelRect.left,
            top: insetRect.top - panelRect.top,
            right: insetRect.right - panelRect.left,
            bottom: insetRect.bottom - panelRect.top,
          }
        : null,
      coreRect && nodeKey !== "core"
        ? {
            left: coreRect.left - panelRect.left,
            top: coreRect.top - panelRect.top,
            right: coreRect.right - panelRect.left,
            bottom: coreRect.bottom - panelRect.top,
          }
        : null,
    ].filter(Boolean) as Array<{ left: number; top: number; right: number; bottom: number }>

    const placements = [
      nodeMap[nodeKey].preferredPlacement,
      ...fallbackMap[nodeMap[nodeKey].preferredPlacement],
    ]

    let bestCandidate:
      | {
          placement: TooltipPlacement
          rect: { left: number; top: number; right: number; bottom: number }
          score: number
        }
      | null = null

    for (const [index, placement] of placements.entries()) {
      const position = buildTooltipRect(nodeRect, placement)
      const rect = {
        left: position.left - panelRect.left,
        top: position.top - panelRect.top,
        right: position.left - panelRect.left + tooltipWidth,
        bottom: position.top - panelRect.top + tooltipHeight,
      }

      const distance = distanceFromBounds(rect, bounds)
      const overflowPenalty =
        Math.max(0, -distance.left) +
        Math.max(0, -distance.top) +
        Math.max(0, -distance.right) +
        Math.max(0, -distance.bottom)

      const overlapPenalty = blockedRects.reduce(
        (total, blocked) => total + (intersects(rect, blocked) ? 500 : 0),
        0
      )

      const preferredPenalty = index * 14
      const score = overflowPenalty + overlapPenalty + preferredPenalty

      if (!bestCandidate || score < bestCandidate.score) {
        bestCandidate = { placement, rect, score }
      }
    }

    if (!bestCandidate) {
      return null
    }

    return {
      nodeKey,
      placement: bestCandidate.placement,
      style: {
        left: Math.min(
          bounds.right - tooltipWidth,
          Math.max(bounds.left, bestCandidate.rect.left)
        ),
        top: Math.min(
          bounds.bottom - tooltipHeight,
          Math.max(bounds.top, bestCandidate.rect.top)
        ),
      },
    } satisfies TooltipState
  }

  function openTooltip(nodeKey: NodeKey) {
    if (!showInteractiveTooltips) {
      return
    }

    setActiveNode(nodeKey)
    setTooltipState(computeTooltip(nodeKey))
  }

  function closeTooltip(nodeKey?: NodeKey) {
    setActiveNode((current) => (nodeKey && current !== nodeKey ? current : null))
    setTooltipState((current) => (nodeKey && current?.nodeKey !== nodeKey ? current : null))
  }

  function getLineState(pair: [NodeKey, NodeKey]) {
    if (activeNode && pair.includes(activeNode)) {
      return {
        color: pair.includes("observability") ? "#6A5CFF" : "#00BFA6",
        opacity: 0.78,
        width: 0.46,
      }
    }

    if (phase === "pulse" && pair.includes("core") && pair.includes(ambientBranch)) {
      return {
        color: ambientBranch === "observability" ? "#6A5CFF" : "#00BFA6",
        opacity: 0.58,
        width: 0.44,
      }
    }

    if (phase === "highlight" && pair.includes("core") && pair.includes(highlightBranch ?? "core")) {
      return {
        color: highlightBranch === "observability" ? "#6A5CFF" : "#00BFA6",
        opacity: 0.64,
        width: 0.46,
      }
    }

    if (
      (phase === "stabilize" || phase === "activate") &&
      pair.includes("core") &&
      pair.includes(stabilizeBranch ?? "core")
    ) {
      return {
        color: stabilizeBranch === "observability" ? "#6A5CFF" : "#00BFA6",
        opacity: 0.7,
        width: 0.48,
      }
    }

    if (phase === "rest" && pair.includes("core")) {
      return {
        color: "#0F172A",
        opacity: 0.42,
        width: 0.42,
      }
    }

    return {
      color: pair.includes("observability") ? "#6A5CFF" : "#0F172A",
      opacity: pair.includes("core") ? 0.28 : 0.16,
      width: pair.includes("core") ? 0.4 : 0.3,
    }
  }

  return (
    <div
      ref={panelRef}
      className="hero-right-panel relative isolate h-[420px] overflow-hidden rounded-[28px] border border-black/4 bg-[linear-gradient(180deg,rgba(240,244,248,0.82),rgba(248,250,252,0.94))] p-4 shadow-[0_16px_34px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.42)] sm:h-[430px] sm:p-6 lg:h-[500px] lg:p-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,191,166,0.08),transparent_34%),radial-gradient(circle_at_top_right,rgba(106,92,255,0.08),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-[18px] rounded-[24px] bg-[linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] bg-[size:34px_34px] opacity-55 sm:inset-[20px] lg:inset-6" />

      <div
        className="system-lines pointer-events-none absolute inset-x-6 top-5 bottom-24 z-[1] sm:bottom-30 lg:bottom-36"
        style={diagramFieldStyle}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          {linePairs.map((pair) => {
            const [fromKey, toKey] = pair
            const lineState = getLineState(pair)

            return (
              <line
                key={`${fromKey}-${toKey}`}
                x1={displayNodeMap[fromKey].x}
                y1={displayNodeMap[fromKey].y}
                x2={displayNodeMap[toKey].x}
                y2={displayNodeMap[toKey].y}
                stroke={lineState.color}
                strokeWidth={lineState.width}
                strokeLinecap="round"
                opacity={lineState.opacity}
                className="transition-all duration-500 ease-out"
              />
            )
          })}
        </svg>
      </div>

      <div
        className="system-nodes absolute inset-x-6 top-5 bottom-24 z-[2] sm:bottom-30 lg:bottom-36"
        style={diagramFieldStyle}
      >
        {displayNodes.map((node) => {
          const isActive = activeNode === node.key
          const ambientHighlight =
            phase === "highlight" && highlightBranch === node.key
              ? true
              : (phase === "stabilize" || phase === "activate") && node.key === "core"
                ? true
                : false

          return (
            <div
              key={node.key}
              className="absolute"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                width: `${node.width}px`,
                height: `${node.height}px`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <button
                ref={(element) => {
                  nodeRefs.current[node.key] = element
                }}
                type="button"
                aria-label={`${node.label} ${node.title}. ${node.tooltip}`}
                onMouseEnter={() => (!isTouch ? openTooltip(node.key) : null)}
                onMouseLeave={() => (!isTouch ? closeTooltip(node.key) : null)}
                onFocus={() => openTooltip(node.key)}
                onBlur={() => closeTooltip(node.key)}
                onClick={() =>
                  activeNode === node.key ? closeTooltip(node.key) : openTooltip(node.key)
                }
                className={`flex h-full w-full items-center justify-center rounded-[10px] border bg-background/75 px-3 text-center backdrop-blur-md transition-all duration-200 ease-out focus-visible:outline-none ${
                  node.isCore
                    ? "border-teal/28 shadow-[0_0_0_1px_rgba(0,191,166,0.08)]"
                    : "border-black/5"
                } ${
                  isActive
                    ? "-translate-y-[2px] border-black/10 shadow-[0_10px_20px_rgba(15,23,42,0.08)]"
                    : ambientHighlight
                      ? "border-black/8 shadow-[0_8px_18px_rgba(15,23,42,0.05)]"
                      : node.isCore
                        ? "shadow-[0_6px_16px_rgba(0,191,166,0.07)]"
                        : ""
                }`}
              >
                <div className="min-w-0">
                  <div className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                    {node.label}
                  </div>
                  <div className="mt-1 text-[12px] font-semibold text-foreground sm:text-[13px]">
                    <span className="hidden sm:inline">{node.title}</span>
                    <span className="sm:hidden">{node.mobileTitle ?? node.title}</span>
                  </div>
                </div>
              </button>
            </div>
          )
        })}
      </div>

      <div
        ref={insetRef}
        className={`founder-review-inset absolute z-[3] w-[calc(100%-36px)] rounded-[18px] border bg-background/85 px-[18px] py-[16px] shadow-[0_8px_20px_rgba(15,23,42,0.06)] backdrop-blur-xl transition-colors duration-500 sm:w-[270px] sm:py-[18px] lg:w-[290px] ${
          phase === "activate"
            ? "border-teal/28"
            : "border-teal/18"
        }`}
        style={insetStyle}
      >
        <div className="flex items-center gap-2 text-[11px] font-medium text-foreground/55">
          <span className="status-dot inline-block h-1.5 w-1.5 rounded-full bg-emerald-500/80" />
          System clarity available
        </div>
        <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
          Start here
        </p>
        <h2 className="mt-2 text-[17px] font-semibold text-foreground">
          60-minute strategy call
        </h2>
        <p className="mt-1 text-[13px] text-muted-foreground">
          Clear read on what is slowing progress
        </p>
        <Link
          href="/contact?interest=strategy-session"
          className="mt-4 inline-flex items-center gap-2 text-[13px] font-medium text-teal transition-colors hover:text-foreground"
        >
          Book a strategy call
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="tooltip-layer pointer-events-none absolute inset-0 z-10">
        {showInteractiveTooltips && tooltipState ? (
          <div
            data-open="true"
            className="system-tooltip absolute max-w-[180px] min-w-[140px] rounded-[10px] bg-[rgba(15,23,42,0.96)] px-[10px] py-2 text-[12px] leading-[1.4] text-white shadow-[0_12px_24px_rgba(0,0,0,0.18)]"
            style={{
              left: tooltipState.style.left,
              top: tooltipState.style.top,
              ["--tooltip-enter-transform" as string]: getTransformForPlacement(
                tooltipState.placement
              ),
            }}
          >
            {nodeMap[tooltipState.nodeKey].tooltip}
          </div>
        ) : null}
      </div>
    </div>
  )
}
