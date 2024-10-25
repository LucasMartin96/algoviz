'use client';

import React, { useState, useCallback } from 'react';
import { Node as NodeType } from '../../../utils/dijkstra';

interface NodeProps {
  node: NodeType;
  onClick: () => void;
  onRemove: () => void;
  isStart: boolean;
  isEnd: boolean;
  isVia: boolean;
  isInPath: boolean;
  isCurrentNode: boolean;
  onNodeMove: (nodeId: string, x: number, y: number) => void;
  selectionMode: 'edge' | 'start' | 'end' | 'via' | null;
  isEdgeMode: boolean;
  isSelected: boolean;
}

const Node: React.FC<NodeProps> = ({
  node,
  onClick,
  onRemove,
  isStart,
  isEnd,
  isVia,
  isInPath,
  isCurrentNode,
  onNodeMove,
  selectionMode,
  isEdgeMode,
  isSelected,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const getCursor = () => {
    if (isEdgeMode || selectionMode) return 'pointer';
    return isDragging ? 'grabbing' : 'grab';
  };

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();

      const clickedElement = e.target as Element;
      if (clickedElement.closest('.remove-button-area')) {
        onRemove();
        return;
      }
      if (isEdgeMode || selectionMode) {
        onClick();
        return;
      }
      const svgElement = clickedElement.closest('svg');
      if (svgElement) {
        const svgRect = svgElement.getBoundingClientRect();
        const offsetX = e.clientX - svgRect.left - node.x;
        const offsetY = e.clientY - svgRect.top - node.y;
        setDragOffset({ x: offsetX, y: offsetY });
        setIsDragging(true);
      }
    },
    [node.x, node.y, onClick, onRemove, isEdgeMode, selectionMode]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      const svgElement = (e.target as Element).closest('svg');
      if (svgElement) {
        const svgRect = svgElement.getBoundingClientRect();
        const x = e.clientX - svgRect.left - dragOffset.x;
        const y = e.clientY - svgRect.top - dragOffset.y;
        onNodeMove(node.id, x, y);
      }
    },
    [isDragging, dragOffset, node.id, onNodeMove]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const getNodeColor = () => {
    if (isSelected) return 'fill-blue-400 shadow-blue-400/50';
    if (isCurrentNode) return 'fill-indigo-500 shadow-indigo-500/50';
    if (isStart) return 'fill-emerald-400 shadow-emerald-400/50';
    if (isEnd) return 'fill-pink-400 shadow-pink-400/50';
    if (isVia) return 'fill-violet-400 shadow-violet-400/50';
    if (isInPath) return 'fill-amber-400 shadow-amber-400/50';
    return 'fill-slate-400 shadow-slate-400/50';
  };

  return (
    <g
      onMouseDown={handleMouseDown}
      style={{ cursor: getCursor() }}
      className="transition-transform duration-150"
    >
      {isCurrentNode && (
        <>
          <circle
            cx={node.x}
            cy={node.y}
            r={20}
            className="fill-indigo-500/20 animate-ping"
          />
          <circle
            cx={node.x}
            cy={node.y}
            r={25}
            className="fill-none stroke-indigo-400 stroke-2 animate-[pulse_1.5s_ease-in-out_infinite]"
          />
        </>
      )}

      <circle
        cx={node.x}
        cy={node.y}
        r={20}
        className="fill-slate-950/50 translate-y-1 blur-sm"
      />

      <circle
        cx={node.x}
        cy={node.y}
        r={20}
        className={`
          ${getNodeColor()}
          transition-all duration-200
          ${isCurrentNode ? 'filter drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]' : ''}
        `}
      />

      <text
        x={node.x}
        y={node.y}
        dy=".3em"
        textAnchor="middle"
        className={`
          text-sm font-bold select-none pointer-events-none
          ${isCurrentNode ? 'fill-white' : 'fill-slate-900'}
        `}
      >
        {node.id}
      </text>

      <g className="remove-button-area">
        <circle
          cx={node.x + 15}
          cy={node.y - 15}
          r={12}
          className="fill-transparent stroke-none cursor-pointer"
        />
        <circle
          cx={node.x + 15}
          cy={node.y - 15}
          r={8}
          className="fill-slate-800 stroke-pink-400 stroke-2 shadow-lg cursor-pointer"
        />
        <text
          x={node.x + 15}
          y={node.y - 15}
          dy=".3em"
          textAnchor="middle"
          className="fill-pink-400 text-xs font-bold select-none pointer-events-none"
        >
          ×
        </text>
      </g>
    </g>
  );
};

export default Node;
