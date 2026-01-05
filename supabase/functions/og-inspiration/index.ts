import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Inspiration posts data (mirrored from frontend)
const inspirations = [
  {
    id: '2',
    title: 'My 2025 Lovable Vibes',
    content: 'Top 1% globally for code written with 697K lines, 1.9K messages sent, and a 9/10 politeness score. National Treasure status achieved!',
    category: 'articles',
    date: '2025-01-05',
    tags: ['lovable', '2025', 'vibes', 'stats'],
    size: 'medium'
  },
  {
    id: '1',
    title: 'Reflections on 2025',
    content: 'Personal reflections and insights on the year ahead.',
    gammaUrl: 'https://gamma.app/embed/g4i7szzblqeltb8',
    category: 'articles',
    date: '2025-12-21',
    tags: ['reflections', '2025'],
    size: 'large'
  }
];

// HTML escape function to prevent XSS
function escapeHtml(text: string): string {
  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return text.replace(/[&<>"']/g, (char) => htmlEntities[char] || char);
}

// Validate postId format - alphanumeric, hyphens, underscores only, max 50 chars
function isValidPostId(postId: string | null): postId is string {
  if (!postId) return false;
  if (postId.length > 50) return false;
  return /^[a-zA-Z0-9_-]+$/.test(postId);
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const postId = url.searchParams.get('id');
    
    // Input validation
    if (!isValidPostId(postId)) {
      console.log('Invalid post ID format received');
      return new Response('Invalid request', { status: 400, headers: corsHeaders });
    }

    console.log('OG request for post ID:', postId);

    const post = inspirations.find(p => p.id === postId);
    
    if (!post) {
      console.log('Post not found for ID:', postId);
      return new Response('Not found', { status: 404, headers: corsHeaders });
    }

    const siteUrl = 'https://imaginationlab.ai';
    const postUrl = `${siteUrl}/inspirations/${escapeHtml(post.id)}`;
    const ogImage = `${siteUrl}/og-default.png`;
    
    // Escape all user-controllable content for HTML output
    const safeTitle = escapeHtml(post.title);
    const safeContent = escapeHtml(post.content);
    
    // Generate HTML with OG meta tags and redirect
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Primary Meta Tags -->
  <title>${safeTitle} | Imagination Lab</title>
  <meta name="title" content="${safeTitle} | Imagination Lab">
  <meta name="description" content="${safeContent}">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="${postUrl}">
  <meta property="og:title" content="${safeTitle}">
  <meta property="og:description" content="${safeContent}">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:site_name" content="Imagination Lab">
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="${postUrl}">
  <meta property="twitter:title" content="${safeTitle}">
  <meta property="twitter:description" content="${safeContent}">
  <meta property="twitter:image" content="${ogImage}">
  
  <!-- Redirect to actual page -->
  <meta http-equiv="refresh" content="0;url=${postUrl}">
  <link rel="canonical" href="${postUrl}">
</head>
<body>
  <p>Redirecting to <a href="${postUrl}">${safeTitle}</a>...</p>
  <script>window.location.href = "${postUrl}";</script>
</body>
</html>`;

    return new Response(html, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error in og-inspiration function:', error);
    // Return generic error without exposing internal details
    return new Response('Server error', {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'text/plain' },
    });
  }
});