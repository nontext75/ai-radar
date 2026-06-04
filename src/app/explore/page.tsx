import Link from "next/link";
import { ITEMS, CATEGORIES, TAGS } from "@/lib/data";

function ChevronUp() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M1.5 6.5L5 3L8.5 6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ExplorePage() {
  return (
    <>
      <div className="page-header">
        <div className="page-wrap">
          <h1 className="page-title">전체 탐색</h1>
          <p className="page-desc">6,200개 이상의 AI 리소스를 탐색하세요.</p>
        </div>

        <div className="page-wrap" style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
          <div style={{ position: "relative", maxWidth: "520px" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)", color: "var(--subtle)", pointerEvents: "none" }}>
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M11 11l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input className="input" placeholder="리소스 검색..." style={{ paddingLeft: "2.5rem" }} />
          </div>
        </div>

        <div className="page-wrap" style={{ display: "flex", gap: "1.25rem", overflowX: "auto", paddingBottom: "1.25rem", scrollbarWidth: "none" }}>
          {TAGS.map((tag, i) => (
            <span key={tag} className={`tag-pill${i === 0 ? " active" : ""}`}>{tag}</span>
          ))}
        </div>
      </div>

      <div className="page-body">
        <div className="page-wrap page-body-inner">
          <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "2rem", alignItems: "start" }}>

            <aside>
              <div className="sidebar-card">
                <div className="sidebar-header">카테고리</div>
                <div>
                  {CATEGORIES.map((cat, i) => (
                    <Link key={cat.slug} href={`/categories/${cat.slug}`} className="sidebar-row" style={{ borderTop: i > 0 ? "1px solid var(--border-soft)" : "none" }}>
                      <span style={{ fontSize: "0.8125rem", color: i === 0 ? "var(--primary)" : "var(--muted)", fontWeight: i === 0 ? 600 : 400 }}>{cat.label}</span>
                      <span className="badge badge-ghost" style={{ fontSize: "0.6875rem" }}>
                        {cat.count >= 1000 ? `${(cat.count / 1000).toFixed(1)}k` : cat.count}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>

            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                <p style={{ fontSize: "0.875rem", color: "var(--muted)" }}>총 6,200개 리소스</p>
                <select className="select" style={{ width: "auto", height: "36px", fontSize: "0.8125rem", padding: "0 2rem 0 0.75rem" }}>
                  <option>추천순</option>
                  <option>최신순</option>
                  <option>댓글순</option>
                </select>
              </div>

              <div className="card card-elevated" style={{ overflow: "hidden" }}>
                {[...ITEMS, ...ITEMS.slice(0, 4)].map((item, idx) => (
                  <div key={`${item.id}-${idx}`} className="feed-row anim-fade-up" style={{ borderBottom: idx < ITEMS.length + 3 ? "1px solid var(--border)" : "none", animationDelay: `${idx * 0.03}s` }}>
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
                      <h2 className="feed-item-title">{item.title}</h2>
                      <p className="feed-item-desc">{item.desc}</p>
                      <div className="feed-item-meta">
                        <span>{item.author}</span>
                        <span>·</span>
                        <span>{item.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: "1rem" }}>
                <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "center" }}>더 불러오기</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
