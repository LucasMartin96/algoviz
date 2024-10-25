'use client';

import React from 'react';
import { useArray } from '../Context/ArrayContext';
import { useAlgorithm } from '../Context/AlgorithmContext';
import Button from '@/components/ui/Button';
import { visualizerStyles } from '@/styles/visualizer';
import { componentStyles } from '@/styles/components';
import type { AlgorithmType } from '../types';

const algorithms = [
  { value: 'bubble', label: 'Bubble Sort' },
  { value: 'quick', label: 'Quick Sort' },
  { value: 'merge', label: 'Merge Sort' },
] as const;

const Header: React.FC = () => {
  const { generateNewArray } = useArray();
  const {
    startSorting,
    resetAlgorithm,
    selectedAlgorithm,
    setSelectedAlgorithm,
    isAnimating,
  } = useAlgorithm();

  return (
    <div className={visualizerStyles.header.wrapper}>
      <div className={visualizerStyles.header.container}>
        <div className={visualizerStyles.header.titleGroup}>
          <h2 className={visualizerStyles.header.title}>
            Sorting Algorithm Visualizer
          </h2>
          <p className={visualizerStyles.header.subtitle}>
            Visualize how different sorting algorithms work
          </p>
        </div>

        <div className={visualizerStyles.header.controls}>
          <select
            value={selectedAlgorithm}
            onChange={(e) =>
              setSelectedAlgorithm(e.target.value as AlgorithmType)
            }
            className={componentStyles.select.base}
          >
            {algorithms.map((algo) => (
              <option key={algo.value} value={algo.value}>
                {algo.label}
              </option>
            ))}
          </select>
          <Button
            variant="secondary"
            onClick={generateNewArray}
            disabled={isAnimating}
          >
            New Array
          </Button>
          <Button
            variant="primary"
            onClick={startSorting}
            disabled={isAnimating}
          >
            Sort!
          </Button>
          <Button
            variant="secondary"
            onClick={resetAlgorithm}
            disabled={isAnimating}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
