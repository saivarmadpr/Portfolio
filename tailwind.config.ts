import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#F5F4EB",
        charcoal: "#1A1A1A",
        "signal-red": "#FF3B30",
        "terminal-green": "#39FF14",
        "phosphor-amber": "#FFB000",
      },
      fontFamily: {
        mono: [
          "SF Mono",
          "Monaco",
          "Menlo",
          "Fira Code",
          "monospace",
        ],
      },
      animation: {
        blink: "blink 1s step-end infinite",
        scanline: "scanline 8s linear infinite",
        glitch: "glitch 0.3s ease-in-out",
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        flicker: "flicker 0.15s infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        glitch: {
          "0%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
          "100%": { transform: "translate(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        flicker: {
          "0%": { opacity: "0.97" },
          "5%": { opacity: "0.9" },
          "10%": { opacity: "0.98" },
          "15%": { opacity: "0.92" },
          "20%": { opacity: "1" },
          "100%": { opacity: "1" },
        },
      },
      textShadow: {
        heavy: "2px 2px 0px rgba(0,0,0,0.25)",
        glow: "0 0 10px rgba(57,255,20,0.5)",
      },
    },
  },
  plugins: [],
};
export default config;
