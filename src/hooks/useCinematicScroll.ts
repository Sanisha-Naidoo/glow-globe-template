
import { useEffect, useRef, useCallback } from 'react';

interface ScrollData {
  current: number;
  target: number;
  velocity: number;
  momentum: number;
}

export const useCinematicScroll = () => {
  const scrollDataRef = useRef<ScrollData>({ current: 0, target: 0, velocity: 0, momentum: 0 });
  const animationRef = useRef<number>();
  const callbacksRef = useRef<((progress: number, velocity: number) => void)[]>([]);

  const smoothScroll = useCallback(() => {
    const scrollData = scrollDataRef.current;
    const ease = 0.08;
    const diff = scrollData.target - scrollData.current;
    
    scrollData.velocity = diff * ease;
    scrollData.current += scrollData.velocity;
    scrollData.momentum = Math.abs(scrollData.velocity);

    // Full scroll progress (0-1) without any caps
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(scrollData.current / maxScroll, 1);

    // Trigger callbacks with full progress range
    callbacksRef.current.forEach(callback => {
      callback(progress, scrollData.momentum);
    });

    // Continue animation if there's significant movement
    if (Math.abs(scrollData.velocity) > 0.1) {
      animationRef.current = requestAnimationFrame(smoothScroll);
    }
  }, []);

  const handleWheel = useCallback((e: WheelEvent) => {
    const scrollData = scrollDataRef.current;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    
    // Allow full range scrolling
    const delta = e.deltaY * 1.2;
    scrollData.target = Math.max(0, Math.min(maxScroll, scrollData.target + delta));

    // Start smooth scroll animation
    if (!animationRef.current) {
      animationRef.current = requestAnimationFrame(smoothScroll);
    }
  }, [smoothScroll]);

  const subscribeToScroll = useCallback((callback: (progress: number, velocity: number) => void) => {
    callbacksRef.current.push(callback);
    return () => {
      const index = callbacksRef.current.indexOf(callback);
      if (index > -1) {
        callbacksRef.current.splice(index, 1);
      }
    };
  }, []);

  useEffect(() => {
    // Initialize scroll position
    scrollDataRef.current.current = window.scrollY;
    scrollDataRef.current.target = window.scrollY;

    // Enhanced scroll listener with better performance
    const handleScroll = () => {
      scrollDataRef.current.current = window.scrollY;
      scrollDataRef.current.target = window.scrollY;
      
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(window.scrollY / maxScroll, 1);
      
      callbacksRef.current.forEach(callback => {
        callback(progress, 0);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return { subscribeToScroll };
};
