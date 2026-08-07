"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Building2 } from "lucide-react"
import { subsidiaries } from "@/lib/site-content"

export function SubsidiariesSection() {
  return (
    <section className="mb-20 md:mb-28" aria-labelledby="group-heading">
      <div className="text-center mb-14 max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-xs font-bold text-brand">
          <Building2 className="w-3.5 h-3.5" />
          <span>Raytronics Group Portfolio</span>
        </div>
        <h2 id="group-heading" className="text-3xl md:text-4xl font-bold font-heading">
          Our Group Companies & Ventures
        </h2>
        <p className="text-sm text-muted-foreground">
          Raytronics operates across real estate, e-commerce, education, and venture capital.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 items-center max-w-6xl mx-auto">
        {subsidiaries.map((subsidiary) => {
          const isComingSoon = !subsidiary.href

          const card = (
            <motion.div
              whileHover={isComingSoon ? undefined : { y: -4 }}
              transition={{ duration: 0.25 }}
              className={`group relative flex flex-col items-center justify-between p-6 rounded-3xl bg-card/80 backdrop-blur-xl border border-border/60 shadow-sm transition-all duration-300 min-h-[160px] ${
                isComingSoon
                  ? "opacity-60"
                  : "hover:border-brand/50 hover:shadow-glow hover:bg-card cursor-pointer"
              }`}
            >
              <div className="relative w-full h-20 overflow-hidden flex items-center justify-center">
                <Image
                  src={subsidiary.logo}
                  alt={subsidiary.name}
                  width={200}
                  height={100}
                  className="h-20 w-auto object-contain scale-[2.2] transition-transform duration-300 group-hover:scale-[2.4]"
                  loading="lazy"
                />
              </div>

              <div className="mt-4 flex items-center gap-1.5 pt-2 border-t border-border/30 w-full justify-center">
                <span className="text-xs font-bold text-foreground">{subsidiary.name}</span>
                {subsidiary.href ? (
                  <ExternalLink className="w-3.5 h-3.5 text-brand" />
                ) : (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">Group</span>
                )}
              </div>
            </motion.div>
          )

          if (subsidiary.href) {
            return (
              <Link
                key={subsidiary.id}
                href={subsidiary.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {card}
              </Link>
            )
          }

          return <div key={subsidiary.id}>{card}</div>
        })}
      </div>
    </section>
  )
}

