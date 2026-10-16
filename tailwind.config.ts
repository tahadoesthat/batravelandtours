import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          emerald: '#264E41',      // Primary CTA / Active
          pine: '#1D3D33',         // Primary Hover
          charcoal: '#1C2321',     // Headings / Logo
          slate: '#4A5568',        // Body Copy / Metadata / Labels
          stone: '#E2E8F0',        // 1px Borders & Dividers
          alabaster: '#FAF9F6',    // Viewport Background Canvas
          white: '#FFFFFF',        // Pure White Cards/Sidebar/Modals
          crimson: '#DC2626',      // Destructive Accent
          amber: '#D97706',        // Pending Accent
          sage: '#4a7569',
          accent: '#3b6e5f',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-plus-jakarta)', 'system-ui', 'sans-serif'],
        script: ['var(--font-caveat)', 'cursive'],
      },
      borderRadius: {
        '2xl': '16px',
        'xl': '12px',
        'input': '10px',
      },
      boxShadow: {
        subtle: '0 8px 24px -4px rgba(28, 35, 33, 0.04), 0 2px 6px -1px rgba(28, 35, 33, 0.02)',
        elevated: '0 16px 32px -8px rgba(28, 35, 33, 0.08)',
      },
    },
  },
  plugins: [],
};

export default config;
