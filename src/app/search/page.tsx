// src/app/search/page.tsx
import Link from "next/link";
import { fetchItems, fetchCategories, searchItems } from "@/lib/fetch-data";
import { SearchBar } from "@/components/search-bar";
import { Suspense } from "react";
import { type FeedItem } from "@/lib/data";

function stripMarkdown(md: string): string {
  if (!md) return "";
  return md
    .replace(/\n+/g, " ")
    .replace(/#+\s*/g, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/-\s*/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

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

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const decodedQ = q ? decodeURIComponent(q) : "";
  
  const latestItems = await fetchItems("latest", 5);
  const CATEGORIES = await fetchCategories();

  let searchResults: FeedItem[] = [];
  if (decodedQ) {
    searchResults = await searchItems(decodedQ);
  }

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
            <Suspense fallback={<input className="input" placeholder="로딩 중..." style={{ paddingLeft: "3rem" }} />}>
              <SearchBar placeholder="프롬프트, 도구, 모델명으로 검색..." style={{ paddingLeft: "3rem" }} />
            </Suspense>
          </div>
        </div>
      </div>

      <div className="page-body">
        <div className="page-wrap page-body-inner">
          <div className="grid-sidebar">

            <div>
              {decodedQ ? (
                <p style={{ fontSize: "0.875rem", color: "var(--muted)", marginBottom: "1.5rem" }}>
                  &ldquo;{decodedQ}&rdquo; 검색 결과 총 {searchResults.length}개 리소스가 검색되었습니다.
                </p>
              ) : (
                <p style={{ fontSize: "0.875rem", color: "var(--muted)", marginBottom: "1.5rem" }}>
                  검색어를 입력하면 결과가 표시됩니다.
                </p>
              )}

              {!decodedQ && (
                <div style={{ marginBottom: "2.5rem" }}>
                  <p style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--subtle)", marginBottom: "0.75rem", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                    인기 검색어
                  </p>
                  <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
                    {["Claude MCP", "프롬프트 엔지니어링", "n8n 자동화", "RAG", "AI 에이전트", "GPT-4o", "Gemini"].map((term) => (
                      <Link
                        key={term}
                        href={`/search?q=${encodeURIComponent(term)}`}
                        className="tag-pill"
                        style={{ cursor: "pointer", textDecoration: "none" }}
                      >
                        {term}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {decodedQ ? (
                <div>
                  <p style={{ fontSize: "0.9375rem", fontWeight: 700, marginBottom: "0.875rem", color: "var(--ink)" }}>검색 결과 리소스</p>
                  {searchResults.length > 0 ? (
                    <div className="card card-elevated" style={{ overflow: "hidden" }}>
                      {searchResults.map((item, idx) => (
                        <div key={item.id} className="feed-row" style={{ borderBottom: idx < searchResults.length - 1 ? "1px solid var(--border)" : "none" }}>
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
                            <h3 className="feed-item-title">
                              <Link href={`/items/${item.id}`} style={{ display: "block" }}>
                                {item.title}
                              </Link>
                            </h3>
                            <p className="feed-item-desc">{stripMarkdown(item.desc)}</p>
                            <div className="feed-item-meta" style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.375rem" }}>
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
                  ) : (
                    <div style={{ textAlign: "center", padding: "3rem 1rem", color: "var(--muted)" }}>
                      검색 결과가 없습니다. 다른 검색어를 입력해 보세요.
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <p style={{ fontSize: "0.9375rem", fontWeight: 700, marginBottom: "0.875rem", color: "var(--ink)" }}>최근 추가된 리소스</p>
                  <div className="card card-elevated" style={{ overflow: "hidden" }}>
                    {latestItems.map((item, idx) => (
                      <div key={item.id} className="feed-row" style={{ borderBottom: idx < latestItems.length - 1 ? "1px solid var(--border)" : "none" }}>
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
                          <h3 className="feed-item-title">
                            <Link href={`/items/${item.id}`} style={{ display: "block" }}>
                              {item.title}
                            </Link>
                          </h3>
                          <p className="feed-item-desc">{stripMarkdown(item.desc)}</p>
                          <div className="feed-item-meta" style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.375rem" }}>
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
                </div>
              )}
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
