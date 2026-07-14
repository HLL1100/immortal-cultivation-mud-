/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cultivation': {
          'dark': '#1a0f2e',
          'purple': '#2D1B4E',
          'light': '#4a3270',
          'gold': '#FFD700',
          'gold-dark': '#B8860B',
          'red': '#DC143C',
          'green': '#228B22',
          'blue': '#1E90FF',
        }
      },
      fontFamily: {
        'serif': ['Noto Serif SC', 'SimSun', 'serif'],
        'mono': ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      animation: {
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
        'shake': 'shake 0.5s ease-in-out',
        'lightning': 'lightning 0.3s ease-in-out',
        'float-up': 'float-up 1s ease-out forwards',
      },
      keyframes: {
        'pulse-gold': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
        'lightning': {
          '0%, 100%': { opacity: '0' },
          '50%': { opacity: '1' },
        },
        'float-up': {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-30px)' },
        },
      },
    },
  },
  plugins: [],
}