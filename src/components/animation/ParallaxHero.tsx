'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FREQ_BARS = Array.from({ length: 48 }, (_, i) => {
  const h = 12 + Math.abs(Math.sin(i * 1.7) * 36) + Math.abs(Math.cos(i * 0.9) * 12)
  return Math.round(h)
})

/**
 * Parallax depth hero.
 *
 * The skeletal grid sits in the deep background and moves slowly, while the
 * foreground brand mark and type move faster. A subtle scale + opacity fade
 * happens as the user begins to scroll, creating a true sense of depth.
 */
export function ParallaxHero() {
  const heroRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      // intro load sequence
      const tl = gsap.timeline({ delay: 0.1 })
      gsap.set('.hero-cube', { opacity: 0, y: 20 })
      gsap.set('.hero-title-inner', { yPercent: 120, skewY: 5 })
      gsap.set('.hero-tagline', { opacity: 0, y: 30 })
      gsap.set('.hero-label-top', { opacity: 0, y: -20 })

      tl.to('.hero-label-top', { y: 0, opacity: 1, duration: 1, ease: 'power3.out' })
        .to('.hero-cube', { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }, '-=0.7')
        .to('.hero-title-inner', { yPercent: 0, skewY: 0, duration: 1.4, stagger: 0.12, ease: 'power4.out' }, '-=0.8')
        .to('.hero-tagline', { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.8')

      if (!isReduced) {
        gsap.to('.hero-scroll-arrow', {
          y: 8,
          duration: 1.5,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        })

        // parallax depth on scroll
        gsap.to(gridRef.current, {
          yPercent: -30,
          scale: 1.08,
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          },
        })

        gsap.to('.hero-content', {
          yPercent: -55,
          opacity: 0.2,
          scale: 0.92,
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
          },
        })
      }
    }, hero)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      aria-label="Manteis Recordings"
    >
      <div ref={gridRef} className="absolute inset-0 pointer-events-none overflow-hidden will-change-transform">
        <div className="cyber-grid" />
      </div>

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

      <div className="hero-content text-center relative z-10 px-8 w-full max-w-6xl mx-auto will-change-transform">
        <p className="hero-label-top font-mono text-[10px] tracking-[0.3em] uppercase text-accent mb-10">
          Independent Label · Seattle, WA · Est. 2024
        </p>

        <div className="hero-cube cube-drift mx-auto mb-10 w-24 h-24 md:w-32 md:h-32 relative">
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

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10">
        <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-light-muted/50">Catalog</span>
        <div className="w-[1px] h-8 bg-edge-subtle relative overflow-hidden">
          <div className="hero-scroll-arrow absolute top-0 left-0 w-full h-1/2 bg-accent" />
        </div>
      </div>
    </section>
  )
}
