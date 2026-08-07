"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { X, ImageOff, Sparkles, Maximize2, ExternalLink } from "lucide-react"
import type { Portfolio } from "@/lib/supabase"

function PortfolioSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="rounded-3xl bg-card/60 border border-border/50 overflow-hidden animate-pulse shadow-sm"
        >
          <div className="h-[240px] sm:h-[280px] bg-muted/60" />
          <div className="p-6 space-y-3">
            <div className="h-5 bg-muted/60 rounded-xl w-3/4" />
            <div className="h-4 bg-muted/40 rounded-lg w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function PortfolioContent() {
  const [items, setItems] = useState<Portfolio[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState<Portfolio | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const { toast } = useToast()

  const closeModal = useCallback(() => setSelectedItem(null), [])

  useEffect(() => {
    const fetchPortfolio = async () => {
      setIsLoading(true)
      try {
        const response = await fetch("/api/admin/portfolio")
        if (!response.ok) throw new Error("Failed to fetch portfolio items")
        const data = await response.json()
        setItems(data)
      } catch (error) {
        console.error("Error:", error)
        toast({
          title: "Error",
          description: "Failed to load portfolio items",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchPortfolio()
  }, [toast])

  useEffect(() => {
    if (!selectedItem) return

    closeButtonRef.current?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal()
    }

    document.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [selectedItem, closeModal])

  return (
    <div className="relative min-h-screen bg-background overflow-hidden py-12 md:py-20">
      {/* Ambient Mesh Glow */}
      <div className="pointer-events-none absolute -top-40 right-10 h-[30rem] w-[min(100%,50rem)] bg-gradient-to-bl from-brand/20 via-cyan-500/15 to-transparent blur-[120px]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 space-y-4 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-xs font-bold text-brand">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Featured Case Studies & Creative Work</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-heading text-foreground tracking-tight">
            Our Selected <span className="text-gradient">Portfolio</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Discover how we translate vision into high-performing digital assets, strategy campaigns, and social engagements.
          </p>
        </motion.div>

        <section aria-labelledby="portfolio-grid-heading">
          <h2 id="portfolio-grid-heading" className="sr-only">
            Project gallery
          </h2>

          {isLoading ? (
            <PortfolioSkeleton />
          ) : items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center text-center py-20 px-6 rounded-3xl border border-border/50 bg-card/60 backdrop-blur-xl max-w-xl mx-auto shadow-sm"
            >
              <div className="p-4 rounded-2xl bg-brand/10 text-brand mb-4">
                <ImageOff className="w-8 h-8" aria-hidden />
              </div>
              <h3 className="text-xl font-bold font-heading text-foreground mb-2">Updating Gallery</h3>
              <p className="text-sm text-muted-foreground max-w-md mb-6 leading-relaxed">
                We are currently uploading our latest client campaign highlights. Get in touch to request our complete agency deck.
              </p>
              <Button asChild variant="brand-glow">
                <Link href="/contact" className="flex items-center gap-2">
                  <span>Contact Our Team</span>
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {items.map((item, index) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="group flex flex-col overflow-hidden rounded-3xl bg-card/60 border border-border/50 hover:border-brand/50 backdrop-blur-xl shadow-sm hover:shadow-glow transition-all duration-300 cursor-pointer focus-within:ring-2 focus-within:ring-ring"
                  onClick={() => setSelectedItem(item)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      setSelectedItem(item)
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`Open ${item.title} in full view`}
                >
                  <div className="relative w-full h-[260px] sm:h-[300px] bg-muted/30 overflow-hidden">
                    <Image
                      src={item.image_url}
                      alt={item.title}
                      fill
                      className="object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4">
                      <div className="p-2.5 rounded-full bg-brand text-white shadow-md">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border/40 p-6 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold font-heading text-foreground group-hover:text-brand transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">Click to view full preview</p>
                    </div>
                    <span className="text-xs font-semibold text-brand bg-brand/10 px-3 py-1 rounded-full border border-brand/20">
                      View
                    </span>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </section>

        {/* Modal Lightbox */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-xl"
              onClick={closeModal}
              role="presentation"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative flex w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-card border border-border/60 shadow-2xl max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="portfolio-modal-title"
              >
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeModal}
                  className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-background/90 border border-border/60 text-foreground hover:bg-brand hover:text-white transition-colors shadow-md"
                  aria-label="Close project view"
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="relative h-[min(72vh,680px)] w-full shrink-0 bg-muted/20">
                  <Image
                    src={selectedItem.image_url}
                    alt={selectedItem.title}
                    fill
                    className="object-contain p-6 sm:p-8"
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    priority
                  />
                </div>
                <div className="shrink-0 border-t border-border px-6 py-5 bg-card flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2
                      id="portfolio-modal-title"
                      className="text-xl font-bold font-heading text-foreground sm:text-2xl"
                    >
                      {selectedItem.title}
                    </h2>
                    <p className="text-xs text-muted-foreground">Raytronics Group Portfolio Showcase</p>
                  </div>
                  <Button asChild variant="brand" size="sm">
                    <Link href="/contact">Inquire About Similar Work</Link>
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

