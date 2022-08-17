/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    colors: {
      'primary-100': '#1c2a37',
      'primary-200': '#141e27',
      'secondary-100': '#0BE9FD',
      'secondary-200': '#2196f3',
      'text-100': '#ffffff',
      'text-200': '#d8d9d6',
    },
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        passion: ['Passion One', 'cursive'],
        catamaran: ['Catamaran', 'sans-serif']
      },
      gridTemplateColumns: {
        '35/65': '35% 65%',
        '7/88/5': '10% 80% 7%',
      }
    }
  },
  plugins: []
}
