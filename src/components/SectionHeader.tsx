import React from 'react';
import { motion } from 'motion/react';

interface SectionHeaderProps {
  number: string;
  category: string;
  title: string;
  subtitle: string;
  lineColor?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  number,
  category,
  title,
  subtitle,
  lineColor = 'bg-red-600 shadow-[0_0_15px_rgba(204,0,0,0.8)]',
}) => {
  return (
    <div className="mb-14 sm:mb-20">
      <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.4em] text-red-500 mb-2 font-bold">
        <span>{number} // {category}</span>
      </div>
      <motion.h2
        initial={{ x: -30, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tight text-white font-display relative w-fit"
      >
        {title}
      </motion.h2>
      <div className={`h-1 w-24 sm:w-32 ${lineColor} mt-3`} />
      <p className="text-zinc-400 mt-3 sm:mt-4 uppercase font-mono tracking-widest text-xs sm:text-sm">
        {subtitle}
      </p>
    </div>
  );
};
