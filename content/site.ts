export type NavItem = {
  label: string
  href: string
}

export type SignalTile = {
  title: string
  detail: string
}

export const mainNav: NavItem[] = [
  { label: "What we offer", href: "/services" },
  { label: "What we've done", href: "/our-work" },
  { label: "Your Next Move", href: "/next-move" },
  { label: "Who we are", href: "/about" },
  { label: "Research", href: "/research" },
]

export const footerNav = {
  company: [
    { label: "Who we are", href: "/about" },
    { label: "Meet our team", href: "/team" },
    { label: "Build with us", href: "/careers" },
  ],
  support: [
    { label: "What we offer", href: "/services" },
    { label: "Case Studies", href: "/our-work" },
    { label: "Your Next Move", href: "/next-move" },
    { label: "Research", href: "/research" },
  ],
}

export const homepageCopy = {
  headline: "From idea to scale without the chaos.",
  support:
    "We help founders, product leads, and engineering teams get unstuck when work gets messy. We find what is blocking progress and your next move.",
  helper:
    "If priorities keep shifting or progress is slowing, we can help.",
  proofTitle: "Who we've supported when execution got hard",
  caseStudiesTitle: "How we've helped teams move forward",
  knowledgeTitle: "Research to help you decide what to do next",
  finalTitle: "Choose your next step.",
}

export const homepageCapabilities: SignalTile[] = [
  {
    title: "Get clear on what matters next",
    detail: "Align your team on the one decision that matters most.",
  },
  {
    title: "Unblock work before delays spread",
    detail: "Keep product, engineering, and operations in sync before delays spread.",
  },
  {
    title: "Make the system feel simple again",
    detail: "Reduce system strain so roadmap choices stay steady.",
  },
  {
    title: "Turn uncertainty into a plan you can execute",
    detail: "Turn uncertainty into a practical plan your team can run.",
  },
]

export const homepageAudiences: SignalTile[] = [
  {
    title: "Founders",
    detail: "You get a clear call fast when the next move is high stakes.",
  },
  {
    title: "Owner-operators",
    detail: "You get operating clarity when growth starts outrunning systems.",
  },
  {
    title: "Solo builders",
    detail: "You get decision support when too much weight sits with one person.",
  },
  {
    title: "Product and delivery teams",
    detail: "You get clearer plans and handoffs when execution starts to wobble.",
  },
]

export const homepageReachOutMoments = [
  "Priorities keep shifting, and progress is slowing anyway.",
  "Delivery pressure is rising, and confidence in the plan is slipping.",
  "Systems and roadmap are drifting out of sync.",
  "Everyone's busy, but the next move still isn't clear.",
  "You're adding effort, but the outcomes still aren't moving fast enough.",
  "You can see the pressure, but deciding what to do next still feels heavy.",
]

export const serviceSignals: SignalTile[] = [
  {
    title: "Direction keeps shifting",
    detail: "Plans keep changing, so it's hard to settle on what to do first.",
  },
  {
    title: "Delivery keeps slipping",
    detail: "Work stays busy, but deadlines keep slipping.",
  },
  {
    title: "Systems feel fragile",
    detail: "Small changes cause rework and new issues.",
  },
  {
    title: "The next move is unclear",
    detail: "Leaders need a clear path before they commit more time and budget.",
  },
  {
    title: "Coordination feels heavy",
    detail: "Too many handoffs slow decisions and stall work.",
  },
  {
    title: "It's hard to tell what's moving",
    detail: "Plans keep changing, so teams struggle to see what is actually getting done.",
  },
]

export const trustFrame =
  "We've helped teams in tough moments when the next decision had to work."


