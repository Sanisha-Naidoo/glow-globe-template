import { useEffect, useRef, useState } from 'react';

interface ProjectScaleAnimationOptions {
  startTrigger: number;
  endTrigger: number;
  direction?: 'left' | 'right';
}

const getViewportMultiplier = (width: number): number => {
  if (width >= 1600) return 30;
  if (width >= 1400) return 20;
  if (width >= 1200) return 12;
  return 5;
};

const getStartScale = (width: number): number => {
  if (width >= 1600) return 0.8;
  if (width >= 1200) return 0.85;
  return 0.9;
};

export const useProjectScaleAnimation = ({ startTrigger, endTrigger, direction = 'left' }: ProjectScaleAnimationOptions) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1920);

  useEffect(() => {
    const checkViewport = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setViewportWidth(width);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
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
      const translateMultiplier = getViewportMultiplier(viewportWidth);
      const startScale = getStartScale(viewportWidth);
      
      const translateX = (1 - localProgress) * translateMultiplier * multiplier;
      const scale = startScale + localProgress * (1 - startScale);

      if (ref.current) {
        ref.current.style.transform = `translateX(${translateX}%) scale(${scale})`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, [startTrigger, endTrigger, direction, isMobile, viewportWidth]);

  return { projectBoxRef: ref };
};
