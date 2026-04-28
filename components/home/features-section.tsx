"use client"

import { motion } from "framer-motion"
import { LineChart, Sparkles, UsersRound } from "lucide-react"
import { homeFeatures } from "@/lib/site-content"

const icons = [LineChart, Sparkles, UsersRound]

export function FeaturesSection() {
  return (
    <section className="mb-16 md:mb-24" aria-labelledby="services-heading">
      <h2 id="services-heading" className="text-2xl md:text-3xl font-semibold text-center mb-4">
        What we deliver
      </h2>
      <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
        Strategy, creative, and measurement—so every campaign supports your business goals.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {homeFeatures.map((feature, index) => {
          const Icon = icons[index] ?? LineChart
          return (
            <motion.article
              key={feature.title}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="relative p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-colors"
            >
              <Icon className="h-8 w-8 text-primary mb-4" aria-hidden />
              <h3
                className={`text-xl font-semibold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent mb-3`}
              >
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}
