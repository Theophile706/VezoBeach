/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: '#FFCB3D',
          indigo: '#292059',
        },
        gold: {
          50: '#FFCB3D',
          100: '#FFCB3D',
          200: '#FFCB3D',
          300: '#FFCB3D',
          400: '#FFCB3D',
          500: '#FFCB3D',
          600: '#FFCB3D',
          700: '#FFCB3D',
          800: '#FFCB3D',
          900: '#FFCB3D',
        },
        cream: '#F7F6FA',
        charcoal: '#292059',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', '-apple-system', 'sans-serif'],
        nav: ['"Fira Sans Condensed"', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.3em',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #FFCB3D 0%, #FFCB3D 100%)',
      },
      boxShadow: {
        'soft-lg': '0 20px 60px -10px rgba(0,0,0,0.25)',
        card: '0 8px 30px rgba(0,0,0,0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(30px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
