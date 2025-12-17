export type InspirationCategory = 'books' | 'products' | 'articles' | 'ideas' | 'tools';

export type CardSize = 'small' | 'medium' | 'large';

export interface InspirationPost {
  id: string;
  title: string;
  content: string; // Supports markdown for longer posts
  image?: string;
  link?: string;
  category: InspirationCategory;
  date: string;
  tags?: string[];
  size?: CardSize; // Controls card size in masonry layout
}

// Add your inspiration posts here - just add new objects to this array!
export const inspirations: InspirationPost[] = [
  {
    id: '1',
    title: 'The Lean Startup',
    content: 'Eric Ries\' approach to building products through validated learning. The core idea of building-measuring-learning cycles has fundamentally shaped how I think about launching new ideas.',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop',
    link: 'https://theleanstartup.com/',
    category: 'books',
    date: '2024-01-15',
    tags: ['startup', 'methodology', 'product'],
    size: 'medium'
  },
  {
    id: '2',
    title: 'Notion',
    content: 'A tool that revolutionized how I organize thoughts and projects. The flexibility of blocks and databases is inspiring.',
    link: 'https://notion.so',
    category: 'products',
    date: '2024-01-10',
    tags: ['productivity', 'organization'],
    size: 'small'
  },
  {
    id: '3',
    title: 'Why Side Projects Matter',
    content: `Side projects are the playground where innovation happens without constraints. They let you:\n\n- Experiment freely without business pressure\n- Learn new technologies hands-on\n- Build things that scratch your own itch\n- Potentially discover the next big idea\n\nThe best products often start as someone's weekend project.`,
    category: 'ideas',
    date: '2024-01-20',
    tags: ['creativity', 'innovation'],
    size: 'large'
  },
  {
    id: '4',
    title: 'Linear',
    content: 'Issue tracking done right. The attention to detail and speed is remarkable.',
    link: 'https://linear.app',
    category: 'tools',
    date: '2024-01-08',
    tags: ['development', 'project-management'],
    size: 'small'
  },
  {
    id: '5',
    title: 'The Psychology of Design',
    content: 'Understanding cognitive biases and how they affect user decisions is crucial for building products people love.',
    link: 'https://growth.design/psychology',
    category: 'articles',
    date: '2024-01-18',
    tags: ['design', 'psychology', 'ux'],
    size: 'medium'
  },
  {
    id: '6',
    title: 'Atomic Habits',
    content: 'James Clear\'s framework for building good habits and breaking bad ones. Small changes compound into remarkable results.',
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&h=300&fit=crop',
    link: 'https://jamesclear.com/atomic-habits',
    category: 'books',
    date: '2024-01-05',
    tags: ['habits', 'self-improvement'],
    size: 'medium'
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
