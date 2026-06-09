// src/app/collections/page.tsx
import Link from "next/link";
import { BookBookmark, User, Clock, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { fetchCollections } from "@/lib/fetch-data";

export default async function CollectionsPage() {
  const collections = await fetchCollections();

  return (
    <>
      <div className="page-header">
        <div className="page-wrap">
          <h1 className="page-title">큐레이션 컬렉션</h1>
          <p className="page-desc">
            특정 주제나 워크플로우에 맞춰 엄선된 AI 리소스 묶음을 탐색해보세요.
          </p>
        </div>
      </div>

      <div className="page-body">
        <div className="page-wrap page-body-inner">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
            {collections.map((col, idx) => (
              <Link
                key={col.id}
                href={`/collections/${col.id}`}
                className="card card-elevated anim-fade-up"
                style={{
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  textDecoration: "none",
                  animationDelay: `${idx * 0.05}s`
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "var(--r-md)",
                    background: "var(--primary-soft)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--primary)"
                  }}>
                    <BookBookmark size={20} weight="duotone" />
                  </div>
                  <span className="badge badge-soft" style={{ fontSize: "0.75rem" }}>
                    리소스 {col.count}개
                  </span>
                </div>

                <div style={{ flex: 1 }}>
                  <h2 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "0.5rem", color: "var(--ink)" }}>
                    {col.title}
                  </h2>
                  <p style={{ fontSize: "0.875rem", color: "var(--muted)", lineHeight: 1.6 }}>
                    {col.desc}
                  </p>
                </div>

                <div className="divider" style={{ margin: 0 }} />

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--subtle)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                      <User size={12} />
                      {col.author}
                    </span>
                    <span>·</span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                      <Clock size={12} />
                      {col.updated}
                    </span>
                  </div>
                  <span style={{ display: "inline-flex", alignItems: "center", color: "var(--primary)", fontWeight: 600 }}>
                    <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
