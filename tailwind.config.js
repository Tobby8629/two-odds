/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
       pry: "#003C6F",
       pryf: "#123456",
       "pry-light": "#1F5079",
       "pry-fade": '#03345dcc',
       "cus-purple": "#ABB2FA",
       sec: "#FFC107",
       'light-blue': "#E3F2FD",

       "p2p-tab": "#012746",
        "p2p-active": "#1c5789",

      },
      
      fontFamily: {
        sansitaBoldItalic: ["SansitaOneBoldItalic"],
      }
    },
  },
  plugins: [],
}
