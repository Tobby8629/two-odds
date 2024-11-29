/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
       pry: "#003C6F",
       sec: "FFC107",
       "pry-fade": '#003c6f9c',
       sec: "#FFC107"
      }
    },
  },
  plugins: [],
}
