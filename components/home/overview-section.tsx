"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Building2, Award, ShieldCheck, Globe2 } from "lucide-react"

export function OverviewSection() {
  return (
    <section className="relative mb-16 md:mb-24 overflow-hidden rounded-3xl border border-brand/20 bg-card/60 p-8 sm:p-12 md:p-14 text-center backdrop-blur-xl shadow-sm">
      {/* Glow Effects */}
      <div className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-brand/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-cyan-500/15 blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto space-y-6">
        {/* Raytronics Group Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-2">
          <Image
            src="/logos/06.svg"
            alt="Raytronics Group Logo"
            width={240}
            height={80}
            className="h-12 sm:h-16 w-auto object-contain filter drop-shadow-sm"
          />
          <span className="text-xs sm:text-sm font-black tracking-widest uppercase text-brand bg-brand/10 border border-brand/20 px-3 py-1 rounded-lg shadow-sm">
            GROUP
          </span>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-xs font-bold text-brand">
          <Building2 className="h-3.5 w-3.5" />
          <span>30+ YEARS OF EXCELLENCE</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-foreground leading-tight tracking-tight">
          A Legacy of Trust, Innovation &amp; <span className="text-gradient">Diversified Growth</span>
        </h2>

        <p className="text-muted-foreground text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
          Established in 1993, Raytronics Group has evolved over three decades from an IT pioneer into one of Sri Lanka’s dynamic multi-sector conglomerates. Built on an unyielding foundation of integrity, quality, and forward-thinking vision, we drive growth across international gem trade, prime real estate, retail e-commerce, and global education pathways—connecting Sri Lankan potential with global opportunities.
        </p>

        {/* Counter highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-border/40 text-center">
          <div className="p-4 rounded-2xl bg-brand/5 border border-brand/10">
            <div className="text-2xl sm:text-3xl font-extrabold text-brand font-heading">30+</div>
            <div className="text-xs text-muted-foreground font-medium mt-1">Years Experience</div>
          </div>
          <div className="p-4 rounded-2xl bg-brand/5 border border-brand/10">
            <div className="text-2xl sm:text-3xl font-extrabold text-brand font-heading">5+</div>
            <div className="text-xs text-muted-foreground font-medium mt-1">Group Companies</div>
          </div>
          <div className="p-4 rounded-2xl bg-brand/5 border border-brand/10">
            <div className="text-2xl sm:text-3xl font-extrabold text-brand font-heading">10K+</div>
            <div className="text-xs text-muted-foreground font-medium mt-1">Global Clients</div>
          </div>
          <div className="p-4 rounded-2xl bg-brand/5 border border-brand/10">
            <div className="text-2xl sm:text-3xl font-extrabold text-brand font-heading">Global</div>
            <div className="text-xs text-muted-foreground font-medium mt-1">Trade Network</div>
          </div>
        </div>
      </div>
    </section>
  )
}
