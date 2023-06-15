/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/view/**/*.{html,js,handlebars}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ]
}

