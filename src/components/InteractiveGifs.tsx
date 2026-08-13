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
    const handleClick = (e: MouseEvent) => {
      // Don't spawn if clicking on interactive elements
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a') || target.closest('input') || target.closest('textarea')) return;

      const newGif = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        src: GIFS[Math.floor(Math.random() * GIFS.length)]
      };

      setActiveGifs(prev => [...prev, newGif]);

      // Remove the gif after 2.5 seconds
      setTimeout(() => {
        setActiveGifs(prev => prev.filter(g => g.id !== newGif.id));
      }, 2500);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
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
            style={{ 
              position: 'absolute', 
              left: gif.x, 
              top: gif.y, 
              maxWidth: '300px', 
              maxHeight: '300px', 
              objectFit: 'contain' 
            }}
            className="pointer-events-none drop-shadow-[0_0_20px_rgba(220,38,38,0.8)]"
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
