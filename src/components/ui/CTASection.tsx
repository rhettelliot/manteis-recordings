'use client'

import { useEffect, useRef } from 'react'
import { revealOnEnter } from '@/lib/reveal'

/**
 * CTA — "Submit your demo" / "Join the roster"
 */
export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return
    const disposers: Array<() => void> = []
    ;(async () => {
      disposers.push(await revealOnEnter(root.querySelectorAll('.cta-content'), { y: 60, duration: 1 }))
    })()
    return () => disposers.forEach((d) => d())
  }, [])

  return (
    <section ref={sectionRef} className="py-32 md:py-48">
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        <div className="cta-content">
          <div className="section-label mb-8 justify-center">Submit /</div>

          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-[-0.03em] mb-6">
            <span className="hollow-text">Join the</span>
            <br />
            <span className="text-accent">roster.</span>
          </h2>

          <p className="text-lg text-light-dim max-w-lg mx-auto mb-10">
            Manteis Recordings is always looking for artists who treat texture as structure.
            If your sound belongs here, we want to hear it.
          </p>

          <a
            href="mailto:demo@manteisrecordings.com"
            aria-label="Submit demo via email"
            className="inline-block font-mono text-[11px] tracking-[0.2em] uppercase px-10 py-4
              border border-accent text-accent hover:bg-accent hover:text-void
              transition-all duration-300 btn-snap"
          >
            Submit Demo
          </a>
        </div>
      </div>
    </section>
  )
}