
import { useEffect, useRef, useCallback, useState } from 'react';

interface ScrollData {
  current: number;
  target: number;
  velocity: number;
  momentum: number;
}

interface HorizontalScrollData {
  current: number;
  target: number;
  velocity: number;
  isActive: boolean;
}

export const useHorizontalPageScroll = () => {
  const scrollDataRef = useRef<ScrollData>({ current: 0, target: 0, velocity: 0, momentum: 0 });
  const horizontalDataRef = useRef<HorizontalScrollData>({ current: 0, target: 0, velocity: 0, isActive: false });
  const animationRef = useRef<number>();
  const callbacksRef = useRef<((progress: number, velocity: number, horizontalProgress: number, isHorizontalActive: boolean) => void)[]>([]);
  const [horizontalThreshold, setHorizontalThreshold] = useState(0.7);

  const smoothScroll = useCallback(() => {
    const scrollData = scrollDataRef.current;
    const horizontalData = horizontalDataRef.current;
    const ease = 0.08;
    
    // Vertical scroll logic
    const diff = scrollData.target - scrollData.current;
    scrollData.velocity = diff * ease;
    scrollData.current += scrollData.velocity;
    scrollData.momentum = Math.abs(scrollData.velocity);

    // Calculate scroll progress
    const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const progress = Math.min(scrollData.current / maxScroll, 1);
    
    console.log('Scroll progress:', progress, 'Threshold:', horizontalThreshold);
    
    // Check if we've reached the horizontal threshold
    const thresholdReached = progress >= horizontalThreshold;

    // Horizontal scroll logic
    if (thresholdReached && !horizontalData.isActive) {
      horizontalData.isActive = true;
      console.log('Horizontal mode activated');
    }

    if (horizontalData.isActive) {
      const hDiff = horizontalData.target - horizontalData.current;
      horizontalData.velocity = hDiff * ease;
      horizontalData.current += horizontalData.velocity;
    }

    // Normalize horizontal progress (0-1 across multiple screens)
    const horizontalProgress = Math.min(horizontalData.current / (window.innerWidth * 3), 1);

    // Sync actual scroll position with our virtual scroll
    if (Math.abs(window.scrollY - scrollData.current) > 1) {
      window.scrollTo(0, scrollData.current);
    }

    // Trigger callbacks
    callbacksRef.current.forEach(callback => {
      callback(progress, scrollData.momentum, horizontalProgress, horizontalData.isActive);
    });

    // Continue animation if there's significant movement
    if (Math.abs(scrollData.velocity) > 0.1 || Math.abs(horizontalData.velocity) > 0.1) {
      animationRef.current = requestAnimationFrame(smoothScroll);
    }
  }, [horizontalThreshold]);

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const scrollData = scrollDataRef.current;
    const horizontalData = horizontalDataRef.current;
    
    const delta = e.deltaY * 1.2;

    if (horizontalData.isActive) {
      // Horizontal scrolling mode
      horizontalData.target = Math.max(0, Math.min(
        window.innerWidth * 3, // 4 screens total
        horizontalData.target + delta
      ));
      console.log('Horizontal scroll target:', horizontalData.target);
    } else {
      // Vertical scrolling mode
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollData.target = Math.max(0, Math.min(
        maxScroll,
        scrollData.target + delta
      ));
      console.log('Vertical scroll target:', scrollData.target);
    }

    // Start smooth scroll animation
    if (!animationRef.current) {
      animationRef.current = requestAnimationFrame(smoothScroll);
    }
  }, [smoothScroll]);

  const subscribeToScroll = useCallback((callback: (progress: number, velocity: number, horizontalProgress: number, isHorizontalActive: boolean) => void) => {
    callbacksRef.current.push(callback);
    return () => {
      const index = callbacksRef.current.indexOf(callback);
      if (index > -1) {
        callbacksRef.current.splice(index, 1);
      }
    };
  }, []);

  const setThreshold = useCallback((threshold: number) => {
    setHorizontalThreshold(threshold);
    console.log('Threshold set to:', threshold);
  }, []);

  useEffect(() => {
    // Initialize scroll positions
    scrollDataRef.current.current = window.scrollY;
    scrollDataRef.current.target = window.scrollY;

    // Add wheel event listener
    document.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      document.removeEventListener('wheel', handleWheel);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [handleWheel]);

  return { subscribeToScroll, setThreshold };
};
