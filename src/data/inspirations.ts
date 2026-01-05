import lovableVibes2025 from '@/assets/lovable-vibes-2025.png';

export type InspirationCategory = 'books' | 'products' | 'articles' | 'ideas' | 'tools';

export type CardSize = 'small' | 'medium' | 'large';

// Content types for future-proofing
export type ContentType = 
  | 'gamma'      // Gamma.app embed
  | 'image'      // Single image or gallery
  | 'video'      // YouTube, Vimeo, or direct video
  | 'audio'      // Podcast, audio file
  | 'pdf'        // PDF embed
  | 'article'    // Text/markdown content
  | 'link';      // External link with preview

export interface InspirationPost {
  id: string;
  title: string;
  content: string;
  image?: string;
  link?: string;
  gammaUrl?: string; // Gamma embed URL for modal viewing
  category: InspirationCategory;
  date: string;
  tags?: string[];
  size?: CardSize;
  
  // Future-proof content fields
  contentType?: ContentType;
  embedUrl?: string;      // For video/audio embeds
  images?: string[];      // For galleries
  pdfUrl?: string;        // For PDF embeds
  articleContent?: string; // For long-form text (markdown)
}

// Helper to determine content type from post
export const getContentType = (post: InspirationPost): ContentType => {
  if (post.contentType) return post.contentType;
  if (post.gammaUrl) return 'gamma';
  if (post.images && post.images.length > 0) return 'image';
  if (post.pdfUrl) return 'pdf';
  if (post.embedUrl) return 'video';
  if (post.articleContent) return 'article';
  if (post.link) return 'link';
  return 'article'; // default to article for text content
};

// Add your inspiration posts here
export const inspirations: InspirationPost[] = [
  {
    id: '2',
    title: 'My 2025 Lovable Vibes',
    content: 'Top 1% globally for code written with 697K lines, 1.9K messages sent, and a 9/10 politeness score. National Treasure status achieved!',
    image: lovableVibes2025,
    link: 'https://lovable.dev/vibes/xw86xPulfAX2nL5l1RBSRqSpydR2/summary',
    contentType: 'image',
    category: 'ideas',
    date: '2025-01-05',
    tags: ['lovable', '2025', 'vibes', 'stats'],
    size: 'medium'
  },
  {
    id: '1',
    title: 'Reflections on 2025',
    content: 'Personal reflections and insights on the year ahead.',
    gammaUrl: 'https://gamma.app/docs/Reflections-on-2025-g4i7szzblqeltb8',
    contentType: 'gamma',
    category: 'ideas',
    date: '2025-12-21',
    tags: ['reflections', '2025'],
    size: 'large'
  }
];

export const categories: { id: InspirationCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'books', label: 'Books' },
  { id: 'products', label: 'Products' },
  { id: 'articles', label: 'Articles' },
  { id: 'ideas', label: 'TLDR' },
  { id: 'tools', label: 'Tools' }
];
