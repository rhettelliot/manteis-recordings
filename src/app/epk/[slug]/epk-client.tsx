'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { ArtistEPK } from '@/lib/epk'
import type { Release } from '@/lib/catalog'
import { revealOnEnter } from '@/lib/reveal'

interface Props {
  artist: ArtistEPK
  releases: Release[]
}

export function EPKClient({ artist, releases }: Props) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const disposers: Array<() => void> = []
    ;(async () => {
      disposers.push(await revealOnEnter(root.querySelectorAll('.epk-reveal'), { y: 40, duration: 0.7, stagger: 0.06 }))
    })()
    return () => disposers.forEach((d) => d())
  }, [])

  return (
    <div ref={rootRef} className="relative min-h-screen bg-void text-light overflow-x-hidden">
      {/* ─── SKIP LINK ─── */}
      <a href="#epk-main" className="skip-link">Skip to content</a>

      {/* ─── NAV BAR ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-void/80 backdrop-blur-xl border-b border-edge-faint">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="font-mono text-[10px] tracking-[0.2em] uppercase text-light-muted hover:text-light transition-colors"
          >
            ← Manteis Recordings
          </Link>
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-light-muted">
            EPK / {artist.name}
          </span>
        </div>
      </nav>

      <main id="epk-main" className="relative pt-14">
        {/* ─── HERO ─── */}
        <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-end overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <Image
              src={artist.highResPhoto}
              alt={`${artist.name} — ${artist.role}`}
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void via-void/60 to-transparent" />
          </div>

          {/* Solar glow */}
          <div
            className="solar-glow"
            style={{ width: 600, height: 600, top: '-20%', right: '-10%' }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pb-16 md:pb-24 w-full">
            <div className="epk-reveal">
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-light-muted mb-4">
                Electronic Press Kit / {artist.founded}
              </div>
              <h1 className="font-display text-[clamp(2.5rem,10vw,6rem)] font-bold leading-[0.9] tracking-[-0.04em] text-light mb-4">
                {artist.name}
              </h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span
                  className="font-mono text-[11px] tracking-[0.15em] uppercase px-3 py-1 border"
                  style={{ color: artist.color, borderColor: `${artist.color}59` }}
                >
                  {artist.role}
                </span>
                <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-light-muted">
                  {artist.location}
                </span>
                <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-light-muted">
                  {releases.length} {releases.length === 1 ? 'release' : 'releases'}
                </span>
              </div>
              <p className="mt-6 text-lg md:text-xl text-light-dim max-w-2xl leading-relaxed">
                {artist.tagline}
              </p>
            </div>
          </div>
        </section>

        {/* ─── BIO ─── */}
        <section className="relative py-20 md:py-32">
          <div className="max-w-4xl mx-auto px-6 md:px-10">
            <div className="section-label mb-8 epk-reveal">Bio /</div>
            <div className="space-y-6">
              {artist.bio.map((para, i) => (
                <p
                  key={i}
                  className="epk-reveal text-base md:text-lg text-light-dim leading-relaxed"
                >
                  {para}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* ─── STATS STRIP ─── */}
        <section className="border-y border-edge-faint py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Releases', value: releases.length },
              { label: 'Total Tracks', value: releases.reduce((sum, r) => sum + r.tracks, 0) },
              { label: 'Catalog', value: releases.map((r) => r.catalogNumber).join(', ') },
              { label: 'Based In', value: artist.location },
            ].map((stat, i) => (
              <div key={i} className="epk-reveal">
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-light-muted mb-2">
                  {stat.label}
                </div>
                <div className="font-display text-xl md:text-2xl font-bold text-light tracking-tight">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── DISCOGRAPHY ─── */}
        <section className="relative py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="section-label mb-8 epk-reveal">Discography /</div>
            <h2 className="font-display text-[clamp(2rem,6vw,4rem)] font-bold tracking-[-0.03em] text-light mb-12 epk-reveal">
              Catalog
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {releases.map((release) => (
                <div
                  key={release.id}
                  className="epk-reveal bento group cursor-pointer"
                  onClick={() => window.open(release.hyperfollow, '_blank', 'noopener noreferrer')}
                  role="link"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      window.open(release.hyperfollow, '_blank', 'noopener noreferrer')
                    }
                  }}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={release.coverArt}
                      alt={`${release.title} — ${release.artist}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-light">
                        Listen →
                      </span>
                    </div>
                  </div>
                  <div className="p-5 md:p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="font-mono text-[10px] tracking-[0.15em] uppercase"
                        style={{ color: artist.color }}
                      >
                        {release.catalogNumber}
                      </span>
                      <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-light-muted">
                        {release.year}
                      </span>
                    </div>
                    <h3 className="font-display text-lg md:text-xl font-bold text-light tracking-tight mb-1">
                      {release.title}
                    </h3>
                    <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-light-muted">
                      {release.tracks} {release.tracks === 1 ? 'track' : 'tracks'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SYNC TRACKS ─── */}
        <section className="relative py-20 md:py-32 bg-void-raised">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="section-label mb-8 epk-reveal">Sync Licensing /</div>
            <h2 className="font-display text-[clamp(2rem,6vw,4rem)] font-bold tracking-[-0.03em] text-light mb-4 epk-reveal">
              Best Tracks for Sync
            </h2>
            <p className="text-light-dim text-sm md:text-base max-w-2xl mb-12 epk-reveal">
              Selected tracks optimized for film, TV, advertising, and media placement.
              BPM, duration, and use-case notes provided for each.
            </p>

            <div className="space-y-6">
              {artist.syncTracks.map((track, i) => (
                <div
                  key={i}
                  className="epk-reveal bento p-6 md:p-8 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-start"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className="font-mono text-[10px] tracking-[0.15em] uppercase px-2 py-1 border"
                        style={{ color: artist.color, borderColor: `${artist.color}59` }}
                      >
                        {track.bpm} BPM
                      </span>
                      <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-light-muted">
                        {track.duration}
                      </span>
                    </div>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-light tracking-tight mb-1">
                      {track.title}
                    </h3>
                    <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-light-muted mb-3">
                      {track.release}
                    </div>
                    <p className="text-sm md:text-base text-light-dim leading-relaxed max-w-xl">
                      {track.description}
                    </p>
                  </div>
                  <div className="w-full md:w-[300px] flex-shrink-0">
                    <iframe
                      src={track.embedUrl}
                      width="100%"
                      height="152"
                      frameBorder="0"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      title={`Preview: ${track.title}`}
                      className="rounded-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PRESS QUOTES ─── */}
        <section className="relative py-20 md:py-32">
          <div className="max-w-4xl mx-auto px-6 md:px-10">
            <div className="section-label mb-8 epk-reveal">Press /</div>
            <div className="space-y-8">
              {artist.pressQuotes.map((quote, i) => (
                <blockquote key={i} className="epk-reveal relative">
                  <div
                    className="absolute left-0 top-0 bottom-0 w-[2px]"
                    style={{ background: artist.color }}
                  />
                  <div className="pl-6 md:pl-8">
                    <p className="font-display text-xl md:text-2xl text-light leading-relaxed mb-3">
                      &ldquo;{quote.quote}&rdquo;
                    </p>
                    <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-light-muted">
                      {quote.outlet} / {quote.date}
                    </div>
                  </div>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SOCIAL LINKS ─── */}
        <section className="relative py-20 md:py-32 border-t border-edge-faint">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="section-label mb-8 epk-reveal">Connect /</div>
            <h2 className="font-display text-[clamp(1.5rem,5vw,3rem)] font-bold tracking-[-0.03em] text-light mb-12 epk-reveal">
              Streaming & Social
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {artist.socialLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="epk-reveal bento p-6 group transition-all duration-300 hover:border-edge-clear"
                >
                  <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-light-muted mb-2">
                    {link.platform}
                  </div>
                  <div className="font-display text-lg font-bold text-light group-hover:text-signal transition-colors">
                    {link.handle}
                  </div>
                  <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-light-muted mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    Visit →
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ─── BOOKING / CONTACT ─── */}
        <section className="relative py-20 md:py-32 bg-void-raised">
          <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
            <div className="section-label mb-8 epk-reveal">Booking /</div>
            <h2 className="font-display text-[clamp(2rem,6vw,4rem)] font-bold tracking-[-0.03em] text-light mb-6 epk-reveal">
              Available for Booking
            </h2>
            <p className="text-light-dim text-base md:text-lg max-w-xl mx-auto mb-10 epk-reveal">
              For live performances, sync licensing inquiries, press requests, and collaboration opportunities.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 epk-reveal">
              <a
                href={`mailto:${artist.bookingContact}?subject=Booking Inquiry — ${artist.name}`}
                className="btn"
              >
                Book {artist.name}
              </a>
              <a
                href={`mailto:${artist.pressContact}?subject=Press Inquiry — ${artist.name}`}
                className="font-mono text-[10px] tracking-[0.2em] uppercase text-light-muted hover:text-light transition-colors px-6 py-3"
              >
                Press Contact →
              </a>
            </div>

            <div className="mt-12 font-mono text-[10px] tracking-[0.15em] uppercase text-light-muted epk-reveal">
              {artist.bookingContact}
            </div>
          </div>
        </section>

        {/* ─── FOOTER ─── */}
        <footer className="border-t border-edge-faint py-12">
          <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
            <Link
              href="/"
              className="font-mono text-[10px] tracking-[0.2em] uppercase text-light-muted hover:text-light transition-colors"
            >
              ← Back to Manteis Recordings
            </Link>
            <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-light-muted">
              Manteis Recordings / Seattle, WA / {artist.founded}–Present
            </div>
          </div>
        </footer>
      </main>

      {/* Grain overlay */}
      <div className="grain" />
    </div>
  )
}