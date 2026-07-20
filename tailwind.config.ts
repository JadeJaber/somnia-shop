import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        night: {
          950: "#0b1020",
          900: "#111830",
          800: "#1b2444",
        },
        moon: "#f5c451",
      },
    },
  },
  plugins: [],
};
export default config;
