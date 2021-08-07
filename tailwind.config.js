const colors = require('tailwindcss/colors')
delete colors['lightBlue']

module.exports = {
  purge: [
    './src/**/*.{js,jsx,ts,tsx,vue}',
    './public/**/*.html',
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
