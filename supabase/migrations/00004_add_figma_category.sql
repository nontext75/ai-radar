-- supabase/migrations/00004_add_figma_category.sql
-- categories 테이블에 figma 카테고리 추가
INSERT INTO categories (slug, name, description, content_count) VALUES
  ('figma', '피그마 플러그인', 'AI 기반 피그마 플러그인 및 디자인 도구', 1)
ON CONFLICT (slug) DO NOTHING;
