
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
  const [horizontalProgress, setHorizontalProgress] = useState(0);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const { subscribeToScroll, setThreshold, toggleDebug } = useHorizontalPageScroll();

  const handleReturnToTop = () => {
    // Reset scroll state through the hook instead of window.scrollTo
    const scrollData = { current: 0, target: 0, velocity: 0, momentum: 0 };
    const horizontalData = { current: 0, target: 0, velocity: 0, isActive: false };
    
    // This will be handled by the hook's internal logic
    setShowHorizontalWork(false);
    setHorizontalProgress(0);
  };

  useEffect(() => {
    // Set threshold to 70% of page scroll
    setThreshold(0.7);
    
    // Disable debug logging for production
    toggleDebug(false);

    const unsubscribe = subscribeToScroll((progress, velocity, hProgress, isHorizontalActive) => {
      setShowHorizontalWork(isHorizontalActive);
      setHorizontalProgress(hProgress);
      
      if (mainContentRef.current) {
        if (isHorizontalActive) {
          // Smoother transition with better visibility
          mainContentRef.current.style.opacity = '0.6';
          mainContentRef.current.style.transform = 'scale(0.99)';
          mainContentRef.current.style.filter = 'blur(0.5px)';
          mainContentRef.current.style.pointerEvents = 'none';
        } else {
          // Restore main content
          mainContentRef.current.style.opacity = '1';
          mainContentRef.current.style.transform = 'scale(1)';
          mainContentRef.current.style.filter = 'blur(0px)';
          mainContentRef.current.style.pointerEvents = 'all';
        }
      }
    });

    return unsubscribe;
  }, [subscribeToScroll, setThreshold, toggleDebug]);

  return (
    <div className={`${darkMode ? 'dark' : ''} transition-all duration-500`}>
      <div 
        ref={mainContentRef}
        className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white min-h-screen relative overflow-x-hidden transition-all duration-500 ease-out"
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
        <div className="fixed inset-0 z-50 transition-opacity duration-500">
          <HorizontalWorkSection 
            horizontalProgress={horizontalProgress}
            onReturnToTop={handleReturnToTop}
          />
        </div>
      )}
    </div>
  );
};

export default Index;
