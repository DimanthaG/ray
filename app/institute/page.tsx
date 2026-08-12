<<<<<<< HEAD
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  GraduationCap,
  BookOpen,
  Award,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Laptop,
  Briefcase,
  Globe,
  Clock,
  MapPin,
  MessageCircle,
  FileCheck,
  Plane,
} from "lucide-react"
import { EducationalPartnersSection } from "@/components/home/educational-partners-section"

export const metadata: Metadata = {
  title: "Raytronics Institute | Global Higher Education & Visa Pathways",
  description:
    "Raytronics Institute connects Sri Lankan students to top universities in UK, Australia, Canada, Germany, Ireland & USA. Comprehensive admissions, visa guidance & scholarships.",
}

const destinations = [
  {
    country: "United Kingdom",
    code: "gb",
    description: "Fast-track degrees & post-study work visas.",
    badge: "1-Year Masters Available",
  },
  {
    country: "Australia",
    code: "au",
    description: "Top-ranked universities with strong PR pathways.",
    badge: "Post-Study Work Permits",
  },
  {
    country: "Canada",
    code: "ca",
    description: "Skill Development Council Canada pathways & work permits.",
    badge: "PR & Immigration Focus",
  },
  {
    country: "Germany",
    code: "de",
    description: "Low/Free tuition education & tech specializations.",
    badge: "EU Career Hub",
  },
  {
    country: "Ireland",
    code: "ie",
    description: "EU hub for tech and business careers.",
    badge: "2-Year Stay Back",
  },
  {
    country: "USA",
    code: "us",
    description: "Unrivaled research, scholarship, and campus opportunities.",
    badge: "STEM OPT Pathways",
  },
]

export default function InstitutePage() {
  const whatsappApplyUrl = `https://wa.me/94705599167?text=${encodeURIComponent(
    "Hi Raytronics Institute, I want to Apply for International Student Intake."
  )}`

  const whatsappConsultationUrl = `https://wa.me/94705599167?text=${encodeURIComponent(
    "Hi Raytronics Institute, I would like to Book a Free Higher Education Consultation."
  )}`

  return (
    <div className="relative min-h-screen bg-background overflow-hidden py-12 md:py-20">
      {/* Ambient Glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[30rem] w-[min(100%,60rem)] bg-gradient-to-tr from-brand/25 via-cyan-500/20 to-amber-500/10 blur-[140px]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* 1. Hero Header */}
        <div className="text-center max-w-4xl mx-auto space-y-6 mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-xs font-bold text-brand shadow-sm">
            <GraduationCap className="h-4 w-4" />
            <span>RAYTRONICS INSTITUTE • GLOBAL EDUCATION DIVISION</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-heading text-foreground tracking-tight leading-tight">
            Your Gateway to <span className="text-gradient">World-Class Higher Education</span> &amp; Global Careers
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Over 30 years of trust powering Sri Lankan students toward international university admissions, scholarships, and global settlement pathways.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-3">
            <Button asChild size="lg" className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg transition-all">
              <a href={whatsappApplyUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2.5 text-base">
                <MessageCircle className="w-5 h-5" />
                <span>Apply for Intake</span>
              </a>
            </Button>

            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto rounded-xl text-base border-brand/30 bg-card/60 backdrop-blur-md">
              <a href={whatsappConsultationUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2.5">
                <MessageCircle className="w-5 h-5 text-brand" />
                <span>Book Free Consultation</span>
              </a>
            </Button>
          </div>
        </div>

        {/* 2. About Raytronics Institute (Quick Overview) */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-card/70 border border-border/60 backdrop-blur-xl p-8 sm:p-12 shadow-sm mb-20 space-y-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3.5 py-1 text-xs font-bold text-brand">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ESTABLISHED 1993</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-foreground">
            Empowering Students Since 1993
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Raytronics Institute is the educational arm of Raytronics Group, dedicated to opening international avenues for Sri Lankan students. Backed by three decades of corporate trust, we offer end-to-end guidance for higher education—from university selection and scholarship applications to complete visa processing and post-study work pathways.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-border/40 text-center">
            <div className="p-4 rounded-2xl bg-brand/5 border border-brand/10">
              <div className="text-2xl sm:text-3xl font-extrabold text-brand font-heading">30+</div>
              <div className="text-xs text-muted-foreground mt-1">Years of Trust</div>
            </div>
            <div className="p-4 rounded-2xl bg-brand/5 border border-brand/10">
              <div className="text-2xl sm:text-3xl font-extrabold text-brand font-heading">100%</div>
              <div className="text-xs text-muted-foreground mt-1">Visa Guidance</div>
            </div>
            <div className="p-4 rounded-2xl bg-brand/5 border border-brand/10">
              <div className="text-2xl sm:text-3xl font-extrabold text-brand font-heading">6+</div>
              <div className="text-xs text-muted-foreground mt-1">Top Destinations</div>
            </div>
            <div className="p-4 rounded-2xl bg-brand/5 border border-brand/10">
              <div className="text-2xl sm:text-3xl font-extrabold text-brand font-heading">PR</div>
              <div className="text-xs text-muted-foreground mt-1">Settlement Pathways</div>
            </div>
          </div>
        </div>

        {/* 3. Study Destinations (Country Cards Grid) */}
        <div className="max-w-6xl mx-auto mb-20 space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-brand">GLOBAL HIGHER EDUCATION</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-foreground">Choose Your Study Destination</h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Direct representation and pathways to top universities across major countries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((item, idx) => (
              <div
                key={idx}
                className="rounded-3xl bg-card/60 border border-border/50 backdrop-blur-xl p-6 shadow-sm hover:border-brand/40 hover:shadow-glow transition-all duration-300 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Image
                      src={`https://flagcdn.com/w160/${item.code}.png`}
                      alt={`${item.country} flag`}
                      width={48}
                      height={32}
                      className="rounded-md object-cover shadow-sm border border-border/40"
                    />
                    <span className="px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-xs font-bold text-brand">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold font-heading text-foreground">{item.country}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>

                <Button asChild variant="brand-glow" className="w-full justify-center text-xs font-bold">
                  <a href={whatsappApplyUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <span>Inquire {item.country} Pathways</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* 4. RayEdu Educational Partners Section */}
        <EducationalPartnersSection />

        {/* Campus Location Card */}
        <div className="max-w-4xl mx-auto rounded-3xl border border-brand/30 bg-gradient-to-br from-brand/15 via-card/70 to-cyan-500/10 p-8 sm:p-12 text-center backdrop-blur-2xl shadow-xl space-y-6">
          <div className="p-3 rounded-2xl bg-brand/10 text-brand w-fit mx-auto">
            <MapPin className="w-8 h-8" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-foreground">
            Visit Raytronics Campus &amp; Student Counseling Office
          </h2>

          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            86 Old Kottawa Rd, Nugegoda, Sri Lanka. Meet our expert education counselors for one-on-one guidance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
            <Button asChild size="lg" className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl">
              <a href={whatsappConsultationUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                <span>Book Free One-on-One Counseling</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
=======
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  GraduationCap,
  BookOpen,
  Award,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Laptop,
  Briefcase,
  Globe,
  Clock,
  MapPin,
  MessageCircle,
  FileCheck,
  Plane,
} from "lucide-react"
import { EducationalPartnersSection } from "@/components/home/educational-partners-section"

export const metadata: Metadata = {
  title: "Raytronics Institute | Global Higher Education & Visa Pathways",
  description:
    "Raytronics Institute connects Sri Lankan students to top universities in UK, Australia, Canada, Germany, Ireland & USA. Comprehensive admissions, visa guidance & scholarships.",
}

const destinations = [
  {
    country: "United Kingdom",
    code: "gb",
    description: "Fast-track degrees & post-study work visas.",
    badge: "1-Year Masters Available",
  },
  {
    country: "Australia",
    code: "au",
    description: "Top-ranked universities with strong PR pathways.",
    badge: "Post-Study Work Permits",
  },
  {
    country: "Canada",
    code: "ca",
    description: "Skill Development Council Canada pathways & work permits.",
    badge: "PR & Immigration Focus",
  },
  {
    country: "Germany",
    code: "de",
    description: "Low/Free tuition education & tech specializations.",
    badge: "EU Career Hub",
  },
  {
    country: "Ireland",
    code: "ie",
    description: "EU hub for tech and business careers.",
    badge: "2-Year Stay Back",
  },
  {
    country: "USA",
    code: "us",
    description: "Unrivaled research, scholarship, and campus opportunities.",
    badge: "STEM OPT Pathways",
  },
]

export default function InstitutePage() {
  const whatsappApplyUrl = `https://wa.me/94705599167?text=${encodeURIComponent(
    "Hi Raytronics Institute, I want to Apply for International Student Intake."
  )}`

  const whatsappConsultationUrl = `https://wa.me/94705599167?text=${encodeURIComponent(
    "Hi Raytronics Institute, I would like to Book a Free Higher Education Consultation."
  )}`

  return (
    <div className="relative min-h-screen bg-background overflow-hidden py-12 md:py-20">
      {/* Ambient Glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[30rem] w-[min(100%,60rem)] bg-gradient-to-tr from-brand/25 via-cyan-500/20 to-amber-500/10 blur-[140px]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* 1. Hero Header */}
        <div className="text-center max-w-4xl mx-auto space-y-6 mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-xs font-bold text-brand shadow-sm">
            <GraduationCap className="h-4 w-4" />
            <span>RAYTRONICS INSTITUTE • GLOBAL EDUCATION DIVISION</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-heading text-foreground tracking-tight leading-tight">
            Your Gateway to <span className="text-gradient">World-Class Higher Education</span> &amp; Global Careers
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Over 30 years of trust powering Sri Lankan students toward international university admissions, scholarships, and global settlement pathways.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-3">
            <Button asChild size="lg" className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg transition-all">
              <a href={whatsappApplyUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2.5 text-base">
                <MessageCircle className="w-5 h-5" />
                <span>Apply for Intake</span>
              </a>
            </Button>

            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto rounded-xl text-base border-brand/30 bg-card/60 backdrop-blur-md">
              <a href={whatsappConsultationUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2.5">
                <MessageCircle className="w-5 h-5 text-brand" />
                <span>Book Free Consultation</span>
              </a>
            </Button>
          </div>
        </div>

        {/* 2. About Raytronics Institute (Quick Overview) */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-card/70 border border-border/60 backdrop-blur-xl p-8 sm:p-12 shadow-sm mb-20 space-y-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3.5 py-1 text-xs font-bold text-brand">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ESTABLISHED 1993</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-foreground">
            Empowering Students Since 1993
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Raytronics Institute is the educational arm of Raytronics Group, dedicated to opening international avenues for Sri Lankan students. Backed by three decades of corporate trust, we offer end-to-end guidance for higher education—from university selection and scholarship applications to complete visa processing and post-study work pathways.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-border/40 text-center">
            <div className="p-4 rounded-2xl bg-brand/5 border border-brand/10">
              <div className="text-2xl sm:text-3xl font-extrabold text-brand font-heading">30+</div>
              <div className="text-xs text-muted-foreground mt-1">Years of Trust</div>
            </div>
            <div className="p-4 rounded-2xl bg-brand/5 border border-brand/10">
              <div className="text-2xl sm:text-3xl font-extrabold text-brand font-heading">100%</div>
              <div className="text-xs text-muted-foreground mt-1">Visa Guidance</div>
            </div>
            <div className="p-4 rounded-2xl bg-brand/5 border border-brand/10">
              <div className="text-2xl sm:text-3xl font-extrabold text-brand font-heading">6+</div>
              <div className="text-xs text-muted-foreground mt-1">Top Destinations</div>
            </div>
            <div className="p-4 rounded-2xl bg-brand/5 border border-brand/10">
              <div className="text-2xl sm:text-3xl font-extrabold text-brand font-heading">PR</div>
              <div className="text-xs text-muted-foreground mt-1">Settlement Pathways</div>
            </div>
          </div>
        </div>

        {/* 3. Study Destinations (Country Cards Grid) */}
        <div className="max-w-6xl mx-auto mb-20 space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-brand">GLOBAL HIGHER EDUCATION</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-foreground">Choose Your Study Destination</h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Direct representation and pathways to top universities across major countries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((item, idx) => (
              <div
                key={idx}
                className="rounded-3xl bg-card/60 border border-border/50 backdrop-blur-xl p-6 shadow-sm hover:border-brand/40 hover:shadow-glow transition-all duration-300 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Image
                      src={`https://flagcdn.com/w160/${item.code}.png`}
                      alt={`${item.country} flag`}
                      width={48}
                      height={32}
                      className="rounded-md object-cover shadow-sm border border-border/40"
                    />
                    <span className="px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-xs font-bold text-brand">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold font-heading text-foreground">{item.country}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>

                <Button asChild variant="brand-glow" className="w-full justify-center text-xs font-bold">
                  <a href={whatsappApplyUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <span>Inquire {item.country} Pathways</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* 4. RayEdu Educational Partners Section */}
        <EducationalPartnersSection />

        {/* Campus Location Card */}
        <div className="max-w-4xl mx-auto rounded-3xl border border-brand/30 bg-gradient-to-br from-brand/15 via-card/70 to-cyan-500/10 p-8 sm:p-12 text-center backdrop-blur-2xl shadow-xl space-y-6">
          <div className="p-3 rounded-2xl bg-brand/10 text-brand w-fit mx-auto">
            <MapPin className="w-8 h-8" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-foreground">
            Visit Raytronics Campus &amp; Student Counseling Office
          </h2>

          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            86 Old Kottawa Rd, Nugegoda, Sri Lanka. Meet our expert education counselors for one-on-one guidance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
            <Button asChild size="lg" className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl">
              <a href={whatsappConsultationUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                <span>Book Free One-on-One Counseling</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
>>>>>>> a203ad2a969eb7270ca3a6c54e485115086f3c1c
}