import { careerCultureSignals, careerRoles } from "@/lib/careers-data"

export type CareerRoleView = {
  id: string
  title: string
  team: string
  location: string
  workMode: string
  type: string
  whyRoleExists: string
  responsibilities: string[]
  success30: string
  success90: string
}

const successMap: Record<string, { success30: string; success90: string }> = {
  "sales-marketing-intern": {
    success30: "Understands our offer flow, messaging, and active pipeline process.",
    success90: "Runs core sales operations support and improves at least one content workflow.",
  },
  "java-full-stack-developer": {
    success30: "Contributes to one production workflow with clean code and clear communication.",
    success90: "Owns a scoped feature path from technical design through shipped implementation.",
  },
  "ux-ui-designer": {
    success30: "Improves one active client surface with stronger hierarchy and decision clarity.",
    success90: "Owns a reusable design pattern set used in live delivery work.",
  },
}

export const roles: CareerRoleView[] = careerRoles.map((role) => ({
  id: role.id,
  title: role.title,
  team: role.team,
  location: role.location,
  workMode: role.location.toLowerCase().includes("remote") ? "Remote" : "Hybrid",
  type: role.employmentType,
  whyRoleExists: role.summary,
  responsibilities: role.responsibilities,
  success30: successMap[role.id]?.success30 ?? "Ramp quickly and contribute to active work.",
  success90:
    successMap[role.id]?.success90 ??
    "Own a defined scope with clear outcomes and strong collaboration.",
}))

export const cultureSignals = careerCultureSignals.map((signal) => ({
  title: signal.title,
  detail: signal.description,
}))
