import { visualizerStyles } from '@/styles/visualizer';

const legendItems = [
  { state: 'comparing', label: 'Comparing' },
  { state: 'sorted', label: 'Sorted' },
  { state: 'unsorted', label: 'Unsorted' },
] as const;

const Legend = () => {
  return (
    <div className={visualizerStyles.legend.wrapper}>
      {legendItems.map(({ state, label }) => (
        <div key={state} className={visualizerStyles.legend.item}>
          <div
            className={`${visualizerStyles.legend.indicator} ${visualizerStyles.legend.states[state]}`}
            aria-hidden="true"
          />
          <span className={visualizerStyles.legend.label}>{label}</span>
        </div>
      ))}
    </div>
  );
};

export default Legend;
