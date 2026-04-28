"use client"

import { MotionConfig, motion } from "framer-motion"
import { HeroSection } from "./hero-section"
import { StatsSection } from "./stats-section"
import { FeaturesSection } from "./features-section"
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
  // Keep opacity: 1 on SSR + first paint so content is never invisible before JS/hydration finishes.
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
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <MotionBlock delay={next()}>
            <HeroSection />
          </MotionBlock>
          <MotionBlock delay={next()}>
            <StatsSection />
          </MotionBlock>
          <MotionBlock delay={next()}>
            <FeaturesSection />
          </MotionBlock>
          <MotionBlock delay={next()}>
            <SubsidiariesSection />
          </MotionBlock>
          <MotionBlock delay={next()}>
            <PartnersSection />
          </MotionBlock>
          <MotionBlock delay={next()}>
            <CtaSection />
          </MotionBlock>
          <MotionBlock delay={next()}>
            <SocialSection />
          </MotionBlock>
        </div>
      </div>
    </MotionConfig>
  )
}
