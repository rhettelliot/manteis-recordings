'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { revealOnEnter } from '@/lib/reveal'
import { releases, artists } from '@/lib/catalog'

const featured = releases[0]

export function Releases() {
  const sectionRef = useRef<HTMLElement>(null)
  const [filter, setFilter] = useState<string>('All')

  // Under a filter, the featured release belongs in the grid too
  const grid = filter === 'All'
    ? releases.slice(1)
    : releases.filter((r) => r.artist === filter)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return
    const disposers: Array<() => void> = []
    ;(async () => {
      disposers.push(await revealOnEnter(root.querySelectorAll('.release-card'), { y: 60, duration: 0.8, stagger: 0.1 }))
    })()
    return () => disposers.forEach((d) => d())
  }, [filter])

  return (
    <section ref={sectionRef} id="releases" className="py-32 md:py-48">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="section-label mb-20">Catalog /</div>

        {/* Latest release — featured, large */}
        <div className="mb-24">
          <a
            href={featured.hyperfollow}
            target="_blank"
            rel="noreferrer noopener"
            className="group block"
            aria-label={`Listen to ${featured.title} by ${featured.artist}`}
          >
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
              <div
                className="relative w-full md:w-1/2 aspect-square overflow-hidden"
                style={{ border: '1px solid var(--edge-faint)' }}
              >
                <Image
                  src={featured.coverArt}
                  alt={`${featured.title} cover art`}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>

              <div className="flex-1 py-4 md:py-8">
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase mb-4" style={{ color: featured.color }}>
                  {featured.catalogNumber} · {featured.year} · {featured.tracks} tracks
                </div>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[0.95] tracking-[-0.03em] mb-2">
                  {featured.title}
                </h2>
                <p className="font-display text-xl md:text-2xl font-light text-light-dim mb-8">
                  {featured.artist}
                </p>

                <div className="flex items-center gap-4">
                  <span
                    className="font-mono text-[11px] tracking-[0.15em] uppercase px-6 py-3 border transition-transform duration-300 btn-snap"
                    style={{ borderColor: featured.color, color: featured.color }}
                  >
                    Listen
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-light-muted">Latest Release</span>
                </div>
              </div>
            </div>
          </a>
        </div>

        <div className="divider-glow mb-16" />

        {/* Filter — All / by artist */}
        <div
          className="flex flex-wrap gap-x-6 gap-y-3 mb-16"
          role="group"
          aria-label="Filter catalog by artist"
        >
          {['All', ...artists.map((a) => a.name)].map((name) => (
            <button
              key={name}
              onClick={() => setFilter(name)}
              aria-pressed={filter === name}
              className={`font-mono text-[10px] tracking-[0.2em] uppercase pb-1 border-b transition-colors duration-300 ${
                filter === name
                  ? 'text-accent border-accent'
                  : 'text-light-muted border-transparent hover:text-light'
              }`}
            >
              {name}
            </button>
          ))}
        </div>

        {/* Catalog grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {grid.map((release) => (
            <a
              key={`${filter}-${release.id}`}
              href={release.hyperfollow}
              target="_blank"
              rel="noreferrer noopener"
              className="group block"
              aria-label={`Listen to ${release.title} by ${release.artist}, ${release.year}`}
            >
              <div className="release-card aspect-square overflow-hidden relative">
                <Image
                  src={release.coverArt}
                  alt={`${release.title} cover art`}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />
                {/* Hover reveal — solid scrim, no gradient */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none flex items-center justify-center bg-void/70">
                  <span
                    className="font-mono text-[11px] tracking-[0.2em] uppercase px-4 py-2 border"
                    style={{ borderColor: release.color, color: release.color }}
                  >
                    Listen
                  </span>
                </div>
                {/* Catalog number badge */}
                <div className="absolute top-3 left-3 font-mono text-[9px] tracking-[0.15em] uppercase text-light/55 bg-void/70 px-2 py-1 border border-edge-ghost">
                  {release.catalogNumber}
                </div>
                {/* Year badge */}
                <div className="absolute top-3 right-3 font-mono text-[9px] tracking-[0.15em] uppercase text-light/55 bg-void/70 px-2 py-1 border border-edge-ghost">
                  {release.year}
                </div>
              </div>

              <div className="mt-3 px-1">
                <div
                  className="font-mono text-[9px] tracking-[0.15em] uppercase"
                  style={{ color: release.color }}
                >
                  {release.artist}
                </div>
                <h3 className="font-display text-lg font-bold tracking-[-0.01em] text-light group-hover:text-accent transition-colors duration-300 mt-1">
                  {release.title}
                </h3>
                <div className="font-mono text-[10px] text-light-muted mt-1">
                  {release.year} · {release.tracks} {release.tracks === 1 ? 'track' : 'tracks'}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="divider-glow max-w-5xl mx-auto mt-32" />
    </section>
  )
}
