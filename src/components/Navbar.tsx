import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Flame, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { audioEngine } from '../utils/AudioEngine';
import { HollowMaskLogo } from './HollowMaskLogo';

interface NavbarProps {
  isBankaiActive: boolean;
  onToggleBankai: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  isBankaiActive,
  onToggleBankai,
  activeSection
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = href;
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
        isScrolled
          ? 'bg-[#050505]/95 backdrop-blur-md border-white/10 py-3 sm:py-4 shadow-2xl'
          : 'bg-transparent border-transparent py-4 sm:py-6 md:py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        {/* Brand Logo - Substitute Shinigami Badge */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex items-center gap-2 group text-white font-bold transition-transform duration-300 active:scale-95 shrink-0"
          title="Substitute Shinigami Badge"
        >
          <HollowMaskLogo className="w-7 h-9 sm:w-8 sm:h-10" />
        </a>

        {/* Desktop Minimal Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-xs font-bold uppercase tracking-[0.3em]">
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
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mute/Unmute Audio Toggle */}
          <button
            onClick={toggleAudio}
            onMouseEnter={() => audioEngine.playHover()}
            title={isMuted ? 'Unmute Sound FX' : 'Mute Sound FX'}
            className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-900/80 border border-zinc-800 rounded-full transition-all duration-300 shrink-0"
          >
            {isMuted ? <VolumeX size={13} className="sm:w-3.5 sm:h-3.5" /> : <Volume2 size={13} className="sm:w-3.5 sm:h-3.5 text-red-500 animate-pulse" />}
          </button>

          {/* Release Reiatsu Toggle Pill Button */}
          <button
            onClick={() => {
              if (isBankaiActive) {
                audioEngine.playSlash();
              } else {
                audioEngine.playBankaiBurst();
              }
              onToggleBankai();
            }}
            onMouseEnter={() => audioEngine.playHover()}
            title={isBankaiActive ? 'Suppress Reiatsu State' : 'Release Reiatsu State'}
            className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 sm:gap-2 border shrink-0 ${
              isBankaiActive
                ? 'bg-red-600 border-red-500 text-white shadow-[0_0_12px_rgba(220,38,38,0.6)]'
                : 'bg-zinc-950/80 border-red-600/60 text-red-400 hover:bg-red-600 hover:text-white hover:border-red-500'
            }`}
          >
            <Flame size={12} className={isBankaiActive ? 'text-yellow-300 animate-bounce' : 'text-red-500'} />
            <span>{isBankaiActive ? 'REIATSU' : 'RELEASE'}</span>
            <span className="hidden sm:inline">{isBankaiActive ? 'RELEASED' : 'REIATSU'}</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => {
              audioEngine.playHover();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            title="Toggle Menu"
            className="md:hidden p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-800 rounded-none transition-colors ml-1"
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
            <nav className="flex flex-col gap-4 font-mono text-xs uppercase tracking-[0.25em]">
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
