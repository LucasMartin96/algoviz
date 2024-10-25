'use client';

import React from 'react';
import { useAlgorithm } from '../Context/AlgorithmContext';
import Button from '@/components/ui/Button';
import { visualizerStyles } from '@/styles/visualizer';

const AnimationControls: React.FC = () => {
  const {
    steps,
    currentStep,
    isAnimating,
    startSorting,
    pauseAnimation,
    stepBackward,
    animationSpeed,
    setAnimationSpeed,
  } = useAlgorithm();

  if (steps.length === 0) return null;

  return (
    <div className={visualizerStyles.controls.wrapper}>
      <div className={visualizerStyles.controls.buttonGroup}>
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
          variant={isAnimating ? 'danger' : 'primary'}
          onClick={isAnimating ? pauseAnimation : startSorting}
          size="sm"
        >
          {isAnimating ? 'Pause' : 'Play'}
        </Button>
      </div>

      <div className={visualizerStyles.controls.speedControl}>
        <span className={visualizerStyles.controls.speedLabel}>Speed</span>
        <input
          type="range"
          min={1}
          max={5}
          value={animationSpeed}
          onChange={(e) => setAnimationSpeed(Number(e.target.value))}
          className={visualizerStyles.controls.slider}
        />
      </div>

      <div className={visualizerStyles.statusBar.wrapper}>
        <span className={visualizerStyles.statusBar.progress}>
          Step {currentStep + 1} of {steps.length}
        </span>
      </div>
    </div>
  );
};

export default AnimationControls;
