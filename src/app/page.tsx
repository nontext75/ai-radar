// src/app/page.tsx
import Link from "next/link";
import {
  TreeStructure, Robot, BookBookmark, Terminal, Plugs,
  PuzzlePiece, FigmaLogo, Cpu, GraduationCap, Brain, Code, Compass,
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

const SectionHeader = ({ title, href, label = "전체 보기" }: { title: string; href: string; label?: string }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
    <h2 style={{ fontSize: "1.0625rem", fontWeight: 800, letterSpacing: "-0.025em", margin: 0, color: "var(--ink)" }}>
      {title}
    </h2>
    <Link href={href} style={{ fontSize: "0.875rem", color: "var(--accent)", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px", flexShrink: 0 }}>
      {label}
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 2.5L7.5 6l-3 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </Link>
  </div>
);

export default async function Home() {
  const [items, figmaItems, cats] = await Promise.all([
    fetchItems("trending", 18),
    fetchItems("trending", 3, "figma"),
    fetchCategories(),
  ]);

  return (
    <>
      <HeroSection />

      {/* ── 트렌딩 피드 ── */}
      <section className="page-body">
        <div className="page-wrap page-body-inner">
          <SectionHeader title="오늘의 트렌딩" href="/trending" />
          <TrendingFeed items={items} />
        </div>
      </section>

      {/* ── 피그마 플러그인 ── */}
      {figmaItems.length > 0 && (
        <section className="section" style={{ borderTop: "1px solid var(--border)", background: "var(--surface-2)" }}>
          <div className="page-wrap">
            <SectionHeader title="피그마 AI 플러그인" href="/categories/figma" />
            <FigmaFeed items={figmaItems} />
          </div>
        </section>
      )}

      {/* ── 카테고리 탐색 ── */}
      <section className="section" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="page-wrap">
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "0.5rem" }}>
              카테고리별 탐색
            </h2>
            <p style={{ fontSize: "0.9375rem", color: "var(--muted)" }}>
              AI 생태계를 13개 카테고리로 체계적으로 정리했습니다.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: "0.625rem" }}>
            {cats.map((cat, i) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="card card-flat anim-fade-up"
                style={{
                  padding: "1rem 0.75rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  gap: "0.5rem",
                  animationDelay: `${i * 0.04}s`,
                }}
              >
                <div style={{ color: "var(--accent)" }}>
                  {CATEGORY_ICONS[cat.slug] || <BookBookmark size={28} />}
                </div>
                <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--ink)" }}>{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "var(--primary)" }}>
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
