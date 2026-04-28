import type { Metadata } from "next"
import { siteConfig } from "../metadata"
import PortfolioContent from "@/components/portfolio-content"

const portfolioDescription =
  "Explore Raytronics portfolio projects—campaign creative, social content, and brand work that helps businesses stand out online."

export const metadata: Metadata = {
  title: "Portfolio",
  description: portfolioDescription,
  openGraph: {
    title: "Portfolio | " + siteConfig.name,
    description: portfolioDescription,
  },
}

export default function PortfolioPage() {
  return <PortfolioContent />
} 