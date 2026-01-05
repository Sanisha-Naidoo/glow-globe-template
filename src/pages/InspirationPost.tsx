import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { inspirations, InspirationPost as InspirationPostType, getContentType } from '@/data/inspirations';
import GammaModal from '@/components/GammaModal';
import ContentPreview from '@/components/ContentPreview';
import { X } from 'lucide-react';

const InspirationPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<InspirationPostType | null>(null);

  useEffect(() => {
    if (id) {
      const foundPost = inspirations.find(p => p.id === id);
      if (foundPost) {
        setPost(foundPost);
      } else {
        // Post not found, redirect to inspirations
        navigate('/inspirations', { replace: true });
      }
    }
  }, [id, navigate]);

  const handleClose = () => {
    navigate('/inspirations');
  };

  // Show loading state while finding post
  if (!post) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-text-light/50">Loading...</div>
      </div>
    );
  }

  const contentType = getContentType(post);

  // For gamma content, use the modal
  if (contentType === 'gamma' && post.gammaUrl) {
    return (
      <div className="min-h-screen bg-dark-bg">
        <GammaModal
          post={post}
          open={true}
          onClose={handleClose}
        />
      </div>
    );
  }

  // For all other content types, show a full-page view
  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Close button */}
      <button
        onClick={handleClose}
        className="fixed top-4 right-4 z-50 p-3 text-text-light/70 hover:text-text-light bg-dark-bg/80 hover:bg-dark-bg rounded-full transition-colors backdrop-blur-sm border border-text-light/10"
      >
        <X size={24} />
      </button>
      
      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 pt-20">
        <ContentPreview post={post} showFullMetadata={true} className="min-h-[70vh]" />
      </div>
    </div>
  );
};

export default InspirationPost;
