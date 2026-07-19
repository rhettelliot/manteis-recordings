'use client'

import { useEffect, useRef } from 'react'
import { revealOnEnter } from '@/lib/reveal'
import { artists } from '@/lib/catalog'

/**
 * The roster — each artist is a hub row linking out to their dedicated site.
 * The artist's own accent color appears on their row only.
 */
export function Artists() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return
    const disposers: Array<() => void> = []
    ;(async () => {
      disposers.push(await revealOnEnter(root.querySelectorAll('.artists-heading'), { y: 60, duration: 0.8 }))
      disposers.push(await revealOnEnter(root.querySelectorAll('.artist-row'), { y: 40, duration: 0.6, stagger: 0.08 }))
    })()
    return () => disposers.forEach((d) => d())
  }, [])

  return (
    <section ref={sectionRef} id="artists" className="py-32 md:py-48">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="section-label mb-20">Roster /</div>

        <h2 className="artists-heading font-display text-4xl md:text-6xl font-bold leading-[1.02] tracking-[-0.03em] mb-6">
          <span className="hollow-text">Artists</span>
        </h2>
        <p className="artists-heading font-mono text-[11px] tracking-[0.15em] uppercase text-light-muted mb-16 max-w-md">
          Five artists, each with a dedicated site. Select a row to enter their world.
        </p>

        <div className="border-t border-edge-faint">
          {artists.map((artist, i) => (
            <a
              key={artist.name}
              href={artist.url}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`Visit the ${artist.name} website`}
              className="artist-row group grid grid-cols-[auto_1fr_auto] gap-x-4 md:gap-x-8 items-center py-8 md:py-10 border-b border-edge-faint transition-colors duration-300 cursor-pointer relative pl-4 md:pl-6"
            >
              {/* Accent rail — the artist's color, their row only */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 bottom-0 w-[2px] scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500"
                style={{ background: artist.color }}
              />

              {/* Index */}
              <span className="font-mono text-[10px] tracking-[0.2em] text-light-muted self-start pt-2">
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Name + meta */}
              <div className="min-w-0">
                <h3 className="font-display text-2xl md:text-4xl font-bold tracking-[-0.02em] text-light transition-transform duration-500 group-hover:translate-x-2">
                  {artist.name}
                </h3>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2">
                  <span
                    className="font-mono text-[10px] tracking-[0.15em] uppercase px-2 py-[3px] border"
                    style={{ color: artist.color, borderColor: `${artist.color}59` }}
                  >
                    {artist.role}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-light-muted">
                    {artist.releases} {artist.releases === 1 ? 'release' : 'releases'}
                  </span>
                  <span className="font-mono text-[10px] text-light-muted">·</span>
                  <span className="font-mono text-[10px] tracking-[0.08em] text-light-dim">
                    {artist.tagline}
                  </span>
                </div>
              </div>

              {/* Visit site — visible on touch, slides in on hover */}
              <span
                className="font-mono text-[10px] tracking-[0.2em] uppercase whitespace-nowrap text-light-muted md:opacity-55 group-hover:opacity-100 md:-translate-x-2 group-hover:translate-x-0 transition-all duration-300 group-hover:text-light"
              >
                Visit Site →
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className="divider-glow max-w-5xl mx-auto mt-32" />
    </section>
  )
}
