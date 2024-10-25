import Button from '../../ui/Button';
import { useAlgorithm } from '../Context/AlgorithmContext';

const AnimationControls: React.FC = () => {
  const {
    steps,
    currentStep,
    isAnimating,
    animateAlgorithm,
    pauseAnimation,
    stepForward,
    stepBackward,
  } = useAlgorithm();

  if (steps.length === 0) return null;

  return (
    <div className="flex items-center gap-4 bg-slate-700/50 p-4 rounded-lg">
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          onClick={stepBackward}
          disabled={currentStep <= 0 || isAnimating}
          size="sm"
          aria-label="Step backward"
        >
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </Button>

        <Button
          variant="primary"
          onClick={isAnimating ? pauseAnimation : animateAlgorithm}
          size="sm"
          aria-label={isAnimating ? 'Pause animation' : 'Play animation'}
        >
          {isAnimating ? (
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Pause
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
              Play
            </div>
          )}
        </Button>

        <Button
          variant="secondary"
          onClick={stepForward}
          disabled={currentStep >= steps.length - 1 || isAnimating}
          size="sm"
          aria-label="Step forward"
        >
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </div>

      <div className="flex items-center gap-2 flex-1">
        <span className="text-sm text-slate-300">
          Step {currentStep + 1} of {steps.length}
        </span>
        <div className="flex-1 h-1 bg-slate-600 rounded-full overflow-hidden">
          <div
            className="h-full bg-violet-400 transition-all duration-200"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default AnimationControls;
