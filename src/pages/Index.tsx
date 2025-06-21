
import { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import ParticleAnimation from '../components/ParticleAnimation';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import WorkSection from '../components/WorkSection';
import ContactSection from '../components/ContactSection';

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`${darkMode ? 'dark' : ''} transition-all duration-300`}>
      <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950 text-white min-h-screen">
        <Navigation darkMode={darkMode} setDarkMode={setDarkMode} />
        
        {/* Hero Section with Particle Animation */}
        <HeroSection scrollY={scrollY} />
        
        {/* About Section */}
        <AboutSection />
        
        {/* Work Section */}
        <WorkSection />
        
        {/* Contact Section */}
        <ContactSection />
        
        {/* Scroll Indicator */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-white/60" />
        </div>
      </div>
    </div>
  );
};

export default Index;
