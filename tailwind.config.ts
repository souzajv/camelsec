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
      animation: {
        'moving-border': 'moving-border 2.5s linear infinite',
      },
      keyframes: {
        'moving-border': {
          '0%': { boxShadow: '0 0 10px #00ffa1, 0 0 20px #00ffa1 inset' },
          '25%': { boxShadow: '5px 0 15px #00ffa1, -5px 0 15px #00ffa1 inset' },
          '50%': { boxShadow: '0 5px 15px #00ffa1, 0 -5px 15px #00ffa1 inset' },
          '75%': { boxShadow: '-5px 0 15px #00ffa1, 5px 0 15px #00ffa1 inset' },
          '100%': { boxShadow: '0 0 10px #00ffa1, 0 0 20px #00ffa1 inset' },
        },
      },
    },
  },
  safelist: [
    "bg-cover",
    "bg-clip-text",
    "text-transparent",
    "animate-gradient"
  ],
  plugins: [],
} satisfies Config;
