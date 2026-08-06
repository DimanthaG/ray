"use client"

import React, { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Home, Users, Image as ImageIcon, Mail, Menu as MenuIcon, X as CloseIcon, ArrowRight, Sparkles } from "lucide-react"
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
  const [scrolled, setScrolled] = useState(false)

  const items: NavItem[] = [
    { name: "Home", href: "/", icon: Home },
    { name: "About", href: "/about", icon: Users },
    // { name: "Portfolio", href: "/portfolio", icon: ImageIcon },
    { name: "Contact", href: "/contact", icon: Mail },
  ]

  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3.5 md:py-4",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/40 shadow-glass-dark"
          : "bg-background/40 backdrop-blur-md border-b border-border/20"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo & Brand Pill */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center relative group shrink-0">
              <div className="absolute -inset-2 bg-gradient-to-r from-brand/20 via-cyan-500/20 to-brand/10 rounded-2xl filter blur-lg transition-all duration-500 opacity-0 group-hover:opacity-100" />
              <Image
                src={siteConfig.logoPath}
                alt={`${siteConfig.name} Logo`}
                width={800}
                height={200}
                className="h-[1.75rem] sm:h-[2rem] md:h-[2.25rem] w-auto relative z-10 drop-shadow-sm transition-transform duration-300 group-hover:scale-[1.02]"
                priority
              />
            </Link>

            {/* <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-[11px] font-medium text-brand">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Raytronics Group Network</span>
            </div> */}
          </div>

          {/* Desktop Navigation */}
          <div className="flex items-center gap-3">
            <nav className={cn("hidden md:block", className)}>
              <ul className="flex items-center space-x-1 p-1.5 rounded-2xl bg-card/60 border border-border/40 backdrop-blur-lg shadow-sm">
                {items.map((item) => {
                  const active = isActivePath(pathname, item.href)
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "relative px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2",
                          active
                            ? "text-white bg-brand shadow-md shadow-brand/25"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                        )}
                      >
                        <item.icon className={cn("w-3.5 h-3.5", active ? "text-white" : "text-muted-foreground")} />
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>

            <Button asChild variant="brand-glow" size="sm" className="hidden md:inline-flex shadow-glow">
              <Link href="/contact" className="flex items-center gap-1.5">
                <span>Get Started</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            {/* Mobile menu trigger */}
            <button
              type="button"
              className="md:hidden relative p-2.5 rounded-xl border border-border/40 bg-card/60 text-foreground hover:text-brand hover:bg-accent/50 backdrop-blur-md transition-all"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t border-border/40 bg-background/95 backdrop-blur-2xl"
          >
            <nav className="container mx-auto px-4 py-6 space-y-4">
              <div className="flex items-center justify-between px-2 pb-2 border-b border-border/30">
                <span className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">Menu</span>
                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-500 font-medium bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Raytronics Group
                </span>
              </div>

              <ul className="flex flex-col space-y-1.5">
                {items.map((item) => {
                  const active = isActivePath(pathname, item.href)
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "px-4 py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-between",
                          active
                            ? "bg-brand text-white shadow-md shadow-brand/25"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent/40"
                        )}
                        onClick={closeMobileMenu}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className={cn("w-4 h-4", active ? "text-white" : "text-muted-foreground")} />
                          <span>{item.name}</span>
                        </div>
                        {active && <Sparkles className="w-4 h-4 text-white" />}
                      </Link>
                    </li>
                  )
                })}
              </ul>

              <div className="pt-2">
                <Button asChild variant="brand-glow" className="w-full justify-center">
                  <Link href="/contact" onClick={closeMobileMenu}>
                    Get Started Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

