
import { useState } from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';

const Index = () => {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={`${darkMode ? 'dark' : ''} transition-all duration-500`}>
      <div className="bg-dark-bg text-white min-h-screen relative overflow-x-hidden">
        <Navigation darkMode={darkMode} setDarkMode={setDarkMode} />
        <HeroSection />
        <AboutSection />
        <ContactSection />
      </div>
    </div>
  );
};

export default Index;
