import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { inspirations, InspirationPost as InspirationPostType } from '@/data/inspirations';
import GammaModal from '@/components/GammaModal';

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

  return (
    <div className="min-h-screen bg-dark-bg">
      <GammaModal
        post={post}
        open={true}
        onClose={handleClose}
      />
    </div>
  );
};

export default InspirationPost;
