import Link from "next/link";
import { fetchCategories, fetchItems } from "@/lib/fetch-data";
import { notFound } from "next/navigation";
import { BookmarkButton } from "@/components/bookmark-button";

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

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cats = await fetchCategories();
  const cat = cats.find((c) => c.slug === slug);
  if (!cat) notFound();

  const items = await fetchItems("trending", 50, slug);

  return (
    <>
      <div className="page-header">
        <div className="page-wrap">
          <Link href="/categories" style={{ fontSize: "0.875rem", color: "var(--muted)", display: "inline-flex", alignItems: "center", gap: "4px", marginBottom: "0.75rem" }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M7.5 2.5L4.5 6l3 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            카테고리
          </Link>
          <h1 className="page-title">{cat.label}</h1>
          <p className="page-desc">{cat.desc}</p>
        </div>
      </div>

      <div className="page-body">
        <div className="page-wrap page-body-inner">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <p style={{ fontSize: "0.875rem", color: "var(--muted)" }}>{cat.count}개 리소스</p>
          </div>

          <div className="card card-elevated" style={{ overflow: "hidden" }}>
            {items.length > 0 ? items.map((item, idx) => (
              <div key={item.id} className="feed-row anim-fade-up" style={{ borderBottom: idx < items.length - 1 ? "1px solid var(--border)" : "none", animationDelay: `${idx * 0.05}s` }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", paddingTop: "2px" }}>
                  <button className="upvote-btn" aria-label={`${item.title} 추천`}>
                    <ChevronUp />
                    {item.votes}
                  </button>
                  <BookmarkButton contentId={item.id} size={11} />
                </div>
                <div>
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
            )) : (
              <div style={{ padding: "3rem", textAlign: "center", color: "var(--muted)" }}>
                이 카테고리에 등록된 리소스가 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
