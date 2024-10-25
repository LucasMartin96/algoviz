interface BadgeProps {
  color?: 'emerald' | 'pink' | 'amber' | 'violet' | 'slate';
  children: React.ReactNode;
  onRemove?: () => void;
}

const Badge: React.FC<BadgeProps> = ({
  color = 'slate',
  children,
  onRemove,
}) => {
  const colorStyles = {
    emerald: 'bg-emerald-500/20 text-emerald-300',
    pink: 'bg-pink-500/20 text-pink-300',
    amber: 'bg-amber-500/20 text-amber-300',
    violet: 'bg-violet-500/20 text-violet-300',
    slate: 'bg-slate-500/20 text-slate-300',
  };

  return (
    <span
      className={`
        px-2 py-1 rounded-md text-sm flex items-center gap-1
        ${colorStyles[color]}
      `}
    >
      {children}
      {onRemove && (
        <button
          onClick={onRemove}
          className={`
            ml-1 hover:text-white transition-colors duration-200
            ${colorStyles[color].split(' ')[1]}
          `}
        >
          ×
        </button>
      )}
    </span>
  );
};

export default Badge;
