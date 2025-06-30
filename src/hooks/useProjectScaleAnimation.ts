import { useEffect, useRef } from 'react';

export const useProjectScaleAnimation = ({ startTrigger, endTrigger }) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / docHeight;

      let localProgress = (progress - startTrigger) / (endTrigger - startTrigger);
      localProgress = Math.max(0, Math.min(1, localProgress));

      const translateX = (1 - localProgress) * -100; // from -100% (off screen) to 0%
      const scale = 0.8 + localProgress * 0.2;       // from 0.8 to 1.0

      if (ref.current) {
        ref.current.style.transform = `translateX(${translateX}%) scale(${scale})`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [startTrigger, endTrigger]);

  return { projectBoxRef: ref };
};
