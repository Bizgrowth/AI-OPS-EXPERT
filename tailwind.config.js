/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-ai': 'linear-gradient(135deg, #667eea, #764ba2)',
        'gradient-data': 'linear-gradient(135deg, #f093fb, #f5576c)',
        'gradient-integration': 'linear-gradient(135deg, #4facfe, #00f2fe)',
        'gradient-ux': 'linear-gradient(135deg, #43e97b, #38f9d7)',
        'gradient-cloud': 'linear-gradient(135deg, #fa709a, #fee140)',
        'gradient-business': 'linear-gradient(135deg, #a8edea, #fed6e3)',
      }
    },
  },
  plugins: [],
};
