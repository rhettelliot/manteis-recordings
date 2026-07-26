'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { artists } from '@/lib/catalog'

/**
 * Magnetic artist cards with gooey transitions.
 *
 * Each card gently pulls toward the cursor. On hover, the active card expands
 * and draws neighboring cards inward. The whole grid is wrapped in an SVG
 * gooey filter so adjacent shapes merge like liquid when they overlap.
 *
 * This is a pure Framer Motion interaction component — no GSAP here.
 */
export function MagneticArtistCards() {
  return (
    <section id="artists" className="py-32 md:py-48 relative z-10">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="section-label mb-20">Roster /</div>

        <h2 className="font-display text-4xl md:text-6xl font-bold leading-[1.02] tracking-[-0.03em] mb-6">
          <span className="hollow-text">Artists</span>
        </h2>
        <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-light-muted mb-16 max-w-md">
          Five artists, each with a dedicated world. Hover to feel the pull.
        </p>

        <GooeyFilter />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" style={{ filter: 'url(#artist-goo)' }}>
          {artists.map((artist) => (
            <MagneticCard key={artist.name} artist={artist} />
          ))}
        </div>
      </div>

      <div className="divider-glow max-w-5xl mx-auto mt-32" />
    </section>
  )
}

function GooeyFilter() {
  return (
    <svg className="absolute w-0 h-0" aria-hidden="true">
      <defs>
        <filter id="artist-goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  )
}

function MagneticCard({ artist }: { artist: typeof artists[number] }) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 120, damping: 18, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 120, damping: 18, mass: 0.4 })

  const handleMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * 0.18)
    y.set((e.clientY - centerY) * 0.18)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      ref={cardRef}
      href={artist.url}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={`Visit the ${artist.name} website`}
      className="relative block overflow-hidden border border-edge-faint bg-void-raised p-6 md:p-8 group cursor-pointer"
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={{ scale: 1.05, zIndex: 20 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
        style={{ background: artist.color }}
      />

      <span
        className="absolute left-0 top-0 bottom-0 w-[3px] scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500"
        style={{ background: artist.color }}
      />

      <div className="relative z-10">
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-light-muted">
          {artist.role}
        </span>
        <h3 className="font-display text-2xl md:text-3xl font-bold tracking-[-0.02em] text-light mt-3 mb-3">
          {artist.name}
        </h3>
        <p className="font-mono text-[10px] tracking-[0.1em] uppercase text-light-dim mb-5">
          {artist.tagline}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9px] tracking-[0.15em] uppercase px-2 py-[3px] border"
            style={{ color: artist.color, borderColor: `${artist.color}59` }}>
            {artist.releases} {artist.releases === 1 ? 'release' : 'releases'}
          </span>
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase whitespace-nowrap text-light-muted group-hover:text-light transition-colors duration-300">
            Visit →
          </span>
        </div>
      </div>
    </motion.a>
  )
}
