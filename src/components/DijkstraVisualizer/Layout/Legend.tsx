interface LegendItem {
  color: string;
  description: string;
}

const legendItems: LegendItem[] = [
  { color: 'bg-emerald-400', description: 'Start Node' },
  { color: 'bg-pink-400', description: 'End Node' },
  { color: 'bg-amber-400', description: 'Path Node' },
  { color: 'bg-violet-400', description: 'Via Node' },
  { color: 'bg-slate-400', description: 'Regular Node' },
];

const Legend = () => {
  return (
    <div className="flex gap-6 text-sm bg-slate-700/50 p-4 rounded-lg">
      {legendItems.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${item.color}`} />
          <span>{item.description}</span>
        </div>
      ))}
    </div>
  );
};

export default Legend;
