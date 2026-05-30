'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Artist {
  name: string
  path: string
  role: string
  releases: number
  color: string
  tagline: string
}

const artists: Artist[] = [
  { name: 'Red Shift Mantra', path: '/red-shift-mantra', role: 'Electronic / Synthwave', releases: 2, color: '#007AFF', tagline: 'Cosmic pressure' },
  { name: 'The Manteis Project', path: '/the-manteis-project', role: 'Ambient / Quantum Architecture', releases: 4, color: '#7C3AED', tagline: 'Signal architecture' },
  { name: 'Thesan Musique', path: '/thesan-musique', role: 'Deep Dance / Techno / DnB', releases: 1, color: '#00FFDD', tagline: 'Warehouse bass' },
  { name: 'Brindavan Gardens', path: '/brindavan-gardens', role: 'Spiritual / Shoegaze / Dream', releases: 1, color: '#D4A843', tagline: 'Devotional reverb' },
  { name: 'Bethany Pritchett', path: '/bethany-pritchett', role: 'Alternative / Vocal / Synthesist', releases: 1, color: '#C4788A', tagline: 'Intimate poetry' },
]

export function Artists() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.artist-row', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })

      gsap.from('.artists-heading', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="artists" className="py-32 md:py-48">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="section-label mb-20">Roster /</div>

        <h2 className="artists-heading font-display text-4xl md:text-6xl font-bold leading-[1.02] tracking-[-0.03em] mb-16">
          <span className="hollow-text">Artists</span>
        </h2>

        {/* Artist list — editorial layout with links to artist subsites */}
        <div className="border-t border-edge-faint">
          {artists.map((artist) => (
            <a
              key={artist.name}
              href={artist.path}
              className="artist-row group flex items-baseline justify-between py-6 md:py-8 border-b border-edge-faint hover:border-edge-subtle transition-colors duration-300 cursor-pointer"
            >
              <div className="flex-1">
                <div className="flex items-baseline gap-3 md:gap-6">
                  <span
                    className="font-mono text-[10px] tracking-[0.15em] uppercase"
                    style={{ color: artist.color }}
                  >
                    {artist.releases} {artist.releases === 1 ? 'release' : 'releases'}
                  </span>
                  <h3 className="font-display text-xl md:text-3xl font-bold tracking-[-0.02em] group-hover:text-accent transition-colors duration-300">
                    {artist.name}
                  </h3>
                </div>
                <div className="flex items-center gap-3 mt-1 ml-0 md:ml-[max(2rem,4rem)]">
                  <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-light-muted">
                    {artist.role}
                  </p>
                  <span className="font-mono text-[10px] text-light-muted/40">·</span>
                  <p className="font-mono text-[10px] tracking-[0.05em] italic" style={{ color: artist.color, opacity: 0.7 }}>
                    {artist.tagline}
                  </p>
                </div>
              </div>

              <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-light-muted opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                View →
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="divider-glow max-w-5xl mx-auto mt-32" />
    </section>
  )
}