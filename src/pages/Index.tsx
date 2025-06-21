
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
  const { subscribeToScroll } = useHorizontalPageScroll();

  useEffect(() => {
    const unsubscribe = subscribeToScroll((progress, velocity, horizontalProgress, isHorizontalActive) => {
      setShowHorizontalWork(isHorizontalActive);
      
      if (mainContentRef.current) {
        if (isHorizontalActive) {
          // Fade out main content when horizontal section is active
          mainContentRef.current.style.opacity = '0.3';
          mainContentRef.current.style.transform = 'scale(0.95)';
        } else {
          // Restore main content
          mainContentRef.current.style.opacity = '1';
          mainContentRef.current.style.transform = 'scale(1)';
        }
      }
    });

    return unsubscribe;
  }, [subscribeToScroll]);

  return (
    <div className={`${darkMode ? 'dark' : ''} transition-all duration-500 gpu-accelerated`}>
      <div 
        ref={mainContentRef}
        className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white min-h-screen relative overflow-x-hidden transition-all duration-1000"
        style={{ willChange: 'transform, opacity' }}
      >
        <Navigation darkMode={darkMode} setDarkMode={setDarkMode} />
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <WorkSection />
        <ContactSection />
      </div>
      
      {/* Horizontal Work Section Overlay */}
      {showHorizontalWork && <HorizontalWorkSection />}
    </div>
  );
};

export default Index;
