
import { useEffect, useRef } from 'react';
import { useCinematicScroll } from './useCinematicScroll';

interface SplitTransitionOptions {
  triggerPoint?: number;
  duration?: number;
  direction?: 'left' | 'right';
}

export const useSplitTransition = (options: SplitTransitionOptions = {}) => {
  const { triggerPoint = 0.3, duration = 0.8, direction = 'right' } = options;
  const elementRef = useRef<HTMLDivElement>(null);
  const { subscribeToScroll } = useCinematicScroll();

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Set initial state with hardware acceleration
    element.style.transform = `translate3d(${direction === 'right' ? '100%' : '-100%'}, 0, 0)`;
    element.style.opacity = '0';
    element.style.transition = 'none';
    element.style.willChange = 'transform, opacity';

    const unsubscribe = subscribeToScroll((progress, velocity) => {
      const elementTop = element.offsetTop;
      const elementHeight = element.offsetHeight;
      const windowHeight = window.innerHeight;
      
      // Calculate visibility progress based on element position
      const elementProgress = Math.max(0, Math.min(1, 
        (window.scrollY + windowHeight - elementTop) / (windowHeight + elementHeight)
      ));

      if (elementProgress > triggerPoint) {
        const transitionProgress = Math.min(1, (elementProgress - triggerPoint) / duration);
        const easeProgress = 1 - Math.pow(1 - transitionProgress, 3); // Cubic ease-out
        
        const translateX = (1 - easeProgress) * (direction === 'right' ? 100 : -100);
        const opacity = easeProgress;
        
        element.style.transform = `translate3d(${translateX}%, 0, 0)`;
        element.style.opacity = opacity.toString();
      }
    });

    return unsubscribe;
  }, [triggerPoint, duration, direction, subscribeToScroll]);

  return elementRef;
};
