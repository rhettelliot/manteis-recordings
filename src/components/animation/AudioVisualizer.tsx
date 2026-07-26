'use client'

import { useEffect, useRef } from 'react'

interface AudioVisualizerProps {
  barCount?: number
  className?: string
}

const SOLAR_ORANGE = '#FF5500'
const SOLAR_GOLD = '#FFE566'
const SOLAR_AMBER = '#B33600'

/**
 * Simulated audio-reactive spectrum analyzer.
 *
 * Canvas-based bars driven by layered sine waves + randomized noise to mimic
 * frequency data. Rendered in the solar ignition palette.
 */
export function AudioVisualizer({ barCount = 80, className = '' }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let width = 0
    let height = 0
    let barWidth = 0
    let gap = 0

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      gap = Math.max(1, Math.floor(width / barCount / 5))
      barWidth = Math.max(2, (width - (barCount - 1) * gap) / barCount)
    }

    resize()
    window.addEventListener('resize', resize)

    // Per-bar personality for organic movement
    const bars = Array.from({ length: barCount }, (_, i) => ({
      base: 0.18 + Math.sin((i / barCount) * Math.PI) * 0.35,
      phase: i * 0.35,
      speed: 0.025 + Math.random() * 0.045,
      amplitude: 0.25 + Math.random() * 0.55,
      jitter: Math.random() * 0.08,
    }))

    let time = 0
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      const beat = Math.max(0, Math.sin(time * 0.06) * 0.35 + 0.15)

      for (let i = 0; i < barCount; i++) {
        const b = bars[i]
        const t = time * b.speed + b.phase
        const wave = Math.sin(t) * b.amplitude + Math.sin(t * 2.7 + i * 0.12) * 0.25 + Math.cos(t * 0.9) * 0.12
        const jitter = (Math.random() - 0.5) * b.jitter
        const value = Math.max(0.05, Math.min(1, b.base + wave + beat + jitter))

        const h = value * height
        const x = i * (barWidth + gap)
        const y = height - h

        const gradient = ctx.createLinearGradient(x, height, x, y)
        gradient.addColorStop(0, `${SOLAR_AMBER}D9`) // 85% alpha
        gradient.addColorStop(0.45, `${SOLAR_ORANGE}E6`) // 90% alpha
        gradient.addColorStop(1, SOLAR_GOLD)

        const glowColor = i % 5 === 0 ? SOLAR_GOLD : i % 3 === 0 ? SOLAR_ORANGE : SOLAR_AMBER
        ctx.shadowBlur = 14
        ctx.shadowColor = glowColor

        ctx.fillStyle = gradient
        ctx.fillRect(x, y, barWidth, h)

        // Bright cap
        ctx.shadowBlur = 6
        ctx.shadowColor = SOLAR_GOLD
        ctx.fillStyle = 'rgba(244, 243, 238, 0.9)'
        ctx.fillRect(x, Math.max(0, y - 2), barWidth, 2)
      }

      // Reflection under the bars
      ctx.save()
      ctx.translate(0, height)
      ctx.scale(1, -0.22)
      ctx.globalAlpha = 0.1
      ctx.shadowBlur = 0
      for (let i = 0; i < barCount; i++) {
        const b = bars[i]
        const t = time * b.speed + b.phase
        const value = Math.max(0.05, Math.min(1, b.base + Math.sin(t) * b.amplitude + beat))
        const h = value * height
        const x = i * (barWidth + gap)
        ctx.fillStyle = SOLAR_AMBER
        ctx.fillRect(x, height - h, barWidth, h)
      }
      ctx.restore()

      time += 1
      animationId = requestAnimationFrame(draw)
    }

    if (!isReduced) {
      draw()
    } else {
      // Static graceful fallback
      ctx.fillStyle = `${SOLAR_AMBER}80`
      for (let i = 0; i < barCount; i++) {
        const h = bars[i].base * height * 0.55
        const x = i * (barWidth + gap)
        ctx.fillRect(x, height - h, barWidth, h)
      }
    }

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [barCount])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  )
}
