
import { useEffect, useState } from 'react';
import ParticleAnimation from './ParticleAnimation';

interface HeroSectionProps {
  scrollY: number;
}

const HeroSection = ({ scrollY }: HeroSectionProps) => {
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTextVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Particle Background */}
      <div className="absolute inset-0 z-0">
        <ParticleAnimation />
      </div>
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20 z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 z-10"></div>
      
      {/* Hero Content */}
      <div className={`relative z-20 text-center transition-all duration-1500 transform ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <h1 className="text-6xl md:text-8xl font-light mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
          Creative
        </h1>
        <h2 className="text-3xl md:text-5xl font-light mb-8 text-white/90">
          Developer & Designer
        </h2>
        <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto leading-relaxed">
          Crafting digital experiences with passion, precision, and a touch of magic
        </p>
        
        <div className="mt-12">
          <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105">
            <span className="relative z-10 text-white font-medium">Explore My Work</span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
