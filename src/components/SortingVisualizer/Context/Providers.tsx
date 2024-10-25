'use client';

import React from 'react';
import { ArrayProvider } from './ArrayContext';
import { AlgorithmProvider } from './AlgorithmContext';

interface ProvidersProps {
  children: React.ReactNode;
}

export const AppProviders: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <ArrayProvider>
      <AlgorithmProvider>{children}</AlgorithmProvider>
    </ArrayProvider>
  );
};
