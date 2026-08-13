"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Mail, Phone, MapPin, ExternalLink, Users, Sparkles, Send, MessageSquare } from "lucide-react"

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=86+Old+Kottawa+Rd+Nugegoda+Sri+Lanka"

export default function ContactContent() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(e.currentTarget)
      const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        company: formData.get("company"),
        subject: formData.get("subject"),
        message: formData.get("message"),
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to submit form")
      }

      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      })

      ;(e.target as HTMLFormElement).reset()
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-background overflow-hidden py-12 md:py-20">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[30rem] w-[min(100%,60rem)] bg-gradient-to-tr from-brand/20 via-cyan-500/15 to-indigo-600/10 blur-[130px]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 space-y-4 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-xs font-bold text-brand">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Let&apos;s Build Something Extraordinary</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-heading text-foreground tracking-tight">
            Get in <span className="text-gradient">Touch</span> With Us
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Ready to scale your social reach, launch high-impact campaigns, or consult with our strategy team? Send us a message below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto items-start">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 bg-card/60 border border-border/50 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-glow transition-all duration-300 relative overflow-hidden"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/40">
              <div className="p-2.5 rounded-2xl bg-brand/10 text-brand">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold font-heading text-foreground">Send a Direct Message</h2>
                <p className="text-xs text-muted-foreground">Our strategy team typically responds within 24 hours.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs font-semibold">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    required
                    className="rounded-xl border-border/60 bg-background/50 focus:border-brand focus:ring-brand"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs font-semibold">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@company.com"
                    required
                    className="rounded-xl border-border/60 bg-background/50 focus:border-brand focus:ring-brand"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-xs font-semibold">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+94 77 123 4567"
                    className="rounded-xl border-border/60 bg-background/50 focus:border-brand focus:ring-brand"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-xs font-semibold">Company Name</Label>
                  <Input
                    id="company"
                    name="company"
                    placeholder="Acme Corp"
                    className="rounded-xl border-border/60 bg-background/50 focus:border-brand focus:ring-brand"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className="text-xs font-semibold">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="Strategy consultation inquiry"
                  className="rounded-xl border-border/60 bg-background/50 focus:border-brand focus:ring-brand"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-xs font-semibold">Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your brand goals, target audience, or campaign requirements..."
                  className="min-h-[140px] rounded-xl border-border/60 bg-background/50 focus:border-brand focus:ring-brand"
                  required
                />
              </div>

              <Button type="submit" variant="brand-glow" className="w-full text-base py-6 group" disabled={isSubmitting}>
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <span>Send Message</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Side Contact Cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Headquarters Card */}
            <div className="bg-card/60 border border-border/50 backdrop-blur-2xl rounded-3xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-brand/10 text-brand shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold font-heading text-foreground">Global Headquarters</h3>
                  <address className="text-sm text-muted-foreground not-italic leading-relaxed">
                    86 Old Kottawa Rd,<br />
                    Nugegoda, Sri Lanka
                  </address>
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand hover:underline pt-1"
                  >
                    <span>View Location Map</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Email & Phone Card */}
            <div className="bg-card/60 border border-border/50 backdrop-blur-2xl rounded-3xl p-6 shadow-sm space-y-5">
              <h3 className="font-bold font-heading text-foreground">Direct Contact Info</h3>
              
              {/* Emails */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand">Email Addresses</span>
                <div className="space-y-2">
                  <a
                    href="mailto:sales@raytronics.lk"
                    className="flex items-center gap-3 text-muted-foreground hover:text-brand transition-colors p-2.5 rounded-xl hover:bg-brand/5 border border-transparent hover:border-brand/20 text-xs sm:text-sm"
                  >
                    <div className="p-2 rounded-lg bg-brand/10 text-brand shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="break-all font-medium">sales@raytronics.lk</span>
                  </a>
                  <a
                    href="mailto:raytronicslanka@gmail.com"
                    className="flex items-center gap-3 text-muted-foreground hover:text-brand transition-colors p-2.5 rounded-xl hover:bg-brand/5 border border-transparent hover:border-brand/20 text-xs sm:text-sm"
                  >
                    <div className="p-2 rounded-lg bg-brand/10 text-brand shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="break-all font-medium">raytronicslanka@gmail.com</span>
                  </a>
                </div>
              </div>

              {/* Phone Numbers */}
              <div className="space-y-2 pt-3 border-t border-border/40">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand">Phone & Hotlines</span>
                <div className="grid grid-cols-1 gap-2 pt-1">
                  <a
                    href="tel:+94112813808"
                    className="flex items-center justify-between gap-3 text-muted-foreground hover:text-brand transition-colors p-2.5 rounded-xl hover:bg-brand/5 border border-transparent hover:border-brand/20 text-xs sm:text-sm"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-brand/10 text-brand shrink-0">
                        <Phone className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-medium text-foreground">Office Number</span>
                    </div>
                    <span className="font-semibold text-brand">011 281 3808</span>
                  </a>

                  <a
                    href="tel:+94714727527"
                    className="flex items-center justify-between gap-3 text-muted-foreground hover:text-brand transition-colors p-2.5 rounded-xl hover:bg-brand/5 border border-transparent hover:border-brand/20 text-xs sm:text-sm"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-brand/10 text-brand shrink-0">
                        <Phone className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-medium text-foreground">Exhibitions & RayGems</span>
                    </div>
                    <span className="font-semibold text-brand">071 472 7527</span>
                  </a>

                  <a
                    href="tel:+94705599167"
                    className="flex items-center justify-between gap-3 text-muted-foreground hover:text-brand transition-colors p-2.5 rounded-xl hover:bg-brand/5 border border-transparent hover:border-brand/20 text-xs sm:text-sm"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-brand/10 text-brand shrink-0">
                        <Phone className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-medium text-foreground">Global Education</span>
                    </div>
                    <span className="font-semibold text-brand">070 559 9167</span>
                  </a>

                  <a
                    href="tel:+94777788275"
                    className="flex items-center justify-between gap-3 text-muted-foreground hover:text-brand transition-colors p-2.5 rounded-xl hover:bg-brand/5 border border-transparent hover:border-brand/20 text-xs sm:text-sm"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-brand/10 text-brand shrink-0">
                        <Phone className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-medium text-foreground">RayMart</span>
                    </div>
                    <span className="font-semibold text-brand">077 778 8275</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Meet Team Prompt Card */}
            <div className="bg-card/60 border border-border/50 backdrop-blur-2xl rounded-3xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-500 shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <div className="space-y-3">
                  <h3 className="font-bold font-heading text-foreground">Raytronics Team</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Want to learn more about our strategists and leadership team before getting started?
                  </p>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/about">Meet Leadership Team</Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

