
import { useEffect, useState, useRef } from 'react';

interface HorizontalScrollIndicatorProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

const HorizontalScrollIndicator = ({ containerRef }: HorizontalScrollIndicatorProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateProgress = () => {
      const scrollLeft = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;
      const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
      
      setScrollProgress(progress);
      setIsVisible(maxScroll > 10); // Show only if there's meaningful scroll
    };

    updateProgress();
    container.addEventListener('scroll', updateProgress);
    
    const resizeObserver = new ResizeObserver(updateProgress);
    resizeObserver.observe(container);

    return () => {
      container.removeEventListener('scroll', updateProgress);
      resizeObserver.disconnect();
    };
  }, [containerRef]);

  if (!isVisible) return null;

  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
      <div className="flex items-center space-x-3 text-slate-400">
        <span className="text-xs font-extralight tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-16 h-px bg-slate-600 relative">
          <div 
            className="h-full bg-gradient-to-r from-slate-300 to-slate-100 transition-all duration-300 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default HorizontalScrollIndicator;
