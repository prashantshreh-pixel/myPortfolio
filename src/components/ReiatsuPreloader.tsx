import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { audioEngine } from '../utils/AudioEngine';

interface ReiatsuPreloaderProps {
  onComplete: () => void;
}

export const ReiatsuPreloader: React.FC<ReiatsuPreloaderProps> = ({ onComplete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const COLUMN_COUNT = 35;

  const columns = useMemo(() => {
    const cols = [];
    let totalWidth = 0;
    const widths = [];
    
    // Generate random uneven widths
    for (let i = 0; i < COLUMN_COUNT; i++) {
      const w = 2 + Math.random() * 4;
      widths.push(w);
      totalWidth += w;
    }
    
    for (let i = 0; i < COLUMN_COUNT; i++) {
      const widthPct = (widths[i] / totalWidth) * 100;
      const normalizedPosition = Math.abs((i / (COLUMN_COUNT - 1)) * 2 - 1);
      
      // Base height forms an oval (center is shorter, edges are longer)
      const baseHeight = 50 + Math.pow(normalizedPosition, 1.5) * 40; 
      
      const topHeight = Math.min(120, Math.max(50, baseHeight + (Math.random() * 40) - 10));
      const bottomHeight = Math.min(120, Math.max(50, baseHeight + (Math.random() * 40) - 10));
      
      // Delay: center opens slightly earlier
      const delay = 0.1 + (normalizedPosition * 0.4) + (Math.random() * 0.2);
      
      cols.push({ width: widthPct, topHeight, bottomHeight, delay });
    }
    return cols;
  }, []);

  useEffect(() => {
    // Reset window scroll to top so home hero displays first
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Play sound and trigger split
    const startTimer = setTimeout(() => {
      audioEngine.playSlash();
      setIsOpen(true);
    }, 400);

    // Complete transition after longest delay + duration
    const maxDelay = Math.max(...columns.map(c => c.delay));
    const endTimer = setTimeout(() => {
      setIsFinished(true);
      window.scrollTo({ top: 0, behavior: 'instant' });
      onComplete();
    }, 400 + (maxDelay + 1.5) * 1000);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(endTimer);
    };
  }, [columns, onComplete]);

  if (isFinished) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden select-none">
        {/* Sky Split Grid Container */}
        <div className="absolute inset-0 flex w-full h-full z-40">
          {columns.map((col, index) => {
            return (
              <div key={index} className="relative h-full border-r border-black/40" style={{ width: `${col.width}%` }}>
                {/* TOP SLIT PANEL */}
                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: isOpen ? '-101%' : 0 }}
                  transition={{
                    duration: 1.5,
                    delay: col.delay,
                    ease: [0.76, 0, 0.24, 1], // Cinematic smooth easing
                  }}
                  className="w-full absolute top-0 left-0 bg-[#0a0202] overflow-hidden border-b border-red-900/60 backdrop-blur-md"
                  style={{ height: `${col.topHeight}%` }}
                >
                  {/* Crimson Spiritual Energy Texture Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#1c0404] via-[#0d0202] to-[#050505] opacity-95" />
                  
                  {/* Spiritual Aura Radial Blurs & Manga Lines */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(220,38,38,0.35),transparent_60%),radial-gradient(circle_at_70%_60%,rgba(153,27,27,0.25),transparent_50%)] backdrop-blur-[2px]" />
                  <div className="absolute inset-0 bg-manga-lines opacity-20 pointer-events-none" />

                  {/* Jagged / Torn Seam Edge with Red Glow at bottom of top panel */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-600/80 shadow-[0_0_12px_rgba(220,38,38,0.8)]" />
                  <div className="absolute -bottom-1 left-0 right-0 h-3 bg-red-600/30 blur-[2px]" />
                </motion.div>

                {/* BOTTOM SLIT PANEL */}
                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: isOpen ? '101%' : 0 }}
                  transition={{
                    duration: 1.5,
                    delay: col.delay,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                  className="w-full absolute bottom-0 left-0 bg-[#0a0202] overflow-hidden border-t border-red-900/60 backdrop-blur-md"
                  style={{ height: `${col.bottomHeight}%` }}
                >
                  {/* Crimson Spiritual Energy Texture Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c0404] via-[#0d0202] to-[#050505] opacity-95" />

                  {/* Spiritual Aura Radial Blurs & Manga Lines */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_80%,rgba(220,38,38,0.35),transparent_60%),radial-gradient(circle_at_80%_30%,rgba(153,27,27,0.25),transparent_50%)] backdrop-blur-[2px]" />
                  <div className="absolute inset-0 bg-manga-lines opacity-20 pointer-events-none" />

                  {/* Jagged / Torn Seam Edge with Red Glow at top of bottom panel */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-red-600/80 shadow-[0_0_12px_rgba(220,38,38,0.8)]" />
                  <div className="absolute -top-1 left-0 right-0 h-3 bg-red-600/30 blur-[2px]" />
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Center Loader GIF */}
        <motion.div
          animate={{ opacity: isOpen ? 0 : 1, scale: isOpen ? 1.5 : 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none mix-blend-screen"
        >
          <img src="/assets/loading v2.gif" alt="Loading..." className="w-32 h-32 sm:w-48 sm:h-48 object-cover rounded-[50%] overflow-hidden drop-shadow-[0_0_20px_rgba(220,38,38,0.8)]" />
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

