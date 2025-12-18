import { toast } from '@/hooks/use-toast';

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

// Get the OG-optimized share URL that goes through the edge function
export const getShareUrl = (postId: string) => {
  // Use the edge function URL for social sharing to get proper OG tags
  const projectId = 'rxsnfjbjypiisnelrshq';
  return `https://${projectId}.supabase.co/functions/v1/og-inspiration?id=${postId}`;
};
