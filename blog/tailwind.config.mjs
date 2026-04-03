/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        /* ── Travel Sky Blue (primary) ─────────────────────────── */
        primary: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
          700: '#0369A1',
          800: '#075985',
          900: '#0C4A6E',
        },
        /* ── Adventure Orange (accent) ─────────────────────────── */
        accent: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
        },
        /* ── Semantic Tokens ───────────────────────────────────── */
        background: '#F0F9FF',
        foreground: '#0C4A6E',
        card: '#FFFFFF',
        muted: '#E8F2F8',
        border: '#BAE6FD',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Playfair Display', 'Georgia', 'serif'],
      },
      /* ── Editorial Box Shadows ───────────────────────────────── */
      boxShadow: {
        'editorial-sm': '0 1px 3px rgba(14, 165, 233, 0.08), 0 1px 2px rgba(14, 165, 233, 0.06)',
        editorial: '0 4px 12px rgba(14, 165, 233, 0.10), 0 2px 4px rgba(14, 165, 233, 0.06)',
        'editorial-lg': '0 12px 32px rgba(14, 165, 233, 0.12), 0 4px 8px rgba(14, 165, 233, 0.08)',
        'editorial-xl': '0 20px 48px rgba(14, 165, 233, 0.14), 0 8px 16px rgba(14, 165, 233, 0.10)',
        'card-hover': '0 8px 24px rgba(14, 165, 233, 0.15)',
      },
      /* ── Animation Keyframes ─────────────────────────────────── */
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      /* ── Animation Utilities ─────────────────────────────────── */
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'slide-down': 'slideDown 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
      },
      /* ── Enhanced Typography (prose) ─────────────────────────── */
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: theme('colors.foreground'),
            a: {
              color: theme('colors.primary.600'),
              textDecoration: 'underline',
              textDecorationColor: theme('colors.primary.200'),
              textUnderlineOffset: '3px',
              fontWeight: '500',
              transition: 'color 0.2s ease, text-decoration-color 0.2s ease',
              '&:hover': {
                color: theme('colors.primary.800'),
                textDecorationColor: theme('colors.primary.500'),
              },
            },
            h1: {
              fontFamily: theme('fontFamily.heading').join(', '),
              fontWeight: '800',
              color: theme('colors.foreground'),
              letterSpacing: '-0.025em',
            },
            h2: {
              fontFamily: theme('fontFamily.heading').join(', '),
              fontWeight: '700',
              color: theme('colors.foreground'),
              letterSpacing: '-0.02em',
            },
            h3: {
              fontFamily: theme('fontFamily.heading').join(', '),
              fontWeight: '600',
              color: theme('colors.primary.800'),
            },
            h4: {
              fontFamily: theme('fontFamily.heading').join(', '),
              fontWeight: '600',
              color: theme('colors.primary.700'),
            },
            blockquote: {
              borderLeftColor: theme('colors.accent.500'),
              color: theme('colors.primary.800'),
              fontStyle: 'italic',
              backgroundColor: theme('colors.muted'),
              borderRadius: '0 0.5rem 0.5rem 0',
              padding: '1rem 1.25rem',
            },
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:last-of-type::after': { content: 'none' },
            code: {
              backgroundColor: theme('colors.muted'),
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontWeight: '500',
            },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            img: {
              borderRadius: '0.75rem',
              boxShadow: '0 4px 12px rgba(14, 165, 233, 0.10)',
            },
            hr: {
              borderColor: theme('colors.border'),
            },
            strong: {
              color: theme('colors.foreground'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
