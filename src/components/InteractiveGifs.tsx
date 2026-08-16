import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const GIFS = [
  '/assets/getsuga.gif',
  '/assets/hollow.gif',
  '/assets/Ichigo.gif',
  '/assets/ICHIGOZ.gif',
  '/assets/kiuske.gif'
];

export const InteractiveGifs: React.FC = () => {
  const [activeGifs, setActiveGifs] = useState<Array<{ id: number; x: number; y: number; src: string }>>([]);

  useEffect(() => {
    const timers: number[] = [];

    const handleClick = (e: MouseEvent) => {
      // Don't spawn if clicking on interactive elements
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a') || target.closest('input') || target.closest('textarea')) return;

      const newGif = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        src: GIFS[Math.floor(Math.random() * GIFS.length)]
      };

      setActiveGifs(prev => [...prev.slice(-2), newGif]);

      // Remove the gif after 2.2 seconds
      const timer = window.setTimeout(() => {
        setActiveGifs(prev => prev.filter(g => g.id !== newGif.id));
      }, 2200);

      timers.push(timer);
    };

    window.addEventListener('click', handleClick, { passive: true });
    return () => {
      window.removeEventListener('click', handleClick);
      timers.forEach(t => clearTimeout(t));
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      <AnimatePresence>
        {activeGifs.map(gif => (
          <motion.img
            key={gif.id}
            src={gif.src}
            initial={{ opacity: 0, scale: 0.5, x: '-50%', y: '-50%' }}
            animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
            exit={{ opacity: 0, scale: 1.2, x: '-50%', y: '-50%' }}
            transition={{ duration: 0.3 }}
            style={{ 
              position: 'absolute', 
              left: gif.x, 
              top: gif.y, 
              maxWidth: '260px', 
              maxHeight: '260px', 
              objectFit: 'contain',
              willChange: 'transform, opacity'
            }}
            className="pointer-events-none drop-shadow-[0_0_20px_rgba(220,38,38,0.8)]"
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
