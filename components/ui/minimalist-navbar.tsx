"use client"

import React, { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Home, Users, Image as ImageIcon, Mail, Menu as MenuIcon, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/app/metadata"
import { Button } from "@/components/ui/button"

interface NavItem {
  name: string
  href: string
  icon: React.ElementType
}

interface MinimalistNavbarProps {
  className?: string
}

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/"
  return pathname.startsWith(href)
}

export function MinimalistNavbar({ className }: MinimalistNavbarProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const items: NavItem[] = [
    { name: "Home", href: "/", icon: Home },
    { name: "About", href: "/about", icon: Users },
    { name: "Portfolio", href: "/portfolio", icon: ImageIcon },
    { name: "Contact", href: "/contact", icon: Mail },
  ]

  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), [])

  useEffect(() => {
    closeMobileMenu()
  }, [pathname, closeMobileMenu])

  useEffect(() => {
    if (!isMobileMenuOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobileMenu()
    }

    document.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [isMobileMenuOpen, closeMobileMenu])

  const linkClass = (href: string, mobile = false) =>
    cn(
      mobile ? "block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center" : "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative flex items-center",
      isActivePath(pathname, href)
        ? "text-brand bg-brand/10 backdrop-blur-sm"
        : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
    )

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-xl border-b border-border/30 shadow-sm supports-[backdrop-filter]:bg-background/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3 md:py-4">
          <Link href="/" className="flex items-center relative group shrink-0">
            <div className="absolute inset-0 bg-primary/10 rounded-xl filter blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
            <Image
              src={siteConfig.logoPath}
              alt={`${siteConfig.name} Logo`}
              width={800}
              height={200}
              className="h-[1.65rem] sm:h-[1.8rem] md:h-[2.1rem] w-auto relative z-10"
              priority
            />
          </Link>

          <div className="flex items-center gap-2">
            <nav className={cn("hidden md:block", className)}>
              <ul className="flex items-center space-x-1">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass(item.href)}>
                      <item.icon className="w-4 h-4 mr-2" />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <Button asChild variant="brand" size="sm" className="hidden md:inline-flex ml-2">
              <Link href="/contact">
                Get started
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>

            <button
              type="button"
              className="md:hidden relative px-3 py-2 rounded-lg text-foreground hover:text-brand transition-colors hover:bg-brand/10 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <MenuIcon size={24} />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden border-t border-border/30 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/30"
          >
            <nav className="container mx-auto px-4 py-4">
              <ul className="flex flex-col space-y-1">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass(item.href, true)} onClick={closeMobileMenu}>
                      <item.icon className="w-4 h-4 mr-2" />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
                <li className="pt-2">
                  <Button asChild variant="brand" className="w-full">
                    <Link href="/contact" onClick={closeMobileMenu}>
                      Get started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
