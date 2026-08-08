import React, { useState, useEffect } from 'react';
import { ReiatsuCanvas } from './components/ReiatsuCanvas';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutArc } from './components/AboutArc';
import { TechStackZanpakuto } from './components/TechStackZanpakuto';
import { Projects } from './components/Projects';
import { BankaiFooter } from './components/BankaiFooter';
import { ReiatsuPreloader } from './components/ReiatsuPreloader';
import { ScrollControls } from './components/ScrollControls';

export default function App() {
  const [isPreloading, setIsPreloading] = useState(true);
  const [isBankaiActive, setIsBankaiActive] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'thearc', 'zanpakuto', 'projects', 'bankai'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleBankai = () => {
    setIsBankaiActive((prev) => !prev);
  };

  return (
    <div
      className={`relative min-h-screen bg-[#050505] text-zinc-300 font-sans selection:bg-red-600 selection:text-white transition-colors duration-700 ${
        isBankaiActive ? 'bg-[#030304]' : 'bg-[#050505]'
      }`}
    >
      {/* Reiatsu Preloader Animation */}
      {isPreloading && <ReiatsuPreloader onComplete={() => setIsPreloading(false)} />}

      {/* Background Interactive Reiatsu Particle Canvas */}
      <ReiatsuCanvas isBankaiActive={isBankaiActive} />

      {/* Film Grain Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 bg-manga-lines opacity-15" />

      {/* Quick Scroll To Top & Scroll To Bottom Controls */}
      <ScrollControls />

      {/* Main Content Sections */}
      <div className="relative z-10">
        <Navbar
          isBankaiActive={isBankaiActive}
          onToggleBankai={toggleBankai}
          activeSection={activeSection}
        />

        <main>
          <Hero isBankaiActive={isBankaiActive} />
          <AboutArc />
          <TechStackZanpakuto />
          <Projects />
        </main>

        <BankaiFooter />
      </div>
    </div>
  );
}
