"use client"

import { homeStats } from "@/lib/site-content"
import { Users, Eye, Award, Headset } from "lucide-react"

const icons = [Users, Eye, Award, Headset]

export function StatsSection() {
  return (
    <section className="mb-20 md:mb-28" aria-labelledby="stats-heading">
      <h2 id="stats-heading" className="sr-only">
        Impact at a glance
      </h2>
      <div className="text-center mb-10 max-w-xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-brand">Track Record</span>
        <h3 className="text-2xl sm:text-3xl font-bold font-heading">Measured Performance</h3>
        <p className="text-sm text-muted-foreground">
          Proven results generated across Raytronics Group initiatives & client partnerships.
        </p>
      </div>
      
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
        {homeStats.map((stat, idx) => {
          const IconComponent = icons[idx % icons.length]
          return (
            <li
              key={stat.label}
              className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card/60 backdrop-blur-xl p-6 text-center shadow-sm hover:border-brand/50 hover:shadow-glow hover:-translate-y-1 transition-all duration-300"
            >
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand group-hover:bg-brand group-hover:text-white transition-colors duration-300">
                <IconComponent className="h-6 w-6" />
              </div>
              <p className="text-3xl md:text-4xl font-extrabold text-foreground font-heading tracking-tight group-hover:text-brand transition-colors">
                {stat.value}
              </p>
              <p className="text-xs md:text-sm font-medium text-muted-foreground mt-1">
                {stat.label}
              </p>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

