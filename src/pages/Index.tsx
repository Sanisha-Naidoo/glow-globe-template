
import { useState, useEffect } from 'react';
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
    <div className={`${darkMode ? 'dark' : ''} transition-all duration-500`}>
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white min-h-screen">
        <Navigation darkMode={darkMode} setDarkMode={setDarkMode} />
        <HeroSection scrollY={scrollY} />
        <AboutSection />
        <WorkSection />
        <ContactSection />
      </div>
    </div>
  );
};

export default Index;
