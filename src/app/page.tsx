// src/app/page.tsx
import Link from "next/link";
import {
  TreeStructure,
  Robot,
  BookBookmark,
  Terminal,
  Plugs,
  PuzzlePiece,
  FigmaLogo,
  Cpu,
  GraduationCap,
  Brain,
  Code,
  Compass,
} from "@phosphor-icons/react/dist/ssr";
import HeroSection from "@/components/hero-section";
import TrendingFeed from "@/components/trending-feed";
import FigmaFeed from "@/components/figma-feed";
import { fetchItems, fetchCategories } from "@/lib/fetch-data";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  prompts:    <Terminal size={28} />,
  workflows:  <TreeStructure size={28} />,
  mcp:        <Plugs size={28} />,
  agents:     <Robot size={28} />,
  plugins:    <PuzzlePiece size={28} />,
  figma:      <FigmaLogo size={28} />,
  automation: <Cpu size={28} />,
  research:   <GraduationCap size={28} />,
  models:     <Brain size={28} />,
  opensource: <Code size={28} />,
  tutorials:  <Compass size={28} />,
  resources:  <BookBookmark size={28} />,
};

export default async function Home() {
  const [items, figmaItems, cats] = await Promise.all([
    fetchItems("trending", 18),
    fetchItems("trending", 3, "figma"),
    fetchCategories(),
  ]);

  return (
    <>
      <HeroSection />

      {/* ── 메인 피드 ── */}
      <section className="page-body">
        <div className="page-wrap page-body-inner">
          <div>
            <div className="section-row">
              <h2 className="section-row-title">오늘의 트렌딩</h2>
              <Link href="/trending" className="section-row-link">
                전체 보기
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 2.5L7.5 6l-3 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>
            <TrendingFeed items={items} />
          </div>
        </div>
      </section>

      {/* ── 피그마 플러그인 ── */}
      {figmaItems.length > 0 && (
        <section className="section" style={{ borderTop: "1px solid var(--border)", background: "var(--surface-2)" }}>
          <div className="page-wrap">
            <div className="section-row">
              <div>
                <h2 className="section-row-title">피그마 AI 플러그인</h2>
                <p style={{ fontSize: "0.8125rem", color: "var(--muted)", marginTop: "4px" }}>
                  디자이너와 개발자를 위한 생산성 극대화 플러그인 모음
                </p>
              </div>
              <Link href="/categories/figma" className="section-row-link">
                전체 보기
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 2.5L7.5 6l-3 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>
            <FigmaFeed items={figmaItems} />
          </div>
        </section>
      )}

      {/* ── 카테고리별 탐색 ── */}
      <section className="section" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="page-wrap">
          <div className="section-header" style={{ textAlign: "center" }}>
            <h2 className="section-title">카테고리별 탐색</h2>
            <p className="section-desc" style={{ marginInline: "auto" }}>
              AI 생태계를 13개 카테고리로 체계적으로 정리했습니다.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "0.625rem" }}>
            {cats.map((cat, i) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="card card-flat anim-fade-up"
                style={{ padding: "0.75rem 0.875rem", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", height: "100%", animationDelay: `${i * 0.04}s` }}
              >
                <div style={{ marginBottom: "0.375rem", color: "var(--ink)" }}>
                  {CATEGORY_ICONS[cat.slug] || <BookBookmark size={20} />}
                </div>
                <div className="stat-value" style={{ fontSize: "0.8125rem", fontWeight: 600 }}>{cat.label}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 하단 CTA ── */}
      <section style={{ background: "var(--primary)", borderTop: "none" }}>
        <div className="page-wrap" style={{ paddingTop: "4rem", paddingBottom: "4rem", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 800, letterSpacing: "-0.03em", color: "white", marginBottom: "0.75rem" }}>
            AI 커뮤니티에 함께하세요.
          </h2>
          <p style={{ fontSize: "1rem", color: "oklch(1 0 0 / 0.75)", marginBottom: "2rem", maxWidth: "40ch", marginInline: "auto" }}>
            발견한 AI 리소스를 공유하고 커뮤니티의 트렌드를 함께 만들어가세요.
          </p>
          <Link href="/submit" className="btn btn-lg" style={{ background: "white", color: "var(--primary)", fontWeight: 700, minWidth: "180px" }}>
            리소스 제출하기
          </Link>
        </div>
      </section>
    </>
  );
}
