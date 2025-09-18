/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      container: { center: true, padding: '1rem' }
    },
  },
  plugins: [
    // 需要時可加入更多外掛，如：
    // require('@tailwindcss/typography')
  ],
}
