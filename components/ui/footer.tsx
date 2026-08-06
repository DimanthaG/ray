"use client"

import Image from "next/image"
import Link from "next/link"
import { siteConfig } from "@/app/metadata"
import { Mail, MapPin, ExternalLink, ArrowUpRight, ShieldCheck, Instagram, Facebook, Twitter } from "lucide-react"

const footerLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Contact Us", href: "/contact" },
]

const groupNetwork = [
  { name: "Ray Realty", href: "https://www.rayrealtysl.com/" },
  { name: "Ray Mart", href: "https://www.raymartsl.com/" },
  { name: "Ray Gems", href: "https://www.raygems.lk/" },
  { name: "Ray Edu", href: "#" },
  { name: "Ray Media", href: "#" },
]

const socialLinks = [
  { name: "Instagram", href: siteConfig.links.instagram, icon: Instagram },
  { name: "Facebook", href: siteConfig.links.facebook, icon: Facebook },
  { name: "Twitter", href: siteConfig.links.twitter, icon: Twitter },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-border/40 bg-card/40 backdrop-blur-xl overflow-hidden mt-16">
      {/* Background glowing gradient accents */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-80 w-[min(100%,50rem)] rounded-full bg-brand/10 blur-[100px]" />

      <div className="container mx-auto px-4 md:px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-5">
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

            <div className="flex items-center gap-3">
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
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-foreground tracking-wider uppercase">Navigation</h4>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
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
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-foreground tracking-wider uppercase">Group Network</h4>
            <ul className="space-y-2.5">
              {groupNetwork.map((item) => (
                <li key={item.name}>
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
                    <span className="text-sm text-muted-foreground/70 flex items-center gap-1.5">
                      <span>{item.name}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-muted text-muted-foreground font-mono">Group</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-foreground tracking-wider uppercase">Headquarters</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="mailto:lasa_ray@yahoo.com"
                  className="flex items-start gap-2.5 text-muted-foreground hover:text-brand transition-colors group"
                >
                  <Mail className="w-4 h-4 mt-0.5 shrink-0 text-brand" />
                  <span className="break-all">lasa_ray@yahoo.com</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-brand" />
                <address className="not-italic leading-relaxed">
                  86 Old Kottawa Rd,
                  <br />
                  Nugegoda, Sri Lanka
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

