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
      <div ref={heroRef} className="max-w-6xl mx-auto px-8 text-center" style={{ willChange: 'transform, opacity' }}>
        {/* Swiss-style uppercase label */}
        <p className="text-sm tracking-[0.3em] text-cyan-accent uppercase mb-8">
          Vibe Coding Portfolio
        </p>
        
        {/* Main heading with clean Swiss typography */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-text-light tracking-tight mb-10">
          <span className="font-chalk text-3xl md:text-4xl lg:text-5xl font-normal lowercase mr-2 text-text-light/80">my</span>
          IMAGINATION
          <span className="block bg-gradient-to-r from-cyan-accent to-violet-accent bg-clip-text text-transparent">LAB</span>
        </h1>
        
        {/* Tagline */}
        <p className="text-xl md:text-2xl text-text-light/70 font-light max-w-3xl mx-auto mb-16 leading-relaxed">
          Building in public. Designing with intention. Creating apps that close gaps and connect communities.
        </p>
        
        {/* Swiss-style divider */}
        <div className="w-32 h-px bg-gradient-to-r from-transparent via-cyan-accent to-transparent mx-auto mb-10" />
        
        {/* Scroll indicator */}
        <div className="flex flex-col items-center space-y-3 text-text-light/40">
          <span className="text-sm tracking-[0.2em] uppercase">Scroll to explore</span>
          <div className="w-px h-16 bg-gradient-to-b from-cyan-accent/60 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
