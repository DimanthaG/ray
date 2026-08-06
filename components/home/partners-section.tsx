"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { partnerLogos } from "@/lib/site-content"
import { Award } from "lucide-react"

export function PartnersSection() {
  return (
    <section className="mb-20 md:mb-28" aria-labelledby="partners-heading">
      <div className="text-center mb-12 max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-xs font-bold text-brand">
          <Award className="w-3.5 h-3.5" />
          <span>Strategic Collaborations</span>
        </div>
        <h2 id="partners-heading" className="text-3xl md:text-4xl font-bold font-heading">
          RayEdu Educational Partners
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Partnering with international leaders to deliver world-class education technology, skill development, and academic opportunities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center max-w-5xl mx-auto">
        {partnerLogos.map((partner) => (
          <motion.div
            key={partner.id}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25 }}
            className={`relative aspect-[3/2] flex items-center justify-center p-6 rounded-3xl bg-card/60 backdrop-blur-xl border border-border/50 shadow-sm hover:border-brand/40 hover:shadow-glow transition-all duration-300 ${partner.className ?? ""}`}
          >
            <Image
              src={partner.src}
              alt={partner.alt}
              width={300}
              height={150}
              className="max-h-20 w-auto object-contain filter drop-shadow-sm transition-transform duration-300"
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

