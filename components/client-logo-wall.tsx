import Image from "next/image"
import Link from "next/link"
import { additionalClientNames, clientLogos } from "@/lib/client-logos"
import { withBasePath } from "@/lib/site-config"

type ClientLogoWallProps = {
  eyebrow?: string
  title: string
  description: string
  className?: string
  showCaseStudiesCta?: boolean
}

export function ClientLogoWall({
  eyebrow,
  title,
  description,
  className = "",
  showCaseStudiesCta = false,
}: ClientLogoWallProps) {
  return (
    <section className={`client-experience ${className}`}>
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mx-auto max-w-[720px] text-center">
          {eyebrow ? (
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.24em] text-teal">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="text-3xl font-semibold text-foreground text-balance">{title}</h2>
          <p className="mx-auto mt-3 max-w-[42ch] leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="client-grid mt-[30px]">
          {clientLogos.map((logo) => {
            const cardClassName = `client-logo-card ${
              logo.href ? "client-logo-card--interactive" : ""
            } group relative ${logo.cardClassName ?? ""}`
            const frame = (
              <div
                className={`client-logo-frame relative mx-auto h-11 w-full ${
                  logo.imageClassName ?? ""
                }`}
              >
                <Image
                  src={withBasePath(logo.src)}
                  alt={logo.alt}
                  fill
                  sizes="(min-width: 1024px) 220px, (min-width: 640px) 40vw, 100vw"
                  className="client-logo object-contain object-center"
                />
              </div>
            )

            if (!logo.href) {
              return (
                <div key={logo.name} className={cardClassName}>
                  {frame}
                </div>
              )
            }

            if (logo.href.startsWith("http")) {
              return (
                <a
                  key={logo.name}
                  href={logo.href}
                  aria-label={`Visit ${logo.name}`}
                  target="_blank"
                  rel="noreferrer"
                  className={cardClassName}
                >
                  {frame}
                </a>
              )
            }

            return (
              <Link
                key={logo.name}
                href={logo.href}
                aria-label={`Read the ${logo.name} case study`}
                className={cardClassName}
              >
                {frame}
              </Link>
            )
          })}
        </div>

        <p className="client-experience__additional">
          <span className="text-muted-foreground/70">Additional experience includes </span>
          <span className="text-muted-foreground">
            {additionalClientNames.join(", ")}.
          </span>
        </p>

        {showCaseStudiesCta ? (
          <div className="mt-5 text-center">
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-sm font-medium text-teal transition-colors hover:text-foreground"
            >
              See selected case studies
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  )
}
