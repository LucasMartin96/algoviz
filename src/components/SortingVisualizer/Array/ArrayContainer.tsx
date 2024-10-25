'use client';

import React, { useEffect, useState } from 'react';
import { useArray } from '../Context/ArrayContext';
import { useAlgorithm } from '../Context/AlgorithmContext';
import ArrayBar from './ArrayBar';
import { visualizerStyles } from '@/styles/visualizer';

const ArrayContainer: React.FC = () => {
  const { array, maxValue } = useArray();
  const { comparing, sortedIndices } = useAlgorithm();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={visualizerStyles.arrayContainer.wrapper} />;
  }

  return (
    <div className={visualizerStyles.arrayContainer.wrapper}>
      <div className={visualizerStyles.arrayContainer.content}>
        {array.map((value, index) => (
          <ArrayBar
            key={index}
            value={value}
            height={`${(value / maxValue) * 100}%`}
            isComparing={comparing.includes(index)}
            isSorted={sortedIndices.includes(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ArrayContainer;
