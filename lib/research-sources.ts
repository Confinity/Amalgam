import {
  siAnthropic,
  siDeepmind,
  siGoogle,
  siMeta,
  siNvidia,
  siOwasp,
} from "simple-icons"
import { researchSourcesTracked } from "@/content/knowledge"

export type ResearchSourceName = (typeof researchSourcesTracked)[number]

export const sourceIconPathByName: Partial<Record<ResearchSourceName, string>> = {
  "Google Research": siGoogle.path,
  OWASP: siOwasp.path,
  NVIDIA: siNvidia.path,
}

export const sourceLogoAssetByName: Partial<Record<ResearchSourceName, string>> = {
  Anthropic: "/research-sources/anthropic.svg",
  OpenAI: "/research-sources/openai.svg",
  "Google DeepMind": "/research-sources/deepmind.png",
  "Meta AI": "/research-sources/meta-ai.png",
  "Microsoft Research": "/research-sources/microsoft-research.png",
  "Stanford HAI": "/research-sources/stanford-wordmark.png",
  "MIT CSAIL": "/research-sources/mit.svg",
  "Massachusetts Institute of Technology": "/research-sources/mit.svg",
  "University of Oxford": "/research-sources/oxford.svg",
  "University of Cambridge": "/research-sources/cambridge.png",
  "Harvard University": "/research-sources/harvard.svg",
  "Princeton University": "/research-sources/princeton.png",
  "ETH Zurich": "/research-sources/eth.svg",
  "Carnegie Mellon University": "/research-sources/cmu.svg",
  "UC Berkeley AI Research": "/research-sources/berkeley.svg",
  NIST: "/research-sources/nist.svg",
  CISA: "/research-sources/cisa-seal.svg",
  "MITRE ATLAS": "/research-sources/mitre.svg",
}

export const sourceLogoTreatmentByName: Partial<
  Record<ResearchSourceName, "wordmark" | "icon">
> = {
  CISA: "icon",
  "UC Berkeley AI Research": "icon",
}

const sourceBrandColorByName: Partial<Record<ResearchSourceName, string>> = {
  Anthropic: `#${siAnthropic.hex}`,
  OpenAI: "#111827",
  "Google DeepMind": `#${siDeepmind.hex}`,
  "Google Research": `#${siGoogle.hex}`,
  "Meta AI": `#${siMeta.hex}`,
  "Microsoft Research": "#5E5E5E",
  "Stanford HAI": "#8C1515",
  NIST: "#005EA2",
  OWASP: `#${siOwasp.hex}`,
  CISA: "#205493",
  "MITRE ATLAS": "#0E5A8A",
  NVIDIA: `#${siNvidia.hex}`,
  "MIT CSAIL": "#A31F34",
  "Massachusetts Institute of Technology": "#A31F34",
  "University of Oxford": "#002147",
  "University of Cambridge": "#1E6A7A",
  "Harvard University": "#A51C30",
  "Princeton University": "#E77500",
  "ETH Zurich": "#111111",
  "Carnegie Mellon University": "#C41230",
  "UC Berkeley AI Research": "#003262",
}

export function sourceBrandColor(source: ResearchSourceName) {
  return sourceBrandColorByName[source] ?? "#6B7280"
}

export function withAlpha(hex: string, alpha: number) {
  const clean = hex.replace("#", "")
  if (clean.length !== 6) {
    return hex
  }
  const value = Number.parseInt(clean, 16)
  const r = (value >> 16) & 255
  const g = (value >> 8) & 255
  const b = value & 255
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export function sourceMonogram(name: string) {
  const clean = name
    .replace("University of ", "")
    .replace("Google ", "")
    .replace("MITRE ", "")
    .replace("ATLAS", "Atlas")
    .trim()
  const parts = clean.split(/\s+/).filter(Boolean)
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase()
  }
  return parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
}
