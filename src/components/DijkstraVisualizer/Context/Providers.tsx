import React from 'react';
import { GraphProvider } from './GraphContext';
import { AlgorithmProvider } from './AlgorithmContext';
import { SelectionProvider } from './SelectionContext';

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <GraphProvider>
      <AlgorithmProvider>
        <SelectionProvider>{children}</SelectionProvider>
      </AlgorithmProvider>
    </GraphProvider>
  );
};
