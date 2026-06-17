"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Mail, Phone, MapPin, ExternalLink, Users } from "lucide-react"

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=330%2F08+Saman+Mawatha+Lake+Road+Boralesgamuwa+Sri+Lanka"

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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Get in <span className="text-brand">Touch</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to transform your social media presence? Contact us today and let&apos;s discuss
            how we can help your business grow.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-card border border-border/50 rounded-2xl p-6 md:p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input id="name" name="name" placeholder="Your name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" type="tel" placeholder="Your phone number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" name="company" placeholder="Your company name" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" name="subject" placeholder="What's this about?" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="How can we help you?"
                  className="min-h-[150px]"
                  required
                />
              </div>
              <Button type="submit" variant="brand" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="bg-card border border-border/50 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-brand mt-1 shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Our Location</h3>
                  <address className="text-muted-foreground not-italic leading-relaxed mb-4">
                    330/08, Saman Mawatha
                    <br />
                    Lake Road
                    <br />
                    Boralesgamuwa
                  </address>
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline"
                  >
                    Open in Google Maps
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border/50 rounded-2xl p-6">
              <h3 className="font-semibold mb-4">General inquiries</h3>
              <div className="space-y-3 text-sm">
                <a
                  href="mailto:lasa_ray@yahoo.com"
                  className="flex items-center gap-2 text-muted-foreground hover:text-brand transition-colors"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  lasa_ray@yahoo.com
                </a>
                <a
                  href="tel:+94777727527"
                  className="flex items-center gap-2 text-muted-foreground hover:text-brand transition-colors"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  +94 (77) 772 7527
                </a>
              </div>
            </div>

            <div className="bg-card border border-border/50 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <Users className="w-5 h-5 text-brand mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Meet our team</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    Want to know who you&apos;ll be working with? Browse profiles of our strategists
                    and leadership.
                  </p>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/about">View team</Link>
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
