import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { inspirations, categories, InspirationCategory } from '@/data/inspirations';
import InspirationCard from '@/components/InspirationCard';
import { cn } from '@/lib/utils';

const Inspirations = () => {
  const [activeCategory, setActiveCategory] = useState<InspirationCategory | 'all'>('all');

  const filteredPosts = activeCategory === 'all'
    ? inspirations
    : inspirations.filter(post => post.category === activeCategory);

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

      {/* Masonry Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-text-light/50 text-lg">No posts in this category yet.</p>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 sm:gap-6">
            {filteredPosts.map((post) => (
              <InspirationCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-text-light/10 py-8 sm:py-12">
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
