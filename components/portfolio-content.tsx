"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useToast } from "@/components/ui/use-toast"
import type { Portfolio } from "@/lib/supabase"

export default function PortfolioContent() {
  const [items, setItems] = useState<Portfolio[]>([])
  const [selectedItem, setSelectedItem] = useState<Portfolio | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchPortfolio = async () => {
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
      }
    }

    fetchPortfolio()
  }, [toast])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 mb-6">
            Our Portfolio
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
        </section>

        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
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
      </div>
    </div>
  )
}
