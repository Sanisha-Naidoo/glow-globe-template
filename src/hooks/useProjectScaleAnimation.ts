
import { useEffect, useRef } from 'react';
import { useCinematicScroll } from './useCinematicScroll';

interface ProjectScaleOptions {
  startTrigger?: number;
  endTrigger?: number;
}

export const useProjectScaleAnimation = (options: ProjectScaleOptions = {}) => {
  const {
    startTrigger = 0.2,
    endTrigger = 0.7
  } = options;

  const projectBoxRef = useRef<HTMLDivElement>(null);
  const { subscribeToScroll } = useCinematicScroll();

  useEffect(() => {
    const projectBox = projectBoxRef.current;
    
    if (!projectBox) return;

    // Set initial styles - off-screen and small
    projectBox.style.transform = 'translate3d(-50%, 100px, 0) scale(0.8)';
    projectBox.style.opacity = '0';
    projectBox.style.willChange = 'transform, opacity';

    const unsubscribe = subscribeToScroll((progress) => {
      if (progress >= startTrigger && progress <= endTrigger) {
        // Calculate animation progress within the trigger range
        const animationProgress = (progress - startTrigger) / (endTrigger - startTrigger);
        const easeProgress = 1 - Math.pow(1 - animationProgress, 2);
        
        // Opacity fade in
        const opacity = Math.min(1, animationProgress * 2);
        
        // Move into view and scale up
        const translateY = 100 - (100 * easeProgress); // Move from 100px down to 0
        const scale = 0.8 + (0.2 * easeProgress); // Scale from 0.8 to 1.0
        
        projectBox.style.transform = `translate3d(-50%, ${translateY}px, 0) scale(${scale})`;
        projectBox.style.opacity = opacity.toString();
      }
    });

    return unsubscribe;
  }, [startTrigger, endTrigger, subscribeToScroll]);

  return { projectBoxRef };
};
