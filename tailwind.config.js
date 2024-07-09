/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/index.html',
    './src/app/**/*.html'
  ],
  plugins: [
    require('@tailwindcss/forms')
  ],
}



