import React from 'react';

export const HollowMaskLogo: React.FC<{ className?: string }> = ({ className = 'w-9 h-11' }) => {
  return (
    <div className={`relative inline-block ${className} group-hover:scale-105 transition-transform duration-300 rounded-full overflow-hidden border border-red-600/50 shadow-[0_0_10px_rgba(220,38,38,0.5)]`}>
      <img 
        src="/assets/urahara.jpg" 
        alt="Substitute Shinigami Badge" 
        className="w-full h-full object-cover object-top"
      />
    </div>
  );
};
