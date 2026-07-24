'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { revealOnEnter } from '@/lib/reveal'
import { releases, artists } from '@/lib/catalog'

export function Releases() {
  const sectionRef = useRef<HTMLElement>(null)
  const [filter, setFilter] = useState<string>('All')

  const grid = filter === 'All'
    ? releases
    : releases.filter((r) => r.artist === filter)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return
    const disposers: Array<() => void> = []
    ;(async () => {
      disposers.push(await revealOnEnter(root.querySelectorAll('.release-anchor'), { y: 60, duration: 0.8, stagger: 0.1 }))
    })()
    return () => disposers.forEach((d) => d())
  }, [filter])

  return (
    <section ref={sectionRef} id="releases" className="py-32 md:py-48">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="section-label mb-20">Catalog /</div>

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

        {/* Z-pattern alternating release layout */}
        <div className="space-y-24 md:space-y-40">
          {grid.map((release, i) => (
            <ZReleaseRow key={`${filter}-${release.id}`} release={release} index={i} />
          ))}
        </div>
      </div>

      <div className="divider-glow max-w-5xl mx-auto mt-32" />
    </section>
  )
}

function ZReleaseRow({ release, index }: { release: typeof releases[number]; index: number }) {
  const isReversed = index % 2 === 1

  return (
    <a
      href={release.hyperfollow}
      target="_blank"
      rel="noreferrer noopener"
      className="release-anchor group block"
      aria-label={`Listen to ${release.title} by ${release.artist}`}
    >
      <div
        className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-12 items-start md:items-center`}
      >
        {/* Cover — scanlines + floating shadow + stamp badge */}
        <div className="relative w-full md:w-1/2">
          {/* MASSIVE catalog number as section anchor */}
          <div
            className={`absolute -top-8 md:-top-16 ${isReversed ? 'right-0 md:left-auto md:right-0' : 'left-0'} z-0 pointer-events-none select-none`}
            aria-hidden="true"
          >
            <span
              className="font-display text-[5rem] sm:text-[7rem] md:text-[9rem] lg:text-[11rem] font-bold leading-none tracking-[-0.04em]"
              style={{ color: release.color, opacity: 0.12 }}
            >
              {release.catalogNumber}
            </span>
          </div>

          <div className="relative aspect-square overflow-hidden release-cover-shadow"
            style={{ '--spotlight-color': release.color } as React.CSSProperties}
          >
            <Image
              src={release.coverArt}
              alt={`${release.title} cover art`}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            {/* Scanline pattern overlay */}
            <div
              className="absolute inset-0 pointer-events-none scanline-overlay"
              aria-hidden="true"
            />

            {/* Floating element shadow on hover */}
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              aria-hidden="true"
              style={{
                boxShadow: 'inset 0 0 60px rgba(0,0,0,0.55)',
              }}
            />

            {/* Hover reveal */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none flex items-center justify-center bg-void/70">
              <span
                className="font-mono text-[11px] tracking-[0.2em] uppercase px-4 py-2 border"
                style={{ borderColor: release.color, color: release.color }}
              >
                Listen
              </span>
            </div>

            {/* Catalog number badge */}
            <div className="absolute top-3 left-3 font-mono text-[9px] tracking-[0.15em] uppercase text-light/70 bg-void/70 px-2 py-1 border border-edge-ghost">
              {release.catalogNumber}
            </div>

            {/* Stamp texture for release labels */}
            <div
              className="absolute bottom-3 right-3 font-mono text-[9px] tracking-[0.15em] uppercase px-2 py-1 border border-dashed"
              style={{ color: release.color, borderColor: `${release.color}77`, opacity: 0.85 }}
            >
              {release.year}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className={`flex-1 py-2 md:py-8 ${isReversed ? 'md:text-right' : 'md:text-left'}`}>
          <div
            className="font-mono text-[10px] tracking-[0.2em] uppercase mb-4"
            style={{ color: release.color }}
          >
            {release.catalogNumber} · {release.artist} · {release.tracks} tracks
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[0.95] tracking-[-0.03em] mb-2">
            {release.title}
          </h2>
          <p className="font-display text-xl md:text-2xl font-light text-light-dim mb-8">
            {release.year}
          </p>

          <span
            className="inline-block font-mono text-[11px] tracking-[0.15em] uppercase px-6 py-3 border transition-transform duration-300 btn-snap"
            style={{ borderColor: release.color, color: release.color }}
          >
            Listen
          </span>
        </div>
      </div>
    </a>
  )
}
