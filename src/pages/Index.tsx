import { useState } from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import BuildingInPublicSection from '../components/BuildingInPublicSection';
import PastProjectsSection from '../components/PastProjectsSection';
import ComingSoonSection from '../components/ComingSoonSection';
import BrandShowcase from '../components/BrandShowcase';
import ContactSection from '../components/ContactSection';
import ParticleAnimation from '../components/ParticleAnimation';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const [darkMode, setDarkMode] = useState(true);
  const isMobile = useIsMobile();

  return (
    <div className={`${darkMode ? 'dark' : ''} transition-all duration-500`}>
      <div className="bg-dark-bg text-text-light min-h-screen relative overflow-x-hidden">
        <Navigation darkMode={darkMode} setDarkMode={setDarkMode} />
        
        {/* Hero with particle animation overlay - hidden on mobile for performance */}
        <div className="relative">
          {!isMobile && <ParticleAnimation />}
          <HeroSection />
        </div>
        
        <BuildingInPublicSection />
        <PastProjectsSection />
        <ComingSoonSection />
        <BrandShowcase />
        <ContactSection />
      </div>
    </div>
  );
};

export default Index;
