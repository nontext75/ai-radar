import Link from "next/link";
import { ITEMS, CATEGORIES } from "@/lib/data";

function ChevronUp() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M1.5 6.5L5 3L8.5 6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function SearchPage() {
  return (
    <>
      <div className="page-header">
        <div className="page-wrap">
          <h1 className="page-title" style={{ marginBottom: "1.25rem" }}>검색</h1>
          <div style={{ position: "relative", maxWidth: "600px" }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--subtle)", pointerEvents: "none" }}>
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.6" />
              <path d="M13 13l3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <input className="input" placeholder="프롬프트, 도구, 모델명으로 검색..." style={{ paddingLeft: "3rem" }} autoFocus />
          </div>
        </div>
      </div>

      <div className="page-body">
        <div className="page-wrap page-body-inner">
          <div className="grid-sidebar">

            <div>
              <p style={{ fontSize: "0.875rem", color: "var(--muted)", marginBottom: "1.5rem" }}>
                검색어를 입력하면 결과가 표시됩니다.
              </p>

              <div style={{ marginBottom: "2.5rem" }}>
                <p style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--subtle)", marginBottom: "0.75rem", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                  인기 검색어
                </p>
                <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
                  {["Claude MCP", "프롬프트 엔지니어링", "n8n 자동화", "RAG", "AI 에이전트", "GPT-4o", "Gemini"].map((term) => (
                    <span key={term} className="tag-pill" style={{ cursor: "pointer" }}>{term}</span>
                  ))}
                </div>
              </div>

              <div>
                <p style={{ fontSize: "0.9375rem", fontWeight: 700, marginBottom: "0.875rem", color: "var(--ink)" }}>최근 추가된 리소스</p>
                <div className="card card-elevated" style={{ overflow: "hidden" }}>
                  {ITEMS.slice(0, 5).map((item, idx) => (
                    <div key={item.id} className="feed-row" style={{ borderBottom: idx < 4 ? "1px solid var(--border)" : "none" }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "2px" }}>
                        <button className="upvote-btn" aria-label={`${item.title} 추천`}>
                          <ChevronUp />
                          {item.votes}
                        </button>
                      </div>
                      <div>
                        <div style={{ marginBottom: "0.375rem" }}>
                          <span className="badge badge-primary" style={{ fontSize: "0.625rem" }}>{item.cat}</span>
                        </div>
                        <h3 className="feed-item-title">{item.title}</h3>
                        <p className="feed-item-desc">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside>
              <div className="sidebar-card">
                <div className="sidebar-header">카테고리별 탐색</div>
                <div>
                  {CATEGORIES.slice(0, 8).map((cat, i) => (
                    <Link key={cat.slug} href={`/categories/${cat.slug}`} className="sidebar-row" style={{ borderTop: i > 0 ? "1px solid var(--border-soft)" : "none" }}>
                      <span style={{ fontSize: "0.875rem", color: "var(--muted)", fontWeight: 500 }}>{cat.label}</span>
                      <span className="badge badge-ghost" style={{ fontSize: "0.6875rem" }}>
                        {cat.count >= 1000 ? `${(cat.count / 1000).toFixed(1)}k` : cat.count}
                      </span>
                    </Link>
                  ))}
                  <Link href="/categories" className="sidebar-row" style={{ borderTop: "1px solid var(--border-soft)", color: "var(--primary)", fontWeight: 600 }}>
                    <span>전체 카테고리</span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 2.5L7.5 6l-3 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
