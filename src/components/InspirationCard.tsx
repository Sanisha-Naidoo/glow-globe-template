import { ExternalLink, Linkedin, Twitter, Link2, BookOpen, Package, FileText, Lightbulb, Wrench } from 'lucide-react';
import { InspirationPost, InspirationCategory } from '@/data/inspirations';
import { shareToLinkedIn, shareToTwitter, copyToClipboard, getPostUrl } from '@/utils/share';
import { cn } from '@/lib/utils';

const categoryIcons: Record<InspirationCategory, React.ReactNode> = {
  books: <BookOpen size={14} />,
  products: <Package size={14} />,
  articles: <FileText size={14} />,
  ideas: <Lightbulb size={14} />,
  tools: <Wrench size={14} />
};

const categoryColors: Record<InspirationCategory, string> = {
  books: 'bg-amber-500/20 text-amber-400',
  products: 'bg-emerald-500/20 text-emerald-400',
  articles: 'bg-blue-500/20 text-blue-400',
  ideas: 'bg-purple-500/20 text-purple-400',
  tools: 'bg-rose-500/20 text-rose-400'
};

interface InspirationCardProps {
  post: InspirationPost;
}

const InspirationCard = ({ post }: InspirationCardProps) => {
  const postUrl = getPostUrl(post.id);
  
  const sizeClasses = {
    small: 'break-inside-avoid',
    medium: 'break-inside-avoid',
    large: 'break-inside-avoid'
  };

  return (
    <article
      id={post.id}
      className={cn(
        'group bg-foreground/5 border border-text-light/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 hover:border-cyan-accent/30 transition-all duration-300',
        sizeClasses[post.size || 'medium']
      )}
    >
      {/* Image */}
      {post.image && (
        <div className="mb-4 -mx-4 -mt-4 sm:-mx-6 sm:-mt-6 overflow-hidden rounded-t-xl sm:rounded-t-2xl">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      {/* Category Badge */}
      <div className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium mb-3',
        categoryColors[post.category]
      )}>
        {categoryIcons[post.category]}
        <span className="capitalize">{post.category}</span>
      </div>

      {/* Title */}
      <h3 className="text-lg sm:text-xl font-bold text-text-light mb-2 group-hover:text-cyan-accent transition-colors">
        {post.title}
      </h3>

      {/* Content */}
      <div className="text-text-light/70 text-sm sm:text-base leading-relaxed mb-4 whitespace-pre-line">
        {post.content}
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 bg-text-light/5 text-text-light/50 rounded-md"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-text-light/10">
        {/* External Link */}
        {post.link ? (
          <a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-cyan-accent hover:text-cyan-accent/80 text-sm font-medium transition-colors"
          >
            <ExternalLink size={14} />
            <span>Visit</span>
          </a>
        ) : (
          <span className="text-text-light/40 text-xs">
            {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        )}

        {/* Share Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => shareToLinkedIn(postUrl, post.title)}
            className="p-2 text-text-light/50 hover:text-[#0077b5] hover:bg-[#0077b5]/10 rounded-lg transition-all duration-200"
            title="Share on LinkedIn"
          >
            <Linkedin size={16} />
          </button>
          <button
            onClick={() => shareToTwitter(postUrl, post.title)}
            className="p-2 text-text-light/50 hover:text-text-light hover:bg-text-light/10 rounded-lg transition-all duration-200"
            title="Share on X"
          >
            <Twitter size={16} />
          </button>
          <button
            onClick={() => copyToClipboard(postUrl)}
            className="p-2 text-text-light/50 hover:text-cyan-accent hover:bg-cyan-accent/10 rounded-lg transition-all duration-200"
            title="Copy link"
          >
            <Link2 size={16} />
          </button>
        </div>
      </div>
    </article>
  );
};

export default InspirationCard;
