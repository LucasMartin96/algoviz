'use client';

import React, { useState, useCallback } from 'react';
import { Node as NodeType } from '../../utils/dijkstra';

interface NodeProps {
  node: NodeType;
  onClick: () => void;
  onRemove: () => void;
  isStart: boolean;
  isEnd: boolean;
  isInPath: boolean;
  distance: number | undefined;
  onNodeMove: (id: string, x: number, y: number) => void;
  selectionMode: 'edge' | 'start' | 'end' | 'via' | null;
  isVia: boolean;
}

const Node: React.FC<NodeProps> = ({
  node,
  onClick,
  onRemove,
  isStart,
  isEnd,
  isInPath,
  distance,
  onNodeMove,
  selectionMode,
  isVia,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      const clickedElement = e.target as Element;
      if (clickedElement.closest('.remove-button-area')) {
        e.stopPropagation();
        onRemove();
        return;
      }

      if (selectionMode) {
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
    [node.x, node.y, onClick, onRemove, selectionMode]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || selectionMode) return;

      const svgElement = (e.target as Element).closest('svg');
      if (svgElement) {
        const svgRect = svgElement.getBoundingClientRect();
        const x = e.clientX - svgRect.left - dragOffset.x;
        const y = e.clientY - svgRect.top - dragOffset.y;
        onNodeMove(node.id, x, y);
      }
    },
    [isDragging, dragOffset, node.id, onNodeMove, selectionMode]
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
    if (isStart) return 'fill-emerald-400 shadow-emerald-400/50';
    if (isEnd) return 'fill-pink-400 shadow-pink-400/50';
    if (isVia) return 'fill-violet-400 shadow-violet-400/50';
    if (isInPath) return 'fill-amber-400 shadow-amber-400/50';
    return 'fill-slate-400 shadow-slate-400/50';
  };

  return (
    <g
      onMouseDown={handleMouseDown}
      style={{
        cursor: selectionMode ? 'pointer' : isDragging ? 'grabbing' : 'grab',
      }}
      className="transition-transform duration-150"
    >
      <circle
        cx={node.x}
        cy={node.y}
        r={22}
        className={`opacity-40 ${getNodeColor()}`}
        filter="blur(8px)"
      />

      <circle
        cx={node.x}
        cy={node.y}
        r={20}
        className={`${getNodeColor()} transition-all duration-200 
                   hover:brightness-110 stroke-slate-900 stroke-2`}
      />

      <text
        x={node.x}
        y={node.y}
        dy=".3em"
        textAnchor="middle"
        className="fill-slate-900 text-sm font-bold select-none pointer-events-none"
      >
        {node.id}
      </text>

      {distance !== undefined && (
        <text
          x={node.x}
          y={node.y + 35}
          textAnchor="middle"
          className="fill-slate-300 text-xs font-medium select-none pointer-events-none"
        >
          {distance === Infinity ? '∞' : distance}
        </text>
      )}

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
