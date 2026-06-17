"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import { homeFeatures } from "@/lib/site-content"

export function HeroSection() {
  return (
    <section
      className="relative text-center mb-16 md:mb-24 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-64 w-[min(100%,42rem)] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-24 -left-16 h-40 w-40 rounded-full bg-brand/10 blur-3xl" />
        <div className="absolute top-32 -right-16 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/70 backdrop-blur-sm px-4 py-1.5 text-sm text-muted-foreground mb-8"
      >
        <Sparkles className="h-4 w-4 text-primary" />
        <span>Part of the Raytronics Group</span>
      </motion.div>

      <h1
        id="hero-heading"
        className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-4xl mx-auto mb-6 leading-[1.1]"
      >
        Digital marketing and social media that{" "}
        <span className="text-brand">grow your brand</span>
      </h1>

      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
        Transforming your digital presence with cutting-edge social media marketing,
        strategy, and content—backed by the Raytronics Group.
      </p>

      <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-2xl mx-auto">
        {homeFeatures.map((feature) => (
          <span
            key={feature.title}
            className="rounded-full border border-border/50 bg-card/60 px-4 py-1.5 text-sm text-muted-foreground"
          >
            {feature.title}
          </span>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild size="lg" className="group">
          <Link href="/contact">
            Get started
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="/portfolio">View our work</Link>
        </Button>
      </div>
    </section>
  )
}
