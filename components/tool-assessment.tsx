"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { track } from "@vercel/analytics"
import { ArrowLeft, ArrowRight, CheckCircle2, Mail, RotateCcw } from "lucide-react"
import { getKnowledgeBriefBySlug } from "@/lib/knowledge-briefs"
import { evaluateLaunchpadTool, getLaunchpadTool, type LaunchpadToolId } from "@/lib/launchpad"

type ToolAssessmentProps = {
  toolId: LaunchpadToolId
}

export function ToolAssessment({ toolId }: ToolAssessmentProps) {
  const tool = getLaunchpadTool(toolId)
  const [started, setStarted] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [email, setEmail] = useState("")
  const completionTracked = useRef(false)

  const result = useMemo(() => evaluateLaunchpadTool(toolId, answers), [answers, toolId])

  useEffect(() => {
    if (!completed || !result || completionTracked.current) {
      return
    }

    completionTracked.current = true
    track("launchpad_tool_complete", {
      tool: toolId,
      resultCategory: result.category.id,
    })
  }, [completed, result, toolId])

  if (!tool) {
    return null
  }

  const currentQuestion = tool.questions[stepIndex]
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : ""
  const progressValue = started
    ? Math.round(((completed ? tool.questions.length : stepIndex) / tool.questions.length) * 100)
    : 0
  const relatedGuides = result
    ? result.category.relatedGuideSlugs
        .map((slug) => getKnowledgeBriefBySlug(slug))
        .filter((guide): guide is NonNullable<ReturnType<typeof getKnowledgeBriefBySlug>> => Boolean(guide))
        .slice(0, 3)
    : []

  function handleStart() {
    setStarted(true)
    track("launchpad_tool_start", { tool: toolId })
  }

  function handleNext() {
    if (!currentQuestion || !currentAnswer) {
      return
    }

    if (stepIndex === tool.questions.length - 1) {
      setCompleted(true)
      return
    }

    setStepIndex((current) => current + 1)
  }

  function handleRestart() {
    setStarted(false)
    setCompleted(false)
    setStepIndex(0)
    setAnswers({})
    setEmail("")
    completionTracked.current = false
  }

  function handleEmailSummary() {
    if (!result || !email.trim()) {
      return
    }

    const recipient = email.trim()
    const subject = encodeURIComponent(`${tool.title} summary`)
    const body = encodeURIComponent(
      [
        `${tool.title}`,
        "",
        `Result: ${result.category.title}`,
        "",
        result.category.summary,
        "",
        `Why it matters: ${result.category.whyItMatters}`,
        "",
        `Recommended next step: ${result.category.nextStep.label} (${result.category.nextStep.href})`,
        "",
        "Generated from Amalgam Launchpad.",
      ].join("\n"),
    )

    track("launchpad_tool_email_summary", {
      tool: toolId,
      resultCategory: result.category.id,
    })

    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`
  }

  return (
    <div className="space-y-8">
      <div className="rounded-[30px] border border-border bg-background p-7 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
              {tool.kicker}
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-foreground text-balance">
              {tool.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {tool.description}
            </p>
          </div>
          <div className="support-panel min-w-[240px] rounded-[24px] p-5">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
              Assessment details
            </p>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-muted-foreground">Best for</dt>
                <dd className="mt-1 text-foreground">{tool.audience}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Estimated time</dt>
                <dd className="mt-1 text-foreground">{tool.estimatedTime}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Output</dt>
                <dd className="mt-1 text-foreground">{tool.outputLabel}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {!started ? (
        <div className="rounded-[30px] border border-border bg-secondary/30 p-7 md:p-8">
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {tool.questionIntro}
          </p>
          <button
            type="button"
            onClick={handleStart}
            className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Start diagnostic
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      ) : null}

      {started && !completed && currentQuestion ? (
        <div className="rounded-[30px] border border-border bg-background p-7 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                Step {stepIndex + 1} of {tool.questions.length}
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-foreground text-balance">
                {currentQuestion.prompt}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {currentQuestion.helper}
              </p>
            </div>
            <div className="w-full max-w-[220px]">
              <div
                className="h-2 w-full rounded-full bg-secondary"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progressValue}
                aria-label={`${tool.title} progress`}
              >
                <div
                  className="h-full rounded-full bg-teal transition-all"
                  style={{ width: `${progressValue}%` }}
                />
              </div>
            </div>
          </div>

          <fieldset className="mt-8">
            <legend className="sr-only">{currentQuestion.prompt}</legend>
            <div className="grid gap-4">
              {currentQuestion.options.map((option) => {
                const isSelected = currentAnswer === option.id

                return (
                  <label
                    key={option.id}
                    className={`block cursor-pointer rounded-[24px] border px-5 py-5 transition-colors ${
                      isSelected
                        ? "border-teal bg-teal/6"
                        : "border-border bg-background hover:border-teal/35"
                    }`}
                  >
                    <input
                      type="radio"
                      name={currentQuestion.id}
                      value={option.id}
                      checked={isSelected}
                      onChange={() =>
                        setAnswers((current) => ({
                          ...current,
                          [currentQuestion.id]: option.id,
                        }))
                      }
                      className="sr-only"
                    />
                    <div className="flex items-start gap-4">
                      <span
                        className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                          isSelected ? "border-teal bg-teal text-background" : "border-border"
                        }`}
                        aria-hidden="true"
                      >
                        {isSelected ? <CheckCircle2 className="h-4 w-4" /> : null}
                      </span>
                      <div>
                        <p className="font-medium text-foreground">{option.label}</p>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  </label>
                )
              })}
            </div>
          </fieldset>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={() => setStepIndex((current) => Math.max(0, current - 1))}
              disabled={stepIndex === 0}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={!currentAnswer}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {stepIndex === tool.questions.length - 1 ? "See result" : "Next"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : null}

      {completed && result ? (
        <div className="space-y-6">
          <div className="rounded-[30px] border border-border bg-background p-7 md:p-8">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
              {tool.outputLabel}
            </p>
            <h3 className="mt-3 text-3xl font-semibold text-foreground text-balance">
              {result.category.title}
            </h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              {result.category.summary}
            </p>
            <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
              <div className="support-panel rounded-[26px] p-6">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                  Why it matters
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {result.category.whyItMatters}
                </p>
                {result.runnerUp && result.runnerUpScore && result.runnerUpScore > 0 ? (
                  <>
                    <p className="mt-5 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                      Also showing up
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground">
                      {result.runnerUp.title}
                    </p>
                  </>
                ) : null}
              </div>

              <div className="rounded-[26px] border border-teal/35 bg-teal/6 p-6">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                  Recommended next move
                </p>
                <p className="mt-3 text-lg font-semibold text-foreground">
                  {result.category.nextStep.label}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {result.category.nextStep.note}
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <Link
                    href={result.category.nextStep.href}
                    onClick={() =>
                      track("launchpad_tool_cta", {
                        tool: toolId,
                        resultCategory: result.category.id,
                        href: result.category.nextStep.href,
                      })
                    }
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
                  >
                    {result.category.nextStep.label}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() =>
                      track("launchpad_tool_cta", {
                        tool: toolId,
                        resultCategory: result.category.id,
                        href: "/contact",
                      })
                    }
                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-background"
                  >
                    Start a conversation
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="rounded-[30px] border border-border bg-secondary/35 p-7 md:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                Related guides
              </p>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {relatedGuides.map((guide) => (
                  <Link
                    key={guide.slug}
                    href={`/knowledge/${guide.slug}`}
                    className="rounded-[24px] border border-border bg-background px-5 py-5 transition-colors hover:border-teal/35"
                  >
                    <p className="text-sm font-semibold text-foreground">{guide.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {guide.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-[30px] border border-border bg-background p-7">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                Email this summary
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Want a copy in your inbox? Use your work email and we will open a draft with the result summary.
              </p>
              <label className="mt-5 block">
                <span className="sr-only">Work email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@company.com"
                  className="contact-field min-h-11 w-full rounded-xl border px-4 py-3 text-sm text-foreground"
                />
              </label>
              <button
                type="button"
                onClick={handleEmailSummary}
                disabled={!email.trim()}
                className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
              >
                Email me this summary
                <Mail className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleRestart}
                className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-secondary px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary/80"
              >
                Run it again
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
