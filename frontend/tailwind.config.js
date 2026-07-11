/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#150C2E",
        plum: "#1F1240",
        plum2: "#2A1854",
        coral: "#FF6F4F",
        coral2: "#FF9166",
        mint: "#6EE7B7",
        mint2: "#3FCF9E",
        lavender: "#F5F1FF",
        muted: "#9C8FC4",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-16px) rotate(3deg)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-24px) rotate(-4deg)" },
        },
        blob: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-25px, 25px) scale(0.95)" },
        },
        drawLine: {
          "0%": { strokeDashoffset: 1400 },
          "100%": { strokeDashoffset: 0 },
        },
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(24px)" },
          "100%": { opacity: 1, transform: "translateY(0px)" },
        },
        pulseDot: {
          "0%, 100%": { transform: "scale(1)", opacity: 1 },
          "50%": { transform: "scale(1.6)", opacity: 0.5 },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "floatSlow 9s ease-in-out infinite",
        "float-slower": "floatSlow 12s ease-in-out infinite",
        blob: "blob 14s ease-in-out infinite",
        "draw-line": "drawLine 2.8s cubic-bezier(0.65,0,0.35,1) forwards",
        "fade-in-up": "fadeInUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards",
        "pulse-dot": "pulseDot 2.4s ease-in-out infinite",
        marquee: "marquee 22s linear infinite",
      },
    },
  },
  plugins: [],
};
