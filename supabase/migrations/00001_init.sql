-- AI Radar — Supabase 초기 스키마

-- 1. profiles
CREATE TABLE profiles (
  id         UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name       TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public profiles select" ON profiles FOR SELECT USING (true);
CREATE POLICY "own profile update"     ON profiles FOR UPDATE USING (auth.uid() = id);

-- 2. categories
CREATE TABLE categories (
  id            SERIAL PRIMARY KEY,
  slug          TEXT UNIQUE NOT NULL,
  name          TEXT NOT NULL,
  description   TEXT,
  content_count INT DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "categories public" ON categories FOR ALL USING (true);

-- 3. contents
CREATE TABLE contents (
  id          SERIAL PRIMARY KEY,
  title       TEXT NOT NULL,
  description TEXT,
  url         TEXT,
  category_id INT  REFERENCES categories(id) ON DELETE SET NULL,
  user_id     UUID REFERENCES profiles(id)   ON DELETE CASCADE,
  votes       INT DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE contents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "contents select" ON contents FOR SELECT USING (true);
CREATE POLICY "contents insert" ON contents FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "contents update" ON contents FOR UPDATE USING (auth.uid() = user_id);

-- 4. comments
CREATE TABLE comments (
  id         SERIAL PRIMARY KEY,
  content_id INT  REFERENCES contents(id) ON DELETE CASCADE,
  user_id    UUID REFERENCES profiles(id) ON DELETE CASCADE,
  body       TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "comments select" ON comments FOR SELECT USING (true);
CREATE POLICY "comments insert" ON comments FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 5. bookmarks
CREATE TABLE bookmarks (
  user_id    UUID REFERENCES profiles(id)   ON DELETE CASCADE,
  content_id INT  REFERENCES contents(id)   ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (user_id, content_id)
);
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "bookmarks own" ON bookmarks FOR ALL USING (auth.uid() = user_id);

-- 6. likes
CREATE TABLE likes (
  user_id    UUID REFERENCES profiles(id)   ON DELETE CASCADE,
  content_id INT  REFERENCES contents(id)   ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (user_id, content_id)
);
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "likes own" ON likes FOR ALL USING (auth.uid() = user_id);

-- 7. tags
CREATE TABLE tags (
  id   SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL
);
CREATE TABLE contents_tags (
  content_id INT REFERENCES contents(id) ON DELETE CASCADE,
  tag_id     INT REFERENCES tags(id)     ON DELETE CASCADE,
  PRIMARY KEY (content_id, tag_id)
);

-- ── Seed 데이터 ──
INSERT INTO categories (slug, name, description, content_count) VALUES
  ('prompts',    '프롬프트',   '효과적인 AI 사용을 위한 프롬프트 모음', 1240),
  ('workflows',  '워크플로우', '반복 업무를 자동화하는 AI 워크플로우',  847),
  ('mcp',        'MCP 서버',   'Claude Model Context Protocol 서버',     312),
  ('agents',     'AI 에이전트','자율적으로 작동하는 AI 에이전트',       594),
  ('plugins',    '플러그인',   'AI 도구를 확장하는 플러그인',           421),
  ('automation', '자동화',     'AI 기반 업무 자동화 도구',              763),
  ('research',   '리서치',     'AI 연구 논문 및 기술 분석',             289),
  ('models',     '모델',       '최신 AI 모델 정보 및 비교',             156),
  ('opensource', '오픈소스',   '공개된 AI 프로젝트와 코드',             935),
  ('tutorials',  '튜토리얼',   'AI 사용 가이드와 학습 자료',            678),
  ('news',       '뉴스',       'AI 업계 최신 뉴스와 동향',             1820),
  ('startups',   '스타트업',   '주목할만한 AI 스타트업 소식',            203),
  ('resources',  '리소스',     '유용한 AI 학습 및 활용 자료',            512);
