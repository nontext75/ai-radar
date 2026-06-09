-- Create collections table
CREATE TABLE collections (
  id          SERIAL PRIMARY KEY,
  title       TEXT NOT NULL,
  description TEXT,
  user_id     UUID REFERENCES profiles(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "collections select" ON collections FOR SELECT USING (true);
CREATE POLICY "collections insert" ON collections FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create M:N junction table for collections and contents
CREATE TABLE collections_contents (
  collection_id INT REFERENCES collections(id) ON DELETE CASCADE,
  content_id    INT REFERENCES contents(id)    ON DELETE CASCADE,
  PRIMARY KEY (collection_id, content_id)
);
ALTER TABLE collections_contents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "collections_contents select" ON collections_contents FOR SELECT USING (true);
CREATE POLICY "collections_contents insert" ON collections_contents FOR INSERT WITH CHECK (true);
