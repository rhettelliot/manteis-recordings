'use client'

import { useState, useCallback, useEffect } from 'react'
import { SiteShell } from '@/components/layout/SmoothScroll'
import { Gatekeeper } from '@/components/layout/Gatekeeper'
import { Navigation } from '@/components/layout/Navigation'
import { GooeyMenu } from '@/components/layout/GooeyMenu'
import { ChromaGrid } from '@/components/layout/ChromaGrid'
import { ScrollStrobe } from '@/components/layout/ScrollStrobe'
import { ParallaxHero } from '@/components/animation/ParallaxHero'
import { Releases } from '@/components/sections/Releases'
import { ReleaseSwipeStack } from '@/components/sections/ReleaseSwipeStack'
import { CoverflowCarousel } from '@/components/sections/CoverflowCarousel'
import { HorizontalReleases } from '@/components/sections/HorizontalReleases'
import { StreamingMarquee } from '@/components/sections/StreamingMarquee'
import { Artists } from '@/components/sections/Artists'
import { MagneticArtistCards } from '@/components/sections/MagneticArtistCards'
import { Philosophy } from '@/components/sections/Philosophy'
import { CTASection } from '@/components/ui/CTASection'
import { Footer } from '@/components/layout/Footer'

export default function Home() {
  const [entered, setEntered] = useState(false)

  // Skip gate if already entered this session
  useEffect(() => {
    try {
      if (sessionStorage.getItem('mr-entered') === '1') setEntered(true)
    } catch { /* sessionStorage unavailable — show the gate, harmless */ }
  }, [])

  const handleEnter = useCallback(() => {
    try { sessionStorage.setItem('mr-entered', '1') } catch {}
    setEntered(true)
  }, [])

  if (!entered) {
    return <Gatekeeper onEnter={handleEnter} />
  }

  return (
    <SiteShell>
      <ChromaGrid />
      <ScrollStrobe />
      <GooeyMenu />
      <Navigation />
      <main id="main-content" className="relative w-full" tabIndex={-1}>
        {/* Sticky Hero */}
        <div className="sticky top-0 w-full h-screen overflow-hidden z-0">
          <ParallaxHero />
        </div>

        {/* Content scrolls OVER the Hero */}
        <div className="relative z-10 bg-void w-full">
          <div className="divider-glow" />
          <ReleaseSwipeStack />
          <CoverflowCarousel />
          <StreamingMarquee />
          <Releases />
          <HorizontalReleases />
          <StreamingMarquee />
          <Artists />
          <MagneticArtistCards />
          <Philosophy />
          <CTASection />
          <Footer />
        </div>
      </main>
    </SiteShell>
  )
}
