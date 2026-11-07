const tokens = require("./src/theme/tokens.json");
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      borderRadius: Object.fromEntries(
        Object.entries(tokens.radius).map(([key, value]) => [
          key,
          `${value}px`,
        ]),
      ),
      spacing: {
        screen: `${tokens.spacing.screen}px`,
        section: `${tokens.spacing.section}px`,
      },
      colors: {
        nebula: require("./src/theme/colors.json"),
      },
      fontFamily: {
        body: [tokens.typography.body],
        "manrope-bold": [tokens.typography.semibold],
        heavy: [tokens.typography.heavy],
        display: [tokens.typography.display],
      },
    },
  },
  plugins: [],
};
