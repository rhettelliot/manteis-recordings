'use client'

import { useEffect, useRef } from 'react'
import { revealOnEnter } from '@/lib/reveal'
import { artists, releases } from '@/lib/catalog'

const masks = ['hexagon', 'diamond', 'triangle', 'octagon', 'rhombus'] as const

type MaskShape = typeof masks[number]

function clipPathFor(shape: MaskShape): string {
  switch (shape) {
    case 'hexagon':
      return 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
    case 'diamond':
      return 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
    case 'triangle':
      return 'polygon(50% 0%, 0% 100%, 100% 100%)'
    case 'octagon':
      return 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
    case 'rhombus':
      return 'polygon(25% 0%, 100% 50%, 75% 100%, 0% 50%)'
  }
}

/**
 * The roster — each artist is a parallax tilt card linking out to their dedicated site.
 * Geometric masking, concentric frame tunnel, and orbital path curves connecting artists.
 */
export function Artists() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return
    const disposers: Array<() => void> = []
    ;(async () => {
      disposers.push(await revealOnEnter(root.querySelectorAll('.artists-heading'), { y: 60, duration: 0.8 }))
      disposers.push(await revealOnEnter(root.querySelectorAll('.artist-tilt-card'), { y: 40, duration: 0.6, stagger: 0.08 }))
      disposers.push(await revealOnEnter(root.querySelectorAll('.catalog-marquee'), { y: 20, duration: 0.6 }))
      disposers.push(await revealOnEnter(root.querySelectorAll('.orbital-paths'), { y: 20, duration: 0.8 }))
    })()
    return () => disposers.forEach((d) => d())
  }, [])

  // Catalog numbers MR-001 → MR-009 in chronological order.
  const catalogNumbers = [...releases].reverse().map((r) => r.catalogNumber)

  return (
    <section ref={sectionRef} id="artists" className="py-32 md:py-48 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="section-label mb-20">Roster /</div>

        <h2 className="artists-heading font-display text-4xl md:text-6xl font-bold leading-[1.02] tracking-[-0.03em] mb-6">
          <span className="hollow-text">Artists</span>
        </h2>
        <p className="artists-heading font-mono text-[11px] tracking-[0.15em] uppercase text-light-muted mb-16 max-w-md">
          Five artists, each with a dedicated site. Select a card to enter their world.
        </p>

        {/* Orbital path curves connecting the 5 artists */}
        <div className="orbital-paths relative w-full h-24 md:h-32 mb-8 -mt-4" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="orbital-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#FDFCDC" stopOpacity="0.02" />
                <stop offset="50%" stopColor="#FF6EC7" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#FDFCDC" stopOpacity="0.02" />
              </linearGradient>
            </defs>
            <path
              d="M0,60 C150,10 350,110 500,60 S850,10 1000,60"
              fill="none"
              stroke="url(#orbital-grad)"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M0,75 C120,120 300,20 500,75 S780,120 1000,75"
              fill="none"
              stroke="url(#orbital-grad)"
              strokeWidth="1"
              strokeOpacity="0.5"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        {/* Kinetic catalog-number marquee */}
        <div className="catalog-marquee relative mb-16 -mx-6 md:-mx-12 border-y border-edge-faint py-4 overflow-hidden">
          <div className="marquee-track-fast flex w-max">
            {[...Array(3)].map((_, set) => (
              <div key={set} className="flex items-center gap-8 px-4">
                {catalogNumbers.map((cn) => (
                  <span key={`${set}-${cn}`} className="font-mono text-[10px] tracking-[0.25em] uppercase text-light-muted whitespace-nowrap">
                    {cn}
                  </span>
                ))}
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-accent whitespace-nowrap">MANTEIS RECORDINGS</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {artists.map((artist, i) => (
            <TiltArtistCard key={artist.name} artist={artist} index={i} shape={masks[i % masks.length]} />
          ))}
        </div>
      </div>

      <div className="divider-glow max-w-5xl mx-auto mt-32" />
    </section>
  )
}

interface TiltArtistCardProps {
  artist: {
    name: string
    url: string
    role: string
    releases: number
    color: string
    tagline: string
  }
  index: number
  shape: MaskShape
}

function TiltArtistCard({ artist, index, shape }: TiltArtistCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const glowRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const card = cardRef.current
    const glow = glowRef.current
    if (!card || !glow) return

    let raf = 0
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const cx = rect.width / 2
        const cy = rect.height / 2
        // Max rotation ±10deg
        const rotateX = ((y - cy) / cy) * -10
        const rotateY = ((x - cx) / cx) * 10
        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
        glow.style.background = `radial-gradient(circle at ${x}px ${y}px, ${artist.color}33 0%, transparent 55%)`
      })
    }

    const onLeave = () => {
      cancelAnimationFrame(raf)
      card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
      glow.style.background = 'transparent'
    }

    card.addEventListener('mousemove', onMove)
    card.addEventListener('mouseleave', onLeave)
    return () => {
      card.removeEventListener('mousemove', onMove)
      card.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [artist.color])

  return (
    <a
      ref={cardRef}
      href={artist.url}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={`Visit the ${artist.name} website`}
      className="artist-tilt-card group relative block p-6 md:p-8 cursor-pointer will-change-transform"
      style={{
        background: 'var(--void-raised)',
        border: '1px solid var(--edge-faint)',
        transition: 'transform 120ms ease-out, border-color 300ms ease, box-shadow 300ms ease',
      }}
      onMouseEnter={(e) => {
        const target = e.currentTarget
        target.style.borderColor = `${artist.color}55`
        target.style.boxShadow = `0 0 28px ${artist.color}18, inset 0 0 36px ${artist.color}10`
      }}
      onMouseLeave={(e) => {
        const target = e.currentTarget
        target.style.borderColor = 'var(--edge-faint)'
        target.style.boxShadow = 'none'
      }}
    >
      {/* Inner spotlight glow layer */}
      <span
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />

      {/* Concentric frame tunnel on artist portraits */}
      <div className="relative w-full aspect-[16/10] mb-8 overflow-hidden flex items-center justify-center">
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background:
              'repeating-radial-gradient(circle at center, transparent 0px, transparent 18px, rgba(253,252,220,0.04) 19px, transparent 20px)',
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-[12%] md:inset-[14%] border border-edge-ghost"
          aria-hidden="true"
        />
        <div
          className="absolute inset-[22%] md:inset-[24%] border border-edge-ghost"
          aria-hidden="true"
        />
        <div
          className="relative w-[46%] md:w-[42%] aspect-square transition-transform duration-700 group-hover:scale-105"
          style={{
            clipPath: clipPathFor(shape),
            background: `linear-gradient(135deg, ${artist.color}22 0%, ${artist.color}05 100%)`,
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              clipPath: clipPathFor(shape),
              background: artist.color,
              opacity: 0.12,
            }}
            aria-hidden="true"
          />
          <span className="absolute inset-0 flex items-center justify-center font-mono text-[9px] tracking-[0.2em] uppercase text-light/70">
            {artist.name}
          </span>
        </div>
      </div>

      {/* Top index / catalog strip */}
      <div className="relative flex items-center justify-between mb-6">
        <span
          aria-hidden="true"
          className="font-mono text-[10px] tracking-[0.2em] uppercase px-2 py-[3px] border"
          style={{ color: artist.color, borderColor: `${artist.color}59` }}
        >
          {artist.role}
        </span>
        <span className="font-mono text-[10px] tracking-[0.2em] text-light-muted">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Name */}
      <h3 className="relative font-display text-3xl md:text-4xl font-bold tracking-[-0.02em] text-light mb-3 group-hover:translate-x-1 transition-transform duration-500">
        {artist.name}
      </h3>

      {/* Meta */}
      <div className="relative flex flex-wrap items-center gap-x-3 gap-y-1 mb-8">
        <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-light-muted">
          {artist.releases} {artist.releases === 1 ? 'release' : 'releases'}
        </span>
        <span className="font-mono text-[10px] text-light-muted">·</span>
        <span className="font-mono text-[10px] tracking-[0.08em] text-light-dim">
          {artist.tagline}
        </span>
      </div>

      {/* Bottom action */}
      <div className="relative flex items-center justify-between border-t border-edge-faint pt-5">
        <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-light-dim">
          Visit Site
        </span>
        <span
          className="font-mono text-[12px] tracking-[0.1em] transition-transform duration-300 group-hover:translate-x-1"
          style={{ color: artist.color }}
        >
          →
        </span>
      </div>
    </a>
  )
}
