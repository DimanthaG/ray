"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Mail, Phone } from "lucide-react"
import mockAgents from "@/sampledata/mockAgents"

export default function AboutContent() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Meet Our <span className="text-brand">Team</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get to know the talented individuals behind our stunning visuals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockAgents.map((agent, index) => (
            <motion.article
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group overflow-hidden rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-colors"
            >
              <div className="aspect-[4/5] relative overflow-hidden">
                <Image
                  src={agent.imageUrl}
                  alt={agent.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-1">{agent.name}</h3>
                <p className="text-brand font-medium mb-3">{agent.specialty}</p>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{agent.describe}</p>
                <div className="flex flex-col space-y-2 text-sm">
                  <a
                    href={`mailto:${agent.email}`}
                    className="flex items-center gap-2 text-muted-foreground hover:text-brand transition-colors"
                  >
                    <Mail className="w-4 h-4 shrink-0" />
                    {agent.email}
                  </a>
                  <a
                    href={`tel:${agent.phone}`}
                    className="flex items-center gap-2 text-muted-foreground hover:text-brand transition-colors"
                  >
                    <Phone className="w-4 h-4 shrink-0" />
                    {agent.phone}
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

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
