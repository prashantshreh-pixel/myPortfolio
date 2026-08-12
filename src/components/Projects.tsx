import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { PROJECTS_DATA } from '../data';
import { ProjectItem } from '../types';
import { ProjectModal } from './ProjectModal';
import { ArrowUpRight } from 'lucide-react';
import { audioEngine } from '../utils/AudioEngine';

export const Projects: React.FC = () => {
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax Scroll Tracking for Background Elements
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgScaleParallax = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1.05]);

  return (
    <section ref={sectionRef} id="projects" className="pt-20 sm:pt-24 pb-20 sm:pb-36 relative z-10 overflow-hidden">
      {/* Background Top & Bottom Smooth Section Gradient Blends */}
      <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-10" />

      {/* Title Container */}
      <div className="px-4 sm:px-6 max-w-7xl mx-auto mb-12 sm:mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.4em] text-red-500 mb-2 font-bold">
          <span>03 // PROJECTS</span>
        </div>
        <motion.h2
          initial={{ x: -30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tight text-white font-display"
        >
          PROJECTS
        </motion.h2>
        <div className="h-1 w-24 sm:w-32 bg-red-600 mt-3 shadow-[0_0_15px_rgba(204,0,0,0.8)]" />
        <p className="text-zinc-400 mt-3 sm:mt-4 uppercase font-mono tracking-widest text-xs sm:text-sm">
          Completed High-Pressure System Architecture Missions
        </p>
      </div>

      {/* Cinematic Horizontal Cards List */}
      <div className="flex flex-col border-y border-white/10 relative z-10">
        {PROJECTS_DATA.map((project, index) => {
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              onClick={() => {
                audioEngine.playSlash();
                setActiveProject(project);
              }}
              id={project.id}
              className="relative min-h-[460px] sm:min-h-[520px] lg:h-[68vh] w-full overflow-hidden group cursor-pointer border-b border-white/10 scroll-mt-24"
            >
              {/* Background Image with Subtle Vertical Parallax Scale */}
              <motion.div style={{ scale: bgScaleParallax }} className="absolute inset-0 bg-zinc-900 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-1000 opacity-30 group-hover:opacity-85 ${project.imagePosition || 'object-cover object-center'}`}
                />
              </motion.div>

              {/* Dark Gradient Overlay for Smooth Blending */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-manga-lines opacity-10 group-hover:opacity-25 transition-opacity pointer-events-none" />

              {/* Top Right Code Badge & Kanji Watermark */}
              <div className="absolute top-6 right-6 sm:top-8 sm:right-8 flex flex-col items-end pointer-events-none">
                <span className="text-4xl sm:text-7xl md:text-8xl font-black font-mono text-white/5 group-hover:text-red-600/30 transition-colors duration-700">
                  {project.kanjiOverlay}
                </span>
              </div>

              {/* Bottom Left Content Block */}
              <div className="absolute bottom-6 left-4 sm:bottom-12 sm:left-10 max-w-3xl z-10 pr-4">
                {/* Code Tag */}
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <span className="text-red-500 font-mono font-extrabold tracking-[0.2em] sm:tracking-[0.3em] text-[11px] sm:text-xs bg-red-950/80 px-2.5 py-0.5 sm:px-3 sm:py-1 border border-red-600/50">
                    {project.code}
                  </span>
                  <span className="text-zinc-400 font-mono text-[11px] sm:text-xs uppercase tracking-widest">
                    {project.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white group-hover:text-red-400 uppercase tracking-tight font-display transition-all duration-500 transform group-hover:-translate-y-1">
                  {project.title}
                </h3>
                <div className="h-0.5 w-0 group-hover:w-20 bg-red-600 transition-all duration-500 mt-1.5 shadow-[0_0_10px_rgba(220,38,38,0.8)]" />

                {/* Subtitle / Tagline */}
                <p className="text-zinc-400 text-xs sm:text-sm font-mono mt-1.5 sm:mt-2 opacity-90 group-hover:opacity-100 transition-opacity max-w-xl leading-relaxed">
                  {project.tagline}
                </p>

                {/* Tech Stack List */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4 opacity-80 group-hover:opacity-100 transition-all duration-500">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono px-2 py-0.5 sm:px-2.5 sm:py-1 bg-black/80 border border-white/20 text-zinc-300 uppercase tracking-widest"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover Trigger Action Arrow at Top Right */}
              <div className="absolute top-6 right-6 sm:top-10 sm:right-10 z-10 hidden sm:flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">INSPECT MISSION</span>
                <div className="p-2.5 sm:p-3 glass-panel border border-white/20 group-hover:border-red-600 group-hover:bg-red-600 text-white transition-all">
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Modal for Project Inspection */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
};

