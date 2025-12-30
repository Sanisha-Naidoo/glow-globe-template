import { InspirationPost, getContentType, InspirationCategory } from '@/data/inspirations';
import { ExternalLink, Play, FileText, Image, Music, File, Loader2, Linkedin, Link2, BookOpen, Package, Lightbulb, Wrench, Calendar, Tag } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { shareToLinkedIn, copyToClipboard, getPostUrl, getShareUrl } from '@/utils/share';

interface ContentPreviewProps {
  post: InspirationPost;
  className?: string;
  showFullMetadata?: boolean;
}

const categoryIcons: Record<InspirationCategory, React.ReactNode> = {
  books: <BookOpen size={14} />,
  products: <Package size={14} />,
  articles: <FileText size={14} />,
  ideas: <Lightbulb size={14} />,
  tools: <Wrench size={14} />
};

const categoryColors: Record<InspirationCategory, string> = {
  books: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  products: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  articles: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  ideas: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  tools: 'bg-rose-500/20 text-rose-400 border-rose-500/30'
};

const ContentPreview = ({ post, className, showFullMetadata = false }: ContentPreviewProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const contentType = getContentType(post);

  const handleIframeLoad = () => setIsLoading(false);

  const renderContent = () => {
    switch (contentType) {
      case 'gamma':
        // Convert gamma URL to embed format and hide the header
        let gammaEmbedUrl = post.gammaUrl || '';
        if (gammaEmbedUrl && !gammaEmbedUrl.includes('/embed/')) {
          // Extract the ID and convert to embed URL
          const match = gammaEmbedUrl.match(/gamma\.app\/(?:docs|public)\/[^/]+-([a-zA-Z0-9]+)/);
          if (match) {
            gammaEmbedUrl = `https://gamma.app/embed/${match[1]}?style=no-header`;
          }
        } else if (gammaEmbedUrl && !gammaEmbedUrl.includes('style=')) {
          // Add no-header style if not already present
          gammaEmbedUrl += (gammaEmbedUrl.includes('?') ? '&' : '?') + 'style=no-header';
        }
        return (
          <div className="relative w-full h-full">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-foreground/5">
                <Loader2 className="w-8 h-8 text-cyan-accent animate-spin" />
              </div>
            )}
            <iframe
              src={gammaEmbedUrl}
              className={cn(
                'w-full h-full border-none transition-opacity duration-300',
                isLoading ? 'opacity-0' : 'opacity-100'
              )}
              title={post.title}
              loading="lazy"
              onLoad={handleIframeLoad}
              allow="fullscreen"
            />
          </div>
        );

      case 'video':
        // Parse YouTube/Vimeo URLs
        const embedUrl = getVideoEmbedUrl(post.embedUrl || post.link || '');
        return (
          <div className="relative w-full h-full">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-foreground/5">
                <Loader2 className="w-8 h-8 text-cyan-accent animate-spin" />
              </div>
            )}
            {embedUrl ? (
              <iframe
                src={embedUrl}
                className={cn(
                  'w-full h-full border-none transition-opacity duration-300',
                  isLoading ? 'opacity-0' : 'opacity-100'
                )}
                title={post.title}
                loading="lazy"
                onLoad={handleIframeLoad}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-text-light/50 gap-4">
                <Play className="w-16 h-16" />
                <p>Video not available</p>
              </div>
            )}
          </div>
        );

      case 'image':
        const images = post.images || (post.image ? [post.image] : []);
        return (
          <div className="w-full h-full overflow-auto p-4 sm:p-6">
            {images.length === 1 ? (
              <img
                src={images[0]}
                alt={post.title}
                className="w-full h-full object-contain rounded-lg"
              />
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${post.title} - ${idx + 1}`}
                    className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer"
                  />
                ))}
              </div>
            )}
          </div>
        );

      case 'audio':
        return (
          <div className="flex flex-col items-center justify-center h-full gap-6 p-8">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-accent/30 to-purple-500/30 flex items-center justify-center">
              <Music className="w-16 h-16 text-cyan-accent" />
            </div>
            <h3 className="text-xl font-bold text-text-light">{post.title}</h3>
            {post.embedUrl && (
              <audio controls className="w-full max-w-md">
                <source src={post.embedUrl} />
                Your browser does not support audio.
              </audio>
            )}
          </div>
        );

      case 'pdf':
        return (
          <div className="relative w-full h-full">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-foreground/5">
                <Loader2 className="w-8 h-8 text-cyan-accent animate-spin" />
              </div>
            )}
            <iframe
              src={post.pdfUrl}
              className={cn(
                'w-full h-full border-none transition-opacity duration-300',
                isLoading ? 'opacity-0' : 'opacity-100'
              )}
              title={post.title}
              loading="lazy"
              onLoad={handleIframeLoad}
            />
          </div>
        );

      case 'article':
        return (
          <div className="w-full h-full overflow-auto p-6 sm:p-8">
            <article className="prose prose-invert prose-cyan max-w-none">
              <h1 className="text-2xl sm:text-3xl font-bold text-text-light mb-4">{post.title}</h1>
              <p className="text-text-light/70 text-sm mb-6">
                {new Date(post.date).toLocaleDateString('en-US', { 
                  month: 'long', day: 'numeric', year: 'numeric' 
                })}
              </p>
              <div className="text-text-light/80 leading-relaxed whitespace-pre-wrap">
                {post.articleContent || post.content}
              </div>
            </article>
          </div>
        );

      case 'link':
        return (
          <div className="flex flex-col items-center justify-center h-full gap-6 p-8">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-accent/20 to-purple-500/20 flex items-center justify-center">
              <ExternalLink className="w-10 h-10 text-cyan-accent" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-text-light mb-2">{post.title}</h3>
              <p className="text-text-light/60 mb-6">{post.content}</p>
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-accent text-dark-bg font-medium rounded-lg hover:bg-cyan-accent/90 transition-colors"
              >
                <ExternalLink size={18} />
                Visit Link
              </a>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-text-light/50 gap-4">
            <File className="w-16 h-16" />
            <p>No preview available</p>
          </div>
        );
    }
  };

  const postUrl = getPostUrl(post.id);
  const shareUrl = getShareUrl(post.id);

  return (
    <div className={cn('w-full h-full bg-foreground/5 rounded-xl overflow-hidden flex flex-col', className)}>
      {/* Header */}
      <div className={cn(
        'shrink-0 border-b border-text-light/10',
        showFullMetadata ? 'p-4' : 'p-3'
      )}>
        {showFullMetadata ? (
          // Full metadata header for desktop
          <div className="space-y-3">
            {/* Top row: Category, Content Type, Date */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className={cn(
                'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border',
                categoryColors[post.category]
              )}>
                {categoryIcons[post.category]}
                <span className="capitalize">{post.category}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-text-light/5 text-text-light/60 border border-text-light/10">
                {contentTypeIcons[contentType]}
                <span className="capitalize">{contentType}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-text-light/40">
                <Calendar size={12} />
                {new Date(post.date).toLocaleDateString('en-US', { 
                  month: 'long', day: 'numeric', year: 'numeric' 
                })}
              </span>
            </div>
            
            {/* Title row */}
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-lg font-semibold text-text-light leading-tight">
                {post.title}
              </h2>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => shareToLinkedIn(shareUrl, post.title)}
                  className="p-2 text-text-light/50 hover:text-[#0077b5] hover:bg-[#0077b5]/10 rounded-lg transition-all duration-200"
                  title="Share on LinkedIn"
                >
                  <Linkedin size={16} />
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

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <Tag size={12} className="text-text-light/30" />
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-[10px] font-medium rounded bg-text-light/5 text-text-light/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ) : (
          // Compact header for mobile
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-text-light truncate mr-4">{post.title}</h2>
            <div className="flex items-center gap-1">
              <button
                onClick={() => shareToLinkedIn(shareUrl, post.title)}
                className="p-2 text-text-light/50 hover:text-[#0077b5] hover:bg-[#0077b5]/10 rounded-lg transition-all duration-200"
                title="Share on LinkedIn"
              >
                <Linkedin size={16} />
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
        )}
      </div>
      {/* Content */}
      <div className="flex-1 min-h-0">
        {renderContent()}
      </div>
    </div>
  );
};

// Helper to convert YouTube/Vimeo URLs to embed URLs
function getVideoEmbedUrl(url: string): string | null {
  if (!url) return null;

  // YouTube
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  if (ytMatch) {
    return `https://www.youtube.com/embed/${ytMatch[1]}`;
  }

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }

  // Already an embed URL or direct video
  if (url.includes('embed') || url.endsWith('.mp4')) {
    return url;
  }

  return null;
}

// Content type icons for list view
export const contentTypeIcons: Record<string, React.ReactNode> = {
  gamma: <FileText size={14} />,
  video: <Play size={14} />,
  image: <Image size={14} />,
  audio: <Music size={14} />,
  pdf: <File size={14} />,
  article: <FileText size={14} />,
  link: <ExternalLink size={14} />,
};

export default ContentPreview;
