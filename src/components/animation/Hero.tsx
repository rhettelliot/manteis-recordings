'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

/* Deterministic bar heights — must match on server and client */
const FREQ_BARS = Array.from({ length: 48 }, (_, i) => {
  const h = 12 + Math.abs(Math.sin(i * 1.7) * 36) + Math.abs(Math.cos(i * 0.9) * 12)
  return Math.round(h)
})

/**
 * Wireframe grid tunnel hero — perspective grid receding into the void,
 * brand cube at the vanishing point, cream typography, cream frequency floor.
 */
export function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let ctx: { revert: () => void } | undefined
    let active = true

    const init = async () => {
      const gsap = (await import('gsap')).default
      if (!active) return

      ctx = gsap.context(() => {
        const tl = gsap.timeline({ delay: isReducedMotion ? 0 : 0.1 })

        if (!isReducedMotion) {
          gsap.set('.hero-cube', { opacity: 0, y: 20 })
          gsap.set('.hero-title-inner', { yPercent: 120, skewY: 5 })
          gsap.set('.hero-tagline', { opacity: 0, y: 30 })
          gsap.set('.hero-label-top', { opacity: 0, y: -20 })
          gsap.set('.grid-tunnel', { opacity: 0, scale: 1.08 })
        }

        tl.from('.hero-label-top', {
          y: isReducedMotion ? 0 : -20,
          opacity: isReducedMotion ? 1 : 0,
          duration: isReducedMotion ? 0 : 1,
          ease: 'power3.out',
        })
          .to('.grid-tunnel', {
            opacity: 1,
            scale: 1,
            duration: isReducedMotion ? 0 : 1.6,
            ease: 'power2.out',
          }, '-=0.8')
          .to('.hero-cube', {
            opacity: 1,
            y: 0,
            duration: isReducedMotion ? 0 : 1.2,
            ease: 'power3.out',
          }, '-=1.1')
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
    }

    init()

    return () => {
      active = false
      if (ctx) ctx.revert()
    }
  }, [])

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      aria-label="Manteis Recordings"
    >
      {/* Wireframe grid tunnel — perspective grid receding into void */}
      <div className="grid-tunnel absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="tunnel-fade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FDFCDC" stopOpacity="0.22" />
              <stop offset="35%" stopColor="#FDFCDC" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#FDFCDC" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Receding horizontal lines */}
          {[...Array(12)].map((_, i) => {
            const y = 8 + i * 8 // % from top
            const opacity = 0.28 - i * 0.022
            return (
              <line
                key={`h-${i}`}
                x1="0"
                y1={`${y}%`}
                x2="100%"
                y2={`${y}%`}
                stroke="#FDFCDC"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                style={{ opacity: Math.max(opacity, 0.04) }}
              />
            )
          })}
          {/* Vertical lines converging toward vanishing point */}
          {[...Array(17)].map((_, i) => {
            const x = 5 + i * 5.625 // 0..100
            const lean = (x - 50) * 0.35
            return (
              <line
                key={`v-${i}`}
                x1={`${x}%`}
                y1="100%"
                x2={`${x + lean}%`}
                y2="28%"
                stroke="#FDFCDC"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                style={{ opacity: 0.06 + Math.abs(x - 50) * 0.004 }}
              />
            )
          })}
          {/* Floor plane horizon accent */}
          <line x1="0" y1="28%" x2="100%" y2="28%" stroke="url(#tunnel-fade)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>

      {/* Vignette void */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(circle at 50% 35%, transparent 0%, transparent 35%, rgba(0,0,0,0.55) 72%, rgba(0,0,0,0.95) 100%)',
        }}
      />

      {/* Frequency strip — faint cream spectrum along the floor of the void */}
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
      <div className="text-center relative z-10 px-8 w-full max-w-6xl mx-auto pt-4">
        <p className="hero-label-top font-mono text-[10px] tracking-[0.3em] uppercase text-accent mb-4">
          Independent Label · Seattle, WA · Est. 2024
        </p>

        {/* Brand mark — the cube */}
        <div className="hero-cube cube-drift mx-auto w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 relative">
          <Image
            src="/ManteisRecordings_color.png"
            alt="Manteis Recordings brand cube"
            fill
            className="object-contain"
            sizes="384px"
            priority
          />
        </div>

        <h1 className="overflow-hidden pb-2 mb-2 -mt-4">
          <div className="hero-title-inner font-display text-[3.5rem] sm:text-7xl md:text-[8rem] lg:text-[9.5rem] font-bold leading-[0.86] tracking-[-0.04em] text-light">
            Manteis
          </div>
          <div className="hero-title-inner font-display text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl font-light leading-[1] tracking-[0.08em] uppercase text-light-dim">
            Recordings
          </div>
        </h1>

        <div className="hero-tagline">
          <p className="font-mono text-[11px] md:text-[12px] tracking-[0.25em] uppercase text-light mb-2">
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
