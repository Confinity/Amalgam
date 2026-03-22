import { FooterNav } from "@/components/navigation/FooterNav"

type FooterProps = {
  variant?: "default" | "how-we-work" | "home"
}

export function Footer(_props: FooterProps) {
  const ctaLabelByVariant = {
    default: "Get a recommendation",
    "how-we-work": "Get a recommendation",
    home: "Get a recommendation",
  } as const
  const variant = _props.variant ?? "default"

  const ctaHrefByVariant = {
    default: "/contact",
    "how-we-work": "/contact",
    home: "/contact",
  } as const

  return (
    <FooterNav
      primaryCtaLabel={ctaLabelByVariant[variant]}
      primaryCtaHref={ctaHrefByVariant[variant]}
    />
  )
}

