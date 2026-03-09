import Image from "next/image"

type BrandLogoProps = {
  priority?: boolean
  className?: string
}

export function BrandLogo({ priority = false, className = "" }: BrandLogoProps) {
  return (
    <Image
      src="/brand/amalgam-logo.webp"
      alt="Amalgam"
      width={168}
      height={36}
      priority={priority}
      className={className}
    />
  )
}
