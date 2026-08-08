import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { audioEngine } from '../utils/AudioEngine';

interface ReiatsuPreloaderProps {
  onComplete: () => void;
}

export const ReiatsuPreloader: React.FC<ReiatsuPreloaderProps> = ({ onComplete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Number of vertical sky slit columns
  const COLUMN_COUNT = 10;

  // Generate randomized delays for each column so they open staggered & slowly
  const columnDelays = useMemo(() => {
    // Random delays between 0.1s and 0.9s
    const delays = [0.25, 0.05, 0.55, 0.1, 0.7, 0.3, 0.8, 0.15, 0.4, 0.65];
    return delays;
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
    const maxDelay = Math.max(...columnDelays);
    const endTimer = setTimeout(() => {
      setIsFinished(true);
      window.scrollTo({ top: 0, behavior: 'instant' });
      onComplete();
    }, 400 + (maxDelay + 1.5) * 1000);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(endTimer);
    };
  }, [columnDelays, onComplete]);

  if (isFinished) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden select-none">
        {/* Sky Split Grid Container */}
        <div className="absolute inset-0 flex w-full h-full z-40">
          {Array.from({ length: COLUMN_COUNT }).map((_, index) => {
            const delay = columnDelays[index % columnDelays.length];

            return (
              <div key={index} className="relative flex-1 h-full flex flex-col border-r border-black/40">
                {/* TOP SLIT PANEL */}
                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: isOpen ? '-101%' : 0 }}
                  transition={{
                    duration: 1.5,
                    delay: delay,
                    ease: [0.76, 0, 0.24, 1], // Cinematic smooth easing
                  }}
                  className="w-full flex-1 bg-[#0a0202] relative overflow-hidden border-b border-red-900/60 backdrop-blur-md"
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
                    delay: delay,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                  className="w-full flex-1 bg-[#0a0202] relative overflow-hidden border-t border-red-900/60 backdrop-blur-md"
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
      </div>
    </AnimatePresence>
  );
};

