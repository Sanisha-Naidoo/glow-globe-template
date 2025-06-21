
import { useEffect, useState, useRef } from 'react';
import { useCinematicScroll } from '../hooks/useCinematicScroll';

const HeroSection = () => {
  const [textVisible, setTextVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { subscribeToScroll } = useCinematicScroll();

  useEffect(() => {
    const timer = setTimeout(() => setTextVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeToScroll((progress) => {
      if (heroRef.current) {
        // Shrink and move hero content to the left as user scrolls
        const scale = 1 - progress * 0.3;
        const translateX = -progress * 30;
        const opacity = 1 - progress * 0.8;
        
        heroRef.current.style.transform = `translate3d(${translateX}%, 0, 0) scale(${scale})`;
        heroRef.current.style.opacity = opacity.toString();
      }
    });

    return unsubscribe;
  }, [subscribeToScroll]);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      
      <div 
        ref={heroRef}
        className={`relative z-20 text-center max-w-5xl mx-auto px-8 transition-all duration-[2000ms] ease-out will-change-transform ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        style={{ willChange: 'transform, opacity' }}
      >
        <h1 className="text-8xl md:text-[10rem] font-extralight mb-12 text-white tracking-[0.1em] leading-[0.9]">
          CREATE
        </h1>
        <h2 className="text-xl md:text-2xl font-extralight mb-16 text-slate-200 tracking-[0.2em] uppercase">
          Cinematic digital experiences
        </h2>
        <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-[1.8] font-extralight tracking-wide">
          Where motion meets emotion, crafting immersive narratives through cinematic interaction design
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
