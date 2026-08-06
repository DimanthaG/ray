"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Facebook, Instagram, Linkedin, Share2 } from "lucide-react"
import { siteConfig } from "@/app/metadata"

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M16.6 5.82c-.9-.9-1.36-2-1.5-3.24V2h-3.4v13.4a2.6 2.6 0 1 1-1.84-2.49v-3.5a5.99 5.99 0 0 0-1.16-.11 6 6 0 1 0 6 6V8.1a8.4 8.4 0 0 0 4.9 1.57V6.27a5.1 5.1 0 0 1-3-.45Z" />
    </svg>
  )
}

const items = [
  { href: siteConfig.links.instagram, label: "Instagram", Icon: Instagram, handle: "@raytronics_lanka" },
  { href: siteConfig.links.tiktok, label: "TikTok", Icon: TikTokIcon, handle: "@raytronics_sl" },
  { href: siteConfig.links.facebook, label: "Facebook", Icon: Facebook, handle: "@raytronics" },
  { href: siteConfig.links.linkedin, label: "LinkedIn", Icon: Linkedin, handle: "Raytronics Group" },
] as const

export function SocialSection() {
  return (
    <section className="pb-12" aria-labelledby="social-heading">
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">
          <Share2 className="w-3.5 h-3.5 text-brand" />
          <span>Connect With Us</span>
        </span>
      </div>

      <nav
        className="flex flex-wrap justify-center items-center gap-4 max-w-2xl mx-auto"
        aria-label="Social media links"
      >
        {items.map(({ href, label, Icon, handle }) => (
          <Link
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${siteConfig.name} on ${label}`}
            className="group"
          >
            <motion.div
              whileHover={{ y: -2 }}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50 shadow-sm hover:border-brand/40 hover:bg-card/90 transition-all duration-300"
            >
              <div className="p-2 rounded-xl bg-brand/10 text-brand group-hover:bg-brand group-hover:text-white transition-colors duration-300">
                <Icon className="h-4 w-4" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-foreground">{label}</div>
                <div className="text-[11px] text-muted-foreground">{handle}</div>
              </div>
            </motion.div>
          </Link>
        ))}
      </nav>
    </section>
  )
}

