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
  | "sofi"
  | "tiaa"
  | "graphyte-carbon-removal"
  | "cleanitsupply"
  | "mt-bank"
  | "pearlx"
  | "zenbanx"
  | "bank-of-guam"
  | "moodys"
  | "premier-financial-alliance"
  | "john-templeton-foundation"
  | "confinity"
  | "brighthouse-financial"
  | "constructive"
  | "conan-medtech"

export const clientLogos: ClientLogo[] = [
  // Swap logo image assets by editing each `src` path below.
  // Group order/rotation behavior is configured in `rotatingClientLogoSets`.
  // The first eight logos are the default homepage-visible set.
  {
    id: "sofi",
    name: "SoFi",
    src: "/clients/sofi.webp",
    alt: "SoFi wordmark",
    href: "/our-work/sofi",
    cardClassName: "client-logo-card--sofi",
    imageClassName: "max-w-[70%] lg:max-w-[72%]",
  },
  {
    id: "tiaa",
    name: "TIAA",
    src: "/clients/tiaa-color.png",
    alt: "TIAA wordmark",
    href: "/our-work/tiaa",
    cardClassName: "client-logo-card--tiaa",
    imageClassName: "max-w-[68%] lg:max-w-[70%]",
  },
  {
    id: "graphyte-carbon-removal",
    name: "Graphyte",
    src: "/clients/graphyte-carbon-removal.avif",
    alt: "Graphyte wordmark",
    imageClassName: "max-w-[78%] lg:max-w-[80%]",
  },
  {
    id: "cleanitsupply",
    name: "Clean It Supply",
    src: "/clients/cleanitsupply.png",
    alt: "Clean It Supply wordmark",
    href: "/our-work/cleanitsupply",
    imageClassName: "max-w-[82%] lg:max-w-[84%]",
  },
  {
    id: "mt-bank",
    name: "M&T Bank",
    src: "/clients/mt-bank.webp",
    alt: "M&T Bank wordmark",
    href: "/our-work/mt-bank",
    cardClassName: "client-logo-card--mt-bank",
    imageClassName: "max-w-[76%] lg:max-w-[78%]",
  },
  {
    id: "pearlx",
    name: "PearlX",
    src: "/clients/pearlx.webp",
    alt: "PearlX wordmark",
    href: "/our-work/pearlx",
    cardClassName: "client-logo-card--pearlx",
    imageClassName: "max-w-[70%] lg:max-w-[72%]",
  },
  {
    id: "zenbanx",
    name: "Zenbanx",
    src: "/clients/zenbanx.png",
    alt: "Zenbanx wordmark",
    imageClassName: "max-w-[74%] lg:max-w-[76%]",
  },
  {
    id: "bank-of-guam",
    name: "Bank of Guam",
    src: "/clients/bank-of-guam.png",
    alt: "Bank of Guam wordmark",
    imageClassName: "max-w-[74%] lg:max-w-[76%]",
  },
  {
    id: "moodys",
    name: "Moody's",
    src: "/clients/moodys.webp",
    alt: "Moody's wordmark",
    href: "/our-work/moodys",
    cardClassName: "client-logo-card--moodys",
    imageClassName: "max-w-[74%] lg:max-w-[76%]",
  },
  {
    id: "premier-financial-alliance",
    name: "Premier Financial Alliance",
    src: "/clients/premier-financial-alliance.webp",
    alt: "Premier Financial Alliance wordmark",
    href: "/our-work/premier-financial-alliance",
    cardClassName: "client-logo-card--premier-financial-alliance",
    imageClassName: "max-w-[72%] lg:max-w-[74%]",
  },
  {
    id: "john-templeton-foundation",
    name: "John Templeton Foundation",
    src: "/clients/john-templeton-foundation.webp",
    alt: "John Templeton Foundation wordmark",
    href: "/our-work/john-templeton-foundation",
    cardClassName: "client-logo-card--john-templeton",
    imageClassName: "max-w-[80%] max-h-[54px] lg:max-w-[82%]",
  },
  {
    id: "confinity",
    name: "Confinity",
    src: "/clients/confinity.png",
    alt: "Confinity wordmark",
    href: "/our-work/confinity",
    cardClassName: "client-logo-card--confinity",
    imageClassName: "max-w-[84%] lg:max-w-[86%]",
  },
  {
    id: "brighthouse-financial",
    name: "Brighthouse Financial",
    src: "/clients/brighthouse-financial.png",
    alt: "Brighthouse Financial wordmark",
    imageClassName: "max-w-[80%] lg:max-w-[82%]",
  },
  {
    id: "constructive",
    name: "Constructive",
    src: "/clients/constructive.png",
    alt: "Constructive wordmark",
    href: "/our-work/constructive-built-environment",
    imageClassName: "max-w-[78%] lg:max-w-[80%]",
  },
  {
    id: "conan-medtech",
    name: "Conan MedTech",
    src: "/clients/conan-medtech.png",
    alt: "Conan MedTech wordmark",
    imageClassName: "max-w-[78%] lg:max-w-[80%]",
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
  "ComplyPro+",
]
