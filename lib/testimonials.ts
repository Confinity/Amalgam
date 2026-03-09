export type Testimonial = {
  id: string
  quote: string
  name: string
  title: string
  company: string
  image: string
}

// Verified from the legacy Amalgam homepage testimonial banners.
export const testimonials: Testimonial[] = [
  {
    id: "fitzmier-jtf",
    quote:
      "Partnering with Amalgam has helped us streamline our team's evaluative workflows and pilot new technologies that better show the impact of our funding and how to improve our grantmaking.",
    name: "Steve Fitzmier",
    title: "Director of Planning & Evaluation",
    company: "John Templeton Foundation",
    image: "/testimonials/fitzmier-avatar.webp",
  },
  {
    id: "mooney-cleanitsupply",
    quote:
      "We've worked with many consulting firms, but finding one that delivers strong results and genuinely cares about our success is rare. The Amalgam team was responsive and easy to work with.",
    name: "Mike Mooney",
    title: "Chief Technology Officer",
    company: "CleanItSupply",
    image: "/testimonials/mooney-avatar.webp",
  },
  {
    id: "mendez-pearlx",
    quote:
      "Amalgam helped us build the virtual power plant that supported our growth. They have been trusted allies since our early days and remain our development partner.",
    name: "Peter Mendez",
    title: "Co-Founder and President",
    company: "PearlX Infrastructure",
    image: "/testimonials/mendez-avatar.webp",
  },
]
