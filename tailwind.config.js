/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      height: {
        spacing: {
          '20vh': '20vh'
        }
      }
    },
  },
  plugins: [],
}

