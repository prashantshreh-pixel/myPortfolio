import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Github, Cpu, BarChart2, Layers, ExternalLink } from 'lucide-react';
import { ProjectItem } from '../types';
import { audioEngine } from '../utils/AudioEngine';
import { useBodyScrollLock } from '../utils/scrollLock';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Lock background page scroll completely
  useBodyScrollLock(!!project);

  // Reset scroll to top on project open
  useEffect(() => {
    if (project && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [project]);

  if (!project) return null;

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
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          className="modal-scrollable overscroll-contain relative w-full max-w-4xl max-h-[90vh] border border-red-600/60 p-6 sm:p-10 bg-[#070709] text-white shadow-[0_0_60px_rgba(220,38,38,0.35)] overflow-y-auto flex flex-col justify-between"
        >
          {/* Header */}
          <div>
            <div className="flex justify-between items-start pb-6 border-b border-white/10">
              <div>
                <div className="flex items-center gap-3 text-xs font-mono text-red-500 tracking-widest uppercase mb-1 font-bold">
                  <span>PROJECT CASE STUDY // {project.code}</span>
                  <span className="text-zinc-600">|</span>
                  <span className="text-white font-bold">{project.kanjiOverlay}</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white font-display">
                  {project.title}
                </h3>
              </div>
              <button
                onClick={() => {
                  audioEngine.playHover();
                  onClose();
                }}
                className="p-2.5 bg-zinc-900 text-zinc-400 hover:text-white hover:bg-red-600 border border-white/10 transition-all shrink-0 ml-3"
                title="Close Case Study"
              >
                <X size={22} />
              </button>
            </div>

            {/* Content */}
            <div className="mt-6 space-y-8">
              {/* Banner Image */}
              <div className="relative h-60 sm:h-80 w-full overflow-hidden border border-white/10">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full contrast-125 ${project.imagePosition || 'object-cover object-center'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-transparent" />
                <div className="absolute top-4 left-4 px-3 py-1 bg-red-600 text-white font-mono text-xs uppercase font-bold tracking-widest">
                  {project.category}
                </div>
              </div>

              {/* Description & Tagline */}
              <div>
                <p className="text-red-400 font-mono text-sm uppercase tracking-wider font-semibold mb-2">
                  {project.tagline}
                </p>
                <p className="text-zinc-300 text-sm leading-relaxed font-light">
                  {project.description}
                </p>
              </div>

              {/* Performance Metrics */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 mb-3 flex items-center gap-2">
                  <BarChart2 size={16} className="text-red-500" />
                  KEY SYSTEM PERFORMANCE BENCHMARKS
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {project.metrics.map((m, i) => (
                    <div key={i} className="p-4 glass-panel border border-white/10 bg-zinc-900/50">
                      <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                        {m.label}
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-red-500 font-mono mt-1">
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Architecture Diagram */}
              {project.architectureDiagram && (
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 mb-2 flex items-center gap-2">
                    <Cpu size={16} className="text-red-500" />
                    DISTRIBUTED SYSTEM ARCHITECTURE FLOW
                  </h4>
                  <pre className="p-4 bg-black border border-white/10 font-mono text-xs text-red-400 overflow-x-auto leading-relaxed">
                    <code>{project.architectureDiagram}</code>
                  </pre>
                </div>
              )}

              {/* Tech Stack Tags */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 mb-2 flex items-center gap-2">
                  <Layers size={16} className="text-red-500" />
                  TECHNOLOGY STACK
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-red-950/40 border border-red-600/30 text-red-300 font-mono text-xs uppercase tracking-wider"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5">
              {/* Multiple Live URLs */}
              {project.liveUrls &&
                project.liveUrls.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => audioEngine.playSlash()}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-white text-white hover:text-black font-black uppercase text-xs tracking-widest border border-red-500 transition-all shadow-[0_0_15px_rgba(220,38,38,0.4)] active:scale-95 text-center"
                  >
                    <ExternalLink size={15} />
                    <span>{link.label}</span>
                  </a>
                ))}

              {/* Single Live URL fallback */}
              {project.liveUrl && !project.liveUrls && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => audioEngine.playSlash()}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-white text-white hover:text-black font-black uppercase text-xs tracking-widest border border-red-500 transition-all shadow-[0_0_15px_rgba(220,38,38,0.4)] active:scale-95 text-center"
                >
                  <ExternalLink size={15} />
                  <span>VISIT LIVE PLATFORM</span>
                </a>
              )}

              {/* Source Code Repository (Only if present) */}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => audioEngine.playSlash()}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-zinc-900 hover:bg-white text-white hover:text-black font-black uppercase text-xs tracking-widest border border-white/20 transition-all shadow-md active:scale-95 text-center"
                >
                  <Github size={15} />
                  <span>SOURCE REPOSITORY</span>
                </a>
              )}
            </div>

            <button
              onClick={() => {
                audioEngine.playSlash();
                onClose();
              }}
              className="px-7 py-2.5 bg-zinc-800 hover:bg-red-600 text-zinc-300 hover:text-white font-black uppercase text-xs tracking-widest border border-white/10 hover:border-red-500 transition-all shadow-md sm:ml-auto active:scale-95 text-center flex items-center justify-center"
            >
              CLOSE CASE STUDY
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
