'use client';

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { generateRandomArray } from '@/utils/arrayGenerator';

interface ArrayContextType {
  array: number[];
  setArray: React.Dispatch<React.SetStateAction<number[]>>;
  maxValue: number;
  generateNewArray: () => void;
  resetArray: () => void;
}

const ArrayContext = createContext<ArrayContextType | undefined>(undefined);

export const ArrayProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [array, setArray] = useState<number[]>([]);
  const [maxValue, setMaxValue] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initialArray = generateRandomArray(50, 5, 100);
    setArray(initialArray);
    setMaxValue(Math.max(...initialArray));
    setMounted(true);
  }, []);

  const generateNewArray = useCallback(() => {
    const newArray = generateRandomArray(50, 5, 100);
    setArray(newArray);
    setMaxValue(Math.max(...newArray));
  }, []);

  const resetArray = useCallback(() => {
    generateNewArray();
  }, [generateNewArray]);

  if (!mounted) {
    return null;
  }

  return (
    <ArrayContext.Provider
      value={{
        array,
        setArray,
        maxValue,
        generateNewArray,
        resetArray,
      }}
    >
      {children}
    </ArrayContext.Provider>
  );
};

export const useArray = () => {
  const context = useContext(ArrayContext);
  if (!context) {
    throw new Error('useArray must be used within ArrayProvider');
  }
  return context;
};
