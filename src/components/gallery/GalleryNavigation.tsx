
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface GalleryNavigationProps {
  currentIndex: number;
  totalScreens: number;
  onIndexChange: (index: number) => void;
}

const GalleryNavigation = ({ currentIndex, totalScreens, onIndexChange }: GalleryNavigationProps) => {
  return (
    <>
      {/* Progress Indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center space-x-3 bg-slate-800/20 backdrop-blur-sm border border-slate-600/20 rounded-full px-4 py-2">
          {Array.from({ length: totalScreens }).map((_, index) => (
            <button
              key={index}
              onClick={() => onIndexChange(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white w-8' 
                  : 'bg-slate-600 hover:bg-slate-500'
              }`}
              aria-label={`Go to section ${index + 1}`}
            />
          ))}
          <span className="text-xs text-gray-200 ml-2 font-normal">
            {currentIndex + 1} / {totalScreens}
          </span>
        </div>
      </div>

      {/* Swipe Instructions for Mobile */}
      <div className="fixed bottom-20 right-8 z-20 md:hidden">
        <div className="bg-slate-800/20 backdrop-blur-sm border border-slate-600/20 rounded-lg p-3 text-gray-200 text-xs">
          <div className="flex items-center gap-2">
            <ArrowLeft size={12} />
            <ArrowRight size={12} />
            <span className="font-normal">Swipe to navigate</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default GalleryNavigation;
