export const siteConfig = {
  name: "Raytronics",
  description:
    "Raytronics Group is a premier Sri Lankan conglomerate established in 1993, operating across certified Ceylon gemstones, luxury real estate, global higher education pathways, retail tech e-commerce, and international trade exhibitions.",
  url: "https://raytronics.vercel.app",
  ogImage: "/og-image.jpg",
  logoPath: "/logos/06.svg",
  links: {
    instagram: "https://www.instagram.com/raytronics_lanka?igsh=ejdkNmdwdmt3cTVm",
    facebook: "https://www.facebook.com/share/1HU1zpDerz/?mibextid=wwXIfr",
    tiktok: "https://www.tiktok.com/@raytronics_sl?_r=1&_t=ZS-98eNpVHq4kH",
    linkedin: "https://linkedin.com/company/raytronics",
    twitter: "https://twitter.com/raytronics",
  },
} as const

export const siteKeywords = [
  "Raytronics",
  "digital marketing",
  "social media marketing",
  "social media strategy",
  "content creation",
  "brand marketing",
  "Raytronics Group",
  "online presence",
  "marketing analytics",
  "community management",
] as const

export type SiteConfig = typeof siteConfig
