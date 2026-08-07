import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Newspaper, ArrowRight, Sparkles, ExternalLink, Calendar, Share2 } from "lucide-react"
import { siteConfig } from "@/app/metadata"

export const metadata: Metadata = {
  title: "Media & Updates | Raytronics Group Press & News",
  description:
    "Stay updated with the latest press releases, trade expo announcements, digital marketing insights, and media features from Raytronics Group.",
}

const updates = [
  {
    id: "canada-expo-2026",
    date: "November 27, 2026",
    category: "Trade Exhibition",
    title: "Raytronics Announces Canada Ceylon Trade & Gem Expo 2026 in Toronto",
    description:
      "Connecting Sri Lankan gem exporters, tea merchants, handicraft exporters, and real estate developers with North American buyers.",
    image: "/images/hero/gem-expo-hero.png",
    link: "/register-trade-expo",
  },
  {
    id: "ray-gems-launch",
    date: "October 2026",
    category: "Corporate Venture",
    title: "Ray Gems Launches Certified Global Gemstone Authentication Program",
    description:
      "Ethically sourced Ceylon blue sapphires and fine jewelry now exported directly with international certification.",
    image: "/images/hero/ray-gems-hero.png",
    link: "https://www.raygems.lk/",
    isExternal: true,
  },
  {
    id: "ray-mart-expansion",
    date: "September 2026",
    category: "E-Commerce",
    title: "Ray Mart Expands E-Commerce Logistics & Global Settlement Support",
    description:
      "Integration of multi-currency checkout, Wise transfers, and local e-wallets to streamline worldwide retail orders.",
    image: "/images/hero/ray-mart-hero.png",
    link: "https://www.raymartsl.com/",
    isExternal: true,
  },
]

export default function MediaPage() {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden py-12 md:py-20">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[30rem] w-[min(100%,60rem)] bg-gradient-to-tr from-brand/20 via-cyan-500/15 to-indigo-600/10 blur-[140px]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-xs font-bold text-brand">
            <Newspaper className="h-4 w-4" />
            <span>Raytronics News & Press Room</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-heading text-foreground tracking-tight">
            Media & <span className="text-gradient">Group Updates</span>
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Read press releases, event announcements, and corporate news across Raytronics Group subsidiaries.
          </p>
        </div>

        {/* Media Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {updates.map((item) => (
            <article
              key={item.id}
              className="group overflow-hidden rounded-3xl bg-card/60 border border-border/50 hover:border-brand/50 backdrop-blur-xl shadow-sm hover:shadow-glow transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/10] relative overflow-hidden bg-slate-950">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-brand/90 text-white text-xs font-bold shadow-sm">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                    <Calendar className="w-3.5 h-3.5 text-brand" />
                    <span>{item.date}</span>
                  </div>
                  <h3 className="text-xl font-bold font-heading text-foreground group-hover:text-brand transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>

              <div className="p-6 pt-0">
                {item.isExternal ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-brand hover:underline"
                  >
                    <span>Visit Official Announcement</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <Link
                    href={item.link}
                    className="inline-flex items-center gap-2 text-xs font-bold text-brand hover:underline"
                  >
                    <span>Read Event Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
