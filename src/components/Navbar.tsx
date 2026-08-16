import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { audioEngine } from '../utils/AudioEngine';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 30);
      
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    const handleModalChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ isOpen: boolean }>;
      setIsModalOpen(customEvent.detail?.isOpen ?? false);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('modal-state-change', handleModalChange);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('modal-state-change', handleModalChange);
    };
  }, []);

  const toggleAudio = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    audioEngine.isMuted = nextState;
    if (!nextState) {
      audioEngine.playSlash();
    }
  };

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home', code: '00' },
    { label: 'The Arc', href: '#thearc', id: 'thearc', code: '01' },
    { label: 'Skills', href: '#zanpakuto', id: 'zanpakuto', code: '02' },
    { label: 'Projects', href: '#projects', id: 'projects', code: '03' },
    { label: 'Contact', href: '#bankai', id: 'bankai', code: '04' }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    audioEngine.playSlash();
    setIsMobileMenuOpen(false);
    
    // Delay scroll to allow mobile menu exit animation to begin/finish
    // so the layout doesn't conflict with scroll coordinates.
    setTimeout(() => {
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.hash = href;
      }
    }, 250);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 border-b ${
        (isVisible && !isModalOpen) ? 'translate-y-0' : '-translate-y-full'
      } ${
        isScrolled
          ? 'bg-[#050505]/95 backdrop-blur-md border-white/10 py-3 sm:py-4 shadow-2xl'
          : 'bg-transparent border-transparent py-4 sm:py-6 md:py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center relative">
        {/* Brand Space Placeholder (Removed Logo) */}
        <div className="w-8 shrink-0 z-10" />

        {/* Desktop Centered Navigation Links */}
        <nav className="hidden md:flex items-center justify-center gap-8 lg:gap-12 text-xs font-bold uppercase tracking-[0.3em] absolute left-1/2 -translate-x-1/2 z-10">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative py-1 transition-colors duration-300 hover:text-red-500 ${
                  isActive ? 'text-red-500 font-black' : 'text-zinc-400'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-red-600 animate-pulse" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3 z-10">
          {/* Mute/Unmute Audio Toggle */}
          <button
            onClick={toggleAudio}
            onMouseEnter={() => audioEngine.playHover()}
            title={isMuted ? 'Unmute Sound FX' : 'Mute Sound FX'}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-900/80 border border-zinc-800 hover:border-red-600 rounded-full transition-all duration-300 shrink-0"
          >
            {isMuted ? <VolumeX size={15} className="sm:w-4 sm:h-4" /> : <Volume2 size={15} className="sm:w-4 sm:h-4 text-red-500 animate-pulse" />}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => {
              audioEngine.playHover();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            title="Toggle Menu"
            className="md:hidden p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-800 rounded-none transition-colors ml-1"
          >
            {isMobileMenuOpen ? <X size={18} className="text-red-500" /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-red-600/30 bg-[#070709]/98 backdrop-blur-xl px-6 py-5 overflow-hidden"
          >
            <nav className="flex flex-col gap-3 font-mono text-xs uppercase tracking-[0.25em]">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`flex items-center justify-between py-2 border-b border-white/5 transition-colors ${
                      isActive ? 'text-red-500 font-black' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    <span className="text-[10px] text-zinc-600 font-bold">{link.code}</span>
                  </a>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
