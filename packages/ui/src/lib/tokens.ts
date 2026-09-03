export const tokens = {
  colors: {
    primary: {
      DEFAULT: '#059669', // Emerald 600 - Main Trust Brand Color
      hover: '#047857',   // Emerald 700
      active: '#065f46',  // Emerald 800
      light: '#ecfdf5',   // Emerald 50
      border: '#a7f3d0',  // Emerald 200
    },
    neutral: {
      bg: '#f8fafc',      // Slate 50
      card: '#ffffff',    // Pure White
      border: '#e2e8f0',  // Slate 200
      textPrimary: '#0f172a',   // Slate 900
      textSecondary: '#475569', // Slate 600
      textMuted: '#94a3b8',     // Slate 400
    },
    status: {
      success: {
        bg: '#f0fdf4',
        text: '#166534',
        border: '#bbf7d0',
      },
      warning: {
        bg: '#fffbeb',
        text: '#92400e',
        border: '#fde68a',
      },
      error: {
        bg: '#fef2f2',
        text: '#991b1b',
        border: '#fecaca',
      },
      info: {
        bg: '#f0f9ff',
        text: '#075985',
        border: '#bae6fd',
      },
    },
  },
  radius: {
    sm: '0.25rem',  // 4px
    md: '0.375rem', // 6px
    lg: '0.5rem',   // 8px
    xl: '0.75rem',  // 12px
    '2xl': '1rem',  // 16px
    full: '9999px',
  },
  shadows: {
    subtle: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    card: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    elevated: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    dropdown: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  },
  spacing: {
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    8: '32px',
    10: '40px',
    12: '48px',
    16: '64px',
    20: '80px',
    24: '96px',
  },
} as const;

