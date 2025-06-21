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
        // Enhanced parallax effect for hero section
        // Apply effects over first 40% of scroll for smoother transition
        const heroProgress = Math.min(progress * 2.5, 1); // Maps 0-0.4 to 0-1
        
        const scale = 1 - heroProgress * 0.2;
        const translateY = heroProgress * 20;
        const opacity = 1 - heroProgress * 0.9;
        
        heroRef.current.style.transform = `translate3d(0, ${translateY}%, 0) scale(${scale})`;
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
        className={`relative z-20 text-center max-w-5xl mx-auto px-8 transition-all duration-[2000ms] ease-out will-change-transform -mt-16 ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        style={{ willChange: 'transform, opacity' }}
      >
        <h1 className="text-6xl md:text-7xl font-light mb-12 text-white tracking-[0.1em] leading-[0.9] drop-shadow-lg">
          imagination lab
        </h1>
        <p className="text-lg md:text-xl text-white max-w-2xl mx-auto leading-[1.7] font-normal tracking-wide drop-shadow-md">
          Where motion meets emotion, crafting immersive narratives through cinematic interaction design
        </p>
      </div>
      
      <button 
        onClick={scrollToNext}
        className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20 group"
      >
        <div className="flex flex-col items-center space-y-3 text-white hover:text-gray-100 transition-all duration-700 ease-out drop-shadow-md">
          <span className="text-sm font-normal tracking-[0.3em] uppercase">Explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-white to-transparent"></div>
          <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-700 ease-out" />
        </div>
      </button>
    </section>
  );
};

export default HeroSection;
