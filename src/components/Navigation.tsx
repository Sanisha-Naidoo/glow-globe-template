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
    { name: 'Work', id: 'work' },
    { name: 'Contact', id: 'contact' }
  ];

  return (
    <nav 
      ref={navRef}
      className="fixed top-0 w-full z-50 nav-hidden transition-all duration-700 ease-out"
    >
      <div className="backdrop-blur-2xl bg-slate-950/10 border-b border-slate-700/20">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="text-xl font-medium tracking-widest text-white">
              PORTFOLIO
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-16">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-100 hover:text-white transition-all duration-500 text-sm font-normal tracking-wider relative group uppercase"
                >
                  {item.name}
                  <span className="absolute -bottom-2 left-1/2 w-0 h-px bg-gradient-to-r from-transparent via-white to-transparent group-hover:w-full group-hover:left-0 transition-all duration-700 ease-out"></span>
                </button>
              ))}
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-100 hover:text-white transition-colors duration-300"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden backdrop-blur-2xl bg-slate-950/20 border-t border-slate-700/20">
            <div className="px-8 py-6 space-y-6">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left text-gray-100 hover:text-white transition-colors duration-300 text-sm font-normal tracking-wider py-2 uppercase"
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
