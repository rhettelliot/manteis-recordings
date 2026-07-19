'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* Deterministic bar heights — must match on server and client */
const FREQ_BARS = Array.from({ length: 48 }, (_, i) => {
  const h = 12 + Math.abs(Math.sin(i * 1.7) * 36) + Math.abs(Math.cos(i * 0.9) * 12)
  return Math.round(h)
})

/**
 * Label hero — the brand cube and the label name in full typographic force.
 * A faint frequency strip grounds the void; the signal stays rare.
 */
export function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: isReducedMotion ? 0 : 0.1 })

      if (!isReducedMotion) {
        gsap.set('.hero-cube', { opacity: 0, y: 20 })
        gsap.set('.hero-title-inner', { yPercent: 120, skewY: 5 })
        gsap.set('.hero-tagline', { opacity: 0, y: 30 })
        gsap.set('.hero-label-top', { opacity: 0, y: -20 })
      }

      tl.from('.hero-label-top', {
        y: isReducedMotion ? 0 : -20,
        opacity: isReducedMotion ? 1 : 0,
        duration: isReducedMotion ? 0 : 1,
        ease: 'power3.out',
      })
        .to('.hero-cube', {
          opacity: 1,
          y: 0,
          duration: isReducedMotion ? 0 : 1.2,
          ease: 'power3.out',
        }, '-=0.7')
        .to('.hero-title-inner', {
          yPercent: 0,
          skewY: 0,
          duration: isReducedMotion ? 0 : 1.4,
          stagger: 0.12,
          ease: 'power4.out',
        }, '-=0.8')
        .to('.hero-tagline', {
          y: 0,
          opacity: 1,
          duration: isReducedMotion ? 0 : 1,
          ease: 'power3.out',
        }, '-=0.8')

      // Scroll indicator bob
      if (!isReducedMotion) {
        gsap.to('.hero-scroll-arrow', {
          y: 8,
          duration: 1.5,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        })
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      aria-label="Manteis Recordings"
    >
      {/* Skeletal perspective grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="cyber-grid" />
      </div>

      {/* Frequency strip — faint spectrum along the floor of the void */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 flex items-end justify-center gap-[6px] pointer-events-none opacity-60"
        aria-hidden="true"
      >
        {FREQ_BARS.map((h, i) => (
          <div
            key={i}
            className="freq-bar"
            style={{
              height: `${h}px`,
              animationDelay: `${(i % 12) * 0.22}s`,
              animationDuration: `${2.4 + (i % 5) * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="text-center relative z-10 px-8 w-full max-w-6xl mx-auto">
        <p className="hero-label-top font-mono text-[10px] tracking-[0.3em] uppercase text-accent mb-10">
          Independent Label · Seattle, WA · Est. 2024
        </p>

        {/* Brand mark — the cube */}
        <div className="hero-cube cube-drift mx-auto mb-10 w-48 h-48 md:w-64 md:h-64 relative">
          <Image
            src="/ManteisRecordings_color.png"
            alt="Manteis Recordings brand cube"
            fill
            className="object-contain"
            sizes="128px"
            priority
          />
        </div>

        <h1 className="overflow-hidden pb-4 mb-6">
          <div className="hero-title-inner font-display text-[3.5rem] sm:text-7xl md:text-[8rem] lg:text-[9.5rem] font-bold leading-[0.86] tracking-[-0.04em] text-light">
            Manteis
          </div>
          <div className="hero-title-inner font-display text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl font-light leading-[1] tracking-[0.08em] uppercase text-light-dim">
            Recordings
          </div>
        </h1>

        <div className="hero-tagline">
          <p className="font-mono text-[11px] md:text-[12px] tracking-[0.25em] uppercase text-light mb-3">
            Sovereign Sound Architecture
          </p>
          <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-light-muted">
            9 releases · 5 artists · zero compromise
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10">
        <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-light-muted/60">Catalog</span>
        <div className="w-[1px] h-8 bg-edge-subtle relative overflow-hidden">
          <div className="hero-scroll-arrow absolute top-0 left-0 w-full h-1/2 bg-accent" />
        </div>
      </div>
    </section>
  )
}
