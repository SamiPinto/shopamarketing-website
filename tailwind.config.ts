import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    // Landing pages ship their own CSS; keep their class names out of the main bundle.
    "!./components/landing/**",
    "!./app/(lp-*)/**",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#663dff",
        "primary-dark": "#4f2ecc",
        "primary-light": "#8b6dff",
        secondary: "#aa00ff",
        "secondary-dark": "#8800cc",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
      animation: {
        "marquee": "marquee 30s linear infinite",
        "marquee-reverse": "marquee-reverse 30s linear infinite",
        "fade-up": "fade-up 0.6s ease forwards",
        "counter": "counter 2s ease-out forwards",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #663dff 0%, #aa00ff 100%)",
        "gradient-primary-diagonal": "linear-gradient(45deg, #663dff 0%, #aa00ff 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
