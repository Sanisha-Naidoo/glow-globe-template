export type InspirationCategory = 'books' | 'products' | 'articles' | 'ideas' | 'tools';

export type CardSize = 'small' | 'medium' | 'large';

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
}

// Add your inspiration posts here
export const inspirations: InspirationPost[] = [
  {
    id: '1',
    title: 'Reflections on 2025',
    content: 'Personal reflections and insights on the year ahead.',
    gammaUrl: 'https://gamma.app/embed/g4i7szzblqeltb8',
    category: 'ideas',
    date: '2025-01-01',
    tags: ['reflections', '2025'],
    size: 'large'
  }
];

export const categories: { id: InspirationCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'books', label: 'Books' },
  { id: 'products', label: 'Products' },
  { id: 'articles', label: 'Articles' },
  { id: 'ideas', label: 'Ideas' },
  { id: 'tools', label: 'Tools' }
];
