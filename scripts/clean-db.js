// scripts/clean-db.js
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

async function main() {
  const env = loadEnv();
  const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.log('Supabase credentials not configured in env. Skipping DB cleaning.');
    return;
  }

  try {
    const { createClient } = require('@supabase/supabase-js');
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('Connecting to Supabase for cleaning...');
    
    // Delete duplicate sub-commands (IDs 14 to 25)
    const { error } = await supabase
      .from('contents')
      .delete()
      .in('id', [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]);

    if (error) {
      console.error('Failed to delete duplicate items from Supabase contents:', error.message);
      return;
    }

    console.log('Successfully deleted duplicate impeccable sub-command content rows from Supabase.');
  } catch (err) {
    console.error('Error cleaning DB:', err.message);
  }
}

main();
