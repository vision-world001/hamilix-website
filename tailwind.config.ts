import type { Config } from 'tailwindcss'

/**
 * Hamilix design tokens
 * Lime = intelligence (AI) · Gold = trust (blockchain) — both pulled from the logo.
 * Token names (bg, surface, foreground, muted, accent, border) are kept stable so
 * every component inherits the brand automatically.
 */
const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#06070A',
        surface: '#0D0F13',
        raised: '#13161C',
        foreground: '#F4F6F0',
        muted: '#97A0AC',
        subtle: '#5D6573',
        accent: '#B6F23C',
        gold: '#F2C14E',
        border: '#1D2129',
        'border-strong': '#2A303B',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        site: '78rem',
      },
      boxShadow: {
        'accent-glow': '0 0 32px rgba(182, 242, 60, 0.28)',
        'accent-glow-sm': '0 0 14px rgba(182, 242, 60, 0.18)',
        'gold-glow': '0 0 32px rgba(242, 193, 78, 0.25)',
        card: '0 1px 0 rgba(255,255,255,0.04) inset, 0 24px 60px -30px rgba(0,0,0,0.8)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(100deg, #B6F23C 0%, #F2C14E 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        marquee: 'marquee 40s linear infinite',
        'marquee-reverse': 'marquee-reverse 40s linear infinite',
        'spin-slow': 'spin 40s linear infinite',
        'spin-slower': 'spin 70s linear infinite reverse',
        float: 'float 6s ease-in-out infinite',
        pulse: 'pulse 2.4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
