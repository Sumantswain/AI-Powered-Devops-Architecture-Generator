/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          900: '#0c1929',
        },
        accent: {
          400: '#4ade80',
          500: '#22c55e',
        },
        glass: {
          DEFAULT: 'rgba(15, 23, 42, 0.6)',
          light: 'rgba(255, 255, 255, 0.06)',
          border: 'rgba(148, 163, 184, 0.08)',
        },
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.24)',
        'glow-sm': '0 0 20px rgba(59, 130, 246, 0.15)',
        'glow': '0 0 40px rgba(59, 130, 246, 0.2)',
        'glow-lg': '0 0 60px rgba(59, 130, 246, 0.25)',
        'glow-accent': '0 0 30px rgba(34, 197, 94, 0.2)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.2), 0 0 1px rgba(255,255,255,0.05)',
        'card-hover': '0 8px 40px rgba(0, 0, 0, 0.3), 0 0 40px rgba(59, 130, 246, 0.08)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mesh': 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)' },
          '50%': { opacity: '0.9', boxShadow: '0 0 30px rgba(59, 130, 246, 0.35)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
