import Image from "next/image"
import { withBasePath } from "@/lib/site-config"

type BrandLogoProps = {
  priority?: boolean
  className?: string
}

export function BrandLogo({ priority = false, className = "" }: BrandLogoProps) {
  return (
    <Image
      src={withBasePath("/brand/amalgam-logo.webp")}
      alt="Amalgam"
      width={168}
      height={36}
      priority={priority}
      className={className}
    />
  )
}
