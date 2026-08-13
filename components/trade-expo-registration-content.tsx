"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { CalendarDays, MapPin, Clock, Building, Users, Globe } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const countries = [
  "Afghanistan", "Albania", "Algeria", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
  "Bahrain", "Bangladesh", "Belarus", "Belgium", "Brazil", "Bulgaria", "Cambodia", "Canada", 
  "Chile", "China", "Colombia", "Croatia", "Czech Republic", "Denmark", "Egypt", "Estonia",
  "Finland", "France", "Georgia", "Germany", "Ghana", "Greece", "Hungary", "Iceland", "India",
  "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Japan", "Jordan", "Kazakhstan",
  "Kenya", "Kuwait", "Latvia", "Lebanon", "Lithuania", "Luxembourg", "Malaysia", "Maldives",
  "Mexico", "Morocco", "Netherlands", "New Zealand", "Norway", "Pakistan", "Philippines",
  "Poland", "Portugal", "Qatar", "Romania", "Russia", "Saudi Arabia", "Singapore", "South Africa",
  "South Korea", "Spain", "Sri Lanka", "Sweden", "Switzerland", "Taiwan", "Thailand", "Turkey",
  "UAE", "Ukraine", "United Kingdom", "United States", "Vietnam", "Other"
]

const businessTypes = [
  "Gem & Jewelry", "Toys & Gift Items", "Spices", "Travel & Tourism", 
  "Tea & Herbal Beverages", "Batik & Garments", "Manufacturer", "Importer", 
  "Exporter", "Distributor", "Retailer", "Investor", "Other"
]

const companySizes = [
  "Startup (1-10 employees)", "Small (11-50 employees)", "Medium (51-200 employees)", 
  "Large (201-1000 employees)", "Enterprise (1000+ employees)"
]

export default function TradeExpoRegistrationContent() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [entryCode, setEntryCode] = useState('')
  const [currentStep, setCurrentStep] = useState(1)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(e.currentTarget)
      const data = {
        // Personal Information
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        company: formData.get('company'),
        division: formData.get('division'),
        jobTitle: formData.get('jobTitle'),
        nationality: formData.get('nationality'),
        
        // Address Information
        country: formData.get('country'),
        address: formData.get('address'),
        
        // Contact Information
        countryCode: formData.get('countryCode'),
        phoneNumber: formData.get('phoneNumber'),
        email: formData.get('email'),
        
        // Business Information
        businessType: formData.get('businessType'),
        companySize: formData.get('companySize'),
        yearsInBusiness: formData.get('yearsInBusiness'),
        productsServices: formData.get('productsServices'),
        targetMarkets: formData.get('targetMarkets'),
        exhibitionGoals: formData.get('exhibitionGoals'),
        
        // Event specific
        eventType: 'trade_expo_2026'
      }

      // Check if all required fields are filled
      const requiredFields = {
        'First Name': data.firstName,
        'Last Name': data.lastName,
        'Company': data.company,
        'Nationality': data.nationality,
        'Country': data.country,
        'Address': data.address,
        'Country Code': data.countryCode,
        'Phone Number': data.phoneNumber,
        'Business Type': data.businessType,
        'Company Size': data.companySize,
        'Years in Business': data.yearsInBusiness,
        'Products/Services': data.productsServices,
        'Exhibition Goals': data.exhibitionGoals
      }

      const missingFields = Object.entries(requiredFields)
        .filter(([key, value]) => !value || value === '')
        .map(([key]) => key)

      if (missingFields.length > 0) {
        toast({
          title: "Missing Required Fields",
          description: `Please fill in: ${missingFields.join(', ')}`,
          variant: "destructive",
        })
        setIsSubmitting(false)
        return
      }

      const response = await fetch('/api/register-trade-expo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Failed to submit registration: ${response.status} - ${errorText}`)
      }

      const result = await response.json()

      // Show success modal
      setEntryCode(result.entryCode)
      setShowSuccessModal(true)

      ;(e.target as HTMLFormElement).reset()
    } catch (error) {
      console.error('Error submitting registration:', error)
      toast({
        title: "Error",
        description: "Failed to submit registration. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      {/* <div className="bg-gradient-to-r from-blue-600 to-red-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Lanka Trade Expo 2026
            </h1>
            <p className="text-xl md:text-2xl mb-4">Toronto, Canada 🇨🇦</p>
            <p className="text-lg mb-8">27 | 28 | 29 November 2026</p>
            
            <div className="flex flex-wrap justify-center gap-8 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5" />
                <span>November 27-29, 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>Toronto, Canada</span>
              </div>
              <div className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                <span>Trade Exhibition</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div> */}

      {/* Expos Container */}
      <div className="container mx-auto px-4 pb-16 space-y-20">
        
        {/* ==================== 1. GEM EXPO SECTION ==================== */}
        <motion.section
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="max-w-5xl mx-auto space-y-8"
        >
          <div className="text-center space-y-2">
            <span className="px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-bold uppercase tracking-wider">
              Gem & Jewelry Trade Exhibition
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-foreground">
              Canada Ceylon Gem Expo 2026
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto">
              Showcasing 100% natural Sri Lankan certified gemstones, luxury jewelry, and global trade partnerships in Toronto, Canada.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Gem Expo Image */}
            <div className="lg:col-span-5 max-w-md mx-auto w-full">
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl border border-brand/30 bg-slate-950 group">
                <Image
                  src="/Gem expo.jpg"
                  alt="Canada Ceylon Gem Expo 2026 - Toronto, Canada"
                  width={1080}
                  height={1080}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </div>
            </div>

            {/* Gem Expo Downloads */}
            <div className="lg:col-span-7 rounded-3xl bg-card/70 border border-brand/20 backdrop-blur-xl p-6 sm:p-8 shadow-lg space-y-5">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-brand">Gem Expo Documentation</span>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-foreground">
                  Official Downloads & Forms
                </h3>
                <p className="text-xs text-muted-foreground">
                  Download official visa guidelines, exhibitor application form, and invitation letter.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {/* Download 1: VISA Folder */}
                <a
                  href="/Folders - VISA FOLDER.pdf"
                  target="_blank"
                  download="VISA_FOLDER_Gem_Expo.pdf"
                  className="group p-4 rounded-2xl bg-card border border-border/60 hover:border-brand/50 shadow-sm hover:shadow-glow transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="p-2.5 rounded-xl bg-brand/10 text-brand w-fit group-hover:bg-brand group-hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h4 className="text-xs font-bold text-foreground group-hover:text-brand transition-colors leading-snug">
                      VISA Information Folder
                    </h4>
                    <p className="text-[10px] text-muted-foreground leading-tight">
                      Official travel & visa guidelines for Gem Expo.
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-border/30 flex items-center justify-between text-[11px] font-bold text-brand">
                    <span>Download</span>
                    <span className="text-base">↓</span>
                  </div>
                </a>

                {/* Download 2: Application Form */}
                <a
                  href="/The Gem Expo Application.pdf"
                  target="_blank"
                  download="The_Gem_Expo_Application.pdf"
                  className="group p-4 rounded-2xl bg-card border border-border/60 hover:border-brand/50 shadow-sm hover:shadow-glow transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="p-2.5 rounded-xl bg-brand/10 text-brand w-fit group-hover:bg-brand group-hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h4 className="text-xs font-bold text-foreground group-hover:text-brand transition-colors leading-snug">
                      Application Form
                    </h4>
                    <p className="text-[10px] text-muted-foreground leading-tight">
                      Exhibitor booth reservation form.
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-border/30 flex items-center justify-between text-[11px] font-bold text-brand">
                    <span>Download</span>
                    <span className="text-base">↓</span>
                  </div>
                </a>

                {/* Download 3: Official Letter */}
                <a
                  href="/The Gem Expo Letter.pdf"
                  target="_blank"
                  download="The_Gem_Expo_Official_Letter.pdf"
                  className="group p-4 rounded-2xl bg-card border border-border/60 hover:border-brand/50 shadow-sm hover:shadow-glow transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="p-2.5 rounded-xl bg-brand/10 text-brand w-fit group-hover:bg-brand group-hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h4 className="text-xs font-bold text-foreground group-hover:text-brand transition-colors leading-snug">
                      Invitation Letter
                    </h4>
                    <p className="text-[10px] text-muted-foreground leading-tight">
                      Official endorsement letter from Raytronics.
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-border/30 flex items-center justify-between text-[11px] font-bold text-brand">
                    <span>Download</span>
                    <span className="text-base">↓</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Divider */}
        <div className="max-w-5xl mx-auto border-t border-border/40" />

        {/* ==================== 2. META EXPO SECTION ==================== */}
        <motion.section
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="max-w-5xl mx-auto space-y-8"
        >
          <div className="text-center space-y-2">
            <span className="px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              Trade & Multi-Sector Expo
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-foreground">
              Canada Ceylon Meta Expo 2026
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto">
              Connecting Sri Lankan manufacturers, exporters, real estate, tea, garments, and tech innovators with North American markets.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Meta Expo Image */}
            <div className="lg:col-span-5 max-w-md mx-auto w-full">
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl border border-cyan-500/30 bg-slate-950 group">
                <Image
                  src="/Meta expo 1.jpg"
                  alt="Canada Ceylon Meta Expo 2026 - Toronto, Canada"
                  width={1080}
                  height={1080}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </div>
            </div>

            {/* Meta Expo Downloads */}
            <div className="lg:col-span-7 rounded-3xl bg-card/70 border border-cyan-500/20 backdrop-blur-xl p-6 sm:p-8 shadow-lg space-y-5">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Meta Expo Documentation</span>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-foreground">
                  Official Downloads & Forms
                </h3>
                <p className="text-xs text-muted-foreground">
                  Download official visa guidelines, exhibitor application form, and invitation letter for Meta Expo.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {/* Download 1: VISA Folder Meta */}
                <a
                  href="/Folders - VISA FOLDER Meta.pdf"
                  target="_blank"
                  download="VISA_FOLDER_Meta_Expo.pdf"
                  className="group p-4 rounded-2xl bg-card border border-border/60 hover:border-cyan-500/50 shadow-sm hover:shadow-glow transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 w-fit group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h4 className="text-xs font-bold text-foreground group-hover:text-cyan-400 transition-colors leading-snug">
                      VISA Information Folder
                    </h4>
                    <p className="text-[10px] text-muted-foreground leading-tight">
                      Official travel & visa guidelines for Meta Expo.
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-border/30 flex items-center justify-between text-[11px] font-bold text-cyan-400">
                    <span>Download</span>
                    <span className="text-base">↓</span>
                  </div>
                </a>

                {/* Download 2: Meta Expo Application */}
                <a
                  href="/The Meta Expo Application.pdf"
                  target="_blank"
                  download="The_Meta_Expo_Application.pdf"
                  className="group p-4 rounded-2xl bg-card border border-border/60 hover:border-cyan-500/50 shadow-sm hover:shadow-glow transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 w-fit group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h4 className="text-xs font-bold text-foreground group-hover:text-cyan-400 transition-colors leading-snug">
                      Application Form
                    </h4>
                    <p className="text-[10px] text-muted-foreground leading-tight">
                      Exhibitor booth reservation form.
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-border/30 flex items-center justify-between text-[11px] font-bold text-cyan-400">
                    <span>Download</span>
                    <span className="text-base">↓</span>
                  </div>
                </a>

                {/* Download 3: Meta Expo Letter */}
                <a
                  href="/The Meta Expo Letter.pdf"
                  target="_blank"
                  download="The_Meta_Expo_Official_Letter.pdf"
                  className="group p-4 rounded-2xl bg-card border border-border/60 hover:border-cyan-500/50 shadow-sm hover:shadow-glow transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 w-fit group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h4 className="text-xs font-bold text-foreground group-hover:text-cyan-400 transition-colors leading-snug">
                      Invitation Letter
                    </h4>
                    <p className="text-[10px] text-muted-foreground leading-tight">
                      Official endorsement letter from Raytronics.
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-border/30 flex items-center justify-between text-[11px] font-bold text-cyan-400">
                    <span>Download</span>
                    <span className="text-base">↓</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </motion.section>

      </div>

      {/* Registration Form & Modal (COMMENTED OUT FOR NOW) */}
      {/* 
      <div className="container mx-auto px-4 pb-16">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Registration Form</h2>
              <p className="text-muted-foreground mb-6">
                Join us for the Lanka Trade Expo 2026 and connect with international buyers
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      */}
    </div>
  )
}
