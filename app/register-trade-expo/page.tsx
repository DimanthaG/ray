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

import { Globe } from "lucide-react"

export default function TradeExpoRegistrationPage() {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden py-12 md:py-20">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[30rem] w-[min(100%,60rem)] bg-gradient-to-tr from-brand/20 via-cyan-500/15 to-indigo-600/10 blur-[140px]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-xs font-bold text-brand">
            <Globe className="h-4 w-4" />
            <span>Canada Ceylon Gem & Meta Expo 2026</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-heading text-foreground tracking-tight">
            Exhibitor <span className="text-gradient">Registration & Downloads</span>
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Secure your booth and connect with international buyers in Toronto, Canada. 
            Download official event documentation, VISA guidelines, and application forms for Gem Expo & Meta Expo below.
          </p>
        </div>

        <TradeExpoRegistrationContent />
      </div>
    </div>
  )
}
