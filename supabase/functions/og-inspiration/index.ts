import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Inspiration posts data (mirrored from frontend)
const inspirations = [
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

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const postId = url.searchParams.get('id');
    
    console.log('OG request for post ID:', postId);

    if (!postId) {
      return new Response('Missing post ID', { status: 400, headers: corsHeaders });
    }

    const post = inspirations.find(p => p.id === postId);
    
    if (!post) {
      console.log('Post not found for ID:', postId);
      return new Response('Post not found', { status: 404, headers: corsHeaders });
    }

    const siteUrl = 'https://imaginationlab.ai';
    const postUrl = `${siteUrl}/inspirations/${post.id}`;
    const ogImage = `${siteUrl}/og-default.png`; // Default OG image
    
    // Generate HTML with OG meta tags and redirect
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Primary Meta Tags -->
  <title>${post.title} | Imagination Lab</title>
  <meta name="title" content="${post.title} | Imagination Lab">
  <meta name="description" content="${post.content}">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="${postUrl}">
  <meta property="og:title" content="${post.title}">
  <meta property="og:description" content="${post.content}">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:site_name" content="Imagination Lab">
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="${postUrl}">
  <meta property="twitter:title" content="${post.title}">
  <meta property="twitter:description" content="${post.content}">
  <meta property="twitter:image" content="${ogImage}">
  
  <!-- Redirect to actual page -->
  <meta http-equiv="refresh" content="0;url=${postUrl}">
  <link rel="canonical" href="${postUrl}">
</head>
<body>
  <p>Redirecting to <a href="${postUrl}">${post.title}</a>...</p>
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
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
