export type ClientLogo = {
  name: string
  src: string
  alt: string
  href?: string
  cardClassName?: string
  imageClassName?: string
}

export const clientLogos: ClientLogo[] = [
  {
    name: "M&T Bank",
    src: "/clients/mt-bank.webp",
    alt: "M&T Bank wordmark",
    href: "/case-studies/mt-bank",
    cardClassName: "client-logo-card--mt-bank",
    imageClassName: "max-w-[76%] lg:max-w-[78%]",
  },
  {
    name: "PearlX",
    src: "/clients/pearlx.webp",
    alt: "PearlX wordmark",
    href: "/case-studies/pearlx",
    cardClassName: "client-logo-card--pearlx",
    imageClassName: "max-w-[70%] lg:max-w-[72%]",
  },
  {
    name: "Premier Financial Alliance",
    src: "/clients/premier-financial-alliance.webp",
    alt: "Premier Financial Alliance wordmark",
    href: "/case-studies/premier-financial-alliance",
    cardClassName: "client-logo-card--premier-financial-alliance",
    imageClassName: "max-w-[72%] lg:max-w-[74%]",
  },
  {
    name: "John Templeton Foundation",
    src: "/clients/john-templeton-foundation.webp",
    alt: "John Templeton Foundation wordmark",
    href: "/case-studies/john-templeton-foundation",
    cardClassName: "client-logo-card--john-templeton",
    imageClassName: "max-w-[69%] max-h-[50px] opacity-90 lg:max-w-[71%]",
  },
  {
    name: "Confinity",
    src: "/clients/confinity.png",
    alt: "Confinity wordmark",
    href: "/case-studies/confinity",
    cardClassName: "client-logo-card--confinity",
    imageClassName: "max-w-[76%] lg:max-w-[79%]",
  },
  {
    name: "Moody's",
    src: "/clients/moodys.webp",
    alt: "Moody's wordmark",
    href: "/case-studies/moodys",
    cardClassName: "client-logo-card--moodys",
    imageClassName: "max-w-[74%] lg:max-w-[76%]",
  },
  {
    name: "SoFi",
    src: "/clients/sofi.webp",
    alt: "SoFi wordmark",
    href: "/case-studies/sofi",
    cardClassName: "client-logo-card--sofi",
    imageClassName: "max-w-[70%] lg:max-w-[72%]",
  },
  {
    name: "TIAA",
    src: "/clients/tiaa.webp",
    alt: "TIAA wordmark",
    href: "/case-studies/tiaa",
    cardClassName: "client-logo-card--tiaa",
    imageClassName: "max-w-[68%] lg:max-w-[70%]",
  },
]

export const additionalClientNames = [
  "Barclays",
  "FINRA",
  "Admin Partners",
  "Constructive",
]
