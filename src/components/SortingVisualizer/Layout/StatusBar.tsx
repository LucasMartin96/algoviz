'use client';

import React from 'react';
import { useAlgorithm } from '../Context/AlgorithmContext';
import { visualizerStyles } from '@/styles/visualizer';

const StatusBar: React.FC = () => {
  const { selectedAlgorithm, currentStep, steps } = useAlgorithm();

  const getAlgorithmDescription = () => {
    switch (selectedAlgorithm) {
      case 'bubble':
        return 'Compares adjacent elements and swaps them if they are in the wrong order';
      case 'quick':
        return 'Uses divide-and-conquer strategy with a pivot element';
      case 'merge':
        return 'Divides array in half, sorts, and merges back together';
      default:
        return '';
    }
  };

  return (
    <div className={visualizerStyles.statusBar.wrapper}>
      <div className={visualizerStyles.statusBar.header}>
        <h3 className={visualizerStyles.statusBar.title}>
          {selectedAlgorithm.charAt(0).toUpperCase() +
            selectedAlgorithm.slice(1)}{' '}
          Sort
        </h3>
        <div className={visualizerStyles.statusBar.progress}>
          Step {currentStep + 1} of {steps.length}
        </div>
      </div>
      <p className={visualizerStyles.statusBar.description}>
        {getAlgorithmDescription()}
      </p>
    </div>
  );
};

export default StatusBar;
