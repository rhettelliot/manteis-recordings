'use client'

export function Navigation() {
  const links = [
    { label: 'Catalog', href: '#releases' },
    { label: 'Roster', href: '#artists' },
    { label: 'Manifesto', href: '#philosophy' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex items-center justify-between bg-void/80 backdrop-blur-sm border-b border-edge-ghost">
      <a href="#top" className="font-mono text-[11px] tracking-[0.25em] uppercase text-light hover:text-accent transition-colors duration-300">
        MR
      </a>

      <div className="flex items-center gap-8">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="font-mono text-[10px] tracking-[0.2em] uppercase text-light-muted hover:text-light transition-colors duration-300"
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  )
}