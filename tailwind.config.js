/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: 'media',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-nunito)', 'ui-sans-serif', 'system-ui'],
        rounded: ['var(--font-fredoka)', 'ui-rounded', 'system-ui'],
        hand: ['var(--font-patrick)', 'cursive'],
        mono: ['var(--font-quicksand)', 'ui-monospace', 'SFMono-Regular'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [],
};

export default config;
