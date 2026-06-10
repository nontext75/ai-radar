import Link from "next/link";

export default async function HeroSection() {
  return (
    <section
      style={{
        borderBottom: "3px solid var(--ink)",
        background: "var(--bg)",
      }}
    >
      {/* 상단 에디토리얼 바 */}
      <div style={{
        borderBottom: "1px solid var(--border)",
        padding: "0.5rem 0",
      }}>
        <div className="page-wrap" style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: "1rem",
        }}>
          <span style={{
            fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.12em",
            textTransform: "uppercase", color: "var(--muted)",
          }}>
            AI 생태계 디스커버리
          </span>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {[
              { label: "프롬프트", href: "/categories/prompts" },
              { label: "워크플로우", href: "/categories/workflows" },
              { label: "MCP 서버", href: "/categories/mcp" },
              { label: "에이전트", href: "/categories/agents" },
            ].map(({ label, href }) => (
              <Link key={href} href={href} className="hero-nav-link" style={{
                fontSize: "0.75rem", fontWeight: 600, color: "var(--muted)",
              }}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 메인 히어로 */}
      <div className="page-wrap" style={{
        paddingTop: "clamp(3rem, 7vw, 5.5rem)",
        paddingBottom: "clamp(2.5rem, 5vw, 4rem)",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "3rem",
          alignItems: "end",
        }}>
          {/* 왼쪽: 헤드라인 */}
          <div>
            <h1 style={{
              fontSize: "clamp(3rem, 8vw, 5.5rem)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 0.96,
              color: "var(--ink)",
              marginBottom: "1.75rem",
            }}>
              AI 생태계를<br />
              <span style={{ color: "var(--accent)" }}>먼저</span> 발견하는<br />
              사람들의 레이더.
            </h1>

            <p style={{
              fontSize: "clamp(0.9375rem, 1.5vw, 1.0625rem)",
              color: "var(--muted)",
              lineHeight: 1.65,
              maxWidth: "52ch",
              marginBottom: "2rem",
            }}>
              커뮤니티가 검증한 프롬프트, 워크플로우, MCP 서버, AI 에이전트를 매일 큐레이션합니다. 놓쳤던 것이 없도록.
            </p>

            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <Link href="/trending" className="btn btn-primary btn-lg">
                트렌딩 보기
              </Link>
              <Link href="/submit" className="btn btn-ghost btn-lg">
                리소스 제출하기
              </Link>
            </div>
          </div>

          {/* 오른쪽: 에디토리얼 스탯 박스 */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "0",
            border: "1.5px solid var(--ink)",
            minWidth: "160px",
            flexShrink: 0,
          }}
            className="hero-stats"
          >
            {[
              { value: "1,200+", label: "큐레이션된 리소스" },
              { value: "13", label: "카테고리" },
              { value: "매일", label: "업데이트" },
            ].map(({ value, label }, i) => (
              <div key={label} style={{
                padding: "1rem 1.25rem",
                borderBottom: i < 2 ? "1.5px solid var(--ink)" : "none",
              }}>
                <div style={{
                  fontSize: "1.75rem", fontWeight: 900, letterSpacing: "-0.04em",
                  lineHeight: 1, color: "var(--ink)", marginBottom: "0.25rem",
                }}>
                  {value}
                </div>
                <div style={{
                  fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.06em",
                  textTransform: "uppercase", color: "var(--muted)",
                }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 하단 카테고리 스크롤 바 */}
      <div style={{
        borderTop: "1px solid var(--border)",
        background: "var(--accent)",
        padding: "0.625rem 0",
        overflow: "hidden",
      }}>
        <div className="page-wrap">
          <div style={{ display: "flex", gap: "0.25rem", flexWrap: "wrap" }}>
            {[
              "프롬프트", "워크플로우", "MCP 서버", "AI 에이전트",
              "플러그인", "오토메이션", "리서치", "AI 모델",
              "오픈소스", "튜토리얼", "뉴스", "피그마",
            ].map((tag) => (
              <span key={tag} style={{
                fontSize: "0.75rem", fontWeight: 700, color: "white",
                padding: "0.125rem 0.5rem", opacity: 0.85,
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
