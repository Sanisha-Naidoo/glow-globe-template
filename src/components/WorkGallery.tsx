
import { useRef, useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, X, ArrowUp } from 'lucide-react';
import { Button } from './ui/button';

interface WorkGalleryProps {
  onClose: () => void;
}

const WorkGallery = ({ onClose }: WorkGalleryProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const workScreens = [
    {
      title: "Featured Projects",
      subtitle: "Selected Works",
      content: "Explore our most impactful digital experiences crafted with cinematic precision and innovative technology.",
      projects: ["Kinetic Architecture", "Neural Pathways", "Temporal Narratives"]
    },
    {
      title: "Creative Process",
      subtitle: "Our Approach",
      content: "From concept to execution, we blend artistic vision with technical mastery to create unforgettable experiences.",
      projects: ["Research & Discovery", "Concept Development", "Technical Implementation"]
    },
    {
      title: "Case Studies",
      subtitle: "Deep Dive",
      content: "Detailed exploration of our most challenging and rewarding projects, showcasing problem-solving and innovation.",
      projects: ["Quantum Interfaces", "Biometric Gardens", "Sonic Architectures"]
    },
    {
      title: "Results & Impact",
      subtitle: "Outcomes",
      content: "Measuring success through user engagement, industry recognition, and transformative digital experiences.",
      projects: ["Memory Fragments", "Digital Organisms", "Interactive Installations"]
    }
  ];

  const goToNext = () => {
    if (currentIndex < workScreens.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [currentIndex, onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 overflow-hidden">
      {/* Header Controls */}
      <div className="fixed top-0 left-0 right-0 z-20 flex justify-between items-center p-6 bg-gradient-to-b from-slate-950/80 to-transparent backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-slate-300 hover:text-white hover:bg-slate-800/50"
            aria-label="Close gallery"
          >
            <ArrowUp size={20} />
          </Button>
          <span className="text-slate-400 text-sm">Press ESC or click to exit</span>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className="text-slate-300 hover:text-white hover:bg-slate-800/50 disabled:opacity-30"
            aria-label="Previous section"
          >
            <ArrowLeft size={20} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            disabled={currentIndex === workScreens.length - 1}
            className="text-slate-300 hover:text-white hover:bg-slate-800/50 disabled:opacity-30"
            aria-label="Next section"
          >
            <ArrowRight size={20} />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div 
        ref={containerRef}
        className="h-full flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {workScreens.map((screen, index) => (
          <div
            key={index}
            className="w-full h-full flex-shrink-0 flex items-center justify-center px-16 pt-20 pb-16"
          >
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-8">
                <span className="text-xs font-extralight tracking-[0.3em] text-slate-400 uppercase block mb-4">
                  {screen.subtitle}
                </span>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-extralight text-white mb-8 tracking-[0.05em]">
                  {screen.title}
                </h2>
                <div className="w-16 h-px bg-gradient-to-r from-slate-300 to-transparent mx-auto mb-8"></div>
              </div>

              <p className="text-lg md:text-xl text-slate-200 mb-12 font-extralight leading-[1.8] tracking-wide max-w-3xl mx-auto">
                {screen.content}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {screen.projects.map((project, projectIndex) => (
                  <div
                    key={projectIndex}
                    className="group relative p-6 backdrop-blur-3xl bg-gradient-to-br from-slate-800/8 to-slate-600/4 border border-slate-600/15 rounded-sm hover:border-slate-500/25 transition-all duration-500 ease-out transform hover:scale-[1.02] hover:-translate-y-2 cursor-pointer"
                    tabIndex={0}
                    role="button"
                    aria-label={`Explore ${project}`}
                  >
                    <h3 className="text-base md:text-lg font-extralight text-white group-hover:text-slate-100 transition-colors duration-500 tracking-[0.05em] mb-4">
                      {project}
                    </h3>
                    
                    <div className="flex items-center space-x-3 text-slate-400 group-hover:text-slate-200 transition-colors duration-500">
                      <span className="text-xs font-extralight tracking-[0.2em] uppercase">Explore</span>
                      <div className="w-6 h-px bg-gradient-to-r from-slate-400 to-transparent group-hover:w-12 transition-all duration-500"></div>
                    </div>

                    <div className="absolute top-4 right-4 w-1 h-1 bg-slate-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-200/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center space-x-3 bg-slate-800/20 backdrop-blur-sm border border-slate-600/20 rounded-full px-4 py-2">
          {workScreens.map((_, index) => (
            <button
              key={index}
              onClick={() => goToIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white w-8' 
                  : 'bg-slate-600 hover:bg-slate-500'
              }`}
              aria-label={`Go to section ${index + 1}`}
            />
          ))}
          <span className="text-xs text-slate-400 ml-2">
            {currentIndex + 1} / {workScreens.length}
          </span>
        </div>
      </div>

      {/* Swipe Instructions for Mobile */}
      <div className="fixed bottom-20 right-8 z-20 md:hidden">
        <div className="bg-slate-800/20 backdrop-blur-sm border border-slate-600/20 rounded-lg p-3 text-slate-400 text-xs">
          <div className="flex items-center gap-2">
            <ArrowLeft size={12} />
            <ArrowRight size={12} />
            <span>Swipe to navigate</span>
          </div>
        </div>
      </div>

      {/* Click overlay to close */}
      <div 
        className="absolute inset-0 -z-10"
        onClick={onClose}
        aria-label="Click to close gallery"
      />
    </div>
  );
};

export default WorkGallery;
