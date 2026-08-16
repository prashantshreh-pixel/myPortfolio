import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import { audioEngine } from '../utils/AudioEngine';

const useTypewriter = (texts: string[], typingSpeed = 150, deletingSpeed = 100, pauseDelay = 3000) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    let timer: number;

    const handleTyping = () => {
      const currentText = texts[loopNum % texts.length];

      if (isDeleting) {
        setText(currentText.substring(0, text.length - 1));
        if (text.length === 0) {
          setIsDeleting(false);
          setLoopNum((prev) => prev + 1);
        }
      } else {
        setText(currentText.substring(0, text.length + 1));
        if (text.length === currentText.length) {
          timer = window.setTimeout(() => setIsDeleting(true), pauseDelay);
          return;
        }
      }
    };

    timer = window.setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, texts, typingSpeed, deletingSpeed, pauseDelay]);

  return text;
};

export const Hero: React.FC = () => {
  const typedText = useTypewriter(['PRASHANT SHRESTHA', 'प्रशान्त श्रेष्ठ']);
  const spaceIndex = typedText.indexOf(' ');
  const firstName = spaceIndex !== -1 ? typedText.substring(0, spaceIndex) : typedText;
  const lastName = spaceIndex !== -1 ? typedText.substring(spaceIndex + 1) : '';

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-start overflow-hidden px-6 sm:px-12 lg:px-24 pt-20 bg-[#050505] selection:bg-red-600 selection:text-white"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Subtle Red Crescent Moon */}
        <motion.div
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[5%] top-[10%] w-[60vh] h-[60vh] rounded-full border-r-[8px] border-b-[2px] border-[#cc0000] mix-blend-screen blur-[2px]"
          style={{ transform: 'rotate(-45deg)' }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_50%,_rgba(80,0,0,0.1),_transparent_50%)] mix-blend-screen" />
      </div>

      {/* Main Content Layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-center h-full">

        {/* Left Side Vertical Text */}
        <div className="absolute left-[-20px] top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-8">
          <span className="text-[#cc0000] font-bold text-sm tracking-[0.3em] font-manga" style={{ writingMode: 'vertical-rl' }}>
            黒崎 一護
          </span>
          <div className="w-[1px] h-16 bg-zinc-800" />
          <span className="text-zinc-500 font-mono text-[10px] tracking-[0.3em] uppercase rotate-180" style={{ writingMode: 'vertical-rl' }}>
            SOFTWARE ENGINEER
          </span>
        </div>

        {/* Right Side Vertical Text */}
        <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-8">
          <div className="w-[1px] h-24 bg-red-900/30" />
          <span className="text-zinc-500 font-bold text-xs tracking-[0.3em] font-manga" style={{ writingMode: 'vertical-rl' }}>
            すべては私の計画通りだ
          </span>
          <div className="w-[1px] h-16 bg-red-900/30" />
        </div>

        {/* Bottom Right Text Block */}
        <div className="absolute right-0 bottom-4 hidden lg:flex flex-col text-right font-mono text-[10px] sm:text-xs z-20">
          <span className="text-[#cc0000] font-bold mb-1 tracking-[0.15em]">BANKAI.</span>
          <span className="text-zinc-500 tracking-[0.2em]">DISCIPLINE.</span>
          <span className="text-zinc-500 tracking-[0.2em]">FOCUS.</span>
          <span className="text-zinc-500 tracking-[0.2em]">EXECUTION.</span>
          <div className="flex justify-end gap-1.5 mt-3">
            <div className="w-1 h-1 bg-red-600 rounded-full" />
            <div className="w-1 h-1 bg-[#cc0000] rounded-full" />
            <div className="w-1 h-1 bg-[#cc0000] rounded-full opacity-30" />
            <div className="w-1 h-1 bg-[#cc0000] rounded-full opacity-30" />
          </div>
        </div>

        {/* Hovering MAYURI GIF */}
        <div className="absolute -top-16 right-0 sm:-top-10 sm:right-[2%] md:top-auto md:bottom-[10%] z-20 pointer-events-none">
          <motion.img
            src="/assets/mayuri.gif"
            alt="Mayuri Hovering"
            animate={{ 
              y: [-15, 15, -15]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 4, 
              ease: "easeInOut" 
            }}
            className="w-56 sm:w-72 md:w-80 lg:w-[480px] object-contain drop-shadow-[0_0_20px_rgba(220,38,38,0.4)] opacity-90 mix-blend-screen origin-top"
          />
        </div>

        {/* Hero Content Left Aligned */}
        <div className="max-w-3xl ml-0 lg:ml-20 relative z-20">



          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[#cc0000] text-[10px] sm:text-xs font-mono font-bold tracking-[0.3em] uppercase mb-4"
          >
            BUILD · CODE · PROTECT
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-col font-display font-black leading-[0.85] tracking-tight uppercase min-h-[160px] sm:min-h-[220px] md:min-h-[20vw] lg:min-h-[240px]"
          >
            <div className="flex flex-col">
              <span className="text-6xl sm:text-8xl md:text-[9vw] lg:text-[120px] text-[#e4e4e7] drop-shadow-sm min-h-[1em] flex items-center">
                {firstName || '\u00A0'}
                {!lastName && <span className="animate-pulse text-[#cc0000] font-mono ml-2 font-normal">|</span>}
              </span>
              <span className="text-6xl sm:text-8xl md:text-[9vw] lg:text-[120px] text-stroke-strong mt-4 sm:mt-6 min-h-[1em] flex items-center">
                {lastName || '\u00A0'}
                {lastName && <span className="animate-pulse text-[#cc0000] font-mono ml-2 font-normal">|</span>}
              </span>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 text-zinc-400 font-mono text-xs sm:text-sm max-w-md leading-relaxed"
          >
            Building scalable, reliable and secure systems<br />
            with clean architecture and modern technologies.<br />
            Turning ideas into impact.
          </motion.p>
        </div>
      </div>
    </section>
  );
};
