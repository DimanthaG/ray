"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { partnerLogos } from "@/lib/site-content"

export function PartnersSection() {
  return (
    <section className="mb-16 md:mb-24" aria-labelledby="partners-heading">
      <h2 id="partners-heading" className="text-2xl font-semibold text-center mb-4">
        RayEdu partnerships
      </h2>
      <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
        RayEdu partners with leading organizations to provide exceptional educational opportunities
        and support.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
        {partnerLogos.map((partner) => (
          <motion.div
            key={partner.id}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`relative aspect-[3/2] flex items-center justify-center p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-colors ${partner.className ?? ""}`}
          >
            <Image
              src={partner.src}
              alt={partner.alt}
              width={300}
              height={150}
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
