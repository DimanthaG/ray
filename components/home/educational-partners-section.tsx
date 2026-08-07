"use client"

import Image from "next/image"
import { Sparkles, GraduationCap, Award, Globe } from "lucide-react"

const educationalPartners = [
  {
    name: "ApplyBoard",
    description: "Global AI-powered university admissions & scholarship platform connecting students with 1,500+ institutions.",
    logo: "/logos/ApplyBoard-Logo-Blue-WEB-3.webp",
  },
  {
    name: "Skill Development Council Canada",
    description: "Canadian vocational certification, professional skill benchmarks & Canadian immigration pathways.",
    logo: "/logos/sdc_canada_logo_white.png",
  },
  {
    name: "Raytronics Institute Network",
    description: "Direct university articulation & corporate internship pathways backed by 30+ years of Raytronics heritage.",
    logo: "/logos/Raytronics Insitute.png",
  },
]

export function EducationalPartnersSection() {
  return (
    <section className="relative mb-16 md:mb-24 overflow-hidden rounded-3xl border border-brand/20 bg-card/60 p-8 sm:p-12 text-center backdrop-blur-xl shadow-sm">
      {/* Ambient lighting */}
      <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-48 w-96 rounded-full bg-brand/10 blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-xs font-bold text-brand">
            <GraduationCap className="h-4 w-4" />
            <span>RAYEDU GLOBAL PARTNERSHIPS</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-heading text-foreground">
            RayEdu <span className="text-gradient">Educational Partners</span>
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Collaborating with leading global admission networks, accreditation bodies, and international platforms to ensure seamless student success.
          </p>
        </div>

        {/* Partners Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {educationalPartners.map((partner, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/40 border border-border/50 backdrop-blur-md hover:border-brand/40 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="h-16 flex items-center justify-start">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={200}
                  height={60}
                  className="max-h-12 w-auto object-contain brightness-110"
                />
              </div>

              <div>
                <h3 className="text-base font-bold font-heading text-foreground">{partner.name}</h3>
                <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                  {partner.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
