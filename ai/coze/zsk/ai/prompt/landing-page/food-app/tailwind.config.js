/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B35',
          50: '#FFF4EF',
          100: '#FFE8DC',
          200: '#FFCEB5',
          300: '#FFB38D',
          400: '#FF9966',
          500: '#FF6B35',
          600: '#E55A2B',
          700: '#CC4A22',
          800: '#B23B18',
          900: '#992D0F',
        },
        dark: '#2D2926',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
