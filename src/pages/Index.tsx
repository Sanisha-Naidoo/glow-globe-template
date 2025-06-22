import { useState } from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import WorkSection from '../components/WorkSection';
import ContactSection from '../components/ContactSection';
import WorkGallery from '../components/WorkGallery';

const Index = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [showWorkGallery, setShowWorkGallery] = useState(false);

  const handleExitGallery = () => {
    setShowWorkGallery(false);
  };

  return (
    <div className={`${darkMode ? 'dark' : ''} transition-all duration-500`}>
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white min-h-screen relative overflow-x-hidden">
        <Navigation darkMode={darkMode} setDarkMode={setDarkMode} />
        <HeroSection />
        <AboutSection />
        <WorkSection />
        <ContactSection />
      </div>
      
      {/* Work Gallery Modal */}
      {showWorkGallery && (
        <WorkGallery onClose={handleExitGallery} />
      )}
    </div>
  );
};

export default Index;
