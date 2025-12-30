import { InspirationPost, InspirationCategory, getContentType } from '@/data/inspirations';
import { contentTypeIcons } from './ContentPreview';
import { BookOpen, Package, FileText, Lightbulb, Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';

export const categoryIcons: Record<InspirationCategory, React.ReactNode> = {
  books: <BookOpen size={12} />,
  products: <Package size={12} />,
  articles: <FileText size={12} />,
  ideas: <Lightbulb size={12} />,
  tools: <Wrench size={12} />
};

export const categoryColors: Record<InspirationCategory, string> = {
  books: 'bg-amber-500/20 text-amber-400',
  products: 'bg-emerald-500/20 text-emerald-400',
  articles: 'bg-blue-500/20 text-blue-400',
  ideas: 'bg-purple-500/20 text-purple-400',
  tools: 'bg-rose-500/20 text-rose-400'
};

interface InspirationListItemProps {
  post: InspirationPost;
  isSelected: boolean;
  onClick: () => void;
  compact?: boolean;
}

const InspirationListItem = ({ post, isSelected, onClick, compact = false }: InspirationListItemProps) => {
  const contentType = getContentType(post);

  if (compact) {
    // Compact mode for desktop - minimal info, title only
    return (
      <button
        onClick={onClick}
        className={cn(
          'w-full text-left p-3 rounded-lg border transition-all duration-200 group',
          isSelected
            ? 'bg-cyan-accent/10 border-cyan-accent/40'
            : 'bg-foreground/5 border-transparent hover:bg-foreground/10 hover:border-text-light/10'
        )}
      >
        {/* Category badge */}
        <div className="flex items-center gap-2 mb-1.5">
          <span className={cn(
            'inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium',
            categoryColors[post.category]
          )}>
            {categoryIcons[post.category]}
            <span className="capitalize">{post.category}</span>
          </span>
          <span className="text-[10px] text-text-light/30">
            {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        </div>

        {/* Title only */}
        <h3 className={cn(
          'font-medium text-sm transition-colors line-clamp-2',
          isSelected ? 'text-cyan-accent' : 'text-text-light group-hover:text-text-light'
        )}>
          {post.title}
        </h3>
      </button>
    );
  }

  // Full mode for mobile
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full text-left p-4 rounded-xl border transition-all duration-200',
        isSelected
          ? 'bg-cyan-accent/10 border-cyan-accent/40'
          : 'bg-foreground/5 border-text-light/10 hover:bg-foreground/10 hover:border-text-light/20'
      )}
    >
      {/* Category & Content Type */}
      <div className="flex items-center gap-2 mb-2">
        <span className={cn(
          'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium',
          categoryColors[post.category]
        )}>
          {categoryIcons[post.category]}
          <span className="capitalize">{post.category}</span>
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-text-light/10 text-text-light/60">
          {contentTypeIcons[contentType]}
          <span className="capitalize">{contentType}</span>
        </span>
      </div>

      {/* Title */}
      <h3 className={cn(
        'font-semibold text-sm mb-1 transition-colors line-clamp-2',
        isSelected ? 'text-cyan-accent' : 'text-text-light'
      )}>
        {post.title}
      </h3>

      {/* Description */}
      <p className="text-text-light/50 text-xs line-clamp-2">
        {post.content}
      </p>

      {/* Date */}
      <p className="text-text-light/30 text-[10px] mt-2">
        {new Date(post.date).toLocaleDateString('en-US', { 
          month: 'short', day: 'numeric', year: 'numeric' 
        })}
      </p>
    </button>
  );
};

export default InspirationListItem;
