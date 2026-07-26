'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { releases } from '@/lib/catalog'

/**
 * Desktop 3D Coverflow carousel for releases.
 *
 * Center release faces forward; siblings rotate Y and push back in Z.
 * Click / keyboard arrows move focus. CSS 3D transforms + React state,
 * no external carousel dependencies.
 */
export function CoverflowCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setActiveIndex((i) => Math.min(i + 1, releases.length - 1))
      if (e.key === 'ArrowLeft') setActiveIndex((i) => Math.max(i - 1, 0))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <section className="hidden md:block py-24 overflow-hidden" aria-label="Release coverflow">
      <div className="section-label text-center mb-12">Coverflow /</div>

      <div
        ref={containerRef}
        className="relative h-[520px] w-full max-w-6xl mx-auto perspective-[1200px]"
        style={{ perspective: '1200px' }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {releases.map((release, i) => {
            const offset = i - activeIndex
            const abs = Math.abs(offset)
            const z = -abs * 90
            const x = offset * 260
            const rotateY = offset * -42
            const scale = 1 - abs * 0.12
            const opacity = abs > 2 ? 0 : 1 - abs * 0.25

            return (
              <button
                key={release.id}
                onClick={() => setActiveIndex(i)}
                className="absolute w-64 aspect-square rounded-sm overflow-hidden border bg-void-raised focus-visible:outline-accent"
                style={{
                  borderColor: i === activeIndex ? release.color : 'rgba(255,255,255,0.08)',
                  transform: `translateX(${x}px) translateZ(${z}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex: releases.length - abs,
                  transition: 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s ease, border-color 0.3s ease',
                  transformStyle: 'preserve-3d',
                }}
                aria-label={`${release.title} by ${release.artist}`}
              >
                <Image
                  src={release.coverArt}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="256px"
                  draggable={false}
                />
                {i === activeIndex && (
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-void via-void/80 to-transparent text-left">
                    <div className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: release.color }}>
                      {release.catalogNumber}
                    </div>
                    <h3 className="font-display text-xl font-bold tracking-[-0.02em]">{release.title}</h3>
                    <div className="font-mono text-[10px] text-light-muted mt-1">{release.artist} · {release.year}</div>
                  </div>
                )}
              </button>
            )
          })}
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
          {releases.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to release ${i + 1}`}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${i === activeIndex ? 'bg-accent' : 'bg-edge-subtle hover:bg-edge-clear'}`}
            />
          ))}
        </div>

        <div className="absolute bottom-4 right-8 flex gap-3">
          <button
            onClick={() => setActiveIndex((i) => Math.max(i - 1, 0))}
            className="w-11 h-11 border border-edge-faint rounded-full text-light/60 hover:text-light hover:border-accent transition-colors"
            aria-label="Previous release"
          >
            ←
          </button>
          <button
            onClick={() => setActiveIndex((i) => Math.min(i + 1, releases.length - 1))}
            className="w-11 h-11 border border-edge-faint rounded-full text-light/60 hover:text-light hover:border-accent transition-colors"
            aria-label="Next release"
          >
            →
          </button>
        </div>
      </div>

      <div className="text-center mt-8">
        <a
          href={releases[activeIndex].hyperfollow}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-block font-mono text-[11px] tracking-[0.2em] uppercase px-6 md:px-10 py-3 md:py-4 border border-accent text-accent hover:bg-accent hover:text-void transition-colors min-h-[44px]"
        >
          Listen to {releases[activeIndex].title}
        </a>
      </div>
    </section>
  )
}
