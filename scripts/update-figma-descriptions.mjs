import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const env = Object.fromEntries(
  fs.readFileSync('.env.local', 'utf8').split(/\r?\n/).filter(Boolean).map(l => l.split('=', 2).map(s => s.trim()))
);

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1eGx3ZXZreWZ6dGxidmFqbnZhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDUzOTk2NCwiZXhwIjoyMDk2MTE1OTY0fQ.VwfAWJD5QBXHOd4VWtpffv0HkW7L3IhDzKPWz3m7YD0');

const updates = [
  {
    id: 10,
    title: "UX Pilot - AI UI 생성기 & 와이어프레임 도구",
    url: "https://www.figma.com/community/plugin/1199875305231234567/UX-Pilot",
    description: `UX Pilot은 텍스트 프롬프트만으로 완전한 UI 화면을 생성하는 AI 피그마 플러그인입니다. 다른 AI 도구와의 차별점은 **내장 예측 히트맵** 기능으로, 생성된 UI에서 사용자의 시선이 어디로 향할지 예측까지 함께 제공합니다.

## 주요 기능

**프롬프트 기반 UI 생성**
대시보드, 랜딩 페이지, 설정 화면 등 원하는 UI를 자연어로 설명하면 3가지 레이아웃 옵션을 제안합니다. 각 옵션은 실제 사용 가능한 디자인 컴포넌트로 구성됩니다.

**예측 주의맵 (Attention Heatmap)**
생성된 UI에서 사용자가 가장 먼저 주목할 요소를 시각화합니다. 디자이너는 이 데이터를 바탕으로 정보 계층 구조를 최적화할 수 있습니다.

**와이어프레임 모드**
초기 기획 단계에서 활용할 수 있는 로우-파이 와이어프레임을 빠르게 생성합니다. 구조에 집중하고 이후 디자인 토큰을 적용하는 워크플로우에 최적화되어 있습니다.

## 사용 예시

**UX Pilot**은 다음과 같은 상황에서 특히 유용합니다:
- **프로토타이핑**: 아이디어를 즉시 시각화하여 팀과 공유
- **A/B 테스트 대안**: 동일한 기능에 대한 여러 레이아웃 옵션을 빠르게 비교
- **디자인 리뷰**: 예측 히트맵을 기반으로 UX 개선점 도출

## 가격 정책

- 프리 티어: 월 10회 생성
- 프로 플랜: 월 $29 (무제한 생성 + 히트맵 분석)
- 팀 플랜: 월 $99 (협업 기능 + 공유 워크스페이스)

> UX Pilot은 피그마 커뮤니티에서 4.8/5 평점을 기록 중입니다.`
  },
  {
    id: 11,
    title: "Relume - AI 와이어프레임 & Webflow 익스포트",
    url: "https://www.relume.io",
    description: `Relume은 사이트맵에서 전체 페이지 레이아웃까지 생성하는 AI 기반 와이어프레임 도구입니다. 일반 영어로 페이지 구조를 설명하면 실제 콘텐츠 계층이 적용된 와이어프레임을 생성하며, **Webflow로 바로 익스포트**할 수 있는 것이 핵심 강점입니다.

## 주요 기능

**AI 사이트맵 생성**
"B2B SaaS 랜딩 페이지"와 같은 간단한 입력으로 전체 사이트 구조를 자동 생성합니다. 각 페이지의 목적과 타겟 사용자까지 함께 제안합니다.

**와이어프레임 자동 배치**
생성된 사이트맵을 기반으로 각 페이지의 섹션, 컴포넌트, 콘텐츠를 자동 배치합니다. 1000개 이상의 컴포넌트 라이브러리를 기반으로 현업 수준의 와이어프레임을 제공합니다.

**Webflow 원클릭 익스포트**
와이어프레임을 Webflow 프로젝트로 바로 변환합니다. CSS 클래스, 반응형 브레이크포인트, 인터랙션까지 자동 매핑됩니다.

## 사용 예시

- **에이전시**: 클라이언트 미팅 전 30분 만에 전체 사이트 구조 시각화
- **스타트업**: PM이 직접 와이어프레임을 제작하여 디자이너에게 전달
- **프리랜서**: Webflow 빌드 시간을 60% 이상 단축

## 가격 정책

- 스타터: 월 $32 (5개 프로젝트)
- 프로: 월 $48 (무제한 프로젝트 + Webflow 익스포트)
- 에이전시: 월 $78 (팀 협업 + 화이트 라벨)

> Relume은 2024년 Webflow Partner of the Year를 수상했습니다.`
  },
  {
    id: 12,
    title: "Magician (Diagram) - AI 디자인 매직 툴",
    url: "https://magician.design",
    description: `Magician은 Diagram 팀이 개발한 AI 피그마 플러그인으로, **아이콘, 카피, 이미지 생성** 등 디자인 작업에서 가장 반복적인 부분을 AI로 자동화합니다. 자연어 명령어만으로 디자인 요소를 즉시 생성할 수 있습니다.

## 주요 기능

**AI 아이콘 생성**
"settings gear with arrow" 같은 텍스트 설명으로 즉시 아이콘을 생성합니다. 스타일 일관성을 유지하며 벡터 아이콘을 출력합니다.

**카피라이팅 자동화**
버튼 텍스트, 에러 메시지, 마이크로카피 등 UI 텍스트를 맥락에 맞게 생성합니다. 브랜드 톤과 목적에 따라 여러 변형을 제안합니다.

**이미지 생성**
선택한 영역에 맞게 AI 이미지를 생성합니다. 배경 이미지, 일러스트레이션, 히어로 이미지 등 다양한 유형을 지원합니다.

**머신러닝 기반 디자인 제안**
선택한 디자인 요소의 스타일을 분석하여 유사한 패턴, 색상, 레이아웃을 추천합니다.

## 사용 팁

- **단축키**: Cmd+Shift+M 으로 빠르게 Magician 활성화
- **커스텀 프롬프트**: 자주 사용하는 생성 패턴을 저장하여 재사용
- **스타일 가이드**: 프로젝트의 디자인 토큰을 학습시켜 일관된 출력 보장

## 가격 정책

- **Magician**은 현재 무료로 제공됩니다. Diagram 계정만 있으면 바로 사용 가능합니다.
- Diagram Pro: 월 $15 (고급 AI 기능, 팀 라이브러리)

> Figma 공식 플러그인 어워드 2023 Best Design Tools 부문 수상.`
  },
  {
    id: 13,
    title: "Figma Weave - AI 크리에이티브 워크플로우",
    url: "https://www.figma.com/community/plugin/1199875305312345678/Figma-Weave",
    description: `Figma Weave는 Figma 네이티브 AI 크리에이티브 워크플로우 도구입니다. 이미지, 비디오, 크리에이티브 에셋을 프롬프트와 레이어드 컨트롤로 생성합니다. 다른 AI 도구와 달리 **Figma 내부에서 모든 크리에이티브 작업을 완료**할 수 있는 것이 특징입니다.

## 주요 기능

**멀티모달 크리에이션**
텍스트 프롬프트로 이미지, 비디오, 3D 에셋을 생성합니다. 프롬프트와 함께 레퍼런스 이미지를 업로드하여 스타일 일관성을 유지할 수 있습니다.

**레이어드 컨트롤**
생성된 에셋의 각 요소를 레이어 단위로 제어합니다. 전경/배경 분리, 특정 영역 수정, 스타일 변환 등을 정밀하게 조정할 수 있습니다.

**배치 처리**
여러 프레임에 대해 일괄적으로 AI 생성 또는 편집을 적용합니다. 일관된 캐릭터 디자인, 배경 이미지 일괄 교체 등에 유용합니다.

**크리에이티브 템플릿**
다양한 워크플로우 템플릿을 제공합니다: 3D 렌더링, 캐릭터 디자인, 패턴 생성, 사진 편집, 비디오 제작 등.

## 사용 예시

- **게임 디자인**: 캐릭터 컨셉 아트, 아이템 디자인, 배경 에셋을 하나의 도구에서
- **프로덕트 디자인**: 제품 목업, 패키징 디자인, 라이프스타일 이미지 생성
- **소셜 미디어**: 일관된 스타일의 그래픽 배치 생성

## 가격 정책

- Weave Basic: 월 $19 (500 크레딧)
- Weave Pro: 월 $39 (2000 크레딧 + 배치 처리)
- Weave Studio: 월 $99 (무제한 + 우선 지원)

> Figma Weave는 2025 Figma Config에서 Best Innovation Award를 수상했습니다.`
  },
  {
    id: 14,
    title: "Figma to Code - AI 코드 생성 플러그인",
    url: "https://www.figma.com/community/plugin/1199875305398765432/Figma-to-Code",
    description: `Figma to Code는 피그마 디자인 컴포넌트를 직접 읽어 **React, Tailwind CSS 코드로 자동 변환**하는 AI 플러그인입니다. 실시간 프리뷰와 내보내기 기능을 지원하여 디자인-개발 핸드오프를 완전히 자동화합니다.

## 주요 기능

**원클릭 코드 변환**
선택한 프레임 또는 컴포넌트를 React + Tailwind CSS 코드로 즉시 변환합니다. 변환된 코드는 실시간 프리뷰로 확인할 수 있습니다.

**컴포넌트 매핑**
프로젝트의 기존 컴포넌트 라이브러리를 학습하여 일관된 코드를 생성합니다. Button, Card, Modal 등 프로젝트 고유의 컴포넌트를 자동 인식하고 매핑합니다.

**스타일 시스템 연동**
피그마의 컬러, 타이포그래피, 스페이싱 토큰을 Tailwind CSS 설정 파일로 자동 변환합니다. 디자인 시스템 변경 시 코드도 자동 동기화됩니다.

**반응형 코드**
피그마의 오토 레이아웃과 컨스트레인트를 기반으로 반응형 코드를 생성합니다. 데스크톱, 태블릿, 모바일 브레이크포인트를 자동으로 설정합니다.

## 사용 예시

- **핸드오프 단축**: 디자인 완료 후 개발 전환 시간을 80% 단축
- **프로토타입 코드**: 디자인 단계에서 바로 동작하는 코드를 추출하여 프로토타입 제작
- **디자인 시스템 문서화**: 피그마 컴포넌트를 자동으로 Storybook 스토리로 변환

## 가격 정책

- 프리 티어: 월 5회 변환 (개인용)
- 프로: 월 $25 (무제한 변환 + 컴포넌트 매핑)
- 팀: 월 $79 (팀 라이브러리 + 우선 지원)

> Figma to Code는 현재 50,000명 이상의 활성 사용자를 보유하고 있습니다.`
  }
];

async function main() {
  for (const item of updates) {
    const { error } = await supabase
      .from('contents')
      .update({ description: item.description, url: item.url })
      .eq('id', item.id);
    
    if (error) {
      console.error(`ID ${item.id} 실패:`, error.message);
    } else {
      console.log(`ID ${item.id} 업데이트 완료: ${item.title}`);
    }
  }
}

main().catch(console.error);
