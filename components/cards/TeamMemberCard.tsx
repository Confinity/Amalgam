import Image from "next/image"
import { withBasePath } from "@/lib/site-config"
import { Card } from "@/components/ui/Card"
import { cn } from "@/lib/utils"

type TeamMemberCardProps = {
  member: {
    name: string
    role: string
    helpsWith: string
    expertise: string[]
    bio: string
    image: string
    imageAlt: string
    imageClassName?: string
    imageFrameClassName?: string
  }
  featured?: boolean
  size?: "large" | "compact"
  expertiseLimit?: number
}

export function TeamMemberCard({
  member,
  featured = false,
  size = "large",
  expertiseLimit = 1,
}: TeamMemberCardProps) {
  const conciseBio =
    member.bio.match(/^.*?[.!?](\s|$)/)?.[0]?.trim() ?? member.bio
  const compact = size === "compact"

  return (
    <Card
      variant={featured ? "primary" : "secondary"}
      interactive
      className={`overflow-hidden p-0 ${compact ? "h-full" : ""}`}
    >
      <div
        className={cn(
          "relative aspect-[4/3] overflow-hidden bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-surface-soft)_92%,#d8e0e8_8%)_0%,color-mix(in_srgb,var(--color-surface-muted)_90%,white_10%)_100%)]",
          member.imageFrameClassName,
        )}
      >
        <Image
          src={withBasePath(member.image)}
          alt={member.imageAlt}
          fill
          sizes="(min-width: 1200px) 360px, (min-width: 768px) 50vw, 100vw"
          className={cn(
            compact ? "object-contain object-bottom px-3 pb-0 pt-3" : "object-contain object-bottom px-4 pb-0 pt-4",
            member.imageClassName,
          )}
        />
      </div>
      <div className={compact ? "p-4" : "p-6"}>
        <h3 className={`font-semibold text-[var(--color-text)] ${compact ? "text-lg" : "text-xl"}`}>{member.name}</h3>
        <p className="mt-1 text-sm text-[var(--color-accent-strong)]">{member.role}</p>
        <p className={`text-[0.95rem] leading-[1.55] text-[var(--color-text-muted)] ${compact ? "mt-2" : "mt-3"}`}>{conciseBio}</p>
        {expertiseLimit > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {member.expertise.slice(0, expertiseLimit).map((item) => (
              <span
                key={item}
                className="rounded-full border border-[var(--color-border)] px-2.5 py-1 text-xs text-[var(--color-text-subtle)]"
              >
                {item}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </Card>
  )
}
