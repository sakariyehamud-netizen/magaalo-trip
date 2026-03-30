/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4fc',
          100: '#e3eaf9',
          200: '#cdddfe',
          300: '#adc1f8',
          400: '#869dee',
          500: '#647de2',
          600: '#485bd3',
          700: '#3946bf',
          800: '#323ca0',
          900: '#0B3D91', // primary navy
          950: '#1d2258',
        },
        teal: {
          50: '#f1fafa',
          100: '#daf2f2',
          200: '#b8e4e6',
          300: '#8acfd3',
          400: '#54b4bb',
          500: '#389a9f',
          600: '#2d7c82',
          700: '#286469',
          800: '#255155',
          900: '#17A2A9', // primary teal
          950: '#123438',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
