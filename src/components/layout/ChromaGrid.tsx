'use client'

import { useEffect, useRef } from 'react'

/**
 * Chroma grid — continuously animating signal-pink gradients along grid lines.
 *
 * A CSS-driven background layer that overlays the entire site with a faint
 * grid whose borders shimmer via animated gradient masks in the signal pink.
 */
export function ChromaGrid() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !ref.current) return
    ref.current.style.setProperty('--chroma-play', 'running')
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="chroma-grid"
      style={{ '--chroma-play': 'paused' } as React.CSSProperties}
    />
  )
}
