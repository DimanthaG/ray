"use client"

import { homeStats } from "@/lib/site-content"

export function StatsSection() {
  return (
    <section className="mb-16 md:mb-20" aria-labelledby="stats-heading">
      <h2 id="stats-heading" className="sr-only">
        Impact at a glance
      </h2>
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
        {homeStats.map((stat) => (
          <li
            key={stat.label}
            className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 text-center"
          >
            <p className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
