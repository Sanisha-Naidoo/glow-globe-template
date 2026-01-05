import { toast } from '@/hooks/use-toast';

// Production site URL - update this when deploying to custom domain
const SITE_URL = 'https://imaginationlab.ai';

export const shareToLinkedIn = (url: string, title: string) => {
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  window.open(linkedInUrl, '_blank', 'width=600,height=600');
};

export const copyToClipboard = async (url: string) => {
  try {
    await navigator.clipboard.writeText(url);
    toast({
      title: 'Link copied!',
      description: 'The link has been copied to your clipboard.',
    });
  } catch (err) {
    toast({
      title: 'Failed to copy',
      description: 'Please try again.',
      variant: 'destructive',
    });
  }
};

export const getPostUrl = (postId: string) => {
  return `${window.location.origin}/inspirations/${postId}`;
};

// Get the shareable URL for social media
// Uses the production site URL so links work properly when shared
export const getShareUrl = (postId: string) => {
  return `${SITE_URL}/inspirations/${postId}`;
};
