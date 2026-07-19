import type { Metadata, Viewport } from 'next'
import '@/styles/globals.css'
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google'
import { artists, releases } from '@/lib/catalog'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Manteis Recordings — Sovereign Sound Architecture',
  description:
    'Manteis Recordings — sovereign sound architecture. Nine releases across five artists: The Manteis Project, Red Shift Mantra, Thesan Musique, Brindavan Gardens, Bethany Pritchett.',
  metadataBase: new URL('https://manteisrecordings.com'),
  openGraph: {
    title: 'Manteis Recordings',
    description: 'Sovereign sound architecture — nine releases, five artists.',
    type: 'website',
    images: [{ url: '/og.jpg', width: 1200, height: 1200, alt: 'Manteis Recordings — sovereign sound architecture' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Manteis Recordings',
    description: 'Sovereign sound architecture — nine releases, five artists.',
    images: ['/og.jpg'],
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'dark',
}

/* Organization + MusicAlbum graph (schema.org has no MusicLabel type;
   albums point back to the label via recordLabel) */
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://manteisrecordings.com/#label',
      name: 'Manteis Recordings',
      url: 'https://manteisrecordings.com',
      logo: 'https://manteisrecordings.com/ManteisRecordings_color.png',
      description: 'Independent record label — sovereign sound architecture. Seattle, WA.',
      sameAs: artists.map((a) => a.url),
    },
    ...artists.map((a) => ({
      '@type': 'MusicGroup',
      '@id': `https://manteisrecordings.com/#${a.name.toLowerCase().replace(/\s+/g, '-')}`,
      name: a.name,
      url: a.url,
      genre: a.role,
    })),
    ...releases.map((r) => ({
      '@type': 'MusicAlbum',
      name: r.title,
      datePublished: r.year,
      numTracks: r.tracks,
      url: r.hyperfollow,
      image: `https://manteisrecordings.com${r.coverArt}`,
      byArtist: { '@id': `https://manteisrecordings.com/#${r.artist.toLowerCase().replace(/\s+/g, '-')}` },
      recordLabel: { '@id': 'https://manteisrecordings.com/#label' },
    })),
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-void text-light antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main-content"
          className="skip-link"
        >
          Skip to main content
        </a>
        <noscript>
          <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000000', color: '#FF007F', fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', textAlign: 'center', padding: 24 }}>
            Manteis Recordings is an interactive experience — enable JavaScript to enter.
          </div>
        </noscript>
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
