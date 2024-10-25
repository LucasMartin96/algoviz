'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { GraphData, Edge } from '../../../utils/dijkstra';
import { generateRandomGraph } from '../../../utils/graphGenerator';

interface GraphContextType {
  graph: GraphData;
  setGraph: React.Dispatch<React.SetStateAction<GraphData>>;
  addNode: () => void;
  removeNode: (nodeId: string) => void;
  addEdge: (source: string, target: string, weight: number) => void;
  removeEdge: (source: string, target: string) => void;
  handleNodeMove: (nodeId: string, x: number, y: number) => void;
  generateNewRandomGraph: () => void;
  resetGraph: () => void;
}

const initialGraph: GraphData = {
  nodes: [
    { id: 'A', x: 100, y: 100 },
    { id: 'B', x: 300, y: 300 },
    { id: 'C', x: 500, y: 300 },
    { id: 'D', x: 700, y: 200 },
  ],
  edges: [
    { source: 'A', target: 'B', weight: 4 },
    { source: 'B', target: 'C', weight: 3 },
    { source: 'C', target: 'D', weight: 5 },
    { source: 'A', target: 'C', weight: 2 },
  ],
};

const GraphContext = createContext<GraphContextType | undefined>(undefined);

export const GraphProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [graph, setGraph] = useState<GraphData>(initialGraph);

  const addNode = useCallback(() => {
    const newNodeId = String.fromCharCode(65 + graph.nodes.length);
    setGraph((prevGraph) => ({
      ...prevGraph,
      nodes: [
        ...prevGraph.nodes,
        {
          id: newNodeId,
          x: Math.random() * 1000 + 100,
          y: Math.random() * 400 + 100,
        },
      ],
    }));
  }, [graph.nodes.length]);

  const removeNode = useCallback((nodeId: string) => {
    setGraph((prevGraph) => ({
      nodes: prevGraph.nodes.filter((node) => node.id !== nodeId),
      edges: prevGraph.edges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      ),
    }));
  }, []);

  const addEdge = useCallback(
    (source: string, target: string, weight: number) => {
      const newEdge: Edge = { source, target, weight };
      setGraph((prevGraph) => ({
        ...prevGraph,
        edges: [...prevGraph.edges, newEdge],
      }));
    },
    []
  );

  const removeEdge = useCallback((source: string, target: string) => {
    setGraph((prevGraph) => ({
      ...prevGraph,
      edges: prevGraph.edges.filter(
        (edge) =>
          !(edge.source === source && edge.target === target) &&
          !(edge.source === target && edge.target === source)
      ),
    }));
  }, []);

  const handleNodeMove = useCallback((nodeId: string, x: number, y: number) => {
    setGraph((prevGraph) => ({
      ...prevGraph,
      nodes: prevGraph.nodes.map((node) =>
        node.id === nodeId
          ? {
              ...node,
              x: Math.max(20, Math.min(x, 1180)),
              y: Math.max(20, Math.min(y, 580)),
            }
          : node
      ),
    }));
  }, []);

  const generateNewRandomGraph = useCallback(() => {
    const newGraph = generateRandomGraph();
    setGraph(newGraph);
  }, []);

  const resetGraph = useCallback(() => {
    setGraph(initialGraph);
  }, []);

  return (
    <GraphContext.Provider
      value={{
        graph,
        setGraph,
        addNode,
        removeNode,
        addEdge,
        removeEdge,
        handleNodeMove,
        generateNewRandomGraph,
        resetGraph,
      }}
    >
      {children}
    </GraphContext.Provider>
  );
};

export const useGraph = () => {
  const context = useContext(GraphContext);
  if (context === undefined) {
    throw new Error('useGraph must be used within a GraphProvider');
  }
  return context;
};
