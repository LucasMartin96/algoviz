import { useState } from 'react';
import Button from '../../ui/Button';
import InfoPanel from '../UI/InfoPanel';
import { useGraph } from '../Context/GraphContext';
import { useAlgorithm } from '../Context/AlgorithmContext';
import { useSelection } from '../Context/SelectionContext';

const Header: React.FC = () => {
  const [showInfo, setShowInfo] = useState(false);
  const { generateNewRandomGraph, addNode } = useGraph();
  const { calculateShortestPath, resetAlgorithm } = useAlgorithm();
  const { setSelectionMode, selectionMode } = useSelection();

  const handleReset = () => {
    resetAlgorithm();
    generateNewRandomGraph();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Dijkstra&apos;s Algorithm Visualizer
            </h2>
            <p className="text-slate-300">
              Find the shortest path between nodes
            </p>
          </div>
          <InfoPanel
            isOpen={showInfo}
            onToggle={() => setShowInfo(!showInfo)}
          />
        </div>

        <div className="flex flex-wrap gap-2 items-start justify-end">
          <Button variant="secondary" onClick={addNode}>
            Add Node
          </Button>
          <Button
            variant="success"
            onClick={() =>
              setSelectionMode(selectionMode === 'start' ? null : 'start')
            }
            isActive={selectionMode === 'start'}
          >
            Set Start
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              setSelectionMode(selectionMode === 'via' ? null : 'via')
            }
            isActive={selectionMode === 'via'}
          >
            Add Via Node
          </Button>
          <Button
            variant="danger"
            onClick={() =>
              setSelectionMode(selectionMode === 'end' ? null : 'end')
            }
            isActive={selectionMode === 'end'}
          >
            Set End
          </Button>
          <Button variant="secondary" onClick={calculateShortestPath}>
            Calculate Path
          </Button>
          <Button variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
