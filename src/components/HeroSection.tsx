
import { useEffect, useState, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import ParticleAnimation from './ParticleAnimation';
import { useCinematicScroll } from '../hooks/useCinematicScroll';

const HeroSection = () => {
  const [textVisible, setTextVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const {
    subscribeToScroll
  } = useCinematicScroll();

  useEffect(() => {
    const timer = setTimeout(() => setTextVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeToScroll(progress => {
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
    aboutSection?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-dark-bg">
      <ParticleAnimation />
      
      <button onClick={scrollToNext} className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20 group">
        <div className="flex flex-col items-center space-y-3 text-text-light hover:text-pink-accent transition-all duration-700 ease-out">
          <span className="text-sm font-light tracking-widest uppercase">Explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-text-light to-transparent"></div>
          <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-700 ease-out" />
        </div>
      </button>
    </section>
  );
};

export default HeroSection;
