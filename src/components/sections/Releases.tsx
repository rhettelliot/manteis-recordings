'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

interface Release {
  id: string
  catalogNumber: string
  artist: string
  title: string
  year: string
  coverArt: string
  hyperfollow: string
  spotify: string
  accentColor: string
}

const releases: Release[] = [
  {
    id: 'mr009',
    catalogNumber: 'MR-009',
    artist: 'Red Shift Mantra',
    title: 'Phoneme',
    year: '2025',
    coverArt: '/covers/RSM_P.webp',
    hyperfollow: 'https://distrokid.com/hyperfollow/redshiftmantra/phoneme-2',
    spotify: 'https://open.spotify.com/album/3jAWlv6FPYUhiDJ0X0KEhH',
    accentColor: '#007AFF',
  },
  {
    id: 'mr008',
    catalogNumber: 'MR-008',
    artist: 'The Manteis Project',
    title: 'Violet Cirrus',
    year: '2024',
    coverArt: '/covers/TMP_VC.webp',
    hyperfollow: 'https://distrokid.com/hyperfollow/themanteisproject/violet-cirrus',
    spotify: 'https://open.spotify.com/album/4MdDdEioXQ41lbk6X0Nycy',
    accentColor: '#7B2FBE',
  },
  {
    id: 'mr007',
    catalogNumber: 'MR-007',
    artist: 'Red Shift Mantra',
    title: 'Deep Field Image',
    year: '2024',
    coverArt: '/covers/RSM_DFI.webp',
    hyperfollow: 'https://distrokid.com/hyperfollow/redshiftmantra/deep-field-image-2',
    spotify: 'https://open.spotify.com/album/1nJCr1MCkLBA1ZqD7j7GDF',
    accentColor: '#FF4D00',
  },
  {
    id: 'mr006',
    catalogNumber: 'MR-006',
    artist: 'The Manteis Project',
    title: 'The Source',
    year: '2024',
    coverArt: '/covers/MP_The_Source.webp',
    hyperfollow: 'https://distrokid.com/hyperfollow/themanteisproject/the-source',
    spotify: 'https://open.spotify.com/album/443nEtoaElHaWhQFAXaazV',
    accentColor: '#00C9A7',
  },
  {
    id: 'mr005',
    catalogNumber: 'MR-005',
    artist: 'The Manteis Project',
    title: 'Continuous',
    year: '2024',
    coverArt: '/covers/MP_Continuous.webp',
    hyperfollow: 'https://distrokid.com/hyperfollow/themanteisproject/continuous',
    spotify: 'https://open.spotify.com/album/73eKYvDhEq9bQ9gjI8VZ8a',
    accentColor: '#3B82F6',
  },
  {
    id: 'mr004',
    catalogNumber: 'MR-004',
    artist: 'The Manteis Project',
    title: 'Foundations',
    year: '2023',
    coverArt: '/covers/MP_Foundations.webp',
    hyperfollow: 'https://distrokid.com/hyperfollow/themanteisproject/foundations',
    spotify: 'https://open.spotify.com/album/0OS6JdgHjDKPJEbgXArA8L',
    accentColor: '#EAB308',
  },
  {
    id: 'mr003',
    catalogNumber: 'MR-003',
    artist: 'Bethany Pritchett',
    title: 'Good Morning, Good Fortune Elephant',
    year: '2024',
    coverArt: '/covers/GMGFE.webp',
    hyperfollow: 'https://distrokid.com/hyperfollow/bethanypritchett/good-morning-good-fortune-elephant',
    spotify: 'https://open.spotify.com/album/0hpTO28w4Qjc3xA9oKKQGk',
    accentColor: '#F472B6',
  },
  {
    id: 'mr002',
    catalogNumber: 'MR-002',
    artist: 'Thesan Musique',
    title: 'Ataraxia',
    year: '2024',
    coverArt: '/covers/Thesan.webp',
    hyperfollow: 'https://distrokid.com/hyperfollow/thesanmusique/ataraxia',
    spotify: 'https://open.spotify.com/album/34IoM42BGoMQ7VoeeZSWlh',
    accentColor: '#22D3EE',
  },
  {
    id: 'mr001',
    catalogNumber: 'MR-001',
    artist: 'Brindavan Gardens',
    title: 'Upekṣā',
    year: '2024',
    coverArt: '/covers/BrindavanGardens.webp',
    hyperfollow: 'https://distrokid.com/hyperfollow/brindavangardens/upek/',
    spotify: 'https://open.spotify.com/album/1oPtOn5okI3nLDvWWGgd3F',
    accentColor: '#4ADE80',
  },
]

export function Releases() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.release-card').forEach((card, i) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            once: true,
          },
          delay: i % 3 * 0.1,
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="releases" className="py-32 md:py-48">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="section-label mb-20">Catalog /</div>

        {/* Latest release — featured, large */}
        <div className="mb-24">
          <a
            href={releases[0].hyperfollow}
            target="_blank"
            rel="noreferrer noopener"
            className="group block"
          >
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
              <div
                className="relative w-full md:w-1/2 aspect-square overflow-hidden"
                style={{ border: `1px solid var(--edge-faint)` }}
              >
                <Image
                  src={releases[0].coverArt}
                  alt={`${releases[0].title} cover art`}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                {/* Accent glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${releases[0].accentColor}10 0%, transparent 60%)`,
                  }}
                />
              </div>

              <div className="flex-1 py-4 md:py-8">
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase mb-4" style={{ color: releases[0].accentColor }}>
                  {releases[0].catalogNumber} · {releases[0].year}
                </div>
                <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-[-0.03em] mb-2">
                  {releases[0].title}
                </h2>
                <p className="font-display text-xl md:text-2xl italic text-light-dim mb-8">
                  {releases[0].artist}
                </p>

                <div className="flex items-center gap-4">
                  <div
                    className="font-mono text-[11px] tracking-[0.15em] uppercase px-6 py-3 border transition-all duration-300 hover:scale-105 btn-snap"
                    style={{
                      borderColor: releases[0].accentColor,
                      color: releases[0].accentColor,
                    }}
                  >
                    Listen
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.1em] text-light-muted">Latest Release</span>
                </div>
              </div>
            </div>
          </a>
        </div>

        <div className="divider-glow mb-20" />

        {/* Catalog grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {releases.slice(1).map((release) => (
            <a
              key={release.id}
              href={release.hyperfollow}
              target="_blank"
              rel="noreferrer noopener"
              className="group block"
            >
              <div className="release-card aspect-square overflow-hidden relative">
                <Image
                  src={release.coverArt}
                  alt={`${release.title} cover art`}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />
                {/* Overlay on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 100%)`,
                  }}
                >
                  <span
                    className="font-mono text-[11px] tracking-[0.2em] uppercase px-4 py-2 border"
                    style={{ borderColor: release.accentColor, color: release.accentColor }}
                  >
                    Listen
                  </span>
                </div>
                {/* Catalog number badge */}
                <div className="absolute top-3 left-3 font-mono text-[9px] tracking-[0.15em] uppercase text-light/60 bg-void/70 backdrop-blur-sm px-2 py-1 border border-edge-ghost">
                  {release.catalogNumber}
                </div>
              </div>

              <div className="mt-3 px-1">
                <div
                  className="font-mono text-[9px] tracking-[0.15em] uppercase"
                  style={{ color: release.accentColor }}
                >
                  {release.artist}
                </div>
                <h3 className="font-display text-lg font-bold tracking-[-0.01em] text-light group-hover:text-accent transition-colors duration-300 mt-1">
                  {release.title}
                </h3>
                <div className="font-mono text-[10px] text-light-muted mt-1">
                  {release.year}
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