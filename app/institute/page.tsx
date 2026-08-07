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
  MessageSquare,
} from "lucide-react"
import { siteConfig } from "@/app/metadata"

export const metadata: Metadata = {
  title: "Raytronics Institute | Professional Digital & Tech Training Academy",
  description:
    "Raytronics Institute provides industry-leading certified training in Digital Marketing, AI Strategy, Web Development, and E-Commerce Management in Sri Lanka.",
}

const courses = [
  {
    title: "Mastering Digital Marketing & Social Media Strategy",
    duration: "3 Months (Weekend & Evening Batches)",
    level: "Beginner to Advanced",
    description:
      "Comprehensive training on Meta Ads, Google Analytics, Content Strategy, SEO, and ROI-driven social media growth.",
    icon: Laptop,
    badge: "Most Popular",
  },
  {
    title: "AI Tools & Automation for Modern Businesses",
    duration: "1 Month Intensive",
    level: "All Skill Levels",
    description:
      "Leverage Generative AI, ChatGPT workflows, design tools, and automated marketing funnels to scale operations.",
    icon: Sparkles,
    badge: "Trending",
  },
  {
    title: "E-Commerce Management & Global Trade",
    duration: "2 Months Practical",
    level: "Intermediate",
    description:
      "Store setup, Shopify/WooCommerce operations, payment gateway integration, international shipping, and customer retention.",
    icon: Globe,
    badge: "Career Focused",
  },
  {
    title: "Full-Stack Web Development & Next.js",
    duration: "4 Months Certification",
    level: "Intermediate to Advanced",
    description:
      "Build high-performance web applications using modern React, Next.js, Tailwind CSS, and cloud deployment pipelines.",
    icon: BookOpen,
    badge: "Technical Specialization",
  },
]

const highlights = [
  {
    icon: Award,
    title: "Industry Recognized Certification",
    description: "Earn accredited credentials backed by Raytronics Group network and industry partners.",
  },
  {
    icon: Users,
    title: "Mentorship by Working Experts",
    description: "Learn directly from active digital strategists and technical directors.",
  },
  {
    icon: Briefcase,
    title: "100% Practical & Real-World Projects",
    description: "Work on live brand campaigns, store setups, and real corporate cases during training.",
  },
  {
    icon: GraduationCap,
    title: "Career & Internship Placement",
    description: "Top graduates gain internship and career opportunities within Raytronics Group & partner agencies.",
  },
]

export default function InstitutePage() {
  const whatsappUrl = `https://wa.me/94714727527?text=${encodeURIComponent(
    "Hi Raytronics Institute, I am interested in course admissions and enrollment details."
  )}`

  return (
    <div className="relative min-h-screen bg-background overflow-hidden py-12 md:py-20">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[30rem] w-[min(100%,60rem)] bg-gradient-to-tr from-brand/25 via-cyan-500/20 to-amber-500/10 blur-[140px]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-6 mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-xs font-bold text-brand shadow-sm">
            <GraduationCap className="h-4 w-4" />
            <span>Raytronics Group Educational Division</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-heading text-foreground tracking-tight leading-tight">
            Raytronics <span className="text-gradient">Institute</span>
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Empowering students, entrepreneurs, and professionals with hands-on skills in Digital Marketing, AI Automation, Web Technology, and E-Commerce Growth.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
            <Button asChild size="lg" className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                <span>Inquire on WhatsApp</span>
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto rounded-xl">
              <Link href="/contact">Contact Admissions</Link>
            </Button>
          </div>
        </div>

        {/* Key Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 max-w-6xl mx-auto">
          {highlights.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-card/60 border border-border/50 backdrop-blur-xl shadow-sm hover:border-brand/40 transition-all duration-300 space-y-3"
              >
                <div className="p-3 rounded-2xl bg-brand/10 text-brand w-fit">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold font-heading text-foreground">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            )
          })}
        </div>

        {/* Featured Courses Section */}
        <div className="max-w-6xl mx-auto space-y-8 mb-20">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-brand">Professional Programs</span>
            <h2 className="text-3xl font-extrabold font-heading text-foreground">Featured Training Courses</h2>
            <p className="text-sm text-muted-foreground">
              Designed for practical execution and high-impact career growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {courses.map((course, idx) => {
              const CourseIcon = course.icon
              return (
                <div
                  key={idx}
                  className="rounded-3xl bg-card/70 border border-border/60 backdrop-blur-xl p-8 shadow-sm hover:border-brand/50 hover:shadow-glow transition-all duration-300 flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-2xl bg-brand/10 text-brand">
                        <CourseIcon className="w-6 h-6" />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-xs font-bold text-brand">
                        {course.badge}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold font-heading text-foreground">{course.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{course.description}</p>

                    <div className="flex flex-wrap gap-4 pt-2 text-xs font-medium text-muted-foreground border-t border-border/30">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-brand" />
                        {course.duration}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-brand" />
                        {course.level}
                      </span>
                    </div>
                  </div>

                  <Button asChild variant="brand-glow" className="w-full justify-center text-sm font-bold">
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      <span>Enroll / Request Syllabus</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              )
            })}
          </div>
        </div>

        {/* Location & Contact Card */}
        <div className="max-w-4xl mx-auto rounded-3xl border border-brand/30 bg-gradient-to-br from-brand/15 via-card/70 to-cyan-500/10 p-8 sm:p-12 text-center backdrop-blur-2xl shadow-xl space-y-6">
          <div className="p-3 rounded-2xl bg-brand/10 text-brand w-fit mx-auto">
            <MapPin className="w-8 h-8" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-foreground">
            Visit Raytronics Campus & Training Lab
          </h2>

          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            86 Old Kottawa Rd, Nugegoda, Sri Lanka. Classes are held in state-of-the-art modern computer labs and interactive lecture halls.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
            <Button asChild size="lg" className="w-full sm:w-auto bg-brand hover:bg-brand/90 text-white font-bold rounded-xl">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <span>Inquire Course Fees & Schedule</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
