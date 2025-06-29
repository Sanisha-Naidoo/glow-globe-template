
import { useEffect, useRef } from 'react';
import { useCinematicScroll } from './useCinematicScroll';

interface ProjectScaleOptions {
  startTrigger?: number;
  endTrigger?: number;
  maxScale?: number;
  angleMovement?: number;
}

export const useProjectScaleAnimation = (options: ProjectScaleOptions = {}) => {
  const {
    startTrigger = 0.15,
    endTrigger = 0.85,
    maxScale = 4.5,
    angleMovement = 200
  } = options;

  const projectBoxRef = useRef<HTMLDivElement>(null);
  const { subscribeToScroll } = useCinematicScroll();

  useEffect(() => {
    const projectBox = projectBoxRef.current;
    
    if (!projectBox) return;

    // Set initial styles - centered and smaller
    projectBox.style.transform = 'translate3d(-50%, -50%, 0) scale(0.4)';
    projectBox.style.willChange = 'transform';

    const unsubscribe = subscribeToScroll((progress) => {
      if (progress >= startTrigger && progress <= endTrigger) {
        // Calculate animation progress within the trigger range
        const animationProgress = Math.min(1, (progress - startTrigger) / (endTrigger - startTrigger));
        const easeProgress = 1 - Math.pow(1 - animationProgress, 2.5); // Stronger ease for dramatic effect
        
        // Scale calculation - grow from 0.4 to maxScale for massive final size
        const scale = 0.4 + (maxScale - 0.4) * easeProgress;
        
        // Enhanced angled movement calculation - move diagonally (right and down)
        const translateX = -50 + (angleMovement * 0.8 * easeProgress); // More horizontal movement
        const translateY = -50 + (angleMovement * 0.5 * easeProgress); // Balanced vertical movement
        
        // Apply transforms with enhanced angled movement
        projectBox.style.transform = `translate3d(${translateX}%, ${translateY}%, 0) scale(${scale})`;
      }
    });

    return unsubscribe;
  }, [startTrigger, endTrigger, maxScale, angleMovement, subscribeToScroll]);

  return { projectBoxRef };
};
