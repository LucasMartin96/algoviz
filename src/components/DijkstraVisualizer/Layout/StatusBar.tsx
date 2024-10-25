import Badge from '../UI/Badge';
import { useAlgorithm } from '../Context/AlgorithmContext';

const StatusBar: React.FC = () => {
  const {
    startNode,
    endNode,
    viaNodes,
    shortestPath,
    noPathExists,
    removeViaNode,
  } = useAlgorithm();

  return (
    <div className="flex items-center gap-6 bg-slate-700/50 p-4 rounded-lg">
      <div className="flex items-center gap-2">
        <Badge color="emerald">Start: {startNode || 'Not set'}</Badge>
      </div>
      <div className="flex items-center gap-2">
        <Badge color="pink">End: {endNode || 'Not set'}</Badge>
      </div>

      {viaNodes.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-slate-300">Via:</span>
          {viaNodes.map((nodeId) => (
            <Badge
              key={nodeId}
              color="violet"
              onRemove={() => removeViaNode(nodeId)}
            >
              Node {nodeId}
            </Badge>
          ))}
        </div>
      )}

      {noPathExists ? (
        <Badge color="pink">
          No path exists between {startNode} and {endNode}
        </Badge>
      ) : (
        shortestPath.length > 0 && (
          <Badge color="amber">Path: {shortestPath.join(' → ')}</Badge>
        )
      )}
    </div>
  );
};

export default StatusBar;
