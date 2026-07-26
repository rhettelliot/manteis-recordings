'use client'

import { useState } from 'react'

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const links = [
    { label: 'Catalog', href: '#releases' },
    { label: 'Roster', href: '#artists' },
    { label: 'Manifesto', href: '#philosophy' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav
        aria-label="Primary"
        className="px-4 md:px-12 py-4 md:py-5 flex items-center justify-between bg-void/80 backdrop-blur-sm border-b border-edge-ghost"
      >
        <a
          href="#top"
          aria-label="Manteis Recordings — back to top"
          className="font-mono text-[11px] tracking-[0.25em] uppercase text-light hover:text-accent transition-colors duration-300"
        >
          <span className="hidden sm:inline">Manteis Recordings</span>
          <span className="sm:hidden">MR</span>
        </a>

        <div className="hidden md:flex items-center gap-4 sm:gap-6 md:gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-mono text-[10px] tracking-[0.2em] uppercase text-light-muted hover:text-light transition-colors duration-300 min-h-[44px] flex items-center"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://manteis.systems"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Visit Manteis Systems website (opens in new tab)"
            className="font-mono text-[10px] tracking-[0.2em] uppercase text-light-muted hover:text-accent transition-colors duration-300 min-h-[44px] flex items-center px-2"
          >
            Systems ↗
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          className="md:hidden flex flex-col items-end gap-[5px] p-2 min-h-[44px] min-w-[44px] justify-center"
        >
          <div
            className="h-[1px] bg-light transition-all duration-300 origin-right"
            style={{
              width: '20px',
              transform: mobileOpen ? 'rotate(-45deg) translateX(1px)' : 'none',
            }}
          />
          <div
            className="h-[1px] bg-light transition-all duration-300"
            style={{
              width: mobileOpen ? '0px' : '14px',
              opacity: mobileOpen ? 0 : 1,
            }}
          />
          <div
            className="h-[1px] bg-light transition-all duration-300 origin-right"
            style={{
              width: '20px',
              transform: mobileOpen ? 'rotate(45deg) translateX(1px)' : 'none',
            }}
          />
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden px-6 py-6 space-y-4 bg-void/95 backdrop-blur-sm border-b border-edge-ghost">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block font-mono text-[12px] tracking-[0.15em] uppercase text-light-muted hover:text-light transition-colors duration-300 py-2 min-h-[44px] flex items-center"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://manteis.systems"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Visit Manteis Systems website (opens in new tab)"
            className="block font-mono text-[12px] tracking-[0.15em] uppercase text-light-muted hover:text-accent transition-colors duration-300 py-2 min-h-[44px] flex items-center"
          >
            Systems ↗
          </a>
        </div>
      )}
    </header>
  )
}
