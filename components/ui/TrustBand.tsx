"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { ArrowRight } from "lucide-react"
import { TestimonialCard } from "@/components/ui/TestimonialCard"
import { RotatingLogoGrid } from "@/components/ui/RotatingLogoGrid"
import { cn } from "@/lib/utils"

type TrustBandTestimonial = {
  quote: string
  name: string
  role: string
  company: string
  image?: string
}

type TrustBandProps = {
  eyebrow?: string
  title: string
  support: string
  logos: Array<{ name: string; src: string; href?: string }>
  testimonial?: TrustBandTestimonial
  testimonials?: TrustBandTestimonial[]
  className?: string
  tone?: "plain" | "chapter"
  ctaLabel?: string
  ctaHref?: string
}

function shortenQuote(quote: string, maxChars = 156) {
  if (quote.length <= maxChars) return quote

  const firstSentenceEnd = quote.indexOf(".")
  if (firstSentenceEnd > 72) {
    return quote.slice(0, firstSentenceEnd + 1)
  }

  const sliced = quote.slice(0, maxChars).trim()
  const lastWord = sliced.lastIndexOf(" ")
  return `${lastWord > 80 ? sliced.slice(0, lastWord) : sliced}...`
}

export function TrustBand({
  eyebrow,
  title,
  support,
  logos,
  testimonial,
  testimonials,
  className,
  tone = "plain",
  ctaLabel = "Browse case studies",
  ctaHref = "/our-work",
}: TrustBandProps) {
  const testimonialPool = useMemo(() => {
    if (testimonials && testimonials.length > 0) {
      return testimonials
    }
    return testimonial ? [testimonial] : []
  }, [testimonial, testimonials])

  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0)

  useEffect(() => {
    if (testimonialPool.length <= 1) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setActiveTestimonialIndex(Math.floor(Math.random() * testimonialPool.length))
    }, 0)

    return () => window.clearTimeout(timeoutId)
  }, [testimonialPool.length])

  useEffect(() => {
    if (testimonialPool.length <= 1) {
      return
    }

    const intervalId = window.setInterval(() => {
      setActiveTestimonialIndex((current) => (current + 1) % testimonialPool.length)
    }, 12000)

    return () => window.clearInterval(intervalId)
  }, [testimonialPool])

  const activeTestimonial =
    testimonialPool.length > 0
      ? testimonialPool[activeTestimonialIndex % testimonialPool.length]
      : null
  const activeQuote = activeTestimonial ? shortenQuote(activeTestimonial.quote) : null

  const testimonialKey = activeTestimonial
    ? `${activeTestimonial.name}-${activeTestimonial.company}`
    : "none"
  const chapter = tone === "chapter"

  return (
    <section
      className={cn(
        chapter
          ? "section-compact border-y border-[var(--color-border)] band-cool-subtle"
          : "section-compact bg-[var(--color-surface)]",
        className,
      )}
    >
      <div className="container-site">
        {chapter ? (
          <div className="rounded-[28px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 md:p-7">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_380px] lg:items-stretch">
              <div>
                {eyebrow ? (
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-strong)]">
                    {eyebrow}
                  </p>
                ) : null}
                <h2>{title}</h2>
                <p className="copy-support-strong mt-4 max-w-2xl text-base">{support}</p>
                <RotatingLogoGrid logos={logos} className="mt-6" />
                <Link
                  href={ctaHref}
                  className="mt-4 inline-flex min-h-11 items-center gap-2 py-2 text-sm font-medium text-[var(--color-accent-strong)]"
                >
                  {ctaLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {activeTestimonial ? (
                <div className="lg:flex lg:self-stretch lg:flex-col lg:justify-center lg:border-l lg:border-[var(--color-border)] lg:pl-6">
                  <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-subtle)]">
                    Client perspective
                  </p>
                  <div key={testimonialKey} className="section-reveal mt-2.5 lg:mt-3">
                    <TestimonialCard
                      quote={activeQuote ?? activeTestimonial.quote}
                      name={activeTestimonial.name}
                      role={activeTestimonial.role}
                      company={activeTestimonial.company}
                      image={activeTestimonial.image}
                    />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-center">
            <div>
              {eyebrow ? (
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-strong)]">
                  {eyebrow}
                </p>
              ) : null}
              <h2>{title}</h2>
              <p className="copy-support-strong mt-4 max-w-[58ch] text-base">{support}</p>
              <RotatingLogoGrid logos={logos} className="mt-6" />
              <Link
                href={ctaHref}
                className="mt-4 inline-flex min-h-11 items-center gap-2 py-2 text-sm font-medium text-[var(--color-accent-strong)]"
              >
                {ctaLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {activeTestimonial ? (
              <div className="lg:self-center">
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-subtle)]">
                  Client perspective
                </p>
                <div key={testimonialKey} className="section-reveal mt-3">
                  <TestimonialCard
                    quote={activeQuote ?? activeTestimonial.quote}
                    name={activeTestimonial.name}
                    role={activeTestimonial.role}
                    company={activeTestimonial.company}
                    image={activeTestimonial.image}
                  />
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </section>
  )
}
