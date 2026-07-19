'use client'

export function Navigation() {
  const links = [
    { label: 'Catalog', href: '#releases' },
    { label: 'Roster', href: '#artists' },
    { label: 'Manifesto', href: '#philosophy' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav
        aria-label="Primary"
        className="px-4 md:px-12 py-5 flex items-center justify-between bg-void/80 backdrop-blur-sm border-b border-edge-ghost"
      >
        <a
          href="#top"
          aria-label="Manteis Recordings — back to top"
          className="font-mono text-[11px] tracking-[0.25em] uppercase text-light hover:text-accent transition-colors duration-300"
        >
          <span className="hidden sm:inline">Manteis Recordings</span>
          <span className="sm:hidden">MR</span>
        </a>

        <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-mono text-[10px] tracking-[0.2em] uppercase text-light-muted hover:text-light transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://manteis.systems"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Visit Manteis Systems website (opens in new tab)"
            className="font-mono text-[10px] tracking-[0.2em] uppercase text-light-muted hover:text-accent transition-colors duration-300"
          >
            Systems ↗
          </a>
        </div>
      </nav>
    </header>
  )
}
