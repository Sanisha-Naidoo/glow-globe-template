
import { ArrowUp, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

interface GalleryHeaderProps {
  onClose: () => void;
  currentIndex: number;
  totalScreens: number;
  onPrevious: () => void;
  onNext: () => void;
}

const GalleryHeader = ({ 
  onClose, 
  currentIndex, 
  totalScreens, 
  onPrevious, 
  onNext 
}: GalleryHeaderProps) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-20 flex justify-between items-center p-6 bg-gradient-to-b from-slate-950/80 to-transparent backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-gray-100 hover:text-white hover:bg-slate-800/50"
          aria-label="Close gallery"
        >
          <ArrowUp size={20} />
        </Button>
        <span className="text-gray-200 text-sm font-normal">Press ESC or click to exit</span>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onPrevious}
          disabled={currentIndex === 0}
          className="text-gray-100 hover:text-white hover:bg-slate-800/50 disabled:opacity-30"
          aria-label="Previous section"
        >
          <ArrowLeft size={20} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onNext}
          disabled={currentIndex === totalScreens - 1}
          className="text-gray-100 hover:text-white hover:bg-slate-800/50 disabled:opacity-30"
          aria-label="Next section"
        >
          <ArrowRight size={20} />
        </Button>
      </div>
    </div>
  );
};

export default GalleryHeader;
