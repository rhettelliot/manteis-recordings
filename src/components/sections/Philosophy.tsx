'use client'

import { useEffect, useRef } from 'react'
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

export function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return
    const disposers: Array<() => void> = []
    ;(async () => {
      disposers.push(await revealOnEnter(root.querySelectorAll('.manifesto-line'), { y: 40, duration: 0.8, stagger: 0.1 }))
      disposers.push(await revealOnEnter(root.querySelectorAll('.philosophy-stat'), { y: 30, duration: 0.6, stagger: 0.1 }))
      disposers.push(await revealOnEnter(root.querySelectorAll('.philosophy-systems'), { y: 30, duration: 0.8 }))
    })()
    return () => disposers.forEach((d) => d())
  }, [])

  return (
    <section ref={sectionRef} id="philosophy" className="py-32 md:py-48">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="section-label mb-20">Manifesto /</div>

        <div className="space-y-4 md:space-y-5">
          {manifesto.map((line, i) => (
            <p
              key={i}
              className={`manifesto-line font-display text-2xl md:text-4xl lg:text-5xl leading-[1.15] tracking-[-0.02em] ${
                i === 0 ? 'font-bold text-light' : 'font-light text-light-dim'
              }`}
            >
              {line}
            </p>
          ))}
        </div>

        {/* HUD stats — tiny label over vast number */}
        <div className="grid grid-cols-3 gap-8 mt-24 max-w-lg">
          {stats.map((stat) => (
            <div key={stat.label} className="philosophy-stat">
              <div className="font-mono text-[10px] font-bold tracking-[0.18em] uppercase text-light-muted mb-2">
                {stat.label}
              </div>
              <div className="font-display text-5xl md:text-6xl font-light tracking-[-0.03em] leading-none text-light">
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* The Systems connection */}
        <div className="philosophy-systems mt-24 border-t border-edge-faint pt-10">
          <p className="text-base md:text-lg text-light-dim leading-relaxed max-w-xl">
            Manteis Recordings shares one philosophy with{' '}
            <a
              href="https://manteis.systems"
              target="_blank"
              rel="noreferrer noopener"
              className="text-light border-b border-edge-clear hover:text-accent hover:border-accent transition-colors duration-300"
            >
              Manteis Systems
            </a>
            : build tools of creation, not traps of convenience. One builds the
            instruments. The other presses the signal to record.
          </p>
        </div>
      </div>

      <div className="divider-glow max-w-5xl mx-auto mt-32" />
    </section>
  )
}
