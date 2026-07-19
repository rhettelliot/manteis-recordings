import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        /* The Void — true black, depth via surface lightness */
        void: {
          DEFAULT: '#000000',
          raised: '#0C0C0C',
          elevated: '#141414',
          float: '#1C1C1C',
          input: '#0F0F0F',
          soft: '#0C0C0C',
          warm: '#0D0B08',
        },
        /* The Signal — Neon Pink, the label's voice (Music: #FF007F) */
        accent: {
          DEFAULT: '#FF007F',
          dim: 'rgba(255, 0, 127, 0.10)',
          glow: 'rgba(255, 0, 127, 0.25)',
          border: 'rgba(255, 0, 127, 0.35)',
        },
        /* Typography & edges */
        light: '#FFFFFF',
        'light-dim': '#999999',
        'light-muted': '#6B6B6B',
        edge: {
          ghost: 'rgba(255,255,255,0.04)',
          faint: 'rgba(255,255,255,0.08)',
          subtle: 'rgba(255,255,255,0.12)',
          clear: 'rgba(255,255,255,0.22)',
          bright: 'rgba(255,255,255,0.45)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Space Grotesk', 'sans-serif'],
        body: ['var(--font-body)', 'Inter', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
      },
      letterSpacing: {
        ultra: '0.3em',
        wide: '0.15em',
      },
      transitionTimingFunction: {
        cinematic: 'cubic-bezier(0.45, 0.05, 0.55, 0.95)',
        enter: 'cubic-bezier(0.00, 0.00, 0.25, 1.00)',
        exit: 'cubic-bezier(0.75, 0.00, 1.00, 1.00)',
        drift: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
export default config