// ── Types ──
export interface CategoryEntry {
  slug: string;
  label: string;
  count: number;
  desc: string;
}

export interface FeedItem {
  id: number;
  cat: string;
  catSlug: string;
  title: string;
  desc: string;
  votes: number;
  author: string;
  time: string;
  hot: boolean;
}

export interface CollectionEntry {
  id: number;
  title: string;
  desc: string;
  count: number;
  author: string;
  updated: string;
}

// ── Static mock data (safe for client & server) ──
export const TAGS = [
  "전체", "프롬프트", "워크플로우", "MCP 서버", "AI 에이전트",
  "자동화", "모델", "오픈소스", "튜토리얼", "뉴스", "리서치",
];

export const CATEGORIES: CategoryEntry[] = [
  { slug: "prompts",    label: "프롬프트",   count: 1240, desc: "효과적인 AI 사용을 위한 프롬프트 모음" },
  { slug: "workflows",  label: "워크플로우", count: 847,  desc: "반복 업무를 자동화하는 AI 워크플로우" },
  { slug: "mcp",        label: "MCP 서버",   count: 312,  desc: "Claude Model Context Protocol 서버" },
  { slug: "agents",     label: "AI 에이전트",count: 594,  desc: "자율적으로 작동하는 AI 에이전트" },
  { slug: "plugins",    label: "플러그인",   count: 421,  desc: "AI 도구를 확장하는 플러그인" },
  { slug: "automation", label: "자동화",     count: 763,  desc: "AI 기반 업무 자동화 도구" },
  { slug: "research",   label: "리서치",     count: 289,  desc: "AI 연구 논문 및 기술 분석" },
  { slug: "models",     label: "모델",       count: 156,  desc: "최신 AI 모델 정보 및 비교" },
  { slug: "opensource", label: "오픈소스",   count: 935,  desc: "공개된 AI 프로젝트와 코드" },
  { slug: "tutorials",  label: "튜토리얼",   count: 678,  desc: "AI 사용 가이드와 학습 자료" },
  { slug: "news",       label: "뉴스",       count: 1820, desc: "AI 업계 최신 뉴스와 동향" },
  { slug: "startups",   label: "스타트업",   count: 203,  desc: "주목할만한 AI 스타트업 소식" },
  { slug: "resources",  label: "리소스",     count: 512,  desc: "유용한 AI 학습 및 활용 자료" },
];

export const ITEMS: FeedItem[] = [
  // ── Claude Code Design Skills (4개 + impeccable 서브커맨드 12개) ──
  { id: 1,  cat: "AI 에이전트", catSlug: "agents",     title: "/impeccable — UI 올인원 디자인 스킬", desc: "프론트엔드 UI 전반 설계·개선·다듬기. 레이아웃, 컬러, 타이포, 모션, UX 카피, 컴포넌트, 접근성까지. craft·shape·audit·polish·bolder·animate·colorize·typeset·distill·overdrive·live 12개 서브커맨드 제공.", votes: 394, author: "Claude Code", time: "1시간 전", hot: true  },
  { id: 14, cat: "AI 에이전트", catSlug: "agents",     title: "/impeccable craft — UX/UI 기능 end-to-end 구현", desc: "UX/UI 계획 후 기능을 처음부터 끝까지 구현. 사용자 흐름 설계, 컴포넌트 아키텍처, 인터랙션 패턴까지 한 번에 처리.", votes: 287, author: "Claude Code", time: "1시간 전", hot: false },
  { id: 15, cat: "AI 에이전트", catSlug: "agents",     title: "/impeccable shape — 코드 작성 전 UX/UI 설계", desc: "실제 코드를 쓰기 전 UX/UI 방향을 먼저 설계. 와이어프레임 수준의 구조 계획, 컴포넌트 경계 정의, 데이터 흐름 설계.", votes: 213, author: "Claude Code", time: "1시간 전", hot: false },
  { id: 16, cat: "AI 에이전트", catSlug: "agents",     title: "/impeccable audit — 접근성·성능·반응형 기술 점검", desc: "WCAG 접근성, Core Web Vitals 성능, 반응형 레이아웃 종합 점검. 실제 사용자 시나리오 기반 기술 감사 리포트 생성.", votes: 241, author: "Claude Code", time: "2시간 전", hot: false },
  { id: 17, cat: "AI 에이전트", catSlug: "agents",     title: "/impeccable polish — 출시 전 최종 품질 패스", desc: "출시 전 최종 품질 점검. 픽셀 단위 정렬, 간격 일관성, 컬러 대비, 폰트 렌더링, 애니메이션 타이밍까지 세밀하게 다듬는다.", votes: 341, author: "Claude Code", time: "2시간 전", hot: true  },
  { id: 18, cat: "AI 에이전트", catSlug: "agents",     title: "/impeccable bolder — 밋밋한 디자인 강화 스킬", desc: "안전하거나 밋밋한 디자인을 과감하게 강화. 타이포 스케일 확대, 여백 재설계, 강조 요소 부각으로 기억에 남는 UI로 변환.", votes: 198, author: "Claude Code", time: "3시간 전", hot: false },
  { id: 19, cat: "AI 에이전트", catSlug: "agents",     title: "/impeccable animate — 목적 있는 애니메이션 추가", desc: "의미 없는 장식을 지양하고 UX를 향상시키는 모션 추가. 진입·퇴장·상태 전환 애니메이션을 목적에 맞게 구현.", votes: 263, author: "Claude Code", time: "3시간 전", hot: false },
  { id: 20, cat: "AI 에이전트", catSlug: "agents",     title: "/impeccable colorize — 단색 UI에 전략적 컬러 추가", desc: "모노크롬 또는 단조로운 UI에 목적 있는 컬러를 추가. 브랜드 아이덴티티, 계층 구조, 감정적 반응을 고려한 컬러 시스템 구축.", votes: 219, author: "Claude Code", time: "4시간 전", hot: false },
  { id: 21, cat: "AI 에이전트", catSlug: "agents",     title: "/impeccable typeset — 타이포그래피 계층 개선", desc: "텍스트 계층 구조 개선. 한국어 Pretendard 기반 폰트 스케일, 자간, 행간, 강조 처리를 정밀하게 조정.", votes: 312, author: "Claude Code", time: "4시간 전", hot: false },
  { id: 22, cat: "AI 에이전트", catSlug: "agents",     title: "/impeccable distill — 본질만 남기고 복잡도 제거", desc: "복잡도를 제거하는 디자인 다이어트. 불필요한 UI 요소, 중복 컴포넌트, 과도한 인터랙션을 식별하고 제거.", votes: 174, author: "Claude Code", time: "5시간 전", hot: false },
  { id: 23, cat: "AI 에이전트", catSlug: "agents",     title: "/impeccable harden — UI 견고성·방어 설계 강화", desc: "엣지 케이스, 빈 상태, 에러 상태, 로딩 상태 등 UI 방어 설계 강화. 실제 사용 시나리오에서 깨지지 않는 견고한 인터페이스 구현.", votes: 189, author: "Claude Code", time: "5시간 전", hot: false },
  { id: 24, cat: "AI 에이전트", catSlug: "agents",     title: "/impeccable overdrive — 관습적 한계 돌파 디자인", desc: "일반적인 UI 관습을 넘어서는 실험적 디자인 적용. 대담한 레이아웃, 비전통적 타이포, 강렬한 비주얼 계층으로 차별화된 UI 구현.", votes: 156, author: "Claude Code", time: "6시간 전", hot: false },
  { id: 25, cat: "AI 에이전트", catSlug: "agents",     title: "/impeccable live — 브라우저 시각적 변형 반복 모드", desc: "브라우저에서 실시간으로 시각적 변형을 반복 적용하는 인터랙티브 모드. 컬러, 간격, 타이포를 즉시 확인하며 최적 디자인을 탐색.", votes: 201, author: "Claude Code", time: "6시간 전", hot: false },
  { id: 2,  cat: "AI 에이전트", catSlug: "agents",     title: "/design-taste-frontend — 템플릿 탈출 랜딩페이지 스킬", desc: "템플릿처럼 보이지 않는 랜딩페이지·포트폴리오·리디자인 전문 스킬. 디자인 방향 추론 후 코드까지 직접 작성. 진부한 섹션 구조를 깨는 접근법.", votes: 271, author: "Claude Code", time: "2시간 전", hot: false },
  { id: 3,  cat: "AI 에이전트", catSlug: "agents",     title: "/emil-design-eng — Emil Kowalski 철학 기반 UI 폴리시", desc: "소프트웨어를 좋게 느끼게 만드는 보이지 않는 디테일에 집중. 마이크로 인터랙션, 애니메이션 판단 기준, 물리적 피드백 감각을 코드로 구현하는 Claude Code 스킬.", votes: 318, author: "Claude Code", time: "3시간 전", hot: true  },
  { id: 4,  cat: "AI 에이전트", catSlug: "agents",     title: "/redesign-existing-projects — 기존 사이트 프리미엄 업그레이드", desc: "기존 사이트·앱을 프리미엄 퀄리티로 업그레이드. 먼저 감사 후 AI 슬롭 패턴 제거, 고급 디자인 기준 적용. 완성도 있는 리디자인 결과물 제공.", votes: 247, author: "Claude Code", time: "4시간 전", hot: false },

  // ── Claude Code 코드 품질 Skills ──
  { id: 5,  cat: "워크플로우",  catSlug: "workflows",  title: "/code-review — diff 버그·정리 리뷰 스킬", desc: "현재 diff 버그·정리 리뷰. 강도 선택: low·medium·high·max·ultra. ultra는 멀티에이전트 클라우드 리뷰로 대규모 PR에 효과적.", votes: 412, author: "Claude Code", time: "5시간 전", hot: true  },
  { id: 6,  cat: "워크플로우",  catSlug: "workflows",  title: "/simplify — 코드 재사용·단순화·효율 개선 스킬", desc: "변경된 코드의 재사용·단순화·효율 개선 자동화. 중복 제거, 추상화 식별, 불필요한 복잡도 정리를 한 번에.", votes: 198, author: "Claude Code", time: "6시간 전", hot: false },
  { id: 7,  cat: "워크플로우",  catSlug: "workflows",  title: "/security-review — 브랜치 변경사항 보안 점검", desc: "현재 브랜치 변경사항 보안 점검. OWASP Top 10, SQL 인젝션, XSS, 시크릿 노출 등 자동 탐지. 배포 전 필수 체크포인트.", votes: 288, author: "Claude Code", time: "7시간 전", hot: false },

  // ── Claude Code 실행·검증 Skills ──
  { id: 8,  cat: "워크플로우",  catSlug: "workflows",  title: "/verify — 변경사항 실제 동작 확인 스킬", desc: "앱을 직접 실행해서 변경사항이 실제로 동작하는지 확인. 타입 체크와 테스트만으로는 알 수 없는 런타임 동작을 검증.", votes: 231, author: "Claude Code", time: "8시간 전", hot: false },
  { id: 9,  cat: "워크플로우",  catSlug: "workflows",  title: "/run — 프로젝트 실행·라이브 변경 확인 스킬", desc: "프로젝트 앱 실행 후 라이브로 변경사항 확인. 개발 서버 시작부터 브라우저 검증까지 에이전트가 자동 처리.", votes: 187, author: "Claude Code", time: "9시간 전", hot: false },

  // ── Claude Code 자동화 Skills ──
  { id: 10, cat: "자동화",      catSlug: "automation", title: "/loop — 슬래시 커맨드 주기적 반복 실행 스킬", desc: "프롬프트·슬래시 커맨드를 반복 실행. `/loop 5m /verify` 형태로 주기 설정. 지속적 모니터링과 자동화 루프 구성에 유용.", votes: 183, author: "Claude Code", time: "10시간 전", hot: false },
  { id: 11, cat: "자동화",      catSlug: "automation", title: "/schedule — 크론 기반 원격 에이전트 예약 실행", desc: "크론 스케줄로 원격 에이전트 예약 실행. 정기 보고서 생성, CI 실패 알림, 주기적 코드 감사 등 자동화 파이프라인 구축.", votes: 156, author: "Claude Code", time: "11시간 전", hot: false },

  // ── Claude Code 프로젝트 셋업·레퍼런스 Skills ──
  { id: 12, cat: "튜토리얼",    catSlug: "tutorials",  title: "/init — CLAUDE.md 코드베이스 문서 초기화 스킬", desc: "코드베이스 문서가 담긴 CLAUDE.md를 자동으로 초기화. 프로젝트 구조, 아키텍처, 컨벤션을 분석해 에이전트 가이드 문서 생성.", votes: 264, author: "Claude Code", time: "12시간 전", hot: false },
  { id: 13, cat: "튜토리얼",    catSlug: "tutorials",  title: "/claude-api — Claude API·Anthropic SDK 레퍼런스", desc: "Claude API · Anthropic SDK 레퍼런스 즉시 조회. 모델 ID, 가격, 스트리밍, 툴 유즈 사용법까지 Claude Code 내에서 바로 확인 가능.", votes: 209, author: "Claude Code", time: "어제", hot: false },
];

export const COLLECTIONS: CollectionEntry[] = [
  { id: 1, title: "Claude 완전 정복 키트",    desc: "Claude를 최대로 활용하기 위한 프롬프트, MCP 서버, 워크플로우 모음.", count: 24, author: "AI인플루언서", updated: "3일 전"  },
  { id: 2, title: "업무 자동화 스타터팩",      desc: "n8n, Make.com, Zapier를 활용한 AI 업무 자동화 핵심 리소스",        count: 18, author: "자동화마법사", updated: "5일 전"  },
  { id: 3, title: "AI 글쓰기 도구 모음",       desc: "콘텐츠 작성, 편집, SEO 최적화를 위한 AI 도구와 프롬프트.",         count: 31, author: "AI라이터봇",   updated: "1주일 전" },
  { id: 4, title: "개발자를 위한 AI 도구",     desc: "코드 리뷰, 디버깅, 문서 생성을 도와주는 AI 개발 도구 모음.",        count: 27, author: "dev.kimchi",  updated: "2주일 전" },
  { id: 5, title: "MCP 서버 필수 모음",         desc: "Claude를 강력하게 만드는 MCP 서버 별별 컬렉션",                   count: 15, author: "MCP마스터",  updated: "어제"    },
  { id: 6, title: "AI 마케터 플레이북",         desc: "마케터를 위한 AI 활용 전략, 프롬프트, 자동화 워크플로우",          count: 22, author: "마케팅AI",     updated: "3일 전"  },
];
