/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: "var(--color-primary-purple, #6B3FA0)",
          deep: "var(--color-deep-purple, #3F1F6B)",
          orange: "var(--color-accent-orange, #F28C28)",
          yellow: "var(--color-accent-yellow, #F6B93B)",
          lavender: "var(--color-soft-lavender, #F5F0FA)",
          dark: "var(--color-text-dark, #2A1744)",
          white: "var(--color-white, #FFFFFF)",
          // Direct hex aliases
          'purple-raw': '#6B3FA0',
          'deep-raw': '#3F1F6B',
          'orange-raw': '#F28C28',
          'yellow-raw': '#F6B93B',
          'lavender-raw': '#F5F0FA',
          'dark-raw': '#2A1744',
        }
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans Variable"', 'sans-serif'],
        body: ['"DM Sans Variable"', 'sans-serif'],
      },
      borderRadius: {
        'default': '16px',
        'theme': '16px',
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        'soft': '0 10px 30px -10px rgba(107, 63, 160, 0.08), 0 4px 6px -2px rgba(42, 23, 68, 0.04)',
        'soft-lg': '0 20px 40px -15px rgba(63, 31, 107, 0.12), 0 8px 16px -4px rgba(42, 23, 68, 0.06)',
        'glow-orange': '0 10px 25px -5px rgba(242, 140, 40, 0.4)',
        'glow-purple': '0 10px 25px -5px rgba(107, 63, 160, 0.35)',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        floatPixel: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-6px) scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(242, 140, 40, 0.45)' },
          '70%': { transform: 'scale(1)', boxShadow: '0 0 0 12px rgba(242, 140, 40, 0)' },
          '100%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(242, 140, 40, 0)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-4px)' },
          '40%, 80%': { transform: 'translateX(4px)' },
        },
        pop: {
          '0%': { transform: 'scale(0.85)' },
          '70%': { transform: 'scale(1.12)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'float-pixel': 'floatPixel 3s ease-in-out infinite',
        'float': 'float 3.5s ease-in-out infinite',
        'float-slow': 'float 5s ease-in-out infinite',
        'shimmer': 'shimmer 2.2s infinite',
        'marquee': 'marquee 25s linear infinite',
        'marquee-slow': 'marquee 40s linear infinite',
        'pulse-ring': 'pulseRing 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'shake': 'shake 0.4s ease-in-out',
        'pop': 'pop 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      }
    },
  },
  plugins: [],
}
