import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://puxlwevkyfztlbvajnva.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1eGx3ZXZreWZ6dGxidmFqbnZhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDUzOTk2NCwiZXhwIjoyMDk2MTE1OTY0fQ.VwfAWJD5QBXHOd4VWtpffv0HkW7L3IhDzKPWz3m7YD0'
);

const pages = [
  [10, 'UX Pilot', 'https://uxpilot.ai'],
  [11, 'Relume', 'https://www.relume.io'],
  [12, 'Magician', 'https://www.figma.com/community/plugin/1151890004010191690/magician'],
  [13, 'Figma Weave', 'https://weave.figma.com'],
  [14, 'Figma to Code', 'https://www.figma.com/community/plugin/747985167520967365/builder-io-ai-powered-figma-to-code-react-vue-tailwind-more'],
  [15, 'Beautiful Shadows', 'https://www.figma.com/ko-kr/community/plugin/1068595505353552645/beautiful-shadows'],
  [16, 'Unsplash', 'https://www.figma.com/ko-kr/community/plugin/738454987945972471/unsplash'],
  [17, 'Mockup Plugin', 'https://www.figma.com/ko-kr/community/plugin/817043359134136295/mockup-plugin-devices-mockups-print-mockups-branding-mockups'],
  [18, 'HTML to Design', 'https://www.figma.com/ko-kr/community/plugin/1159123024924461424/html-to-design-by-divriots-import-websites-to-figma-designs-web-html-css'],
  [19, 'Typescales', 'https://www.figma.com/ko-kr/community/plugin/739825414752646970/typescales'],
];

const results = [];

for (const [id, name, url] of pages) {
  try {
    const resp = await fetch(url, { signal: AbortSignal.timeout(10000) });
    const html = await resp.text();
    const re1 = /<meta[^>]+property="og:image"[^>]+content="([^"]+)"/i;
    const re2 = /<meta[^>]+content="([^"]+)"[^>]+property="og:image"/i;
    const match = html.match(re1) || html.match(re2);
    if (match) {
      console.log(`${id}|${name}|${match[1]}`);
      results.push({ id, image_url: match[1] });
    } else {
      console.log(`${id}|${name}|(no og:image)`);
    }
  } catch(e) {
    console.log(`${id}|${name}|ERROR: ${e.message.substring(0, 50)}`);
  }
}

console.log('\n--- Updating DB ---');
for (const r of results) {
  const { error } = await supabase.from('contents').update({ image_url: r.image_url }).eq('id', r.id);
  if (error) console.error(`ID ${r.id} fail: ${error.message}`);
  else console.log(`ID ${r.id} image_url updated`);
}
