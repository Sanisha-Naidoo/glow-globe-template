import { useEffect, useRef, useState } from 'react';

interface ProjectScaleAnimationOptions {
  startTrigger: number;
  endTrigger: number;
  direction?: 'left' | 'right';
}

export const useProjectScaleAnimation = ({ startTrigger, endTrigger, direction = 'left' }: ProjectScaleAnimationOptions) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Skip scroll animations on mobile - show at full size
    if (isMobile) {
      if (ref.current) {
        ref.current.style.transform = 'translateX(0) scale(1)';
      }
      return;
    }

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / docHeight;

      let localProgress = (progress - startTrigger) / (endTrigger - startTrigger);
      localProgress = Math.max(0, Math.min(1, localProgress));

      const multiplier = direction === 'left' ? -1 : 1;
      const translateX = (1 - localProgress) * 30 * multiplier;
      const scale = 0.8 + localProgress * 0.2;

      if (ref.current) {
        ref.current.style.transform = `translateX(${translateX}%) scale(${scale})`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [startTrigger, endTrigger, direction, isMobile]);

  return { projectBoxRef: ref };
};
