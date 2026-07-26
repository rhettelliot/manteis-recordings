'use client'

import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import { releases } from '@/lib/catalog'
import { GlitchCover } from '@/components/ui/GlitchCover'

interface HoverReleaseCardProps {
  release: typeof releases[number]
  className?: string
}

const DEFAULT_GLOW = '#FF5500'

/**
 * 3D tilt hover release card with cursor-following glow and play button.
 *
 * Uses Framer Motion for springy pointer-driven transforms. Perspective is
 * applied to the card itself so each tile tilts independently.
 */
export function HoverReleaseCard({ release, className = '' }: HoverReleaseCardProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8])
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8])
  const springRotateX = useSpring(rotateX, { stiffness: 180, damping: 20 })
  const springRotateY = useSpring(rotateY, { stiffness: 180, damping: 20 })

  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    x.set(px - 0.5)
    y.set(py - 0.5)
    setGlowPos({ x: px * 100, y: py * 100 })
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <a
      ref={ref}
      href={release.hyperfollow}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={`Listen to ${release.title} by ${release.artist}, ${release.year}`}
      className={`group block ${className}`}
      onMouseMove={onMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={onLeave}
    >
      <motion.div
        className="release-card aspect-square overflow-hidden relative"
        style={{
          perspective: 1000,
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: 'preserve-3d',
          // CSS custom properties for the existing spotlight border
          ['--mouse-x' as unknown as string]: `${glowPos.x}%`,
          ['--mouse-y' as unknown as string]: `${glowPos.y}%`,
          ['--spotlight-color' as unknown as string]: release.color || DEFAULT_GLOW,
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <GlitchCover release={release}>
          <Image
            src={release.coverArt}
            alt={`${release.title} cover art`}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
          />
        </GlitchCover>

        {/* Cursor-following glow overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-[5] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(260px circle at ${glowPos.x}% ${glowPos.y}%, ${release.color || DEFAULT_GLOW}26, transparent 70%)`,
          }}
          aria-hidden="true"
        />

        {/* Hover reveal with play button */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none flex items-center justify-center bg-void/60 z-[6]">
          <motion.div
            className="flex items-center justify-center w-14 h-14 rounded-full border-2"
            style={{ borderColor: release.color, color: release.color }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isHovered ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 16 }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="ml-1"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </motion.div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 font-mono text-[9px] tracking-[0.15em] uppercase text-light/60 bg-void/70 px-2 py-1 border border-edge-ghost z-[7]">
          {release.catalogNumber}
        </div>
        <div className="absolute top-3 right-3 font-mono text-[9px] tracking-[0.15em] uppercase text-light/60 bg-void/70 px-2 py-1 border border-edge-ghost z-[7]">
          {release.year}
        </div>
      </motion.div>
    </a>
  )
}
