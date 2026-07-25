'use client'

import { useEffect, useRef, useCallback } from 'react'
import { releases } from '@/lib/catalog'

export function ArtistHoverTrail() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lastRef = useRef(0)
  const indexRef = useRef(0)

  const spawn = useCallback((x: number, y: number) => {
    const now = Date.now()
    if (now - lastRef.current < 90) return
    lastRef.current = now

    const container = containerRef.current
    if (!container) return

    const release = releases[indexRef.current % releases.length]
    indexRef.current += 1

    const el = document.createElement('div')
    el.className = 'pointer-events-none absolute z-20 w-24 h-24 md:w-32 md:h-32 rounded-sm overflow-hidden border border-edge-faint shadow-2xl'
    el.style.left = `${x - 48}px`
    el.style.top = `${y - 48}px`
    el.style.opacity = '0'
    el.style.transform = 'scale(0.5) rotate(-8deg)'
    el.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease'

    const img = document.createElement('img')
    img.src = release.coverArt
    img.alt = `${release.title} cover art`
    img.className = 'w-full h-full object-cover'
    el.appendChild(img)

    container.appendChild(el)

    requestAnimationFrame(() => {
      el.style.opacity = '0.9'
      el.style.transform = `scale(1.05) rotate(${Math.random() * 10 - 5}deg)`
    })

    setTimeout(() => {
      el.style.opacity = '0'
      el.style.transform = 'scale(0.75) rotate(8deg)'
      setTimeout(() => el.remove(), 800)
    }, 650)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const onMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      if (x > 0 && y > 0 && x < rect.width && y < rect.height) {
        spawn(x, y)
      }
    }

    container.addEventListener('pointermove', onMove)
    return () => container.removeEventListener('pointermove', onMove)
  }, [spawn])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-auto overflow-hidden"
      aria-hidden="true"
    />
  )
}

export function ArtistHoverTrailLayer() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <ArtistHoverTrail />
    </div>
  )
}
