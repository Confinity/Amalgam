export type CareerRole = {
  id: string
  team: string
  title: string
  location: string
  employmentType: string
  compensationRange: string
  summary: string
  responsibilities: string[]
}

// Sourced from the legacy Amalgam careers listing at amalgam-inc.com/careers.
export const careerRoles: CareerRole[] = [
  {
    id: "sales-marketing-intern",
    team: "Marketing",
    title: "Sales & Marketing Intern (Remote)",
    location: "Remote",
    employmentType: "Full-time",
    compensationRange: "$40,000-$60,000",
    summary:
      "Support Amalgam's sales and marketing efforts while learning technical sales fundamentals and cloud delivery context in a lean operating team.",
    responsibilities: [
      "Shadow leadership across prospect calls, client meetings, and active commercial workflows.",
      "Build and maintain core go-to-market materials, including case-study and website content updates.",
      "Help manage pipeline tracking and support practical sales operations day to day.",
    ],
  },
  {
    id: "java-full-stack-developer",
    team: "Engineering",
    title: "Java Full Stack Developer (Remote)",
    location: "Remote",
    employmentType: "Full-time",
    compensationRange: "$80,000-$120,000",
    summary:
      "Build full-stack solutions across Java and JavaScript with hands-on delivery in distributed systems, API design, and cloud deployment environments.",
    responsibilities: [
      "Design and build RESTful services and microservices-oriented solutions.",
      "Deliver frontend work in modern JavaScript frameworks including React and related tooling.",
      "Contribute through agile practices, clear technical communication, and production-grade deployment discipline.",
    ],
  },
  {
    id: "senior-ux-ui-designer",
    team: "Design",
    title: "Senior UX/UI Designer (Remote)",
    location: "Remote",
    employmentType: "Full-time",
    compensationRange: "$80,000-$120,000",
    summary:
      "Create clear, high-quality web and product experiences in close collaboration with engineering, from early structure through shipped interface quality.",
    responsibilities: [
      "Lead UX/UI direction for client websites and software experiences.",
      "Translate design ideas into user flows, wireframes, and implementation-ready visual systems.",
      "Collaborate with development teams to improve shipped quality and maintain design consistency.",
    ],
  },
]

export const careerCultureSignals = [
  {
    title: "You want to be valued for your professionalism.",
    description:
      "Everyone has a voice, and ownership matters. Strong judgment and clear execution are recognized here.",
  },
  {
    title: "You always put the client first.",
    description:
      "We are serious about client outcomes and expect thoughtful, high-quality work that earns trust.",
  },
  {
    title: "You value your freedom.",
    description:
      "We give clear direction and real space to execute. We also work asynchronously across locations.",
  },
  {
    title: "You're a lifelong student.",
    description:
      "We stay curious, test ideas, and treat mistakes as learning data for better decisions.",
  },
]
