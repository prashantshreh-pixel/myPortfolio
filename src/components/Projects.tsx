import React, { useState, useEffect, useRef } from 'react';
import { PROJECTS_DATA } from '../data';
import { ProjectItem } from '../types';
import { ProjectModal } from './ProjectModal';
import { TechTag } from './TechTag';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { audioEngine } from '../utils/AudioEngine';

export const Projects: React.FC = () => {
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const pinRef = useRef<HTMLDivElement>(null);
  const winRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const idxRef = useRef<HTMLUListElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);

  // Smooth pinning and vertical scroll transform (matching projects-vertical-demo)
  useEffect(() => {
    const pin = pinRef.current;
    const win = winRef.current;
    const track = trackRef.current;
    const fill = fillRef.current;
    const idxEl = idxRef.current;
    if (!pin || !win || !track) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const N = PROJECTS_DATA.length;
    const gap = 20;
    let wh = 0;
    let ch = 0;
    let tick = false;

    const measure = () => {
      wh = win.clientHeight;
      const isMobile = window.innerWidth <= 768;
      ch = isMobile
        ? Math.min(480, Math.max(340, wh * 0.72))
        : Math.min(390, Math.max(280, wh * 0.52));

      const cards = track.children;
      for (let i = 0; i < N; i++) {
        const card = cards[i] as HTMLElement;
        if (card) {
          card.style.height = `${ch}px`;
          card.style.top = `${i * (ch + gap)}px`;
        }
      }

      // Height gives 0.72 viewport heights of scroll travel per project card
      pin.style.height = `${window.innerHeight + (N - 1) * window.innerHeight * 0.72}px`;
      update();
    };

    const update = () => {
      tick = false;
      const span = pin.offsetHeight - window.innerHeight;
      if (span <= 0) return;

      const r = pin.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / span));
      const f = p * (N - 1);
      const y = wh / 2 - (f * (ch + gap) + ch / 2);

      track.style.transform = `translate3d(0, ${y}px, 0)`;

      const near = Math.round(f);
      setActiveIndex((prev) => (prev !== near ? near : prev));

      const cards = track.children;
      for (let i = 0; i < N; i++) {
        const card = cards[i] as HTMLElement;
        if (!card) continue;
        const d = i - f;
        const a = Math.min(Math.abs(d), 1.4);
        card.style.opacity = `${1 - 0.65 * Math.min(a, 1)}`;
        card.style.transform = `scale(${1 - 0.05 * a})`;
      }

      if (fill && idxEl) {
        fill.style.height = `${p * Math.max(0, idxEl.offsetHeight - 16)}px`;
      }
    };

    const onScroll = () => {
      if (!tick) {
        tick = true;
        requestAnimationFrame(update);
      }
    };

    const onResize = () => {
      measure();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    measure();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const handleSelectProject = (i: number) => {
    const pin = pinRef.current;
    if (!pin) return;
    audioEngine.playSlash();
    const rect = pin.getBoundingClientRect();
    const pinTop = window.scrollY + rect.top;
    const span = pin.offsetHeight - window.innerHeight;
    const targetScrollY = pinTop + (i / (PROJECTS_DATA.length - 1)) * span;
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  };

  return (
    <section
      ref={pinRef}
      id="projects"
      className={`projects-pin relative overflow-hidden bg-[#050505] ${activeProject ? 'z-50' : 'z-10'}`}
    >
      {/* Background Top & Bottom Smooth Gradient Blends */}
      <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none z-20" />
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-20" />

      {/* Sticky Viewport Container */}
      <div className="projects-stick">
        {/* Left Side: Section Info & Scroll Index List */}
        <div className="projects-side">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.4em] text-red-500 mb-2 font-bold">
            <span>03 // SELECTED WORK</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white font-display">
            PROJECTS
          </h2>
          <div className="h-1 w-20 bg-red-600 mt-2 mb-3 shadow-[0_0_15px_rgba(204,0,0,0.8)]" />
          <p className="text-zinc-400 font-mono text-xs uppercase tracking-widest hidden sm:block">
            High-Pressure System Architecture & Deployed Software
          </p>

          {/* Mobile active project counter */}
          <div className="flex sm:hidden items-center gap-2 text-xs font-mono text-zinc-400 mt-1">
            <span>
              MISSION <strong className="text-red-500">0{activeIndex + 1}</strong> / 0{PROJECTS_DATA.length}
            </span>
            <span className="text-zinc-600">·</span>
            <span className="text-white font-bold truncate">
              {PROJECTS_DATA[activeIndex]?.title.split(' / ')[0]}
            </span>
          </div>

          {/* Interactive Index List on Desktop */}
          <ul className="projects-idx" ref={idxRef}>
            <span className="projects-fill" ref={fillRef} />
            {PROJECTS_DATA.map((item, i) => {
              const isDone = i < activeIndex;
              const isNow = i === activeIndex;
              const shortTitle = item.title.split(' / ')[0];

              return (
                <li
                  key={item.id}
                  onClick={() => handleSelectProject(i)}
                  onMouseEnter={() => audioEngine.playHover()}
                  className={`projects-idx-item ${isDone ? 'done' : ''} ${isNow ? 'now' : ''}`}
                >
                  <span className="line-clamp-1">{shortTitle}</span>
                  <small>
                    {isDone ? 'EXECUTED' : isNow ? '● VIEWING' : 'UP NEXT'}
                  </small>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right Side: Masked Viewport with Sliding Cards Track */}
        <div className="projects-win" ref={winRef}>
          <div className="projects-track" ref={trackRef}>
            {PROJECTS_DATA.map((project, index) => {
              const shortTitle = project.title.split(' / ')[0];
              const isNew = project.id === 'project-bleachtree' || project.id === 'project-hisabflow';
              const isDone = index < activeIndex;
              const isNow = index === activeIndex;

              return (
                <article
                  key={project.id}
                  id={project.id}
                  onClick={() => {
                    audioEngine.playSlash();
                    setActiveProject(project);
                  }}
                  className={`projects-card group ${isNow ? 'now' : ''}`}
                >
                  {/* Left Visual Section */}
                  <div className="projects-card-vis group/vis">
                    <img
                      src={project.image}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className={`w-full h-full grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-40 group-hover:opacity-90 ${project.imagePosition || 'object-cover object-center'}`}
                    />
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 bg-manga-lines opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none" />

                    {/* Top-Left Category Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-black/70 text-zinc-300 border border-white/10 backdrop-blur-md">
                        {project.category}
                      </span>
                      {isNew && (
                        <span className="text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-red-950/80 text-red-400 border border-red-600/50 animate-pulse">
                          NEW
                        </span>
                      )}
                    </div>

                    {/* Top-Right Status Badge */}
                    <span
                      className={`project-status-badge absolute top-3 right-3 text-[10px] font-mono font-bold tracking-widest uppercase px-2.5 py-1 rounded-full transition-all duration-300 ${
                        isDone
                          ? 'bg-zinc-800/90 text-zinc-300 border border-white/10'
                          : isNow
                          ? 'bg-red-600 text-white border border-red-500 shadow-[0_0_12px_rgba(220,38,38,0.7)] animate-pulse'
                          : 'bg-black/60 text-zinc-500 border border-white/5'
                      }`}
                    >
                      {isDone ? 'DONE' : isNow ? 'NOW' : 'NEXT'}
                    </span>

                    {/* Kanji Watermark */}
                    <span className="absolute bottom-2 right-3 text-4xl sm:text-5xl font-black font-mono text-white/10 group-hover:text-red-600/20 transition-colors pointer-events-none select-none">
                      {project.kanjiOverlay}
                    </span>

                    {/* Bottom Key Metric (matches <b> tag in demo) */}
                    <div className="absolute bottom-3 left-3 z-10 text-left pointer-events-none">
                      <div className="text-lg sm:text-2xl font-black font-mono text-white tracking-tight drop-shadow-lg leading-tight">
                        {project.metrics[0]?.value}
                      </div>
                      <div className="text-[10px] font-mono text-red-400 uppercase tracking-widest font-semibold">
                        {project.metrics[0]?.label}
                      </div>
                    </div>
                  </div>

                  {/* Right Body Section */}
                  <div className="flex flex-col justify-between py-1 text-left">
                    <div>
                      {/* Meta */}
                      <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-1">
                        <span>0{index + 1} // {project.code}</span>
                        <span className="text-red-500/80 font-mono font-bold text-sm">{project.kanjiOverlay}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl sm:text-2xl font-black font-display uppercase tracking-tight text-white group-hover:text-red-400 transition-colors line-clamp-1">
                        {shortTitle}
                      </h3>

                      {/* Tagline */}
                      <p className="text-xs sm:text-sm text-zinc-400 font-mono mt-1 mb-3 line-clamp-2 leading-relaxed">
                        {project.tagline}
                      </p>

                      {/* Two-Column Detail Box (matches .two from demo) */}
                      <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                        <div className="p-2 sm:p-2.5 rounded-lg bg-zinc-900/60 border border-white/5">
                          <h4 className="text-[10px] font-mono uppercase font-bold text-red-500 tracking-wider mb-0.5 truncate">
                            {project.metrics[0]?.label || 'CORE FOCUS'}
                          </h4>
                          <p className="text-xs text-zinc-300 font-mono truncate">
                            {project.metrics[0]?.value}
                          </p>
                        </div>
                        <div className="p-2 sm:p-2.5 rounded-lg bg-zinc-900/60 border border-white/5">
                          <h4 className="text-[10px] font-mono uppercase font-bold text-red-500 tracking-wider mb-0.5 truncate">
                            {project.metrics[1]?.label || 'ARCHITECTURE'}
                          </h4>
                          <p className="text-xs text-zinc-300 font-mono truncate">
                            {project.metrics[1]?.value}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Row: Tags + Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/5 mt-auto">
                      <div className="flex flex-wrap gap-1.5 items-center">
                        {project.techStack.slice(0, 3).map((tech) => (
                          <TechTag key={tech} tech={tech} />
                        ))}
                        {project.techStack.length > 3 && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-500 border border-white/5">
                            +{project.techStack.length - 3}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => {
                              e.stopPropagation();
                              audioEngine.playSlash();
                            }}
                            className="p-1.5 rounded-md bg-zinc-900 hover:bg-red-600 border border-white/10 hover:border-red-500 text-zinc-300 hover:text-white transition-all text-xs"
                            title="Live Platform"
                          >
                            <ExternalLink size={14} />
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            audioEngine.playSlash();
                            setActiveProject(project);
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-900 hover:bg-red-600 border border-white/10 hover:border-red-500 text-zinc-300 hover:text-white transition-all text-xs font-mono font-bold uppercase tracking-wider"
                        >
                          <span>INSPECT</span>
                          <ArrowUpRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal for In-Depth Project Case Study */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
};
