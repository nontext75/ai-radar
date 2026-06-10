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
  prompts:    <Terminal size={20} />,
  workflows:  <TreeStructure size={20} />,
  mcp:        <Plugs size={20} />,
  agents:     <Robot size={20} />,
  plugins:    <PuzzlePiece size={20} />,
  figma:      <FigmaLogo size={20} />,
  automation: <Cpu size={20} />,
  research:   <GraduationCap size={20} />,
  models:     <Brain size={20} />,
  opensource: <Code size={20} />,
  tutorials:  <Compass size={20} />,
  resources:  <BookBookmark size={20} />,
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
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              marginBottom: "1.5rem", paddingBottom: "1rem",
              borderBottom: "3px solid var(--ink)",
            }}>
              <h2 style={{
                fontSize: "1.0625rem", fontWeight: 900, letterSpacing: "-0.02em",
                margin: 0, display: "flex", alignItems: "center", gap: "0.5rem",
              }}>
                <span style={{
                  display: "inline-block", width: "10px", height: "10px",
                  background: "var(--accent)", borderRadius: "50%",
                }} />
                오늘의 트렌딩
              </h2>
              <Link href="/trending" style={{
                fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 600,
                display: "flex", alignItems: "center", gap: "4px",
                transition: "color 150ms",
              }}>
                전체 보기 →
              </Link>
            </div>

            <TrendingFeed items={items} />
          </div>
        </div>
      </section>

      {/* ── 피그마 플러그인 ── */}
      {figmaItems.length > 0 && (
        <section className="section" style={{ borderTop: "3px solid var(--ink)", background: "var(--surface)" }}>
          <div className="page-wrap">
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              marginBottom: "1.5rem", paddingBottom: "1rem",
              borderBottom: "3px solid var(--ink)",
            }}>
              <h2 style={{
                fontSize: "1.0625rem", fontWeight: 900, letterSpacing: "-0.02em",
                margin: 0, display: "flex", alignItems: "center", gap: "0.5rem",
              }}>
                <span style={{
                  display: "inline-block", width: "10px", height: "10px",
                  background: "var(--accent)", borderRadius: "50%",
                }} />
                피그마 AI 플러그인
              </h2>
              <Link href="/categories/figma" style={{
                fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 600,
              }}>
                전체 보기 →
              </Link>
            </div>

            <FigmaFeed items={figmaItems} />
          </div>
        </section>
      )}

      {/* ── 카테고리별 탐색 ── */}
      <section className="section" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="page-wrap">
          <div style={{
            display: "flex", alignItems: "baseline", justifyContent: "space-between",
            marginBottom: "1.5rem", paddingBottom: "1rem",
            borderBottom: "3px solid var(--ink)",
          }}>
            <h2 style={{
              fontSize: "1.0625rem", fontWeight: 900, letterSpacing: "-0.02em",
              margin: 0, display: "flex", alignItems: "center", gap: "0.5rem",
            }}>
              <span style={{
                display: "inline-block", width: "10px", height: "10px",
                background: "var(--accent)", borderRadius: "50%",
              }} />
              카테고리
            </h2>
            <Link href="/explore" style={{ fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 600 }}>
              전체 탐색 →
            </Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "0.625rem" }}>
            {cats.map((cat, i) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="card card-flat anim-fade-up"
                style={{
                  padding: "0.75rem 0.875rem",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  animationDelay: `${i * 0.04}s`
                }}
              >
                <div style={{ marginBottom: "0.375rem", color: "var(--ink)" }}>
                  {CATEGORY_ICONS[cat.slug] || <BookBookmark size={20} />}
                </div>
                <div className="stat-value" style={{ fontSize: "0.8125rem", marginBottom: "0.125rem", fontWeight: 600 }}>{cat.label}</div>
                <div className="stat-label" style={{ fontSize: "0.6875rem", marginTop: "auto" }}>
                  {cat.count >= 1000 ? `${(cat.count / 1000).toFixed(1)}k` : cat.count}개
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 하단 CTA ── */}
      <section style={{ background: "var(--ink)", borderTop: "3px solid var(--ink)" }}>
        <div className="page-wrap" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            gap: "2rem", flexWrap: "wrap",
          }}>
            <div>
              <h2 style={{
                fontSize: "clamp(1.75rem, 4vw, 3rem)", fontWeight: 900,
                letterSpacing: "-0.04em", color: "white", marginBottom: "0.75rem",
              }}>
                발견한 리소스를<br />
                <span style={{ color: "var(--accent)" }}>커뮤니티와 공유하세요.</span>
              </h2>
              <p style={{ fontSize: "0.9375rem", color: "oklch(0.7 0 0)", maxWidth: "42ch" }}>
                프롬프트, 워크플로우, 도구를 제출하면 커뮤니티의 투표로 트렌딩에 올라갑니다.
              </p>
            </div>
            <Link href="/submit" style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              padding: "0 2rem", height: "52px", background: "var(--accent)",
              color: "white", fontWeight: 800, fontSize: "0.9375rem",
              letterSpacing: "-0.02em", flexShrink: 0,
              transition: "background 150ms",
            }}>
              리소스 제출하기 →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
