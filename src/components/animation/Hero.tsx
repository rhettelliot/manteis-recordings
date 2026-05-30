'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Label hero — the label name in full typographic force,
 * with a subtle cosmic radial glow, no 3D.
 */
export function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 })

      gsap.set('.hero-title-inner', { yPercent: 120, skewY: 5 })
      gsap.set('.hero-tagline', { opacity: 0, y: 30 })
      gsap.set('.hero-label-top', { opacity: 0, y: -20 })

      tl.from('.hero-label-top', { y: -20, opacity: 0, duration: 1, ease: 'power3.out' })
        .to('.hero-title-inner', {
          yPercent: 0,
          skewY: 0,
          duration: 1.4,
          stagger: 0.12,
          ease: 'power4.out',
        }, '-=0.6')
        .from('.hero-tagline', { y: 30, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.8')

      // Scroll indicator bob
      gsap.to('.hero-scroll-arrow', {
        y: 8,
        duration: 1.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Subtle radial glow — label warmth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(0,122,255,0.05) 0%, rgba(255,107,53,0.02) 35%, rgba(0,0,0,0) 70%)',
        }}
      />

      {/* Skeletal perspective grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="cyber-grid" />
      </div>

      {/* Content */}
      <div className="text-center relative z-10 px-8 w-full max-w-6xl mx-auto">
        <p className="hero-label-top font-mono text-[10px] tracking-[0.3em] uppercase text-accent mb-8">
          Deep textural electronic music
        </p>

        <h1 className="overflow-hidden pb-4 mb-6">
          <div className="hero-title-inner font-display text-[4rem] sm:text-7xl md:text-[8.5rem] lg:text-[10rem] font-bold leading-[0.86] tracking-[-0.04em]">
            <span className="text-light">Manteis</span>
          </div>
          <div className="hero-title-inner font-display text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl font-400 italic leading-[0.9] tracking-[0.03em] text-light-dim">
            Recordings
          </div>
        </h1>

        <p className="hero-tagline text-lg md:text-xl text-light-muted max-w-xl mx-auto font-light leading-relaxed">
          A Seattle-based label for the geometry of sound.
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-light-muted/50">Catalog</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-light-muted/40 to-transparent relative overflow-hidden">
          <div className="hero-scroll-arrow absolute top-0 left-0 w-full h-1/2 bg-accent blur-[2px]" />
        </div>
      </div>
    </section>
  )
}