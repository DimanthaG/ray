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
        console.log('Fetched portfolio items:', data)
        setItems(data)
      } catch (error) {
        console.error('Error:', error)
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
        {/* Hero Section */}
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
            Explore our successful projects and see how we've helped businesses transform their digital presence.
          </p>
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-colors"
              onClick={() => setSelectedItem(item)}
            >
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={item.image_url}
                  alt={item.title}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-60" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
                <span className="inline-block mt-2 text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                  {item.category}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Image Modal */}
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl w-full bg-card rounded-2xl overflow-hidden shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedItem.image_url}
                alt={selectedItem.title}
                width={1200}
                height={800}
                className="w-full h-auto"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/80 to-transparent">
                <h3 className="text-2xl font-semibold text-foreground mb-2">
                  {selectedItem.title}
                </h3>
                <p className="text-muted-foreground mb-2">
                  {selectedItem.description}
                </p>
                <span className="inline-block text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {selectedItem.category}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
} 