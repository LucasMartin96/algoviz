interface InfoPanelProps {
  isOpen: boolean;
  onToggle: () => void;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ isOpen, onToggle }) => {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="text-sm text-slate-400 hover:text-slate-200 flex items-center gap-1"
      >
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
        {isOpen ? 'Hide Information' : 'Show Information'}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 z-10 mt-2 w-[400px] bg-slate-700/50 p-4 rounded-lg space-y-4 text-slate-200 backdrop-blur-sm border border-slate-600 shadow-xl">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              About Dijkstra&apos;s Algorithm
            </h3>
            <p className="text-sm leading-relaxed">
              Dijkstra&apos;s algorithm is a graph search algorithm that solves
              the single-source shortest path problem for a graph with
              non-negative edge weights. It was conceived by computer scientist
              Edsger W. Dijkstra in 1956.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              How to Use
            </h3>
            <ul className="text-sm space-y-2">
              <li>
                • Click <span className="text-slate-300">Add Node</span> to
                create new nodes
              </li>
              <li>
                • Use <span className="text-slate-300">Add Edge</span> to
                connect nodes
              </li>
              <li>
                • Set <span className="text-emerald-300">Start</span> and{' '}
                <span className="text-pink-300">End</span> nodes
              </li>
              <li>
                • Optionally add <span className="text-violet-300">Via</span>{' '}
                nodes
              </li>
              <li>
                • Click <span className="text-slate-300">Calculate Path</span>{' '}
                to find the shortest route
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoPanel;
