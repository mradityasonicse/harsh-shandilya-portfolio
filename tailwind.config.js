export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ink-black': '#0b0906',
        'charcoal': '#171310',
        'parchment': '#d8c49a',
        'parchment-dark': '#b39b6d',
        'blood-red': '#a01d12',
        'ember': '#ff7a1a',
        'gold': '#c9a227',
        'bone': '#e8dcc0',
        'sea': '#0a1a1f',
      },
      fontFamily: {
        display: ['"Pirata One"', 'cursive'],
        subheading: ['Cinzel', 'serif'],
        body: ['"IM Fell English"', 'serif'],
      },
      boxShadow: {
        'burnt': 'inset 0 0 60px rgba(11, 9, 6, 0.9), 0 0 30px rgba(255, 122, 26, 0.15)',
        'wax': '0 4px 14px rgba(160, 29, 18, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.2)',
        'gold-glow': '0 0 25px rgba(201, 162, 39, 0.4)',
        'ember-glow': '0 0 35px rgba(255, 122, 26, 0.35)',
      },
      animation: {
        'sway': 'sway 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ember-float': 'emberFloat 4s ease-in infinite',
        'shimmer': 'shimmer 2.5s infinite',
      },
      keyframes: {
        sway: {
          '0%, 100%': { transform: 'rotate(-0.8deg) translateY(0px)' },
          '50%': { transform: 'rotate(0.8deg) translateY(-4px)' },
        },
        emberFloat: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '0.8' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateY(-100px) scale(0.2)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
