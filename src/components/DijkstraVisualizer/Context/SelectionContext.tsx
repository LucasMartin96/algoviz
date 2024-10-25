'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { useAlgorithm } from './AlgorithmContext';
import { SelectionMode } from '../Graph/types';

interface SelectionContextType {
  selectionMode: SelectionMode;
  setSelectionMode: (mode: SelectionMode) => void;
  handleNodeSelection: (nodeId: string) => void;
  cancelSelection: () => void;
}

const SelectionContext = createContext<SelectionContextType | undefined>(
  undefined
);

export const SelectionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectionMode, setSelectionMode] = useState<SelectionMode | null>(
    null
  );
  const { setStartNode, setEndNode, addViaNode } = useAlgorithm();

  const handleNodeSelection = useCallback(
    (nodeId: string) => {
      switch (selectionMode) {
        case 'start':
          setStartNode(nodeId);
          setSelectionMode(null);
          break;
        case 'end':
          setEndNode(nodeId);
          setSelectionMode(null);
          break;
        case 'via':
          addViaNode(nodeId);
          break;
        default:
          break;
      }
    },
    [selectionMode, setStartNode, setEndNode, addViaNode]
  );

  const cancelSelection = useCallback(() => {
    setSelectionMode(null);
  }, []);

  return (
    <SelectionContext.Provider
      value={{
        selectionMode,
        setSelectionMode,
        handleNodeSelection,
        cancelSelection,
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
};

export const useSelection = () => {
  const context = useContext(SelectionContext);
  if (context === undefined) {
    throw new Error('useSelection must be used within a SelectionProvider');
  }
  return context;
};
