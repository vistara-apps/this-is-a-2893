/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg': 'hsl(220, 10%, 95%)',
        'accent': 'hsl(50, 90%, 50%)',
        'primary': 'hsl(200, 80%, 40%)',
        'surface': 'hsl(220, 10%, 100%)',
        'text-primary': 'hsl(220, 10%, 20%)',
        'text-secondary': 'hsl(220, 10%, 40%)',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
      },
      boxShadow: {
        'card': '0 4px 12px hsla(220, 10%, 0%, 0.08)',
        'card-hover': '0 8px 25px hsla(220, 10%, 0%, 0.15)',
        'button': '0 2px 4px hsla(220, 10%, 0%, 0.1)',
        'button-hover': '0 4px 12px hsla(220, 10%, 0%, 0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}