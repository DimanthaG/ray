"use client"

import React, { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  Home,
  Users,
  Building2,
  Mail,
  Menu as MenuIcon,
  X as CloseIcon,
  ChevronDown,
  Sparkles,
  History,
  Target,
  UserCheck,
  Gem,
  ShoppingBag,
  GraduationCap,
  Calendar,
  Newspaper,
  ExternalLink,
  Briefcase,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/app/metadata"

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

  // Dropdown states for Desktop
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Mobile dropdown state
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false)
  const [mobileBusinessesOpen, setMobileBusinessesOpen] = useState(false)

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
    setMobileAboutOpen(false)
    setMobileBusinessesOpen(false)
  }, [])

  const handleMouseEnter = (name: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current)
    setActiveDropdown(name)
  }

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    closeMobileMenu()
    setActiveDropdown(null)
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

  const aboutDropdownItems = [
    {
      name: "Group History & Legacy (30+ Years)",
      href: "/about#history",
      icon: History,
      description: "Over three decades of corporate excellence",
    },
    {
      name: "Board of Directors & Our Leadership",
      href: "/about#leadership",
      icon: UserCheck,
      description: "Meet our executive management & team",
    },
    {
      name: "Vision & Mission",
      href: "/about#vision-mission",
      icon: Target,
      description: "Our core values & future roadmap",
    },
  ]

  const businessDropdownItems = [
    {
      name: "Ray Gems & Jewelry",
      href: "https://www.raygems.lk/",
      icon: Gem,
      description: "Certified Ceylon Precious Gemstones & Fine Jewelry",
      isExternal: true,
    },
    {
      name: "Ray Realty (Real Estate)",
      href: "https://www.rayrealtysl.com/",
      icon: Building2,
      description: "Prime Real Estate Development & Investment",
      isExternal: true,
    },
    {
      name: "Ray Mart (E-commerce)",
      href: "https://www.raymartsl.com/",
      icon: ShoppingBag,
      description: "Global Retail & Online Shopping Network",
      isExternal: true,
    },
    {
      name: "Raytronics Institute",
      href: "/institute",
      icon: GraduationCap,
      description: "Digital Marketing, Tech & Professional Academy",
      isExternal: false,
    },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 md:py-3.5",
        scrolled
          ? "bg-background/85 backdrop-blur-2xl border-b border-border/50 shadow-glass-dark"
          : "bg-background/50 backdrop-blur-xl border-b border-border/20"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
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
          </div>

          {/* Desktop Navigation */}
          <nav className={cn("hidden md:block", className)}>
            <ul className="flex items-center space-x-1 p-1.5 rounded-2xl bg-card/70 border border-border/40 backdrop-blur-lg shadow-sm">
              {/* 1. Home */}
              <li>
                <Link
                  href="/"
                  className={cn(
                    "px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-1.5",
                    isActivePath(pathname, "/")
                      ? "text-white bg-brand shadow-md shadow-brand/25"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Home</span>
                </Link>
              </li>

              {/* 2. About Us Dropdown */}
              <li
                className="relative"
                onMouseEnter={() => handleMouseEnter("about")}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href="/about"
                  className={cn(
                    "px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-1.5",
                    isActivePath(pathname, "/about")
                      ? "text-white bg-brand shadow-md shadow-brand/25"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>About Us</span>
                  <ChevronDown
                    className={cn(
                      "w-3.5 h-3.5 transition-transform duration-200",
                      activeDropdown === "about" && "rotate-180"
                    )}
                  />
                </Link>

                <AnimatePresence>
                  {activeDropdown === "about" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full left-0 mt-2 w-72 rounded-2xl bg-card/95 border border-border/60 backdrop-blur-2xl p-2 shadow-xl z-50 space-y-1"
                    >
                      {aboutDropdownItems.map((sub) => {
                        const SubIcon = sub.icon
                        return (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-accent/60 transition-all duration-200 group"
                          >
                            <div className="p-2 rounded-lg bg-brand/10 text-brand group-hover:bg-brand group-hover:text-white transition-colors">
                              <SubIcon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-foreground group-hover:text-brand transition-colors">
                                {sub.name}
                              </div>
                              <div className="text-[11px] text-muted-foreground leading-tight">
                                {sub.description}
                              </div>
                            </div>
                          </Link>
                        )
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>

              {/* 3. Our Businesses Dropdown */}
              <li
                className="relative"
                onMouseEnter={() => handleMouseEnter("businesses")}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className={cn(
                    "px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-1.5 cursor-pointer",
                    activeDropdown === "businesses"
                      ? "text-foreground bg-accent/50"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Our Businesses</span>
                  <ChevronDown
                    className={cn(
                      "w-3.5 h-3.5 transition-transform duration-200",
                      activeDropdown === "businesses" && "rotate-180"
                    )}
                  />
                </div>

                <AnimatePresence>
                  {activeDropdown === "businesses" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full left-0 mt-2 w-80 rounded-2xl bg-card/95 border border-border/60 backdrop-blur-2xl p-2 shadow-xl z-50 space-y-1"
                    >
                      {businessDropdownItems.map((sub) => {
                        const SubIcon = sub.icon
                        return sub.isExternal ? (
                          <a
                            key={sub.href}
                            href={sub.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-accent/60 transition-all duration-200 group"
                          >
                            <div className="p-2 rounded-lg bg-brand/10 text-brand group-hover:bg-brand group-hover:text-white transition-colors">
                              <SubIcon className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                              <div className="text-xs font-bold text-foreground group-hover:text-brand transition-colors flex items-center gap-1">
                                <span>{sub.name}</span>
                                <ExternalLink className="w-3 h-3 text-muted-foreground" />
                              </div>
                              <div className="text-[11px] text-muted-foreground leading-tight">
                                {sub.description}
                              </div>
                            </div>
                          </a>
                        ) : (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-accent/60 transition-all duration-200 group"
                          >
                            <div className="p-2 rounded-lg bg-brand/10 text-brand group-hover:bg-brand group-hover:text-white transition-colors">
                              <SubIcon className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                              <div className="text-xs font-bold text-foreground group-hover:text-brand transition-colors">
                                {sub.name}
                              </div>
                              <div className="text-[11px] text-muted-foreground leading-tight">
                                {sub.description}
                              </div>
                            </div>
                          </Link>
                        )
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>

              {/* 4. Trade Exhibitions */}
              <li>
                <Link
                  href="/register-trade-expo"
                  className={cn(
                    "px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-1.5",
                    isActivePath(pathname, "/register-trade-expo")
                      ? "text-white bg-brand shadow-md shadow-brand/25"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Trade Exhibitions</span>
                </Link>
              </li>

              {/* 5. Media & Updates */}
              <li>
                <Link
                  href="/media"
                  className={cn(
                    "px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-1.5",
                    isActivePath(pathname, "/media")
                      ? "text-white bg-brand shadow-md shadow-brand/25"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                >
                  <Newspaper className="w-3.5 h-3.5" />
                  <span>Media & Updates</span>
                </Link>
              </li>

              {/* 6. Contact Us */}
              <li>
                <Link
                  href="/contact"
                  className={cn(
                    "px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-1.5",
                    isActivePath(pathname, "/contact")
                      ? "text-white bg-brand shadow-md shadow-brand/25"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Contact Us</span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Trigger */}
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

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t border-border/40 bg-background/95 backdrop-blur-2xl max-h-[85vh] overflow-y-auto"
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
                {/* 1. Home */}
                <li>
                  <Link
                    href="/"
                    className={cn(
                      "px-4 py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-between",
                      isActivePath(pathname, "/")
                        ? "bg-brand text-white shadow-md shadow-brand/25"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/40"
                    )}
                    onClick={closeMobileMenu}
                  >
                    <div className="flex items-center gap-3">
                      <Home className="w-4 h-4" />
                      <span>Home</span>
                    </div>
                  </Link>
                </li>

                {/* 2. About Us Accordion */}
                <li>
                  <button
                    type="button"
                    className="w-full px-4 py-3 rounded-xl text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-accent/40 flex items-center justify-between transition-all"
                    onClick={() => setMobileAboutOpen((prev) => !prev)}
                  >
                    <div className="flex items-center gap-3">
                      <Users className="w-4 h-4" />
                      <span>About Us</span>
                    </div>
                    <ChevronDown className={cn("w-4 h-4 transition-transform", mobileAboutOpen && "rotate-180")} />
                  </button>

                  {mobileAboutOpen && (
                    <div className="pl-6 pt-1 space-y-1">
                      {aboutDropdownItems.map((sub) => {
                        const SubIcon = sub.icon
                        return (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="px-3 py-2 rounded-lg text-xs font-medium text-muted-foreground hover:text-brand flex items-center gap-2"
                            onClick={closeMobileMenu}
                          >
                            <SubIcon className="w-3.5 h-3.5 text-brand" />
                            <span>{sub.name}</span>
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </li>

                {/* 3. Our Businesses Accordion */}
                <li>
                  <button
                    type="button"
                    className="w-full px-4 py-3 rounded-xl text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-accent/40 flex items-center justify-between transition-all"
                    onClick={() => setMobileBusinessesOpen((prev) => !prev)}
                  >
                    <div className="flex items-center gap-3">
                      <Briefcase className="w-4 h-4" />
                      <span>Our Businesses</span>
                    </div>
                    <ChevronDown className={cn("w-4 h-4 transition-transform", mobileBusinessesOpen && "rotate-180")} />
                  </button>

                  {mobileBusinessesOpen && (
                    <div className="pl-6 pt-1 space-y-1">
                      {businessDropdownItems.map((sub) => {
                        const SubIcon = sub.icon
                        return sub.isExternal ? (
                          <a
                            key={sub.href}
                            href={sub.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-2 rounded-lg text-xs font-medium text-muted-foreground hover:text-brand flex items-center justify-between"
                            onClick={closeMobileMenu}
                          >
                            <div className="flex items-center gap-2">
                              <SubIcon className="w-3.5 h-3.5 text-brand" />
                              <span>{sub.name}</span>
                            </div>
                            <ExternalLink className="w-3 h-3 text-muted-foreground" />
                          </a>
                        ) : (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="px-3 py-2 rounded-lg text-xs font-medium text-muted-foreground hover:text-brand flex items-center gap-2"
                            onClick={closeMobileMenu}
                          >
                            <SubIcon className="w-3.5 h-3.5 text-brand" />
                            <span>{sub.name}</span>
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </li>

                {/* 4. Trade Exhibitions */}
                <li>
                  <Link
                    href="/register-trade-expo"
                    className={cn(
                      "px-4 py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-between",
                      isActivePath(pathname, "/register-trade-expo")
                        ? "bg-brand text-white shadow-md shadow-brand/25"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/40"
                    )}
                    onClick={closeMobileMenu}
                  >
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4" />
                      <span>Trade Exhibitions</span>
                    </div>
                  </Link>
                </li>

                {/* 5. Media & Updates */}
                <li>
                  <Link
                    href="/media"
                    className={cn(
                      "px-4 py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-between",
                      isActivePath(pathname, "/media")
                        ? "bg-brand text-white shadow-md shadow-brand/25"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/40"
                    )}
                    onClick={closeMobileMenu}
                  >
                    <div className="flex items-center gap-3">
                      <Newspaper className="w-4 h-4" />
                      <span>Media & Updates</span>
                    </div>
                  </Link>
                </li>

                {/* 6. Contact Us */}
                <li>
                  <Link
                    href="/contact"
                    className={cn(
                      "px-4 py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-between",
                      isActivePath(pathname, "/contact")
                        ? "bg-brand text-white shadow-md shadow-brand/25"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/40"
                    )}
                    onClick={closeMobileMenu}
                  >
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4" />
                      <span>Contact Us</span>
                    </div>
                  </Link>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
