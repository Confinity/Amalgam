import {
  teamMembers,
  unifiedTeamPortraitBackgroundClass,
  unifiedTeamPortraitClasses,
  unifiedTeamPortraits,
} from "@/lib/team-members"

export type TeamProfile = {
  id: string
  name: string
  role: string
  group: "Leadership" | "Specialists"
  helpsWith: string
  expertise: string[]
  bio: string
  image: string
  imageAlt: string
  imageClassName?: string
  imageFrameClassName?: string
}

function toGroup(name: string) {
  return name === "leadership" ? "Leadership" : "Specialists"
}

export const teamProfiles: TeamProfile[] = teamMembers.map((member) => {
  const unifiedPortrait = unifiedTeamPortraits[member.name]

  return {
    id: member.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    name: member.fullName ?? member.name,
    role: member.role,
    group: toGroup(member.group),
    helpsWith: member.specialties.slice(0, 2).join(" and "),
    expertise: member.specialties.slice(0, 3),
    bio: member.shortBio,
    image: unifiedPortrait ?? member.image,
    imageAlt: member.imageAlt,
    imageClassName: unifiedPortrait
      ? unifiedTeamPortraitClasses[member.name]
      : member.imageClassName,
    imageFrameClassName: unifiedPortrait
      ? unifiedTeamPortraitBackgroundClass
      : member.imageFrameClassName,
  }
})

export const leadershipTeam = teamProfiles.filter((member) => member.group === "Leadership")
export const specialistTeam = teamProfiles.filter((member) => member.group === "Specialists")

export const teamCapabilityAreas = [
  "Too many priorities, not enough focus",
  "Architecture decisions are slowing delivery",
  "Work is moving, but momentum keeps slipping",
  "Data is noisy, so decisions keep stalling",
]
