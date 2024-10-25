'use client';

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { useArray } from './ArrayContext';
import {
  bubbleSort,
  quickSort,
  mergeSort,
  SortingStep,
} from '@/utils/sortingAlgorithms';

type AlgorithmType = 'bubble' | 'quick' | 'merge';

interface AlgorithmContextType {
  currentStep: number;
  steps: SortingStep[];
  isAnimating: boolean;
  comparing: number[];
  sortedIndices: number[];
  selectedAlgorithm: AlgorithmType;
  animationSpeed: number;
  setSelectedAlgorithm: (algorithm: AlgorithmType) => void;
  setAnimationSpeed: (speed: number) => void;
  startSorting: () => void;
  pauseAnimation: () => void;
  stepForward: () => void;
  stepBackward: () => void;
  resetAlgorithm: () => void;
}

const AlgorithmContext = createContext<AlgorithmContextType | undefined>(
  undefined
);

export const AlgorithmProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { array, setArray } = useArray();
  const [steps, setSteps] = useState<SortingStep[]>([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [comparing, setComparing] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState<AlgorithmType>('bubble');
  const [animationSpeed, setAnimationSpeed] = useState(3);
  const [animationTimeoutId, setAnimationTimeoutId] =
    useState<NodeJS.Timeout | null>(null);

  const getSortingSteps = useCallback(
    (arr: number[]) => {
      switch (selectedAlgorithm) {
        case 'bubble':
          return bubbleSort(arr);
        case 'quick':
          return quickSort(arr);
        case 'merge':
          return mergeSort(arr);
        default:
          return [];
      }
    },
    [selectedAlgorithm]
  );

  const startSorting = useCallback(() => {
    if (currentStep === -1) {
      const newSteps = getSortingSteps([...array]);
      setSteps(newSteps);
      setCurrentStep(0);
    }
    setIsAnimating(true);
  }, [array, currentStep, getSortingSteps]);

  useEffect(() => {
    if (isAnimating && currentStep < steps.length - 1) {
      const timeout = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 1000 / animationSpeed);
      setAnimationTimeoutId(timeout);
    } else if (currentStep >= steps.length - 1) {
      setIsAnimating(false);
    }

    return () => {
      if (animationTimeoutId) {
        clearTimeout(animationTimeoutId);
      }
    };
  }, [isAnimating, currentStep, steps.length, animationSpeed]);

  useEffect(() => {
    if (currentStep >= 0 && steps[currentStep]) {
      const {
        array: currentArray,
        comparing: currentComparing,
        sortedIndices: currentSorted,
      } = steps[currentStep];
      setArray(currentArray);
      setComparing(currentComparing);
      setSortedIndices(currentSorted);
    }
  }, [currentStep, steps, setArray]);

  const pauseAnimation = useCallback(() => {
    setIsAnimating(false);
    if (animationTimeoutId) {
      clearTimeout(animationTimeoutId);
    }
  }, [animationTimeoutId]);

  const stepForward = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep, steps.length]);

  const stepBackward = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const resetAlgorithm = useCallback(() => {
    setSteps([]);
    setCurrentStep(-1);
    setIsAnimating(false);
    setComparing([]);
    setSortedIndices([]);
    if (animationTimeoutId) {
      clearTimeout(animationTimeoutId);
    }
  }, [animationTimeoutId]);

  return (
    <AlgorithmContext.Provider
      value={{
        currentStep,
        steps,
        isAnimating,
        comparing,
        sortedIndices,
        selectedAlgorithm,
        animationSpeed,
        setSelectedAlgorithm,
        setAnimationSpeed,
        startSorting,
        pauseAnimation,
        stepForward,
        stepBackward,
        resetAlgorithm,
      }}
    >
      {children}
    </AlgorithmContext.Provider>
  );
};

export const useAlgorithm = () => {
  const context = useContext(AlgorithmContext);
  if (!context)
    throw new Error('useAlgorithm must be used within AlgorithmProvider');
  return context;
};
