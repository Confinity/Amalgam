import Image from "next/image"
import { testimonials } from "@/lib/testimonials"
import { withBasePath } from "@/lib/site-config"

type ContextualTestimonialProps = {
  className?: string
  eyebrow?: string
  title?: string
  testimonialId?: string
}

export function ContextualTestimonial({
  className = "",
  eyebrow = "Client perspective",
  title = "What clients say after the work is in motion",
  testimonialId,
}: ContextualTestimonialProps) {
  const testimonial =
    (testimonialId
      ? testimonials.find((item) => item.id === testimonialId)
      : null) ?? testimonials[0]

  if (!testimonial) {
    return null
  }

  return (
    <section className={className}>
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="rounded-[30px] border border-border bg-[linear-gradient(160deg,rgba(255,255,255,0.94),rgba(244,246,248,0.78))] p-8 md:p-10">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">{eyebrow}</p>
          <h2 className="mt-3 text-2xl font-semibold text-foreground text-balance">{title}</h2>
          <blockquote className="mt-6 text-base leading-relaxed text-foreground md:text-lg">
            <span className="mr-1 text-xl leading-none text-teal/65">&ldquo;</span>
            {testimonial.quote}
          </blockquote>
          <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
            <div className="relative h-12 w-12 overflow-hidden rounded-full border border-border/70 bg-background/70">
              <Image
                src={withBasePath(testimonial.image)}
                alt={`Portrait of ${testimonial.name}`}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="break-words text-sm font-semibold text-foreground">{testimonial.name}</p>
              <p className="break-words text-xs text-muted-foreground">
                {testimonial.title}, {testimonial.company}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
