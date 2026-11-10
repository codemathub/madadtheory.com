import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "var(--brand-primary)",
          secondary: "var(--brand-secondary)",
          soft: "var(--brand-soft)",
          darkPrimary: "#A66BE6",
          darkSecondary: "#C39AEF",
          lightPrimary: "#6414B5",
          lightSecondary: "#8B55C7",
          cyan: "#00F5FF",
          cyanGlow: "rgba(0, 245, 255, 0.45)",
        },
        surface: {
          DEFAULT: "var(--surface)",
          subtle: "var(--surface-subtle)",
          card: "var(--surface-card)",
          border: "var(--border)",
        },
        content: {
          DEFAULT: "var(--text-main)",
          muted: "var(--text-muted)",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Manrope", "sans-serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 25px rgba(100, 20, 181, 0.25)",
        cyanGlow: "0 0 30px rgba(0, 245, 255, 0.4)",
        card: "0 18px 55px rgba(53, 24, 80, 0.08)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        pulseGlow: "pulseGlow 3s ease-in-out infinite",
        orbit: "orbit 24s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

