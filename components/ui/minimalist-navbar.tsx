"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { Home, Users, Image as ImageIcon, Mail, Menu as MenuIcon, LayoutDashboard } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  href: string
  icon: React.ElementType
}

interface MinimalistNavbarProps {
  className?: string
}

export function MinimalistNavbar({ className }: MinimalistNavbarProps) {
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const { data: session } = useSession()
  
  const items: NavItem[] = [
    {
      name: "Home",
      href: "/",
      icon: Home,
    },
    {
      name: "About",
      href: "/about",
      icon: Users,
    },
    {
      name: "Portfolio",
      href: "/portfolio",
      icon: ImageIcon,
    },
    {
      name: "Contact",
      href: "/contact",
      icon: Mail,
    },
  ]
  
  // Use items directly instead of adding admin items
  const navItems = items
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-xl border-b border-border/30 shadow-sm supports-[backdrop-filter]:bg-background/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          <Link href="/" className="flex items-center space-x-2 relative group">
            <div className="absolute inset-0 bg-primary/10 rounded-xl filter blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
            <Image
              src="/logos/06.svg"
              alt="Raytronics Logo"
              width={120}
              height={120}
              className="h-8 w-8 relative z-10"
              priority
            />
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden relative px-3 py-2 rounded-lg text-foreground hover:text-primary transition-colors hover:bg-primary/10 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <MenuIcon size={24} />
          </button>
          
          {/* Desktop navigation */}
          <nav className={cn("hidden md:block", className)}>
            <ul className="flex items-center space-x-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative group flex items-center",
                      activeItem === item.href
                        ? "text-primary bg-primary/10 backdrop-blur-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
                    )}
                    onClick={() => setActiveItem(item.href)}
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    <span className="relative z-10">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden border-t border-border/30 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/30"
          >
            <nav className="container mx-auto px-4 py-4">
              <ul className="flex flex-col space-y-1">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative group flex items-center",
                        activeItem === item.href
                          ? "text-primary bg-primary/10 backdrop-blur-sm"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
                      )}
                      onClick={() => {
                        setActiveItem(item.href);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <item.icon className="w-4 h-4 mr-2" />
                      <span className="relative z-10">{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
} 