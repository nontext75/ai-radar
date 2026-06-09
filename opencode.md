# AI 컬렉션(Collections) 기능 기획 및 스펙

본 문서는 AI 리소스들을 특정 테마별로 묶어서 제공하는 **컬렉션(Collections)** 기능의 기획안입니다. 기획 승인 후 구현을 진행합니다.

## 1. 개요 및 목적
- 단일 리소스 탐색을 넘어, "Claude 완전 정복", "업무 자동화 스타터팩" 등 연관성 높은 AI 리소스들을 큐레이션된 세트로 제공하여 유저의 리소스 탐색 경험을 고도화합니다.

## 2. 화면 구성 및 UI 기획

### A. 컬렉션 목록 페이지 (`/collections`)
- **레이아웃**: 3열 Grid 카드 레이아웃 (반응형 대응).
- **카드 구성**:
  - **테마 타이틀**: 컬렉션의 제목.
  - **설명(Description)**: 컬렉션이 다루는 테마 및 목적 소개.
  - **카운트 배지**: 포함된 리소스 개수 (예: `15개 리소스`).
  - **메타 정보**: 작성자 닉네임, 마지막 업데이트일 (예: `3일 전`).
- **인터랙션**: 마우스 오버 시 카드에 부드러운 shadow & scale-up 모션 적용. 클릭 시 컬렉션 상세페이지(`/collections/[id]`)로 라우팅.

### B. 컬렉션 상세 페이지 (`/collections/[id]`)
- **레이아웃**: 좌측 리소스 목록 피드 + 우측 컬렉션 메타 정보 및 액션 사이드바 (`.grid-sidebar` 구조 활용).
- **상세 헤더 영역**:
  - "컬렉션 목록으로 돌아가기" 뒤로가기 링크.
  - 컬렉션 타이틀, 상세 설명, 작성자 정보.
- **리소스 피드 영역**:
  - 컬렉션 내에 큐레이션된 실제 리소스(FeedItem)들을 리스트 형태로 렌더링.
  - 각 리소스 클릭 시 개별 리소스 상세페이지(`/items/[id]`)로 연동.
- **우측 사이드바**:
  - 컬렉션 전체 추천(Vote) 버튼.
  - 컬렉션 공유하기 (현재 URL 클립보드 복사) 버튼.

## 3. 데이터 구조 설계

### A. Mock Data (`data.ts` 확장)
- `COLLECTIONS` mock data에 속한 리소스 ID 목록 매핑 추가:
  ```typescript
  export interface CollectionEntry {
    id: number;
    title: string;
    desc: string;
    count: number;
    author: string;
    updated: string;
    itemIds: number[]; // 컬렉션에 포함된 FeedItem ID 배열 추가
  }
  ```

### B. DB 스키마 연동 기획 (Supabase)
- **`collections` 테이블**: `id`, `title`, `description`, `user_id`, `created_at` 등.
- **`collections_contents` (M:N 매핑 테이블)**: `collection_id`, `content_id`.
- 페칭 헬퍼 `fetchCollections()`, `fetchCollectionById(id)` 추가.

## 4. 구현 및 검증 계획
1. `data.ts`에 컬렉션-아이템 매핑 데이터 적용.
2. `fetch-data.ts`에 컬렉션 조회 API 구현 (Supabase/Mock fallback 지원).
3. `/collections/page.tsx` 목록 화면 구현.
4. `/collections/[id]/page.tsx` 상세 화면 구현.
5. 빌드 및 동작 상태 확인.
