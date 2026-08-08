import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Send, ShieldCheck } from 'lucide-react';
import { audioEngine } from '../utils/AudioEngine';

interface HeroProps {
  isBankaiActive: boolean;
}

export const Hero: React.FC<HeroProps> = ({ isBankaiActive }) => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden px-4 sm:px-6 pt-24 sm:pt-28 pb-16 bg-[#050505] selection:bg-red-600 selection:text-white"
    >
      {/* Background Manga Ink Grid & Red Reiatsu Aura Overlay */}
      <div className="absolute inset-0 pointer-events-none select-none flex items-center justify-center overflow-hidden">
        {/* Reiatsu Glow */}
        <div
          className={`w-[500px] h-[500px] sm:w-[750px] sm:h-[750px] rounded-full blur-[150px] transition-all duration-1000 ${
            isBankaiActive
              ? 'bg-red-600/35 animate-pulse'
              : 'bg-red-950/20 animate-reiatsu'
          }`}
        />

        {/* Minimalist Grid Lines */}
        <div className="absolute inset-0 bg-manga-dots opacity-25" />
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600/20 to-transparent" />
        <div className="absolute top-0 left-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-zinc-800/40 to-transparent" />
      </div>

      {/* Main Content Box */}
      <div className="relative z-10 text-center max-w-7xl mx-auto flex flex-col items-center">
        {/* Top Eyebrow Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 text-[10px] sm:text-xs md:text-sm font-mono tracking-[0.25em] sm:tracking-[0.4em] text-red-500 font-bold uppercase mb-6 sm:mb-8 px-2"
        >
          <ShieldCheck size={14} className="text-red-500" />
          <span>[ SOFTWARE ENGINEER · .NET & FINTECH SPECIALIST ]</span>
        </motion.div>

        {/* Centerpiece Massive Typography */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="select-none max-w-full"
        >
          <h1 className="font-display font-black leading-[0.9] sm:leading-[0.85] tracking-tight uppercase flex flex-col items-center">
            {/* Line 1: Solid Bold Filled Typography */}
            <span className="text-5xl sm:text-7xl md:text-[9.5vw] text-[#e4e4e7] drop-shadow-sm">
              PRASHANT
            </span>

            {/* Line 2: Outlined Stroke Typography */}
            <span className="text-5xl sm:text-7xl md:text-[9.5vw] text-stroke-strong">
              SHRESTHA
            </span>
          </h1>
        </motion.div>

        {/* Subtitle Lines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 sm:mt-8 flex flex-col items-center gap-1 font-mono text-[11px] sm:text-xs md:text-sm tracking-[0.15em] sm:tracking-[0.3em] text-zinc-300 font-medium uppercase px-2 text-center"
        >
          <p className="text-zinc-300">4.5+ YEARS EXP · CORE REMITTANCE & DIGITAL WALLETS · KATHMANDU, NEPAL</p>
          <p className="text-red-500 text-[10px] sm:text-xs font-bold tracking-[0.2em] mt-1">
            C# · ASP.NET CORE · CLEAN ARCHITECTURE · HIGH-CONCURRENCY FINTECH
          </p>
        </motion.div>

        {/* Action Button: Transmit Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 sm:mt-10 flex justify-center items-center font-mono text-xs uppercase tracking-widest z-20"
        >
          <a
            href="#bankai"
            onClick={() => audioEngine.playSlash()}
            className="inline-flex items-center gap-2.5 px-7 sm:px-8 py-3 sm:py-3.5 bg-red-600 hover:bg-white text-white hover:text-black font-black border border-red-500 transition-all duration-300 shadow-[0_0_25px_rgba(220,38,38,0.6)] active:scale-95 text-xs sm:text-sm"
          >
            <Send size={15} className="text-white group-hover:text-black" />
            <span>TRANSMIT MISSION</span>
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-12 sm:mt-16 flex flex-col items-center gap-3"
        >
          <a
            href="#thearc"
            onClick={() => audioEngine.playHover()}
            className="group flex flex-col items-center gap-3 text-red-500 hover:text-white transition-colors"
          >
            <span className="text-[10px] sm:text-xs uppercase font-mono tracking-[0.4em] sm:tracking-[0.5em] text-red-500 group-hover:text-white font-semibold">
              SCROLL TO ENTER
            </span>
            <div className="w-[1px] h-8 sm:h-10 bg-gradient-to-b from-red-600 via-zinc-700 to-transparent relative overflow-hidden">
              <div className="w-full h-1/2 bg-white animate-bounce" />
            </div>
            <ArrowDown size={14} className="animate-bounce text-red-600" />
          </a>
        </motion.div>
      </div>

      {/* Smooth Bottom Blending Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
    </section>
  );
};

