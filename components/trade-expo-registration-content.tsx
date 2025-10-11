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
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-red-600 text-white py-16">
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
            <p className="text-lg mb-8">22 | 23 | 24 May 2026</p>
            
            <div className="flex flex-wrap justify-center gap-8 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5" />
                <span>May 22-24, 2026</span>
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
      </div>

      {/* Event Image */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="relative aspect-video rounded-xl overflow-hidden">
            <Image
              src="/RayExpo_2.jpg"
              alt="Lanka Trade Expo 2026 - Toronto, Canada"
              width={800}
              height={450}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>

      {/* Registration Form */}
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
              
              {/* Progress Indicator */}
              <div className="flex justify-center mb-8">
                <div className="flex items-center space-x-4">
                  {[1, 2, 3, 4].map((step) => (
                    <div key={step} className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          step <= currentStep
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {step}
                      </div>
                      {step < 4 && (
                        <div
                          className={`w-16 h-1 mx-2 ${
                            step < currentStep ? 'bg-primary' : 'bg-muted'
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        required
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        required
                        placeholder="Enter your last name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Company Name *</Label>
                      <Input
                        id="company"
                        name="company"
                        required
                        placeholder="Enter your company name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="division">Division/Department</Label>
                      <Input
                        id="division"
                        name="division"
                        placeholder="Enter division or department"
                      />
                    </div>
                    <div>
                      <Label htmlFor="jobTitle">Job Title</Label>
                      <Input
                        id="jobTitle"
                        name="jobTitle"
                        placeholder="Enter your job title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="nationality">Nationality *</Label>
                      <select
                        id="nationality"
                        name="nationality"
                        required
                        className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Select your nationality</option>
                        {countries.map((country) => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Contact Information */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="country">Country *</Label>
                      <select
                        id="country"
                        name="country"
                        required
                        className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Select your country</option>
                        {countries.map((country) => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="address">Address *</Label>
                      <Textarea
                        id="address"
                        name="address"
                        required
                        placeholder="Enter your complete address"
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="countryCode">Country Code *</Label>
                        <Input
                          id="countryCode"
                          name="countryCode"
                          required
                          placeholder="+94"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="phoneNumber">Phone Number *</Label>
                        <Input
                          id="phoneNumber"
                          name="phoneNumber"
                          required
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Business Information */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-semibold mb-4">Business Information</h3>
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="businessType">Business Type *</Label>
                      <select
                        id="businessType"
                        name="businessType"
                        required
                        className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Select your business type</option>
                        {businessTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="companySize">Company Size *</Label>
                      <select
                        id="companySize"
                        name="companySize"
                        required
                        className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Select company size</option>
                        {companySizes.map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="yearsInBusiness">Years in Business *</Label>
                      <Input
                        id="yearsInBusiness"
                        name="yearsInBusiness"
                        required
                        type="number"
                        placeholder="Enter years in business"
                        min="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="productsServices">Products/Services *</Label>
                      <Textarea
                        id="productsServices"
                        name="productsServices"
                        required
                        placeholder="Describe your products or services"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="targetMarkets">Target Markets</Label>
                      <Textarea
                        id="targetMarkets"
                        name="targetMarkets"
                        placeholder="Which markets are you targeting?"
                        rows={2}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Exhibition Goals */}
              {currentStep === 4 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-semibold mb-4">Exhibition Goals</h3>
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="exhibitionGoals">What are your goals for this exhibition? *</Label>
                      <Textarea
                        id="exhibitionGoals"
                        name="exhibitionGoals"
                        required
                        placeholder="Describe what you hope to achieve at the Lanka Trade Expo 2026"
                        rows={4}
                      />
                    </div>
                    
                    <div className="bg-muted/50 p-6 rounded-lg">
                      <h4 className="font-semibold mb-3">Event Categories:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-primary">•</span>
                          <span>Gem & Jewelry</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-primary">•</span>
                          <span>Toys & Gift Items</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-primary">•</span>
                          <span>Spices</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-primary">•</span>
                          <span>Travel & Tourism</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-primary">•</span>
                          <span>Tea & Herbal Beverages</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-primary">•</span>
                          <span>Batik & Garments</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>
                
                {currentStep < 4 ? (
                  <Button type="button" onClick={nextStep}>
                    Next
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Registration"}
                  </Button>
                )}
              </div>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-lg p-8 max-w-md w-full text-center"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4">Registration Successful!</h3>
            <p className="text-muted-foreground mb-4">
              Thank you for registering for the Lanka Trade Expo 2026.
            </p>
            <div className="bg-muted/50 p-4 rounded-lg mb-6">
              <p className="text-sm text-muted-foreground mb-2">Your Entry Code:</p>
              <p className="text-lg font-mono font-bold text-primary">{entryCode}</p>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Please save this entry code. You will need it for exhibition access.
            </p>
            <div className="flex gap-3">
              <Button
                onClick={() => setShowSuccessModal(false)}
                className="flex-1"
              >
                Close
              </Button>
              <Button
                asChild
                variant="outline"
                className="flex-1"
              >
                <Link href="/">
                  Back to Home
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
