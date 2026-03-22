"use client"

import type { ReactNode } from "react"
import Image from "next/image"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import type { LaunchpadDisclosureKey, LaunchpadStage, LaunchpadStageId } from "@/content/launchpad"

type ToolCtaLocation = "next_move"

type ActiveStageWorkspaceProps = {
  stage: LaunchpadStage
  stageConfirmation: string | null
  comparisonOpen: boolean
  previousStage: LaunchpadStage | null
  nextStage: LaunchpadStage | null
  openDisclosures: Record<LaunchpadDisclosureKey, boolean>
  onToggleDisclosure: (key: LaunchpadDisclosureKey) => void
  onToggleComparison: () => void
  onOpenAdjacentStage: (stageId: LaunchpadStageId) => void
  primaryToolHref: string
  supportPathHref: string
  onPrimaryToolStart: (location: ToolCtaLocation) => void
  onSupportPathStart: () => void
  onProofOpen: (proofId: string) => void
}

type DisclosureBlockProps = {
  id: LaunchpadDisclosureKey
  label: string
  isOpen: boolean
  onToggle: (key: LaunchpadDisclosureKey) => void
  children: ReactNode
  className?: string
}

const proofThumbnailBySlug: Record<string, { src: string; alt: string }> = {
  confinity: {
    src: "/case-study-thumbnails/confinity.webp",
    alt: "Confinity case study thumbnail",
  },
  "john-templeton-foundation": {
    src: "/case-study-thumbnails/john-templeton-foundation.webp",
    alt: "John Templeton Foundation case study thumbnail",
  },
  pearlx: {
    src: "/case-study-thumbnails/pearlx.webp",
    alt: "PearlX case study thumbnail",
  },
  "premier-financial-alliance": {
    src: "/case-study-thumbnails/premier-financial-alliance.webp",
    alt: "Premier Financial Alliance case study thumbnail",
  },
  "mt-bank": {
    src: "/case-study-thumbnails/mt-bank.webp",
    alt: "M&T Bank case study thumbnail",
  },
}

function getProofSlug(href: string) {
  return href.split("/").filter(Boolean).pop() ?? ""
}

function getProofThumbnail(href: string) {
  return proofThumbnailBySlug[getProofSlug(href)] ?? null
}

function DisclosureBlock({ id, label, isOpen, onToggle, children, className }: DisclosureBlockProps) {
  return (
    <section
      className={cn(
        "rounded-xl border border-[color-mix(in_srgb,var(--color-border)_85%,transparent)] bg-[color-mix(in_srgb,var(--color-surface)_98%,transparent)] px-4 py-3 md:px-5 md:py-4",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => onToggle(id)}
        aria-expanded={isOpen}
        aria-controls={`ynm-disclosure-${id}`}
        className="flex min-h-11 w-full items-center justify-between gap-2 text-left"
      >
        <h3 className="text-[0.99rem] font-semibold text-[var(--color-text)]">{label}</h3>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-[var(--color-accent-strong)]" aria-hidden="true" />
        ) : (
          <ChevronDown className="h-4 w-4 text-[var(--color-accent-strong)]" aria-hidden="true" />
        )}
      </button>
      {isOpen ? (
        <div id={`ynm-disclosure-${id}`} className="mt-2.5">
          {children}
        </div>
      ) : null}
    </section>
  )
}

function StageHeader({ stage, stageConfirmation }: { stage: LaunchpadStage; stageConfirmation: string | null }) {
  const stageMeaning = stage.recognition.match(/^.*?[.!?](\s|$)/)?.[0]?.trim() ?? stage.recognition

  return (
    <header id="ynm-stage-header" className="space-y-3">
      {stageConfirmation ? (
        <p className="inline-flex min-h-11 items-center rounded-full border border-[color-mix(in_srgb,var(--color-accent-strong)_36%,var(--color-border)_64%)] bg-[var(--color-accent-soft)] px-4 py-2 text-xs font-semibold tracking-[0.04em] text-[var(--color-accent-strong)]">
          {stageConfirmation}
        </p>
      ) : null}
      <h2 className="text-[clamp(31px,4vw,46px)] leading-[1.06]">Stage {stage.number}: {stage.canonicalLabel}</h2>
      <p className="max-w-[70ch] text-[1.02rem] text-[var(--color-text)]">{stageMeaning}</p>
      <p className="max-w-[70ch] text-sm text-[var(--color-text-muted)]">What to do now: {stage.objective}</p>
    </header>
  )
}

function StartHereBlock({
  stage,
  primaryToolHref,
  onPrimaryToolStart,
}: {
  stage: LaunchpadStage
  primaryToolHref: string
  onPrimaryToolStart: (location: ToolCtaLocation) => void
}) {
  return (
    <section
      id="ynm-next-move-block"
      className="rounded-2xl border border-[color-mix(in_srgb,var(--color-accent-strong)_40%,var(--color-border)_60%)] bg-[linear-gradient(170deg,rgba(255,255,255,0.99),rgba(236,249,247,0.86))] px-5 py-5 md:px-6 md:py-6"
    >
      <h3 className="text-sm font-semibold text-[var(--color-accent-strong)]">Start here</h3>
      <h4 className="mt-2 text-[1.35rem] font-semibold leading-[1.2] text-[var(--color-text)]">{stage.nextMove.title}</h4>
      <p className="mt-2 text-sm text-[var(--color-text-muted)]">{stage.nextMove.summary}</p>

      <div className="mt-4 rounded-xl bg-[color-mix(in_srgb,var(--color-accent-soft)_60%,white_40%)] p-3.5">
        <p className="text-[11px] font-semibold tracking-[0.08em] text-[var(--color-text-subtle)]">
          Why this move works now
        </p>
        <p className="mt-1.5 text-sm text-[var(--color-text)]">{stage.priority}</p>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3">
          <p className="text-[11px] font-semibold tracking-[0.08em] text-[var(--color-text-subtle)]">Estimated time</p>
          <p className="mt-1.5 text-sm text-[var(--color-text)]">{stage.tool.estimatedTime}</p>
        </div>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3">
          <p className="text-[11px] font-semibold tracking-[0.08em] text-[var(--color-text-subtle)]">Best owner</p>
          <p className="mt-1.5 text-sm text-[var(--color-text)]">{stage.tool.ownerRole}</p>
        </div>
      </div>

      <Button
        href={primaryToolHref}
        id="ynm-next-move-primary-cta"
        withArrow
        className="mt-4"
        onClick={() => onPrimaryToolStart("next_move")}
      >
        {stage.tool.ctaLabel}
      </Button>
    </section>
  )
}

function StageComparisonDisclosure({
  isOpen,
  previousStage,
  nextStage,
  onToggleComparison,
  onOpenAdjacentStage,
}: {
  isOpen: boolean
  previousStage: LaunchpadStage | null
  nextStage: LaunchpadStage | null
  onToggleComparison: () => void
  onOpenAdjacentStage: (stageId: LaunchpadStageId) => void
}) {
  const hasComparison = Boolean(previousStage || nextStage)
  if (!hasComparison) return null

  return (
    <DisclosureBlock id="comparison" label="If this doesn't quite fit" isOpen={isOpen} onToggle={() => onToggleComparison()}>
      <div className="space-y-2.5">
        {previousStage ? (
          <div className="rounded-xl bg-[var(--color-surface-muted)] p-3">
            <p className="text-[11px] font-semibold tracking-[0.08em] text-[var(--color-text-subtle)]">Try one stage earlier</p>
            <p className="mt-1 text-sm font-semibold text-[var(--color-text)]">{previousStage.name}</p>
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">{previousStage.shortDescriptor}</p>
            <Button variant="secondary" className="mt-3" onClick={() => onOpenAdjacentStage(previousStage.id)}>
              Open {previousStage.name}
            </Button>
          </div>
        ) : null}

        {nextStage ? (
          <div className="rounded-xl bg-[var(--color-surface-muted)] p-3">
            <p className="text-[11px] font-semibold tracking-[0.08em] text-[var(--color-text-subtle)]">Try one stage later</p>
            <p className="mt-1 text-sm font-semibold text-[var(--color-text)]">{nextStage.name}</p>
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">{nextStage.shortDescriptor}</p>
            <Button variant="secondary" className="mt-3" onClick={() => onOpenAdjacentStage(nextStage.id)}>
              Open {nextStage.name}
            </Button>
          </div>
        ) : null}
      </div>
    </DisclosureBlock>
  )
}

function SupportPanel({
  stage,
  supportPathHref,
  onSupportPathStart,
}: {
  stage: LaunchpadStage
  supportPathHref: string
  onSupportPathStart: () => void
}) {
  return (
    <section className="rounded-2xl border border-[color-mix(in_srgb,var(--color-border)_84%,transparent)] bg-[var(--color-surface)] px-5 py-5 md:px-6 md:py-6">
      <h3 className="text-base font-semibold text-[var(--color-text)]">Need support?</h3>
      <p className="mt-2 text-sm text-[var(--color-text-muted)]">{stage.supportPath.description}</p>

      <div className="mt-4 space-y-3">
        <div className="rounded-xl bg-[var(--color-surface-muted)] p-3">
          <p className="text-[11px] font-semibold tracking-[0.08em] text-[var(--color-text-subtle)]">Self-serve is enough when</p>
          <p className="mt-1.5 text-sm text-[var(--color-text)]">{stage.selfServeEnough}</p>
        </div>
        <div className="rounded-xl bg-[var(--color-surface-muted)] p-3">
          <p className="text-[11px] font-semibold tracking-[0.08em] text-[var(--color-text-subtle)]">Bring us in when</p>
          <p className="mt-1.5 text-sm text-[var(--color-text)]">{stage.bringInCondition}</p>
        </div>
      </div>

      <Button variant="secondary" href={supportPathHref} onClick={onSupportPathStart} className="mt-4">
        {stage.supportPath.ctaLabel}
      </Button>
    </section>
  )
}

function RelatedProofPanel({ stage, onProofOpen }: { stage: LaunchpadStage; onProofOpen: (proofId: string) => void }) {
  const relatedProof = stage.proof.caseStudy ?? stage.proof.article ?? stage.proof.featuredSupport
  const proofId = stage.proof.caseStudy ? "case-study" : stage.proof.article ? "article" : "featured-support"
  const proofThumbnail = getProofThumbnail(relatedProof.href)
  const secondaryProof =
    proofId === "case-study"
      ? stage.proof.article ?? null
      : proofId === "article"
        ? stage.proof.caseStudy ?? null
        : null
  const secondaryProofId = secondaryProof
    ? secondaryProof.href === stage.proof.article?.href
      ? "article"
      : secondaryProof.href === stage.proof.caseStudy?.href
        ? "case-study"
        : null
    : null

  return (
    <section className="rounded-2xl border border-[color-mix(in_srgb,var(--color-border)_84%,transparent)] bg-[var(--color-surface)] px-5 py-5 md:px-6 md:py-6">
      <h3 className="text-base font-semibold text-[var(--color-text)]">Related proof</h3>
      <p className="mt-2 text-sm text-[var(--color-text-muted)]">If you want a quick example, start here.</p>

      <article className="mt-3 rounded-xl bg-[var(--color-surface-muted)] p-3.5">
        {proofThumbnail ? (
          <div className="relative mb-3 aspect-[16/9] overflow-hidden rounded-lg border border-[color-mix(in_srgb,var(--color-border)_82%,transparent)] bg-[var(--color-surface)]">
            <Image
              src={proofThumbnail.src}
              alt={proofThumbnail.alt}
              fill
              sizes="(max-width: 768px) 92vw, 740px"
              className="object-cover"
            />
          </div>
        ) : null}
        <p className="text-sm font-semibold text-[var(--color-text)]">{relatedProof.label}</p>
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">{relatedProof.description}</p>
        <Button
          href={relatedProof.href}
          variant="tertiary"
          withArrow
          className="mt-2 !justify-start !px-0 text-sm font-medium text-[var(--color-accent-strong)]"
          onClick={() => onProofOpen(proofId)}
        >
          Open proof
        </Button>
        {secondaryProof && secondaryProofId ? (
          <Button
            href={secondaryProof.href}
            variant="tertiary"
            className="mt-1 !justify-start !px-0 text-sm font-medium text-[var(--color-text-muted)]"
            onClick={() => onProofOpen(secondaryProofId)}
          >
            See another example
          </Button>
        ) : null}
      </article>
    </section>
  )
}

export function ActiveStageWorkspace({
  stage,
  stageConfirmation,
  comparisonOpen,
  previousStage,
  nextStage,
  openDisclosures,
  onToggleDisclosure,
  onToggleComparison,
  onOpenAdjacentStage,
  primaryToolHref,
  supportPathHref,
  onPrimaryToolStart,
  onSupportPathStart,
  onProofOpen,
}: ActiveStageWorkspaceProps) {
  return (
    <section id="ynm-workspace" className="section-space border-b border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="container-site mx-auto max-w-[920px]">
        <StageHeader stage={stage} stageConfirmation={stageConfirmation} />

        <div className="mt-6 space-y-4">
          <StartHereBlock
            stage={stage}
            primaryToolHref={primaryToolHref}
            onPrimaryToolStart={onPrimaryToolStart}
          />

          <DisclosureBlock
            id="breakpoints"
            label="Where teams usually get stuck"
            isOpen={openDisclosures.breakpoints}
            onToggle={onToggleDisclosure}
          >
            <ul className="space-y-2">
              {stage.breakpoints.map((item) => (
                <li key={item} className="text-sm text-[var(--color-text)]">
                  {item}
                </li>
              ))}
            </ul>
          </DisclosureBlock>

          <DisclosureBlock
            id="antiFocus"
            label="What not to do yet"
            isOpen={openDisclosures.antiFocus}
            onToggle={onToggleDisclosure}
          >
            <ul className="space-y-2">
              {stage.antiFocus.map((item) => (
                <li key={item} className="text-sm text-[var(--color-text)]">
                  {item}
                </li>
              ))}
            </ul>
          </DisclosureBlock>

          <StageComparisonDisclosure
            isOpen={comparisonOpen}
            previousStage={previousStage}
            nextStage={nextStage}
            onToggleComparison={onToggleComparison}
            onOpenAdjacentStage={onOpenAdjacentStage}
          />

          <SupportPanel stage={stage} supportPathHref={supportPathHref} onSupportPathStart={onSupportPathStart} />
          <RelatedProofPanel stage={stage} onProofOpen={onProofOpen} />
        </div>
      </div>
    </section>
  )
}
