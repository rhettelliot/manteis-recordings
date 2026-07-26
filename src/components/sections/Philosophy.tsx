'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { revealOnEnter } from '@/lib/reveal'

const manifesto = [
  'Sovereign sound architecture.',
  'Sound is structure. Frequencies are blueprints',
  'for worlds between silence and noise.',
  'Manteis Recordings releases music',
  'that treats texture as architecture —',
  'every tone earns its place,',
  'every silence carries weight.',
]

const stats = [
  { value: '09', label: 'Releases' },
  { value: '05', label: 'Artists' },
  { value: '00', label: 'Compromises' },
]

/**
 * Philosophy section with a locomotive scroll sequence.
 *
 * The section pins while the user scrolls. Each manifesto line is revealed
 * in lockstep with scroll progress, and the three stats counter up as the
 * sequence completes. The effect emulates a film/3D framerate controlled
 * by scroll position.
 */
export function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null)
  const sequenceRef = useRef<HTMLDivElement>(null)
  const triggersRef = useRef<ScrollTrigger[]>([])

  useEffect(() => {
    const section = sectionRef.current
    const sequence = sequenceRef.current
    if (!section || !sequence) return

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lines = Array.from(sequence.querySelectorAll('.manifesto-line'))
    const statEls = Array.from(sequence.querySelectorAll('.philosophy-stat .stat-value'))
    const systems = sequence.querySelector('.philosophy-systems')

    revealOnEnter(sequence.querySelectorAll('.manifesto-line, .philosophy-stat, .philosophy-systems'), {
      y: 0,
      duration: 0.01,
    }).then((dispose) => dispose())

    if (isReduced) {
      gsap.set(lines, { opacity: 1, filter: 'blur(0px)' })
      gsap.set(statEls, { opacity: 1 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.set(lines, { opacity: 0.15, filter: 'blur(4px)' })
      gsap.set(statEls, { opacity: 0 })
      if (systems) gsap.set(systems, { opacity: 0, y: 30 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=240%',
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          onUpdate: (self) => {
            // Emulate framerate stutter for that locomotive film feel
            const progress = self.progress
            const frame = Math.floor(progress * 24) / 24
            if (sequence) {
              sequence.style.setProperty('--sequence-frame', String(frame))
            }
          },
        },
      })

      if (tl.scrollTrigger) triggersRef.current.push(tl.scrollTrigger)

      lines.forEach((line, i) => {
        const start = i / lines.length * 0.85
        const end = start + 0.18
        tl.fromTo(
          line,
          { opacity: 0.15, filter: 'blur(4px)', y: 20 },
          { opacity: 1, filter: 'blur(0px)', y: 0, ease: 'none' },
          start
        )
        if (i < lines.length - 1) {
          tl.to(line, { opacity: 0.35, filter: 'blur(1px)', y: -10, ease: 'none' }, end)
        }
      })

      tl.fromTo(
        statEls,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.04, ease: 'power2.out' },
        0.82
      )

      if (systems) {
        tl.fromTo(systems, { opacity: 0, y: 30 }, { opacity: 1, y: 0, ease: 'power2.out' }, 0.92)
      }
    }, section)

    return () => {
      triggersRef.current.forEach((st) => st.kill())
      triggersRef.current = []
      ctx.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} id="philosophy" className="relative min-h-screen py-32 md:py-48">
      <div
        ref={sequenceRef}
        className="max-w-4xl mx-auto px-6 md:px-10"
        style={{ '--sequence-frame': '0' } as React.CSSProperties}
      >
        <div className="section-label mb-20">Manifesto /</div>

        <div className="space-y-4 md:space-y-5">
          {manifesto.map((line, i) => (
            <p
              key={i}
              className={`manifesto-line font-display text-[clamp(1.5rem,5vw,3rem)] leading-[1.15] tracking-[-0.02em] ${
                i === 0 ? 'font-bold text-light' : 'font-light text-light-dim'
              }`}
            >
              {line}
            </p>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-24 max-w-lg">
          {stats.map((stat) => (
            <div key={stat.label} className="philosophy-stat">
              <div className="font-mono text-[10px] font-bold tracking-[0.18em] uppercase text-light-muted mb-2">
                {stat.label}
              </div>
              <div className="stat-value font-display text-[clamp(3rem,10vw,3.75rem)] font-light tracking-[-0.03em] leading-none text-light">
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        <div className="philosophy-systems mt-24 border-t border-edge-faint pt-10">
          <p className="text-base md:text-lg text-light-dim leading-relaxed max-w-xl">
            Manteis Recordings shares one philosophy with{' '}
            <a
              href="https://manteis.systems"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Visit Manteis Systems website (opens in new tab)"
              className="text-light border-b border-edge-clear hover:text-accent hover:border-accent transition-colors duration-300"
            >
              Manteis Systems
            </a>
            : build tools of creation, not traps of convenience. One builds the
            instruments. The other presses the signal to record.
          </p>
        </div>
      </div>
    </section>
  )
}
