
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
  const debugLogging = useRef(false);
  const scrollDirection = useRef<'up' | 'down'>('down');
  const isCleanedUpRef = useRef(false);

  const smoothScroll = useCallback(() => {
    if (isCleanedUpRef.current) return;
    
    const scrollData = scrollDataRef.current;
    const horizontalData = horizontalDataRef.current;
    const ease = 0.08;
    const minVelocity = 0.1;
    
    // Calculate max scroll bounds
    const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    
    // Vertical scroll logic with proper bounds
    const verticalDiff = scrollData.target - scrollData.current;
    scrollData.velocity = verticalDiff * ease;
    scrollData.current += scrollData.velocity;
    scrollData.momentum = Math.abs(scrollData.velocity);

    // Clamp to bounds
    scrollData.current = Math.max(0, Math.min(maxScroll, scrollData.current));
    scrollData.target = Math.max(0, Math.min(maxScroll, scrollData.target));

    // Apply actual scroll position
    window.scrollTo(0, scrollData.current);

    // Calculate scroll progress
    const progress = maxScroll > 0 ? Math.min(scrollData.current / maxScroll, 1) : 0;
    
    if (debugLogging.current) {
      console.log('Scroll progress:', progress.toFixed(3), 'Threshold:', horizontalThreshold, 'Direction:', scrollDirection.current);
    }
    
    // Improved threshold management with easier exit
    const thresholdReached = progress >= horizontalThreshold;
    const exitThreshold = horizontalThreshold - 0.05; // Easier exit
    
    // Allow exit when scrolling up OR when below exit threshold
    if (thresholdReached && !horizontalData.isActive && scrollDirection.current === 'down') {
      horizontalData.isActive = true;
      if (debugLogging.current) console.log('Horizontal mode activated');
    } else if ((progress < exitThreshold || scrollDirection.current === 'up') && horizontalData.isActive) {
      horizontalData.isActive = false;
      horizontalData.current = 0;
      horizontalData.target = 0;
      if (debugLogging.current) console.log('Horizontal mode deactivated');
    }

    // Horizontal scroll logic with slower speed
    if (horizontalData.isActive) {
      const hDiff = horizontalData.target - horizontalData.current;
      horizontalData.velocity = hDiff * ease;
      horizontalData.current += horizontalData.velocity;
      
      // Reduced maximum horizontal distance for better control
      const maxHorizontal = window.innerWidth * 2;
      horizontalData.current = Math.max(0, Math.min(maxHorizontal, horizontalData.current));
      horizontalData.target = Math.max(0, Math.min(maxHorizontal, horizontalData.target));
    }

    // Normalize horizontal progress
    const horizontalProgress = horizontalData.current / (window.innerWidth * 2);

    // Trigger callbacks
    callbacksRef.current.forEach(callback => {
      try {
        callback(progress, scrollData.momentum, horizontalProgress, horizontalData.isActive);
      } catch (error) {
        console.error('Scroll callback error:', error);
      }
    });

    // Continue animation only if there's significant movement
    const shouldContinue = Math.abs(scrollData.velocity) > minVelocity || 
                          Math.abs(horizontalData.velocity) > minVelocity;
                          
    if (shouldContinue && !isCleanedUpRef.current) {
      animationRef.current = requestAnimationFrame(smoothScroll);
    } else {
      animationRef.current = undefined;
    }
  }, [horizontalThreshold]);

  const handleWheel = useCallback((e: WheelEvent) => {
    if (isCleanedUpRef.current) return;
    
    e.preventDefault();
    const scrollData = scrollDataRef.current;
    const horizontalData = horizontalDataRef.current;
    
    // Reduced delta multiplier for slower, more controlled movement
    const delta = e.deltaY * 0.3; // Further reduced for smoother experience
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    // Track scroll direction
    scrollDirection.current = delta > 0 ? 'down' : 'up';

    if (horizontalData.isActive && scrollDirection.current === 'down') {
      // Horizontal scrolling mode - only when scrolling down
      const maxHorizontal = window.innerWidth * 2;
      horizontalData.target = Math.max(0, Math.min(maxHorizontal, horizontalData.target + delta));
    } else {
      // Vertical scrolling mode - always allow upward scrolling
      scrollData.target = Math.max(0, Math.min(maxScroll, scrollData.target + delta));
    }

    // Start smooth scroll animation if not already running
    if (!animationRef.current && !isCleanedUpRef.current) {
      animationRef.current = requestAnimationFrame(smoothScroll);
    }
  }, [smoothScroll]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (isCleanedUpRef.current) return;
    
    const scrollData = scrollDataRef.current;
    const horizontalData = horizontalDataRef.current;
    
    // ESC key exits horizontal mode and returns to top
    if (e.key === 'Escape' && horizontalData.isActive) {
      horizontalData.isActive = false;
      horizontalData.current = 0;
      horizontalData.target = 0;
      scrollData.current = 0;
      scrollData.target = 0;
      scrollDirection.current = 'up';
      
      // Start animation to update UI
      if (!animationRef.current && !isCleanedUpRef.current) {
        animationRef.current = requestAnimationFrame(smoothScroll);
      }
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
    if (debugLogging.current) console.log('Threshold set to:', threshold);
  }, []);

  const toggleDebug = useCallback((enabled: boolean) => {
    debugLogging.current = enabled;
  }, []);

  useEffect(() => {
    isCleanedUpRef.current = false;
    
    // Initialize scroll positions from current page position
    const currentScroll = window.scrollY;
    scrollDataRef.current.current = currentScroll;
    scrollDataRef.current.target = currentScroll;

    // Add event listeners
    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      isCleanedUpRef.current = true;
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('keydown', handleKeyDown);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = undefined;
      }
      // Clear callbacks to prevent memory leaks
      callbacksRef.current = [];
    };
  }, [handleWheel, handleKeyDown]);

  return { subscribeToScroll, setThreshold, toggleDebug };
};
