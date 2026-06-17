"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { X, ImageOff } from "lucide-react"
import type { Portfolio } from "@/lib/supabase"

function PortfolioSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl bg-card border border-border/50 overflow-hidden animate-pulse"
        >
          <div className="h-[240px] sm:h-[280px] md:h-[300px] bg-muted/60" />
          <div className="p-5">
            <div className="h-5 bg-muted/60 rounded w-2/3" />
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our <span className="text-brand">Portfolio</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our successful projects and see how we&apos;ve helped businesses transform their
            digital presence.
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
              className="flex flex-col items-center justify-center text-center py-16 px-6 rounded-2xl border border-border/50 bg-card/50"
            >
              <ImageOff className="w-12 h-12 text-muted-foreground mb-4" aria-hidden />
              <h3 className="text-xl font-semibold text-foreground mb-2">No projects yet</h3>
              <p className="text-muted-foreground max-w-md mb-6">
                We&apos;re updating our portfolio. In the meantime, get in touch to discuss what we
                can do for your brand.
              </p>
              <Button asChild className="bg-brand hover:bg-brand/90">
                <Link href="/contact">Start a conversation</Link>
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
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-colors cursor-pointer focus-within:ring-2 focus-within:ring-ring"
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
                  <div className="relative w-full h-[240px] sm:h-[280px] md:h-[300px] bg-muted/40">
                    <Image
                      src={item.image_url}
                      alt={item.title}
                      fill
                      className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="border-t border-border/50 p-4 md:p-5">
                    <h3 className="text-lg font-semibold text-foreground leading-snug">{item.title}</h3>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </section>

        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
              onClick={closeModal}
              role="presentation"
            >
              <motion.div
                initial={{ scale: 0.96 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.96 }}
                className="relative flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-card shadow-xl max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="portfolio-modal-title"
              >
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeModal}
                  className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-background/90 border border-border/50 text-foreground hover:bg-muted transition-colors"
                  aria-label="Close project view"
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="relative h-[min(75vh,720px)] w-full shrink-0 bg-muted/30">
                  <Image
                    src={selectedItem.image_url}
                    alt={selectedItem.title}
                    fill
                    className="object-contain p-4 sm:p-6"
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    priority
                  />
                </div>
                <div className="shrink-0 border-t border-border px-4 py-4 sm:px-6 sm:py-5">
                  <h2
                    id="portfolio-modal-title"
                    className="text-xl font-semibold text-foreground sm:text-2xl"
                  >
                    {selectedItem.title}
                  </h2>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
