// scripts/insert-resources.js
const fs = require('fs');
const path = require('path');

function loadEnv() {
  const envPath = path.join(__dirname, '../.env.local');
  if (!fs.existsSync(envPath)) return {};
  const content = fs.readFileSync(envPath, 'utf8');
  const env = {};
  content.split('\n').forEach(line => {
    const parts = line.split('=');
    if (parts.length >= 2) {
      env[parts[0].trim()] = parts[1].trim();
    }
  });
  return env;
}

// 1. Local data.ts Update (Fallback / stand-alone verification)
function updateLocalDataTs(newItems) {
  const dataTsPath = path.join(__dirname, '../src/lib/data.ts');
  if (!fs.existsSync(dataTsPath)) {
    console.error('data.ts file not found at:', dataTsPath);
    return false;
  }

  let fileContent = fs.readFileSync(dataTsPath, 'utf8');

  // Regex to match: export const ITEMS: FeedItem[] = [ ... ];
  const itemsRegex = /export const ITEMS: FeedItem\[\] = \[\s*[\s\S]*?\n\];/;
  const match = fileContent.match(itemsRegex);
  if (!match) {
    console.error('Could not locate ITEMS array in data.ts via Regex');
    return false;
  }

  // Parse original items from mock list (roughly extract contents inside [ ])
  // To keep existing items, we'll append the new ones.
  // We can also extract items by requiring the file, but since it's TypeScript, 
  // text manipulation is safer for build output consistency.
  
  // Create a clean block of new items to insert
  const newItemsString = newItems.map(item => {
    return `  { id: ${item.id}, cat: "${item.cat}", catSlug: "${item.catSlug}", title: "${item.title.replace(/"/g, '\\"')}", desc: "${item.desc.replace(/"/g, '\\"')}", votes: ${item.votes}, author: "${item.author}", time: "${item.time}", hot: ${item.hot}, targetRoles: ${JSON.stringify(item.targetRoles)} }`;
  }).join(',\n');

  // Insert new items inside ITEMS list (just before the closing ];)
  const originalArrayText = match[0];
  const insertionIndex = originalArrayText.lastIndexOf('];');
  if (insertionIndex === -1) return false;

  // Append with a trailing comma to ensure compatibility with existing items, avoiding duplicates
  const originalTrimmed = originalArrayText.slice(0, insertionIndex).trim();
  const needsComma = !originalTrimmed.endsWith(',');
  const updatedArrayText = originalTrimmed + (needsComma ? ',\n' : '\n') + newItemsString + '\n];';

  const updatedFileContent = fileContent.replace(itemsRegex, updatedArrayText);
  fs.writeFileSync(dataTsPath, updatedFileContent, 'utf8');
  console.log(`Successfully appended ${newItems.length} crawled items inside src/lib/data.ts.`);
  return true;
}

// 2. Supabase Database Bulk Insert (If config is available)
async function insertIntoSupabase(newItems) {
  const env = loadEnv();
  const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.log('Supabase credentials not configured in env. Local file fallback only.');
    return false;
  }

  try {
    const { createClient } = require('@supabase/supabase-js');
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('Connecting to Supabase DB...');
    
    // 1. Get Categories to map slug to ID
    const { data: dbCategories, error: catError } = await supabase
      .from('categories')
      .select('id, slug');

    if (catError || !dbCategories) {
      console.error('Failed to retrieve categories from DB:', catError?.message);
      return false;
    }

    const catSlugMap = {};
    dbCategories.forEach(c => { catSlugMap[c.slug] = c.id; });

    // 2. Try to find an anonymous user UUID from profiles
    const { data: dbProfiles, error: profError } = await supabase
      .from('profiles')
      .select('id')
      .limit(1);

    let targetUserId = null;
    if (dbProfiles && dbProfiles.length > 0) {
      targetUserId = dbProfiles[0].id;
    } else {
      console.warn('No profiles/users found in DB. Content insert might fail due to FK constraints.');
      // Create a dummy profile if allowed or try inserting anyway
    }

    // Map crawled items to DB structure
    const dbRows = newItems.map(item => ({
      title: item.title,
      description: item.desc,
      category_id: catSlugMap[item.catSlug] || null,
      user_id: targetUserId,
      votes: item.votes,
      target_roles: item.targetRoles
    }));

    console.log(`Inserting ${dbRows.length} contents into DB...`);
    const { error: insertError } = await supabase
      .from('contents')
      .insert(dbRows);

    if (insertError) {
      console.error('Failed to insert items into Supabase:', insertError.message);
      return false;
    }

    console.log('Successfully inserted all crawled items into Supabase Database.');
    return true;
  } catch (err) {
    console.error('Error during Supabase injection:', err.message);
    return false;
  }
}

async function main() {
  const crawledFile = path.join(__dirname, '../data/crawled-items.json');
  if (!fs.existsSync(crawledFile)) {
    console.error('crawled-items.json not found. Run crawl-resources.js first.');
    process.exit(1);
  }

  const items = JSON.parse(fs.readFileSync(crawledFile, 'utf8'));
  console.log(`Loaded ${items.length} crawled items from JSON.`);

  // 1. Update data.ts
  const localSuccess = updateLocalDataTs(items);

  // 2. Try Supabase injection
  const dbSuccess = await insertIntoSupabase(items);

  if (localSuccess || dbSuccess) {
    console.log('Data ingestion completed successfully.');
  } else {
    console.error('Data ingestion failed.');
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Ingestion error:', err);
  process.exit(1);
});
