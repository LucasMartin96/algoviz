import React from 'react';
import { cn } from '@/utils/cn';

interface SliderProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
}

// TODO: Manejar las clases desde un archivoooooo! 
const Slider: React.FC<SliderProps> = ({
  min,
  max,
  value,
  onChange,
  className,
  ...props
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value));
  };

  return (
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={handleChange}
      className={cn(
        'w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer',
        'accent-blue-500',
        '[&::-webkit-slider-thumb]:w-4',
        '[&::-webkit-slider-thumb]:h-4',
        '[&::-webkit-slider-thumb]:rounded-full',
        '[&::-webkit-slider-thumb]:bg-blue-500',
        '[&::-webkit-slider-thumb]:appearance-none',
        '[&::-moz-range-thumb]:w-4',
        '[&::-moz-range-thumb]:h-4',
        '[&::-moz-range-thumb]:rounded-full',
        '[&::-moz-range-thumb]:bg-blue-500',
        '[&::-moz-range-thumb]:border-0',
        className
      )}
      {...props}
    />
  );
};

export default Slider;
