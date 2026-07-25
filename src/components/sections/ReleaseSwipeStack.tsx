'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { releases } from '@/lib/catalog'

/**
 * Mobile Tinder-style swipe stack for releases.
 *
 * Cards are stacked with descending scale/opacity. Pointer drag rotates
 * the active card; releasing past a threshold flings it off-screen and
 * promotes the next card. Built with native pointer events, no dependencies.
 */
export function ReleaseSwipeStack() {
  const [stack, setStack] = useState(releases)
  const activeRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef({ startX: 0, currentX: 0, dragging: false })

  const active = stack[0]

  const animateCard = (target: HTMLDivElement, x: number, rotation: number, opacity: number) => {
    target.style.transition = 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease'
    target.style.transform = `translateX(${x}px) rotate(${rotation}deg)`
    target.style.opacity = String(opacity)
  }

  const onPointerDown = (e: React.PointerEvent) => {
    const target = activeRef.current
    if (!target || stack.length <= 1) return
    target.setPointerCapture(e.pointerId)
    target.style.transition = 'none'
    dragRef.current = { startX: e.clientX, currentX: e.clientX, dragging: true }
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current.dragging) return
    const target = activeRef.current
    if (!target) return
    dragRef.current.currentX = e.clientX
    const delta = e.clientX - dragRef.current.startX
    const rotation = delta * 0.04
    target.style.transform = `translateX(${delta}px) rotate(${rotation}deg)`
  }

  const onPointerUp = (e: React.PointerEvent) => {
    const target = activeRef.current
    if (!target) return
    dragRef.current.dragging = false
    const delta = e.clientX - dragRef.current.startX
    const width = window.innerWidth
    if (Math.abs(delta) > width * 0.25) {
      const direction = delta > 0 ? 1 : -1
      animateCard(target, direction * (width + 120), direction * 24, 0)
      setTimeout(() => {
        setStack((prev) => {
          const next = prev.slice(1)
          // recycle removed card to the bottom so the stack never empties
          return next.length ? [...next, prev[0]] : prev
        })
      }, 300)
    } else {
      animateCard(target, 0, 0, 1)
    }
  }

  useEffect(() => {
    const target = activeRef.current
    if (target) {
      target.style.transition = 'none'
      target.style.transform = 'translateX(0) rotate(0deg)'
      target.style.opacity = '1'
    }
  }, [active?.id])

  if (!active) return null

  return (
    <section className="md:hidden py-16 px-5" aria-label="Release swipe stack">
      <div className="section-label mb-8 text-center">Swipe Catalog /</div>
      <div className="relative h-[420px] w-full max-w-sm mx-auto touch-none select-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        {stack.slice(0, 5).map((release, i) => (
          <div
            key={`${release.id}-${i}`}
            ref={i === 0 ? activeRef : undefined}
            className="absolute inset-0 rounded-sm overflow-hidden border border-edge-faint bg-void-raised shadow-2xl"
            style={{
              zIndex: stack.length - i,
              transform: `translateY(${i * 10}px) scale(${1 - i * 0.06})`,
              opacity: i === 0 ? 1 : Math.max(0.35, 1 - i * 0.22),
              transition: i === 0 ? undefined : 'transform 0.4s ease, opacity 0.4s ease',
              pointerEvents: i === 0 ? 'auto' : 'none',
            }}
          >
            <Image
              src={release.coverArt}
              alt={`${release.title} cover art`}
              fill
              className="object-cover"
              sizes="100vw"
              draggable={false}
            />
            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-void via-void/80 to-transparent">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: release.color }}>
                {release.catalogNumber} · {release.artist}
              </div>
              <h3 className="font-display text-2xl font-bold tracking-[-0.02em] mt-1">{release.title}</h3>
              <div className="font-mono text-[10px] text-light-muted mt-1">{release.year} · {release.tracks} tracks</div>
            </div>

            {i === 0 && (
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full border border-edge-faint flex items-center justify-center text-light/60 text-xs">→</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <a
          href={active.hyperfollow}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-block font-mono text-[11px] tracking-[0.2em] uppercase px-8 py-3 border border-accent text-accent"
        >
          Listen Now
        </a>
      </div>
    </section>
  )
}
