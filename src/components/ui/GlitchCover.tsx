'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { releases } from '@/lib/catalog'

const GlitchFilters = () => (
  <svg className="absolute w-0 h-0" aria-hidden="true">
    <defs>
      <filter id="glitch-r">
        <feColorMatrix type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" />
      </filter>
      <filter id="glitch-g">
        <feColorMatrix type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" />
      </filter>
      <filter id="glitch-b">
        <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" />
      </filter>
    </defs>
  </svg>
)

/**
 * Glitch hover effect for release covers.
 *
 * On hover the cover briefly RGB-splits into cyan/magenta channels that
 * shear horizontally, then snaps back. Implemented with three absolutely
 * stacked image layers and GSAP-driven transform/opacity pulses.
 */
export function GlitchCover({ release, children }: { release: typeof releases[number]; children?: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const rRef = useRef<HTMLDivElement>(null)
  const gRef = useRef<HTMLDivElement>(null)
  const bRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    if (!hovered) {
      tlRef.current?.kill()
      gsap.set([rRef.current, gRef.current, bRef.current], { x: 0, opacity: 0 })
      return
    }

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReduced) return

    tlRef.current = gsap
      .timeline({ repeat: 1 })
      .to(rRef.current, { x: 6, opacity: 0.55, duration: 0.06, ease: 'none' }, 0)
      .to(bRef.current, { x: -6, opacity: 0.55, duration: 0.06, ease: 'none' }, 0)
      .to(gRef.current, { x: 3, opacity: 0.25, duration: 0.05, ease: 'none' }, 0.04)
      .to([rRef.current, gRef.current, bRef.current], { x: 0, opacity: 0, duration: 0.08, ease: 'power2.out' }, 0.12)

    return () => {
      tlRef.current?.kill()
    }
  }, [hovered])

  const layers = (
    <>
      <Image src={release.coverArt} alt={`${release.title} cover art`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
      <div ref={rRef} className="absolute inset-0 opacity-0 pointer-events-none mix-blend-screen">
        <Image src={release.coverArt} alt="" fill className="object-cover" style={{ filter: 'url(#glitch-r)' }} sizes="33vw" />
      </div>
      <div ref={gRef} className="absolute inset-0 opacity-0 pointer-events-none mix-blend-screen">
        <Image src={release.coverArt} alt="" fill className="object-cover" style={{ filter: 'url(#glitch-g)' }} sizes="33vw" />
      </div>
      <div ref={bRef} className="absolute inset-0 opacity-0 pointer-events-none mix-blend-screen">
        <Image src={release.coverArt} alt="" fill className="object-cover" style={{ filter: 'url(#glitch-b)' }} sizes="33vw" />
      </div>
      <GlitchFilters />
    </>
  )

  return (
    <div
      ref={wrapperRef}
      className="relative w-full h-full overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children ? (
        <div className="relative w-full h-full">{layers}{children}</div>
      ) : (
        layers
      )}
    </div>
  )
}
