module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // This tells Tailwind to scan your src folder for class names
  ],
  theme: {
    extend: {
      fontFamily: {
        dosis: ['Dosis', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
