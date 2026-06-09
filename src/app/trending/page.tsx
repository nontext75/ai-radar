import Link from "next/link";
import { fetchItems } from "@/lib/fetch-data";

const ROLE_LABELS: Record<string, string> = {
  developer: "개발자",
  pm: "기획자",
  designer: "디자이너",
  publisher: "퍼블리셔",
};

function ChevronUp() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M1.5 6.5L5 3L8.5 6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const TAGS = [
  "전체", "프롬프트", "워크플로우", "MCP 서버", "AI 에이전트",
  "자동화", "모델", "오픈소스", "튜토리얼", "리서치",
];

const PERIODS = ["오늘", "이번 주", "이번 달", "전체"];

export default async function TrendingPage() {
  const items = await fetchItems("trending", 50);
  return (
    <>
      <div className="page-header">
        <div className="page-wrap">
          <h1 className="page-title">트렌딩</h1>
          <p className="page-desc">커뮤니티가 지금 가장 주목하는 AI 리소스</p>
        </div>
        <div className="page-wrap tab-bar">
          {PERIODS.map((p, i) => (
            <button key={p} className={`tab${i === 0 ? " active" : ""}`}>{p}</button>
          ))}
        </div>
      </div>

      <div className="page-body">
        <div className="page-wrap page-body-inner">
          <div className="grid-sidebar">

            <div>
              <div style={{ display: "flex", gap: "1.25rem", overflowX: "auto", paddingBottom: "1.25rem", scrollbarWidth: "none" }}>
                {TAGS.map((tag, i) => (
                  <span key={tag} className={`tag-pill${i === 0 ? " active" : ""}`}>{tag}</span>
                ))}
              </div>

              <div className="card card-elevated" style={{ overflow: "hidden" }}>
                {items.map((item, idx) => (
                  <Link key={item.id} href={`/items/${item.id}`} className="feed-row anim-fade-up" style={{ display: "flex", gap: "1rem", padding: "1.25rem", textDecoration: "none", color: "inherit", borderBottom: idx < items.length - 1 ? "1px solid var(--border)" : "none", animationDelay: `${idx * 0.04}s` }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "2px" }} onClick={e => e.stopPropagation()}>
                      <button className="upvote-btn" aria-label={`${item.title} 추천`} onClick={e => { e.preventDefault(); e.stopPropagation(); }}>
                        <ChevronUp />
                        {item.votes}
                      </button>
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "0.375rem", flexWrap: "wrap" }}>
                        <span className={`badge badge-${item.catSlug}`} style={{ fontSize: "0.625rem" }} onClick={e => e.stopPropagation()}><Link href={`/categories/${item.catSlug}`} style={{ color: "inherit", textDecoration: "none" }}>{item.cat}</Link></span>
                        {item.hot && <span className="badge badge-soft" style={{ fontSize: "0.625rem" }}>인기</span>}
                      </div>
                      <h2 className="feed-item-title">{item.title}</h2>
                      <p className="feed-item-desc">{item.desc}</p>
                      <div className="feed-item-meta" style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
                        <span>{item.author}</span>
                        <span>·</span>
                        <span>{item.time}</span>
                        {item.targetRoles && item.targetRoles.length > 0 && (
                          <>
                            <span>·</span>
                            <span style={{ display: "inline-flex", gap: "4px" }}>
                              {item.targetRoles.map((r) => (
                                <span key={r} className="badge badge-soft" style={{ fontSize: "0.625rem", padding: "2px 6px" }}>
                                  {ROLE_LABELS[r] ?? r}
                                </span>
                              ))}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div style={{ marginTop: "1rem", textAlign: "center" }}>
                <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "center" }}>더 불러오기</button>
              </div>
            </div>

            <aside style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div className="sidebar-card">
                <div className="sidebar-header">정렬 기준</div>
                {["추천순", "최신순", "댓글순"].map((s, i) => (
                  <button key={s} className="sidebar-row" style={{ display: "flex", width: "100%", background: i === 0 ? "var(--primary-soft)" : "transparent", border: "none", fontFamily: "inherit", cursor: "pointer", fontSize: "0.875rem" }}>
                    <span style={{ color: i === 0 ? "var(--primary)" : "var(--muted)", fontWeight: i === 0 ? 600 : 500 }}>{s}</span>
                    {i === 0 && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="var(--primary)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </button>
                ))}
              </div>

              <div className="card card-cta" style={{ padding: "1.25rem" }}>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.5rem", color: "#fff" }}>리소스 제출하기</h3>
                <p style={{ fontSize: "0.8125rem", lineHeight: 1.6, marginBottom: "1rem", color: "oklch(0.90 0 0)" }}>
                  유용한 AI 리소스를 발견했나요?
                </p>
                <Link href="/submit" className="btn" style={{ background: "#fff", color: "var(--primary)", justifyContent: "center", width: "100%", height: "40px", fontSize: "0.875rem" }}>
                  제출하기
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
