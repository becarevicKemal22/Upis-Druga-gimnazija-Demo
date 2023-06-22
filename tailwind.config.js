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
        },
        fontSize: {
            'smaller': "0.8rem",
        }
    },
  },
  plugins: [require("@tailwindcss/forms")],
}

