import Link from "next/link";

const LINKS = [
  {
    title: "탐색",
    items: [
      { href: "/trending", label: "트렌딩" },
      { href: "/explore", label: "전체 탐색" },
      { href: "/categories", label: "카테고리" },
      { href: "/collections", label: "컬렉션" },
    ],
  },
  {
    title: "커뮤니티",
    items: [
      { href: "/submit", label: "리소스 제출" },
      { href: "/profile", label: "내 프로필" },
    ],
  },
  {
    title: "서비스",
    items: [
      { href: "/about", label: "소개" },
      { href: "/terms", label: "이용약관" },
      { href: "/privacy", label: "개인정보처리방침" },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--surface-2)", borderTop: "1px solid var(--border)" }}>
      <div
        className="page-wrap"
        style={{ paddingBlock: "3.5rem" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "clamp(180px, 22%, 220px) 1fr",
            gap: "clamp(2.5rem, 6vw, 5rem)",
            alignItems: "start",
          }}
        >
          {/* 브랜드 */}
          <div>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "1rem",
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  background: "var(--primary)",
                  borderRadius: "7px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <circle cx="6" cy="6" r="2" fill="white" />
                  <circle cx="6" cy="6" r="4.5" stroke="white" strokeWidth="1" strokeDasharray="2 1.5" />
                </svg>
              </div>
              <span
                style={{
                  fontSize: "0.9375rem",
                  fontWeight: 800,
                  color: "var(--ink)",
                  letterSpacing: "-0.02em",
                }}
              >
                AI 레이더
              </span>
            </Link>
            <p
              style={{
                fontSize: "0.875rem",
                color: "var(--muted)",
                lineHeight: 1.65,
                margin: 0,
                maxWidth: "22ch",
              }}
            >
              AI 생태계의 신호를 스캔하다.
            </p>
          </div>

          {/* 링크 그룹 */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1rem",
            }}
          >
            {LINKS.map((group) => (
              <div key={group.title}>
                <p
                  style={{
                    fontSize: "0.8125rem",
                    fontWeight: 700,
                    color: "var(--ink)",
                    marginBottom: "1rem",
                    margin: "0 0 1rem",
                  }}
                >
                  {group.title}
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                  {group.items.map(({ href, label }) => (
                    <li key={href}>
                      <Link href={href} className="footer-link">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 하단 바 */}
        <div
          style={{
            borderTop: "1px solid var(--border)",
            marginTop: "3rem",
            paddingTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <p style={{ fontSize: "0.75rem", color: "var(--subtle)", margin: 0 }}>
            © {new Date().getFullYear()} AI 레이더. All rights reserved.
          </p>
          <p style={{ fontSize: "0.75rem", color: "var(--subtle)", margin: 0 }}>
            AI 커뮤니티를 위해 만들었습니다.
          </p>
        </div>
      </div>
    </footer>
  );
}
