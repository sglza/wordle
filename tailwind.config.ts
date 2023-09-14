import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: { 'sans': ['Roboto', 'sans-serif'] },
    extend: {
      keyframes: {
        tururu: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        }
      },
      animation: {
        tururu: 'tururu 500ms ease forwards',
      },
    },
  },
  plugins: [],
} satisfies Config

