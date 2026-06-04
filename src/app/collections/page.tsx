import Link from "next/link";
import { COLLECTIONS } from "@/lib/data";

export default function CollectionsPage() {
  return (
    <>
      <div className="page-header">
        <div className="page-wrap">
          <h1 className="page-title">컬렉션</h1>
          <p className="page-desc">큐레이터들이 엄선한 AI 리소스 모음집</p>
        </div>
      </div>

      <div className="page-body">
        <div className="page-wrap page-body-inner">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1rem" }}>
            {COLLECTIONS.map((col, i) => (
              <Link key={col.id} href={`/collections/${col.id}`} className="card card-elevated anim-fade-up" style={{ padding: "1.5rem", display: "block", animationDelay: `${i * 0.05}s` }}>
                <div style={{
                  height: "72px",
                  borderRadius: "var(--r-sm)",
                  background: "var(--surface-2)",
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}>
                  <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap", padding: "0.75rem" }}>
                    {Array.from({ length: 6 }).map((_, idx) => (
                      <div key={idx} style={{ height: "18px", borderRadius: "999px", background: idx === 0 ? "var(--primary)" : "var(--border)", width: idx === 0 ? "60px" : idx === 1 ? "80px" : idx === 2 ? "50px" : idx === 3 ? "70px" : "55px" }} />
                    ))}
                  </div>
                </div>

                <h2 style={{ fontSize: "1rem", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>{col.title}</h2>
                <p style={{ fontSize: "0.8125rem", color: "var(--muted)", lineHeight: 1.6, marginBottom: "1rem" }}>{col.desc}</p>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div className="feed-item-meta">
                    <span>{col.author}</span>
                    <span>·</span>
                    <span>{col.count}개 리소스</span>
                  </div>
                  <span className="badge badge-ghost">{col.updated}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
