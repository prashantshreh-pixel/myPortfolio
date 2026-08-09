import { useEffect } from 'react';

/**
 * Seamless scroll lock that freezes body/html scrolling without changing body.position,
 * guaranteeing zero scroll position jump or flicker when opening/closing modals.
 */
export const useBodyScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    if (!isLocked) return;

    // Cache original inline styles
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    // Calculate scrollbar width to prevent layout shift
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

    // Add modal-open markers
    document.body.classList.add('modal-open');
    document.documentElement.classList.add('modal-open');

    // Freeze scrolling seamlessly without moving the page
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    // Broadcast modal state event
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

      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.paddingRight = originalPaddingRight;

      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleTouchMove);
      window.dispatchEvent(new CustomEvent('modal-state-change', { detail: { isOpen: false } }));
    };
  }, [isLocked]);
};
