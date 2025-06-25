
import { useEffect, useRef } from 'react';
import { useCinematicScroll } from './useCinematicScroll';

interface ProjectAnimationOptions {
  direction: 'left' | 'right' | 'diagonal-left';
  triggerPoint?: number;
  duration?: number;
}

export const useProjectAnimation = (options: ProjectAnimationOptions) => {
  const { direction, triggerPoint = 0.3, duration = 0.8 } = options;
  const elementRef = useRef<HTMLDivElement>(null);
  const { subscribeToScroll } = useCinematicScroll();

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Set initial state based on direction
    let initialTransform = '';
    switch (direction) {
      case 'left':
        initialTransform = 'translate3d(-100%, 0, 0)';
        break;
      case 'right':
        initialTransform = 'translate3d(100%, 0, 0)';
        break;
      case 'diagonal-left':
        initialTransform = 'translate3d(-80%, 20%, 0) rotate(-5deg)';
        break;
    }

    element.style.transform = initialTransform;
    element.style.opacity = '0';
    element.style.transition = 'none';
    element.style.willChange = 'transform, opacity';

    const unsubscribe = subscribeToScroll((progress) => {
      const elementTop = element.offsetTop;
      const elementHeight = element.offsetHeight;
      const windowHeight = window.innerHeight;
      
      const elementProgress = Math.max(0, Math.min(1, 
        (window.scrollY + windowHeight - elementTop) / (windowHeight + elementHeight)
      ));

      if (elementProgress > triggerPoint) {
        const transitionProgress = Math.min(1, (elementProgress - triggerPoint) / duration);
        const easeProgress = 1 - Math.pow(1 - transitionProgress, 3);
        
        let finalTransform = '';
        switch (direction) {
          case 'left':
            const translateX = (1 - easeProgress) * -100;
            finalTransform = `translate3d(${translateX}%, 0, 0)`;
            break;
          case 'right':
            const translateXRight = (1 - easeProgress) * 100;
            finalTransform = `translate3d(${translateXRight}%, 0, 0)`;
            break;
          case 'diagonal-left':
            const translateXDiag = (1 - easeProgress) * -80;
            const translateYDiag = (1 - easeProgress) * 20;
            const rotation = (1 - easeProgress) * -5;
            finalTransform = `translate3d(${translateXDiag}%, ${translateYDiag}%, 0) rotate(${rotation}deg)`;
            break;
        }
        
        element.style.transform = finalTransform;
        element.style.opacity = easeProgress.toString();
      }
    });

    return unsubscribe;
  }, [direction, triggerPoint, duration, subscribeToScroll]);

  return elementRef;
};
