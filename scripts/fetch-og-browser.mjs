import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://puxlwevkyfztlbvajnva.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1eGx3ZXZreWZ6dGxidmFqbnZhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDUzOTk2NCwiZXhwIjoyMDk2MTE1OTY0fQ.VwfAWJD5QBXHOd4VWtpffv0HkW7L3IhDzKPWz3m7YD0'
);

const pages = [
  [12, 'Magician', 'https://www.figma.com/community/plugin/1151890004010191690'],
  [14, 'Figma to Code', 'https://www.figma.com/community/plugin/747985167520967365'],
  [15, 'Beautiful Shadows', 'https://www.figma.com/community/plugin/1068595505353552645'],
  [16, 'Unsplash', 'https://www.figma.com/community/plugin/738454987945972471'],
  [17, 'Mockup Plugin', 'https://www.figma.com/community/plugin/817043359134136295'],
  [18, 'HTML to Design', 'https://www.figma.com/community/plugin/1159123024924461424'],
  [19, 'Typescales', 'https://www.figma.com/community/plugin/739825414752646970'],
];

for (const [id, name, url] of pages) {
  try {
    const resp = await fetch(url, {
      signal: AbortSignal.timeout(10000),
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      }
    });
    const html = await resp.text();
    
    // Check if there's any server-rendered content
    const hasReact = html.includes('__NEXT_DATA__') || html.includes('_next/');
    const ogImg = html.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/i);
    const anyImg = html.match(/(?:https?:)?\/\/[^"'\s]+\.(?:png|jpg|jpeg|webp|avif)(?:\?[^"'\s]*)?/gi);
    
    console.log(`${id}|${name}`);
    console.log(`  SSR: ${hasReact ? 'yes' : 'no'}, len: ${html.length}`);
    console.log(`  og:image: ${ogImg ? ogImg[1].substring(0, 80) : 'none'}`);
    
    // If no HTML images, try the oEmbed spec
    if (!ogImg && !hasReact) {
      // Try different URL patterns
      const altUrl = url.replace('www.figma.com', 'figma.com');
      const resp2 = await fetch(altUrl, {
        signal: AbortSignal.timeout(5000),
        headers: { 'User-Agent': 'curl/8.0' }
      });
      const html2 = await resp2.text();
      const ogImg2 = html2.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/i);
      console.log(`  alt og:image: ${ogImg2 ? ogImg2[1].substring(0, 80) : 'none'}`);
    }
  } catch(e) {
    console.log(`${id}|${name}|ERROR: ${e.message.substring(0, 50)}`);
  }
}
