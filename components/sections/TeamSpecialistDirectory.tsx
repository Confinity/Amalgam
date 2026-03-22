"use client"

import { useMemo, useState } from "react"
import { track } from "@vercel/analytics"
import { TeamMemberCard } from "@/components/cards/TeamMemberCard"
import type { TeamProfile } from "@/content/team"

type TeamSpecialistDirectoryProps = {
  members: TeamProfile[]
}

const ALL_DISCIPLINES = "all"
const ARCHITECTURE_AND_ENGINEERING = "architecture-engineering"
const EXECUTION_AND_TEAM_EFFECTIVENESS = "execution-team-effectiveness"

const disciplineConfig = [
  { id: ALL_DISCIPLINES, label: "All specialists" },
  { id: ARCHITECTURE_AND_ENGINEERING, label: "Engineering" },
  { id: EXECUTION_AND_TEAM_EFFECTIVENESS, label: "Delivery" },
] as const

function getDiscipline(member: TeamProfile) {
  const profileText = `${member.role} ${member.helpsWith} ${member.expertise.join(" ")}`.toLowerCase()
  if (/(delivery|agile|qa|project|program|people|hr|talent|operations)/.test(profileText)) {
    return EXECUTION_AND_TEAM_EFFECTIVENESS
  }
  return ARCHITECTURE_AND_ENGINEERING
}

function getDisciplineLabel(disciplineId: string) {
  return disciplineConfig.find((discipline) => discipline.id === disciplineId)?.label ?? "Specialists"
}

export function TeamSpecialistDirectory({ members }: TeamSpecialistDirectoryProps) {
  const [activeDiscipline, setActiveDiscipline] = useState(ALL_DISCIPLINES)

  const disciplines = useMemo(() => {
    const presentDisciplines = new Set(members.map((member) => getDiscipline(member)))
    return disciplineConfig.filter(
      (discipline) => discipline.id === ALL_DISCIPLINES || presentDisciplines.has(discipline.id),
    )
  }, [members])

  const filteredMembers = useMemo(() => {
    if (activeDiscipline === ALL_DISCIPLINES) {
      return members
    }
    return members.filter((member) => getDiscipline(member) === activeDiscipline)
  }, [activeDiscipline, members])

  const groupedMembers = useMemo(() => {
    if (activeDiscipline === ALL_DISCIPLINES) {
      return disciplines
        .filter((discipline) => discipline.id !== ALL_DISCIPLINES)
        .map((discipline) => ({
          discipline: discipline.id,
          label: discipline.label,
          members: members.filter((member) => getDiscipline(member) === discipline.id),
        }))
        .filter((group) => group.members.length > 0)
    }

    return [
      {
        discipline: activeDiscipline,
        label: getDisciplineLabel(activeDiscipline),
        members: filteredMembers,
      },
    ]
  }, [activeDiscipline, disciplines, filteredMembers, members])

  return (
    <div>
      <div className="mb-6 hidden flex-wrap gap-2.5 md:flex">
        {disciplines.map((discipline) => {
          const active = discipline.id === activeDiscipline

          return (
            <button
              key={discipline.id}
              type="button"
              aria-pressed={active}
              onClick={() => {
                setActiveDiscipline(discipline.id)
                track("team_discipline_filter_selected", {
                  filter: discipline.id,
                  location: "team_specialists",
                })
              }}
              className={
                active
                  ? "inline-flex min-h-11 items-center rounded-full border border-[var(--color-accent-strong)] bg-[var(--color-accent-soft)] px-4 py-2 text-sm font-medium text-[var(--color-accent-strong)]"
                  : "inline-flex min-h-11 items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm font-medium text-[var(--color-text)] hover:border-[var(--color-border-strong)]"
              }
            >
              {discipline.label}
            </button>
          )
        })}
      </div>

      <div className="space-y-8">
        {groupedMembers.map((group) => (
          <section key={group.discipline}>
            <h3 className="text-base font-semibold text-[var(--color-text)]">{group.label}</h3>
            <div
              className={
                group.members.length >= 3
                  ? "mt-4 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
                  : "mt-4 grid max-w-[760px] gap-5 md:grid-cols-2"
              }
            >
              {group.members.map((member) => (
                <TeamMemberCard key={member.id} member={member} size="compact" expertiseLimit={1} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
