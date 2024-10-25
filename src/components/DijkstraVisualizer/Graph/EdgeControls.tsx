import { useState } from 'react';
import { useGraph } from '../Context/GraphContext';
import Button from '../../ui/Button';

interface EdgeControlsProps {
  onNodeSelect: (nodeId: string) => void;
  selectedSource: string | null;
  selectedTarget: string | null;
  onReset: () => void;
  isEdgeMode: boolean;
  setIsEdgeMode: (mode: boolean) => void;
}

const EdgeControls: React.FC<EdgeControlsProps> = ({
  selectedSource,
  selectedTarget,
  onReset,
  isEdgeMode,
  setIsEdgeMode,
}) => {
  const { addEdge } = useGraph();
  const [weight, setWeight] = useState<number>(1);

  const handleAddEdge = () => {
    if (selectedSource && selectedTarget) {
      addEdge(selectedSource, selectedTarget, weight);
      onReset();
      setWeight(1);
    }
  };

  return (
    <div className="absolute top-4 left-4 bg-slate-800/90 p-4 rounded-lg backdrop-blur-sm border border-slate-700 shadow-xl">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Button
            variant={isEdgeMode ? 'primary' : 'secondary'}
            onClick={() => {
              setIsEdgeMode(!isEdgeMode);
              if (isEdgeMode) onReset();
            }}
            size="sm"
          >
            Add Edge
          </Button>
          {isEdgeMode && (
            <Button
              variant="danger"
              onClick={() => {
                onReset();
                setIsEdgeMode(false);
              }}
              size="sm"
            >
              Cancel
            </Button>
          )}
        </div>

        {isEdgeMode && (
          <div className="space-y-2">
            <div className="text-sm text-slate-300">
              {!selectedSource
                ? 'Select first node'
                : !selectedTarget
                  ? 'Select second node'
                  : 'Set weight and confirm'}
            </div>

            {(selectedSource || selectedTarget) && (
              <div className="flex items-center gap-2 text-sm text-slate-400">
                {selectedSource && <span>From: {selectedSource}</span>}
                {selectedSource && selectedTarget && <span>→</span>}
                {selectedTarget && <span>To: {selectedTarget}</span>}
              </div>
            )}

            {selectedSource && selectedTarget && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    value={weight}
                    onChange={(e) =>
                      setWeight(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="w-20 px-2 py-1 bg-slate-700 border border-slate-600 rounded text-white text-sm"
                  />
                  <Button variant="success" onClick={handleAddEdge} size="sm">
                    Confirm
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EdgeControls;
