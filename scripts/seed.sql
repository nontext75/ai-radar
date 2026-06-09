-- scripts/seed.sql
-- Supabase Dashboard > SQL Editor 에서 실행
-- 모든 기존 contents 삭제 후 시드 데이터 삽입

TRUNCATE TABLE contents RESTART IDENTITY CASCADE;

-- ── Claude Code Skills ──
INSERT INTO contents (id, title, description, url, category_id, user_id, votes) VALUES
(1, 'Impeccable — AI 디자인 스킬 시스템 (Paul Bakaus)', E'##소개\n**내용** — Paul Bakaus가 만든 오픈소스 AI 디자인 스킬 시스템. Claude Code·Cursor·GitHub Copilot·Gemini CLI·Codex CLI·OpenCode 등 모든 주요 AI 코딩 도구에서 동작\n\n**Why Impeccable?** — AI 프론트엔드가 하나같이 비슷해 보이는 이유는 디자인 어휘가 없기 때문. Impeccable은 에이전트에 디자이너의 어휘를 주입하고, 당신과 에이전트가 같은 언어로 소통하게 해줌\n\n##지원 도구\nClaude Code / Cursor / GitHub Copilot / Gemini CLI / Codex CLI / OpenCode / Pi\n\n##서브커맨드 (23개)\n**Create** — craft (제작), shape (설계), impeccable (코어)\n**Evaluate** — audit (기술 감사), critique (디자인 리뷰)\n**Refine** — animate, bolder, colorize, delight, layout, overdrive, quieter, typeset\n**Simplify** — adapt, clarify, distill\n**Harden** — harden, onboard, optimize, polish\n**System** — document, extract, live\n\n##핵심 기능\n**Desloppification** — AI 슬롭 패턴 자동 탐지 및 제거 (41개 규칙)\n**PR 검증** — npx impeccable detect src/로 CI 파이프라인에서 슬롭 차단\n**Live Mode** — 브라우저에서 요소 선택→변형→소스에 반영\n**DESIGN.md 생성** — Google Stitch 스펙 호환 디자인 시스템 문서화\n**두 레지스터** — Brand (랜딩/포트폴리오) / Product (대시보드/앱 UI)\n**PRODUCT.md** — 프로젝트 컨텍스트를 캡처해 모든 명령이 참조\n\n##커뮤니티\nGitHub 34K+ 스타, 수백 개 실제 사용 후기', 'https://github.com/pbakaus/impeccable', 4, NULL, 489);

-- Use a simple approach: one-by-one INSERT for the rest to avoid SQL escaping issues
-- Run the seed from scripts/seed-supabase.mjs instead, using service_role key
SELECT 'Open scripts/seed-supabase.mjs and use service_role key instead of anon_key for seeding';
