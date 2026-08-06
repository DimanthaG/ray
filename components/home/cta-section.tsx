"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function CtaSection() {
  return (
    <section
      className="relative mb-20 md:mb-28 overflow-hidden rounded-3xl border border-brand/30 bg-gradient-to-br from-brand/15 via-card/70 to-cyan-500/10 p-8 sm:p-12 md:p-16 text-center backdrop-blur-2xl shadow-glow-lg"
      aria-labelledby="cta-heading"
    >
      {/* Background glow effects */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-brand/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="relative z-10 max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-xs font-bold text-brand">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Ready to Scale Your Online Reach?</span>
        </div>

        <h2 id="cta-heading" className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground font-heading leading-tight">
          Let&apos;s Build Your Brand&apos;s <span className="text-gradient">Next Growth Story</span>
        </h2>

        <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          From strategic social campaigns to high-converting content and actionable analytics, Raytronics delivers measurable digital growth.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
          <Button asChild variant="brand-glow" size="lg" className="w-full sm:w-auto text-base group">
            <Link href="/contact" className="flex items-center justify-center gap-2">
              <span>Book a Free Consultation</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button variant="glass" size="lg" asChild className="w-full sm:w-auto text-base">
            <Link href="/portfolio">Explore Recent Projects</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

