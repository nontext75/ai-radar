import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://puxlwevkyfztlbvajnva.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1eGx3ZXZreWZ6dGxidmFqbnZhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDUzOTk2NCwiZXhwIjoyMDk2MTE1OTY0fQ.VwfAWJD5QBXHOd4VWtpffv0HkW7L3IhDzKPWz3m7YD0'
);

// Try Facebook's sharing debugger / oEmbed
// Try Figma's raw community API with different format
// Try the Google Web Cache

const plugins = [
  [12, 'Magician', '1151890004010191690'],
  [14, 'Figma to Code', '747985167520967365'],
  [15, 'Beautiful Shadows', '1068595505353552645'],
  [16, 'Unsplash', '738454987945972471'],
  [17, 'Mockup Plugin', '817043359134136295'],
  [18, 'HTML to Design', '1159123024924461424'],
  [19, 'Typescales', '739825414752646970'],
];

// Try the Figma oEmbed API
for (const [id, name, pluginId] of plugins) {
  try {
    const resp = await fetch(
      `https://www.figma.com/api/community/plugin/${pluginId}`,
      { 
        signal: AbortSignal.timeout(8000),
        headers: { 
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (compatible; AiRadar/1.0)',
          'x-requested-with': 'XMLHttpRequest'
        }
      }
    );
    const text = await resp.text();
    
    // Try to extract image URL from the JSON response
    const img = text.match(/"(?:ogImage|thumbnailUrl|coverUrl|imageUrl|image)":"((?:[^"\\]|\\.)+)"/);
    
    if (img) {
      const url = img[1].replace(/\\u002D/g, '-').replace(/\\\//g, '/').replace(/\\/g, '');
      console.log(`${id}|${name}|${url.substring(0, 120)}`);
      const { error } = await supabase.from('contents').update({ image_url: url }).eq('id', id);
      if (error) console.log(`  DB error: ${error.message}`);
      else console.log('  DB updated');
    } else {
      console.log(`${id}|${name}|no image in response`);
    }
  } catch(e) {
    console.log(`${id}|${name}|${e.message.substring(0, 50)}`);
  }
}

// For those that failed, try Google Web Cache
console.log('\n--- Trying Google Cache for remaining ---');
for (const [id, name, pluginId] of plugins) {
  const url = `https://www.figma.com/community/plugin/${pluginId}`;
  try {
    const resp = await fetch(
      `https://webcache.googleusercontent.com/search?q=cache:${encodeURIComponent(url)}`,
      { signal: AbortSignal.timeout(10000) }
    );
    const html = await resp.text();
    const match = html.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/i) ||
                 html.match(/<meta[^>]+content="([^"]+)"[^>]+property="og:image"/i);
    if (match) {
      console.log(`${id}|${name}|${match[1].substring(0, 120)}`);
      const { error } = await supabase.from('contents').update({ image_url: match[1] }).eq('id', id);
      if (error) console.log(`  DB error: ${error.message}`);
      else console.log('  DB updated');
    } else {
      console.log(`${id}|${name}|no image in cache`);
    }
  } catch(e) {
    console.log(`${id}|${name}|cache error: ${e.message.substring(0, 50)}`);
  }
}

// Check what we have so far
console.log('\n--- Current image_url values ---');
const { data } = await supabase.from('contents').select('id, title, image_url').in('category_id', [14]).order('id');
data.forEach(d => {
  console.log(`${d.id}: ${d.image_url ? '✅ ' + d.image_url.substring(0, 60) : '❌ none'}`);
});

console.log('\nDone.');
