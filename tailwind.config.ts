import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f4f9ff",
          100: "#e0efff",
          200: "#c1defe",
          300: "#92c6fe",
          400: "#5aa2fb",
          500: "#2f7cf6",
          600: "#1e63eb",
          700: "#1a4cc8",
          800: "#1b409d",
          900: "#1a367c"
        }
      }
    }
  },
  plugins: []
};

export default config;
