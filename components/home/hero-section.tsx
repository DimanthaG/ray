"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, CalendarDays, MapPin, Globe, ExternalLink, Award, ShoppingBag } from "lucide-react"

// WhatsApp Icon SVG Component
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.554 4.109 1.523 5.838L.055 23.447l5.772-1.514A11.936 11.936 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.785 0-3.528-.475-5.048-1.375l-.362-.214-3.418.896.911-3.332-.236-.375A9.764 9.764 0 012.182 12c0-5.413 4.405-9.818 9.818-9.818 5.413 0 9.818 4.405 9.818 9.818 0 5.413-4.405 9.818-9.818 9.818z"/>
    </svg>
  )
}

// Live Countdown Component for Trade Expo
function ExpoCountdown() {
  const [mounted, setMounted] = useState(false)
  const [timeLeft, setTimeLeft] = useState({ days: 160, hours: 12, minutes: 45, seconds: 30 })

  useEffect(() => {
    setMounted(true)
    // Target date for Trade & Gem Expo: November 27, 2026
    let targetDate = new Date("2026-11-27T09:00:00").getTime()
    const now = new Date().getTime()

    // If target date has passed, set target to 110 days into the future
    if (targetDate <= now) {
      targetDate = now + 110 * 24 * 60 * 60 * 1000
    }

    const updateTimer = () => {
      const current = new Date().getTime()
      const difference = targetDate - current

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      }
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center justify-center gap-3 sm:gap-4 my-6">
        {["Days", "Hours", "Minutes", "Seconds"].map((label) => (
          <div
            key={label}
            className="flex flex-col items-center justify-center min-w-[4.2rem] sm:min-w-[5.5rem] p-2.5 sm:p-3 rounded-2xl bg-slate-950/80 border border-slate-700/80 backdrop-blur-md shadow-lg"
          >
            <span className="text-xl sm:text-3xl font-extrabold font-heading text-white tracking-tight">
              --
            </span>
            <span className="text-[10px] sm:text-xs text-slate-300 font-medium uppercase tracking-wider mt-0.5">
              {label}
            </span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-4 my-6">
      {[
        { label: "Days", value: timeLeft.days },
        { label: "Hours", value: timeLeft.hours },
        { label: "Minutes", value: timeLeft.minutes },
        { label: "Seconds", value: timeLeft.seconds },
      ].map((item) => (
        <div
          key={item.label}
          className="flex flex-col items-center justify-center min-w-[4.2rem] sm:min-w-[5.5rem] p-2.5 sm:p-3 rounded-2xl bg-slate-950/80 border border-slate-700/80 backdrop-blur-md shadow-lg"
        >
          <span className="text-xl sm:text-3xl font-extrabold font-heading text-amber-400 tracking-tight font-mono">
            {String(item.value).padStart(2, "0")}
          </span>
          <span className="text-[10px] sm:text-xs text-slate-300 font-medium uppercase tracking-wider mt-0.5">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  )
}

const slides = [
  {
    id: "gem-expo",
    navLabel: "Gem Expo",
    badge: "CANADA GEM EXPO 2026",
    badgeIcon: Award,
    title: "Canada Gem Expo 2026",
    subtitle: "International Gem Exhibition • Toronto, Canada 🇨🇦 | November 27–29, 2026",
    description: "Connecting international buyers, Sri Lankan gem exporters, tea merchants, and global trade partners in Toronto.",
    image: "/images/hero/Gems Expo.jpg.jpeg",
    isExpo: true,
    whatsappNumber: "94714727527", 
    whatsappMsg: "Hi Raytronics, I am interested in the Canada Gem Expo 2026 in Toronto.",
    whatsappText: "Inquire on WhatsApp",
    secondaryBtnText: "Register Online",
    secondaryBtnLink: "/register-trade-expo",
  },
  {
    id: "ray-gems",
    navLabel: "Ray Gems",
    badge: "CERTIFIED CEYLON PRECIOUS GEMSTONES",
    badgeIcon: Sparkles,
    title: "Ray Gems",
    titleLine2: "Certified Ceylon Gemstones & Fine Jewelry",
    subtitle: "Ethically sourced directly from Sri Lankan mines to international collectors.",
    description: "Discover unheated blue sapphires, rubies, padparadscha, and custom luxury fine jewelry exported with worldwide authentication.",
    image: "/images/hero/Jewelary.jpg.jpeg",
    isExpo: false,
    whatsappNumber: "94714727527", 
    whatsappMsg: "Hi Raytronics, I would like to inquire about Ray Gems precious gemstones.",
    whatsappText: "Inquire on WhatsApp",
    secondaryBtnText: "Visit Ray Gems Website",
    secondaryBtnLink: "https://www.raygems.com/",
  },
  {
    id: "ray-mart",
    navLabel: "Ray Mart",
    badge: "PREMIER E-COMMERCE & RETAIL MARKETPLACE",
    badgeIcon: ShoppingBag,
    title: "Ray Mart",
    titleLine2: "Global E-Commerce & Retail Marketplace",
    subtitle: "Connecting authentic Sri Lankan products with global consumers and trade distribution.",
    description: "Empowering authentic merchants with digital marketplace infrastructure, express international logistics, and retail growth.",
    image: "/images/hero/Raymart.jpg.jpeg",
    isExpo: false,
    whatsappNumber: "94777788275", 
    whatsappMsg: "Hi Raytronics, I am interested in Ray Mart products and marketplace partnerships.",
    whatsappText: "Inquire on WhatsApp",
    secondaryBtnText: "Visit Ray Mart Website",
    secondaryBtnLink: "https://www.raymartsl.com/",
    isExternal: true,
  },
]

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
  }, [])

  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      handleNext()
    }, 6500)
    return () => clearInterval(timer)
  }, [isPaused, handleNext])

  const currentSlide = slides[currentIndex]
  const cleanPhone = currentSlide.whatsappNumber.replace(/[^0-9]/g, "")
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(currentSlide.whatsappMsg)}`

  return (
    <section
      className="relative isolate overflow-hidden min-h-screen bg-slate-950 flex flex-col justify-between group/hero mt-[-80px] pt-[80px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Featured Showcase Slider"
    >
      {/* Slide Background Images with Smooth Crossfade */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-slate-950">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={currentSlide.image}
              alt={currentSlide.title}
              fill
              priority
              className="object-cover object-center filter brightness-[0.85] contrast-105"
            />

            {/* Readability blur over the left side (where the text sits), fading out to full clarity on the right */}
            <div
              className="absolute inset-0"
              style={{
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                maskImage: "linear-gradient(to right, black 0%, black 35%, transparent 70%)",
                WebkitMaskImage: "linear-gradient(to right, black 0%, black 35%, transparent 70%)",
              }}
            />

            {/* Light tint under the text for extra contrast, same fade as the blur */}
            <div
              className="absolute inset-0 bg-slate-950/50"
              style={{
                maskImage: "linear-gradient(to right, black 0%, black 30%, transparent 65%)",
                WebkitMaskImage: "linear-gradient(to right, black 0%, black 30%, transparent 65%)",
              }}
            />

            {/* Subtle bottom fade so the controls bar still reads well */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Slide Content Area */}
      <div className="container mx-auto px-4 sm:px-6 md:px-12 py-10 md:py-16 relative z-10 flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl text-left text-white space-y-5 flex flex-col items-start"
          >
            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight text-white leading-[1.15] drop-shadow-md text-left">
              {currentSlide.title}
              {currentSlide.titleLine2 && (
                <>
                  <br />
                  <span className="text-amber-400">{currentSlide.titleLine2}</span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base md:text-lg text-slate-200 max-w-2xl font-medium leading-relaxed drop-shadow text-left">
              {currentSlide.subtitle}
            </p>

            {/* If Gem Expo slide, show live countdown timer! */}
            {currentSlide.isExpo && <ExpoCountdown />}

            {/* Slide Description */}
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed text-left">
              {currentSlide.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-start gap-4 pt-4 w-full sm:w-auto">
              {/* WhatsApp Button linking with specific message */}
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg hover:shadow-emerald-600/30 transition-all duration-300 group/wa"
              >
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5"
                >
                  <WhatsAppIcon className="w-5 h-5 text-white" />
                  <span>{currentSlide.whatsappText}</span>
                  <ArrowRight className="w-4 h-4 group-hover/wa:translate-x-1 transition-transform" />
                </a>
              </Button>

              {/* Secondary Action Button */}
              {currentSlide.isExternal ? (
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-white/30 bg-slate-900/60 backdrop-blur-md text-white hover:bg-white/20 hover:border-white text-base rounded-xl"
                >
                  <a
                    href={currentSlide.secondaryBtnLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <span>{currentSlide.secondaryBtnText}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              ) : (
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-white/30 bg-slate-900/60 backdrop-blur-md text-white hover:bg-white/20 hover:border-white text-base rounded-xl"
                >
                  <Link href={currentSlide.secondaryBtnLink} className="flex items-center justify-center gap-2">
                    <span>{currentSlide.secondaryBtnText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slider Controls Bar */}
      <div className="container mx-auto px-4 sm:px-6 md:px-12 py-4 relative z-20 flex items-center justify-center">
        {/* Slide Indicators / Thumbnails */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          {slides.map((slide, idx) => {
            const active = idx === currentIndex
            return (
              <button
                key={slide.id}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${
                  active
                    ? "bg-amber-400 text-slate-950 shadow-md scale-105"
                    : "bg-white/10 text-slate-300 hover:bg-white/20"
                }`}
                aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
              >
                <span className="w-2 h-2 rounded-full bg-current" />
                <span className="hidden sm:inline">{slide.navLabel}</span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}