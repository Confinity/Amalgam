import { DecisionLog } from "@/components/artifacts/DecisionLog"
import { ExecutionBrief } from "@/components/artifacts/ExecutionBrief"
import { OperatingLoop } from "@/components/artifacts/OperatingLoop"
import { RiskMap } from "@/components/artifacts/RiskMap"
import { RoadmapSlice } from "@/components/artifacts/RoadmapSlice"
import { SystemMap } from "@/components/artifacts/SystemMap"

export type ArtifactType =
  | "execution-brief"
  | "system-map"
  | "operating-loop"
  | "decision-log"
  | "roadmap-slice"
  | "risk-map"

type ArtifactPreviewProps = {
  type: ArtifactType
}

export function ArtifactPreview({ type }: ArtifactPreviewProps) {
  if (type === "execution-brief") {
    return <ExecutionBrief />
  }

  if (type === "system-map") {
    return <SystemMap />
  }

  if (type === "operating-loop") {
    return <OperatingLoop />
  }

  if (type === "decision-log") {
    return <DecisionLog />
  }

  if (type === "roadmap-slice") {
    return <RoadmapSlice />
  }

  return <RiskMap />
}
