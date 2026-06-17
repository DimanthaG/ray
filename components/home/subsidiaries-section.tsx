"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { subsidiaries } from "@/lib/site-content"

export function SubsidiariesSection() {
  return (
    <section className="mb-16 md:mb-24" aria-labelledby="group-heading">
      <h2 id="group-heading" className="text-2xl font-semibold text-center mb-12">
        Part of Raytronics Group
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
        {subsidiaries.map((subsidiary) => {
          const isComingSoon = !subsidiary.href

          const card = (
            <motion.div
              whileHover={isComingSoon ? undefined : { scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`relative aspect-[3/2] flex flex-col items-center justify-center p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 transition-colors ${
                isComingSoon
                  ? "opacity-60"
                  : "hover:border-primary/50 cursor-pointer"
              }`}
            >
              <Image
                src={subsidiary.logo}
                alt={subsidiary.name}
                width={200}
                height={100}
                className="w-full h-auto object-contain"
                loading="lazy"
              />
              {isComingSoon && (
                <span className="mt-2 text-xs font-medium text-muted-foreground">Coming soon</span>
              )}
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
