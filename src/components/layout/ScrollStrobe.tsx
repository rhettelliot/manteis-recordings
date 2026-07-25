'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * Scroll-speed synced pink strobe overlay.
 *
 * A fixed, full-viewport radial wash whose opacity is driven by instantaneous
 * scroll velocity. Faster scrolling = brighter pink flash; idle = invisible.
 * Uses GSAP quickSetter for frame-synced updates without per-frame tween churn.
 */
export function ScrollStrobe() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const setOpacity = gsap.quickSetter(ref.current, 'opacity', 'number')
    let lastScroll = window.scrollY
    let velocity = 0

    const ticker = () => {
      const current = window.scrollY
      const delta = Math.abs(current - lastScroll)
      lastScroll = current
      // smooth velocity with low-pass filter
      velocity += (delta - velocity) * 0.18
      // cap peak flash so it never becomes a usability hazard
      setOpacity(Math.min(0.28, velocity * 0.012))
    }

    gsap.ticker.add(ticker)
    return () => gsap.ticker.remove(ticker)
  }, [])

  return <div ref={ref} className="scroll-strobe" aria-hidden="true" />
}
