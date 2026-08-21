"use client"

import Image from "next/image"
import Link from "next/link"
import { siteConfig } from "@/app/metadata"
import { Mail, MapPin, ExternalLink, ArrowUpRight, ShieldCheck, Instagram, Facebook } from "lucide-react"

const footerLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Trade Exhibitions", href: "/register-trade-expo" },
  { name: "Raytronics Institute", href: "/institute" },
  { name: "Media & Updates", href: "/media" },
  { name: "Contact Us", href: "/contact" },
]

const groupNetwork = [
  { name: "Ray Gems & Jewelry", href: "https://www.raygems.lk/" },
  { name: "Ray Realty (Real Estate)", href: "https://www.rayrealtysl.com/" },
  { name: "Ray Mart (E-commerce)", href: "https://www.raymartsl.com/" },
  { name: "Raytronics Institute", href: "/institute" },
  { name: "Media & Press", href: "/media" },
]

// lucide-react doesn't ship a TikTok glyph, so it's defined here as a small inline icon
// that matches the stroke-based style of the other lucide icons used above.
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

const socialLinks = [
  { name: "Instagram", href: siteConfig.links.instagram, icon: Instagram },
  { name: "Facebook", href: siteConfig.links.facebook, icon: Facebook },
  { name: "TikTok", href: siteConfig.links.tiktok, icon: TikTokIcon },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-border/40 bg-card/40 backdrop-blur-xl overflow-hidden mt-16">
      {/* Background glowing gradient accents */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-80 w-[min(100%,50rem)] rounded-full bg-brand/10 blur-[100px]" />

      <div className="container mx-auto px-4 md:px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 text-center md:text-left">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-5 flex flex-col items-center md:items-start">
            <Link href="/" className="inline-block group">
              <Image
                src={siteConfig.logoPath}
                alt={`${siteConfig.name} Logo`}
                width={1202}
                height={286}
                className="h-7 md:h-[2rem] w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              {siteConfig.description}
            </p>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl border border-border/50 bg-background/60 text-muted-foreground hover:text-brand hover:border-brand/40 hover:bg-brand/10 transition-all duration-300 shadow-sm"
                    aria-label={social.name}
                  >
                    <IconComponent className="w-4 h-4" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4 flex flex-col items-center md:items-start">
            <h4 className="text-xs font-bold text-foreground tracking-wider uppercase">Navigation</h4>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href} className="text-center md:text-left">
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-brand transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Raytronics Group Network */}
          <div className="space-y-4 flex flex-col items-center md:items-start">
            <h4 className="text-xs font-bold text-foreground tracking-wider uppercase">Group Network</h4>
            <ul className="space-y-2.5">
              {groupNetwork.map((item) => (
                <li key={item.name} className="text-center md:text-left">
                  {item.href !== "#" ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-brand transition-colors inline-flex items-center gap-1 group"
                    >
                      <span>{item.name}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ) : (
                    <span className="text-sm text-muted-foreground/70 flex items-center gap-1.5 justify-center md:justify-start">
                      <span>{item.name}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-muted text-muted-foreground font-mono">Group</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4 flex flex-col items-center md:items-start">
            <h4 className="text-xs font-bold text-foreground tracking-wider uppercase">Contact Us</h4>
            <ul className="space-y-3 text-xs md:text-sm">
              <li className="space-y-1.5">
                <a
                  href="mailto:sales@raytronics.lk"
                  className="flex items-center gap-2 text-muted-foreground hover:text-brand transition-colors group justify-center md:justify-start text-xs"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0 text-brand" />
                  <span className="break-all font-medium">sales@raytronics.lk</span>
                </a>
                <a
                  href="mailto:raytronicslanka@gmail.com"
                  className="flex items-center gap-2 text-muted-foreground hover:text-brand transition-colors group justify-center md:justify-start text-xs"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0 text-brand" />
                  <span className="break-all font-medium">raytronicslanka@gmail.com</span>
                </a>
              </li>
              <li className="space-y-1 pt-1 text-xs border-t border-border/30">
                <a href="tel:+94112813808" className="flex items-center gap-1.5 text-muted-foreground hover:text-brand transition-colors justify-center md:justify-start">
                  <span className="font-semibold text-foreground">Office:</span> 011 281 3808
                </a>
                <a href="tel:+94714727527" className="flex items-center gap-1.5 text-muted-foreground hover:text-brand transition-colors justify-center md:justify-start">
                  <span className="font-semibold text-foreground">Exhibitions & RayGems:</span> 071 472 7527
                </a>
                <a href="tel:+94705599167" className="flex items-center gap-1.5 text-muted-foreground hover:text-brand transition-colors justify-center md:justify-start">
                  <span className="font-semibold text-foreground">Global Education:</span> 070 559 9167
                </a>
                <a href="tel:+94777788275" className="flex items-center gap-1.5 text-muted-foreground hover:text-brand transition-colors justify-center md:justify-start">
                  <span className="font-semibold text-foreground">RayMart:</span> 077 778 8275
                </a>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground justify-center md:justify-start pt-1 text-xs border-t border-border/30">
                <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-brand" />
                <address className="not-italic leading-relaxed text-center md:text-left">
                  86 Old Kottawa Rd, Nugegoda, Sri Lanka
                </address>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-border/40 flex flex-col items-center gap-4 text-xs text-muted-foreground text-center">
          <div className="flex items-center gap-2 justify-center">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <p>© {year} {siteConfig.name} Group. All rights reserved.</p>
          </div>
          
          {/* <div className="flex items-center gap-4">
            <span>
              Developed by{" "}
              <Link
                href="https://codavra.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-foreground hover:text-brand transition-colors inline-flex items-center gap-1"
              >
                Codavra
                <ExternalLink className="w-3 h-3" />
              </Link>
            </span>
          </div> */}
        </div>
      </div>
    </footer>
  )
}