"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CtaSection() {
  return (
    <section className="text-center mb-16" aria-labelledby="cta-heading">
      <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold mb-6">
        Ready to transform your digital presence?
      </h2>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button asChild size="lg" className="group">
          <Link href="/contact">
            Get started
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="/portfolio">View our work</Link>
        </Button>
      </div>
    </section>
  )
}
