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
          500: '#FF9933', // Primary Saffron
          600: '#ea580c',
        },
        indiagreen: {
          500: '#138808', // Primary Green
        },
        navyblue: {
          500: '#000080', // Ashoka Chakra Blue
          600: '#1e1b4b',
        }
      },
    },
  },
  plugins: [],
}
