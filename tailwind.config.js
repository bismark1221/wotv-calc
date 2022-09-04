/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './client/index.html',
    './client/app/**/*.html'
  ],
  plugins: [
    require('@tailwindcss/forms')
  ],
}



