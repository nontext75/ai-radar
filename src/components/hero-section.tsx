import Link from "next/link";

export default function HeroSection() {
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
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden",
      }}>
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
        <div style={{
          position: "absolute", top: "10%", right: "15%", width: "200px", height: "200px",
          background: "radial-gradient(circle, var(--border-soft) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          opacity: 0.3,
        }} />
      </div>

      <div className="page-wrap" style={{ position: "relative" }}>
        <div style={{ maxWidth: "720px", marginInline: "auto", textAlign: "center" }}>

          <h1
            className="anim-fade-up"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.08,
              marginBottom: "1.25rem",
              color: "var(--ink)",
              textWrap: "balance",
            }}
          >
            AI 생태계의 모든 것을
            <br />
            <span style={{ color: "var(--primary)" }}>한 곳에서 발견하세요.</span>
          </h1>

          <p
            className="anim-fade-up"
            style={{
              fontSize: "clamp(1rem, 2vw, 1.125rem)",
              color: "var(--muted)",
              lineHeight: 1.65,
              maxWidth: "38ch",
              margin: "0 auto 2.25rem",
              animationDelay: "0.1s",
            }}
          >
            커뮤니티가 검증한 프롬프트, 워크플로우, MCP 서버, AI 에이전트를 매일 큐레이션합니다.
          </p>

          <div
            className="anim-fade-up"
            style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap", animationDelay: "0.2s" }}
          >
            <Link href="/trending" className="btn btn-primary btn-lg" style={{ minWidth: "160px" }}>트렌딩 보기</Link>
            <Link href="/submit" className="btn btn-secondary btn-lg" style={{ minWidth: "160px" }}>리소스 제출하기</Link>
          </div>
        </div>

        {/* 통계 */}
        <div
          className="anim-fade-up"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "clamp(2rem, 6vw, 4rem)",
            marginTop: "3.5rem",
            paddingTop: "2.5rem",
            borderTop: "1px solid var(--border-soft)",
            flexWrap: "wrap",
            animationDelay: "0.3s",
          }}
        >
          {[
            { value: "6,200+", label: "등록된 리소스" },
            { value: "13",     label: "카테고리" },
            { value: "5,000+", label: "큐레이터" },
          ].map(({ value, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div className="stat-value">{value}</div>
              <div className="stat-label">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
