
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
    
    // Check if we're over the horizontal scroll container
    const rect = containerRef.current.getBoundingClientRect();
    const isOverContainer = 
      e.clientY >= rect.top && 
      e.clientY <= rect.bottom &&
      e.clientX >= rect.left &&
      e.clientX <= rect.right;

    if (isOverContainer) {
      e.preventDefault();
      const scrollAmount = e.deltaY * scrollSpeed;
      containerRef.current.scrollLeft += scrollAmount;
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
