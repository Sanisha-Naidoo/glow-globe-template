
import { useEffect, useRef } from 'react';
import { useCinematicScroll } from './useCinematicScroll';

interface ProjectScaleOptions {
  startTrigger?: number;
  endTrigger?: number;
  maxScale?: number;
  horizontalSpread?: number;
}

export const useProjectScaleAnimation = (options: ProjectScaleOptions = {}) => {
  const {
    startTrigger = 0.4,
    endTrigger = 0.8,
    maxScale = 1.2,
    horizontalSpread = 100
  } = options;

  const leftBoxRef = useRef<HTMLDivElement>(null);
  const rightBoxRef = useRef<HTMLDivElement>(null);
  const { subscribeToScroll } = useCinematicScroll();

  useEffect(() => {
    const leftBox = leftBoxRef.current;
    const rightBox = rightBoxRef.current;
    
    if (!leftBox || !rightBox) return;

    // Set initial styles
    leftBox.style.transform = 'translate3d(0, 0, 0) scale(0.8)';
    rightBox.style.transform = 'translate3d(0, 0, 0) scale(0.8)';
    leftBox.style.willChange = 'transform';
    rightBox.style.willChange = 'transform';

    const unsubscribe = subscribeToScroll((progress) => {
      if (progress >= startTrigger && progress <= endTrigger) {
        // Calculate animation progress within the trigger range
        const animationProgress = Math.min(1, (progress - startTrigger) / (endTrigger - startTrigger));
        const easeProgress = 1 - Math.pow(1 - animationProgress, 3); // Cubic ease out
        
        // Scale calculation
        const scale = 0.8 + (maxScale - 0.8) * easeProgress;
        
        // Horizontal movement calculation
        const leftTranslateX = -horizontalSpread * easeProgress;
        const rightTranslateX = horizontalSpread * easeProgress;
        
        // Apply transforms
        leftBox.style.transform = `translate3d(${leftTranslateX}px, 0, 0) scale(${scale})`;
        rightBox.style.transform = `translate3d(${rightTranslateX}px, 0, 0) scale(${scale})`;
      }
    });

    return unsubscribe;
  }, [startTrigger, endTrigger, maxScale, horizontalSpread, subscribeToScroll]);

  return { leftBoxRef, rightBoxRef };
};
