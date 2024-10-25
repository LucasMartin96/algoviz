export const buttonStyles = {
  base: 'inline-flex items-center justify-center rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800',
  sizes: {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-2 text-base',
  },
  variants: {
    primary: {
      active: 'bg-violet-500 text-white shadow-violet-500/20',
      base: 'text-slate-200 hover:bg-violet-700 bg-slate-700',
    },
    secondary: {
      active: 'bg-slate-600 text-white shadow-slate-500/20',
      base: 'bg-slate-700 text-slate-200 hover:bg-blue-600',
    },
    danger: {
      active: 'bg-pink-500 text-white shadow-pink-500/20',
      base: 'bg-slate-700 text-slate-200 hover:bg-pink-600',
    },
    success: {
      active: 'bg-emerald-500 text-white shadow-emerald-500/20',
      base: 'bg-slate-700 text-slate-200 hover:bg-emerald-600',
    },
  },
  states: {
    disabled: 'opacity-50 cursor-not-allowed pointer-events-none',
    loading: 'cursor-wait',
  },
  iconWrapper: {
    base: 'inline-flex items-center',
    spacing: {
      start: '-ml-0.5 mr-2',
      end: '-mr-0.5 ml-2',
    },
  },
};
