'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface GatekeeperProps {
  onEnter: () => void
}

/**
 * Manteis Recordings gate — vinyl static to signal.
 * A record label entrance that feels like dropping the needle.
 */
export function Gatekeeper({ onEnter }: GatekeeperProps) {
  const gateRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 })

      // Initial state — everything hidden
      if (!isReducedMotion) {
        gsap.set('.gate-line', { scaleX: 0 })
        gsap.set('.gate-label', { y: 20, opacity: 0 })
        gsap.set('.gate-title-inner', { yPercent: 110 })
        gsap.set('.gate-tagline', { y: 20, opacity: 0 })
        gsap.set('.gate-enter', { y: 20, opacity: 0 })
      }

      // Sequence: line → label → title → tagline → enter
      tl.to('.gate-line', { 
        scaleX: isReducedMotion ? 1 : 1, 
        duration: isReducedMotion ? 0 : 1.2, 
        ease: 'power4.inOut' 
      })
        .to('.gate-label', { 
          y: isReducedMotion ? 0 : 0, 
          opacity: isReducedMotion ? 1 : 1, 
          duration: isReducedMotion ? 0 : 0.6, 
          ease: 'power3.out' 
        }, '-=0.6')
        .to('.gate-title-inner', {
          yPercent: 0,
          duration: isReducedMotion ? 0 : 1.0,
          stagger: 0.08,
          ease: 'power4.out',
        }, '-=0.4')
        .to('.gate-tagline', { 
          y: isReducedMotion ? 0 : 0, 
          opacity: isReducedMotion ? 1 : 1, 
          duration: isReducedMotion ? 0 : 0.8, 
          ease: 'power3.out' 
        }, '-=0.5')
        .to('.gate-enter', { 
          y: isReducedMotion ? 0 : 0, 
          opacity: isReducedMotion ? 1 : 1, 
          duration: isReducedMotion ? 0 : 0.6, 
          ease: 'power3.out' 
        }, '-=0.3')

      tlRef.current = tl
    }, gateRef)

    return () => ctx.revert()
  }, [])

  // Magnetic hover on Enter
  const handleMouseMove = (e: React.MouseEvent) => {
    const el = btnRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    const textEl = el.querySelector('span')
    if (textEl) {
      textEl.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`
    }
    el.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`
  }

  const handleMouseLeave = () => {
    const el = btnRef.current
    if (!el) return
    const textEl = el.querySelector('span')
    if (textEl) {
      textEl.style.transform = 'translate(0, 0)'
    }
    el.style.transform = 'translate(0, 0)'
  }

  const handleEnter = () => {
    const gate = gateRef.current
    if (!gate) return

    tlRef.current?.kill()

    const exitTl = gsap.timeline({
      onComplete: () => onEnter(),
    })

    // Content lifts out
    exitTl.to(['.gate-line', '.gate-label', '.gate-title-wrap', '.gate-tagline', '.gate-enter'], {
      y: -30,
      opacity: 0,
      duration: 0.5,
      stagger: 0.04,
      ease: 'power3.inOut',
    })

    // Curtain wipe — black fills the screen
    exitTl.to(gate, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.inOut',
    }, '-=0.2')
  }

  return (
    <div
      ref={gateRef}
      data-gate=""
      className="fixed inset-0 z-[1000] flex items-center justify-center flex-col gap-6 pointer-events-auto bg-void"
    >
      {/* Vinyl groove texture */}
      <div className="absolute inset-0 pointer-events-none vinyl-grooves opacity-30" />

      <div className="gate-line w-16 h-[1px] bg-accent origin-center" />

      <div className="gate-label font-mono text-[10px] tracking-[0.35em] uppercase text-light-muted">
        Manteis Recordings
      </div>

      {/* Title with masked reveal */}
      <div className="gate-title-wrap overflow-hidden flex items-baseline gap-3 md:gap-5">
        <div className="gate-title-inner font-display text-[clamp(2.5rem,9vw,8rem)] font-bold leading-[0.9] tracking-[-0.03em]">
          Manteis
        </div>
        <div className="gate-title-inner font-display text-[clamp(2rem,5vw,4rem)] font-light leading-[0.9] tracking-[0.08em] uppercase text-light-dim">
          Recordings
        </div>
      </div>

      <p className="gate-tagline font-mono text-[11px] tracking-[0.2em] uppercase text-light-muted max-w-md text-center">
        Sovereign sound architecture
      </p>

      <button
        ref={btnRef}
        onClick={handleEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="gate-enter mt-10 font-mono text-[11px] tracking-[0.3em] uppercase text-light-dim
          border border-edge-subtle px-14 py-4 btn-snap overflow-hidden group
          hover:border-accent hover:text-light transition-colors duration-300
          focus:outline-none focus-visible:border-accent"
        style={{ willChange: 'transform', transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
        aria-label="Enter the Manteis Recordings website"
      >
        <span className="block transition-transform duration-300 ease-out will-change-transform">
          Enter
        </span>
      </button>

      {/* Bottom coordinates — label location stamp */}
      <div className="absolute bottom-8 left-8 font-mono text-[9px] tracking-[0.15em] uppercase text-light-muted opacity-25">
        Est. 2024
      </div>
      <div className="absolute bottom-8 right-8 font-mono text-[9px] tracking-[0.15em] uppercase text-light-muted opacity-25">
        Seattle, WA
      </div>
    </div>
  )
}