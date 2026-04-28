"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Facebook, Instagram } from "lucide-react"
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
  { href: siteConfig.links.facebook, label: "Facebook", Icon: Facebook, hover: "#1877f2" },
  { href: siteConfig.links.twitter, label: "X (Twitter)", Icon: XIcon, hover: "#0f1419" },
  { href: siteConfig.links.instagram, label: "Instagram", Icon: Instagram, hover: "#e4405f" },
] as const

export function SocialSection() {
  return (
    <section className="pb-8" aria-labelledby="social-heading">
      <h2 id="social-heading" className="sr-only">
        Follow Raytronics
      </h2>
      <nav
        className="flex justify-center items-center gap-8 text-muted-foreground"
        aria-label="Social media"
      >
        {items.map(({ href, label, Icon, hover }) => (
          <Link
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={`${siteConfig.name} on ${label}`}
          >
            <motion.div whileHover={{ scale: 1.15, color: hover }} className="p-2">
              <Icon className="h-6 w-6" />
            </motion.div>
          </Link>
        ))}
      </nav>
    </section>
  )
}
