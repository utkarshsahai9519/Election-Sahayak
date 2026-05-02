/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#FF9933',
          600: '#ea580c',
        },
        indiagreen: {
          400: '#28a745',
          500: '#138808',
          600: '#0e6606',
        },
        navyblue: {
          400: '#3333b3',
          500: '#000080',
          600: '#000066',
        },
        dark: '#0f172a'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
