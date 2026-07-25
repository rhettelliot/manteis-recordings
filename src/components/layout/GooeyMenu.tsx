'use client'

import { useEffect, useRef, useState } from 'react'
import { artists } from '@/lib/catalog'
import { gsap } from 'gsap'

type MenuItem = {
  label: string
  href: string
  external?: boolean
  color?: string
}

const links: MenuItem[] = [
  { label: 'Catalog', href: '#releases' },
  { label: 'Roster', href: '#artists' },
  { label: 'Manifesto', href: '#philosophy' },
]

/**
 * SVG-gooey artist navigation.
 *
 * A hidden SVG filter (`#goo`) merges the toggle dot and floating sub-items
 * into one viscous blob. On open, artist links detach and orbit outward with
 * spring physics; on close they collapse back into the trigger like liquid.
 */
export function GooeyMenu() {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement[]>([])
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const items = itemsRef.current.filter(Boolean)
    if (!items.length) return

    const duration = isReduced ? 0 : 0.55
    const ease = 'elastic.out(1, 0.5)'

    if (open) {
      tlRef.current?.kill()
      tlRef.current = gsap
        .timeline()
        .to(items, {
          opacity: 1,
          scale: 1,
          x: (i) => (i % 2 === 0 ? -12 - i * 6 : 12 + i * 6),
          y: (i) => -56 - i * 44,
          rotation: (i) => (i % 2 === 0 ? -6 : 6),
          duration,
          ease,
          stagger: { amount: 0.12, from: 'end' },
        }, 0)
    } else {
      tlRef.current?.kill()
      tlRef.current = gsap
        .timeline()
        .to(items, {
          opacity: 0,
          scale: 0.4,
          x: 0,
          y: 0,
          rotation: 0,
          duration: isReduced ? 0 : 0.35,
          ease: 'power3.inOut',
          stagger: { amount: 0.08, from: 'start' },
        }, 0)
    }

    return () => {
      tlRef.current?.kill()
    }
  }, [open])

  return (
    <div ref={menuRef} className="fixed top-5 right-4 md:right-12 z-[60]">
      {/* SVG goo filter */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div className="relative" style={{ filter: 'url(#goo)' }}>
        {/* Toggle */}
        <button
          aria-label={open ? 'Close artist menu' : 'Open artist menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="relative z-10 w-12 h-12 rounded-full bg-accent text-void flex items-center justify-center
            font-mono text-[10px] tracking-[0.2em] uppercase font-bold
            hover:scale-105 active:scale-95 transition-transform duration-200"
        >
          <span className={`transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>
            {open ? '+' : 'Art'}
          </span>
        </button>

        {/* Detaching sub-items */}
        {[...links, ...artists.map((a): MenuItem => ({ label: a.name, href: a.url, external: true, color: a.color }))].map(
          (item, i) => (
            <div
              key={item.label}
              ref={(el) => {
                if (el) itemsRef.current[i] = el
              }}
              className="absolute top-0 left-0 w-12 h-12 rounded-full pointer-events-none opacity-0"
              style={{ transform: 'scale(0.4)' }}
            >
              <a
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noreferrer noopener' : undefined}
                onClick={() => setOpen(false)}
                className="absolute -left-24 -right-24 top-1/2 -translate-y-1/2 text-center
                  font-mono text-[10px] tracking-[0.12em] uppercase whitespace-nowrap
                  text-light hover:text-accent transition-colors duration-200 pointer-events-auto"
                style={{ color: item.color || undefined }}
              >
                {item.label}
              </a>
            </div>
          )
        )}
      </div>
    </div>
  )
}
