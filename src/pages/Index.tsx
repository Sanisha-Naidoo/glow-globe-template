
import { useState } from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import WorkSection from '../components/WorkSection';
import ContactSection from '../components/ContactSection';

const Index = () => {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={`${darkMode ? 'dark' : ''} transition-all duration-500 gpu-accelerated`}>
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white min-h-screen relative overflow-x-hidden">
        <Navigation darkMode={darkMode} setDarkMode={setDarkMode} />
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <WorkSection />
        <ContactSection />
      </div>
    </div>
  );
};

export default Index;
