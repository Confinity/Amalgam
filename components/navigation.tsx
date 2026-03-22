import { Navbar } from "@/components/navigation/Navbar"

type NavigationProps = {
  servicesLabel?: string
  primaryCtaLabel?: string
  primaryCtaHref?: string
}

export function Navigation({
  servicesLabel,
  primaryCtaLabel,
  primaryCtaHref,
}: NavigationProps) {
  return (
    <Navbar
      servicesLabel={servicesLabel}
      primaryCtaLabel={primaryCtaLabel}
      primaryCtaHref={primaryCtaHref}
    />
  )
}
