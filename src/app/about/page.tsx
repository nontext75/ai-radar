// src/app/about/page.tsx
import Link from "next/link";
import { ArrowLeft, Info, Compass, Users } from "@phosphor-icons/react/dist/ssr";

export default function AboutPage() {
  return (
    <>
      <div className="page-header" style={{ background: "var(--surface)" }}>
        <div className="page-wrap">
          <Link
            href="/"
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
            홈으로 돌아가기
          </Link>
          <h1 className="page-title" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800 }}>
            서비스 소개
          </h1>
          <p className="page-desc" style={{ marginTop: "0.5rem" }}>
            AI 레이더는 최신 AI 리소스를 스캔하고 발견하는 오프닝 플랫폼입니다.
          </p>
        </div>
      </div>

      <div className="page-body">
        <div className="page-wrap page-body-inner" style={{ maxWidth: "800px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            
            <section style={{ background: "var(--bg)", padding: "2rem", borderRadius: "var(--r-lg)", border: "1px solid var(--border-soft)" }}>
              <div style={{ display: "flex", gap: "1rem", alignItems: "start" }}>
                <div style={{ background: "var(--primary-soft)", color: "var(--primary)", padding: "0.75rem", borderRadius: "var(--r-md)" }}>
                  <Info size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem", color: "var(--ink)" }}>
                    AI 레이더(AI Radar)란?
                  </h2>
                  <p style={{ fontSize: "0.9375rem", color: "var(--muted)", lineHeight: 1.75 }}>
                    AI 레이더는 개발자, 디자이너, 기획자, 퍼블리셔 등 AI 생태계의 다양한 구성원들이 필요로 하는 
                    유용한 리소스(프롬프트, 워크플로우, MCP 서버, 에이전트, 가이드 등)를 수집하고 큐레이션하여 
                    더 나은 생산성을 가질 수 있도록 돕는 디스커버리 허브 플랫폼입니다.
                  </p>
                </div>
              </div>
            </section>

            <section style={{ background: "var(--bg)", padding: "2rem", borderRadius: "var(--r-lg)", border: "1px solid var(--border-soft)" }}>
              <div style={{ display: "flex", gap: "1rem", alignItems: "start" }}>
                <div style={{ background: "var(--primary-soft)", color: "var(--primary)", padding: "0.75rem", borderRadius: "var(--r-md)" }}>
                  <Compass size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem", color: "var(--ink)" }}>
                    주요 기능 및 목표
                  </h2>
                  <ul style={{ paddingLeft: "1.25rem", color: "var(--muted)", fontSize: "0.9375rem", lineHeight: 1.8, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <li><strong>실시간 트렌딩:</strong> 커뮤니티 추천과 검증 리포트를 통해 엄선된 최고 등급의 AI 리소스 탐색</li>
                    <li><strong>카테고리 분류:</strong> 필요한 기술 스택 또는 역할군에 맞춤화된 필터링 제공</li>
                    <li><strong>안전성 검증:</strong> 제출된 리소스의 안전성과 호환성을 레이더 시스템이 1차 검증하여 공유</li>
                  </ul>
                </div>
              </div>
            </section>

            <section style={{ background: "var(--bg)", padding: "2rem", borderRadius: "var(--r-lg)", border: "1px solid var(--border-soft)" }}>
              <div style={{ display: "flex", gap: "1rem", alignItems: "start" }}>
                <div style={{ background: "var(--primary-soft)", color: "var(--primary)", padding: "0.75rem", borderRadius: "var(--r-md)" }}>
                  <Users size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem", color: "var(--ink)" }}>
                    커뮤니티와 함께 성장합니다
                  </h2>
                  <p style={{ fontSize: "0.9375rem", color: "var(--muted)", lineHeight: 1.75, marginBottom: "1rem" }}>
                    누구나 유용한 프롬프트나 템플릿, MCP 구성을 공유하여 생태계에 기여할 수 있습니다. 
                    지금 바로 여러분의 리소스를 등록해 보세요.
                  </p>
                  <Link href="/submit" className="btn btn-primary btn-sm">
                    리소스 제출하기
                  </Link>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </>
  );
}
