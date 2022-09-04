module.exports = {
  purge: [],
  darkMode: 'media',
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
  content: [
    './client/app/**/*.{html,ts}'
  ]
}
