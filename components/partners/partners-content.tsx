"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Handshake,
  ArrowRight,
  ExternalLink,
  MessageCircle,
  FileText,
  Globe2,
  ShieldCheck,
  TrendingUp,
  Truck,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  PackageCheck,
  Building,
  Layers,
  Store,
  PhoneCall,
} from "lucide-react"

interface PartnerCategory {
  id: string
  caption: string
  title: string
  description: string
  bulletPoints: string[]
  image: string
  imageAlt: string
  tags: string[]
  whatsappMsg: string
}

const partnerCategories: PartnerCategory[] = [
  {
    id: "electronics",
    caption: "INNOVATION & SMART HARDWARE",
    title: "Electronics & Smart Gadgets",
    description:
      "Expand your electronics brand into premier retail, e-commerce, and corporate supply channels. Raytronics connects tech manufacturers, smart appliance makers, and IoT innovators with established local buyers and regional export opportunities.",
    bulletPoints: [
      "Smart devices, phone accessories, and audio hardware",
      "Consumer lifestyle electronics & IoT appliances",
      "Wholesale and direct-to-consumer distribution via Ray Mart",
    ],
    image: "/images/partners/electronics.jpg",
    imageAlt: "Consumer Electronics and Smart Gadgets Partner Category",
    tags: ["Consumer Tech", "Smart Home", "Accessories", "Audio"],
    whatsappMsg:
      "Hi Raytronics, I am interested in partnering with you to sell and distribute Electronics & Smart Gadgets.",
  },
  {
    id: "gems",
    caption: "PRECIOUS HERITAGE & GLOBAL LUXURY",
    title: "Ceylon Gems & Fine Jewellery",
    description:
      "Tap into Ray Gems & Jewelry's prestigious 30+ year reputation and international presence in Colombo and Toronto, Canada. We collaborate with licensed lapidaries, artisanal jewelers, and certified gemstone merchants to reach affluent collectors worldwide.",
    bulletPoints: [
      "Certified Blue Sapphires, Rubies, and Ceylon Birthstones",
      "Handcrafted fine jewelry in 18K/22K gold & platinum",
      "Global showcase through international trade expos & Toronto showroom",
    ],
    image: "/images/partners/gems.jpeg",
    imageAlt: "Ceylon Gemstones and Fine Jewelry Partner Category",
    tags: ["Sapphires", "Birthstones", "Fine Jewelry", "Worldwide Delivery"],
    whatsappMsg:
      "Hi Ray Gems & Raytronics, I would like to partner with you to market and sell Ceylon Gemstones & Fine Jewelry.",
  },
  {
    id: "spices",
    caption: "AUTHENTIC CEYLON FLAVORS",
    title: "Pure Ceylon Spices & Agro Products",
    description:
      "Sri Lankan True Cinnamon, Cardamom, Cloves, and Black Pepper are globally recognized as the finest in the world. We partner with ethical farmers, organic estate growers, and spice processors to package and export premium grade spices to international markets.",
    bulletPoints: [
      "Pure Ceylon Alba & C5 grade True Cinnamon quills",
      "Green Cardamom, premium Cloves, and pungent Black Pepper",
      "Export packaging and regulatory compliance assistance",
    ],
    image: "/images/partners/spices.jpg",
    imageAlt: "Authentic Ceylon Spices Partner Category",
    tags: ["Ceylon Cinnamon", "Cardamom", "Export Grade", "Organic Agro"],
    whatsappMsg:
      "Hi Raytronics, I am interested in partnering with you to export and sell Ceylon Spices & Agro products.",
  },
  {
    id: "batik",
    caption: "CULTURAL ARTISAN TEXTILES",
    title: "Batik Apparel & Designer Textiles",
    description:
      "Bring authentic handmade Sri Lankan batik and designer garments to discerning local shoppers and global fashion markets. We help artisan workshops, boutique textile creators, and traditional dye masters gain international recognition.",
    bulletPoints: [
      "Hand-drawn and wax-resist dyed silk and cotton batiks",
      "Modern resort wear, sarongs, shirts, and cultural fashion",
      "Artisan home decor textiles, table runners, and wall hangings",
    ],
    image: "/images/partners/batik.jpg",
    imageAlt: "Handcrafted Ceylon Batik and Designer Textiles Partner Category",
    tags: ["Handmade Batik", "Resort Wear", "Artisan Silk", "Home Textiles"],
    whatsappMsg:
      "Hi Raytronics, I would like to partner with you to showcase and sell handcrafted Batik and textile creations.",
  },
  {
    id: "tea",
    caption: "WORLD-RENOWNED CEYLON BREW",
    title: "Pure Ceylon Tea & Specialty Blends",
    description:
      "Celebrate the golden harvest of Ceylon's hill country. Raytronics collaborates with boutique tea factories, family-owned estates, and specialty blenders to introduce single-origin loose leaf, artisanal herbal teas, and luxury tea gift chests to global tea lovers.",
    bulletPoints: [
      "Single-origin high-grown, mid-grown, and low-grown Ceylon teas",
      "Artisanal white tea (Silver Tips), green tea, and floral infusions",
      "Private-label packaging, corporate gift packs, and bulk export",
    ],
    image: "/images/partners/tea.jpg",
    imageAlt: "Pure Ceylon Tea and Specialty Infusions Partner Category",
    tags: ["Single Origin", "Silver Tips", "Loose Leaf", "Artisan Blends"],
    whatsappMsg:
      "Hi Raytronics, I am interested in partnering with you to market and export Ceylon Tea products.",
  },
  {
    id: "wellness",
    caption: "HOLISTIC NATURAL CARE",
    title: "Wellness & Ayurvedic Products",
    description:
      "The international demand for pure Ayurvedic and botanical wellness is surging. We collaborate with licensed Ayurvedic manufacturers, herbal remedies creators, and organic personal care brands to distribute traditional healing formulas to wellness consumers.",
    bulletPoints: [
      "Herbal body oils, therapeutic balms, and natural pain relief",
      "Organic Ayurvedic skincare, botanicals, and herbal remedies",
      "Compliance support for overseas retail and spa distribution",
    ],
    image: "/images/partners/wellness.jpg",
    imageAlt: "Ayurvedic Wellness and Herbal Care Partner Category",
    tags: ["Ayurveda", "Herbal Oils", "Organic Skincare", "Holistic Wellness"],
    whatsappMsg:
      "Hi Raytronics, I am interested in partnering with you to sell and export Ayurvedic and wellness products.",
  },
  {
    id: "toys",
    caption: "SUSTAINABLE ARTISAN CRAFTS",
    title: "Handcrafted Wooden Toys & Crafts",
    description:
      "Connect your eco-friendly, non-toxic wooden toys and masterfully carved handicrafts with international parents, Montessori schools, and gift boutiques. We support local woodworkers and craft communities to reach sustainable markets worldwide.",
    bulletPoints: [
      "Non-toxic, child-safe wooden educational toys & puzzles",
      "Traditional handcrafted cultural elephants, masks, and souvenirs",
      "Sustainable plantation timber with export-ready safety standards",
    ],
    image: "/images/partners/toys.jpg",
    imageAlt: "Handcrafted Wooden Toys and Artisan Crafts Partner Category",
    tags: ["Eco-Friendly", "Montessori Toys", "Handmade Crafts", "Non-Toxic"],
    whatsappMsg:
      "Hi Raytronics, I would like to partner with you to distribute handcrafted wooden toys and cultural artisan crafts.",
  },
]

const GOOGLE_FORM_URL = "https://forms.gle/PBd1o2oPegHS74aY8"
const GENERAL_WHATSAPP_URL =
  "https://wa.me/94714727527?text=Hi%20Raytronics%20Team%2C%20I%20am%20interested%20in%20becoming%20a%20partner%20to%20sell%20my%20products%20locally%20and%20internationally."

export function PartnersContent() {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Ambient Background Glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[32rem] w-[min(100%,70rem)] bg-gradient-to-tr from-brand/20 via-cyan-500/15 to-indigo-600/10 blur-[150px]" />
      <div className="pointer-events-none absolute top-[40%] right-[-10%] h-[30rem] w-[35rem] bg-brand/10 blur-[140px]" />

      {/* Hero Section */}
      <section className="relative z-10 pt-10 pb-16 md:pt-16 md:pb-24 border-b border-border/40">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-xs font-bold text-brand shadow-sm">
              <Handshake className="h-4 w-4" />
              <span>Raytronics Group Partnership Program</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-heading text-foreground tracking-tight leading-[1.1]">
              Sell Your Products to{" "}
              <span className="text-gradient">Local &amp; Global</span> Markets
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Are you a producer, craftsman, artisan, or manufacturer? Partner
              with <strong>Raytronics Group</strong> to scale your business. We
              bridge Sri Lankan excellence with eager consumers at home and
              lucrative international markets across Canada, Australia, Europe,
              and Asia.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-brand hover:bg-brand/90 text-white text-sm font-bold shadow-lg shadow-brand/25 transition-all duration-300 hover:scale-[1.02]"
              >
                <FileText className="w-4 h-4" />
                <span>Fill Partner Application Form</span>
                <ExternalLink className="w-4 h-4 opacity-80" />
              </a>

              <a
                href={GENERAL_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold shadow-lg shadow-emerald-600/25 transition-all duration-300 hover:scale-[1.02]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with Partnership Desk</span>
              </a>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-10 border-t border-border/40 mt-10 text-left">
              <div className="p-3.5 rounded-2xl bg-card/50 border border-border/40 backdrop-blur-sm">
                <div className="text-2xl font-extrabold text-foreground font-heading">
                  30+ Years
                </div>
                <div className="text-xs text-muted-foreground">
                  Corporate Legacy &amp; Trust
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-card/50 border border-border/40 backdrop-blur-sm">
                <div className="text-2xl font-extrabold text-brand font-heading">
                  Canada &amp; Beyond
                </div>
                <div className="text-xs text-muted-foreground">
                  International Offices &amp; Reach
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-card/50 border border-border/40 backdrop-blur-sm">
                <div className="text-2xl font-extrabold text-foreground font-heading">
                  7+ Categories
                </div>
                <div className="text-xs text-muted-foreground">
                  Electronics, Gems, Spices &amp; More
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-card/50 border border-border/40 backdrop-blur-sm">
                <div className="text-2xl font-extrabold text-emerald-500 font-heading">
                  100% Direct
                </div>
                <div className="text-xs text-muted-foreground">
                  Artisan &amp; Maker Support
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Multirow Section as Requested by User (Alternating Rows) */}
      <section className="py-16 md:py-24 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16 md:mb-20">
            <div className="text-xs font-bold uppercase tracking-widest text-brand">
              Product Categories
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-foreground tracking-tight">
              What We Help You Sell
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Select your category below to explore how we distribute, market,
              and export your products locally and overseas.
            </p>
          </div>

          {/* Alternating Multirow Cards */}
          <div className="space-y-16 md:space-y-24 max-w-6xl mx-auto">
            {partnerCategories.map((item, index) => {
              const isEven = index % 2 === 0
              const categoryWhatsappUrl = `https://wa.me/94714727527?text=${encodeURIComponent(item.whatsappMsg)}`

              return (
                <div
                  key={item.id}
                  id={item.id}
                  className={`flex flex-col ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  } items-center gap-8 md:gap-14 lg:gap-16 scroll-mt-28`}
                >
                  {/* Image Card Column */}
                  <div className="w-full md:w-1/2">
                    <div className="group relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-900 border border-border/60 hover:border-brand/40 shadow-xl shadow-slate-950/10 transition-all duration-300">
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 600px"
                        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-80" />

                      {/* Top Category Tag */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-3 py-1 rounded-full bg-slate-950/70 border border-white/10 backdrop-blur-md text-white text-xs font-semibold">
                          0{index + 1} • {item.tags[0]}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Text Details Column */}
                  <div className="w-full md:w-1/2 space-y-5 text-left">
                    {/* Small Caption Header */}
                    <div className="text-xs font-extrabold uppercase tracking-widest text-brand">
                      {item.caption}
                    </div>

                    {/* Bold Row Title */}
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-foreground tracking-tight leading-tight">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>

                    {/* Feature Bullets */}
                    <ul className="space-y-2.5 pt-1">
                      {item.bulletPoints.map((bullet, bIdx) => (
                        <li
                          key={bIdx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/90 font-medium"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Action Buttons matching the reference image layout */}
                    <div className="pt-3 flex flex-wrap items-center gap-3">
                      <a
                        href={GOOGLE_FORM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-brand bg-brand text-white text-xs sm:text-sm font-semibold hover:bg-brand/90 transition-all duration-200 shadow-sm shadow-brand/20 hover:scale-[1.02]"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Apply via Google Form</span>
                        <ExternalLink className="w-3 h-3 opacity-80" />
                      </a>

                      <a
                        href={categoryWhatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border/80 bg-card hover:bg-emerald-500/10 hover:border-emerald-500/40 text-foreground hover:text-emerald-500 text-xs sm:text-sm font-semibold transition-all duration-200"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Chat on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Partner with Raytronics Group */}
      <section className="py-16 md:py-24 bg-card/30 border-y border-border/40 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="text-xs font-bold uppercase tracking-widest text-brand">
              The Raytronics Advantage
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-foreground tracking-tight">
              Why Partner With Us?
            </h2>
            <p className="text-base text-muted-foreground">
              We eliminate the friction of entering overseas markets and provide
              immediate commercial leverage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <div className="p-6 rounded-2xl bg-card border border-border/50 hover:border-brand/40 transition-all duration-300 space-y-3.5 shadow-sm">
              <div className="w-11 h-11 rounded-xl bg-brand/10 text-brand flex items-center justify-center">
                <Globe2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold font-heading text-foreground">
                Canada &amp; Global Footprint
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Direct branch presence in Toronto, Canada and established
                partnerships across Australia, China, Europe, and Asia.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border/50 hover:border-brand/40 transition-all duration-300 space-y-3.5 shadow-sm">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <Store className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold font-heading text-foreground">
                Multi-Channel Sales
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Sell via Ray Mart online e-commerce, trade exhibitions,
                exclusive showroom displays, and corporate export contracts.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border/50 hover:border-brand/40 transition-all duration-300 space-y-3.5 shadow-sm">
              <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold font-heading text-foreground">
                Logistics &amp; Packaging
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Guidance on export-grade packaging, international customs
                compliance, lab certifications, and cross-border shipping.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border/50 hover:border-brand/40 transition-all duration-300 space-y-3.5 shadow-sm">
              <div className="w-11 h-11 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold font-heading text-foreground">
                Fair &amp; Prompt Settlements
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Transparent agreements, reliable payments, and respectful
                partnerships that nurture homegrown craftspeople and factories.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Simple Steps To Partner */}
      <section className="py-16 md:py-24 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <div className="text-xs font-bold uppercase tracking-widest text-brand">
              Simple Onboarding
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-foreground tracking-tight">
              How To Get Started
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Three clear steps to take your product to domestic buyers and the
              world stage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="relative p-7 rounded-3xl bg-card/60 border border-border/60 hover:border-brand/40 transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand text-white font-extrabold font-heading text-lg flex items-center justify-center shadow-md shadow-brand/20">
                1
              </div>
              <h4 className="text-lg font-bold font-heading text-foreground">
                Submit Your Details
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Fill out our quick online Google Form or message our partnership
                desk on WhatsApp with photos and descriptions of your products.
              </p>
              <div className="pt-2">
                <a
                  href={GOOGLE_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-brand hover:underline inline-flex items-center gap-1"
                >
                  <span>Open Application Form</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative p-7 rounded-3xl bg-card/60 border border-border/60 hover:border-brand/40 transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-600 text-white font-extrabold font-heading text-lg flex items-center justify-center shadow-md shadow-cyan-600/20">
                2
              </div>
              <h4 className="text-lg font-bold font-heading text-foreground">
                Product Review &amp; Terms
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Our team evaluates your samples, pricing, quality standards, and
                agrees on mutual distribution terms (retail, wholesale, or export).
              </p>
              <div className="pt-2">
                <a
                  href={GENERAL_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-emerald-500 hover:underline inline-flex items-center gap-1"
                >
                  <span>Inquire Requirements</span>
                  <ChevronRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative p-7 rounded-3xl bg-card/60 border border-border/60 hover:border-brand/40 transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-extrabold font-heading text-lg flex items-center justify-center shadow-md shadow-indigo-600/20">
                3
              </div>
              <h4 className="text-lg font-bold font-heading text-foreground">
                Launch &amp; Scale Sales
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Your products are showcased across our storefronts, online
                channels, and international buyer networks, generating ongoing orders.
              </p>
              <div className="pt-2 text-xs font-bold text-indigo-500 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Start Earning Revenue</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prominent Call to Action Banner */}
      <section className="py-16 md:py-20 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand/90 via-cyan-900/90 to-slate-900 p-8 sm:p-12 md:p-16 text-white text-center max-w-5xl mx-auto shadow-2xl border border-white/10">
            {/* Ambient Background Circles */}
            <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-brand/30 blur-3xl" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-4 py-1 text-xs font-bold text-white border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                <span>Join Our Growing Supplier Network</span>
              </div>

              <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading tracking-tight leading-tight">
                Ready to Take Your Products to the Next Level?
              </h3>

              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                Whether you produce one signature item or manage high-volume
                manufacturing, we are here to support your growth. Fill out our
                form today or message us directly on WhatsApp.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <a
                  href={GOOGLE_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-white text-slate-900 hover:bg-slate-100 text-sm font-bold shadow-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  <FileText className="w-4 h-4 text-brand" />
                  <span>Fill the Google Form</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </a>

                <a
                  href={GENERAL_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold shadow-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp: +94 71 472 7527</span>
                </a>
              </div>

              <div className="pt-4 text-xs text-white/60">
                Direct Head Office: 86 Old Kottawa Rd, Mirihana, Nugegoda •
                Phone: 011 281 3808 / 071 472 7527
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
