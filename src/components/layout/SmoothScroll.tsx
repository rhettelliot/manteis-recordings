'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

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
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let lenis: Lenis | null = null
    let gsapInstance: typeof import('gsap').default | null = null
    let tick: ((time: number) => void) | null = null
    let active = true

    const init = async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      if (!active) return
      gsap.registerPlugin(ScrollTrigger)
      gsapInstance = gsap

      lenis = new Lenis({
        lerp: isReducedMotion ? 1 : 0.08,
        smoothWheel: !isReducedMotion,
      })
      lenisRef.current = lenis

      // Keep the exact callback reference so cleanup can remove it — passing
      // lenis.raf here (as the old code did to ticker.remove) removes nothing,
      // leaking a ticker that calls raf() on a destroyed Lenis.
      tick = (time: number) => lenis!.raf(time * 1000)
      gsap.ticker.add(tick)

      gsap.ticker.lagSmoothing(0)

      lenis.on('scroll', ScrollTrigger.update)

      // Sync on init
      ScrollTrigger.refresh()
    }

    init()

    return () => {
      active = false
      if (tick) gsapInstance?.ticker.remove(tick)
      lenis?.destroy()
      lenisRef.current = null
    }
  }, [])

  return (
    <>
      <div className="fog-top" aria-hidden="true" />
      <div className="fog-bottom" aria-hidden="true" />
      {children}
    </>
  )
}