'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface SiteShellProps {
  children: React.ReactNode
}

/**
 * Smooth scroll engine (Lenis + GSAP ticker).
 * Single source of truth — no second Lenis instances.
 */
export function SiteShell({ children }: SiteShellProps) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    })
    lenisRef.current = lenis

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    lenis.on('scroll', ScrollTrigger.update)

    // Sync on init
    ScrollTrigger.refresh()

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])

  return (
    <>
      <div className="fog-top" />
      <div className="fog-bottom" />
      {children}
    </>
  )
}