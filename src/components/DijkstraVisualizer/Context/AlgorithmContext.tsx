'use client';

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import {
  Edge,
  StepData,
  getShortestPathEdges,
  calculatePathWithViaNodes,
} from '../../../utils/dijkstra';
import { useGraph } from './GraphContext';

interface AlgorithmContextType {
  startNode: string | null;
  endNode: string | null;
  viaNodes: string[];
  shortestPath: string[];
  shortestPathEdges: Edge[];
  steps: StepData[];
  currentStep: number;
  isAnimating: boolean;
  noPathExists: boolean;
  setStartNode: (node: string | null) => void;
  setEndNode: (node: string | null) => void;
  addViaNode: (node: string) => void;
  removeViaNode: (node: string) => void;
  calculateShortestPath: () => void;
  animateAlgorithm: () => void;
  resetAlgorithm: () => void;
  animationSpeed: number;
  setAnimationSpeed: (speed: number) => void;
  pauseAnimation: () => void;
  stepForward: () => void;
  stepBackward: () => void;
}

const AlgorithmContext = createContext<AlgorithmContextType | undefined>(
  undefined
);

export const AlgorithmProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { graph } = useGraph();
  const [startNode, setStartNode] = useState<string | null>(null);
  const [endNode, setEndNode] = useState<string | null>(null);
  const [viaNodes, setViaNodes] = useState<string[]>([]);
  const [shortestPath, setShortestPath] = useState<string[]>([]);
  const [shortestPathEdges, setShortestPathEdges] = useState<Edge[]>([]);
  const [steps, setSteps] = useState<StepData[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [noPathExists, setNoPathExists] = useState<boolean>(false);
  const [animationSpeed, setAnimationSpeed] = useState(500);
  const [animationTimer, setAnimationTimer] = useState<NodeJS.Timeout | null>(
    null
  );

  const addViaNode = useCallback(
    (node: string) => {
      if (!viaNodes.includes(node) && node !== startNode && node !== endNode) {
        setViaNodes((prev) => [...prev, node]);
      }
    },
    [viaNodes, startNode, endNode]
  );

  const removeViaNode = useCallback((node: string) => {
    setViaNodes((prev) => prev.filter((id) => id !== node));
  }, []);

  const calculateShortestPath = useCallback(() => {
    if (!startNode || !endNode) return;

    setShortestPath([]);
    setShortestPathEdges([]);
    setSteps([]);
    setCurrentStep(-1);
    setNoPathExists(false);

    const { path, steps, hasPath } = calculatePathWithViaNodes(
      graph,
      startNode,
      endNode,
      viaNodes
    );

    if (!hasPath) {
      setNoPathExists(true);
    } else {
      setShortestPath(path);
      setShortestPathEdges(getShortestPathEdges(path));
      setSteps(steps);
      setCurrentStep(steps.length - 1);
    }
  }, [graph, startNode, endNode, viaNodes]);

  const pauseAnimation = useCallback(() => {
    if (animationTimer) {
      clearTimeout(animationTimer);
      setAnimationTimer(null);
    }
    setIsAnimating(false);
  }, [animationTimer]);

  const stepForward = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  }, [steps.length]);

  const stepBackward = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const animateAlgorithm = useCallback(() => {
    if (currentStep >= steps.length - 1) {
      setCurrentStep(-1);
    }

    setIsAnimating(true);

    const animate = () => {
      setCurrentStep((prev) => {
        const nextStep = prev + 1;

        if (nextStep >= steps.length) {
          setIsAnimating(false);
          return prev;
        }

        const timer = setTimeout(animate, animationSpeed);
        setAnimationTimer(timer);
        return nextStep;
      });
    };

    animate();
  }, [steps.length, currentStep, animationSpeed]);

  useEffect(() => {
    return () => {
      if (animationTimer) {
        clearTimeout(animationTimer);
      }
    };
  }, [animationTimer]);

  const resetAlgorithm = useCallback(() => {
    setStartNode(null);
    setEndNode(null);
    setViaNodes([]);
    setShortestPath([]);
    setShortestPathEdges([]);
    setSteps([]);
    setCurrentStep(-1);
    setNoPathExists(false);
    setIsAnimating(false);
    setAnimationTimer(null);
  }, []);

  return (
    <AlgorithmContext.Provider
      value={{
        startNode,
        endNode,
        viaNodes,
        shortestPath,
        shortestPathEdges,
        steps,
        currentStep,
        isAnimating,
        noPathExists,
        setStartNode,
        setEndNode,
        addViaNode,
        removeViaNode,
        calculateShortestPath,
        animateAlgorithm,
        resetAlgorithm,
        animationSpeed,
        setAnimationSpeed,
        pauseAnimation,
        stepForward,
        stepBackward,
      }}
    >
      {children}
    </AlgorithmContext.Provider>
  );
};

export const useAlgorithm = () => {
  const context = useContext(AlgorithmContext);
  if (context === undefined) {
    throw new Error('useAlgorithm must be used within an AlgorithmProvider');
  }
  return context;
};
