
import { useRef, useEffect } from 'react';
import { useCinematicScroll } from '../hooks/useCinematicScroll';

const SpacerSection = () => {
  const spacerRef = useRef<HTMLDivElement>(null);
  const { subscribeToScroll } = useCinematicScroll();

  useEffect(() => {
    const unsubscribe = subscribeToScroll((progress) => {
      if (spacerRef.current) {
        // Gentle parallax effect for the spacer
        const spacerProgress = Math.max(0, Math.min(1, (progress - 0.1) * 2));
        const translateY = -spacerProgress * 10;
        const opacity = 0.3 + spacerProgress * 0.4;
        
        spacerRef.current.style.transform = `translate3d(0, ${translateY}px, 0)`;
        spacerRef.current.style.opacity = opacity.toString();
      }
    });

    return unsubscribe;
  }, [subscribeToScroll]);

  return (
    <section 
      ref={spacerRef}
      className="h-[50vh] bg-gradient-to-b from-dark-bg via-dark-bg/80 to-dark-bg flex items-center justify-center opacity-30"
      style={{ willChange: 'transform, opacity' }}
    >
      <div className="w-px h-32 bg-gradient-to-b from-transparent via-pink-accent/20 to-transparent"></div>
    </section>
  );
};

export default SpacerSection;
