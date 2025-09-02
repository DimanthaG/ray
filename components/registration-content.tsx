"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { CalendarDays, MapPin, Clock } from "lucide-react"
import Image from "next/image"

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
  "Retailer", "Wholesaler", "Manufacturer", "Importer", "Exporter", "Designer", "Investor", "Other"
]

export default function RegistrationContent() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [entryCode, setEntryCode] = useState('')

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
        
        // Business Information
        businessType: formData.get('businessType'),
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
        'Business Type': data.businessType
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

      const response = await fetch('/api/register', {
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

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="mb-6">
            <Image
              src="/logos/EventLogo.png"
              alt="Lanka Gems & Jewels Canada Exhibition"
              width={400}
              height={200}
              className="mx-auto rounded-lg"
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 mb-4">
            Visitor Registration
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Lanka Gems & Jewels Canada Exhibition
          </p>
        </motion.div>



        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-8"
        >
          <p className="text-red-700 dark:text-red-300 font-medium mb-2">
            Upon submission, a code for admission will be generated for your entry.
          </p>
          <p className="text-sm text-red-600 dark:text-red-400">
            Minors under the age of 18 are allowed to enter the show; however, registration is not required. 
            To participate, they must be accompanied by their guardian or accompanying adult aged 18 or above.
          </p>
        </motion.div>

        {/* Event Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-card border border-border/50 rounded-lg p-4 text-center">
            <CalendarDays className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Date</h3>
            <p className="text-sm text-muted-foreground">November 21-23, 2025</p>
          </div>
          <div className="bg-card border border-border/50 rounded-lg p-4 text-center">
            <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Venue</h3>
            <p className="text-sm text-muted-foreground">Hilton Toronto - Exhibition Hall</p>
          </div>
          <div className="bg-card border border-border/50 rounded-lg p-4 text-center">
            <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Registration</h3>
            <p className="text-sm text-muted-foreground">Free for Visitors</p>
          </div>
        </motion.div>

        {/* Registration Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-4xl mx-auto bg-card border border-border/50 rounded-2xl p-6 md:p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-6">Personal Information</h2>
                
                {/* Name */}
                <div>
                  <Label className="text-base font-medium mb-4 block">
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-xs mr-2">Must</span>
                    Name
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-sm text-muted-foreground">First name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="Eg: John"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-sm text-muted-foreground">Last name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Eg: Smith"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Company */}
                <div>
                  <Label className="text-base font-medium mb-2 block">
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-xs mr-2">Must</span>
                    Company
                  </Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    If you are not affiliated with a company, please write "Individual".
                  </p>
                  <Input
                    name="company"
                    placeholder="Eg: Raytronics"
                    required
                  />
                </div>

                {/* Division */}
                <div>
                  <Label htmlFor="division" className="text-base font-medium mb-2 block">
                    Items Interested in
                  </Label>
                  <Input
                    id="division"
                    name="division"
                    placeholder=""
                  />
                </div>

                {/* Job Title */}
                <div>
                  <Label htmlFor="jobTitle" className="text-base font-medium mb-2 block">
                    Job Title
                  </Label>
                  <Input
                    id="jobTitle"
                    name="jobTitle"
                    placeholder=""
                  />
                </div>

                {/* Nationality */}
                <div>
                  <Label className="text-base font-medium mb-2 block">
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-xs mr-2">Must</span>
                    Nationality
                  </Label>
                  <select
                    name="nationality"
                    required
                    className="w-full p-2 border border-input rounded-md bg-background"
                  >
                    <option value="">Please Select</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
              </div>

            {/* Address & Contact Information */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-6">Address & Contact Information</h2>
                
                {/* Address */}
                <div>
                  <Label className="text-base font-medium mb-4 block">
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-xs mr-2">Must</span>
                    Address
                  </Label>
                  
                  {/* Country */}
                  <div className="mb-4">
                    <Label htmlFor="country" className="text-sm text-muted-foreground">Country</Label>
                    <select
                      name="country"
                      required
                      className="w-full p-2 border border-input rounded-md bg-background"
                    >
                      <option value="">Please Select</option>
                      {countries.map((country) => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>

                  {/* Address */}
                  <div>
                    <Label htmlFor="address" className="text-sm text-muted-foreground">Address</Label>
                    <p className="text-xs text-muted-foreground mb-2">
                      Please indicate your FULL postal address including block number, street, city, state/province, and zip code.
                    </p>
                    <Input
                      id="address"
                      name="address"
                      placeholder="Ex) 18F Nomura Bldg, 1-26-2 Nishishinjuku, Shinjuku-ku"
                      required
                    />
                  </div>
                </div>

                {/* Mobile Number */}
                <div>
                  <Label className="text-base font-medium mb-4 block">
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-xs mr-2">Must</span>
                    Mobile Number
                  </Label>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="countryCode" className="text-sm text-muted-foreground">Country code</Label>
                      <select
                        id="countryCode"
                        name="countryCode"
                        required
                        className="w-full p-2 border border-input rounded-md bg-background"
                      >
                        <option value="">Select</option>
                        <option value="+1">+1 (US/Canada)</option>
                        <option value="+44">+44 (UK)</option>
                        <option value="+94">+94 (Sri Lanka)</option>
                        <option value="+91">+91 (India)</option>
                        <option value="+61">+61 (Australia)</option>
                        <option value="+33">+33 (France)</option>
                        <option value="+49">+49 (Germany)</option>
                        <option value="+81">+81 (Japan)</option>
                        <option value="+86">+86 (China)</option>
                        <option value="+971">+971 (UAE)</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="phoneNumber" className="text-sm text-muted-foreground">Phone number</Label>
                      <Input
                        id="phoneNumber"
                        name="phoneNumber"
                        placeholder="Ex) 1234567890"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

            {/* Business Information */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-6">Business Information</h2>
                
                {/* Type of Business */}
                <div>
                  <Label className="text-base font-medium mb-4 block">
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-xs mr-2">Must</span>
                    Type of Business
                  </Label>
                  <select
                    name="businessType"
                    required
                    className="w-full p-2 border border-input rounded-md bg-background"
                  >
                    <option value="">Please Select</option>
                    {businessTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

              {/* Terms and Conditions Notice */}
              <div className="bg-gray-50 dark:bg-gray-900 border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">
                  Please fill in all fields marked with 'Must'.
                </p>
              </div>

              <div className="flex justify-center">
                <Button type="submit" disabled={isSubmitting} size="lg">
                  {isSubmitting ? "Submitting..." : "Complete Registration"}
                </Button>
              </div>
            </div>
          </form>
        </motion.div>

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card border border-border/50 rounded-2xl p-8 max-w-lg w-full mx-4 shadow-2xl"
            >
              <div className="text-center">
                {/* Success Icon */}
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-4">
                  🎉 Registration Successful!
                </h2>

                {/* Content */}
                <div className="space-y-4 text-left">
                  <p className="text-center text-muted-foreground mb-6">
                    You have been registered for the Lanka Gems & Jewels Canada Exhibition
                  </p>

                  {/* Entry Code */}
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-2">Your Entry Code:</p>
                    <p className="text-2xl font-mono font-bold text-primary text-center tracking-wider">
                      {entryCode}
                    </p>
                  </div>

                  {/* Event Details */}
                  <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                    <h3 className="font-semibold text-sm text-muted-foreground mb-3">Event Details:</h3>
                    <div className="space-y-1 text-sm">
                      <p><span className="font-medium">Date:</span> November 21-23, 2025</p>
                      <p><span className="font-medium">Location:</span> Hilton Toronto - Exhibition Hall</p>
                      <p><span className="font-medium">Status:</span> <span className="text-green-600 dark:text-green-400 font-medium">Confirmed</span></p>
                    </div>
                  </div>

                  {/* Important Notice */}
                  <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                    <p className="text-black dark:text-amber-200 text-sm">
                      <strong>⚠️ IMPORTANT:</strong> Please save your entry code <strong>{entryCode}</strong>. 
                      You will need this code for admission to the exhibition.
                    </p>
                  </div>
                </div>

                {/* Close Button */}
                <Button 
                  onClick={() => setShowSuccessModal(false)}
                  className="w-full mt-6"
                  size="lg"
                >
                  Got it! Close
                </Button>

                <p className="text-xs text-muted-foreground mt-4">
                  Thank you for registering! We look forward to seeing you at the event.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}

