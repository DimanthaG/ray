import type { Metadata } from "next"
import { siteConfig } from "../metadata"
import AboutContent from "@/components/about-content"

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about our professional photography and videography services. We are passionate about creating stunning visual content that tells your story.",
  openGraph: {
    title: "About Us | " + siteConfig.name,
    description: "Learn about our professional photography and videography services. We are passionate about creating stunning visual content that tells your story.",
  },
}

export default function AboutPage() {
  return <AboutContent />
} 