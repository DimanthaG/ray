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

      {/* Event Image */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-slate-950">
            <Image
              src="/Gem expo.jpg"
              alt="Lanka Gem & Trade Expo 2026 - Toronto, Canada"
              width={1080}
              height={1080}
              className="w-full h-full object-contain"
              priority
            />
          </div>
        </motion.div>
      </div>

      {/* Official PDF Downloads Section */}
      <div className="container mx-auto px-4 pb-12">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="max-w-4xl mx-auto rounded-3xl bg-card/70 border border-brand/30 backdrop-blur-xl p-8 shadow-lg text-center space-y-6"
        >
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand">Official Documents & Downloads</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-foreground">
              Exhibition Folders & Application Forms
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Download official event documentation, visa information folders, and application forms below.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left pt-2">
            {/* Download 1: VISA Folder */}
            <a
              href="/Folders - VISA FOLDER.pdf"
              target="_blank"
              download="VISA_FOLDER_Lanka_Trade_Expo.pdf"
              className="group p-5 rounded-2xl bg-card border border-border/60 hover:border-brand/50 shadow-sm hover:shadow-glow transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-brand/10 text-brand w-fit group-hover:bg-brand group-hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-foreground group-hover:text-brand transition-colors">
                  VISA Information Folder
                </h3>
                <p className="text-[11px] text-muted-foreground">
                  Official travel and visa guidelines for Canadian expo participants.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-border/30 flex items-center justify-between text-xs font-bold text-brand">
                <span>Download PDF</span>
                <span className="text-lg">↓</span>
              </div>
            </a>

            {/* Download 2: Gem Expo Application */}
            <a
              href="/The Gem Expo Application.pdf"
              target="_blank"
              download="The_Gem_Expo_Application.pdf"
              className="group p-5 rounded-2xl bg-card border border-border/60 hover:border-brand/50 shadow-sm hover:shadow-glow transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-brand/10 text-brand w-fit group-hover:bg-brand group-hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-foreground group-hover:text-brand transition-colors">
                  Gem Expo Application Form
                </h3>
                <p className="text-[11px] text-muted-foreground">
                  Exhibitor booth reservation and registration form.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-border/30 flex items-center justify-between text-xs font-bold text-brand">
                <span>Download PDF</span>
                <span className="text-lg">↓</span>
              </div>
            </a>

            {/* Download 3: Gem Expo Letter */}
            <a
              href="/The Gem Expo Letter.pdf"
              target="_blank"
              download="The_Gem_Expo_Official_Letter.pdf"
              className="group p-5 rounded-2xl bg-card border border-border/60 hover:border-brand/50 shadow-sm hover:shadow-glow transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-brand/10 text-brand w-fit group-hover:bg-brand group-hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-foreground group-hover:text-brand transition-colors">
                  Official Invitation Letter
                </h3>
                <p className="text-[11px] text-muted-foreground">
                  Official endorsement and invitation letter from Raytronics Group.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-border/30 flex items-center justify-between text-xs font-bold text-brand">
                <span>Download PDF</span>
                <span className="text-lg">↓</span>
              </div>
            </a>
          </div>
        </motion.div>
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
