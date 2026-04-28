"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { siteConfig } from "@/app/metadata"

export function HeroSection() {
  return (
    <section className="text-center mb-16 md:mb-24" aria-labelledby="hero-heading">
      <div className="w-full max-w-2xl mx-auto mb-8">
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Image
            src={siteConfig.logoPath}
            alt={`${siteConfig.name} — digital marketing and social media`}
            width={600}
            height={200}
            className="w-full h-auto"
            priority
          />
        </motion.div>
      </div>
      <h1
        id="hero-heading"
        className="text-3xl md:text-4xl font-bold tracking-tight text-foreground max-w-3xl mx-auto mb-4"
      >
        Digital marketing and social media that grow your brand
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
        Transforming your digital presence with cutting-edge social media marketing, strategy, and
        content—backed by the Raytronics Group.
      </p>
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
