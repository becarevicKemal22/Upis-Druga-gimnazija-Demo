/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
        fontFamily: {
            'open-sans': ['"Open Sans"'],
        }
    },
  },
  plugins: [require("@tailwindcss/forms")],
}

