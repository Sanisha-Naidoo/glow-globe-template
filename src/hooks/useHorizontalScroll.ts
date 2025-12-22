
import { useRef, useEffect, useCallback } from 'react';

interface HorizontalScrollOptions {
  scrollSpeed?: number;
  snapToCards?: boolean;
}

export const useHorizontalScroll = (options: HorizontalScrollOptions = {}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollSpeed = 1.5, snapToCards = true } = options;

  const handleWheel = useCallback((e: WheelEvent) => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const isOverContainer = 
      e.clientY >= rect.top && 
      e.clientY <= rect.bottom &&
      e.clientX >= rect.left &&
      e.clientX <= rect.right;

    if (isOverContainer) {
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      const canScrollLeft = container.scrollLeft > 0 && e.deltaY < 0;
      const canScrollRight = container.scrollLeft < maxScrollLeft && e.deltaY > 0;
      
      // Only prevent default if there's room to scroll horizontally
      if (canScrollLeft || canScrollRight) {
        e.preventDefault();
        const scrollAmount = e.deltaY * scrollSpeed;
        container.scrollLeft += scrollAmount;
      }
      // Otherwise, allow native vertical scroll to continue
    }
  }, [scrollSpeed]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  return containerRef;
};
