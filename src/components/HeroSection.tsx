import { useEffect, useRef } from 'react';
import { useCinematicScroll } from '../hooks/useCinematicScroll';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { subscribeToScroll } = useCinematicScroll();

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
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-bg">
      <div ref={heroRef} className="max-w-5xl mx-auto px-8 text-center" style={{ willChange: 'transform, opacity' }}>
        {/* Swiss-style uppercase label */}
        <p className="text-xs tracking-[0.3em] text-text-light/60 uppercase mb-6">
          Vibe Coding Portfolio
        </p>
        
        {/* Main heading with clean Swiss typography */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-text-light tracking-tight mb-8">
          IMAGINATION
          <span className="block text-pink-accent">LAB</span>
        </h1>
        
        {/* Tagline */}
        <p className="text-lg md:text-xl text-text-light/70 font-light max-w-2xl mx-auto mb-12 leading-relaxed">
          Building in public. Designing with intention. Creating apps that close gaps and connect communities.
        </p>
        
        {/* Swiss-style divider */}
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-pink-accent to-transparent mx-auto mb-8" />
        
        {/* Scroll indicator */}
        <div className="flex flex-col items-center space-y-2 text-text-light/40">
          <span className="text-xs tracking-[0.2em] uppercase">Scroll to explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-text-light/40 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
