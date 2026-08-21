"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Mail, Phone, MapPin, Sparkles, Building2, ExternalLink, Linkedin } from "lucide-react"
import mockAgents from "@/sampledata/mockAgents"
import { Button } from "@/components/ui/button"

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=86+Old+Kottawa+Rd+Nugegoda+Sri+Lanka"

export default function AboutContent() {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden py-12 md:py-20">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[30rem] w-[min(100%,60rem)] bg-gradient-to-tr from-brand/20 via-cyan-500/15 to-indigo-600/10 blur-[130px]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 space-y-20">
        {/* Header & Vision Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-xs font-bold text-brand">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Raytronics Group Excellence</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-heading text-foreground tracking-tight">
            About <span className="text-gradient">Raytronics Group</span>
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            A multi-faceted business group combining 30+ years of heritage across digital marketing, precious gemstones, prime real estate, e-commerce, and professional tech education.
          </p>
        </motion.div>

        {/* Group History & Legacy Section */}
        <section id="history" className="scroll-mt-24 max-w-5xl mx-auto rounded-3xl bg-card/60 border border-border/50 backdrop-blur-xl p-8 sm:p-12 shadow-sm space-y-6 text-center">
          {/* Raytronics Group Logo */}
          <div className="flex items-center justify-center gap-2.5 mb-2">
            <Image
              src="/logos/06.svg"
              alt="Raytronics Group Logo"
              width={240}
              height={80}
              className="h-12 sm:h-16 w-auto object-contain filter drop-shadow-sm"
            />
            <span className="text-xs sm:text-sm font-black tracking-widest uppercase text-brand bg-brand/10 border border-brand/20 px-3 py-1 rounded-lg shadow-sm">
              GROUP
            </span>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-xs font-bold text-brand">
            <Building2 className="w-3.5 h-3.5" />
            <span>30+ YEARS OF EXCELLENCE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-foreground">
            A Legacy of Trust, Innovation &amp; Diversified Growth
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Established in 1993, Raytronics Group has evolved over three decades from an IT pioneer into one of Sri Lanka’s dynamic multi-sector conglomerates. Built on an unyielding foundation of integrity, quality, and forward-thinking vision, we drive growth across international gem trade, prime real estate, retail e-commerce, and global education pathways—connecting Sri Lankan potential with global opportunities.
          </p>

          {/* <div className="flex justify-center pt-2">
            <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg transition-all">
              <a
                href="https://wa.me/94705599167?text=Hi%20Raytronics%2C%20I%20would%20like%20to%20inquire."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 text-base"
              >
                <span>Inquire on WhatsApp (+94 70 559 9167)</span>
              </a>
            </Button>
          </div> */}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-border/40 text-center">
            <div className="p-4 rounded-2xl bg-brand/5 border border-brand/10">
              <div className="text-2xl font-extrabold text-brand font-heading">30+</div>
              <div className="text-xs text-muted-foreground">Years Experience</div>
            </div>
            <div className="p-4 rounded-2xl bg-brand/5 border border-brand/10">
              <div className="text-2xl font-extrabold text-brand font-heading">5+</div>
              <div className="text-xs text-muted-foreground">Group Companies</div>
            </div>
            <div className="p-4 rounded-2xl bg-brand/5 border border-brand/10">
              <div className="text-2xl font-extrabold text-brand font-heading">10K+</div>
              <div className="text-xs text-muted-foreground">Global Clients</div>
            </div>
            <div className="p-4 rounded-2xl bg-brand/5 border border-brand/10">
              <div className="text-2xl font-extrabold text-brand font-heading">Global</div>
              <div className="text-xs text-muted-foreground">Trade Network</div>
            </div>
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section id="vision-mission" className="scroll-mt-24 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-card/60 border border-border/50 backdrop-blur-xl shadow-sm space-y-4">
            <h3 className="text-2xl font-bold font-heading text-brand">Our Vision</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              To be a premier, highly trusted Sri Lankan conglomerate that bridges local excellence with global markets—empowering industries, international gemstone collectors, real estate investors, and students through world-class quality, operational integrity, and modern innovation. 
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-card/60 border border-border/50 backdrop-blur-xl shadow-sm space-y-4">
            <h3 className="text-2xl font-bold font-heading text-brand">Our Mission</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Delivering uncompromised excellence across all group sectors by offering ethically sourced certified Ceylon gemstones, value-driven property developments, accessible global education pathways, and seamless retail tech solutions, while fostering sustainable, long-term trade relationships globally. 
            </p>
          </div>
        </section>

        {/* Leadership & Board of Directors Section */}
        <section id="leadership" className="scroll-mt-24 space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold font-heading text-foreground">Board of Directors & Leadership</h2>
            <p className="text-sm text-muted-foreground">
              Guiding Raytronics Group towards global expansion and operational perfection.
            </p>
          </div>

          {/* Team Grid with Circular Portrait Layout (3x2 Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {mockAgents.map((agent: any, index: number) => (
              <motion.article
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group overflow-hidden rounded-3xl bg-card/70 border border-border/60 hover:border-[#000842] backdrop-blur-xl p-6 shadow-sm hover:shadow-glow transition-all duration-300 flex flex-col justify-between items-center text-center"
              >
                <div className="w-full flex flex-col items-center">
                  {/* Circular Avatar Container with #000842 Border Ring */}
                  <div className="relative w-44 h-44 rounded-full border-2 border-[#000842] p-1 bg-card/80 shadow-lg group-hover:scale-105 transition-transform duration-500 overflow-hidden shrink-0">
                    <div className="relative w-full h-full rounded-full overflow-hidden">
                      <Image
                        src={agent.imageUrl}
                        alt={agent.name}
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                  </div>

                  {/* Director Info */}
                  <div className="mt-5 space-y-1">
                    <h3 className="text-xl font-extrabold font-heading text-foreground leading-snug">
                      {agent.name}
                    </h3>
                    <p className="text-xs font-bold text-[#000842] dark:text-cyan-400 tracking-wider uppercase">
                      {agent.specialty}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-muted-foreground leading-relaxed mt-4 text-center">
                    {agent.describe}
                  </p>
                </div>

                {/* Contact Actions */}
                <div className="w-full pt-4 mt-6 border-t border-border/30 space-y-2 text-xs">
                  <a
                    href={`mailto:${agent.email}`}
                    className="flex items-center justify-center gap-2 text-muted-foreground hover:text-[#000842] dark:hover:text-cyan-400 font-medium transition-colors"
                  >
                    <div className="p-1.5 rounded-lg bg-[#000842]/10 dark:bg-cyan-500/10 text-[#000842] dark:text-cyan-400">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    <span className="break-all">{agent.email}</span>
                  </a>
                  <a
                    href={`tel:${agent.phone}`}
                    className="flex items-center justify-center gap-2 text-muted-foreground hover:text-[#000842] dark:hover:text-cyan-400 font-medium transition-colors"
                  >
                    <div className="p-1.5 rounded-lg bg-[#000842]/10 dark:bg-cyan-500/10 text-[#000842] dark:text-cyan-400">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                    <span>{agent.phone}</span>
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

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
            <h2 className="text-2xl sm:text-3xl font-bold font-heading">Raytronics Group Office</h2>
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

