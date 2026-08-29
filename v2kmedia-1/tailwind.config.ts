import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "var(--color-charcoal)",
        offwhite: "var(--color-offwhite)",
        accent: "var(--color-accent)",
        "accent-hover": "var(--color-accent-hover)",
        muted: "var(--color-muted)",
        surface: "var(--color-surface)",
        "bg-dark": "var(--color-bg-dark)",
      },
      fontFamily: {
        inter: ["var(--font-inter)"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
