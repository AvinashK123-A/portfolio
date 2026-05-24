import type { Config } from 'tailwindcss';
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/sections/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: { 50:'#f0f4ff',100:'#e0e9ff',200:'#c7d7ff',300:'#a4bbff',400:'#7b96ff',500:'#5667ff',600:'#3a42f5',700:'#2e33e1',800:'#272cb5',900:'#252c8f',950:'#161854' },
        accent:  { 50:'#fef3ff',100:'#fce4ff',200:'#f9c9fe',300:'#f59dfc',400:'#ec5ef8',500:'#d926ec',600:'#b81eca',700:'#9417a5',800:'#7a1486',900:'#671470',950:'#430048' },
        dark:    { 50:'#f6f6f9',100:'#ecedf2',200:'#d5d7e2',300:'#b1b5c9',400:'#868cac',500:'#676e92',600:'#535878',700:'#454962',800:'#3c3f53',900:'#353747',950:'#0a0b14' },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'gradient': 'gradient 8s ease infinite',
      },
      keyframes: {
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-20px)' } },
        gradient: { '0%, 100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(86, 103, 255, 0.3)',
        'glow': '0 0 20px rgba(86, 103, 255, 0.4)',
        'glow-lg': '0 0 40px rgba(86, 103, 255, 0.5)',
      },
    },
  },
  plugins: [],
};
export default config;
