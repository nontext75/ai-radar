# Swipix Design System Analysis

> 레퍼런스: [swipix.webflow.io](https://swipix.webflow.io)  
> 카테고리: Fintech / Card Issuing SaaS  
> 빌더: Webflow (Last published: 2026-02-03)

---

## 1. 디자인 컨셉

**"Clean Grid Meets Editorial Finance" — 라이트 모드**

- **라이트 모드 전용** 디자인 (다크 모드 없음)
- 따뜻한 오프화이트 배경(`#f7f5f3`) + 웜 그레이 본문(`#65585b`)으로 포근하면서 고급스러운 분위기
- 보라색(`#680cbd`)을 CTA/액센트로, 거의 블랙에 가까운 딥 다크(`#260f14`)는 **헤딩 텍스트와 버튼**에만 사용 — 배경이 어두운 게 아니라, 밝은 배경 위 강한 대비 전략
- 얇은 1px 스트로크 그리드를 전체에 적용한 **신문/잡지 레이아웃** 감성
- Glassmorphism 없음 — **Flat + Grid-based Editorial** 스타일
- Lottie 애니메이션(Hero), 스크롤 트리거 Fade-up 진입 효과 사용

---

## 2. 색상 팔레트

### Primary Colors

| 토큰 이름 | 값 | 용도 |
|---|---|---|
| `--primary` | `#680cbd` | 주 CTA, 버튼, 액센트, 링크 |
| `--dark` | `#260f14` | 헤딩, 다크 버튼 배경 |
| `--white` | `#ffffff` | 버튼 텍스트, 카드 배경 |
| `--text-color` | `#65585b` | 본문 텍스트 (웜 그레이) |
| `--stroke` | `#e5e5e5` | 보더, 구분선, 그리드라인 |
| `--neutral-2` | `#3c272c` | 보조 다크 컬러 |

### Background

| 토큰 이름 | 값 | 용도 |
|---|---|---|
| `--bg` | `#f7f5f3` | 전체 페이지 배경 (따뜻한 오프화이트) |

### Accent / Secondary Colors

| 토큰 이름 | 값 | 용도 |
|---|---|---|
| `--main-color-01` | `#326d44` | 초록 (태그, 배지 등) |
| `--main-color-02` | `#641d1a` | 레드-브라운 (경고, 강조) |
| `--main-color-03` | `#f3c476` | 골드-옐로우 (하이라이트) |

---

## 3. 타이포그래피

### 폰트 패밀리

| 역할 | 폰트 | 용도 |
|---|---|---|
| Heading Font | **Inter Tight** | h1~h6 전체 헤딩 |
| Body Font | **Inter** | 본문, UI 텍스트 |

> Google Fonts 로드: `Inter:300,400,500,600,700` + `Inter Tight:300,400,500,600,700`

### 타입 스케일

| 이름 | 크기 | Line-height | Letter-spacing | 용도 |
|---|---|---|---|---|
| `display` | 120px | 1.2em | -0.03em | 초대형 히어로 숫자/통계 |
| `h1` | 80px | 1.1em | -0.03em | 히어로 타이틀 |
| `h2` | 48px | 1.1em | -0.03em | 섹션 타이틀 |
| `h3` | 32px | 1.1em | -0.03em | 서브 섹션 타이틀 |
| `h4` | 24px | 1.1em | -0.03em | 카드 타이틀 |
| `h5` | 20px | 1.1em | -0.03em | 소제목 |
| `h6` | 20px | 1.1em | -0.03em | 태그/라벨 타이틀 |
| `text-large` | 20px | 1.5em | 0 | 강조 본문 |
| `text-medium` | 18px | 1.5em | 0 | 일반 설명 텍스트 |
| `text-default` | 16px | 1.5em | 0 | 기본 본문 |
| `text-small` | 14px | 1.5em | 0 | 부연 설명 |
| `text-xsmall` | 12px | 1.4em | 0 | 캡션, 메타 정보 |

### 폰트 웨이트

| 토큰 | 값 |
|---|---|
| `--light` | 300 |
| `--regular` | 400 |
| `--medium` | 500 |
| `--semi-bold` | 600 |
| `--bold` | 700 |

---

## 4. 스페이싱 시스템

### 섹션 패딩

| 토큰 | 값 | 용도 |
|---|---|---|
| `--padding-small` | 100px | 주요 섹션 상하 패딩 |
| `--padding-default` | 120px | 기본 섹션 상하 패딩 |
| `--padding-large` | 140px | 대형 섹션 상하 패딩 |

### 컴포넌트 스페이싱 (4px 그리드)

| 토큰 | 값 |
|---|---|
| `1x` | 4px |
| `2x` | 8px |
| `3x` | 12px |
| `4x` | 16px |
| `5x` | 20px |
| `6x` | 24px |

---

## 5. 레이아웃 & 그리드

### 컨테이너

- Max-width: **1360px** (hero block 기준)
- 전체 페이지 max-width: **1440px**
- 좌우 패딩: **40px**
- 중앙 정렬 (`margin: auto`)

### 그리드 특징

```
┌──────────────────────────────────────────┐
│  1px stroke border (좌/우 수직 라인)        │
│  ┌────────────────────────────────────┐  │
│  │  content area (1360px max)         │  │
│  └────────────────────────────────────┘  │
└──────────────────────────────────────────┘
```

- **1px 스트로크 보더**가 섹션 좌우에 일관되게 적용되어 신문 컬럼 레이아웃 효과
- 섹션 간 구분선도 1px stroke 사용
- 브랜드 로고 섹션: 6컬럼 CSS Grid (`1fr 1fr 1fr 1fr 1fr 1fr`)

### 반응형 브레이크포인트

| 브레이크포인트 | 설명 |
|---|---|
| `≥ 992px` | Desktop (full nav, side-by-side layouts) |
| `< 992px` | Tablet (hamburger menu, collapsed nav) |
| `< 768px` | Mobile (stack layouts, mobile logo scroll) |

---

## 6. 컴포넌트 인벤토리

### Buttons

#### Primary Button (Dark)
```css
background-color: #260f14;  /* --dark */
color: white;
border-radius: 10px;
padding: 13px 24px;
transition: all 0.7s;
/* hover: slide-up overlay (--primary: #680cbd) */
```

#### Primary Button (Purple CTA)
```css
background-color: #680cbd;  /* --primary */
color: white;
border-radius: 10px;
padding: 13px 24px;
/* hover: slide-up dark overlay */
```

#### Outline Button
```css
border: 1px solid #e5e5e5;
background-color: transparent;
color: #680cbd;
border-radius: 10px;
/* hover: slide-up dark bg, text → white */
```

> **Hover 인터랙션**: `button-hover-bg` 가상 레이어가 `transform: translate(0, 100%)` → `translate(0, 0)` 슬라이드업 효과 (`transition: 0.7s`)

### Cards

#### Feature Card
```css
border: 1px solid #e5e5e5;
border-radius: 12px;
max-width: 340px;
overflow: hidden;
/* 상단: 이미지 영역, 하단: 텍스트 + CTA */
```

#### Stat / Counter Card
- 큰 숫자(display 타입 스케일) + 설명 텍스트
- 배경 이미지 라인 패턴 사용

### Navigation

```
[Logo] [Features ▾] [Resources] [About] [Career] [Pricing] [Pages ▾]  [🛒]  [Get a demo]
```

- 배경: `--bg` (#f7f5f3)
- 드롭다운: `border-radius: 10px`, `box-shadow: 0 16px 30px rgba(0,0,0,0.04)`
- Feature 드롭다운: 최소 너비 460px, 그리드 레이아웃
- Sticky nav: `z-index: 2147483647`
- 모바일: 햄버거 메뉴 (3-line, 애니메이션)

### Text Links

```css
display: inline-flex;
align-items: center;
gap: 4px;
/* 텍스트 + → 아이콘 (SVG arrow) */
color: --primary (#680cbd);
```

### Badges / Tags

```css
/* 컬러별 배지 */
background: #326d44;  /* 초록 */
background: #641d1a;  /* 레드 */
background: #f3c476;  /* 골드 */
color: white;
border-radius: ?(소형 pill shape)
```

### Feature Slider (Carousel)
- Webflow 슬라이더 (`data-animation="slide"`)
- 왼쪽/오른쪽 화살표 네비게이션 (SVG, circle 버튼)
- autoplay: false (수동 슬라이드)

---

## 7. 섹션 구조 (페이지 순서)

```
1. Header / Navbar
   └ 로고 + 풀 내비게이션 + 장바구니 + CTA 버튼

2. Hero Section
   ├ 히어로 텍스트 블록 (좌측, max-width: 644px)
   │  ├ 서브타이틀 배지 ("Intelligence by Design" + 별 아이콘)
   │  ├ H1: "Modern Infrastructure for Card Issuing."
   │  ├ 설명 텍스트
   │  └ CTA 버튼 2개 (Get Started / Book a Demo)
   └ Lottie 애니메이션 (우측 배경, 절대 위치)

3. Brands Section
   ├ "TRUSTED BY 700+ TOP COMPANIES." (대문자 레이블)
   └ 12개 브랜드 로고 그리드 (6컬럼 × 2행)
      └ 좌우 장식 파티클 이미지

4. Features Section
   ├ 섹션 타이틀: "The card is only the beginning."
   └ 피처 슬라이더 (5개 슬라이드)
      - Card Controls
      - E-commerce
      - Expense Management
      - Bill Payments
      - Affiliate Reports

5. Network Section
   ├ 타이틀: "Tap into the world's local payments network"
   ├ 설명 텍스트
   └ 체크리스트 (125+ countries, 등)

6. Stats Section
   └ 배경 라인 패턴 + 큰 숫자 통계

7. AI Assistant Section
   └ 배경 라인 패턴

8. App Download Section
   ├ QR 코드
   └ App Store / Google Play 버튼

9. Pricing Section (미리보기)

10. FAQ Section

11. Footer
    ├ 로고 + 소개
    ├ 링크 컬럼 (Features, Resources, About, Career, Pricing...)
    └ 카피라이트 + 하단 메타 링크
```

---

## 8. 애니메이션 & 인터랙션

| 타입 | 세부 내용 |
|---|---|
| **Scroll 진입** | `opacity: 0` → `1`, `translateY(50px)` → `0` (Webflow IX2) |
| **Hero Lottie** | Lottie JSON 애니메이션 (loop, autoplay, 약 5초 사이클) |
| **Button Hover** | 색상 레이어 슬라이드업 (`transition: 0.7s ease`) |
| **Dropdown** | `ease` 애니메이션, 400ms duration |
| **Slider** | 슬라이드 전환 500ms, `ease` 이징 |
| **Smooth Scroll** | Lenis v1.1.14 라이브러리 사용 |
| **Brands Mobile** | 마퀴 스크롤 (infinite scroll 로고 러너) |

---

## 9. 아이콘 스타일

- **SVG 라인 아이콘** 일관 사용
- 스트로크 두께: `1.3px` ~ `1.5px`
- 색상: `currentColor` (컨텍스트에 따라 상속)
- 스타일: Rounded (`stroke-linecap: round`, `stroke-linejoin: round`)
- 주요 아이콘: 체크마크 서클, 화살표(→), 드롭다운(∨), 장바구니, 별

---

## 10. 이미지 & 미디어

| 타입 | 활용 방식 |
|---|---|
| 섹션 배경 | `.png` 패턴 이미지 (대각선 라인, 닷 패턴) |
| Feature 이미지 | 대형 `.svg` / `.png` UI 목업 이미지 |
| Brand 로고 | `.svg` 그레이스케일/단색 로고 |
| Favicon | `.png` |
| Hero 애니메이션 | Lottie `.json` |
| App 버튼 | App Store / Google Play 배지 이미지 |

---

## 11. 전체 디자인 원칙 요약

1. **그리드 일관성**: 1px stroke 보더가 수직/수평 구분선 역할 — 모든 섹션에 동일 적용
2. **색온도 통일**: 베이지 배경(#f7f5f3) + 웜 그레이 텍스트(#65585b) → 차갑지 않은 프리미엄 감성
3. **Contrast 명확성**: 진한 다크(#260f14) + 퍼플(#680cbd)로 명확한 시각 계층
4. **모션의 절제**: 슬라이드업 hover, 스크롤 페이드 — 과하지 않은 목적 있는 애니메이션
5. **타이포 주도 레이아웃**: 큰 h1(80px), 강한 letter-spacing(-0.03em)으로 텍스트가 레이아웃의 중심
6. **컴포넌트 재사용**: 버튼 variant 시스템(dark/primary/outline), 섹션 블록 패턴 일관 적용

---

## 12. 기술 스택 (프론트엔드)

| 항목 | 내용 |
|---|---|
| 빌더 | Webflow |
| 폰트 로더 | Google WebFont Loader v1.6.26 |
| 스무스 스크롤 | Lenis v1.1.14 |
| 애니메이션 | Webflow IX2 + Lottie |
| 이커머스 | Webflow Commerce (cart modal) |
| 결제 | Apple Pay, Google Pay, Microsoft Pay 지원 |
