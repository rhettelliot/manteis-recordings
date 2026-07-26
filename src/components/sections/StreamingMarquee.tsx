'use client'

import { motion } from 'framer-motion'

const platforms = [
  { name: 'Spotify', url: 'https://open.spotify.com' },
  { name: 'Apple Music', url: 'https://music.apple.com' },
  { name: 'YouTube Music', url: 'https://music.youtube.com' },
  { name: 'Bandcamp', url: 'https://bandcamp.com' },
  { name: 'SoundCloud', url: 'https://soundcloud.com' },
]

/**
 * Kinetic streaming platform marquee.
 *
 * A seamless, infinite-loop ticker of all major platforms. The track accelerates
 * on hover and individual platform names light up in signal pink.
 */
export function StreamingMarquee() {
  const items = [...platforms, ...platforms, ...platforms, ...platforms]

  return (
    <section className="py-14 md:py-20 overflow-hidden border-y border-edge-faint bg-void relative z-10">
      <div className="group flex whitespace-nowrap">
        <motion.div
          className="flex items-center gap-8 md:gap-16"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 22,
              ease: 'linear',
            },
          }}
          whileHover={{ transition: { x: { duration: 9 } } }}
        >
          {items.map((platform, i) => (
            <a
              key={`${platform.name}-${i}`}
              href={platform.url}
              target="_blank"
              rel="noreferrer noopener"
              className="font-mono text-base md:text-sm tracking-[0.3em] uppercase text-light-muted hover:text-accent transition-colors duration-300 min-h-[44px] flex items-center"
            >
              {platform.name}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
