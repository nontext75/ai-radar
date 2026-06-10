// scripts/seed-supabase.mjs
// Run: node scripts/seed-supabase.mjs
// Requires SUPABASE_SERVICE_ROLE_KEY in .env.local to bypass RLS
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loadEnv() {
  const envPath = path.join(__dirname, '../.env.local');
  if (!fs.existsSync(envPath)) return {};
  return Object.fromEntries(
    fs.readFileSync(envPath, 'utf8').split('\n')
      .map(l => l.split('='))
      .filter(p => p.length >= 2)
      .map(p => [p[0].trim(), p.slice(1).join('=').trim()])
  );
}

// Map catSlug -> category_id (matches seed order in 00001_init.sql)
const CATEGORY_IDS = {
  prompts: 1, workflows: 2, mcp: 3, agents: 4, plugins: 5,
  automation: 6, research: 7, models: 8, opensource: 9,
  tutorials: 10, news: 11, startups: 12, resources: 13,
  figma: 14,
};

// Items to seed (id, catSlug, title, desc, votes, url)
const ITEMS = [
  // ── Claude Code Skills ──
  { id: 1,  catSlug: "agents",     title: "Impeccable — AI 디자인 스킬 시스템 (Paul Bakaus)", desc: "##소개\n**내용** — Paul Bakaus가 만든 오픈소스 AI 디자인 스킬 시스템. Claude Code·Cursor·GitHub Copilot·Gemini CLI·Codex CLI·OpenCode 등 모든 주요 AI 코딩 도구에서 동작\n\n**Why Impeccable?** — AI 프론트엔드가 하나같이 비슷해 보이는 이유는 디자인 어휘가 없기 때문. Impeccable은 에이전트에 디자이너의 어휘를 주입하고, 당신과 에이전트가 같은 언어로 소통하게 해줌\n\n##지원 도구\nClaude Code / Cursor / GitHub Copilot / Gemini CLI / Codex CLI / OpenCode / Pi\n\n##서브커맨드 (23개)\n**Create** — craft (제작), shape (설계), impeccable (코어)\n**Evaluate** — audit (기술 감사), critique (디자인 리뷰)\n**Refine** — animate, bolder, colorize, delight, layout, overdrive, quieter, typeset\n**Simplify** — adapt, clarify, distill\n**Harden** — harden, onboard, optimize, polish\n**System** — document, extract, live\n\n##핵심 기능\n**Desloppification** — AI 슬롭 패턴 자동 탐지 및 제거 (41개 규칙)\n**PR 검증** — npx impeccable detect src/로 CI 파이프라인에서 슬롭 차단\n**Live Mode** — 브라우저에서 요소 선택→변형→소스에 반영\n**DESIGN.md 생성** — Google Stitch 스펙 호환 디자인 시스템 문서화\n**두 레지스터** — Brand (랜딩/포트폴리오) / Product (대시보드/앱 UI)\n**PRODUCT.md** — 프로젝트 컨텍스트를 캡처해 모든 명령이 참조\n\nGitHub 34K+ 스타, 수백 개 실제 사용 후기", votes: 489,  url: "https://github.com/pbakaus/impeccable" },
  { id: 2,  catSlug: "agents",     title: "/design-taste, /emil-design, /redesign — 프론트엔드 디자인 스킬 3종", desc: "Claude Code에서 사용하는 3가지 프론트엔드 디자인 스킬을 하나로 정리했습니다.\n\n##/design-taste-frontend\n템플릿처럼 보이지 않는 랜딩페이지·포트폴리오·리디자인 전문 스킬. 디자인 방향 추론 후 코드까지 직접 작성.\n\n##/emil-design-eng\nEmil Kowalski 철학 기반 UI 폴리시 스킬. 마이크로 인터랙션, 애니메이션 판단, 물리적 피드백을 코드로 구현.\n\n##/redesign-existing-projects\n기존 사이트·앱 프리미엄 업그레이드. 먼저 감사 후 AI 슬롭 패턴 제거, 고급 디자인 기준 적용.", votes: 389 },
  { id: 3,  catSlug: "workflows",  title: "/code-review, /verify, /loop, /init 외 7종 — 개발 워크플로우 스킬 모음", desc: "코드 리뷰·보안·실행·자동화·프로젝트 셋업까지 Claude Code 개발 워크플로우 스킬 7종을 하나로 정리했습니다.\n\n##코드 품질\n**/code-review** — 현재 diff 버그 리뷰 (강도: low/medium/high/max/ultra)\n**/simplify** — 변경 코드 재사용·단순화·효율 개선\n**/security-review** — OWASP Top 10 기준 보안 점검\n\n##실행·검증\n**/verify** — 앱 직접 실행해서 변경사항 실제 동작 확인\n**/run** — 프로젝트 실행 후 라이브 변경사항 확인\n\n##자동화\n**/loop** — 슬래시 커맨드 주기적 반복 실행\n**/schedule** — 크론 기반 원격 에이전트 예약 실행\n\n##프로젝트 셋업\n**/init** — CLAUDE.md 코드베이스 문서 자동 초기화\n**/claude-api** — Claude API·Anthropic SDK 레퍼런스 조회", votes: 489 },

  // ── Taste Skill ──
  { id: 77, catSlug: "resources",  title: "Taste Skill v2 — AI 프론트엔드 안티-슬롭 프레임워크", desc: "**창시자** — Leon Lin & blueemi (오픈소스)\n**스타** — GitHub 37K+ 스타\n**개요** — Cursor·Claude Code·Codex·Gemini CLI·v0·Lovable 등 모든 AI 코딩 에이전트가 범용적으로 생성하는 슬롭 UI를 근절하는 SKILL.md 기반 프레임워크\n\n##핵심 기능\n**브리프 추론** — 산업·타겟·분위기·모션 깊이·레이아웃을 먼저 읽고 방향 추론\n**3개 다이얼** — DESIGN_VARIANCE(1-10)·MOTION_INTENSITY(1-10)·VISUAL_DENSITY(1-10)로 출력 조절\n**디자인 시스템 맵** — 상황에 맞게 Material·Fluent·Carbon·shadcn/ui 등 자동 선택\n**다크모드** — 기본 듀얼모드, 대비와 계층 패리티 유지\n**리디자인 프로토콜** — 보존 vs 개조 판단 후 감사 우선 실행\n**하드 프리플라이트 체크** — 모든 항목 통과 후에만 코드 출력\n\n##6개 카테고리 / 13개 스킬\n**구현** — taste-skill(v2)·taste-skill-v1·gpt-tasteskill·image-to-code·redesign·soft·output·minimalist·brutalist·stitch\n**이미지 생성** — imagegen-frontend-web·imagegen-frontend-mobile·brandkit\n\n##금지 규칙\nInter 폰트·이모지·순수 흑백(#000)·네온 글로우·3열 카드·AI 보라 그라디언트·떠다니는 블롭·가짜 KPI", votes: 498,  url: "https://www.tasteskill.dev" },
  { id: 78, catSlug: "resources",  title: "Taste Skill v1 — 레거시 안정 버전", desc: "**버전** — v1 (원본, 레거시)\n**라이선스** — MIT 오픈소스\n**용도** — v2에서 특정 동작이 깨질 경우에만 사용\n**다이얼** — 동일하게 VARIANCE·MOTION·DENSITY 3축 조절\n**금지 규칙** — Inter 폰트·이모지·순수 흑백·네온 글로우·3열 카드 레이아웃·\"Jane Doe\" 같은 제네릭 이름\n**크리에이티브 아스널** — 하이엔드 디자인 레퍼런스 패턴 카탈로그\n**모션 엔진** — 벤토 패러다임, 지속적 마이크로 인터랙션\n**프리플라이트 체크리스트** — 출력 전 검증 필수\n**비고** — v2가 기본값이지만 v1이 필요한 프로젝트를 위해 보존", votes: 234,  url: "https://github.com/Leonxlnx/taste-skill/tree/main/skills/taste-skill-v1" },
  { id: 79, catSlug: "resources",  title: "GPT Taste Skill — GPT/Codex 전용 엄격 변형", desc: "**대상** — GPT·Codex 모델 전용\n**특징** — Python 진정한 랜덤화로 레이아웃 다양성 강제\n**페이지 구조** — AIDA(Attention-Interest-Desire-Action) 강제\n**타이포그래피** — 넓은 에디토리얼 서체, 2라인 히어로 철칙\n**그리드** — 갭 없는 벤토 그리드(grid-flow-dense)\n**모션** — GSAP ScrollTrigger 핀·스택·스크럽 필수\n**프리플라이트** — 코드 생성 전 `<design_plan>` 블록 의무화\n**설치** — `npx skills add... --skill \"gpt-taste\"`", votes: 267,  url: "https://github.com/Leonxlnx/taste-skill/tree/main/skills/gpt-tasteskill" },
  { id: 80, catSlug: "resources",  title: "Image-to-Code Skill — 이미지→코드 파이프라인", desc: "**워크플로우** — 디자인 이미지 생성 → 심층 분석 → 프론트엔드 구현\n**필수 규칙** — 섹션별 이미지 충분히 생성 (8개 섹션 = 8개 이미지)\n**금지** — 기존 이미지 크롭·재사용 금지\n**분석 항목** — 텍스트·타이포그래피·간격·색상·버튼 스타일 추출\n**반드리프트** — 생성된 이미지에 충실하게 구현, 제네릭 표류 금지\n**금지 패턴** — 카드 속 카드 속 카드(nested-box) 구조 금지\n**히어로** — 작은 노트북에서도 가독성 확보\n**설치** — `npx skills add... --skill \"image-to-code\"`", votes: 289,  url: "https://github.com/Leonxlnx/taste-skill/tree/main/skills/image-to-code-skill" },
  { id: 81, catSlug: "resources",  title: "Redesign Skill — 기존 프로젝트 감사 및 업그레이드", desc: "**프로세스** — 3단계: 스캔 → 진단 → 수정\n**감사 영역** — 타이포그래피·색상·레이아웃·인터랙티비티·콘텐츠·컴포넌트 패턴·아이코노그래피·코드 품질·전략적 누락\n**우선순위** — 폰트 교체 1순위 → 색상 → 상태 → 순차 적용\n**기술 스택** — 기존 스택 유지, 프레임워크 마이그레이션 금지\n**업그레이드 기법** — 가변 폰트 애니메이션·브로큰 그리드·패럴랙스 스택·글래스모피즘·그레인 오버레이·스프링 피직스\n**대상** — 그린필드 스타일링이 아닌 기존 코드베이스 개선\n**설치** — `npx skills add... --skill \"redesign-existing-projects\"`", votes: 312,  url: "https://github.com/Leonxlnx/taste-skill/tree/main/skills/redesign-skill" },
  { id: 82, catSlug: "resources",  title: "Soft Skill — 프리미엄 고급 UI/UX 디자인", desc: "**페르소나** — Principal UI/UX Architect & Motion Choreographer\n**지향** — 15만 달러급 에이전시 디자인, 고급스럽고 차분한 UI\n**Absolute Zero** — Inter·Roboto·Lucide 아이콘·제네릭 섀도우·선형 이징 전면 금지\n**크리에이티브** — Vibe/Texture 아키타입 + Layout 아키타입 조합 선택\n**더블 베젤** — 외부 쉘 + 내부 코어 중첩 아키텍처\n**아일랜드 네비게이션** — 플로팅 글래스 필 네비가 풀스크린 오버레이로 변형\n**버튼** — 버튼-인-버튼 트레일링 아이콘, 자기적 호버 피직스\n**모션** — 스크롤 보간(페이드업 + 블러 진입), GPU-세이프 보호\n**설치** — `npx skills add... --skill \"high-end-visual-design\"`", votes: 345,  url: "https://github.com/Leonxlnx/taste-skill/tree/main/skills/soft-skill" },
  { id: 83, catSlug: "resources",  title: "Output Skill — AI 출력 완전성 강제", desc: "**문제** — LLM 토큰 제한으로 인한 출력 끊김 해결 및 출력 완전성 강제 스킬", votes: 289,  url: "https://github.com/Leonxlnx/taste-skill/tree/main/skills/output-skill" },
  { id: 90, catSlug: "figma", title: "Figma to Code — 피그마 AI 코드 제너레이터", desc: "피그마 디자인 컴포넌트를 직접 읽어 React, Tailwind CSS 코드로 자동 변환하는 AI 플러그인입니다. 실시간 프리뷰 및 내보내기 기능을 지원합니다.", votes: 120 }
, { id: 84, catSlug: "resources",  title: "Minimalist Skill — 에디토리얼 미니멀 UI", desc: "**지향** — Notion·Linear 스타일의 클린 에디토리얼 인터페이스\n**금지** — Inter·Roboto·Open Sans·Lucide 아이콘·헤비 섀도우·그라디언트·필 버튼·이모지\n**타이포그래피** — 산세리프(SF Pro/Geist) + 에디토리얼 세리프(Playfair/Lyon) + 모노스페이스(JetBrains Mono)\n**색상** — 웜 모노크롬(화이트/크림 캔버스) + 워시드 파스텔 악센트\n**컴포넌트** — 1px `#EAEAEA` 테두리, 8-12px radius, 넉넉한 내부 패딩\n**모션** — 스크롤 페이드업, 호버 카드 리프트, 스태거드 리빌\n**설치** — `npx skills add... --skill \"minimalist-ui\"`", votes: 256,  url: "https://github.com/Leonxlnx/taste-skill/tree/main/skills/minimalist-skill" },
  { id: 85, catSlug: "resources",  title: "Brutalist Skill — 인더스트리얼 브루탈리스트 UI", desc: "**지향** — 스위스 타이포그래피 + 밀리터리 터미널 미학 결합\n**2가지 비주얼** — Swiss Industrial Print(라이트·뉴스프린트·헤비 산스) OR Tactical Telemetry/CRT(다크·모노스페이스·스캔라인)\n**매크로 타이포** — 네오 그로테스크 대극단 스케일, 네거티브 트래킹, 대문자 전용\n**마이크로 타이포** — 모노스페이스 10-14px 모든 데이터·메타데이터\n**컬러** — 화이트 `#F4F4F0`(Swiss) 또는 `#0A0A0A`(CRT), 단일 악센트: Aviation Red `#E61919`\n**제로 radius** — 엄격한 90도 코너, 곡률 금지\n**ASCII 장식** — `>>>`·`[ SYSTEMS ]` 구문 데코레이션\n**그리드** — `gap: 1px`로 면도날처럼 얇은 분할선\n**설치** — `npx skills add... --skill \"industrial-brutalist-ui\"`", votes: 234,  url: "https://github.com/Leonxlnx/taste-skill/tree/main/skills/brutalist-skill" },
  { id: 86, catSlug: "resources",  title: "Stitch Skill — Google Stitch 디자인 시스템 익스포트", desc: "**대상** — Google Stitch(labs.google.com/stitch) 스크린 생성 파이프라인\n**출력** — Stitch가 해석 가능한 `DESIGN.md` 생성 (안티-슬롭 규칙 인코딩)\n**문서 구조** — 분위기·팔레트·타이포그래피·컴포넌트 동작·레이아웃 원칙·모션 철학·반응형 규칙·안티패턴\n**정밀도** — 정확한 HEX 코드·rem 값·기능적 역할 명시\n**NEVER DO** — 이모지·Inter·순수 흑백·3열 그리드·AI 카피라이팅 클리셰 전면 금지\n**호환성** — Impeccable의 DESIGN.md 생성과 동일 스펙\n**설치** — `npx skills add... --skill \"stitch-design-taste\"`", votes: 212,  url: "https://github.com/Leonxlnx/taste-skill/tree/main/skills/stitch-skill" },
  { id: 87, catSlug: "resources",  title: "ImageGen Frontend Web — 웹사이트 디자인 이미지 생성", desc: "**출력물** — 프리미엄 웹사이트 디자인 레퍼런스 이미지 (코드 미포함)\n**하드 규칙** — 섹션별 1개의 가로 이미지 생성 (8개 섹션 = 8개 이미지)\n**구성 다양성** — 기본 좌측-텍스트/우측-이미지 강제 해제, 비대칭·센터·오프그리드 다양화\n**조합 엔진** — 테마·배경·타이포·히어로·섹션 시스템 시그니처 컴포넌트·모션·컴포지션 다양화\n**나레이티브** — 개념 스파인 + \"두 번째 읽음\" 순간 설계\n**히어로 스케일** — Giant Statement / Mid Editorial / Mini Minimalist 중 선택\n**안티 슬롭** — 보라 그라디언트·떠다니는 블롭·가짜 KPI 클러터 금지\n**설치** — `npx skills add... --skill \"imagegen-frontend-web\"`", votes: 245,  url: "https://github.com/Leonxlnx/taste-skill/tree/main/skills/imagegen-frontend-web" },
  { id: 88, catSlug: "resources",  title: "ImageGen Frontend Mobile — 모바일 앱 스크린 이미지 생성", desc: "**출력물** — 프리미엄 모바일 앱 스크린 콘셉트 이미지 (코드 미포함)\n**플랫폼** — iOS 네이티브 / Android 네이티브 / 크로스플랫폼 프리미엄\n**목업** — 기본적으로 프레임이 보이는 깨끗한 폰 목업 내 스크린\n**흐름** — 한 장의 히어로 모킹이 아닌 믿을 수 있는 플로우 생성\n**일관성** — 내부 디자인 바이블로 화면 간 일관성 잠금\n**세이프 에어리어** — 시스템 영역 인지 및 Safe area 준수\n**안티 슬롭** — 보라 핀테크 그라디언트·가짜 차트 스팸·제네릭 아이콘 금지\n**카테고리 바이어스** — 핀테크·헬스·프로덕티비티·소셜·커머스·웰니스 특화\n**설치** — `npx skills add... --skill \"imagegen-frontend-mobile\"`", votes: 223,  url: "https://github.com/Leonxlnx/taste-skill/tree/main/skills/imagegen-frontend-mobile" },
  { id: 89, catSlug: "resources",  title: "Brandkit — AI 브랜드 아이덴티티 보드 생성", desc: "**출력물** — 프리미엄 브랜드 가이드라인 보드·로고 시스템·아이덴티티 덱 이미지\n**보드 레이아웃** — 3x3 그리드 기본값 (로고 커버·구성·디지털 앱·에센스·컬러·타이포·피지컬 앱·이미지 방향·시스템 디테일)\n**브랜드 전략** — 카테고리·타겟·메타포·감정적 약속을 먼저 추론\n**로고 생성** — 5가지 방식: 모노그램+의미·프로덕트 액션·메타포 퓨전·네거티브 스페이스·컨스트럭션 지오메트리\n**비주얼 모드** — 8가지 모드: 다크 디벨로퍼·다크 프로덕트·다크 네이처·다크 시큐리티·라이트 에디토리얼·럭셔리·보이스·컬처럴\n**목업 유형** — 브라우저 크롬·터미널·앱 아이콘·씰·뱃지·대시보드\n**프리미엄 디테일** — 페이지 번호·얼라인먼트 마크·크로스헤어 그리드·씬 룰·할프톤 처리\n**안티 슬롭** — 랜덤 플로팅 아이콘·무의미한 블롭·파워포인트 슬라이드 금지\n**설치** — `npx skills add... --skill \"brandkit\"`", votes: 289,  url: "https://github.com/Leonxlnx/taste-skill/tree/main/skills/brandkit" },
];

async function main() {
  const env = loadEnv();
  const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  // Use service_role key when available (bypasses RLS), fall back to anon key
  const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase credentials not found in .env.local');
    process.exit(1);
  }

  const isServiceRole = supabaseKey.includes('service_role') || supabaseKey.startsWith('eyJ') && !supabaseKey.includes('anon');

  if (!isServiceRole) {
    console.error('');
    console.error('ERROR: Anon key cannot bypass RLS. Add SUPABASE_SERVICE_ROLE_KEY to .env.local');
    console.error('1. Go to https://supabase.com/dashboard/project/puxlwevkyfztlbvajnva/settings/api');
    console.error('2. Copy the service_role key');
    console.error('3. Add to .env.local: SUPABASE_SERVICE_ROLE_KEY=eyJ...');
    console.error('');
    process.exit(1);
  }

  const { createClient } = await import('@supabase/supabase-js');
  const supabase = createClient(supabaseUrl, supabaseKey);

  console.log('Connected to Supabase');

  // Delete existing data first
  console.log('Clearing existing contents...');
  await supabase.from('contents').delete().neq('id', 0);

  // Map items to DB rows
  const rows = ITEMS.map(item => ({
    id: item.id,
    title: item.title,
    description: item.desc,
    url: item.url || null,
    category_id: CATEGORY_IDS[item.catSlug] || null,
    user_id: null,
    votes: item.votes,
  }));

  console.log(`Inserting ${rows.length} items...`);
  const { error } = await supabase.from('contents').insert(rows);

  if (error) {
    console.error('Insert failed:', error.message);
    process.exit(1);
  }

  console.log('Done! All items seeded successfully.');
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
