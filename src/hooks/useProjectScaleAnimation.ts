import { useEffect, useRef } from 'react';

export const useProjectScaleAnimation = ({ startTrigger, endTrigger, direction = 'left' }) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / docHeight;

      let localProgress = (progress - startTrigger) / (endTrigger - startTrigger);
      localProgress = Math.max(0, Math.min(1, localProgress));

      const multiplier = direction === 'left' ? -1 : 1;
      const translateX = (1 - localProgress) * 30 * multiplier; // from -30 or 30 to 0
      const scale = 0.8 + localProgress * 0.2;

      if (ref.current) {
        ref.current.style.transform = `translateX(${translateX}%) scale(${scale})`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [startTrigger, endTrigger, direction]);

  return { projectBoxRef: ref };
};
