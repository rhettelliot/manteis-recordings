import type { Metadata } from 'next'
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
    images: ['/ManteisRecordings_color.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable} ${playfair.variable}`}>
      <body className="bg-void text-light antialiased">
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  )
}