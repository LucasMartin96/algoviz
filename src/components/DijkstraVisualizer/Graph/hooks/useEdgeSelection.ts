import { useState } from 'react';
import { SelectionMode } from '../types';

export const useEdgeSelection = (
  setStartNode: (node: string | null) => void,
  setEndNode: (node: string | null) => void,
  addViaNode: (node: string) => void,
  selectionMode: SelectionMode | null,
  setSelectionMode: (mode: SelectionMode | null) => void
) => {
  const [isEdgeMode, setIsEdgeMode] = useState(false);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [selectedTarget, setSelectedTarget] = useState<string | null>(null);

  const handleNodeClick = (nodeId: string) => {
    if (isEdgeMode) {
      if (!selectedSource) {
        setSelectedSource(nodeId);
      } else if (nodeId !== selectedSource) {
        setSelectedTarget(nodeId);
      }
      return;
    }

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
        setSelectionMode(null);
        break;
    }
  };

  const resetEdgeSelection = () => {
    setSelectedSource(null);
    setSelectedTarget(null);
  };

  return {
    isEdgeMode,
    setIsEdgeMode,
    selectedSource,
    selectedTarget,
    handleNodeClick,
    resetEdgeSelection,
  };
};
