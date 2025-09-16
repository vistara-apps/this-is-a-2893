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
      },
    },
  },
  plugins: [],
}