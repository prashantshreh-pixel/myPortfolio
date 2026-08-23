import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { audioEngine } from '../utils/AudioEngine';
import { useBodyScrollLock } from '../utils/scrollLock';

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  align?: 'center' | 'end';
}

export const BaseModal: React.FC<BaseModalProps> = ({
  isOpen,
  onClose,
  children,
  align = 'center',
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useBodyScrollLock(isOpen);

  useEffect(() => {
    if (isOpen && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        audioEngine.playHover();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const containerClasses = align === 'end'
    ? 'fixed inset-0 z-[100] flex justify-end bg-black/85 backdrop-blur-md overflow-hidden select-none'
    : 'fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-hidden select-none';

  return (
    <AnimatePresence>
      <div
        className={containerClasses}
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => {
          if (e.target === e.currentTarget) e.preventDefault();
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            audioEngine.playHover();
            onClose();
          }
        }}
      >
        {children}
      </div>
    </AnimatePresence>
  );
};
