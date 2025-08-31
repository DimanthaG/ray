import type { Metadata } from "next"
import { siteConfig } from "../metadata"
import RegistrationContent from "@/components/registration-content"

export const metadata: Metadata = {
  title: "Exhibition Registration",
  description: "Register for the Lanka Gems & Jewels Canada Exhibition. Join us in Toronto for this exclusive event.",
  openGraph: {
    title: "Exhibition Registration | " + siteConfig.name,
    description: "Register for the Lanka Gems & Jewels Canada Exhibition. Join us in Toronto for this exclusive event.",
  },
}

export default function RegistrationPage() {
  return <RegistrationContent />
}

