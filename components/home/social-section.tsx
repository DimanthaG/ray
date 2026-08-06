"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Facebook, Instagram, Share2 } from "lucide-react"
import { siteConfig } from "@/app/metadata"

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

const items = [
  { href: siteConfig.links.facebook, label: "Facebook", Icon: Facebook, handle: "@raytronics" },
  { href: siteConfig.links.instagram, label: "Instagram", Icon: Instagram, handle: "@raytronics" },
  { href: siteConfig.links.twitter, label: "X (Twitter)", Icon: XIcon, handle: "@raytronics" },
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

