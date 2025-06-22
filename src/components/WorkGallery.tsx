
import { useEffect, useState } from 'react';
import GalleryHeader from './gallery/GalleryHeader';
import GalleryContent from './gallery/GalleryContent';
import GalleryNavigation from './gallery/GalleryNavigation';

interface WorkGalleryProps {
  onClose: () => void;
}

const WorkGallery = ({ onClose }: WorkGalleryProps) => {
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
      <GalleryHeader
        onClose={onClose}
        currentIndex={currentIndex}
        totalScreens={workScreens.length}
        onPrevious={goToPrevious}
        onNext={goToNext}
      />

      <GalleryContent
        workScreens={workScreens}
        currentIndex={currentIndex}
      />

      <GalleryNavigation
        currentIndex={currentIndex}
        totalScreens={workScreens.length}
        onIndexChange={setCurrentIndex}
      />

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
