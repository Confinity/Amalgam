import type { MetadataRoute } from "next"
import { withBasePath } from "@/lib/site-config"

export const dynamic = "force-static"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Amalgam",
    short_name: "Amalgam",
    description:
      "Experienced support helping teams bring clarity to complex systems and move execution forward.",
    start_url: withBasePath("/"),
    display: "standalone",
    background_color: "#FCFCFA",
    theme_color: "#00BFA6",
    icons: [
      {
        src: withBasePath("/brand/amalgam-icon-192.png"),
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: withBasePath("/brand/amalgam-icon-512.png"),
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
