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
    title: "Leadership, growth, and operations",
    description:
      "The team setting direction, shaping engagements, and keeping delivery tied to business outcomes.",
  },
  {
    id: "architecture",
    eyebrow: "Architecture & Engineering",
    title: "Technical architecture and engineering",
    description:
      "Hands-on architects and builders working across systems, platforms, data, and real delivery constraints.",
  },
  {
    id: "delivery",
    eyebrow: "Delivery & People",
    title: "Execution, cadence, and team effectiveness",
    description:
      "Leaders focused on cadence, hiring, and team effectiveness so strong plans turn into reliable execution.",
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
      "Built Amalgam after years across startups, financial services, and software delivery. Focused on direct communication, structure, and real execution.",
    bio:
      "Neeraj founded Amalgam after years in startups, financial services, and software development. He keeps the team focused on clear thinking, sound systems judgment, and practical execution.",
    specialties: ["Strategic Leadership", "Financial Services", "Startup Advisory"],
    funFact: "Avid reader, dabbles in writing, and loves to travel.",
    image: "/team/neeraj.webp",
    imageAlt: "Portrait of Neeraj Vir",
  },
  {
    name: "Ryan",
    fullName: "Ryan Ward",
    role: "Head of Growth & Innovation",
    group: "leadership",
    shortBio:
      "Leads growth and operations across Amalgam's commercial systems, client experience, and day-to-day rhythm.",
    bio:
      "Ryan leads growth and operations at Amalgam. He keeps the business side of delivery disciplined so engagements start clearly and move cleanly.",
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
      "Architect with deep experience in enterprise applications, data pipelines, and service integration.",
    bio:
      "Vikas specializes in enterprise architecture, large-scale data flows, and service integration. He brings decades of experience across global technology organizations.",
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
      "Builds cloud-ready applications and enterprise products across regulated and high-volume industries.",
    bio:
      "Naren is a technical leader with long experience building cloud applications and enterprise products across finance, retail, telecom, and healthcare-adjacent sectors.",
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
      "Leads development and platform delivery for large-scale web and mobile applications.",
    bio:
      "Oleg leads DevOps at Amalgam with a focus on reliable delivery across Docker, Kubernetes, and AWS-based environments.",
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
      "Full-stack developer known for practical problem solving across retail, financial, and insurance systems.",
    bio:
      "Jub has spent two decades solving hard technical problems for major retail, financial, and insurance organizations.",
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
      "Leads agile delivery with experience across QA, development, and project leadership.",
    bio:
      "Lisa brings delivery leadership experience across QA, development, project management, and agile coaching in telecom, pharma, and insurance environments.",
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
      "Developer with a disciplined execution mindset and full-stack product experience.",
    bio:
      "Ruben brings strong technical range and disciplined execution to product development across React, Node, and mobile-friendly stacks.",
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
      "Business and legal leadership that keeps operations, agreements, and client engagements running smoothly.",
    bio:
      "Sumita combines business and legal judgment to keep daily operations steady and client terms clear.",
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
      "HR consultant focused on matching talent to the right roles and building strong teams.",
    bio:
      "Parul supports hiring and people operations with a practical, people-first approach to team building.",
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
  Neeraj: "/team/about-cutouts/neeraj-raw.png",
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
  Neeraj: "object-contain object-bottom px-4 pt-4 pb-0 scale-[1.01] md:px-5 md:pt-5",
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
