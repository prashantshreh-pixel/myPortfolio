import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Code, Terminal, CheckCircle2, ArrowRight, Eye } from 'lucide-react';
import { TimelineItem } from '../types';
import { audioEngine } from '../utils/AudioEngine';
import { useBodyScrollLock } from '../utils/scrollLock';

interface MemoryFragmentModalProps {
  item: TimelineItem | null;
  onClose: () => void;
}

export const MemoryFragmentModal: React.FC<MemoryFragmentModalProps> = ({ item, onClose }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Lock background page scroll completely
  useBodyScrollLock(!!item);

  // Reset scroll to top on item open
  useEffect(() => {
    if (item && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [item]);

  if (!item) return null;

  const handleJumpToProject = () => {
    if (!item) return;
    audioEngine.playSlash();
    const targetId = item.projectId || 'projects';
    onClose();
    setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        const sec = document.getElementById('projects');
        if (sec) sec.scrollIntoView({ behavior: 'smooth' });
      }
    }, 120);
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-hidden select-none"
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
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="modal-scrollable overscroll-contain relative w-full max-w-3xl max-h-[90vh] glass-panel border border-red-600/60 p-6 sm:p-8 bg-[#0a0a0c] text-white shadow-[0_0_50px_rgba(220,38,38,0.3)] overflow-y-auto flex flex-col justify-between"
        >
          {/* Header */}
          <div>
            <div className="flex justify-between items-start pb-5 border-b border-white/10">
              <div>
                <div className="flex items-center gap-3 text-xs font-mono text-red-500 tracking-widest uppercase mb-1 font-bold">
                  <Terminal size={14} />
                  <span>MEMORY FRAGMENT // {item.period}</span>
                  <span className="text-zinc-600">|</span>
                  <span className="text-white font-bold">{item.kanji}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white font-display">
                  {item.title}
                </h3>
              </div>
              <button
                onClick={() => {
                  audioEngine.playHover();
                  onClose();
                }}
                className="p-2.5 bg-zinc-900 text-zinc-400 hover:text-white hover:bg-red-600 border border-white/10 transition-all shrink-0 ml-3"
                title="Close Fragment"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="mt-6 space-y-6">
              <p className="text-zinc-300 text-sm leading-relaxed font-light">
                {item.description}
              </p>

              {/* Highlights */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3 flex items-center gap-2 font-mono">
                  <CheckCircle2 size={14} className="text-red-500" />
                  Evolution Milestones & Key Feats
                </h4>
                <ul className="space-y-2">
                  {item.highlights.map((h, i) => (
                    <li key={i} className="text-xs text-zinc-300 flex items-start gap-2 bg-white/5 p-2.5 border-l-2 border-red-600">
                      <span className="text-red-500 font-mono font-bold">0{i + 1}.</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Code Fragment */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2 font-mono">
                    <Code size={14} className="text-red-500" />
                    Code Architecture Extract
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">C# / .NET SYSTEM RUNTIME</span>
                </div>
                <pre className="p-4 bg-[#030304] border border-white/10 font-mono text-xs text-red-400 overflow-x-auto leading-relaxed max-h-56">
                  <code>{item.memoryFragmentCode}</code>
                </pre>
              </div>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                {item.techUsed.map((t) => (
                  <span key={t} className="px-3 py-1 bg-red-950/40 border border-red-600/30 text-red-300 font-mono text-[10px] uppercase tracking-widest">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-8 pt-4 border-t border-white/10 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
            {item.projectId && (
              <button
                onClick={handleJumpToProject}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-zinc-900 hover:bg-white text-white hover:text-black font-black uppercase text-xs tracking-widest border border-white/20 hover:border-red-500 transition-all shadow-md active:scale-95 text-center w-full sm:w-auto"
              >
                <Eye size={15} className="text-red-500" />
                <span>VIEW PROJECT MISSION</span>
                <ArrowRight size={14} />
              </button>
            )}

            <button
              onClick={() => {
                audioEngine.playSlash();
                onClose();
              }}
              className={`px-7 py-2.5 bg-red-600 hover:bg-white text-white hover:text-black font-black uppercase text-xs tracking-widest transition-all shadow-[0_0_15px_rgba(220,38,38,0.4)] active:scale-95 text-center flex items-center justify-center w-full sm:w-auto ${item.projectId ? 'sm:ml-auto' : 'sm:ml-auto'}`}
            >
              CLOSE FRAGMENT
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
