/**
 * Theme configuration
 * This file centralizes all theme-related settings for easy customization
 */

const themeConfig = {
  // Color scheme
  colors: {
    primary: {
      light: '#818cf8', // Indigo 400
      DEFAULT: '#6366f1', // Indigo 500
      dark: '#4f46e5', // Indigo 600
    },
    secondary: {
      light: '#fb923c', // Orange 400
      DEFAULT: '#f97316', // Orange 500
      dark: '#ea580c', // Orange 600
    },
    background: {
      light: '#ffffff',
      DEFAULT: '#f9fafb',
      dark: '#f3f4f6',
    },
    text: {
      light: '#6b7280', // Gray 500
      DEFAULT: '#374151', // Gray 700
      dark: '#1f2937', // Gray 800
    },
    success: '#10b981', // Emerald 500
    error: '#ef4444', // Red 500
    warning: '#f59e0b', // Amber 500
    info: '#3b82f6', // Blue 500
  },
  
  // Typography
  fonts: {
    heading: '"Montserrat", sans-serif',
    body: '"Open Sans", sans-serif',
  },
  
  // Border radius
  borderRadius: {
    small: '0.25rem',
    DEFAULT: '0.5rem',
    large: '1rem',
    full: '9999px',
  },
  
  // Shadows
  shadows: {
    small: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    medium: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    large: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
  
  // Button styles
  buttons: {
    primary: {
      background: 'bg-primary hover:bg-primary-dark',
      text: 'text-white',
      border: 'border-transparent',
    },
    secondary: {
      background: 'bg-white hover:bg-gray-50',
      text: 'text-primary',
      border: 'border border-primary',
    },
    danger: {
      background: 'bg-error hover:bg-red-600',
      text: 'text-white',
      border: 'border-transparent',
    },
  },
  
  // Card styles
  cards: {
    DEFAULT: 'bg-white shadow rounded-lg p-6',
    bordered: 'bg-white border border-gray-200 rounded-lg p-6',
    flat: 'bg-white rounded-lg p-6',
  },
  
  // Form styles
  forms: {
    input: 'block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50',
    label: 'block text-sm font-medium text-gray-700 mb-1',
    select: 'block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50',
    checkbox: 'rounded border-gray-300 text-primary focus:ring-primary',
  },
  
  // Animation durations
  animation: {
    fast: '150ms',
    DEFAULT: '300ms',
    slow: '500ms',
  },
  
  // Spacing scale (can be used for margin, padding, etc.)
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
  
  // Breakpoints for responsive design
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
};

export default themeConfig;
