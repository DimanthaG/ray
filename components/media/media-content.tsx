"use client"

import React, { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import {
  Newspaper,
  Calendar,
  MessageCircle,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export interface MediaUpdateItem {
  id: string
  date: string
  category: string
  title: string
  image: string
  whatsappMsg: string
  shortDesc: string
  fullCaption: string[]
}

interface MediaContentProps {
  updates: MediaUpdateItem[]
}

export function MediaContent({ updates }: MediaContentProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const activeItem = selectedIndex !== null ? updates[selectedIndex] : null

  const handleClose = useCallback(() => {
    setSelectedIndex(null)
  }, [])

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null) return null
      return prev === 0 ? updates.length - 1 : prev - 1
    })
  }, [updates.length])

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null) return null
      return prev === updates.length - 1 ? 0 : prev + 1
    })
  }, [updates.length])

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (selectedIndex === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose()
      if (e.key === "ArrowLeft") handlePrev()
      if (e.key === "ArrowRight") handleNext()
    }

    document.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [selectedIndex, handleClose, handlePrev, handleNext])

  return (
    <>
      {/* Media Articles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
        {updates.map((item, index) => {
          const whatsappUrl = `https://wa.me/94714727527?text=${encodeURIComponent(item.whatsappMsg)}`

          return (
            <article
              key={item.id}
              className="group overflow-hidden rounded-3xl bg-card/70 border border-border/60 hover:border-brand/50 backdrop-blur-xl shadow-sm hover:shadow-glow transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Clickable Image Container */}
                <div
                  onClick={() => setSelectedIndex(index)}
                  className="aspect-square relative overflow-hidden bg-slate-950 cursor-pointer group/img focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      setSelectedIndex(index)
                    }
                  }}
                  aria-label={`View enlarged image for ${item.title}`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    priority={index === 0}
                    className="object-cover object-center transition-transform duration-700 group-hover/img:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                  {/* Category Pill */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3.5 py-1 rounded-full bg-brand/90 backdrop-blur-md text-white text-xs font-bold shadow-md">
                      {item.category}
                    </span>
                  </div>

                  {/* Hover Overlay with Zoom Icon */}
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10 backdrop-blur-[2px]">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white backdrop-blur-md border border-white/30 text-xs font-bold shadow-lg transform translate-y-2 group-hover/img:translate-y-0 transition-transform duration-300">
                      <Maximize2 className="w-4 h-4" />
                      <span>Click to view full image</span>
                    </div>
                  </div>
                </div>

                {/* Post Content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between text-xs text-muted-foreground font-medium">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-brand" />
                      <span>{item.date}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedIndex(index)}
                      className="text-brand hover:underline font-semibold flex items-center gap-1 text-[11px]"
                    >
                      <Maximize2 className="w-3 h-3" />
                      <span>Enlarge Photo</span>
                    </button>
                  </div>

                  <h3 className="text-xl font-bold font-heading text-foreground group-hover:text-brand transition-colors leading-snug">
                    {item.title}
                  </h3>

                  {/* Formatted Full Caption */}
                  <div className="space-y-2 text-xs text-muted-foreground leading-relaxed pt-2 border-t border-border/40">
                    {item.fullCaption.map((line, idx) => (
                      <p
                        key={idx}
                        className={
                          line.startsWith("💎") ||
                          line.startsWith("✅") ||
                          line.startsWith("📍")
                            ? "font-medium text-foreground/90"
                            : ""
                        }
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* WhatsApp Call to Action */}
              <div className="p-6 pt-0 space-y-2.5">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md hover:shadow-emerald-600/30 transition-all duration-300"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Inquire Details on WhatsApp</span>
                </a>
              </div>
            </article>
          )
        })}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeItem && selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-6 md:p-8"
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
            aria-label={activeItem.title}
          >
            {/* Top Toolbar */}
            <div
              className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 flex items-center justify-between z-30 pointer-events-none"
            >
              <div className="pointer-events-auto flex items-center gap-2.5 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-white text-xs">
                <span className="font-semibold">{activeItem.category}</span>
                <span className="text-white/40">•</span>
                <span className="text-white/70">
                  {selectedIndex + 1} / {updates.length}
                </span>
              </div>

              <div className="pointer-events-auto flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20 backdrop-blur-md"
                  aria-label="Close image preview (Escape)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Navigation Previous Button */}
            {updates.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  handlePrev()
                }}
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/60 hover:bg-brand text-white transition-all border border-white/20 backdrop-blur-md shadow-xl hover:scale-110"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Navigation Next Button */}
            {updates.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  handleNext()
                }}
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/60 hover:bg-brand text-white transition-all border border-white/20 backdrop-blur-md shadow-xl hover:scale-110"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            {/* Main Modal Image & Caption Card */}
            <motion.div
              key={activeItem.id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center justify-center z-20"
            >
              <div className="relative w-full aspect-square max-h-[68vh] sm:max-h-[72vh] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900">
                <Image
                  src={activeItem.image}
                  alt={activeItem.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                  className="object-contain"
                  priority
                />
              </div>

              {/* Bottom Caption & Action Banner */}
              <div className="w-full mt-3 sm:mt-4 p-4 rounded-2xl bg-black/75 backdrop-blur-xl border border-white/10 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xl">
                <div className="space-y-1 pr-2">
                  <h4 className="text-sm sm:text-base font-bold text-white leading-tight">
                    {activeItem.title}
                  </h4>
                  <p className="text-xs text-white/70 line-clamp-2">
                    {activeItem.shortDesc}
                  </p>
                </div>

                <a
                  href={`https://wa.me/94714727527?text=${encodeURIComponent(activeItem.whatsappMsg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Inquire on WhatsApp</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
