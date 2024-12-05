/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'bebas': ['Bebas Neue', 'sans-serif'],
      },
      keyframes: {
        fadeFromWhite: {
          '0%': { backgroundColor: 'white', opacity: '1' },
          '100%': { backgroundColor: 'none', opacity: '0.3' }
        },
        fadeIn : {
          '0%': { opacity: '0' },
          '100%': {opacity: '1'}
        }
      },
      animation: {
        fadeFromWhite: 'fadeFromWhite 0.25s ease-in-out forwards',
        fadeIn : 'fadeIn 0.25s ease-in-out forwards'
      }
    }
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["none"],
  },
}
