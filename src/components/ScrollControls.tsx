import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { audioEngine } from '../utils/AudioEngine';

export const ScrollControls: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showIchigo, setShowIchigo] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    const handleModalChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ isOpen: boolean }>;
      setIsModalOpen(customEvent.detail?.isOpen ?? false);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('modal-state-change', handleModalChange);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('modal-state-change', handleModalChange);
    };
  }, []);

  const scrollToTop = () => {
    audioEngine.playSlash();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setShowIchigo(true);
    setTimeout(() => {
      setShowIchigo(false);
    }, 1800); // 1.8 seconds - roughly the time it takes for the blue burst
  };

  const scrollToBottom = () => {
    audioEngine.playSlash();
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && !isModalOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="scroll-controls fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col gap-1.5 sm:gap-2"
        >
          {/* Scroll To Top Button */}
          <button
            onClick={scrollToTop}
            onMouseEnter={() => audioEngine.playHover()}
            title="Scroll To Top"
            className="w-8 h-8 sm:w-10 sm:h-10 bg-[#050505]/85 hover:bg-red-600 border border-zinc-800/90 hover:border-red-500 text-zinc-400 hover:text-white flex items-center justify-center transition-all duration-300 shadow-2xl backdrop-blur-md group rounded-none"
          >
            <ChevronUp size={16} className="sm:w-5 sm:h-5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          {/* Scroll To Bottom Button */}
          <button
            onClick={scrollToBottom}
            onMouseEnter={() => audioEngine.playHover()}
            title="Scroll To Bottom"
            className="w-8 h-8 sm:w-10 sm:h-10 bg-[#050505]/85 hover:bg-red-600 border border-zinc-800/90 hover:border-red-500 text-zinc-400 hover:text-white flex items-center justify-center transition-all duration-300 shadow-2xl backdrop-blur-md group rounded-none"
          >
            <ChevronDown size={16} className="sm:w-5 sm:h-5 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </motion.div>
      )}

      {/* Ichigo Scroll Up Easter Egg */}
      {showIchigo && (
        <motion.img
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.2, y: -50 }}
          src="/assets/gif/Ichigo.gif"
          alt="Ichigo burst"
          className="fixed bottom-20 right-4 sm:right-6 z-50 w-48 h-48 object-contain pointer-events-none drop-shadow-[0_0_15px_rgba(220,38,38,0.8)] mix-blend-screen"
        />
      )}
    </AnimatePresence>
  );
};
