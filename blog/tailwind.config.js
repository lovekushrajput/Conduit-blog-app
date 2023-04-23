/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#5CB85C',
          200: '#449D44'
        },
        secondary: {
          100: '#B2B2B2',
          200: '#666666',
          300: '#DDDDDD'
        }
      },
      backgroundColor: {
        primary: {
          100: '#5CB85C',
          200: '#449D44'
        }
        ,
        secondary: {
          100: '#F3F3F3',
          200: '#818A91',
          300: '#687077'
        }
      }
    },
  },
  plugins: [],
}

