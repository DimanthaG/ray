"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CtaSection() {
  return (
    <section
      className="mb-16 rounded-2xl border border-brand/20 bg-gradient-to-br from-brand/10 via-background to-brand/5 px-6 py-12 md:px-12 md:py-14 text-center"
      aria-labelledby="cta-heading"
    >
      <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
        Let&apos;s talk about your next campaign
      </h2>
      <p className="text-muted-foreground max-w-xl mx-auto mb-8">
        From strategy to content and analytics, we help brands grow across social and digital
        channels.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button asChild size="lg" className="group bg-brand hover:bg-brand/90">
          <Link href="/contact">
            Book a consultation
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="/portfolio">See our work</Link>
        </Button>
      </div>
    </section>
  )
}
