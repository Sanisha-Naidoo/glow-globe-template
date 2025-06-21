
import { useState, useEffect } from 'react';
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
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Work', id: 'work' },
    { name: 'Contact', id: 'contact' }
  ];

  return (
    <nav 
      ref={navRef}
      className="fixed top-0 w-full z-50 nav-hidden transition-all duration-700 ease-out"
    >
      <div className="backdrop-blur-2xl bg-white/20 border-b border-stone-200/30">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="text-xl font-light tracking-[0.2em] text-stone-800 hover:text-stone-900 transition-colors duration-500">
              PORTFOLIO
            </div>
            
            <div className="hidden md:flex items-center space-x-16">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className="text-stone-600 hover:text-stone-900 transition-all duration-500 text-sm font-light tracking-[0.15em] relative group uppercase hover:scale-105"
                >
                  {item.name}
                  <span className="absolute -bottom-2 left-1/2 w-0 h-px bg-gradient-to-r from-transparent via-stone-700 to-transparent group-hover:w-full group-hover:left-0 transition-all duration-700 ease-out"></span>
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-stone-600 hover:text-stone-900 hover:scale-110 transition-all duration-300"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        
        {isMobileMenuOpen && (
          <div className="md:hidden backdrop-blur-2xl bg-white/30 border-t border-stone-200/30">
            <div className="px-8 py-6 space-y-6">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left text-stone-600 hover:text-stone-900 hover:translate-x-2 transition-all duration-300 text-sm font-light tracking-[0.15em] py-2 uppercase"
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
