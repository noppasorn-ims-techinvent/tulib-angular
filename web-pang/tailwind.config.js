/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily:{
        kanit: ['Kanit', 'sans-serif'],
      },
      colors: {
        background: '#F3FAFF',
      },
    },
  },
  plugins: [],
}
