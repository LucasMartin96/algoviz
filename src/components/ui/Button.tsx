import React from 'react';
import { buttonStyles } from '@/styles/buttons';
import { cn } from '@/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isActive?: boolean;
}

// TODO: Ver porque carajo esto no anda con los botones de style, es rarisimo
const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'secondary',
  size = 'md',
  isActive = false,
  className = '',
  ...props
}) => {
  const variantStyles = {
    primary: isActive
      ? 'bg-violet-500 text-white shadow-violet-500/20'
      : 'text-slate-200 hover:bg-violet-700 bg-slate-700',
    secondary: isActive
      ? 'bg-slate-600 text-white shadow-slate-500/20'
      : 'bg-slate-700 text-slate-200 hover:bg-blue-600',
    success: isActive
      ? 'bg-emerald-500 text-white shadow-emerald-500/20'
      : 'bg-slate-700 text-slate-200 hover:bg-emerald-600',
    danger: isActive
      ? 'bg-pink-500 text-white shadow-pink-500/20'
      : 'bg-slate-700 text-slate-200 hover:bg-pink-600',
  };

  const sizeStyles = buttonStyles.sizes[size];

  return (
    <button
      className={cn(
        buttonStyles.base,
        variantStyles[variant],
        sizeStyles,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
