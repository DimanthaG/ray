"use client"

import { MotionConfig, motion } from "framer-motion"
import { HeroSection } from "./hero-section"
import { OverviewSection } from "./overview-section"
import { StatsSection } from "./stats-section"
import { SubsidiariesSection } from "./subsidiaries-section"
import { PartnersSection } from "./partners-section"
import { CtaSection } from "./cta-section"
import { SocialSection } from "./social-section"

function MotionBlock({
  children,
  delay = 0,
}: {
  children: React.ReactNode
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 1, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function HomePage() {
  const step = 0.06
  let t = 0
  const next = () => {
    const d = t
    t += step
    return d
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-background">
        {/* Subtle grid pattern overlay */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <MotionBlock delay={next()}>
          <HeroSection />
        </MotionBlock>

        <div className="container mx-auto px-4 md:px-6 py-8 md:py-16 relative z-10">
          <MotionBlock delay={next()}>
            <OverviewSection />
          </MotionBlock>
          <MotionBlock delay={next()}>
            <SubsidiariesSection />
          </MotionBlock>
          <MotionBlock delay={next()}>
            <StatsSection />
          </MotionBlock>
          <MotionBlock delay={next()}>
            <PartnersSection />
          </MotionBlock>
          <MotionBlock delay={next()}>
            <CtaSection />
          </MotionBlock>
          {/* <MotionBlock delay={next()}>
            <SocialSection />
          </MotionBlock> */}
        </div>
      </div>
    </MotionConfig>
  )
}

