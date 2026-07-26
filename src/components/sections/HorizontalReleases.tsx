'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { releases } from '@/lib/catalog'

gsap.registerPlugin(ScrollTrigger)

/**
 * Horizontal scroll hijack — releases.
 *
 * The section pins to the viewport and converts vertical scroll distance into
 * horizontal camera movement across a wide track. `scrub: 1` gives the motion
 * an inertial, momentum-like lag, and the cards subtly skew/scale based on
 * live scroll velocity for a physical, kinetic feel.
 */
export function HorizontalReleases() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReduced) return

    const ctx = gsap.context(() => {
      const total = () => track.scrollWidth - window.innerWidth

      const scrollTween = gsap.to(track, {
        x: () => -total(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${Math.max(total(), window.innerWidth)}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })

      // velocity-based skew/scale for momentum physics
      const cards = gsap.utils.toArray<HTMLElement>('.h-release-card')
      let lastProgress = 0
      const velocityTicker = () => {
        const st = scrollTween.scrollTrigger
        if (!st) return
        const raw = (st.progress - lastProgress) * 1000
        lastProgress = st.progress
        const skew = gsap.utils.clamp(-10, 10, raw * 25)
        const scale = gsap.utils.clamp(0.92, 1.08, 1 - Math.abs(raw) * 0.8)
        gsap.to(cards, {
          skewX: skew,
          scaleY: scale,
          duration: 0.25,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      }
      gsap.ticker.add(velocityTicker)

      // reset transforms when the section releases
      const resetSt = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        onLeave: () => gsap.to(cards, { skewX: 0, scaleY: 1, duration: 0.4 }),
        onEnterBack: () => gsap.to(cards, { skewX: 0, scaleY: 1, duration: 0.4 }),
      })

      return () => {
        gsap.ticker.remove(velocityTicker)
        resetSt.kill()
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="h-screen w-full overflow-hidden relative bg-void z-10">
      <div className="section-label absolute top-8 left-6 md:left-10 z-20">Momentum Catalog /</div>

      <div
        ref={trackRef}
        className="flex h-full items-center gap-6 md:gap-10 px-6 md:px-10 w-max will-change-transform"
      >
        {releases.map((release, i) => (
          <a
            key={release.id}
            href={release.hyperfollow}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`Listen to ${release.title} by ${release.artist}`}
            className="h-release-card relative h-[62vh] w-[72vw] md:w-[40vw] lg:w-[32vw] shrink-0 border border-edge-faint bg-void-raised overflow-hidden group will-change-transform"
          >
            <Image
              src={release.coverArt}
              alt={`${release.title} cover art`}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              sizes="(max-width: 768px) 72vw, 40vw"
              draggable={false}
            />

            {/* chroma grid overlay */}
            <div className="release-chroma opacity-0 group-hover:opacity-25" aria-hidden="true" />

            {/* spotlight border */}
            <SpotlightBorder />

            <div className="absolute inset-0 bg-gradient-to-t from-void via-void/60 to-transparent" />

            <div className="absolute bottom-0 left-0 p-6 md:p-8">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: release.color }}>
                {release.catalogNumber} · {String(i + 1).padStart(2, '0')} / {String(releases.length).padStart(2, '0')}
              </div>
              <h3 className="font-display text-2xl md:text-4xl font-bold tracking-[-0.02em] leading-none text-light">
                {release.title}
              </h3>
              <div className="font-mono text-[10px] md:text-[11px] tracking-[0.1em] uppercase text-light-dim mt-2">
                {release.artist} · {release.year}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

function SpotlightBorder() {
  const ref = useRef<HTMLDivElement>(null)
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.parentElement?.getBoundingClientRect()
    if (!rect || !ref.current) return
    ref.current.style.setProperty('--spotlight-x', `${((e.clientX - rect.left) / rect.width) * 100}%`)
    ref.current.style.setProperty('--spotlight-y', `${((e.clientY - rect.top) / rect.height) * 100}%`)
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className="spotlight-border opacity-0 group-hover:opacity-100"
      aria-hidden="true"
    />
  )
}
