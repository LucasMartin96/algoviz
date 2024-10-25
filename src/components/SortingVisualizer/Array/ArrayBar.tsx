import { visualizerStyles } from '@/styles/visualizer';
import { cn } from '@/utils/cn';

interface ArrayBarProps {
  value: number;
  height: string;
  isComparing: boolean;
  isSorted: boolean;
}

const ArrayBar: React.FC<ArrayBarProps> = ({
  value,
  height,
  isComparing,
  isSorted,
}) => {
  const barStyle = cn(
    visualizerStyles.arrayBar.base,
    isComparing
      ? visualizerStyles.arrayBar.states.comparing
      : isSorted
        ? visualizerStyles.arrayBar.states.sorted
        : visualizerStyles.arrayBar.states.default
  );

  return (
    <div
      className={barStyle}
      style={{ height }}
      role="presentation"
      aria-label={`Value: ${value}`}
    >
      <div className="sr-only">{value}</div>
    </div>
  );
};

export default ArrayBar;
