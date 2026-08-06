"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Mail, Phone, MapPin, Sparkles, Building2, ExternalLink } from "lucide-react"
import mockAgents from "@/sampledata/mockAgents"
import { Button } from "@/components/ui/button"

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=86+Old+Kottawa+Rd+Nugegoda+Sri+Lanka"

export default function AboutContent() {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden py-12 md:py-20">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[30rem] w-[min(100%,60rem)] bg-gradient-to-tr from-brand/20 via-cyan-500/15 to-indigo-600/10 blur-[130px]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 space-y-4 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-xs font-bold text-brand">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Raytronics Leadership & Strategists</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-heading text-foreground tracking-tight">
            Meet the Minds Behind <span className="text-gradient">Our Success</span>
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            A passionate collective of digital strategists, content creators, and brand directors shaping the future of online engagement across the Raytronics Group.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {mockAgents.map((agent, index) => (
            <motion.article
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group overflow-hidden rounded-3xl bg-card/60 border border-border/50 hover:border-brand/50 backdrop-blur-xl shadow-sm hover:shadow-glow transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[4/5] relative overflow-hidden bg-muted/40">
                  <Image
                    src={agent.imageUrl}
                    alt={agent.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-brand/90 backdrop-blur-md text-white text-xs font-bold shadow-sm mb-1">
                      {agent.specialty}
                    </span>
                    <h3 className="text-2xl font-bold font-heading text-white">{agent.name}</h3>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {agent.describe}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-border/30 space-y-2 text-xs">
                <a
                  href={`mailto:${agent.email}`}
                  className="flex items-center gap-2.5 text-muted-foreground hover:text-brand font-medium transition-colors"
                >
                  <div className="p-1.5 rounded-lg bg-brand/10 text-brand">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <span className="break-all">{agent.email}</span>
                </a>
                <a
                  href={`tel:${agent.phone}`}
                  className="flex items-center gap-2.5 text-muted-foreground hover:text-brand font-medium transition-colors"
                >
                  <div className="p-1.5 rounded-lg bg-brand/10 text-brand">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <span>{agent.phone}</span>
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Corporate Headquarters Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20 max-w-4xl mx-auto rounded-3xl border border-brand/20 bg-card/60 backdrop-blur-xl p-8 sm:p-10 shadow-sm text-center relative overflow-hidden"
        >
          <div className="pointer-events-none absolute -right-20 -bottom-20 h-56 w-56 rounded-full bg-brand/10 blur-3xl" />

          <div className="relative z-10 flex flex-col items-center justify-center space-y-4">
            <div className="p-3 rounded-2xl bg-brand/10 text-brand">
              <Building2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading">Raytronics Group Headquarters</h2>
            <address className="text-sm text-muted-foreground not-italic leading-relaxed max-w-md">
              86 Old Kottawa Rd,<br />
              Nugegoda, Sri Lanka
            </address>

            <Button asChild variant="outline" size="sm" className="mt-2">
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-semibold"
              >
                <MapPin className="w-4 h-4 text-brand" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

