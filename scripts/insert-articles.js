const { createClient } = require('@supabase/supabase-js');

async function main() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  // 1. Add figma category if not exists
  const { data: figmaCat } = await supabase
    .from('categories')
    .upsert({ slug: 'figma', name: '피그마 플러그인', description: 'AI 기반 피그마 플러그인 및 디자인 도구', content_count: 0 }, { onConflict: 'slug' })
    .select()
    .single();

  const figmaId = figmaCat?.id || 14;
  const agentsId = 4;
  console.log('figma category id:', figmaId);

  // 2. Insert articles
  const articles = [
    {
      title: '/impeccable - AI 프론트엔드 디자인 스킬',
      description: [
        'Paul Bakaus가 만든 오픈소스 Claude Code 스킬.',
        '23개의 명령어(/audit, /polish, /critique, /distill, /animate, /bolder 등),',
        '7개 도메인 레퍼런스 파일(타이포그래피, 컬러, 모션, 공간, 인터랙션, 반응형, UX 라이팅),',
        '27개의 결정론적 안티패턴 규칙을 제공.',
        'Inter 폰트 남용, 보라-파랑 그라데이션, 중첩 카드 등',
        'AI 생성 프론트엔드의 전형적인 AI 슬롭을 방지.',
        'CLI, Chrome 확장 프로그램, 라이브 모드 지원. GitHub 35.7k 스타.',
      ].join(' '),
      url: 'https://github.com/pbakaus/impeccable',
      category_id: agentsId,
      votes: 35700,
    },
    {
      title: 'Taste Skill (design-taste-frontend) - 안티-슬롭 프론트엔드 프레임워크',
      description: [
        'Leon Lin과 blueemi가 만든 오픈소스 AI 에이전트 스킬.',
        'Cursor, Claude Code, Codex, Gemini CLI, v0, Lovable, OpenCode 등 모든 AI 코딩 도구에서 작동.',
        'v2(experimental)에서 브리프 추론, 다크모드 프로토콜, 리디자인 프로토콜, 하드 프리플라이트 체크 등 도입.',
        '랜딩페이지, 포트폴리오, 리디자인에 특화.',
        '실제 디자인 시스템 매핑(Material, Fluent, Carbon, shadcn 등) 지원.',
        '13개의 서브 스킬(gpt-tasteskill, redesign-skill, soft-skill, brutalist-skill 등) 포함.',
      ].join(' '),
      url: 'https://github.com/Leonxlnx/taste-skill',
      category_id: agentsId,
      votes: 12800,
    },
    {
      title: 'UX Pilot - AI UI 생성기 & 와이어프레임 도구',
      description: [
        '텍스트 프롬프트로 완전한 UI 화면을 생성하고,',
        '내장 예측 히트맵으로 사용자 시선을 예측하는 AI 피그마 플러그인.',
        '단순한 UI 생성을 넘어 리서치 검증 레이어를 제공.',
        '대시보드를 설명하면 3가지 레이아웃 옵션과 각각의 예측 주의맵을 함께 제공.',
        '제품 디자이너에게 적합.',
      ].join(' '),
      url: 'https://www.figma.com/community/plugin/1257688030051249633/ux-pilot',
      category_id: figmaId,
      votes: 4200,
    },
    {
      title: 'Relume - AI 와이어프레임 & Webflow 익스포트',
      description: [
        '사이트맵에서 전체 페이지 레이아웃을 생성하는 AI 와이어프레임 도구.',
        '일반 영어로 페이지 구조를 설명하면 실제 콘텐츠 계층이 있는 와이어프레임 생성.',
        'Webflow 통합으로 와이어프레임이 라이브 사이트로 바로 전환.',
        '프리랜서와 에이전시의 마케팅 사이트 제작에 최적화.',
      ].join(' '),
      url: 'https://www.figma.com/community/plugin/1245615905217691936/relume',
      category_id: figmaId,
      votes: 3800,
    },
    {
      title: 'Magician (Diagram) - AI 디자인 매직 툴',
      description: [
        'Diagram이 개발한 AI 피그마 플러그인.',
        '아이콘, 카피, 이미지 생성 등 디자인 전반의 반복 작업을 AI로 자동화.',
        'Figma에 인수된 Diagram의 대표 제품으로,',
        '머신러닝을 활용해 디자인 요소(아이콘, 로고, 패턴 등)를 즉시 생성.',
        '자연어 명령어로 디자인 시스템에 맞는 에셋을 생성.',
      ].join(' '),
      url: 'https://www.figma.com/community/plugin/1096543345491888114/magician',
      category_id: figmaId,
      votes: 5600,
    },
    {
      title: 'Figma Weave - AI 크리에이티브 워크플로우',
      description: [
        'Figma 네이티브 AI 워크플로우 도구.',
        '이미지, 비디오, 크리에이티브 에셋을 프롬프트와 레이어드 컨트롤로 생성.',
        '3D, 배치 처리, 일관된 캐릭터, 이미지 편집, 비디오 제작 등',
        '다양한 워크플로우 템플릿 제공.',
        'Figma 생태계 내에서 AI 창작을 가능하게 하는 공식 도구.',
      ].join(' '),
      url: 'https://weave.figma.com',
      category_id: figmaId,
      votes: 7100,
    },
    {
      title: 'Figma to Code - AI 코드 생성 플러그인',
      description: [
        '피그마 디자인 컴포넌트를 직접 읽어 React, Tailwind CSS 코드로 자동 변환하는 AI 플러그인.',
        '실시간 프리뷰 및 내보내기 기능 지원.',
        '디자인-개발 핸드오프를 자동화하여 생산성을 극대화.',
      ].join(' '),
      url: 'https://www.figma.com/community/plugin/figma-to-code',
      category_id: figmaId,
      votes: 3200,
    },
  ];

  for (const article of articles) {
    const { error } = await supabase.from('contents').insert({
      title: article.title,
      description: article.description,
      url: article.url,
      category_id: article.category_id,
      user_id: null,
      votes: article.votes,
    });
    if (error) {
      console.error('FAILED:', article.title, '-', error.message);
    } else {
      console.log('OK:', article.title);
    }
  }

  // 3. Update content counts
  const { data: figmaContents } = await supabase
    .from('contents')
    .select('id', { count: 'exact', head: true })
    .eq('category_id', figmaId);
  await supabase
    .from('categories')
    .update({ content_count: figmaContents?.length ?? 0 })
    .eq('id', figmaId);

  const { data: agentsContents } = await supabase
    .from('contents')
    .select('id', { count: 'exact', head: true })
    .eq('category_id', agentsId);
  await supabase
    .from('categories')
    .update({ content_count: agentsContents?.length ?? 0 })
    .eq('id', agentsId);

  console.log('\nDone! Category counts updated.');
}

main().catch(console.error);
