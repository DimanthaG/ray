"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { GraduationCap, CheckCircle2, MessageCircle, Globe, Award } from "lucide-react"

export function CtaSection() {
  return (
    <section
      className="relative mb-20 md:mb-28 overflow-hidden rounded-3xl border border-brand/30 bg-gradient-to-br from-brand/15 via-card/80 to-cyan-500/10 p-8 sm:p-12 md:p-16 backdrop-blur-2xl shadow-glow-lg"
      aria-labelledby="institute-heading"
    >
      {/* Background glow effects */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-brand/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl" />

      {/* Raytronics Institute Logo */}
      <div className="relative z-10 flex justify-center mb-6">
        <Image
          src="/logos/Raytronics Insitute.png"
          alt="Raytronics Institute Logo"
          width={280}
          height={90}
          className="h-16 sm:h-20 w-auto object-contain filter drop-shadow-md"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-xs font-bold text-brand">
          <GraduationCap className="h-4 w-4" />
          <span>RAYTRONICS INSTITUTE • GLOBAL EDUCATION</span>
        </div>

        <h2 id="institute-heading" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground font-heading leading-tight">
          Your Pathway to <span className="text-gradient">World-Class Global Higher Education</span>
        </h2>

        <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
          Empowering Sri Lankan Students to Pursue International Degrees, Scholarships, and Global Career Opportunities Across Premier Destinations. Backed by over 30 years of trust, Raytronics Group (via Raytronics Institute) offers comprehensive guidance for students aiming to study abroad. Partnering with global platforms like ApplyBoard, Skill Development Council Canada, and leading universities, we provide end-to-end support—from university admission to visa processing and PR pathways.
        </p>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left pt-4 max-w-3xl mx-auto">
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-card/60 border border-border/50 backdrop-blur-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-foreground">Top Global Destinations</h4>
              <p className="text-xs text-muted-foreground mt-0.5">UK, Australia, Canada, Germany, Ireland &amp; USA.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-2xl bg-card/60 border border-border/50 backdrop-blur-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-foreground">Flexible Admissions</h4>
              <p className="text-xs text-muted-foreground mt-0.5">Options available With or Without IELTS (A/L Results Pending pathways included).</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-2xl bg-card/60 border border-border/50 backdrop-blur-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-foreground">Work &amp; Settle</h4>
              <p className="text-xs text-muted-foreground mt-0.5">Student Scholarships, Work While Studying, 3-Year Post-Study Work Permits, and PR Pathways.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-2xl bg-card/60 border border-border/50 backdrop-blur-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-foreground">Complete Assistance</h4>
              <p className="text-xs text-muted-foreground mt-0.5">Full Visa Guidance, Course Selection, and Settlement Support.</p>
            </div>
          </div>
        </div>

        {/* WhatsApp Inquiry Action */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Button asChild size="lg" className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg transition-all">
            <a
              href="https://wa.me/94705599167?text=Hi%20Raytronics%20Institute%2C%20I%20would%20like%20to%20inquire%20about%20global%20higher%20education%20pathways."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 text-base"
            >
              <MessageCircle className="w-5 h-5 text-white" />
              <span>Inquire on WhatsApp</span>
            </a>
          </Button>

          <Button variant="outline" size="lg" asChild className="w-full sm:w-auto rounded-xl">
            <Link href="/institute">Explore Raytronics Institute</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
