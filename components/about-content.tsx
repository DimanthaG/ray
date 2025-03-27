"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import mockAgents from "@/sampledata/mockAgents"

export default function AboutContent() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 mb-6">
            Meet Our Team
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get to know the talented individuals behind our stunning visuals.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockAgents.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-colors"
            >
              <div className="aspect-[4/5] relative overflow-hidden">
                <Image
                  src={agent.imageUrl}
                  alt={agent.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-semibold text-black mb-1">{agent.name}</h3>
                <p className="text-primary font-medium mb-2">{agent.specialty}</p>
                <p className="text-sm text-black/80 mb-4">{agent.describe}</p>
                <div className="flex flex-col space-y-2 text-sm">
                  <a 
                    href={`mailto:${agent.email}`}
                    className="text-black/80 hover:text-white transition-colors"
                  >
                    {agent.email}
                  </a>
                  <a 
                    href={`tel:${agent.phone}`}
                    className="text-black/80 hover:text-white transition-colors"
                  >
                    {agent.phone}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Company Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-24 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Part of the Raytronics Group</h2>
          <address className="text-muted-foreground not-italic">
            330/08, Saman Mawatha<br />
            Lake Road<br />
            Boralesgamuwa
          </address>
        </motion.div>
      </div>
    </div>
  )
} 