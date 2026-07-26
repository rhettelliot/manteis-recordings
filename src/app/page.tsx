'use client'

import { useState, useCallback, useEffect } from 'react'
import { SiteShell } from '@/components/layout/SmoothScroll'

import { Navigation } from '@/components/layout/Navigation'

import { ParallaxHero } from '@/components/animation/ParallaxHero'
import { Releases } from '@/components/sections/Releases'
import { CoverflowCarousel } from '@/components/sections/CoverflowCarousel'
import { StreamingMarquee } from '@/components/sections/StreamingMarquee'
import { Artists } from '@/components/sections/Artists'
import { Philosophy } from '@/components/sections/Philosophy'
import { CTASection } from '@/components/ui/CTASection'
import { Footer } from '@/components/layout/Footer'

export default function Home() {
  // No gate — content loads directly
  return (
    <SiteShell>
      <Navigation />
      <main id="main-content" className="relative w-full overflow-x-hidden" tabIndex={-1}>
        {/* Sticky Hero */}
        <div className="sticky top-0 w-full h-screen overflow-hidden z-0 pt-16 md:pt-0">
          <ParallaxHero />
        </div>

        {/* Content scrolls OVER the Hero */}
        <div className="relative z-10 bg-void w-full">
          <div className="divider-glow" />

          {/* Single catalog teaser — coverflow only */}
          <CoverflowCarousel />

          {/* Single streaming marquee */}
          <StreamingMarquee />

          {/* Single browsable catalog with filtering */}
          <Releases />

          {/* Single roster — artist list only */}
          <Artists />

          <Philosophy />
          <CTASection />
          <Footer />
        </div>
      </main>
    </SiteShell>
  )
}
