/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#050a14',
          secondary: '#0a1628',
          tertiary: '#0d1f3c',
          card: '#0c1a2e',
        },
        aurora: {
          cyan:   '#00ffcc',
          blue:   '#00b4ff',
          violet: '#7c3aed',
          teal:   '#0e7490',
          'cyan-dim':   '#00ffcc26',
          'blue-dim':   '#00b4ff1a',
          'violet-dim': '#7c3aed1a',
        },
        text: {
          primary: '#e2f4ff',
          muted:   '#7ba8c8',
          subtle:  '#4a7a9b',
        },
        border: {
          DEFAULT: '#1a3a5c',
          glow:    '#00ffcc26',
        },
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body:    ['Space Grotesk', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'aurora-drift': 'auroradrift 20s ease-in-out infinite alternate',
        'fade-up':      'fadeup 0.7s ease forwards',
        'pulse-dot':    'pulsedot 2s ease-in-out infinite',
        'float':        'float 6s ease-in-out infinite',
      },
      keyframes: {
        auroradrift: {
          '0%':   { transform: 'translate(0,0) scale(1)' },
          '100%': { transform: 'translate(40px,30px) scale(1.1)' },
        },
        fadeup: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        pulsedot: {
          '0%,100%': { opacity: '1' },
          '50%':     { opacity: '0.3' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-12px)' },
        },
      },
      backdropBlur: { xs: '2px' },
      borderRadius: { '2xl': '1rem', '3xl': '1.5rem' },
    },
  },
  plugins: [],
}
