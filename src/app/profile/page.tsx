import Link from "next/link";
import { ITEMS } from "@/lib/data";

const TABS = ["제출한 리소스", "저장한 리소스", "컬렉션"];

export default function ProfilePage() {
  const myItems = ITEMS.slice(0, 3);

  return (
    <>
      <div className="page-header" style={{ paddingBottom: 0 }}>
        <div className="page-wrap">
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginBottom: "1.5rem" }}>
            <div style={{
              width: "60px", height: "60px", borderRadius: "50%",
              background: "var(--primary-soft)", display: "flex",
              alignItems: "center", justifyContent: "center",
              fontSize: "1.375rem", fontWeight: 800, color: "var(--primary)", flexShrink: 0,
            }}>
              AI
            </div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: "1.25rem", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: "0.25rem" }}>
                사용자님
              </h1>
              <p style={{ fontSize: "0.875rem", color: "var(--muted)" }}>@username · 2024년 1월 가입</p>
            </div>
            <button className="btn btn-ghost btn-sm">프로필 편집</button>
          </div>

          <div style={{ display: "flex", gap: "2rem", marginBottom: "1.5rem" }}>
            {[
              { value: "12", label: "제출" },
              { value: "48", label: "저장" },
              { value: "3", label: "컬렉션" },
            ].map(({ value, label }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div className="stat-value" style={{ fontSize: "1.25rem" }}>{value}</div>
                <div className="stat-label" style={{ fontSize: "0.75rem" }}>{label}</div>
              </div>
            ))}
          </div>

          <div className="tab-bar">
            {TABS.map((tab, i) => (
              <button key={tab} className={`tab${i === 0 ? " active" : ""}`}>{tab}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="page-body">
        <div className="page-wrap page-body-inner">
          {myItems.length > 0 ? (
            <div className="card card-elevated" style={{ overflow: "hidden" }}>
              {myItems.map((item, idx) => (
                <div key={item.id} style={{
                  padding: "1rem 1.25rem",
                  borderBottom: idx < myItems.length - 1 ? "1px solid var(--border)" : "none",
                  display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem",
                }}>
                  <div>
                    <div style={{ marginBottom: "0.375rem" }}>
                      <span className="badge badge-primary" style={{ fontSize: "0.625rem" }}>{item.cat}</span>
                    </div>
                    <h3 className="feed-item-title">{item.title}</h3>
                    <p className="feed-item-desc">{item.desc}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
                    <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--muted)" }}>{item.votes}</span>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 6.5L5 3L8.5 6.5" stroke="var(--muted)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "4rem 0" }}>
              <p style={{ color: "var(--muted)", marginBottom: "1.25rem" }}>아직 제출한 리소스가 없습니다.</p>
              <Link href="/submit" className="btn btn-primary">첫 리소스 제출하기</Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
