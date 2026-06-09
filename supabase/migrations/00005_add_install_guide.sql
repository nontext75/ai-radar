-- supabase/migrations/00005_add_install_guide.sql
-- contents 테이블에 install_guide(설치 방법) 컬럼 추가
ALTER TABLE contents ADD COLUMN install_guide TEXT;
