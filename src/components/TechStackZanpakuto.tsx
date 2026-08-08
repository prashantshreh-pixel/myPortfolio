import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SKILL_ITEMS } from '../data';
import { SkillItem } from '../types';
import { ZanpakutoDrawer } from './ZanpakutoDrawer';
import { Terminal, Box, Layers, Cpu, Server, Database, Flame, Zap } from 'lucide-react';
import { audioEngine } from '../utils/AudioEngine';

const iconMap: Record<string, React.ReactNode> = {
  Terminal: <Terminal size={28} />,
  Box: <Box size={28} />,
  Layers: <Layers size={28} />,
  Cpu: <Cpu size={28} />,
  Server: <Server size={28} />,
  Database: <Database size={28} />
};

export const TechStackZanpakuto: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const filteredSkills = SKILL_ITEMS.filter((s) => filter === 'all' || s.category === filter);

  return (
    <section id="zanpakuto" className="py-20 sm:py-28 px-4 sm:px-6 max-w-7xl mx-auto relative z-10">
      {/* Section Title */}
      <div className="mb-12 sm:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.4em] text-red-500 mb-2 font-bold">
            <span>02 // ARSENAL</span>
          </div>
          <motion.h2
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tight text-white font-display"
          >
            SKILLS
          </motion.h2>
          <div className="h-1 w-24 sm:w-32 bg-red-600 mt-3 shadow-[0_0_15px_rgba(220,38,38,0.8)]" />
          <p className="text-zinc-400 mt-3 sm:mt-4 uppercase font-mono tracking-widest text-xs sm:text-sm">
            My Technical Blade & Infrastructure Arsenal
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 text-[11px] sm:text-xs font-mono">
          {['all', 'core', 'devops', 'architecture', 'database'].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                audioEngine.playHover();
                setFilter(cat);
              }}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 border uppercase tracking-widest transition-all rounded-none ${
                filter === cat
                  ? 'bg-red-600 border-red-500 text-white font-bold shadow-[0_0_15px_rgba(220,38,38,0.5)]'
                  : 'glass-panel border-white/10 text-zinc-400 hover:text-white hover:border-white/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Bento Box Grid */}
      <div className={`grid gap-4 sm:gap-5 w-full ${
        filteredSkills.length === 1 
          ? 'grid-cols-1 max-w-2xl' 
          : filteredSkills.length === 2 
            ? 'grid-cols-1 md:grid-cols-2' 
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
      }`}>
        {filteredSkills.map((skill, index) => {
          return (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              onClick={() => {
                audioEngine.playSlash();
                setSelectedSkill(skill);
              }}
              className="col-span-1 relative group cursor-pointer overflow-hidden rounded-none glass-panel border border-white/10 hover:border-red-600/70 transition-all duration-500 min-h-[220px] flex flex-col justify-between p-5 sm:p-6 bg-[#0a0a0d] w-full"
            >
              {/* Background Glow Effect on Hover */}
              <div className="absolute -right-20 -top-20 w-48 h-48 bg-red-600/0 group-hover:bg-red-600/15 rounded-full blur-3xl transition-all duration-700 pointer-events-none" />

              {/* Top Row: Icon & Kanji */}
              <div className="flex justify-between items-start z-10">
                <div className="p-2.5 sm:p-3 bg-white/5 border border-white/10 text-white group-hover:text-red-500 group-hover:border-red-600/50 transition-colors duration-300">
                  {iconMap[skill.iconName] || <Zap size={24} className="sm:w-7 sm:h-7" />}
                </div>
                <div className="text-right">
                  <span className="text-xl sm:text-2xl font-black font-mono text-zinc-700 group-hover:text-red-500/80 transition-colors">
                    {skill.kanji}
                  </span>
                  <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-0.5">
                    {skill.category}
                  </div>
                </div>
              </div>

              {/* Middle Row: Name & Short Description */}
              <div className="my-3 sm:my-4 z-10">
                <h3 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight group-hover:text-red-400 transition-colors font-display">
                  {skill.name}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 mt-2 line-clamp-2 leading-relaxed font-light">
                  {skill.description}
                </p>
              </div>

              {/* Bottom Row: Proficiency & Glowing Indicator Line */}
              <div className="z-10 pt-2 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 group-hover:text-zinc-300">
                  CLICK FOR CODE & SPECS
                </span>
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-red-500">
                  <Flame size={12} className="animate-pulse" />
                  <span>{skill.proficiency}%</span>
                </div>
              </div>

              {/* Glowing Red Line Accent at Bottom */}
              <div className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-red-700 via-red-500 to-white w-0 group-hover:w-full transition-all duration-500" />
            </motion.div>
          );
        })}
      </div>

      {/* Skill Detail Drawer */}
      <ZanpakutoDrawer
        skill={selectedSkill}
        onClose={() => setSelectedSkill(null)}
      />
    </section>
  );
};
