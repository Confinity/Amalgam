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
      "Leads product and delivery decisions so teams can move with clarity and pace.",
    bio:
      "Neeraj founded Amalgam after years in startups, financial services, and software development. He keeps the team focused on clear thinking, sound systems judgment, and practical execution.",
    specialties: ["Product & delivery leadership", "Financial services", "Startup advisory"],
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
      "Leads growth and operations so client work starts clear and keeps moving.",
    bio:
      "Ryan leads growth and operations at Amalgam. He keeps the business side of delivery disciplined so engagements start clearly and move cleanly.",
    specialties: ["Growth & operations", "Operations", "Client experience"],
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
      "Helps simplify complex systems so architecture decisions do not slow delivery.",
    bio:
      "Vikas specializes in enterprise architecture, large-scale data flows, and service integration. He brings decades of experience across global technology organizations.",
    specialties: ["System architecture", "Data pipelines", "Service integration"],
    funFact: "Loves to visit new places and explore.",
    image: "/team/vikas.webp",
    imageAlt: "Portrait of Vikas",
  },
  {
    name: "Naren",
    role: "Enterprise Architect",
    group: "architecture",
    shortBio:
      "Helps design resilient cloud systems for regulated and high-volume products.",
    bio:
      "Naren is a technical leader with long experience building cloud applications and enterprise products across finance, retail, telecom, and healthcare-adjacent sectors.",
    specialties: ["Cloud architecture", "Open source", "Enterprise applications"],
    funFact: "Loves to play badminton.",
    image: "/team/naren.webp",
    imageAlt: "Portrait of Naren",
  },
  {
    name: "Oleg",
    role: "Architect & DevOps Lead",
    group: "architecture",
    shortBio:
      "Helps stabilize delivery pipelines and platform reliability in complex systems.",
    bio:
      "Oleg leads DevOps at Amalgam with a focus on reliable delivery across Docker, Kubernetes, and AWS-based environments.",
    specialties: ["Delivery pipelines", "Kubernetes", "AWS", "Docker"],
    funFact: "Loves spending time with his children and playing table tennis.",
    image: "/team/oleg.webp",
    imageAlt: "Portrait of Oleg",
  },
  {
    name: "Supamit (Jub)",
    role: "Lead Developer",
    group: "architecture",
    shortBio:
      "Helps teams ship practical full-stack solutions when timelines are tight.",
    bio:
      "Jub has spent two decades solving hard technical problems for major retail, financial, and insurance organizations.",
    specialties: ["Full-stack delivery", "Problem solving", "Technical architecture"],
    funFact: "Listens to music and plays with his daughter.",
    image: "/team/jub.webp",
    imageAlt: "Portrait of Supamit Jub",
  },
  {
    name: "Lisa",
    role: "Agile Practice Lead",
    group: "delivery",
    shortBio:
      "Helps teams keep delivery cadence steady across cross-functional work.",
    bio:
      "Lisa brings delivery leadership experience across QA, development, project management, and agile coaching in telecom, pharma, and insurance environments.",
    specialties: ["Agile delivery", "QA testing", "Project management", "Scrum"],
    funFact: "Amateur photographer, nature lover, and fitness enthusiast.",
    image: "/team/lisa.webp",
    imageAlt: "Portrait of Lisa",
  },
  {
    name: "Ruben",
    role: "Software Developer",
    group: "architecture",
    shortBio:
      "Helps move product builds forward with disciplined full-stack delivery.",
    bio:
      "Ruben brings strong technical range and disciplined execution to product development across React, Node, and mobile-friendly stacks.",
    specialties: ["Full-stack execution", "Node.js", "MongoDB", "React Native"],
    funFact: "Active runner, overlanding enthusiast, anime fan, and Brooklyn Nets supporter.",
    image: "/team/ruben.webp",
    imageAlt: "Portrait of Ruben",
  },
  {
    name: "Sumita",
    role: "Partner - Legal & HR",
    group: "leadership",
    shortBio:
      "Leads legal and people operations so delivery stays steady as work scales.",
    bio:
      "Sumita combines business and legal judgment to keep daily operations steady and client terms clear.",
    specialties: ["Legal operations", "HR operations", "Contract management"],
    funFact: "Loves creating dishes in the kitchen for family, friends, and colleagues.",
    image: "/team/sumita.webp",
    imageAlt: "Portrait of Sumita",
  },
  {
    name: "Parul",
    role: "Human Resources Consultant",
    group: "delivery",
    shortBio:
      "Helps teams hire well and strengthen day-to-day people operations.",
    bio:
      "Parul supports hiring and people operations with a practical, people-first approach to team building.",
    specialties: ["People operations", "Talent acquisition", "Team building"],
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
  Neeraj: "object-contain object-bottom px-4 pt-3 pb-0 scale-[1.04] md:px-5 md:pt-4",
  Ryan: "object-contain object-bottom px-5 pt-6 pb-0 scale-[1.01] md:px-6 md:pt-7",
  Sumita: "object-contain object-bottom px-6 pt-5 pb-0 scale-[0.98] md:px-7 md:pt-6",
  Vikas: "object-contain object-bottom px-5 pt-4 pb-0 scale-[1.01] md:px-6 md:pt-5",
  Naren: "object-contain object-bottom px-5 pt-4 pb-0 scale-[1.04] md:px-6 md:pt-5",
  Oleg: "object-contain object-bottom px-5 pt-4 pb-0 scale-[1.03] md:px-6 md:pt-5",
  Ruben: "object-contain object-bottom px-5 pt-4 pb-0 scale-[1.01] md:px-6 md:pt-5",
  "Supamit (Jub)": "object-contain object-bottom px-5 pt-4 pb-0 scale-[1.01] md:px-6 md:pt-5",
  Lisa: "object-contain object-bottom px-6 pt-5 pb-0 scale-[0.97] md:px-7 md:pt-6",
  Parul: "object-contain object-bottom px-6 pt-5 pb-0 scale-[0.98] md:px-7 md:pt-6",
}
