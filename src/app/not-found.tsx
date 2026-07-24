import Link from 'next/link'

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center text-center px-6"
      style={{ backgroundColor: '#000000' }}
    >
      <p className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: '#FF6EC7' }}>
        404 — No such frequency
      </p>
      <h1 className="font-display text-4xl md:text-6xl mt-6 mb-4" style={{ color: '#FDFCDC' }}>
        Page not found
      </h1>
      <p className="font-body text-sm mb-12" style={{ color: '#BFBBA3' }}>
        This page is not in the catalog.
      </p>
      <Link
        href="/"
        className="font-mono text-[10px] tracking-[0.25em] uppercase px-8 py-4 border transition-colors duration-200"
        style={{ borderColor: '#FF6EC7', color: '#FF6EC7' }}
      >
        Return to the label
      </Link>
    </main>
  )
}
