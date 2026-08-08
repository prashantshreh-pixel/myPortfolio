import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Flame, Code } from 'lucide-react';
import { SkillItem } from '../types';
import { audioEngine } from '../utils/AudioEngine';
import { useBodyScrollLock } from '../utils/scrollLock';

interface ZanpakutoDrawerProps {
  skill: SkillItem | null;
  onClose: () => void;
}

export const ZanpakutoDrawer: React.FC<ZanpakutoDrawerProps> = ({ skill, onClose }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Lock background page scroll completely
  useBodyScrollLock(!!skill);

  // Reset scroll to top every time a new skill is opened
  useEffect(() => {
    if (skill && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [skill]);

  if (!skill) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[100] flex justify-end bg-black/85 backdrop-blur-md overflow-hidden select-none"
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => {
          if (e.target === e.currentTarget) e.preventDefault();
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            audioEngine.playHover();
            onClose();
          }
        }}
      >
        <motion.div
          ref={scrollContainerRef}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 26, stiffness: 220 }}
          className="modal-scrollable overscroll-contain relative w-full max-w-xl h-full bg-[#08080a] border-l border-red-600/70 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto text-white shadow-[-25px_0_60px_rgba(220,38,38,0.4)] z-[101]"
        >
          {/* Main Top & Content Section */}
          <div>
            {/* Static Top Header with Title and Prominent Close Button */}
            <div className="pb-5 border-b border-white/10 flex justify-between items-start gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-red-500 tracking-widest uppercase mb-1.5 font-bold">
                  <Flame size={14} className="text-red-500 animate-pulse" />
                  <span>ZANPAKUTO SPECIFICATION // {skill.category}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight font-display leading-snug">
                  {skill.name}
                </h3>
              </div>

              {/* Prominent Close X Button */}
              <button
                onClick={() => {
                  audioEngine.playHover();
                  onClose();
                }}
                className="p-2.5 bg-zinc-900 hover:bg-red-600 text-zinc-300 hover:text-white border border-white/20 hover:border-red-500 transition-all shrink-0 active:scale-95 shadow-lg"
                title="Close Specification"
              >
                <X size={20} />
              </button>
            </div>

            {/* Release Phrase Box */}
            <div className="mt-6 p-4 glass-panel border-l-4 border-red-600 bg-red-950/20">
              <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1.5 flex justify-between items-center">
                <span>RELEASE COMMAND</span>
                <span className="text-white font-mono font-bold text-sm bg-black/50 px-2 py-0.5 border border-white/10">{skill.kanji}</span>
              </div>
              <p className="text-sm font-serif italic text-red-400 font-semibold leading-relaxed">
                "{skill.commandPhrase}"
              </p>
            </div>

            {/* Description & Technical Breakdown */}
            <div className="mt-6 space-y-6">
              <div>
                <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1.5 font-bold">
                  CORE SYSTEM RESPONSIBILITY
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed font-light">
                  {skill.description}
                </p>
              </div>

              {/* Spiritual Proficiency Gauge */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-400">SPIRITUAL PROFICIENCY RESONANCE</span>
                  <span className="text-red-500 font-bold">{skill.proficiency}%</span>
                </div>
                <div className="w-full h-2 bg-zinc-900 border border-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.proficiency}%` }}
                    transition={{ duration: 1 }}
                    className="h-full bg-gradient-to-r from-red-800 to-red-500"
                  />
                </div>
              </div>

              {/* Bankai Form Name */}
              <div className="pt-2">
                <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1.5">
                  BANKAI FORM EVOLUTION
                </div>
                <div className="p-3 bg-zinc-950 border border-white/10 text-white font-mono text-xs uppercase tracking-wider text-red-400 font-bold flex items-center gap-2">
                  <span className="text-red-500">⚡</span>
                  <span>{skill.bankaiForm}</span>
                </div>
              </div>

              {/* Code Implementation Extract */}
              <div className="pt-2">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-1.5 font-bold">
                    <Code size={14} className="text-red-500" />
                    IMPLEMENTATION EXTRACT
                  </span>
                </div>
                <pre className="p-4 bg-black border border-white/10 text-xs font-mono text-red-300 overflow-x-auto leading-relaxed max-h-60">
                  <code>{skill.codeSnippet}</code>
                </pre>
              </div>
            </div>
          </div>

          {/* Static Footer Action */}
          <div className="pt-6 mt-8 border-t border-white/10">
            <button
              onClick={() => {
                audioEngine.playSlash();
                onClose();
              }}
              className="w-full py-3.5 bg-red-600 hover:bg-white text-white hover:text-black font-black uppercase text-xs tracking-[0.3em] transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] active:scale-[0.99]"
            >
              CLOSE SPECIFICATION
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
