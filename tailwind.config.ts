import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        techGreen: "#00ffa1",
      },
    },
  },
  safelist: [
    "bg-cover",
    "bg-clip-text",
    "text-transparent",
    "animate-glitch",
  ],
  plugins: [],
} satisfies Config;
