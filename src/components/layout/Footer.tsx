'use client'

import { artists } from '@/lib/catalog'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-16 md:py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="divider-glow mb-16" />

        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          {/* Left — wordmark */}
          <div>
            <h3 className="font-display text-2xl md:text-3xl font-bold tracking-[-0.02em] mb-2">
              Manteis Recordings
            </h3>
            <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-light-muted">
              Sovereign sound architecture · Seattle, WA
            </p>
          </div>

          {/* Center — Roster (dedicated artist sites) */}
          <div>
            <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-light-muted mb-4">
              Roster
            </p>
            <div className="flex flex-col gap-2">
              {artists.map((artist) => (
                <a
                  key={artist.name}
                  href={artist.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`Visit ${artist.name} website (opens in new tab)`}
                  className="font-mono text-[10px] tracking-[0.1em] text-light-muted hover:text-accent transition-colors duration-300"
                >
                  {artist.name} ↗
                </a>
              ))}
            </div>
          </div>

          {/* Right — Label */}
          <div>
            <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-light-muted mb-4">
              Label
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="https://open.spotify.com/search/manteis%20recordings"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Search Manteis Recordings on Spotify (opens in new tab)"
                className="font-mono text-[10px] tracking-[0.1em] text-light-muted hover:text-accent transition-colors duration-300"
              >
                Spotify ↗
              </a>
              <a
                href="https://music.apple.com"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Open Apple Music (opens in new tab)"
                className="font-mono text-[10px] tracking-[0.1em] text-light-muted hover:text-accent transition-colors duration-300"
              >
                Apple Music ↗
              </a>
              <a
                href="https://www.instagram.com/manteisrecordings"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Visit Manteis Recordings on Instagram (opens in new tab)"
                className="font-mono text-[10px] tracking-[0.1em] text-light-muted hover:text-accent transition-colors duration-300"
              >
                Instagram ↗
              </a>
              <a
                href="https://manteis.systems"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Visit Manteis Systems website (opens in new tab)"
                className="font-mono text-[10px] tracking-[0.1em] text-light-muted hover:text-accent transition-colors duration-300"
              >
                Manteis Systems ↗
              </a>
              <a
                href="mailto:demo@manteisrecordings.com"
                aria-label="Email Manteis Recordings demos"
                className="font-mono text-[10px] tracking-[0.1em] text-light-muted hover:text-accent transition-colors duration-300"
              >
                Contact
              </a>
            </div>
          </div>
        </div>

        <p className="font-mono text-[9px] tracking-[0.1em] text-light-muted/55 mt-16">
          © {currentYear} Manteis Recordings. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
