
import { useEffect, useRef } from 'react';
import { useCinematicScroll } from '../hooks/useCinematicScroll';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const {
    subscribeToScroll
  } = useCinematicScroll();

  useEffect(() => {
    const unsubscribe = subscribeToScroll(progress => {
      if (heroRef.current) {
        const heroProgress = Math.min(progress * 1.5, 1);
        const scale = 1 - heroProgress * 0.1;
        const translateY = heroProgress * 30;
        const opacity = 1 - heroProgress * 0.6;
        heroRef.current.style.transform = `translate3d(0, ${translateY}%, 0) scale(${scale})`;
        heroRef.current.style.opacity = opacity.toString();
      }
    });
    return unsubscribe;
  }, [subscribeToScroll]);

  return (
    <section id="home" className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-dark-bg">
    </section>
  );
};

export default HeroSection;
