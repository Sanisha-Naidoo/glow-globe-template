import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { InspirationPost } from '@/data/inspirations';

interface GammaModalProps {
  post: InspirationPost | null;
  open: boolean;
  onClose: () => void;
}

const GammaModal = ({ post, open, onClose }: GammaModalProps) => {
  if (!post?.gammaUrl) return null;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-5xl w-[95vw] h-[85vh] p-0 bg-dark-bg border-text-light/10 overflow-hidden">
        <DialogTitle className="sr-only">{post.title}</DialogTitle>
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-text-light/10">
          <h2 className="text-lg font-semibold text-text-light truncate pr-4">
            {post.title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-text-light/50 hover:text-text-light hover:bg-text-light/10 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Iframe */}
        <div className="flex-1 h-[calc(85vh-65px)]">
          <iframe
            src={post.gammaUrl}
            className="w-full h-full"
            allow="fullscreen"
            title={post.title}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GammaModal;
