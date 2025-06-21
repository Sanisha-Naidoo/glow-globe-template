
import { useState } from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import ProcessSection from '../components/ProcessSection';
import WorkSection from '../components/WorkSection';
import TestimonialsSection from '../components/TestimonialsSection';
import AwardsSection from '../components/AwardsSection';
import ContactSection from '../components/ContactSection';

const Index = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`${darkMode ? 'dark' : ''} transition-all duration-500 gpu-accelerated`}>
      <div className="bg-gradient-to-br from-stone-50 via-stone-100 to-neutral-200 text-stone-900 min-h-screen relative overflow-x-hidden">
        <Navigation darkMode={darkMode} setDarkMode={setDarkMode} />
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProcessSection />
        <WorkSection />
        <TestimonialsSection />
        <AwardsSection />
        <ContactSection />
      </div>
    </div>
  );
};

export default Index;
