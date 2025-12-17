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
  return `${window.location.origin}/inspirations#${postId}`;
};
