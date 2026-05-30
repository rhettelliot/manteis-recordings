'use client'

import { useState, useCallback, useEffect } from 'react'
import { SiteShell } from '@/components/layout/SmoothScroll'
import { Gatekeeper } from '@/components/layout/Gatekeeper'
import { Navigation } from '@/components/layout/Navigation'
import { Hero } from '@/components/animation/Hero'
import { Releases } from '@/components/sections/Releases'
import { Artists } from '@/components/sections/Artists'
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
      <Navigation />
      <main className="relative w-full" id="top">
        {/* Sticky Hero */}
        <div className="sticky top-0 w-full h-screen overflow-hidden z-0">
          <Hero />
        </div>

        {/* Content scrolls OVER the Hero */}
        <div className="relative z-10 bg-void w-full">
          <div className="divider-glow" />
          <Releases />
          <Artists />
          <Philosophy />
          <CTASection />
          <Footer />
        </div>
      </main>
    </SiteShell>
  )
}