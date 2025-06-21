import { useEffect, useState, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import ParticleAnimation from './ParticleAnimation';
import { useCinematicScroll } from '../hooks/useCinematicScroll';

const HeroSection = () => {
  const [textVisible, setTextVisible] = useState(false);
  const [aiAnimationStarted, setAiAnimationStarted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const {
    subscribeToScroll
  } = useCinematicScroll();

  useEffect(() => {
    const timer = setTimeout(() => setTextVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (textVisible) {
      const aiTimer = setTimeout(() => setAiAnimationStarted(true), 2000);
      return () => clearTimeout(aiTimer);
    }
  }, [textVisible]);

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
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <ParticleAnimation />
      
      <div ref={heroRef} className={`relative z-20 text-center max-w-5xl mx-auto px-8 transition-all duration-[2000ms] ease-out will-change-transform -mt-16 ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{
        willChange: 'transform, opacity'
      }}>
        {/* AI Letters - positioned above */}
        <div className="relative mb-4">
          <span 
            className={`inline-block text-8xl md:text-9xl font-light tracking-[0.2em] transition-all duration-1000 ease-out ${
              aiAnimationStarted 
                ? 'text-pink-400 transform -translate-y-2 drop-shadow-[0_0_20px_rgba(244,114,182,0.8)]' 
                : 'text-transparent'
            }`}
          >
            AI
          </span>
        </div>

        {/* Main heading with individual letter control */}
        <h1 className="text-6xl md:text-7xl font-light mb-12 text-white tracking-[0.1em] leading-[0.9] drop-shadow-lg">
          {/* "imagination" with "a" controlled */}
          <span className="inline-block">
            im
            <span 
              className={`inline-block transition-all duration-1000 ease-out ${
                aiAnimationStarted 
                  ? 'opacity-30 transform scale-75' 
                  : 'opacity-100'
              }`}
            >
              a
            </span>
            gination
          </span>
          {' '}
          {/* "lab" with "i" controlled */}
          <span className="inline-block">
            l
            <span 
              className={`inline-block transition-all duration-1000 ease-out ${
                aiAnimationStarted 
                  ? 'opacity-30 transform scale-75' 
                  : 'opacity-100'
              }`}
            >
              i
            </span>
            b
          </span>
        </h1>

        <div className="mb-16"></div>
        <p className="text-lg md:text-xl text-white max-w-2xl mx-auto leading-[1.7] font-normal tracking-wide drop-shadow-md">
          "Where there is love, there is always time, 
          and nothing is too much trouble" 
          Abdul'Baha
        </p>
      </div>
      
      <button onClick={scrollToNext} className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20 group">
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
