module.exports = {
  mode: 'jit',
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#003B6D",
        "primary-variant": "#00649F",
        "optoin2-primary-variant": "#008ECF",
        secondary: "#88CBFD",
        "font-disabled": "#BDBDBD",
        "font-title": "#666666",
        background: "#F3FAFF",
        accent: "#7FDBFF",
        black: "#000000",
        error: "#B20000",
        gray: {
          100: "#F8F8F8",
          200: "#EAEAEA",
          300: "#D2D2D2",
          400: "#A6A6A6",
          500: "#7F7F7F",
          600: "#525252",
          700: "#393939",
          800: "#262626",
          900: "#171717",
        },
        red: "#B20000",
      },
    },
  },
  variants: {},

  plugins: [],
};
