interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Array<{ value: string; label: string }>;
  error?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm text-slate-300">{label}</label>}
      <select
        className={`
          px-3 py-1 bg-slate-800 border border-slate-600 rounded-md text-sm
          text-white
          focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500
          appearance-none cursor-pointer
          bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik01Ljk5OTg5IDQuOTc2NzFMMTAuMTI0OSAwLjg1MTcwOEwxMS4zMDMyIDIuMDMwMDRMNS45OTk4OSA3LjMzMzM3TDAuNjk2NTU1IDIuMDMwMDRMMS44NzQ4OSAwLjg1MTcwOEw1Ljk5OTg5IDQuOTc2NzFaIiBmaWxsPSIjOTRBM0I4Ii8+Cjwvc3ZnPgo=')] 
          bg-[length:12px_8px] bg-[right_12px_center] bg-no-repeat
          pr-10
          ${className}
        `}
        {...props}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="text-white bg-slate-800"
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-pink-400">{error}</span>}
    </div>
  );
};

export default Select;
