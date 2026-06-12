import type { Metadata, Viewport } from 'next'
import '@/styles/globals.css'
import { Inter, JetBrains_Mono, Playfair_Display } from 'next/font/google'

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

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '700', '900'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Manteis Recordings',
  description: 'Deep textural electronic music. A record label for the geometry of sound.',
  metadataBase: new URL('https://manteisrecordings.com'),
  openGraph: {
    title: 'Manteis Recordings',
    description: 'Deep textural electronic music — Manteis Recordings',
    type: 'website',
    images: [{ url: '/og.jpg', width: 1200, height: 1200, alt: 'Manteis Recordings — deep textural electronic music' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Manteis Recordings',
    description: 'Deep textural electronic music — Manteis Recordings',
    images: ['/og.jpg'],
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable} ${playfair.variable}`}>
      <body className="bg-void text-light antialiased">
        <noscript>
          <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000000', color: '#007AFF', fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', textAlign: 'center', padding: 24 }}>
            Manteis Recordings is an interactive experience — enable JavaScript to enter.
          </div>
        </noscript>
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  )
}