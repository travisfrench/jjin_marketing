import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050607",
        foreground: "#f7f4ee",
        muted: "#b5afa5",
        surface: "#0d1117",
        line: "rgba(255,255,255,0.14)",
        warm: "#e2a35f",
      },
      boxShadow: {
        "panel-soft": "0 22px 55px rgba(0, 0, 0, 0.45)",
        "hero-glow": "0 0 160px rgba(226, 163, 95, 0.18)",
      },
      backgroundImage: {
        "noise-layer":
          "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.04), transparent 45%), radial-gradient(circle at 80% 10%, rgba(255,173,102,0.08), transparent 35%), radial-gradient(circle at 50% 100%, rgba(255,255,255,0.06), transparent 40%)",
      },
      fontFamily: {
        heading: ["var(--font-sora)", "sans-serif"],
        body: ["var(--font-source)", "sans-serif"],
        korean: ["var(--font-noto-kr)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
