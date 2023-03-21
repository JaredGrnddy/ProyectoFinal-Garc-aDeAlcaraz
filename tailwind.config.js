/** @type {import('tailwindcss').Config} */


module.exports = {
  content: ["./index.html", "./src/**/*.css",  "./src/**/*.{vue,js,ts,jsx,tsx,html}"],
  theme: {
    extend: {
      colors: {
        "color-primary": "#3626A7",
        "color-secondary": "#FFE000",
        "color-tertiary": "#242423",
        "color-quaternary": "#EEEEEE",
      },
      fontFamily: {
        "primary": ['Red Hat Display', 'sans-serif'],
      },
    },
  },
  plugins: [],
  variants: {},
}

