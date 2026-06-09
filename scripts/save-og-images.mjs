import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://puxlwevkyfztlbvajnva.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1eGx3ZXZreWZ6dGxidmFqbnZhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDUzOTk2NCwiZXhwIjoyMDk2MTE1OTY0fQ.VwfAWJD5QBXHOd4VWtpffv0HkW7L3IhDzKPWz3m7YD0'
);

const updates = [
  [14, 'https://www.figma.com/community/thumbnail?resource_id=747985167520967365'],
  [15, 'https://www.figma.com/community/thumbnail?resource_id=1068595505353552645'],
  [16, 'https://www.figma.com/community/thumbnail?resource_id=738454987945972471'],
  [17, 'https://www.figma.com/community/thumbnail?resource_id=817043359134136295'],
  [18, 'https://www.figma.com/community/thumbnail?resource_id=1159123024924461424'],
  [19, 'https://www.figma.com/community/thumbnail?resource_id=739825414752646970'],
];

// Also try Magician separately
for (const [id, url] of updates) {
  const { error } = await supabase.from('contents').update({ image_url: url }).eq('id', id);
  if (error) console.error(`ID ${id} fail: ${error.message}`);
  else console.log(`ID ${id} ✅`);
}

// Try Magician
try {
  const resp = await fetch(
    'https://www.figma.com/community/plugin/1151890004010191690/magician',
    { 
      signal: AbortSignal.timeout(8000),
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html',
      }
    }
  );
  const html = await resp.text();
  const match = html.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/i);
  if (match) {
    const imgUrl = match[1].replace(/&#47;/g, '/');
    console.log('Magician og:image: ' + imgUrl);
    const { error } = await supabase.from('contents').update({ image_url: imgUrl }).eq('id', 12);
    if (error) console.error('Magician DB error: ' + error.message);
    else console.log('Magician ✅');
  } else {
    console.log('Magician: no og:image found');
    // Try generic thumbnail
    const thumbUrl = 'https://www.figma.com/community/thumbnail?resource_id=1151890004010191690';
    const { error } = await supabase.from('contents').update({ image_url: thumbUrl }).eq('id', 12);
    if (error) console.error('Magician thumb error: ' + error.message);
    else console.log('Magician ✅ (thumbnail)');
  }
} catch(e) {
  console.log('Magician error: ' + e.message.substring(0, 50));
  const thumbUrl = 'https://www.figma.com/community/thumbnail?resource_id=1151890004010191690';
  const { error } = await supabase.from('contents').update({ image_url: thumbUrl }).eq('id', 12);
  if (error) console.error('Magician thumb error: ' + error.message);
  else console.log('Magician ✅ (thumbnail fallback)');
}

console.log('\nDone.');
