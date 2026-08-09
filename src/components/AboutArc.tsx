import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { TIMELINE_DATA } from '../data';
import { TimelineItem } from '../types';
import { MemoryFragmentModal } from './MemoryFragmentModal';
import { Terminal, ChevronRight } from 'lucide-react';
import { audioEngine } from '../utils/AudioEngine';

export const AboutArc: React.FC = () => {
  const [selectedFragment, setSelectedFragment] = useState<TimelineItem | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax Scroll Tracking
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const linesParallaxY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section
      ref={sectionRef}
      id="thearc"
      className="py-20 sm:py-28 px-4 sm:px-6 max-w-7xl mx-auto relative overflow-hidden text-zinc-100"
    >
      {/* Background Smooth Gradient Blends (Top & Bottom) */}
      <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-10" />

      {/* Subtle Vertical Parallax Scroll Manga Lines */}
      <motion.div
        style={{ y: linesParallaxY }}
        className="absolute inset-0 bg-manga-dots opacity-20 pointer-events-none z-0"
      />

      {/* Section Content */}
      <div className="relative z-10">
        {/* Section Title */}
        <div className="mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.4em] text-red-500 mb-2 font-bold">
            <span>01 // CHRONICLES</span>
          </div>
          <motion.h2
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tight text-white font-display"
          >
            THE ARC
          </motion.h2>
          <div className="h-1 w-24 sm:w-32 bg-red-600 mt-3 shadow-[0_0_15px_rgba(204,0,0,0.8)]" />
          <p className="text-zinc-400 mt-3 sm:mt-4 uppercase font-mono tracking-widest text-xs sm:text-sm">
            4.5 Years of Professional Evolution // From C# Fundamentals to Distributed Systems
          </p>
        </div>

        {/* Vertical Timeline with Continuous Visible Spine Line */}
        <div className="relative ml-3 sm:ml-6 md:ml-8 my-10 sm:my-12">
          {/* Unbroken High-Visibility Vertical Spine Line */}
          <div className="absolute top-3 bottom-8 left-0 w-[2px] bg-gradient-to-b from-red-600 via-zinc-700 to-red-600/30 z-0 shadow-[0_0_8px_rgba(220,38,38,0.3)]" />

          {TIMELINE_DATA.map((item, index) => {
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="relative pl-6 sm:pl-8 md:pl-12 pb-14 sm:pb-20 last:pb-0 group z-10"
              >
                {/* Timeline Red Diamond Anchor Node (Centered exactly on spine) */}
                <div className="absolute -left-[7px] top-1.5 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-red-600 rotate-45 border-2 border-black group-hover:scale-125 group-hover:bg-white group-hover:shadow-[0_0_15px_rgba(204,0,0,0.9)] transition-all duration-300 z-10" />

                <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-start justify-between">
                  {/* Left Block: Year & Meta */}
                  <div className="lg:w-1/3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl sm:text-4xl md:text-5xl font-black text-white group-hover:text-red-500 transition-colors font-display tracking-tight">
                        {item.year}
                      </span>
                    </div>
                    <span className="inline-block text-[10px] font-mono px-2 py-0.5 bg-red-950/60 text-red-400 border border-red-600/30 uppercase tracking-widest mt-2 font-bold">
                      {item.period}
                    </span>
                    <div className="text-zinc-700 text-2xl sm:text-3xl font-black mt-1 font-mono tracking-widest uppercase">
                      {item.kanji}
                    </div>
                  </div>

                  {/* Center Block: Title & Narrative */}
                  <div className="lg:w-1/2 space-y-3 sm:space-y-4">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold uppercase text-white tracking-tight group-hover:text-zinc-100 font-display">
                      {item.title}
                    </h3>
                    <p className="text-red-500 font-mono text-[11px] sm:text-xs uppercase tracking-wider font-bold">
                      {item.subtitle}
                    </p>
                    <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-light">
                      {item.description}
                    </p>

                    {/* Highlights Bullet List */}
                    <ul className="space-y-1.5 pt-1 sm:pt-2">
                      {item.highlights.map((h, hIdx) => (
                        <li key={hIdx} className="text-xs text-zinc-300 flex items-start gap-2 font-mono">
                          <ChevronRight size={14} className="text-red-500 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2 sm:pt-3">
                      {item.techUsed.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono px-2 sm:px-2.5 py-0.5 sm:py-1 bg-zinc-900 border border-white/10 text-zinc-300 uppercase tracking-wider"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Trigger Memory Fragment Inspection */}
                    <div className="pt-2">
                      <button
                        onClick={() => {
                          audioEngine.playSlash();
                          setSelectedFragment(item);
                        }}
                        className="inline-flex items-center gap-2 text-xs font-mono font-bold text-red-500 hover:text-white uppercase tracking-widest underline underline-offset-4 decoration-red-600 transition-colors"
                      >
                        <Terminal size={14} />
                        <span>INSPECT MEMORY FRAGMENT</span>
                      </button>
                    </div>
                  </div>

                  {/* Right Block: Image / Logo Exhibit (Non-link, turns colorful on hover) */}
                  <div className="lg:w-1/4 w-full h-44 sm:h-56 relative overflow-hidden group/img border border-white/10 hover:border-red-600/60 transition-all duration-500 bg-zinc-950 flex items-center justify-center p-3 select-none">
                    <img
                      src={item.imagePlaceholder}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain grayscale contrast-125 group-hover/img:grayscale-0 group-hover/img:contrast-100 group-hover/img:scale-105 transition-all duration-500 opacity-85 group-hover/img:opacity-100"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Memory Fragment Modal */}
      <MemoryFragmentModal
        item={selectedFragment}
        onClose={() => setSelectedFragment(null)}
      />
    </section>
  );
};
