export const siteConfig = {
  name: "Raytronics",
  description:
    "Raytronics is a digital marketing and social media partner helping brands grow online. Part of the Raytronics Group, we combine strategy, content, and analytics with group-wide expertise.",
  url: "https://raytronics.vercel.app",
  ogImage: "/og-image.jpg",
  logoPath: "/logos/06.svg",
  links: {
    instagram: "https://instagram.com/raytronics",
    facebook: "https://facebook.com/raytronics",
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
