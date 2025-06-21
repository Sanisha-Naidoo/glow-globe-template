
import { useEffect, useState, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import ParticleAnimation from './ParticleAnimation';
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
        // Only apply transform effects for the first 30% of scroll (matching particle animation)
        const heroProgress = Math.min(progress * 3.33, 1); // Maps 0-0.3 to 0-1
        
        const scale = 1 - heroProgress * 0.3;
        const translateX = -heroProgress * 30;
        const opacity = 1 - heroProgress * 0.8;
        
        heroRef.current.style.transform = `translate3d(${translateX}%, 0, 0) scale(${scale})`;
        heroRef.current.style.opacity = opacity.toString();
      }
    });

    return unsubscribe;
  }, [subscribeToScroll]);

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <ParticleAnimation />
      
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
      
      <button 
        onClick={scrollToNext}
        className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20 group"
      >
        <div className="flex flex-col items-center space-y-3 text-slate-400 hover:text-white transition-all duration-700 ease-out">
          <span className="text-xs font-extralight tracking-[0.3em] uppercase">Explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-slate-400 to-transparent"></div>
          <ArrowDown className="w-3 h-3 group-hover:translate-y-1 transition-transform duration-700 ease-out" />
        </div>
      </button>
    </section>
  );
};

export default HeroSection;
