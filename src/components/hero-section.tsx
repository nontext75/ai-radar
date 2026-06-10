import Link from "next/link";

export default async function HeroSection() {
  return (
    <section className="hero anim-fade-up">
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
        <div style={{
          position: "absolute", top: "10%", right: "15%", width: "200px", height: "200px",
          background: "radial-gradient(circle, var(--border-soft) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          opacity: 0.3,
        }} />
      </div>

      <div className="page-wrap" style={{ position: "relative" }}>
        <div className="hero-inner">
          <h1 className="hero-title anim-fade-up">
            AI 생태계의 모든 것을
            <br />
            <span className="hero-accent">한 곳에서 발견하세요.</span>
          </h1>

          <p className="hero-desc anim-fade-up" style={{ animationDelay: "0.1s" }}>
            커뮤니티가 검증한 프롬프트, 워크플로우, MCP 서버, AI 에이전트를 매일 큐레이션합니다.
          </p>

          <div className="hero-actions anim-fade-up" style={{ animationDelay: "0.2s" }}>
            <Link href="/trending" className="btn btn-primary btn-lg" style={{ minWidth: "160px" }}>트렌딩 보기</Link>
            <Link href="/submit" className="btn btn-secondary btn-lg" style={{ minWidth: "160px" }}>리소스 제출하기</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
