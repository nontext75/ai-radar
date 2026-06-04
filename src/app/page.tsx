// src/app/page.tsx
import Link from "next/link";
import {
  ChatCircleText,
  TreeStructure,
  Desktop,
  Robot,
  PuzzlePiece,
  Lightning,
  MagnifyingGlass,
  Brain,
  GitBranch,
  BookOpen,
  Newspaper,
  Rocket,
  BookBookmark,
} from "@phosphor-icons/react/dist/ssr";
import HeroSection from "@/components/hero-section";
import TrendingFeed from "@/components/trending-feed";
import { ITEMS } from "@/lib/data";
import { fetchItems, fetchCategories } from "@/lib/fetch-data";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  prompts:    <ChatCircleText  size={24} weight="duotone" />,
  workflows:  <TreeStructure   size={24} weight="duotone" />,
  mcp:        <Desktop         size={24} weight="duotone" />,
  agents:     <Robot           size={24} weight="duotone" />,
  plugins:    <PuzzlePiece     size={24} weight="duotone" />,
  automation: <Lightning       size={24} weight="duotone" />,
  research:   <MagnifyingGlass size={24} weight="duotone" />,
  models:     <Brain           size={24} weight="duotone" />,
  opensource: <GitBranch       size={24} weight="duotone" />,
  tutorials:  <BookOpen        size={24} weight="duotone" />,
  news:       <Newspaper       size={24} weight="duotone" />,
  startups:   <Rocket          size={24} weight="duotone" />,
  resources:  <BookBookmark    size={24} weight="duotone" />,
};

export default async function Home() {
  const [items, cats] = await Promise.all([
    fetchItems("trending", 18),
    fetchCategories(),
  ]);

  const featured = items.length > 0 ? items : ITEMS.slice(0, 18);

  return (
    <>
      <HeroSection />

      {/* ── 메인 피드 ── */}
      <section className="section page-body">
        <div className="page-wrap page-body-inner">
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
              <h2 className="section-title" style={{ fontSize: "1.0625rem", margin: 0 }}>오늘의 트렌딩</h2>
              <Link href="/trending" style={{ fontSize: "0.875rem", color: "var(--primary)", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}>
                전체 보기
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 2.5L7.5 6l-3 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>

            <TrendingFeed items={featured} />
          </div>
        </div>
      </section>

      {/* ── 카테고리별 탐색 ── */}
      <section className="section" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="page-wrap">
          <div className="section-header" style={{ textAlign: "center" }}>
            <h2 className="section-title">카테고리별 탐색</h2>
            <p className="section-desc" style={{ marginInline: "auto" }}>
              AI 생태계를 13개 카테고리로 체계적으로 정리했습니다.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: "0.875rem" }}>
            {cats.map((cat, i) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="card card-flat anim-fade-up"
                style={{ padding: "1.25rem", display: "block", animationDelay: `${i * 0.04}s` }}
              >
                <div style={{ marginBottom: "0.75rem", color: "var(--primary)" }}>
                  {CATEGORY_ICONS[cat.slug] ?? <Desktop size={24} weight="duotone" />}
                </div>
                <div className="stat-value" style={{ fontSize: "0.9375rem", marginBottom: "0.25rem" }}>{cat.label}</div>
                <div className="stat-label" style={{ fontSize: "0.75rem" }}>
                  {cat.count >= 1000 ? `${(cat.count / 1000).toFixed(1)}k` : cat.count}개
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 하단 CTA ── */}
      <section className="section" style={{ background: "var(--surface)", borderTop: "1px solid var(--border)", textAlign: "center" }}>
        <div className="page-wrap">
          <div style={{ maxWidth: "480px", marginInline: "auto" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "var(--r-lg)", background: "var(--primary-soft)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem" }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <circle cx="11" cy="11" r="10" stroke="var(--primary)" strokeWidth="1.2" strokeDasharray="3 2.5" />
                <circle cx="11" cy="11" r="3" fill="var(--primary)" />
              </svg>
            </div>
            <h2 style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.625rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "0.75rem" }}>
              AI 커뮤니티에 함께하세요.
            </h2>
            <p style={{ fontSize: "0.9375rem", color: "var(--muted)", marginBottom: "1.875rem" }}>
              발견한 AI 리소스를 공유하고 커뮤니티의 트렌드를 함께 만들어가세요.
            </p>
            <Link href="/submit" className="btn btn-primary btn-lg" style={{ minWidth: "180px" }}>
              리소스 제출하기
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
