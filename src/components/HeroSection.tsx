
import { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import ParticleAnimation from './ParticleAnimation';

interface HeroSectionProps {
  scrollY: number;
}

const HeroSection = ({ scrollY }: HeroSectionProps) => {
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTextVisible(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Particle Background */}
      <div className="absolute inset-0 z-0">
        <ParticleAnimation />
      </div>
      
      {/* Subtle gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/5 to-slate-950/20 z-10"></div>
      
      {/* Hero Content */}
      <div className={`relative z-20 text-center max-w-4xl mx-auto px-6 transition-all duration-1500 transform ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <h1 className="text-7xl md:text-9xl font-extralight mb-8 text-white tracking-wider">
          Design
        </h1>
        <h2 className="text-2xl md:text-3xl font-light mb-12 text-slate-300 tracking-wide">
          Digital experiences crafted with precision
        </h2>
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
          Where minimalism meets innovation, creating elegant solutions for complex challenges
        </p>
      </div>
      
      {/* Scroll Indicator */}
      <button 
        onClick={scrollToNext}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 group"
      >
        <div className="flex flex-col items-center space-y-2 text-slate-400 hover:text-white transition-colors duration-300">
          <span className="text-xs font-light tracking-widest">SCROLL</span>
          <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
        </div>
      </button>
    </section>
  );
};

export default HeroSection;
