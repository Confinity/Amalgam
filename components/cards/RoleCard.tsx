import { Mail } from "lucide-react"
import { TrackedButton } from "@/components/ui/TrackedButton"
import { Card } from "@/components/ui/Card"

type RoleCardProps = {
  role: {
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
}

export function RoleCard({ role }: RoleCardProps) {
  const subject = encodeURIComponent(`Career inquiry - ${role.title}`)

  return (
    <Card variant="secondary" interactive className="p-6">
      <div className="flex flex-wrap gap-2 text-xs text-[var(--color-text-subtle)]">
        <span className="rounded-full border border-[var(--color-border)] px-2.5 py-1">{role.team}</span>
        <span className="rounded-full border border-[var(--color-border)] px-2.5 py-1">{role.workMode}</span>
        <span className="rounded-full border border-[var(--color-border)] px-2.5 py-1">{role.type}</span>
      </div>

      <h3 className="mt-4 text-2xl font-semibold text-[var(--color-text)]">{role.title}</h3>
      <p className="mt-3 text-sm text-[var(--color-text-muted)]">{role.whyRoleExists}</p>

      <div className="mt-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-4">
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--color-text)]">
          {role.responsibilities.slice(0, 3).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <p className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-[var(--color-text-muted)]">
          <span className="font-medium text-[var(--color-text)]">30 days:</span> {role.success30}
        </p>
        <p className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-[var(--color-text-muted)]">
          <span className="font-medium text-[var(--color-text)]">90 days:</span> {role.success90}
        </p>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <TrackedButton
          href="/contact?interest=careers"
          eventName="careers_interest"
          eventData={{
            source: "careers_role_card",
            role_id: role.id,
            role_title: role.title,
            cta_id: `careers_role_${role.id}_contact`,
            destination: "/contact?interest=careers",
          }}
        >
          Ask about this role
        </TrackedButton>
        <TrackedButton
          href={`mailto:hello@amalgam-inc.com?subject=${subject}`}
          variant="secondary"
          className="inline-flex items-center gap-2"
          eventName="careers_interest"
          eventData={{
            source: "careers_role_card",
            role_id: role.id,
            role_title: role.title,
            cta_id: `careers_role_${role.id}_email`,
            destination: `mailto:hello@amalgam-inc.com?subject=${subject}`,
          }}
        >
          <Mail className="h-4 w-4" />
          Email directly
        </TrackedButton>
      </div>
    </Card>
  )
}