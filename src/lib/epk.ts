/**
 * EPK (Electronic Press Kit) data — extended artist information
 * beyond what the main catalog holds. Bios, sync tracks, social links,
 * press quotes, and booking contact.
 *
 * This is the single source of truth for EPK pages at /epk/[slug].
 */

export interface SyncTrack {
  title: string
  release: string
  bpm: string
  duration: string
  description: string
  embedUrl: string
}

export interface SocialLink {
  platform: string
  url: string
  handle: string
}

export interface PressQuote {
  outlet: string
  quote: string
  date: string
}

export interface ArtistEPK {
  slug: string
  name: string
  role: string
  tagline: string
  color: string
  bio: string[]
  shortBio: string
  location: string
  founded: string
  syncTracks: SyncTrack[]
  socialLinks: SocialLink[]
  pressQuotes: PressQuote[]
  bookingContact: string
  pressContact: string
  highResPhoto: string
}

export const artistEPKs: ArtistEPK[] = [
  {
    slug: 'the-manteis-project',
    name: 'The Manteis Project',
    role: 'Ambient / Quantum Architecture',
    tagline: 'Signal architecture',
    color: '#FF5500',
    shortBio:
      'Ambient architecture from the intersection of data, frequency, and presence. Four transmissions mapping the terrain between void and signal.',
    bio: [
      'The Manteis Project is the ambient architecture arm of Manteis Recordings — a solo exploration of sound as structural blueprint. Where most ambient music creates atmosphere, The Manteis Project builds rooms you can stand in.',
      'Four releases chart a progression from foundational drone (The Source, 20 tracks of generative architecture) through quantum geometry (Continuous, Foundations) to the atmospheric precision of Violet Cirrus. Each release treats frequency as a building material — not decoration, not mood, but load-bearing structure.',
      'The work draws from the lineage of Brian Eno, Stars of the Lid, and Steve Roach, but rejects the genre\'s passivity. This is not background music. This is foundation music — the acoustic substrate upon which attention itself can be constructed.',
    ],
    location: 'Seattle, WA',
    founded: '2024',
    syncTracks: [
      {
        title: 'Violet Cirrus',
        release: 'Violet Cirrus (MR-005)',
        bpm: '70',
        duration: '8:42',
        description:
          'Layered drone with upper-harmonic shimmer. Ideal for contemplative sequences, scientific visualization, and architectural reveal shots.',
        embedUrl: 'https://open.spotify.com/embed/album/4MdDdEioXQ41lbk6X0Nycy',
      },
      {
        title: 'Continuous',
        release: 'Continuous (MR-003)',
        bpm: '60',
        duration: '12:15',
        description:
          'Long-form generative ambient. Sustained tonal fields with slow harmonic evolution. Perfect for extended meditation, time-lapse, and slow cinema.',
        embedUrl: 'https://open.spotify.com/embed/album/73eKYvDhEq9bQ9gjI8VZ8a',
      },
      {
        title: 'The Source',
        release: 'The Source (MR-001)',
        bpm: '50',
        duration: '20:00',
        description:
          'Twenty-track generative suite. The foundational transmission — pure architecture from first principles. Ideal for installation work and long-form media.',
        embedUrl: 'https://open.spotify.com/embed/album/443nEtoaElHaWhQFAXaazV',
      },
    ],
    socialLinks: [
      { platform: 'Spotify', url: 'https://open.spotify.com/artist/4xG6n3c2dQF0w7oK9aT2b1', handle: '@themanteisproject' },
      { platform: 'SoundCloud', url: 'https://soundcloud.com/rhettelliot', handle: '@rhettelliot' },
      { platform: 'Bandcamp', url: 'https://manteisrecordings.bandcamp.com', handle: 'manteisrecordings' },
    ],
    pressQuotes: [
      {
        outlet: 'Self-published',
        quote:
          'Sound is architecture. Frequencies are blueprints for worlds. Ambient is not background — it is foundation.',
        date: '2024',
      },
    ],
    bookingContact: 'manteisrecordings@mac.com',
    pressContact: 'manteisrecordings@mac.com',
    highResPhoto: '/covers/MP_The_Source.webp',
  },
  {
    slug: 'red-shift-mantra',
    name: 'Red Shift Mantra',
    role: 'Electronic / Synthwave',
    tagline: 'Cosmic pressure',
    color: '#FF5500',
    shortBio:
      'Cosmic pressure encoded as sound. Two transmissions mapping the distance between atomic vibration and the void between stars.',
    bio: [
      'Red Shift Mantra is the cosmic metaphor made audible — the red shift of distant light stretched low, the mantra as vibration that reshapes consciousness through repetition. Two albums map this terrain: Phoneme (9 tracks of granular synth architecture) and Deep Field Image (7 tracks inspired by the Hubble Deep Field observation).',
      'The sound occupies the space between synthwave\'s pulse and ambient\'s expanse. It is not retro-futurism. It is cosmic realism — the sound of a universe that is mostly empty, punctuated by the violence of creation.',
      'Every photon that reaches us carries the signature of cosmic recession. The music maps this: from the void between stars to the atomic vibrations within. Transformation through displacement.',
    ],
    location: 'Seattle, WA',
    founded: '2024',
    syncTracks: [
      {
        title: 'Obsidian',
        release: 'Deep Field Image (MR-006)',
        bpm: '120',
        duration: '5:38',
        description:
          'Driving synthwave with granular texture. Dark, propulsive energy for night driving sequences, tech reveals, and high-stakes montage.',
        embedUrl: 'https://open.spotify.com/embed/album/1nJCr1MCkLBA1ZqD7j7GDF',
      },
      {
        title: 'Ajna',
        release: 'Phoneme (MR-002)',
        bpm: '90',
        duration: '7:22',
        description:
          'Hypnotic synth architecture with third-eye intensity. Builds from drone to pulse. Ideal for meditation sequences, consciousness expansion, and transition montages.',
        embedUrl: 'https://open.spotify.com/embed/album/3jAWlv6FPYUhiDJ0X0KEhH',
      },
      {
        title: 'Kobayashi Maru',
        release: 'Deep Field Image (MR-006)',
        bpm: '110',
        duration: '4:51',
        description:
          'Tension-laden electronic with no-win-scenario energy. Perfect for cliffhanger moments, training sequences, and impossible-choice narratives.',
        embedUrl: 'https://open.spotify.com/embed/album/1nJCr1MCkLBA1ZqD7j7GDF',
      },
    ],
    socialLinks: [
      { platform: 'Spotify', url: 'https://open.spotify.com/artist/1nJCr1MCkLBA1ZqD7j7GDF', handle: '@redshiftmantra' },
      { platform: 'SoundCloud', url: 'https://soundcloud.com/rhettelliot', handle: '@rhettelliot' },
      { platform: 'Bandcamp', url: 'https://manteisrecordings.bandcamp.com', handle: 'manteisrecordings' },
    ],
    pressQuotes: [
      {
        outlet: 'Self-published',
        quote:
          'Light from distant galaxies stretches toward the red end of the spectrum as the universe expands. This is the fundamental metaphor: transformation through displacement.',
        date: '2024',
      },
    ],
    bookingContact: 'manteisrecordings@mac.com',
    pressContact: 'manteisrecordings@mac.com',
    highResPhoto: '/covers/RSM_DFI.webp',
  },
  {
    slug: 'thesan-musique',
    name: 'Thesan Musique',
    role: 'Deep Dance / Techno / DnB',
    tagline: 'Warehouse bass',
    color: '#FF5500',
    shortBio:
      'Bass is architecture. The kick drum is the heartbeat of a world that has forgotten how to dance. Ataraxia: tranquility through rhythm.',
    bio: [
      'Thesan Musique is the dance floor architecture arm of Manteis Recordings. Where The Manteis Project builds rooms for contemplation, Thesan Musique builds rooms for movement — warehouses, basements, the liminal spaces where bass frequencies become physical.',
      'The debut album Ataraxia (9 tracks) strips everything to frequency. Techno removes the unnecessary. DnB accelerates what was already infinite. The result is not music for dancing — it is dancing made structural, the body\'s response to rhythm rendered as architecture.',
      'Thesan — from the Etruscan goddess of dawn, transformation, and the threshold between states. The music exists at that threshold: between night and morning, between stillness and motion, between the individual and the collective.',
    ],
    location: 'Seattle, WA',
    founded: '2025',
    syncTracks: [
      {
        title: 'Ataraxia',
        release: 'Ataraxia (MR-008)',
        bpm: '130',
        duration: '6:45',
        description:
          'Peak-time techno with warehouse energy. Driving bass, hypnotic repetition, euphoric breakdown. Built for sweat and dark rooms.',
        embedUrl: 'https://open.spotify.com/embed/album/34IoM42BGoMQ7VoeeZSWlh',
      },
      {
        title: 'Warehouse Bass',
        release: 'Ataraxia (MR-008)',
        bpm: '174',
        duration: '5:12',
        description:
          'DnB energy with sub-bass pressure. Fast, kinetic, relentless. Ideal for high-energy sequences, chase scenes, and kinetic montage.',
        embedUrl: 'https://open.spotify.com/embed/album/34IoM42BGoMQ7VoeeZSWlh',
      },
      {
        title: 'Tranquility',
        release: 'Ataraxia (MR-008)',
        bpm: '120',
        duration: '8:30',
        description:
          'Ambient techno — the comedown after the peak. Warm bass, atmospheric pads, rhythmic residue. Perfect for after-hours and contemplative transitions.',
        embedUrl: 'https://open.spotify.com/embed/album/34IoM42BGoMQ7VoeeZSWlh',
      },
    ],
    socialLinks: [
      { platform: 'Spotify', url: 'https://open.spotify.com/artist/34IoM42BGoMQ7VoeeZSWlh', handle: '@thesanmusique' },
      { platform: 'SoundCloud', url: 'https://soundcloud.com/rhettelliot', handle: '@rhettelliot' },
      { platform: 'Bandcamp', url: 'https://manteisrecordings.bandcamp.com', handle: 'manteisrecordings' },
    ],
    pressQuotes: [
      {
        outlet: 'Self-published',
        quote:
          'Bass is not sound. Bass is architecture. The kick drum is the heartbeat of a world that has forgotten how to dance.',
        date: '2025',
      },
    ],
    bookingContact: 'manteisrecordings@mac.com',
    pressContact: 'manteisrecordings@mac.com',
    highResPhoto: '/covers/Thesan.webp',
  },
  {
    slug: 'brindavan-gardens',
    name: 'Brindavan Gardens',
    role: 'Spiritual / Shoegaze / Dream',
    tagline: 'Devotional reverb',
    color: '#FF5500',
    shortBio:
      'Devotional reverb. Sound as spiritual practice — the sacred made audible through drones, mantras, and the resonance of contemplation.',
    bio: [
      'Brindavan Gardens is the spiritual sound practice of Manteis Recordings. Named after the gardens of Vrindavan — where devotion meets the earth — the project treats sound as a spiritual technology, not entertainment.',
      'The debut album Upekṣā (5 tracks) takes its name from the Buddhist concept of equanimity — the non-reactive awareness that holds all experience without grasping or pushing away. The music embodies this: sustained drones, devotional mantras, and the resonance of bells in empty temples.',
      'Where shoegaze wraps distortion around melody, Brindavan Gardens wraps silence around resonance. The spaces between the sounds are as intentional as the sounds themselves. This is music for the liminal hours — dawn, dusk, and the threshold of sleep.',
    ],
    location: 'Seattle, WA',
    founded: '2025',
    syncTracks: [
      {
        title: 'Upekṣā',
        release: 'Upekṣā (MR-007)',
        bpm: '60',
        duration: '10:15',
        description:
          'Sustained devotional drone with bell resonance. Deeply meditative, spacious, and patient. Ideal for spiritual sequences, nature documentary, and contemplative interludes.',
        embedUrl: 'https://open.spotify.com/embed/album/1oPtOn5okI3nLDvWWGgd3F',
      },
      {
        title: 'Mantra',
        release: 'Upekṣā (MR-007)',
        bpm: '70',
        duration: '7:38',
        description:
          'Vocal drone with harmonic overtone singing. Sacred, ancient, and otherworldly. Perfect for ritual sequences, pilgrimage, and transcendence.',
        embedUrl: 'https://open.spotify.com/embed/album/1oPtOn5okI3nLDvWWGgd3F',
      },
      {
        title: 'Equanimity',
        release: 'Upekṣā (MR-007)',
        bpm: '50',
        duration: '12:00',
        description:
          'Long-form ambient with nature field recordings. Rain, bells, and sustained tones. Ideal for meditation guidance, slow nature shots, and emotional stillness.',
        embedUrl: 'https://open.spotify.com/embed/album/1oPtOn5okI3nLDvWWGgd3F',
      },
    ],
    socialLinks: [
      { platform: 'Spotify', url: 'https://open.spotify.com/artist/1oPtOn5okI3nLDvWWGgd3F', handle: '@brindavangardens' },
      { platform: 'SoundCloud', url: 'https://soundcloud.com/rhettelliot', handle: '@rhettelliot' },
      { platform: 'Bandcamp', url: 'https://manteisrecordings.bandcamp.com', handle: 'manteisrecordings' },
    ],
    pressQuotes: [
      {
        outlet: 'Self-published',
        quote:
          'Sound as spiritual practice. The sacred made audible through drones, mantras, and the resonance of contemplation.',
        date: '2025',
      },
    ],
    bookingContact: 'manteisrecordings@mac.com',
    pressContact: 'manteisrecordings@mac.com',
    highResPhoto: '/covers/BrindavanGardens.webp',
  },
  {
    slug: 'bethany-pritchett',
    name: 'Bethany Pritchett',
    role: 'Alternative / Vocal / Synthesist',
    tagline: 'Intimate poetry',
    color: '#FF5500',
    shortBio:
      'Voice, synthesizer, and the words that hold them together. Music made in a small room in Seattle with one window and one microphone.',
    bio: [
      'Bethany Pritchett makes music in a small room in Seattle — voice, synthesizer, and the words that hold them together. No studio polish. No band. Just one person writing honestly and arranging sound around it.',
      'Her debut album, Good Morning, Good Fortune Elephant, is five songs recorded at home with one window and one microphone. The result is intimate in the literal sense — music that records the interior of a person, not the performance of one.',
      'The work exists at the intersection of alternative songwriting and ambient sensibility. The voice is central but never performative. The synthesizer is present but never decorative. Each song is a room with one person in it, and the door is open.',
    ],
    location: 'Seattle, WA',
    founded: '2025',
    syncTracks: [
      {
        title: 'Good Morning, Good Fortune Elephant',
        release: 'Good Morning, Good Fortune Elephant (MR-009)',
        bpm: '85',
        duration: '4:22',
        description:
          'Intimate vocal-led alternative with synthesizer texture. Warm, close, and personal. Ideal for character moments, quiet intimacy, and emotional narrative.',
        embedUrl: 'https://open.spotify.com/embed/album/0hpTO28w4Qjc3xA9oKKQGk',
      },
      {
        title: 'Window',
        release: 'Good Morning, Good Fortune Elephant (MR-009)',
        bpm: '75',
        duration: '3:48',
        description:
          'Minimal synth-pop with breath-room vocal. One take, one window, one microphone. Perfect for vulnerability, morning light, and honest moments.',
        embedUrl: 'https://open.spotify.com/embed/album/0hpTO28w4Qjc3xA9oKKQGk',
      },
      {
        title: 'Elephant',
        release: 'Good Morning, Good Fortune Elephant (MR-009)',
        bpm: '80',
        duration: '5:15',
        description:
          'Building alternative with layered vocal harmonies and synth drone. Grows from whisper to presence. Ideal for emotional crescendo and character transformation.',
        embedUrl: 'https://open.spotify.com/embed/album/0hpTO28w4Qjc3xA9oKKQGk',
      },
    ],
    socialLinks: [
      { platform: 'Spotify', url: 'https://open.spotify.com/artist/0hpTO28w4Qjc3xA9oKKQGk', handle: '@bethanypritchett' },
      { platform: 'SoundCloud', url: 'https://soundcloud.com/rhettelliot', handle: '@rhettelliot' },
      { platform: 'Bandcamp', url: 'https://manteisrecordings.bandcamp.com', handle: 'manteisrecordings' },
    ],
    pressQuotes: [
      {
        outlet: 'Self-published',
        quote:
          'No studio polish. No band. Just one person writing honestly and arranging sound around it.',
        date: '2025',
      },
    ],
    bookingContact: 'manteisrecordings@mac.com',
    pressContact: 'manteisrecordings@mac.com',
    highResPhoto: '/covers/GMGFE.webp',
  },
]

export function getEPKBySlug(slug: string): ArtistEPK | undefined {
  return artistEPKs.find((a) => a.slug === slug)
}