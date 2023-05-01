/** @type {import('tailwindcss').Config} */
module.exports = {
  // darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          bg: '#fff',
        },
        dark: {
          bg: '#1a202c',
        },
      },
    },
  },
  plugins: [],
}