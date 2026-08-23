import React from 'react';

interface TechTagProps {
  tech: string;
  variant?: 'default' | 'red';
  size?: 'sm' | 'md';
}

export const TechTag: React.FC<TechTagProps> = ({
  tech,
  variant = 'default',
  size = 'sm',
}) => {
  const baseClasses = 'font-mono uppercase tracking-wider transition-all duration-300';
  const sizeClasses = size === 'sm'
    ? 'text-[10px] px-2 sm:px-2.5 py-0.5 sm:py-1'
    : 'text-xs px-3 py-1';

  const variantClasses = variant === 'red'
    ? 'bg-red-950/40 border border-red-600/30 text-red-300'
    : 'bg-zinc-900 border border-white/10 text-zinc-300';

  return (
    <span className={`${baseClasses} ${sizeClasses} ${variantClasses}`}>
      {tech}
    </span>
  );
};
