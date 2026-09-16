/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0c10",
        foreground: "#f0f2f5",
        card: {
          DEFAULT: "#121620",
          foreground: "#f0f2f5",
        },
        primary: {
          DEFAULT: "#d4af37",
          foreground: "#0a0c10",
        },
        secondary: {
          DEFAULT: "#181d2a",
          foreground: "#e2e8f0",
        },
        muted: {
          DEFAULT: "#1a202c",
          foreground: "#94a3b8",
        },
        accent: {
          DEFAULT: "#e5c158",
          foreground: "#0a0c10",
        },
        border: "rgba(212, 175, 55, 0.15)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Playfair Display", "serif"],
      },
      boxShadow: {
        gold: "0 4px 25px -5px rgba(212, 175, 55, 0.35)",
        elegant: "0 10px 30px -10px rgba(0, 0, 0, 0.7), 0 0 15px -3px rgba(212, 175, 55, 0.08)",
        glow: "0 0 40px -5px rgba(212, 175, 55, 0.25)",
      },
    },
  },
  plugins: [],
};
