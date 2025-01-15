/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
       pry: "#003C6F",
       "pry-fade": '#03345dcc',
       sec: "#FFC107"
      }
    },
  },
  plugins: [],
}
