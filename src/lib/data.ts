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
  { id: 1,  cat: "MCP 서버",    catSlug: "mcp",        title: "Claude MCP 파일시스템 서버",        desc: "Claude가 로컬 파일을 직접 읽고 쓸 수 있게 해주는 공식 MCP 서버. 코딩 에이전트 워크플로우에 필수.", votes: 482, author: "Anthropic",    time: "2시간 전", hot: true  },
  { id: 2,  cat: "프롬프트",    catSlug: "prompts",    title: "체인오브트 마스터 프롬프트 v3",    desc: "GPT-4o, Claude, Gemini에서 검증된 복잡 추론 유도 프롬프트. 정확도 37% 이상.",               votes: 319, author: "프롬프트장인",  time: "4시간 전", hot: false },
  { id: 3,  cat: "워크플로우",  catSlug: "workflows",  title: "n8n × Claude 콘텐츠 파이프라인",    desc: "RSS 수집 → Claude 요약 → Notion 자동 전송하는 n8n 워크플로우 파일 포함.",                    votes: 256, author: "자동화마법사", time: "6시간 전", hot: false },
  { id: 4,  cat: "모델",        catSlug: "models",     title: "Gemini 1.5 Pro 컨텍스트 2M 사용기",   desc: "코드베이스 전체를 컨텍스트에 넣고 리팩토링한 경험. 생산성 가시적으로 상승.",           votes: 198, author: "dev.kimchi",  time: "어제",    hot: false },
  { id: 5,  cat: "AI 에이전트", catSlug: "agents",     title: "OpenDevin - 오픈소스 소프트웨어 에이전트", desc: "Devin의 오픈소스 구현 프로젝트. 코드 생성, 디버깅, 배포까지 자율 실행.",        votes: 441, author: "OpenDevin팀", time: "어제",    hot: true  },
  { id: 6,  cat: "튜토리얼",    catSlug: "tutorials",  title: "RAG 시스템 직접 구축하기 - 완전편", desc: "벡터 DB 선택부터 청킹 전략, 리트리벌 최적화까지. 프로덕션 활용 사례 포함.",                 votes: 287, author: "MLops한국",  time: "2일 전",  hot: false },
  { id: 7,  cat: "오픈소스",    catSlug: "opensource", title: "Open Interpreter - 로컬 코드 실행",desc: "자연어로 컴퓨터와 대화하는 오픈소스 프로젝트. 파일 관리, 웹 브라우징, 데이터 분석 가능",    votes: 376, author: "Killian",     time: "2일 전",  hot: false },
  { id: 8,  cat: "뉴스",        catSlug: "news",       title: "OpenAI, o3 모델 정식 출시",          desc: "추론 능력이 대폭 향상된 o3가 정식 출시되었다. 기존 o1 대비 수학, 코딩, 과학 분야에서 대폭 향상.", votes: 521, author: "AI News",     time: "3일 전",  hot: true  },
  { id: 9,  cat: "자동화",      catSlug: "automation", title: "Make.com AI 자동화 템플릿 100선",    desc: "Make.com에서 바로 사용 가능한 AI 자동화 시나리오 100개 모음. 이메일, SNS, 데이터 처리.",     votes: 189, author: "메이크러버", time: "3일 전",  hot: false },
  { id: 10, cat: "리서치",      catSlug: "research",   title: "멀티에이전트 시스템 최신 연구 리뷰",   desc: "2024년 발표된 멀티에이전트 시스템의 핵심 논문 20선 요약. 실제 응용 관점으로 분석.",                votes: 234, author: "AI리서처",   time: "4일 전",  hot: false },
];

export const COLLECTIONS: CollectionEntry[] = [
  { id: 1, title: "Claude 완전 정복 키트",    desc: "Claude를 최대로 활용하기 위한 프롬프트, MCP 서버, 워크플로우 모음.", count: 24, author: "AI인플루언서", updated: "3일 전"  },
  { id: 2, title: "업무 자동화 스타터팩",      desc: "n8n, Make.com, Zapier를 활용한 AI 업무 자동화 핵심 리소스",        count: 18, author: "자동화마법사", updated: "5일 전"  },
  { id: 3, title: "AI 글쓰기 도구 모음",       desc: "콘텐츠 작성, 편집, SEO 최적화를 위한 AI 도구와 프롬프트.",         count: 31, author: "AI라이터봇",   updated: "1주일 전" },
  { id: 4, title: "개발자를 위한 AI 도구",     desc: "코드 리뷰, 디버깅, 문서 생성을 도와주는 AI 개발 도구 모음.",        count: 27, author: "dev.kimchi",  updated: "2주일 전" },
  { id: 5, title: "MCP 서버 필수 모음",         desc: "Claude를 강력하게 만드는 MCP 서버 별별 컬렉션",                   count: 15, author: "MCP마스터",  updated: "어제"    },
  { id: 6, title: "AI 마케터 플레이북",         desc: "마케터를 위한 AI 활용 전략, 프롬프트, 자동화 워크플로우",          count: 22, author: "마케팅AI",     updated: "3일 전"  },
];
