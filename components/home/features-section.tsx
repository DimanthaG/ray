"use client"

import { motion } from "framer-motion"
import { LineChart, Sparkles, Target, ArrowRight } from "lucide-react"
import { homeFeatures } from "@/lib/site-content"
import Link from "next/link"

const icons = [Target, Sparkles, LineChart]
const stepNumbers = ["01", "02", "03"]

export function FeaturesSection() {
  return (
    <section className="mb-20 md:mb-28" aria-labelledby="services-heading">
      <div className="text-center mb-14 max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-brand px-3 py-1 rounded-full bg-brand/10 border border-brand/20">
          Core Capabilities
        </span>
        <h2 id="services-heading" className="text-3xl md:text-4xl font-bold font-heading">
          Strategic Services Built for Scale
        </h2>
        <p className="text-muted-foreground text-base leading-relaxed">
          Combining creative mastery, target audience analytics, and group-wide expertise to elevate your digital presence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {homeFeatures.map((feature, index) => {
          const Icon = icons[index] ?? LineChart
          return (
            <motion.article
              key={feature.title}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="group relative p-8 rounded-3xl bg-card/60 backdrop-blur-xl border border-border/50 hover:border-brand/50 shadow-sm hover:shadow-glow transition-all duration-300 flex flex-col justify-between"
            >
              {/* Top Card Bar */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand/20 to-cyan-500/20 text-brand group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <span className="text-xs font-mono font-bold text-muted-foreground/60 group-hover:text-brand transition-colors">
                    {stepNumbers[index]}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-heading text-foreground mb-3 group-hover:text-brand transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {feature.description}
                </p>
              </div>

              <div className="pt-4 border-t border-border/30">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-xs font-bold text-brand hover:text-brand-dark transition-colors group-hover:translate-x-1 duration-300"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}

