
import { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import ParticleAnimation from './ParticleAnimation';

interface HeroSectionProps {
  scrollY: number;
}

const HeroSection = ({ scrollY }: HeroSectionProps) => {
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTextVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Particle Background */}
      <div className="absolute inset-0 z-0">
        <ParticleAnimation />
      </div>
      
      {/* Subtle gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/2 to-slate-950/10 z-10"></div>
      
      {/* Hero Content */}
      <div className={`relative z-20 text-center max-w-5xl mx-auto px-8 transition-all duration-[2000ms] ease-out transform ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        <h1 className="text-8xl md:text-[10rem] font-extralight mb-12 text-white tracking-[0.1em] leading-[0.9]">
          CREATE
        </h1>
        <h2 className="text-xl md:text-2xl font-extralight mb-16 text-slate-200 tracking-[0.2em] uppercase">
          Digital experiences beyond ordinary
        </h2>
        <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-[1.8] font-extralight tracking-wide">
          Where precision meets poetry, crafting digital narratives that resonate with purpose and elegance
        </p>
      </div>
      
      {/* Scroll Indicator */}
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
