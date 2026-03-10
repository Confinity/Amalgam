export type ClientLogo = {
  id: ClientLogoId
  name: string
  src: string
  alt: string
  href?: string
  cardClassName?: string
  imageClassName?: string
}

export type ClientLogoId =
  | "mt-bank"
  | "pearlx"
  | "premier-financial-alliance"
  | "john-templeton-foundation"
  | "confinity"
  | "moodys"
  | "sofi"
  | "tiaa"

export const clientLogos: ClientLogo[] = [
  // Swap logo image assets by editing each `src` path below.
  // Group order/rotation behavior is configured in `rotatingClientLogoSets`.
  {
    id: "mt-bank",
    name: "M&T Bank",
    src: "/clients/mt-bank.webp",
    alt: "M&T Bank wordmark",
    href: "/case-studies/mt-bank",
    cardClassName: "client-logo-card--mt-bank",
    imageClassName: "max-w-[76%] lg:max-w-[78%]",
  },
  {
    id: "pearlx",
    name: "PearlX",
    src: "/clients/pearlx.webp",
    alt: "PearlX wordmark",
    href: "/case-studies/pearlx",
    cardClassName: "client-logo-card--pearlx",
    imageClassName: "max-w-[70%] lg:max-w-[72%]",
  },
  {
    id: "premier-financial-alliance",
    name: "Premier Financial Alliance",
    src: "/clients/premier-financial-alliance.webp",
    alt: "Premier Financial Alliance wordmark",
    href: "/case-studies/premier-financial-alliance",
    cardClassName: "client-logo-card--premier-financial-alliance",
    imageClassName: "max-w-[72%] lg:max-w-[74%]",
  },
  {
    id: "john-templeton-foundation",
    name: "John Templeton Foundation",
    src: "/clients/john-templeton-foundation.webp",
    alt: "John Templeton Foundation wordmark",
    href: "/case-studies/john-templeton-foundation",
    cardClassName: "client-logo-card--john-templeton",
    imageClassName: "max-w-[80%] max-h-[54px] lg:max-w-[82%]",
  },
  {
    id: "confinity",
    name: "Confinity",
    src: "/clients/confinity.png",
    alt: "Confinity wordmark",
    href: "/case-studies/confinity",
    cardClassName: "client-logo-card--confinity",
    imageClassName: "max-w-[84%] lg:max-w-[86%]",
  },
  {
    id: "moodys",
    name: "Moody's",
    src: "/clients/moodys.webp",
    alt: "Moody's wordmark",
    href: "/case-studies/moodys",
    cardClassName: "client-logo-card--moodys",
    imageClassName: "max-w-[74%] lg:max-w-[76%]",
  },
  {
    id: "sofi",
    name: "SoFi",
    src: "/clients/sofi.webp",
    alt: "SoFi wordmark",
    href: "/case-studies/sofi",
    cardClassName: "client-logo-card--sofi",
    imageClassName: "max-w-[70%] lg:max-w-[72%]",
  },
  {
    id: "tiaa",
    name: "TIAA",
    src: "/clients/tiaa-color.png",
    alt: "TIAA wordmark",
    href: "/case-studies/tiaa",
    cardClassName: "client-logo-card--tiaa",
    imageClassName: "max-w-[68%] lg:max-w-[70%]",
  },
]

export type RotatingClientLogoMode = "desktop-tablet" | "mobile"
export type RotatingClientLogoState = ClientLogoId[]

export const rotatingClientLogoSets: Record<
  RotatingClientLogoMode,
  RotatingClientLogoState[]
> = {
  "desktop-tablet": [
    ["mt-bank", "moodys", "pearlx", "sofi"],
    ["tiaa", "john-templeton-foundation", "premier-financial-alliance", "confinity"],
  ],
  mobile: [
    ["mt-bank", "moodys"],
    ["pearlx", "sofi"],
    ["tiaa", "john-templeton-foundation"],
    ["premier-financial-alliance", "confinity"],
  ],
}

export const clientLogosById: Record<ClientLogoId, ClientLogo> = clientLogos.reduce(
  (acc, logo) => {
    acc[logo.id] = logo
    return acc
  },
  {} as Record<ClientLogoId, ClientLogo>,
)

export const additionalClientNames = [
  "Barclays",
  "FINRA",
  "Admin Partners",
  "Constructive",
]
