import { createClient } from '@supabase/supabase-js';

const url = 'https://puxlwevkyfztlbvajnva.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1eGx3ZXZreWZ6dGxidmFqbnZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1Mzk5NjQsImV4cCI6MjA5NjExNTk2NH0.xrt_jWk9eYcPy7UyNu9PcuSqUyMAwzAMvoZo3vv7R3k';
const supabase = createClient(url, key);

const { data, error } = await supabase
  .from('contents')
  .select(`
    id, title, description, url, image_url, votes, created_at, install_guide, target_roles,
    categories ( slug, name ),
    profiles!contents_user_id_fkey ( name )
  `)
  .limit(5);

if (error) {
  console.error('❌ 연결 실패:', error.message);
} else {
  console.log('✅ 연결 성공! 데이터:');
  console.log(JSON.stringify(data, null, 2));
}
