"use client"

import { useMemo, useState, type ReactNode } from "react"
import { track } from "@vercel/analytics"
import { Copy, Download, Mail, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/Button"
import type { LaunchpadStageId } from "@/content/launchpad"

type ArtifactField = {
  id: string
  label: string
  placeholder: string
  helper?: string
}

type ArtifactSection = {
  id: string
  title: string
  fields: ArtifactField[]
}

type StageArtifactBuilderProps = {
  stageId: LaunchpadStageId
  stageName: string
  toolId?: string
  toolName: string
  outputName: string
  intro: string
  sections: ArtifactSection[]
}

function toAnalyticsId(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 80)
}

export function StageArtifactBuilder({
  stageId,
  stageName,
  toolId,
  toolName,
  outputName,
  intro,
  sections,
}: StageArtifactBuilderProps) {
  const initialValues = useMemo(
    () =>
      sections
        .flatMap((section) => section.fields)
        .reduce<Record<string, string>>((acc, field) => {
          acc[field.id] = ""
          return acc
        }, {}),
    [sections],
  )

  const [values, setValues] = useState<Record<string, string>>(initialValues)
  const [generated, setGenerated] = useState(false)
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle")

  const requiredFieldCount = Object.keys(values).length
  const completedFieldCount = Object.values(values).filter((value) => value.trim().length > 0).length
  const completionPercent = Math.round((completedFieldCount / Math.max(1, requiredFieldCount)) * 100)
  const canGenerate = completionPercent >= 50

  const artifactText = useMemo(() => {
    const lines: string[] = []
    lines.push(`${outputName} | ${stageName}`)
    lines.push("")
    sections.forEach((section) => {
      lines.push(section.title)
      section.fields.forEach((field) => {
        lines.push(`- ${field.label}: ${values[field.id] || "TBD"}`)
      })
      lines.push("")
    })
    lines.push("Generated from Amalgam Your Next Move.")
    return lines.join("\n")
  }, [outputName, sections, stageName, values])

  function onGenerate() {
    setGenerated(true)
    track("tool_completed", {
      stage_id: stageId,
      tool_id: toolId ?? toAnalyticsId(toolName),
      completion_rate: completionPercent,
      source: "stage_artifact_builder",
    })
  }

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(artifactText)
      setCopyStatus("copied")
      window.setTimeout(() => setCopyStatus("idle"), 2200)
    } catch {
      setCopyStatus("error")
      window.setTimeout(() => setCopyStatus("idle"), 2200)
    }
  }

  function onDownload() {
    const blob = new Blob([artifactText], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement("a")
    anchor.href = url
    anchor.download = `${stageId}-${toolName.replace(/\s+/g, "-").toLowerCase()}.txt`
    anchor.click()
    URL.revokeObjectURL(url)
  }

  function onEmail() {
    const subject = encodeURIComponent(`${outputName} (${stageName})`)
    const body = encodeURIComponent(artifactText)
    window.open(`mailto:?subject=${subject}&body=${body}`, "_self")
  }

  function onReset() {
    setValues(initialValues)
    setGenerated(false)
    setCopyStatus("idle")
  }

  return (
    <section className="section-space border-b border-[var(--color-border)] bg-[var(--color-surface-muted)]">
      <div className="container-site grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <CardFrame title={toolName} intro={intro} completionPercent={completionPercent}>
          {sections.map((section) => (
            <fieldset key={section.id} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <legend className="px-1 text-sm font-semibold text-[var(--color-text)]">{section.title}</legend>
              <div className="mt-2 space-y-4">
                {section.fields.map((field) => (
                  <label key={field.id} className="block">
                    <span className="text-sm font-medium text-[var(--color-text)]">{field.label}</span>
                    {field.helper ? <span className="mt-1 block text-xs text-[var(--color-text-subtle)]">{field.helper}</span> : null}
                    <textarea
                      value={values[field.id]}
                      onChange={(event) =>
                        setValues((current) => ({
                          ...current,
                          [field.id]: event.target.value,
                        }))
                      }
                      rows={2}
                      className="contact-field mt-2 w-full rounded-xl border px-3 py-2 text-sm text-[var(--color-text)]"
                      placeholder={field.placeholder}
                    />
                  </label>
                ))}
              </div>
            </fieldset>
          ))}

          <div className="mt-5 flex flex-wrap gap-3">
            <Button onClick={onGenerate} withArrow disabled={!canGenerate}>
              Generate artifact
            </Button>
            <Button variant="secondary" onClick={onReset}>
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </CardFrame>

        <aside className="panel-surface h-fit p-5 md:p-6">
          <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-accent-strong)]">{outputName}</p>
          <p className="mt-3 text-sm text-[var(--color-text-muted)]">
            Fill key fields, generate the artifact, then copy, export, or share.
          </p>
          {generated ? (
            <>
              <pre className="mt-4 max-h-[420px] overflow-auto whitespace-pre-wrap rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3 text-sm text-[var(--color-text)]">
                {artifactText}
              </pre>
              <div className="mt-4 grid gap-2">
                <Button variant="secondary" onClick={onCopy}>
                  <Copy className="h-4 w-4" />
                  {copyStatus === "copied" ? "Copied" : copyStatus === "error" ? "Copy failed" : "Copy"}
                </Button>
                <Button variant="secondary" onClick={onDownload}>
                  <Download className="h-4 w-4" />
                  Export .txt
                </Button>
                <Button variant="secondary" onClick={onEmail}>
                  <Mail className="h-4 w-4" />
                  Share by email
                </Button>
              </div>
            </>
          ) : (
            <p className="mt-4 text-sm text-[var(--color-text-subtle)]">
              Generated artifact preview appears here.
            </p>
          )}
        </aside>
      </div>
    </section>
  )
}

function CardFrame({
  title,
  intro,
  completionPercent,
  children,
}: {
  title: string
  intro: string
  completionPercent: number
  children: ReactNode
}) {
  return (
    <div className="card-primary p-5 md:p-6">
      <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-accent-strong)]">{title}</p>
      <p className="mt-3 text-sm text-[var(--color-text-muted)]">{intro}</p>
      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-[var(--color-surface-muted)]">
        <div className="h-full rounded-full bg-[var(--color-accent-strong)] transition-all" style={{ width: `${completionPercent}%` }} />
      </div>
      <p className="mt-2 text-xs text-[var(--color-text-subtle)]">{completionPercent}% complete</p>
      <div className="mt-5 space-y-4">{children}</div>
    </div>
  )
}
