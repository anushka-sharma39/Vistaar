/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Plus Jakarta Sans", "Manrope", "sans-serif"],
        grotesk: ["Space Grotesk", "Plus Jakarta Sans", "sans-serif"],
        sans: ["Inter", "sans-serif"],
        serif: ["Newsreader", "Georgia", "serif"],
        hand: ["Caveat", "Segoe Print", "cursive"],
      },
      colors: {
        // Midnight neutrals
        ink: { 900: "#0B1020", 800: "#11182D", 700: "#18213A", 600: "#3B4363", 500: "#5B6486", 400: "#8189A8", 300: "#A9B0C9", 200: "#D3D8E8", 100: "#E6EAF4", 50: "#F1F4FA" },
        // "indigo" = Electric Violet (primary accent)
        indigo: { 950: "#24104F", 900: "#4C1D95", 800: "#5B21B6", 700: "#6D28D9", 600: "#7C3AED", 500: "#8B5CF6", 400: "#A78BFA", 300: "#C4B5FD", 200: "#DDD6FE", 100: "#EDE9FE", 50: "#F5F3FF" },
        // "teal" = Electric Cyan / Aqua (secondary accent)
        teal: { 700: "#0E7490", 600: "#06B6D4", 500: "#22D3EE", 400: "#2DD4BF", 300: "#67E8F9", 200: "#A5F3FC", 100: "#CFFAFE", 50: "#ECFEFF" },
        // "violet" = Hot Pink highlight (used sparingly)
        violet: { 700: "#BE185D", 600: "#DB2777", 500: "#EC4899", 400: "#F472B6", 300: "#F9A8D4", 200: "#FBCFE8", 100: "#FCE7F3", 50: "#FDF2F8" },
        canvas: "#F8FAFC",
        surface: "#FFFFFF",
      },
      boxShadow: {
        soft: "0 8px 30px rgba(15,23,42,0.08)",
        card: "0 1px 2px rgba(11,16,32,0.04), 0 8px 24px -12px rgba(11,16,32,0.10)",
        lift: "0 20px 40px -18px rgba(124,58,237,0.40)",
        glow: "0 10px 28px -8px rgba(124,58,237,0.55)",
      },
      backgroundImage: {
        "grad-primary": "linear-gradient(135deg, #7C3AED 0%, #22D3EE 100%)",
        "grad-violet": "linear-gradient(135deg, #8B5CF6 0%, #F472B6 100%)",
        "grad-teal": "linear-gradient(135deg, #2DD4BF 0%, #22D3EE 100%)",
        "grad-midnight": "linear-gradient(135deg, #0B1020 0%, #24104F 100%)",
        "grad-radiant": "radial-gradient(120% 120% at 100% 0%, #F5F3FF 0%, #EEF2FF 45%, #F8FAFC 100%)",
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: "translateY(10px)" }, to: { opacity: 1, transform: "translateY(0)" } },
        toastIn: { from: { opacity: 0, transform: "translateY(-6px) scale(.98)" }, to: { opacity: 1, transform: "translateY(0) scale(1)" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        blob: { "0%,100%": { transform: "translate(0,0) scale(1)" }, "50%": { transform: "translate(24px,-18px) scale(1.08)" } },
        shimmer: { from: { backgroundPosition: "200% 0" }, to: { backgroundPosition: "-200% 0" } },
      },
      animation: {
        fadeIn: "fadeIn .3s ease-out",
        slideUp: "slideUp .35s ease-out",
        toastIn: "toastIn .25s ease-out",
        float: "float 6s ease-in-out infinite",
        blob: "blob 14s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
