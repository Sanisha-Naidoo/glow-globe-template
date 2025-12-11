import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useScrollNavigation } from '../hooks/useScrollAnimation';

interface NavigationProps {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

const Navigation = ({ darkMode, setDarkMode }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useScrollNavigation();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'Building', id: 'building' },
    { name: 'Projects', id: 'projects' },
    { name: 'Coming Soon', id: 'coming-soon' },
    { name: 'Contact', id: 'contact' }
  ];

  return (
    <nav 
      ref={navRef}
      className="fixed top-0 w-full z-50 nav-hidden transition-all duration-700 ease-out"
    >
      <div className="backdrop-blur-2xl bg-dark-bg/10 border-b border-text-light/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 sm:py-6">
          <div className="flex justify-between items-center">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-base font-medium tracking-[0.2em] text-text-light hover:text-cyan-accent transition-colors uppercase"
            >
              IMAGINATION LAB
            </button>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-12">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className="text-text-light/70 hover:text-cyan-accent transition-all duration-300 text-sm font-medium tracking-[0.15em] relative group uppercase"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-1/2 w-0 h-px bg-cyan-accent group-hover:w-full group-hover:left-0 transition-all duration-300" />
                </button>
              ))}
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-text-light hover:text-cyan-accent transition-colors duration-300"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden backdrop-blur-2xl bg-dark-bg/90 border-t border-text-light/10">
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left text-text-light/70 hover:text-cyan-accent transition-colors duration-300 text-base font-medium tracking-[0.15em] py-2 uppercase"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
