import { useEffect } from 'react';

/**
 * Ultimate bulletproof scroll lock that uses position: fixed on body
 * with scroll position retention and wheel event boundary trapping.
 */
export const useBodyScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    if (!isLocked) return;

    // Capture current exact scroll position
    const scrollY = window.scrollY;

    // Cache original inline styles
    const originalBodyPosition = document.body.style.position;
    const originalBodyTop = document.body.style.top;
    const originalBodyWidth = document.body.style.width;
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    // Add modal-open markers for CSS rules
    document.body.classList.add('modal-open');
    document.documentElement.classList.add('modal-open');

    // Bulletproof position: fixed body freeze
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    // Broadcast modal state event to Navbar and ScrollControls
    window.dispatchEvent(new CustomEvent('modal-state-change', { detail: { isOpen: true } }));

    // Trap wheel events outside of modal scroll container
    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target || !target.closest('.modal-scrollable')) {
        e.preventDefault();
      }
    };

    // Trap touchmove events outside of modal scroll container
    const handleTouchMove = (e: TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target || !target.closest('.modal-scrollable')) {
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      document.body.classList.remove('modal-open');
      document.documentElement.classList.remove('modal-open');

      document.body.style.position = originalBodyPosition;
      document.body.style.top = originalBodyTop;
      document.body.style.width = originalBodyWidth;
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;

      // Instantly restore exact scroll position
      window.scrollTo(0, scrollY);

      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleTouchMove);
      window.dispatchEvent(new CustomEvent('modal-state-change', { detail: { isOpen: false } }));
    };
  }, [isLocked]);
};
