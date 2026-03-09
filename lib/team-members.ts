export type TeamGroupId = "leadership" | "architecture" | "delivery"

export type TeamMember = {
  name: string
  fullName?: string
  role: string
  group: TeamGroupId
  shortBio: string
  bio: string
  specialties: string[]
  funFact?: string
  image: string
  imageAlt: string
  imageClassName?: string
  imageFrameClassName?: string
}

export const teamGroups = [
  {
    id: "leadership",
    eyebrow: "Leadership",
    title: "Client leadership, growth, operations, and stewardship",
    description:
      "The people setting direction, shaping engagements, and keeping the business side of complex delivery disciplined.",
  },
  {
    id: "architecture",
    eyebrow: "Architecture & Engineering",
    title: "Deep technical operators across systems, platforms, and delivery",
    description:
      "Senior architects and builders with hands-on experience in enterprise systems, cloud platforms, data, and shipping under real constraints.",
  },
  {
    id: "delivery",
    eyebrow: "Delivery & People",
    title: "Execution, cadence, and team effectiveness",
    description:
      "Operators focused on agile delivery, recruiting, team health, and making sure strong plans become sustainable execution.",
  },
] as const satisfies ReadonlyArray<{
  id: TeamGroupId
  eyebrow: string
  title: string
  description: string
}>

export const teamMembers: TeamMember[] = [
  {
    name: "Neeraj",
    fullName: "Neeraj Vir",
    role: "CEO & Founder",
    group: "leadership",
    shortBio:
      "25 years of experience in startups, financial services, and software development. Founded Amalgam to build a client-first consulting practice that values clarity and execution over theater.",
    bio:
      "Neeraj founded Amalgam with 25 years of experience across startups, financial services, and software development. He guides the team with a strong bias toward clear thinking, systems judgment, and practical execution.",
    specialties: ["Strategic Leadership", "Financial Services", "Startup Advisory"],
    funFact: "Avid reader, dabbles in writing, and loves to travel.",
    image: "/team/neeraj.webp",
    imageAlt: "Portrait of Neeraj Vir",
  },
  {
    name: "Ryan",
    fullName: "Ryan Ward",
    role: "Head of Growth & Operations",
    group: "leadership",
    shortBio:
      "Leads growth and operations across Amalgam's commercial systems, client experience, and day-to-day operating rhythm.",
    bio:
      "Ryan Ward leads growth and operations at Amalgam, helping shape the firm's commercial motion, client experience, and operating cadence. He keeps the business side of delivery disciplined so engagements start clearly and move cleanly.",
    specialties: ["Growth", "Operations", "Client Experience"],
    image: "/team/ryan-ward.png",
    imageAlt: "Portrait of Ryan Ward",
    imageClassName: "object-contain p-5",
    imageFrameClassName:
      "bg-[radial-gradient(circle_at_top,rgba(0,191,166,0.12),transparent_58%),linear-gradient(180deg,rgba(244,246,248,1),rgba(255,255,255,1))]",
  },
  {
    name: "Vikas",
    role: "Chief Architect",
    group: "architecture",
    shortBio:
      "20+ years specializing in large-scale enterprise applications, data pipelines, and service integration. Former Sun Microsystems, Oracle, OpenText, and Software AG.",
    bio:
      "Vikas specializes in the architecture and development of very large-scale enterprise applications, data pipelines, and service integration platforms. He has over 20 years of experience at Sun Microsystems, Software AG, OpenText, and Oracle.",
    specialties: ["Enterprise Architecture", "Data Pipelines", "Service Integration"],
    funFact: "Loves to visit new places and explore.",
    image: "/team/vikas.webp",
    imageAlt: "Portrait of Vikas",
  },
  {
    name: "Naren",
    role: "Enterprise Architect",
    group: "architecture",
    shortBio:
      "20+ years building cloud-compliant applications using open-source and emerging technologies across finance, retail, telecom, CPG, and pharma.",
    bio:
      "Naren is a senior technical leader with deep experience building cloud-based applications using open-source technologies. He has spent more than 20 years creating enterprise products across finance, retail, telecom, CPG, and pharma.",
    specialties: ["Cloud Architecture", "Open Source", "Enterprise Applications"],
    funFact: "Loves to play badminton.",
    image: "/team/naren.webp",
    imageAlt: "Portrait of Naren",
  },
  {
    name: "Oleg",
    role: "Architect & DevOps Lead",
    group: "architecture",
    shortBio:
      "12+ years leading development and deployment of large-scale web and mobile applications with a focus on Docker, Kubernetes, and AWS.",
    bio:
      "Oleg has led DevOps at Amalgam for the last 5 years with a focus on Docker, Kubernetes, and AWS. He has more than 12 years of experience leading the development and deployment of large-scale web and mobile applications.",
    specialties: ["DevOps", "Kubernetes", "AWS", "Docker"],
    funFact: "Loves spending time with his children and playing table tennis.",
    image: "/team/oleg.webp",
    imageAlt: "Portrait of Oleg",
  },
  {
    name: "Supamit (Jub)",
    role: "Lead Developer",
    group: "architecture",
    shortBio:
      "20 years finding breakthrough technical solutions for retail, financial, and insurance businesses. Full-stack developer and stellar problem-solver.",
    bio:
      "Over the last 20 years, Jub has found breakthrough technical solutions to business problems for major names in the retail, financial, and insurance industries. He has built a reputation as a stellar problem-solver and a proficient full-stack developer.",
    specialties: ["Full-Stack Development", "Problem Solving", "Technical Architecture"],
    funFact: "Listens to music and plays with his daughter.",
    image: "/team/jub.webp",
    imageAlt: "Portrait of Supamit Jub",
  },
  {
    name: "Lisa",
    role: "Agile Practice Lead",
    group: "delivery",
    shortBio:
      "Experience spanning QA, development, project management, and Scrum Master roles across telecommunications, pharmaceutical, and insurance sectors.",
    bio:
      "Lisa's experience includes quality assurance testing, development, project management, and scrum master roles utilizing Waterfall and Agile methodologies in the telecommunications, pharmaceutical, and insurance spaces.",
    specialties: ["Agile", "QA Testing", "Project Management", "Scrum"],
    funFact: "Amateur photographer, nature lover, and fitness enthusiast.",
    image: "/team/lisa.webp",
    imageAlt: "Portrait of Lisa",
  },
  {
    name: "Ruben",
    role: "Software Developer",
    group: "architecture",
    shortBio:
      "Former Marine Corps team member turned developer, working across React, MongoDB, Express, Node, and React Native.",
    bio:
      "Ruben brings a strong technical background and disciplined mindset to the team. He served in the Marine Corps for 8 years before pursuing web development in React, MongoDB, Express, Node, and React Native.",
    specialties: ["React", "Node.js", "MongoDB", "React Native"],
    funFact: "Active runner, overlanding enthusiast, anime fan, and Brooklyn Nets supporter.",
    image: "/team/ruben.webp",
    imageAlt: "Portrait of Ruben",
  },
  {
    name: "Sumita",
    role: "Partner - Legal & HR",
    group: "leadership",
    shortBio:
      "Business and legal leadership that keeps Amalgam's daily operations, agreements, and client engagements running smoothly.",
    bio:
      "Sumita's business and legal acumen keeps daily operations running smoothly at Amalgam. She uses her law background to oversee agreements and define terms of work with clients.",
    specialties: ["Legal", "HR Operations", "Contract Management"],
    funFact: "Loves creating dishes in the kitchen for family, friends, and colleagues.",
    image: "/team/sumita.webp",
    imageAlt: "Portrait of Sumita",
  },
  {
    name: "Parul",
    role: "Human Resources Consultant",
    group: "delivery",
    shortBio:
      "HR consultant focused on connecting talent with the right roles and building strong, future-ready teams.",
    bio:
      "With several years of experience as an HR consultant and genuine passion for working with people, Parul creates opportunities that connect talent with the right roles.",
    specialties: ["HR Consulting", "Talent Acquisition", "Team Building"],
    funFact: "Loves to cook and watch movies with her son.",
    image: "/team/parul.webp",
    imageAlt: "Portrait of Parul",
  },
]

export const featuredTeamMembers = teamMembers.slice(0, 6)

export const unifiedTeamPortraitBackgroundClass =
  "bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.2),transparent_44%),linear-gradient(180deg,#8098a2_0%,#627a84_100%)]"

export const unifiedTeamPortraits: Record<string, string> = {
  Ryan: "/team/about-cutouts/ryan-ward.webp",
  Vikas: "/team/about-cutouts/vikas.webp",
  Naren: "/team/about-cutouts/naren.webp",
  Oleg: "/team/about-cutouts/oleg.webp",
  "Supamit (Jub)": "/team/about-cutouts/jub.webp",
  Lisa: "/team/about-cutouts/lisa.webp",
  Ruben: "/team/about-cutouts/ruben.webp",
  Sumita: "/team/about-cutouts/sumita.webp",
  Parul: "/team/about-cutouts/parul.webp",
}

export const unifiedTeamPortraitClasses: Record<string, string> = {
  Ryan: "object-contain object-bottom px-5 pt-7 pb-0 scale-[0.99] md:px-6 md:pt-8",
  Sumita: "object-contain object-bottom px-6 pt-6 pb-0 scale-[0.95] md:px-7 md:pt-7",
  Vikas: "object-contain object-bottom px-5 pt-5 pb-0 scale-[0.98] md:px-6 md:pt-6",
  Naren: "object-contain object-bottom px-5 pt-5 pb-0 scale-[1.02] md:px-6 md:pt-6",
  Oleg: "object-contain object-bottom px-5 pt-5 pb-0 scale-[1.01] md:px-6 md:pt-6",
  Ruben: "object-contain object-bottom px-5 pt-5 pb-0 scale-[0.98] md:px-6 md:pt-6",
  "Supamit (Jub)": "object-contain object-bottom px-5 pt-5 pb-0 scale-[0.99] md:px-6 md:pt-6",
  Lisa: "object-contain object-bottom px-6 pt-6 pb-0 scale-[0.95] md:px-7 md:pt-7",
  Parul: "object-contain object-bottom px-6 pt-6 pb-0 scale-[0.96] md:px-7 md:pt-7",
}
