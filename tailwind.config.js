const colors = require('tailwindcss/colors')
delete colors['lightBlue']

module.exports = {
  purge: [
    '/src/pages/**/*.{js,ts,jsx,tsx}',
    '/src/components/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'media',
  important: true,
  theme: {
    colors: {
      ...colors,
      gray: colors.gray,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
