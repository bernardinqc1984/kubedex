/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0f',
        surface: '#12121a',
        border: '#1e1e2e',
        accent: '#00d4ff',
        violet: '#7c3aed',
        success: '#22c55e',
        danger: '#ef4444',
        warning: '#f59e0b',
        text: '#e2e8f0',
        muted: '#64748b',
      },
      fontFamily: {
        ui: ['Space Grotesk', 'system-ui', 'sans-serif'],
        code: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
