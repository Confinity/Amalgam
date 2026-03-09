import Image from "next/image"
import { testimonials } from "@/lib/testimonials"
import { withBasePath } from "@/lib/site-config"

type TestimonialStripProps = {
  className?: string
  eyebrow?: string
  title?: string
  compact?: boolean
}

export function TestimonialStrip({
  className = "",
  eyebrow = "Client perspective",
  title = "What working together felt like",
  compact = false,
}: TestimonialStripProps) {
  return (
    <section className={className}>
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-teal">
            {eyebrow}
          </p>
          <h2 className="text-2xl font-semibold text-foreground text-balance">{title}</h2>
        </div>

        <div className={`grid gap-6 ${compact ? "md:grid-cols-2 xl:grid-cols-3" : "lg:grid-cols-3"}`}>
          {testimonials.map((item) => (
            <article
              key={item.id}
              className="rounded-[28px] border border-border bg-[linear-gradient(160deg,rgba(255,255,255,0.95),rgba(244,246,248,0.7))] p-6 shadow-sm"
            >
              <div className="text-2xl leading-none text-teal/60">&ldquo;</div>
              <p className="mt-2 text-sm leading-relaxed text-foreground">{item.quote}</p>
              <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full border border-border/70 bg-secondary/40">
                  <Image
                    src={withBasePath(item.image)}
                    alt={`Portrait of ${item.name}`}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.title}, {item.company}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
