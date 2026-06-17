export type Subsidiary = {
  id: number
  logo: string
  name: string
  href?: string
}

export type PartnerLogo = {
  id: string
  src: string
  alt: string
  className?: string
}

export const subsidiaries: Subsidiary[] = [
  { id: 1, logo: "/logos/01.svg", name: "Ray Realty", href: "https://www.rayrealtysl.com/" },
  { id: 2, logo: "/logos/02.svg", name: "Ray Mart", href: "https://www.raymartsl.com/" },
  { id: 3, logo: "/logos/03.svg", name: "Ray Edu" },
  { id: 4, logo: "/logos/04.svg", name: "Ray Group" },
  { id: 5, logo: "/logos/05.svg", name: "Ray Ventures" },
]

export const partnerLogos: PartnerLogo[] = [
  {
    id: "applyboard",
    src: "/logos/ApplyBoard-Logo-Blue-WEB-3.webp",
    alt: "ApplyBoard — education technology partner",
  },
  {
    id: "sdcc",
    src: "/logos/WhatsApp Image 2025-11-01 at 22.02.34_056b0870.jpg",
    alt: "Skill Development Council Canada logo",
    className: "bg-black/20",
  },
  {
    id: "anniversary",
    src: "/logos/logo-25.png",
    alt: "25th anniversary celebration logo",
  },
]

export type Feature = {
  title: string
  description: string
  color: string
}

export const homeFeatures: Feature[] = [
  {
    title: "Social Media Strategy",
    description: "Custom-tailored strategies to boost your online presence",
    color: "from-blue-500 to-cyan-400",
  },
  {
    title: "Content Creation",
    description: "Engaging content that resonates with your audience",
    color: "from-brand to-brand-light",
  },
  {
    title: "Analytics & Insights",
    description: "Data-driven decisions to optimize your campaigns",
    color: "from-orange-500 to-red-400",
  },
]

export const homeStats = [
  { value: "500+", label: "Clients served" },
  { value: "1M+", label: "Engagements generated" },
  { value: "98%", label: "Client satisfaction" },
  { value: "24/7", label: "Support available" },
] as const
