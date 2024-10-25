'use client';

import React from 'react';
import Node from './Node';
import { GraphData, Edge, StepData } from '../../utils/dijkstra';

interface GraphProps {
  graph: GraphData;
  onNodeClick: (nodeId: string) => void;
  startNode: string | null;
  endNode: string | null;
  shortestPathEdges: Edge[];
  currentStep: StepData | undefined;
  onRemoveNode: (nodeId: string) => void;
  onRemoveEdge: (source: string, target: string) => void;
  onNodeMove: (nodeId: string, x: number, y: number) => void;
  selectionMode: 'edge' | 'start' | 'end' | 'via' | null;
  viaNodes?: string[];
}

const Graph: React.FC<GraphProps> = ({
  graph,
  onNodeClick,
  startNode,
  endNode,
  shortestPathEdges,
  currentStep,
  onRemoveNode,
  onNodeMove,
  selectionMode,
  viaNodes,
}) => {
  const isEdgeInShortestPath = (edge: Edge) => {
    return shortestPathEdges.some(
      (e) =>
        (e.source === edge.source && e.target === edge.target) ||
        (e.source === edge.target && e.target === edge.source)
    );
  };

  return (
    <div className="relative">
      <svg
        className="w-full h-[32rem] bg-slate-900 rounded-lg"
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid meet"
        style={{ touchAction: 'none' }}
      >
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgb(51 65 85)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="1200" height="600" fill="url(#grid)" />

        {graph.edges.map((edge) => {
          const sourceNode = graph.nodes.find((n) => n.id === edge.source);
          const targetNode = graph.nodes.find((n) => n.id === edge.target);
          if (!sourceNode || !targetNode) return null;

          const midX = (sourceNode.x + targetNode.x) / 2;
          const midY = (sourceNode.y + targetNode.y) / 2;

          return (
            <g key={`${edge.source}-${edge.target}`}>
              <line
                x1={sourceNode.x}
                y1={sourceNode.y}
                x2={targetNode.x}
                y2={targetNode.y}
                className={`
                  stroke-2 transition-colors duration-300
                  ${
                    isEdgeInShortestPath(edge)
                      ? 'stroke-pink-400 stroke-[3px]'
                      : 'stroke-slate-600'
                  }
                `}
              />

              <g transform={`translate(${midX},${midY})`}>
                <rect
                  x="-12"
                  y="-12"
                  width="24"
                  height="24"
                  rx="6"
                  className="fill-slate-800 stroke-slate-600"
                />
                <text
                  textAnchor="middle"
                  dy=".3em"
                  className="fill-slate-300 text-xs font-medium select-none"
                >
                  {edge.weight}
                </text>
              </g>
            </g>
          );
        })}

        {graph.nodes.map((node) => (
          <Node
            key={node.id}
            node={node}
            onClick={() => onNodeClick(node.id)}
            onRemove={() => onRemoveNode(node.id)}
            isStart={node.id === startNode}
            isEnd={node.id === endNode}
            isVia={viaNodes?.includes(node.id) ?? false}
            isInPath={shortestPathEdges.some(
              (e) => e.source === node.id || e.target === node.id
            )}
            distance={currentStep?.distances?.[node.id]}
            onNodeMove={onNodeMove}
            selectionMode={selectionMode}
          />
        ))}
      </svg>
    </div>
  );
};

export default Graph;
