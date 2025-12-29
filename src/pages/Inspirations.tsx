import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { inspirations, categories, InspirationCategory, InspirationPost } from '@/data/inspirations';
import InspirationListItem from '@/components/InspirationListItem';
import ContentPreview from '@/components/ContentPreview';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const Inspirations = () => {
  const [activeCategory, setActiveCategory] = useState<InspirationCategory | 'all'>('all');
  const [selectedPost, setSelectedPost] = useState<InspirationPost | null>(null);
  const isMobile = useIsMobile();
  const previewRef = useRef<HTMLDivElement>(null);

  const filteredPosts = activeCategory === 'all'
    ? inspirations
    : inspirations.filter(post => post.category === activeCategory);

  // Auto-select first post when filter changes or on mount
  useEffect(() => {
    if (filteredPosts.length > 0 && !selectedPost) {
      setSelectedPost(filteredPosts[0]);
    } else if (filteredPosts.length > 0 && selectedPost) {
      // If current selection is filtered out, select first available
      const stillVisible = filteredPosts.some(p => p.id === selectedPost.id);
      if (!stillVisible) {
        setSelectedPost(filteredPosts[0]);
      }
    }
  }, [filteredPosts, activeCategory]);

  // Scroll to preview on mobile when post is selected
  const handlePostSelect = (post: InspirationPost) => {
    setSelectedPost(post);
    if (isMobile && previewRef.current) {
      setTimeout(() => {
        previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-2xl bg-dark-bg/80 border-b border-text-light/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-text-light/70 hover:text-cyan-accent transition-colors text-sm font-medium"
            >
              <ArrowLeft size={18} />
              <span className="hidden sm:inline">Back to Imagination Lab</span>
              <span className="sm:hidden">Back</span>
            </Link>
            <h1 className="text-lg sm:text-xl font-medium tracking-[0.15em] text-text-light uppercase">
              Inspirations
            </h1>
            <div className="w-20 sm:w-32" /> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      {/* Category Tabs */}
      <div className="sticky top-[73px] sm:top-[89px] z-40 backdrop-blur-2xl bg-dark-bg/80 border-b border-text-light/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 sm:py-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  'px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200',
                  activeCategory === category.id
                    ? 'bg-cyan-accent text-dark-bg'
                    : 'bg-text-light/5 text-text-light/70 hover:bg-text-light/10 hover:text-text-light'
                )}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content - Split View */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-8">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-text-light/50 text-lg">No posts in this category yet.</p>
          </div>
        ) : (
          <div className={cn(
            'flex gap-6',
            isMobile ? 'flex-col' : 'flex-row'
          )}>
            {/* Left: List of Posts */}
            <div className={cn(
              'flex-shrink-0 space-y-3',
              isMobile ? 'w-full' : 'w-80'
            )}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-medium text-text-light/60 uppercase tracking-wider">
                  {filteredPosts.length} {filteredPosts.length === 1 ? 'Post' : 'Posts'}
                </h2>
                {isMobile && selectedPost && (
                  <button
                    onClick={() => previewRef.current?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex items-center gap-1 text-xs text-cyan-accent"
                  >
                    View Preview <ChevronDown size={14} />
                  </button>
                )}
              </div>
              
              <div className={cn(
                'space-y-3',
                isMobile ? 'max-h-[40vh] overflow-y-auto pr-2' : 'max-h-[calc(100vh-250px)] overflow-y-auto pr-2'
              )}>
                {filteredPosts.map((post) => (
                  <InspirationListItem
                    key={post.id}
                    post={post}
                    isSelected={selectedPost?.id === post.id}
                    onClick={() => handlePostSelect(post)}
                  />
                ))}
              </div>
            </div>

            {/* Right: Content Preview */}
            <div
              ref={previewRef}
              className={cn(
                'flex-1 rounded-2xl border border-text-light/10 overflow-hidden',
                isMobile ? 'h-[60vh]' : 'h-[calc(100vh-250px)] sticky top-[180px]'
              )}
            >
              {selectedPost ? (
                <ContentPreview post={selectedPost} className="h-full" />
              ) : (
                <div className="h-full flex items-center justify-center text-text-light/40">
                  Select a post to preview
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-text-light/10 py-8 sm:py-12 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center">
          <p className="text-text-light/40 text-sm">
            Curated thoughts and discoveries from the Imagination Lab
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Inspirations;
