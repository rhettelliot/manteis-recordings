/**
 * Single source of truth for the label catalog.
 * Imported by sections (client) and layout (server, for JSON-LD).
 */

export interface Artist {
  name: string
  url: string
  role: string
  releases: number
  color: string
  tagline: string
}

export interface Release {
  id: string
  catalogNumber: string
  artist: string
  title: string
  year: string
  tracks: number
  coverArt: string
  hyperfollow: string
  spotify: string
  color: string
}

/* Per-artist accent colors — used on that artist's row/card ONLY */
export const ARTIST_COLORS: Record<string, string> = {
  'Red Shift Mantra': '#007AFF',
  'The Manteis Project': '#7C3AED',
  'Thesan Musique': '#00FFDD',
  'Brindavan Gardens': '#D4A843',
  'Bethany Pritchett': '#C4788A',
}

export const artists: Artist[] = [
  { name: 'Red Shift Mantra', url: 'https://redshiftmantra.com', role: 'Electronic / Synthwave', releases: 2, color: ARTIST_COLORS['Red Shift Mantra'], tagline: 'Cosmic pressure' },
  { name: 'The Manteis Project', url: 'https://manteis-project-site.vercel.app', role: 'Ambient / Quantum Architecture', releases: 4, color: ARTIST_COLORS['The Manteis Project'], tagline: 'Signal architecture' },
  { name: 'Thesan Musique', url: 'https://thesan-musique-site.vercel.app', role: 'Deep Dance / Techno / DnB', releases: 1, color: ARTIST_COLORS['Thesan Musique'], tagline: 'Warehouse bass' },
  { name: 'Brindavan Gardens', url: 'https://brindavan-gardens-site.vercel.app', role: 'Spiritual / Shoegaze / Dream', releases: 1, color: ARTIST_COLORS['Brindavan Gardens'], tagline: 'Devotional reverb' },
  { name: 'Bethany Pritchett', url: 'https://bethany-pritchett-site.vercel.app', role: 'Alternative / Vocal / Synthesist', releases: 1, color: ARTIST_COLORS['Bethany Pritchett'], tagline: 'Intimate poetry' },
]

/* Catalog order MR-001 → MR-009; listed newest-first for display */
export const releases: Release[] = [
  {
    id: 'mr009',
    catalogNumber: 'MR-009',
    artist: 'Bethany Pritchett',
    title: 'Good Morning, Good Fortune Elephant',
    year: '2025',
    tracks: 5,
    coverArt: '/covers/GMGFE.webp',
    hyperfollow: 'https://distrokid.com/hyperfollow/bethanypritchett/good-morning-good-fortune-elephant',
    spotify: 'https://open.spotify.com/album/0hpTO28w4Qjc3xA9oKKQGk',
    color: ARTIST_COLORS['Bethany Pritchett'],
  },
  {
    id: 'mr008',
    catalogNumber: 'MR-008',
    artist: 'Thesan Musique',
    title: 'Ataraxia',
    year: '2025',
    tracks: 9,
    coverArt: '/covers/Thesan.webp',
    hyperfollow: 'https://distrokid.com/hyperfollow/thesanmusique/ataraxia',
    spotify: 'https://open.spotify.com/album/34IoM42BGoMQ7VoeeZSWlh',
    color: ARTIST_COLORS['Thesan Musique'],
  },
  {
    id: 'mr007',
    catalogNumber: 'MR-007',
    artist: 'Brindavan Gardens',
    title: 'Upekṣā',
    year: '2025',
    tracks: 5,
    coverArt: '/covers/BrindavanGardens.webp',
    hyperfollow: 'https://distrokid.com/hyperfollow/brindavangardens/upek/',
    spotify: 'https://open.spotify.com/album/1oPtOn5okI3nLDvWWGgd3F',
    color: ARTIST_COLORS['Brindavan Gardens'],
  },
  {
    id: 'mr006',
    catalogNumber: 'MR-006',
    artist: 'Red Shift Mantra',
    title: 'Deep Field Image',
    year: '2025',
    tracks: 7,
    coverArt: '/covers/RSM_DFI.webp',
    hyperfollow: 'https://distrokid.com/hyperfollow/redshiftmantra/deep-field-image-2',
    spotify: 'https://open.spotify.com/album/1nJCr1MCkLBA1ZqD7j7GDF',
    color: ARTIST_COLORS['Red Shift Mantra'],
  },
  {
    id: 'mr005',
    catalogNumber: 'MR-005',
    artist: 'The Manteis Project',
    title: 'Violet Cirrus',
    year: '2024',
    tracks: 3,
    coverArt: '/covers/TMP_VC.webp',
    hyperfollow: 'https://distrokid.com/hyperfollow/themanteisproject/violet-cirrus',
    spotify: 'https://open.spotify.com/album/4MdDdEioXQ41lbk6X0Nycy',
    color: ARTIST_COLORS['The Manteis Project'],
  },
  {
    id: 'mr004',
    catalogNumber: 'MR-004',
    artist: 'The Manteis Project',
    title: 'Foundations',
    year: '2024',
    tracks: 4,
    coverArt: '/covers/MP_Foundations.webp',
    hyperfollow: 'https://distrokid.com/hyperfollow/themanteisproject/foundations',
    spotify: 'https://open.spotify.com/album/0OS6JdgHjDKPJEbgXArA8L',
    color: ARTIST_COLORS['The Manteis Project'],
  },
  {
    id: 'mr003',
    catalogNumber: 'MR-003',
    artist: 'The Manteis Project',
    title: 'Continuous',
    year: '2024',
    tracks: 5,
    coverArt: '/covers/MP_Continuous.webp',
    hyperfollow: 'https://distrokid.com/hyperfollow/themanteisproject/continuous',
    spotify: 'https://open.spotify.com/album/73eKYvDhEq9bQ9gjI8VZ8a',
    color: ARTIST_COLORS['The Manteis Project'],
  },
  {
    id: 'mr002',
    catalogNumber: 'MR-002',
    artist: 'Red Shift Mantra',
    title: 'Phoneme',
    year: '2024',
    tracks: 9,
    coverArt: '/covers/RSM_P.webp',
    hyperfollow: 'https://distrokid.com/hyperfollow/redshiftmantra/phoneme-2',
    spotify: 'https://open.spotify.com/album/3jAWlv6FPYUhiDJ0X0KEhH',
    color: ARTIST_COLORS['Red Shift Mantra'],
  },
  {
    id: 'mr001',
    catalogNumber: 'MR-001',
    artist: 'The Manteis Project',
    title: 'The Source',
    year: '2024',
    tracks: 20,
    coverArt: '/covers/MP_The_Source.webp',
    hyperfollow: 'https://distrokid.com/hyperfollow/themanteisproject/the-source',
    spotify: 'https://open.spotify.com/album/443nEtoaElHaWhQFAXaazV',
    color: ARTIST_COLORS['The Manteis Project'],
  },
]

export function artistUrl(name: string): string {
  return artists.find((a) => a.name === name)?.url ?? '#artists'
}
