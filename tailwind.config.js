/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blueish': 'rgb(87, 153, 239)'
      },
      height: {
        'img-height': '686px'
      }
    },
  },
  plugins: [],
}
