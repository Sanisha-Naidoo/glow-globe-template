
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
    startTrigger = 0.4,
    endTrigger = 0.8,
    maxScale = 1.8,
    angleMovement = 150
  } = options;

  const projectBoxRef = useRef<HTMLDivElement>(null);
  const { subscribeToScroll } = useCinematicScroll();

  useEffect(() => {
    const projectBox = projectBoxRef.current;
    
    if (!projectBox) return;

    // Set initial styles - centered and smaller
    projectBox.style.transform = 'translate3d(-50%, -50%, 0) scale(0.6)';
    projectBox.style.willChange = 'transform';

    const unsubscribe = subscribeToScroll((progress) => {
      if (progress >= startTrigger && progress <= endTrigger) {
        // Calculate animation progress within the trigger range
        const animationProgress = Math.min(1, (progress - startTrigger) / (endTrigger - startTrigger));
        const easeProgress = 1 - Math.pow(1 - animationProgress, 3); // Cubic ease out
        
        // Scale calculation - grow from 0.6 to maxScale
        const scale = 0.6 + (maxScale - 0.6) * easeProgress;
        
        // Angled movement calculation - move diagonally (right and down)
        const translateX = -50 + (angleMovement * easeProgress); // Start centered, move right
        const translateY = -50 + (angleMovement * 0.6 * easeProgress); // Start centered, move down at angle
        
        // Apply transforms with angled movement
        projectBox.style.transform = `translate3d(${translateX}%, ${translateY}%, 0) scale(${scale})`;
      }
    });

    return unsubscribe;
  }, [startTrigger, endTrigger, maxScale, angleMovement, subscribeToScroll]);

  return { projectBoxRef };
};
