// scripts/crawl-resources.js
const fs = require('fs');
const path = require('path');

// Safe parsing for raw CSV data from awesome-chatgpt-prompts
function parsePromptsCSV(csvText) {
  const lines = csvText.split('\n');
  const items = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // Split by "," keeping in mind quotes
    const parts = line.split('","');
    if (parts.length >= 2) {
      const act = parts[0].replace(/^"/, '').trim();
      const prompt = parts[1].replace(/"$/, '').trim();
      items.push({
        title: `${act} 프롬프트`,
        desc: prompt.length > 200 ? prompt.substring(0, 197) + '...' : prompt,
        url: 'https://github.com/f/awesome-chatgpt-prompts'
      });
    }
  }
  return items;
}

// Parsing awesome-mcp-servers markdown list
function parseMCPServersMarkdown(mdText) {
  const items = [];
  // Match pattern: - [Name](URL) - Description
  const regex = /- \[([^\]]+)\]\(([^)]+)\)\s*-\s*([^\n]+)/g;
  let match;
  while ((match = regex.exec(mdText)) !== null) {
    const title = match[1].trim();
    const url = match[2].trim();
    const desc = match[3].trim();
    
    // Filter out some markdown links inside description
    const cleanDesc = desc.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
    
    if (url.startsWith('http')) {
      items.push({
        title: `MCP: ${title}`,
        desc: cleanDesc,
        url: url
      });
    }
  }
  return items;
}

async function main() {
  console.log('Starting AI resource crawlers...');
  const results = [];
  let idCounter = 100; // Crawled items start from ID 100 to avoid mock collision

  // 1. Crawl Awesome Prompts
  try {
    console.log('Fetching ChatGPT Prompts...');
    const response = await fetch('https://raw.githubusercontent.com/f/awesome-chatgpt-prompts/main/prompts.csv');
    if (response.ok) {
      const text = await response.text();
      const rawPrompts = parsePromptsCSV(text);
      console.log(`Successfully parsed ${rawPrompts.length} prompts.`);
      
      // Take top 15 prompts for seed data
      rawPrompts.slice(0, 15).forEach(p => {
        results.push({
          id: idCounter++,
          cat: "프롬프트",
          catSlug: "prompts",
          title: p.title,
          desc: p.desc,
          votes: Math.floor(Math.random() * 150) + 50,
          author: "AwesomePrompts",
          time: "방금 전",
          hot: false,
          targetRoles: ["developer", "pm"]
        });
      });
    } else {
      console.error('Failed to fetch prompts csv');
    }
  } catch (err) {
    console.error('Error fetching prompts:', err.message);
  }

  // 2. Crawl Awesome MCP Servers
  try {
    console.log('Fetching Awesome MCP Servers list...');
    const response = await fetch('https://raw.githubusercontent.com/wong2/awesome-mcp-servers/main/README.md');
    if (response.ok) {
      const text = await response.text();
      const rawMCPs = parseMCPServersMarkdown(text);
      console.log(`Successfully parsed ${rawMCPs.length} MCP servers.`);
      
      // Take top 15 MCP servers
      rawMCPs.slice(0, 15).forEach(m => {
        results.push({
          id: idCounter++,
          cat: "MCP 서버",
          catSlug: "mcp",
          title: m.title,
          desc: m.desc,
          votes: Math.floor(Math.random() * 200) + 80,
          author: "AwesomeMCP",
          time: "방금 전",
          hot: true,
          targetRoles: ["developer"]
        });
      });
    } else {
      console.error('Failed to fetch MCP markdown');
    }
  } catch (err) {
    console.error('Error fetching MCP servers:', err.message);
  }

  // Save results to temporary JSON file
  const outDir = path.join(__dirname, '../data');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
  }
  const outFile = path.join(outDir, 'crawled-items.json');
  fs.writeFileSync(outFile, JSON.stringify(results, null, 2));
  console.log(`Saved ${results.length} crawled items to ${outFile}`);
}

main().catch(err => {
  console.error('Crawler main thread error:', err);
  process.exit(1);
});
