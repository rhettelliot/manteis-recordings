'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * CTA — "Submit your demo" / "Join the roster"
 */
export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-content', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
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