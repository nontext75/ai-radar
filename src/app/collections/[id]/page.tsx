// src/app/collections/[id]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookBookmark, User, Clock } from "@phosphor-icons/react/dist/ssr";
import { fetchCollectionById, fetchItemById } from "@/lib/fetch-data";
import { CollectionActions } from "@/components/collection-actions";

interface PageProps {
  params: Promise<{ id: string }>;
}

const ROLE_LABELS: Record<string, string> = {
  developer: "개발자",
  pm: "기획자",
  designer: "디자이너",
  publisher: "퍼블리셔",
};

export default async function CollectionDetailPage({ params }: PageProps) {
  const { id } = await params;
  const collection = await fetchCollectionById(id);

  if (!collection) {
    notFound();
  }

  // 컬렉션 소속 아이템 정보 병렬 fetch
  const items = (await Promise.all(
    (collection.itemIds ?? []).map((itemId) => fetchItemById(itemId))
  )).filter((item): item is NonNullable<typeof item> => item !== null);

  return (
    <>
      <div className="page-header" style={{ background: "var(--surface)" }}>
        <div className="page-wrap">
          <Link
            href="/collections"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "0.875rem",
              color: "var(--muted)",
              marginBottom: "1.5rem"
            }}
          >
            <ArrowLeft size={16} />
            컬렉션 목록으로 돌아가기
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1rem" }}>
            <span className="badge badge-soft">
              <BookBookmark size={12} weight="duotone" />
              큐레이션 세트
            </span>
            <span className="badge badge-neutral">
              리소스 {collection.count}개
            </span>
          </div>
          <h1 className="page-title" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", lineHeight: 1.25, fontWeight: 800 }}>
            {collection.title}
          </h1>
          <p className="page-desc" style={{ marginTop: "0.75rem", fontSize: "1.0625rem", color: "var(--ink)", maxWidth: "800px", lineHeight: 1.7 }}>
            {collection.desc}
          </p>
          <div className="feed-item-meta" style={{ marginTop: "1.5rem", fontSize: "0.875rem" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
              <User size={14} />
              큐레이터: {collection.author}
            </span>
            <span>·</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
              <Clock size={14} />
              업데이트: {collection.updated}
            </span>
          </div>
        </div>
      </div>

      <div className="page-body">
        <div className="page-wrap page-body-inner">
          <div className="grid-sidebar">
            <main>
              <h2 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "1.25rem", color: "var(--ink)" }}>큐레이션 리소스 목록</h2>
              <div className="card card-elevated" style={{ overflow: "hidden" }}>
                {items.length > 0 ? (
                  items.map((item, idx) => (
                    <div
                      key={item.id}
                      className="feed-row anim-fade-up"
                      style={{
                        borderBottom: idx < items.length - 1 ? "1px solid var(--border)" : "none",
                        animationDelay: `${idx * 0.04}s`,
                        gridTemplateColumns: "1fr" // 사이드 버튼 공간 생략 혹은 간소화
                      }}
                    >
                      <div style={{ paddingInline: "0.5rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "0.375rem" }}>
                          <span className="badge badge-primary" style={{ fontSize: "0.625rem" }}>{item.cat}</span>
                          {item.hot && <span className="badge badge-soft" style={{ fontSize: "0.625rem" }}>인기</span>}
                        </div>
                        <h3 className="feed-item-title" style={{ fontSize: "1rem" }}>
                          <Link href={`/items/${item.id}`} style={{ display: "block" }}>
                            {item.title}
                          </Link>
                        </h3>
                        <p className="feed-item-desc" style={{ fontSize: "0.875rem" }}>{item.desc}</p>
                        
                        <div className="feed-item-meta" style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.5rem" }}>
                          <span>{item.author}</span>
                          <span>·</span>
                          <span>{item.time}</span>
                          <span>·</span>
                          <span>추천 {item.votes}</span>
                          {item.targetRoles && item.targetRoles.length > 0 && (
                            <>
                              <span>·</span>
                              <span style={{ display: "inline-flex", gap: "4px" }}>
                                {item.targetRoles.map((r) => (
                                  <span key={r} className="badge badge-neutral" style={{ fontSize: "0.625rem", padding: "2px 6px" }}>
                                    {ROLE_LABELS[r] ?? r}
                                  </span>
                                ))}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ padding: "3rem", textAlign: "center", color: "var(--muted)" }}>
                    컬렉션에 포함된 리소스가 없습니다.
                  </div>
                )}
              </div>
            </main>

            <aside style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <CollectionActions />
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
