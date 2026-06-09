const urls = [
  ['Magician', 'https://www.figma.com/community/plugin/1151890004010191690/magician'],
  ['Beautiful Shadows', 'https://www.figma.com/ko-kr/community/plugin/1068595505353552645/beautiful-shadows'],
  ['Unsplash', 'https://www.figma.com/ko-kr/community/plugin/738454987945972471/unsplash'],
  ['Figma to Code', 'https://www.figma.com/community/plugin/747985167520967365/builder-io-ai-powered-figma-to-code-react-vue-tailwind-more'],
  ['HTML to Design', 'https://www.figma.com/ko-kr/community/plugin/1159123024924461424/html-to-design-by-divriots-import-websites-to-figma-designs-web-html-css'],
  ['Typescales', 'https://www.figma.com/ko-kr/community/plugin/739825414752646970/typescales'],
];

for (const [name, url] of urls) {
  try {
    const resp = await fetch(url, { signal: AbortSignal.timeout(10000) });
    const html = await resp.text();
    
    // Look for og:image
    const re1 = /<meta[^>]+property="og:image"[^>]+content="([^"]+)"/i;
    const re2 = /<meta[^>]+content="([^"]+)"[^>]+property="og:image"/i;
    const m1 = html.match(re1) || html.match(re2);
    
    // twitter:image
    const re3 = /<meta[^>]+name="twitter:image"[^>]+content="([^"]+)"/i;
    const m2 = html.match(re3);
    
    // __NEXT_DATA__ size
    const nd = html.match(/__NEXT_DATA__/);
    
    // Look for screenshot/thumbnail images
    const imgs = html.match(/"screenshotUrl":"[^"]+"/g) || [];
    const thumbs = html.match(/"thumbnailUrl":"[^"]+"/g) || [];
    const imgUrls = html.match(/"image":"[^"]+"/g) || [];
    
    console.log(name + ':');
    console.log('  og:image: ' + (m1 ? m1[1].substring(0, 100) : 'none'));
    console.log('  twitter:image: ' + (m2 ? m2[1].substring(0, 100) : 'none'));
    console.log('  has __NEXT_DATA__: ' + (nd ? 'yes' : 'no'));
    console.log('  screenshotUrl: ' + (imgs.length > 0 ? imgs[0].substring(0, 120) : 'none'));
    console.log('  thumbnailUrl: ' + (thumbs.length > 0 ? thumbs[0].substring(0, 120) : 'none'));
    console.log('  image fields: ' + imgUrls.length);
    
    // Try to find ANY figma CDN URL in the page
    const allUrls = html.match(/https?:\/\/[^"'\\s]+?(?:figma|scdn|s3\.amazonaws)[^"'\\s]*/gi) || [];
    const cdnImgs = allUrls.filter(u => /\.(png|jpg|jpeg|webp|avif)(\?|$)/i.test(u)).slice(0, 5);
    if (cdnImgs.length > 0) {
      console.log('  CDN images:');
      cdnImgs.forEach(u => console.log('    ' + u.substring(0, 120)));
    }
    console.log('');
  } catch(e) {
    console.log(name + ': ERROR ' + e.message.substring(0, 40));
    console.log('');
  }
}
