'use client'

import { useEffect, useRef } from 'react'
import { revealOnEnter } from '@/lib/reveal'

const manifesto = [
  'Sound is architecture.',
  'Frequencies are blueprints for worlds',
  'that exist between silence and noise.',
  'Manteis Recordings releases music',
  'that treats texture as structure —',
  'where every tone earns its place',
  'and every silence carries weight.',
]

export function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return
    const disposers: Array<() => void> = []
    ;(async () => {
      disposers.push(await revealOnEnter(root.querySelectorAll('.manifesto-line'), { y: 40, duration: 0.8, stagger: 0.1 }))
    })()
    return () => disposers.forEach((d) => d())
  }, [])

  return (
    <section ref={sectionRef} className="py-32 md:py-48">
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
      </div>

      <div className="divider-glow max-w-5xl mx-auto mt-32" />
    </section>
  )
}