export const visualizerStyles = {
  header: {
    wrapper: 'space-y-4',
    container: 'flex justify-between items-start',
    titleGroup: 'space-y-2',
    title: 'text-2xl font-bold text-white',
    subtitle: 'text-slate-300',
    controls: 'flex flex-wrap gap-2 items-start justify-end',
  },
  arrayContainer: {
    wrapper: 'relative h-[32rem] bg-slate-900 rounded-lg p-4',
    content: 'h-full flex items-end justify-center gap-1',
  },
  arrayBar: {
    base: 'w-4 transition-all duration-200',
    states: {
      comparing: 'bg-indigo-500',
      sorted: 'bg-emerald-400',
      default: 'bg-slate-400',
    },
  },
  controls: {
    wrapper:
      'flex items-center justify-between gap-4 bg-slate-700/50 p-4 rounded-lg',
    buttonGroup: 'flex items-center gap-2',
    speedControl: 'flex items-center gap-4',
    speedLabel: 'text-sm text-slate-300',
    slider: 'w-32',
  },
  statusBar: {
    wrapper: 'bg-slate-700/50 p-4 rounded-lg space-y-2',
    header: 'flex justify-between items-center',
    title: 'text-lg font-semibold text-white',
    description: 'text-slate-300 text-sm leading-relaxed',
    progress: 'text-sm text-slate-400',
  },
  legend: {
    wrapper: 'flex gap-6 text-sm bg-slate-700/50 p-4 rounded-lg',
    item: 'flex items-center gap-2',
    indicator: 'w-3 h-3 rounded-full',
    label: 'text-slate-300',
    states: {
      comparing: 'bg-indigo-500',
      sorted: 'bg-emerald-400',
      unsorted: 'bg-slate-400',
    },
  },
};
