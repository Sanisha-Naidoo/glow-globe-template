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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-8">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-text-light/50 text-lg">No posts in this category yet.</p>
          </div>
        ) : isMobile ? (
          // Mobile Layout
          <div className="flex flex-col gap-6">
            {/* Category Tabs - Mobile */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200',
                    activeCategory === category.id
                      ? 'bg-cyan-accent text-dark-bg'
                      : 'bg-text-light/5 text-text-light/70 hover:bg-text-light/10 hover:text-text-light'
                  )}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* List of Posts - Mobile */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-medium text-text-light/60 uppercase tracking-wider">
                  {filteredPosts.length} {filteredPosts.length === 1 ? 'Post' : 'Posts'}
                </h2>
                {selectedPost && (
                  <button
                    onClick={() => previewRef.current?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex items-center gap-1 text-xs text-cyan-accent"
                  >
                    View Preview <ChevronDown size={14} />
                  </button>
                )}
              </div>
              
              <div className="max-h-[40vh] overflow-y-auto pr-2 space-y-3">
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

            {/* Content Preview - Mobile */}
            <div
              ref={previewRef}
              className="h-[60vh] rounded-2xl border border-text-light/10 overflow-hidden"
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
        ) : (
          // Desktop Layout - Fixed Split
          <div className="flex min-h-[calc(100vh-180px)] rounded-2xl border border-text-light/10 overflow-hidden">
            {/* Left Panel - List */}
            <div className="w-[340px] flex-shrink-0 h-full flex flex-col bg-dark-bg/50 border-r border-text-light/10">
              {/* Category Tabs - Inline */}
              <div className="p-4 border-b border-text-light/10">
                <div className="flex gap-2 flex-wrap">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={cn(
                        'px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200',
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

              {/* Posts Count */}
              <div className="px-4 py-3 border-b border-text-light/5">
                <h2 className="text-xs font-medium text-text-light/40 uppercase tracking-wider">
                  {filteredPosts.length} {filteredPosts.length === 1 ? 'Post' : 'Posts'}
                </h2>
              </div>

              {/* Posts List */}
              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {filteredPosts.map((post) => (
                  <InspirationListItem
                    key={post.id}
                    post={post}
                    isSelected={selectedPost?.id === post.id}
                    onClick={() => handlePostSelect(post)}
                    compact
                  />
                ))}
              </div>
            </div>

            {/* Right Panel - Preview */}
            <div className="flex-1 bg-foreground/5">
              {selectedPost ? (
                <ContentPreview post={selectedPost} className="h-full" showFullMetadata />
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
