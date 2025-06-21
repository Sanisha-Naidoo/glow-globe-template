
import { useState, useEffect, useRef } from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import WorkSection from '../components/WorkSection';
import HorizontalWorkSection from '../components/HorizontalWorkSection';
import ContactSection from '../components/ContactSection';
import { useHorizontalPageScroll } from '../hooks/useHorizontalPageScroll';

const Index = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [showHorizontalWork, setShowHorizontalWork] = useState(false);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const { subscribeToScroll, setThreshold } = useHorizontalPageScroll();

  useEffect(() => {
    // Set threshold to 70% of page scroll
    setThreshold(0.7);

    const unsubscribe = subscribeToScroll((progress, velocity, horizontalProgress, isHorizontalActive) => {
      console.log('Scroll data:', { progress, velocity, horizontalProgress, isHorizontalActive });
      
      setShowHorizontalWork(isHorizontalActive);
      
      if (mainContentRef.current) {
        if (isHorizontalActive) {
          // Smooth transition instead of harsh fade
          mainContentRef.current.style.opacity = '0.8';
          mainContentRef.current.style.transform = 'scale(0.98)';
          mainContentRef.current.style.filter = 'blur(1px)';
        } else {
          // Restore main content
          mainContentRef.current.style.opacity = '1';
          mainContentRef.current.style.transform = 'scale(1)';
          mainContentRef.current.style.filter = 'blur(0px)';
        }
      }
    });

    return unsubscribe;
  }, [subscribeToScroll, setThreshold]);

  return (
    <div className={`${darkMode ? 'dark' : ''} transition-all duration-500`}>
      <div 
        ref={mainContentRef}
        className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white min-h-screen relative overflow-x-hidden transition-all duration-700 ease-out"
        style={{ willChange: 'transform, opacity, filter' }}
      >
        <Navigation darkMode={darkMode} setDarkMode={setDarkMode} />
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <WorkSection />
        <ContactSection />
      </div>
      
      {/* Horizontal Work Section Overlay */}
      {showHorizontalWork && (
        <div className="fixed inset-0 z-50">
          <HorizontalWorkSection />
        </div>
      )}
    </div>
  );
};

export default Index;
