import Link from "next/link";

export default async function HeroSection() {
  return (
    <section
      className="anim-fade-up"
      style={{
        position: "relative",
        overflow: "hidden",
        paddingTop: "clamp(4.5rem, 10vw, 8rem)",
        paddingBottom: "clamp(3.5rem, 8vw, 5rem)",
        borderBottom: "1px solid var(--border)",
        background: "var(--bg)",
      }}
    >
      {/* 배경 장식 */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "-30%", right: "-10%", width: "60%", height: "80%",
          background: "radial-gradient(ellipse at center, var(--primary-glow) 0%, transparent 70%)",
          opacity: 0.6,
        }} />
        <div style={{
          position: "absolute", bottom: "-20%", left: "-5%", width: "40%", height: "50%",
          background: "radial-gradient(ellipse at center, var(--primary-glow) 0%, transparent 70%)",
          opacity: 0.4,
        }} />
      </div>

      <div className="page-wrap" style={{ position: "relative" }}>
        <div style={{ maxWidth: "680px", marginInline: "auto", textAlign: "center" }}>
          <h1 style={{
            fontSize: "clamp(2.25rem, 5.5vw, 4rem)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
            marginBottom: "1.25rem",
            color: "var(--ink)",
          }}>
            AI 생태계의 모든 것을<br />
            <span style={{ color: "var(--primary)" }}>한 곳에서 발견하세요.</span>
          </h1>

          <p style={{
            fontSize: "clamp(1rem, 2vw, 1.125rem)",
            color: "var(--muted)",
            lineHeight: 1.65,
            maxWidth: "40ch",
            margin: "0 auto 2.25rem",
          }}>
            커뮤니티가 검증한 프롬프트, 워크플로우, MCP 서버, AI 에이전트를 매일 큐레이션합니다.
          </p>

          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/trending" className="btn btn-primary btn-lg" style={{ minWidth: "148px" }}>트렌딩 보기</Link>
            <Link href="/submit" className="btn btn-secondary btn-lg" style={{ minWidth: "148px" }}>리소스 제출하기</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
