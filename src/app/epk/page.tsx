import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { artistEPKs } from '@/lib/epk'
import { releases } from '@/lib/catalog'

export const metadata: Metadata = {
  title: 'EPK — Artist Press Kits | Manteis Recordings',
  description:
    'Electronic press kits for all Manteis Recordings artists. Bios, discography, sync licensing tracks, and booking contacts.',
}

export default function EPKIndex() {
  return (
    <div className="relative min-h-screen bg-void text-light">
      <div className="grain" />
      <a href="#epk-list" className="skip-link">Skip to content</a>

      <nav className="fixed top-0 left-0 right-0 z-50 bg-void/80 backdrop-blur-xl border-b border-edge-faint">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="font-mono text-[10px] tracking-[0.2em] uppercase text-light-muted hover:text-light transition-colors"
          >
            ← Manteis Recordings
          </Link>
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-light-muted">
            EPK Index
          </span>
        </div>
      </nav>

      <main id="epk-list" className="relative pt-20 md:pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="section-label mb-6">Press Kits /</div>
          <h1 className="font-display text-[clamp(2.5rem,8vw,5rem)] font-bold leading-[0.95] tracking-[-0.04em] text-light mb-6">
            Electronic <span className="hollow-text">Press Kits</span>
          </h1>
          <p className="text-light-dim text-base md:text-lg max-w-2xl mb-16">
            Complete press materials for every artist on the Manteis Recordings roster.
            Bios, discography, sync-ready tracks, and booking contacts.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {artistEPKs.map((artist) => {
              const artistReleases = releases.filter((r) => r.artist === artist.name)
              return (
                <Link
                  key={artist.slug}
                  href={`/epk/${artist.slug}`}
                  className="bento group overflow-hidden"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={artist.highResPhoto}
                      alt={`${artist.name} — ${artist.role}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                      <div
                        className="font-mono text-[10px] tracking-[0.15em] uppercase px-2 py-1 border inline-block mb-3"
                        style={{ color: artist.color, borderColor: `${artist.color}59` }}
                      >
                        {artist.role}
                      </div>
                      <h2 className="font-display text-xl md:text-2xl font-bold text-light tracking-tight">
                        {artist.name}
                      </h2>
                      <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-light-muted mt-1">
                        {artistReleases.length} {artistReleases.length === 1 ? 'release' : 'releases'} · {artist.location}
                      </div>
                    </div>
                  </div>
                  <div className="p-5 md:p-6 flex items-center justify-between">
                    <span className="text-sm text-light-dim">{artist.tagline}</span>
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-light-muted group-hover:text-light transition-colors">
                      View EPK →
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}