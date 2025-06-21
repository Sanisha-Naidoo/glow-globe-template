
import { useEffect, useState, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import ParticleAnimation from './ParticleAnimation';
import { useCinematicScroll } from '../hooks/useCinematicScroll';

const HeroSection = () => {
  const [textVisible, setTextVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { subscribeToScroll } = useCinematicScroll();

  useEffect(() => {
    const timer = setTimeout(() => setTextVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeToScroll((progress) => {
      if (heroRef.current) {
        const scale = 1 - progress * 0.2;
        const translateX = -progress * 20;
        const opacity = 1 - progress * 0.6;
        
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
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-stone-100 via-neutral-50 to-stone-200">
      <ParticleAnimation />
      
      {/* Floating info cards */}
      <div className="absolute top-32 right-12 z-10 opacity-60 hover:opacity-100 transition-opacity duration-700">
        <div className="backdrop-blur-xl bg-white/20 border border-stone-200/50 rounded-lg p-4 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105">
          <p className="text-xs font-light tracking-wider text-stone-600 uppercase">Est. 2024</p>
        </div>
      </div>
      
      <div className="absolute bottom-32 left-12 z-10 opacity-60 hover:opacity-100 transition-opacity duration-700">
        <div className="backdrop-blur-xl bg-white/20 border border-stone-200/50 rounded-lg p-4 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105">
          <p className="text-xs font-light tracking-wider text-stone-600 uppercase">Award Winning</p>
        </div>
      </div>
      
      <div 
        ref={heroRef}
        className={`relative z-20 text-center max-w-6xl mx-auto px-8 transition-all duration-[2500ms] ease-out will-change-transform ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        style={{ willChange: 'transform, opacity' }}
      >
        <h1 className="text-8xl md:text-[12rem] font-extralight mb-16 text-stone-800 tracking-[0.08em] leading-[0.85] hover:text-stone-900 transition-colors duration-700">
          CREATE
        </h1>
        <h2 className="text-xl md:text-3xl font-light mb-20 text-stone-600 tracking-[0.25em] uppercase">
          Cinematic digital experiences
        </h2>
        <p className="text-lg md:text-xl text-stone-500 max-w-3xl mx-auto leading-[1.9] font-light tracking-wide">
          Where motion meets emotion, crafting immersive narratives through cinematic interaction design
        </p>
      </div>
      
      <button 
        onClick={scrollToNext}
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 group hover:scale-110 transition-all duration-500"
      >
        <div className="flex flex-col items-center space-y-4 text-stone-400 hover:text-stone-700 transition-all duration-700 ease-out">
          <span className="text-xs font-light tracking-[0.4em] uppercase">Explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-stone-400 to-transparent group-hover:h-16 transition-all duration-500"></div>
          <ArrowDown className="w-4 h-4 group-hover:translate-y-2 transition-transform duration-700 ease-out" />
        </div>
      </button>
    </section>
  );
};

export default HeroSection;
