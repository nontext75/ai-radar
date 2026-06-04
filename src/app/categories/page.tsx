import Link from "next/link";
import { CATEGORIES } from "@/lib/data";

export default function CategoriesPage() {
  return (
    <>
      <div className="page-header">
        <div className="page-wrap">
          <h1 className="page-title">카테고리</h1>
          <p className="page-desc">AI 생태계를 13개 카테고리로 체계적으로 정리했습니다.</p>
        </div>
      </div>

      <div className="page-body">
        <div className="page-wrap page-body-inner">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
            {CATEGORIES.map((cat, i) => (
              <Link key={cat.slug} href={`/categories/${cat.slug}`} className="card card-elevated anim-fade-up" style={{ padding: "1.5rem", display: "block", animationDelay: `${i * 0.04}s` }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                  <h2 style={{ fontSize: "1.0625rem", fontWeight: 700, letterSpacing: "-0.02em" }}>{cat.label}</h2>
                  <span className="badge badge-neutral">{cat.count >= 1000 ? `${(cat.count / 1000).toFixed(1)}k` : cat.count}</span>
                </div>
                <p style={{ fontSize: "0.875rem", color: "var(--muted)", lineHeight: 1.6 }}>{cat.desc}</p>
                <div style={{ marginTop: "1rem", fontSize: "0.8125rem", color: "var(--primary)", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}>
                  탐색하기
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 2.5L7.5 6l-3 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
