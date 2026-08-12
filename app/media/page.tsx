import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Newspaper, ArrowRight, Sparkles, ExternalLink, Calendar, MessageCircle, MapPin, Phone, Award } from "lucide-react"

export const metadata: Metadata = {
  title: "Media & Updates | Raytronics Group Press & Announcements",
  description:
    "Explore the latest updates from Raytronics Group: Ceylon Birthstone Gemstones, Live Classroom Studio rentals at Raytronics Institute, and 4-Destination Visa Consulting.",
}

const updates = [
  {
    id: "birthstone-gems",
    date: "Latest Feature",
    category: "Ray Gems & Jewelry",
    title: "Perfect Gift for your loved Once on their birthday with valuable Birthstone",
    image: "/Media/Gem.jpeg",
    whatsappMsg: "Hi Ray Gems, I am interested in Birthstone gemstones and jewelry.",
    shortDesc: "Discover the Gemstone for Your Birth Month. 100% Natural Sri Lankan Gemstones certified and delivered worldwide.",
    fullCaption: [
      "💎 January – Garnet | 💜 February – Amethyst | 💙 March – Blue Spinel",
      "🤍 April – Diamond / White Sapphire | 💚 May – Green Tourmaline / Emerald | 🤍 June – Pearl / Cat’s Eye",
      "❤️ July – Ruby | ✨ August – Zircon | 💙 September – Blue Sapphire",
      "🌙 October – Moonstone | 💛 November – Topaz | ⭐ December – Star Sapphire",
      "🎁 The Perfect Birthday Gift for your children, grandchildren, family, and loved ones.",
      "✅ 100% Natural Sri Lankan Gemstones",
      "💎 Premium Quality & Certified Stones Available",
      "💳 We Accept All Major Credit Cards | 🌍 Worldwide Delivery",
      "💰 Prices from Rs. 12,000 onwards",
      "📍 Sri Lanka: No. 86, Old Kottawa Road, Mirihana, Nugegoda | 📱 +94 71 472 7527",
      "🇨🇦 Canada: 3212-2031 Kennedy Road Toronto M1T 0B8 | 📞 +1 (437) 991-4935"
    ]
  },
  {
    id: "live-classroom-studio",
    date: "Latest Feature",
    category: "Raytronics Institute",
    title: "Looking for a Professional Venue to Conduct Your LIVE Classes?",
    image: "/Media/Class.jpeg",
    whatsappMsg: "Hi Raytronics Institute, I am interested in booking the Live Classroom Studio.",
    shortDesc: "Take your online teaching to the next level with our fully equipped Live Classroom Studio at Raytronics Institute.",
    fullCaption: [
      "✅ Smart Interactive Board",
      "✅ HD Camera & Professional Microphone",
      "✅ Zoom / Google Meet Ready & High-Speed Internet",
      "✅ Technical Assistance Available",
      "✅ Comfortable & Professional Teaching Environment",
      "📚 Perfect for: Online Classes, Tuition Classes, Corporate Training, Webinars, Workshops & Live Streaming Sessions.",
      "Whether you're teaching one class or running a full course, we've got everything you need to deliver a professional learning experience.",
      "📍 No. 86, Old Kottawa Road, Mirihana, Nugegoda",
      "📞 Book your session today: 071 472 7527"
    ]
  },
  {
    id: "global-visa-consulting",
    date: "Latest Feature",
    category: "Global Visa Services",
    title: "4 Destinations. 1 Trusted Partner. 🌏",
    image: "/Media/visa.jpeg",
    whatsappMsg: "Hi Raytronics, I would like to inquire about 4-Destination Visa Consulting.",
    shortDesc: "The world is waiting for you! Raytronics is your gateway to success across China, Malaysia, Australia, and Canada.",
    fullCaption: [
      "Whether it's the innovation of China, the vibrant culture of Malaysia, or the vast opportunities in Australia and Canada—Raytronics is your gateway to success.",
      "✅ Expert Visa Consulting",
      "✅ Reliable Service & Transparent Process",
      "✅ Personalized Guidance from University to Visa Settlement",
      "📍 Raytronics Group Headquarters: No. 86, Old Kottawa Road, Mirihana, Nugegoda",
      "📞 Call Now: 071 472 7527"
    ]
  }
]

export default function MediaPage() {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden py-12 md:py-20">
      {/* Ambient Glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[30rem] w-[min(100%,60rem)] bg-gradient-to-tr from-brand/20 via-cyan-500/15 to-indigo-600/10 blur-[140px]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-xs font-bold text-brand">
            <Newspaper className="h-4 w-4" />
            <span>Raytronics Group Newsroom &amp; Media</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-heading text-foreground tracking-tight">
            Media &amp; <span className="text-gradient">Announcements</span>
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Stay updated with official announcements, product highlights, and corporate updates across Raytronics Group.
          </p>
        </div>

        {/* Media Articles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
          {updates.map((item) => {
            const whatsappUrl = `https://wa.me/94714727527?text=${encodeURIComponent(item.whatsappMsg)}`

            return (
              <article
                key={item.id}
                className="group overflow-hidden rounded-3xl bg-card/70 border border-border/60 hover:border-brand/50 backdrop-blur-xl shadow-sm hover:shadow-glow transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Post Poster Image Container (1080px x 1080px 1:1 Aspect Ratio) */}
                  <div className="aspect-square relative overflow-hidden bg-slate-950">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      priority
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3.5 py-1 rounded-full bg-brand/90 backdrop-blur-md text-white text-xs font-bold shadow-md">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                      <Calendar className="w-3.5 h-3.5 text-brand" />
                      <span>{item.date}</span>
                    </div>

                    <h3 className="text-xl font-bold font-heading text-foreground group-hover:text-brand transition-colors leading-snug">
                      {item.title}
                    </h3>

                    {/* Formatted Full Caption */}
                    <div className="space-y-2 text-xs text-muted-foreground leading-relaxed pt-2 border-t border-border/40">
                      {item.fullCaption.map((line, idx) => (
                        <p key={idx} className={line.startsWith("💎") || line.startsWith("✅") || line.startsWith("📍") ? "font-medium text-foreground/90" : ""}>
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                {/* WhatsApp Call to Action */}
                <div className="p-6 pt-0">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md hover:shadow-emerald-600/30 transition-all duration-300"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Inquire Details on WhatsApp</span>
                  </a>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}
