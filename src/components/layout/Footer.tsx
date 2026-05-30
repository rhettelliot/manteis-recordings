'use client'

const artists = [
  { name: 'Red Shift Mantra', path: '/red-shift-mantra' },
  { name: 'The Manteis Project', path: '/the-manteis-project' },
  { name: 'Thesan Musique', path: '/thesan-musique' },
  { name: 'Brindavan Gardens', path: '/brindavan-gardens' },
  { name: 'Bethany Pritchett', path: '/bethany-pritchett' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-16 md:py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="divider-glow mb-16" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-start gap-12">
          {/* Left */}
          <div>
            <h3 className="font-display text-2xl md:text-3xl font-bold tracking-[-0.02em] mb-2">
              Manteis Recordings
            </h3>
            <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-light-muted">
              Deep textural electronic music · Seattle, WA
            </p>
          </div>

          {/* Center — Artists */}
          <div>
            <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-light-muted mb-4">
              Roster
            </p>
            <div className="flex flex-col gap-2">
              {artists.map((artist) => (
                <a
                  key={artist.path}
                  href={artist.path}
                  className="font-mono text-[10px] tracking-[0.1em] text-light-muted hover:text-accent transition-colors duration-300"
                >
                  {artist.name}
                </a>
              ))}
            </div>
          </div>

          {/* Right — Streaming */}
          <div className="flex flex-col md:items-end gap-4">
            <div className="flex gap-6">
              <a
                href="https://open.spotify.com/search/manteis%20recordings"
                target="_blank"
                rel="noreferrer noopener"
                className="font-mono text-[10px] tracking-[0.15em] uppercase text-light-muted hover:text-accent transition-colors duration-300"
              >
                Spotify
              </a>
              <a
                href="https://music.apple.com"
                target="_blank"
                rel="noreferrer noopener"
                className="font-mono text-[10px] tracking-[0.15em] uppercase text-light-muted hover:text-accent transition-colors duration-300"
              >
                Apple Music
              </a>
              <a
                href="https://www.instagram.com/manteisrecordings"
                target="_blank"
                rel="noreferrer noopener"
                className="font-mono text-[10px] tracking-[0.15em] uppercase text-light-muted hover:text-accent transition-colors duration-300"
              >
                Instagram
              </a>
            </div>

            <p className="font-mono text-[9px] tracking-[0.1em] text-light-muted/50">
              © {currentYear} Manteis Recordings. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}