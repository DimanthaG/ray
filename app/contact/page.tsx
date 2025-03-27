import type { Metadata } from "next"
import { siteConfig } from "../metadata"
import ContactContent from "@/components/contact-content"

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with us for your photography and videography needs. We're here to help bring your vision to life.",
  openGraph: {
    title: "Contact Us | " + siteConfig.name,
    description: "Get in touch with us for your photography and videography needs. We're here to help bring your vision to life.",
  },
}

export default function ContactPage() {
  return <ContactContent />
} 