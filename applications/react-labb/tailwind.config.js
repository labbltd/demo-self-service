/** @type {import('tailwindcss').Config} */
const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const withMT = require("@material-tailwind/react/utils/withMT");
const { join } = require('path');

module.exports = withMT({
  content: [
    join(__dirname, "./index.html"), 
    join(__dirname, "./src/**/*.{js,ts,jsx,tsx}"),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Inter", "Arial"],
    }
  },
  plugins: [],
});
