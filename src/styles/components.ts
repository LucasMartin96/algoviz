export const componentStyles = {
  select: {
    base: 'bg-slate-700 text-white rounded-lg px-3 py-2 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500',
  },
  legend: {
    wrapper: 'flex gap-6 text-sm bg-slate-700/50 p-4 rounded-lg',
    item: 'flex items-center gap-2',
    dot: 'w-3 h-3 rounded-full',
    label: 'text-slate-300',
  },
  statusBar: {
    wrapper: 'bg-slate-700/50 p-4 rounded-lg space-y-2',
    header: 'flex justify-between items-start',
    title: 'text-lg font-semibold text-white',
    description: 'text-slate-300 text-sm',
    progress: 'text-sm text-slate-300',
  },
};

export const buttonStyles = {
  base: 'px-3 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
  sizes: {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-2',
    lg: 'px-4 py-3 text-lg',
  },
  variants: {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500',
    secondary:
      'bg-slate-600 hover:bg-slate-700 text-white focus:ring-slate-500',
    danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500',
  },
  disabled: 'opacity-50 cursor-not-allowed',
};
