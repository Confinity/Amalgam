import Image from "next/image"
import { withBasePath } from "@/lib/site-config"
import { cn } from "@/lib/utils"

type TestimonialCardProps = {
  quote: string
  name: string
  role: string
  company: string
  image?: string
  className?: string
}

export function TestimonialCard({
  quote,
  name,
  role,
  company,
  image,
  className,
}: TestimonialCardProps) {
  return (
    <article
      className={cn(
        "overflow-hidden rounded-2xl border border-tier-default bg-[color-mix(in_srgb,var(--color-surface)_97%,white_3%)]",
        className,
      )}
    >
      <div className="px-5 py-5 md:px-6 md:py-6">
        <p className="max-w-[40ch] text-[1rem] leading-[1.55] text-[var(--color-text)] md:text-[1.04rem]">
          &ldquo;{quote}&rdquo;
        </p>
      </div>
      <div className="flex items-center gap-3 border-t border-tier-default bg-[color-mix(in_srgb,var(--color-surface-muted)_64%,white_36%)] px-4 py-4 md:px-6">
        {image ? (
          <div className="relative h-11 w-11 overflow-hidden rounded-full border border-tier-default bg-[var(--color-surface-muted)]">
            <Image
              src={withBasePath(image)}
              alt={`Portrait of ${name}`}
              fill
              sizes="44px"
              className="object-cover"
            />
          </div>
        ) : null}
        <div className="leading-[1.3]">
          <p className="text-sm font-semibold text-[var(--color-text)]">{name}</p>
          <p className="text-xs text-[var(--color-text-muted)]">{role}</p>
          <p className="text-xs text-[var(--color-text-subtle)]">{company}</p>
        </div>
      </div>
    </article>
  )
}

