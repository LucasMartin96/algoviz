import { Edge as EdgeType } from '../../../utils/dijkstra';

interface EdgeProps {
  edge: EdgeType;
  nodePositions: { [key: string]: { x: number; y: number } };
  isInPath: boolean;
  onRemove: () => void;
}

const Edge: React.FC<EdgeProps> = ({
  edge,
  nodePositions,
  isInPath,
  onRemove,
}) => {
  const source = nodePositions[edge.source];
  const target = nodePositions[edge.target];

  if (!source || !target) return null;

  const midX = (source.x + target.x) / 2;
  const midY = (source.y + target.y) / 2;

  return (
    <g>
      <line
        x1={source.x}
        y1={source.y}
        x2={target.x}
        y2={target.y}
        className={`stroke-2 ${
          isInPath ? 'stroke-amber-400' : 'stroke-slate-600'
        } transition-colors duration-200`}
      />

      <g transform={`translate(${midX}, ${midY})`}>
        <rect
          x="-12"
          y="-12"
          width="24"
          height="24"
          rx="4"
          className="fill-slate-800/90"
        />
        <text
          textAnchor="middle"
          dy=".3em"
          className="fill-slate-300 text-xs font-medium select-none"
        >
          {edge.weight}
        </text>
      </g>

      <g
        transform={`translate(${midX}, ${midY})`}
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="cursor-pointer opacity-0 hover:opacity-100 transition-opacity duration-200"
      >
        <circle
          cx="20"
          cy="-20"
          r="8"
          className="fill-slate-800 stroke-pink-400 stroke-2"
        />
        <text
          x="20"
          y="-20"
          textAnchor="middle"
          dy=".3em"
          className="fill-pink-400 text-xs font-bold select-none"
        >
          ×
        </text>
      </g>
    </g>
  );
};

export default Edge;
