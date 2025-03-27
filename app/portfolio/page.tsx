import type { Metadata } from "next"
import { siteConfig } from "../metadata"
import PortfolioContent from "@/components/portfolio-content"

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Explore our portfolio of professional photography and videography work. See how we've helped businesses tell their stories through stunning visuals.",
  openGraph: {
    title: "Portfolio | " + siteConfig.name,
    description: "Explore our portfolio of professional photography and videography work. See how we've helped businesses tell their stories through stunning visuals.",
  },
}

export default function PortfolioPage() {
  return <PortfolioContent />
} 