import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", background: "var(--bg)" }}>
      <div className="page-wrap" style={{ padding: "3rem clamp(1.25rem, 5vw, 3.5rem)" }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "4rem", alignItems: "start" }}>

          {/* 브랜드 */}
          <div>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "0.875rem" }}>
              <div style={{ width: "24px", height: "24px", background: "var(--primary)", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="6" r="2" fill="white" />
                  <circle cx="6" cy="6" r="4.5" stroke="white" strokeWidth="1" strokeDasharray="2 1.5" />
                </svg>
              </div>
              <span style={{ fontSize: "0.9375rem", fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.02em" }}>AI 레이더</span>
            </Link>
            <p style={{ fontSize: "0.8125rem", color: "var(--muted)", lineHeight: 1.65, maxWidth: "22ch", margin: 0 }}>
              AI 생태계의 신호를 스캔하다.
            </p>
          </div>

          {/* 링크 그룹 */}
          <div className="footer-links" style={{ display: "grid", gridTemplateColumns: "repeat(3, auto)", gap: "3rem", justifyContent: "start" }}>
            {[
              { title: "탐색", links: [{ href: "/trending", label: "트렌딩" }, { href: "/explore", label: "전체 탐색" }, { href: "/categories", label: "카테고리" }, { href: "/collections", label: "컬렉션" }] },
              { title: "커뮤니티", links: [{ href: "/submit", label: "리소스 제출" }, { href: "/profile", label: "내 프로필" }] },
              { title: "서비스", links: [{ href: "/about", label: "소개" }, { href: "/terms", label: "이용약관" }, { href: "/privacy", label: "개인정보처리방침" }] },
            ].map((group) => (
              <div key={group.title}>
                <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--subtle)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.875rem" }}>
                  {group.title}
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {group.links.map(({ href, label }) => (
                    <li key={href}><Link href={href} className="footer-link">{label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop: "1px solid var(--border)", marginTop: "2.5rem", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
          <p style={{ fontSize: "0.75rem", color: "var(--subtle)", margin: 0 }}>© {new Date().getFullYear()} AI 레이더. All rights reserved.</p>
          <p style={{ fontSize: "0.75rem", color: "var(--subtle)", margin: 0 }}>AI 커뮤니티를 위해 만들었습니다.</p>
        </div>
      </div>
    </footer>
  );
}
