// src/app/explore/page.tsx
import Link from "next/link";
import { fetchItems, fetchCategories } from "@/lib/fetch-data";
import { BookmarkButton } from "@/components/bookmark-button";

function ChevronUp() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M1.5 6.5L5 3L8.5 6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const ROLES = [
  { slug: "all", label: "전체 직군" },
  { slug: "developer", label: "개발자" },
  { slug: "pm", label: "기획자" },
  { slug: "designer", label: "디자이너" },
  { slug: "publisher", label: "퍼블리셔" },
];

const ROLE_LABELS: Record<string, string> = {
  developer: "개발자",
  pm: "기획자",
  designer: "디자이너",
  publisher: "퍼블리셔",
};

interface ExplorePageProps {
  searchParams: Promise<{ role?: string }>;
}

export default async function ExplorePage({ searchParams }: ExplorePageProps) {
  const { role } = await searchParams;
  const activeRole = role ?? "all";

  const allItems = await fetchItems("trending", 100);
  const CATEGORIES = await fetchCategories();

  // Filter items by target role
  const filteredItems = activeRole && activeRole !== "all"
    ? allItems.filter(item => item.targetRoles?.includes(activeRole))
    : allItems;

  return (
    <>
      <div className="page-header">
        <div className="page-wrap">
          <h1 className="page-title">전체 탐색</h1>
          <p className="page-desc">6,200개 이상의 AI 리소스를 탐색하세요.</p>
        </div>

        {/* ── 직군별 필터 바 ── */}
        <div className="page-wrap" style={{ display: "flex", gap: "0.5rem", overflowX: "auto", paddingTop: "1rem", paddingBottom: "0.5rem", scrollbarWidth: "none" }}>
          {ROLES.map((r) => {
            const isActive = activeRole === r.slug;
            return (
              <Link
                key={r.slug}
                href={`/explore?role=${r.slug}`}
                className={`badge ${isActive ? "badge-primary" : "badge-soft"}`}
                style={{ fontSize: "0.8125rem", padding: "6px 14px", textDecoration: "none", transition: "all 0.2s" }}
              >
                {r.label}
              </Link>
            );
          })}
        </div>

        <div className="page-wrap" style={{ paddingTop: "0.5rem", paddingBottom: "1rem" }}>
          <div style={{ position: "relative", maxWidth: "520px" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)", color: "var(--subtle)", pointerEvents: "none" }}>
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M11 11l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input className="input" placeholder="리소스 검색..." style={{ paddingLeft: "2.5rem" }} />
          </div>
        </div>

        <div className="page-wrap" style={{ display: "flex", gap: "1.25rem", overflowX: "auto", paddingBottom: "1.25rem", scrollbarWidth: "none" }}>
          {["전체", "프롬프트", "워크플로우", "MCP 서버", "AI 에이전트", "자동화", "모델", "오픈소스", "튜토리얼", "뉴스", "리서치"].map((tag, i) => (
            <span key={tag} className={`tag-pill${i === 0 ? " active" : ""}`}>{tag}</span>
          ))}
        </div>
      </div>

      <div className="page-body">
        <div className="page-wrap page-body-inner">
          <div className="grid-sidebar-alt">

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
                <p style={{ fontSize: "0.875rem", color: "var(--muted)" }}>총 {filteredItems.length}개 리소스</p>
                <select className="select" style={{ width: "auto", height: "36px", fontSize: "0.8125rem", padding: "0 2rem 0 0.75rem" }}>
                  <option>추천순</option>
                  <option>최신순</option>
                  <option>댓글순</option>
                </select>
              </div>

              <div className="card card-elevated" style={{ overflow: "hidden" }}>
                {filteredItems.map((item, idx) => (
                  <div key={`${item.id}-${idx}`} className="feed-row anim-fade-up" style={{ borderBottom: idx < filteredItems.length - 1 ? "1px solid var(--border)" : "none", animationDelay: `${idx * 0.03}s` }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", paddingTop: "2px" }}>
                      <button className="upvote-btn" aria-label={`${item.title} 추천`}>
                        <ChevronUp />
                        {item.votes}
                      </button>
                      <BookmarkButton contentId={item.id} size={11} />
                    </div>
                    <div>
                      <div style={{ marginBottom: "0.375rem" }}>
                        <span className="badge badge-primary" style={{ fontSize: "0.625rem" }}>{item.cat}</span>
                      </div>
                      <h2 className="feed-item-title">
                        <Link href={`/items/${item.id}`} style={{ display: "block" }}>
                          {item.title}
                        </Link>
                      </h2>
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
