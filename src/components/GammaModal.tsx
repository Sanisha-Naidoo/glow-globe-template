import { X } from 'lucide-react';
import { Dialog, DialogPortal, DialogOverlay } from '@/components/ui/dialog';
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { InspirationPost } from '@/data/inspirations';
import { cn } from '@/lib/utils';

interface GammaModalProps {
  post: InspirationPost | null;
  open: boolean;
  onClose: () => void;
}

const GammaModal = ({ post, open, onClose }: GammaModalProps) => {
  if (!post?.gammaUrl) return null;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%] duration-200",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "max-w-5xl w-[95vw] h-[85vh] bg-dark-bg border border-text-light/10 rounded-lg overflow-hidden flex flex-col"
          )}
        >
          <DialogPrimitive.Title className="sr-only">{post.title}</DialogPrimitive.Title>
          
          {/* Close button */}
          <div className="absolute top-2 right-2 z-10">
            <button
              onClick={onClose}
              className="p-2 text-text-light/70 hover:text-text-light bg-dark-bg/80 hover:bg-dark-bg rounded-full transition-colors backdrop-blur-sm"
            >
              <X size={20} />
            </button>
          </div>

          {/* Iframe */}
          <div className="flex-1 min-h-0">
            <iframe
              src={post.gammaUrl}
              className="w-full h-full"
              allow="fullscreen"
              title={post.title}
            />
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
};

export default GammaModal;
