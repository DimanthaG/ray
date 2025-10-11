import type { Metadata } from "next"
import { siteConfig } from "../metadata"
import TradeExpoRegistrationContent from "@/components/trade-expo-registration-content"

export const metadata: Metadata = {
  title: "Register for Lanka Trade Expo 2026",
  description: "Register for the Lanka Trade Expo 2026 in Toronto, Canada. Connect with international buyers and expand your business globally.",
  openGraph: {
    title: "Register for Lanka Trade Expo 2026 | " + siteConfig.name,
    description: "Register for the Lanka Trade Expo 2026 in Toronto, Canada. Connect with international buyers and expand your business globally.",
  },
}

export default function TradeExpoRegistrationPage() {
  return <TradeExpoRegistrationContent />
}
