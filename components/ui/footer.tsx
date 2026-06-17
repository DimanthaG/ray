"use client"

import Image from "next/image"
import Link from "next/link"
import { siteConfig } from "@/app/metadata"
import { Mail, MapPin, ExternalLink } from "lucide-react"

const footerLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Contact", href: "/contact" },
]

const socialLinks = [
  { name: "Instagram", href: siteConfig.links.instagram },
  { name: "Facebook", href: siteConfig.links.facebook },
  { name: "Twitter", href: siteConfig.links.twitter },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border/30 bg-muted/20">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src={siteConfig.logoPath}
                alt={`${siteConfig.name} Logo`}
                width={1202}
                height={286}
                className="h-10 md:h-12 w-auto"
              />
            </Link>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Quick links</h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Contact</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:lasa_ray@yahoo.com"
                  className="flex items-start gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group"
                >
                  <Mail className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                  <span>lasa_ray@yahoo.com</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                <address className="not-italic leading-relaxed">
                  330/08, Saman Mawatha
                  <br />
                  Lake Road, Boralesgamuwa
                </address>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-muted-foreground">
          <p>© {year} {siteConfig.name}. All rights reserved.</p>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>
              Developed by{" "}
              <Link
                href="https://codavra.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary hover:underline"
              >
                Codavra
                <ExternalLink className="w-3 h-3" />
              </Link>
            </span>
            <span className="hidden sm:inline text-border">|</span>
            <a href="mailto:info@codavra.com" className="hover:text-primary transition-colors">
              info@codavra.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
