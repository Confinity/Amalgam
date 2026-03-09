import type { MetadataRoute } from "next"
import { withBasePath } from "@/lib/site-config"

export const dynamic = "force-static"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Amalgam",
    short_name: "Amalgam",
    description:
      "Senior operators helping founders and versatilists untangle complex systems and restore delivery velocity.",
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
