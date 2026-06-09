import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://puxlwevkyfztlbvajnva.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1eGx3ZXZreWZ6dGxidmFqbnZhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDUzOTk2NCwiZXhwIjoyMDk2MTE1OTY0fQ.VwfAWJD5QBXHOd4VWtpffv0HkW7L3IhDzKPWz3m7YD0'
);

const plugins = [
  [12, 'Magician', '1151890004010191690'],
  [15, 'Beautiful Shadows', '1068595505353552645'],
  [16, 'Unsplash', '738454987945972471'],
  [14, 'Figma to Code (Builder)', '747985167520967365'],
  [18, 'HTML to Design', '1159123024924461424'],
  [19, 'Typescales', '739825414752646970'],
  [17, 'Mockup Plugin', '817043359134136295'],
];

for (const [id, name, pluginId] of plugins) {
  try {
    const resp = await fetch('https://www.figma.com/api/community/plugin/' + pluginId, {
      signal: AbortSignal.timeout(8000),
      headers: { 'Accept': 'application/json' }
    });
    const body = await resp.text();
    
    // Try to extract ogImage
    const ogMatch = body.match(/"ogImage":"([^"]+)"/);
    // Try thumbnail
    const thumbMatch = body.match(/"thumbnailUrl":"([^"]+)"/);
    // Try image/screenshot URLs
    const imgMatches = body.match(/https?:[^"'\s]*\.(?:png|jpg|jpeg|webp|avif)(?:[^"'\s]*)?/gi) || [];
    const figmaImages = imgMatches.filter(u => u.includes('figma.com') || u.includes('scdn.co') || u.includes('amazonaws'));
    
    let imageUrl = null;
    if (ogMatch) {
      imageUrl = ogMatch[1].replace(/\\u002D/g, '-').replace(/\\/g, '');
    } else if (figmaImages.length > 0) {
      imageUrl = figmaImages[0];
    }
    
    if (imageUrl) {
      console.log(`${id}|${name}|${imageUrl.substring(0, 120)}`);
      const { error } = await supabase.from('contents').update({ image_url: imageUrl }).eq('id', id);
      if (error) console.log(`  ERROR updating: ${error.message}`);
      else console.log('  DB updated');
    } else {
      console.log(`${id}|${name}|no image found`);
    }
  } catch(e) {
    console.log(`${id}|${name}|ERROR: ${e.message.substring(0, 50)}`);
  }
}

console.log('\nDone.');
