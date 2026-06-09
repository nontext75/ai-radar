// src/app/privacy/page.tsx
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "@phosphor-icons/react/dist/ssr";

export default function PrivacyPage() {
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
            개인정보처리방침
          </h1>
          <p className="page-desc" style={{ marginTop: "0.5rem" }}>
            AI 레이더는 회원의 개인정보를 안전하게 보호하며, 관련 법령을 철저히 준수합니다.
          </p>
        </div>
      </div>

      <div className="page-body">
        <div className="page-wrap page-body-inner" style={{ maxWidth: "800px" }}>
          <div style={{ background: "var(--bg)", padding: "2.5rem", borderRadius: "var(--r-lg)", border: "1px solid var(--border-soft)", display: "flex", flexDirection: "column", gap: "2rem" }}>
            
            <section>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1rem" }}>
                <ShieldCheck size={20} style={{ color: "var(--primary)" }} />
                <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--ink)" }}>1. 수집하는 개인정보 항목</h2>
              </div>
              <p style={{ fontSize: "0.9375rem", color: "var(--muted)", lineHeight: 1.75 }}>
                AI 레이더는 구글 간편 로그인(Google OAuth)을 통해 필요한 최소한의 프로필 정보만을 안전하게 처리합니다:<br />
                - 수집 항목: 이름, 이메일 주소, 프로필 이미지 URL
              </p>
            </section>

            <div className="divider" />

            <section>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1rem" }}>
                <ShieldCheck size={20} style={{ color: "var(--primary)" }} />
                <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--ink)" }}>2. 개인정보의 수집 및 이용 목적</h2>
              </div>
              <p style={{ fontSize: "0.9375rem", color: "var(--muted)", lineHeight: 1.75 }}>
                회사는 수집한 정보를 다음의 목적을 위해 활용합니다:<br />
                - 회원제 서비스 이용에 따른 본인확인 및 식별<br />
                - 리소스 업로드, 추천/추천수 집계 등 서비스 기능 제공<br />
                - 비정상적인 서비스 이용 방지 및 계정 보호
              </p>
            </section>

            <div className="divider" />

            <section>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1rem" }}>
                <ShieldCheck size={20} style={{ color: "var(--primary)" }} />
                <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--ink)" }}>3. 개인정보의 보유 및 파기</h2>
              </div>
              <p style={{ fontSize: "0.9375rem", color: "var(--muted)", lineHeight: 1.75 }}>
                회원의 개인정보는 회원 탈퇴 시 지체 없이 파기하는 것을 원칙으로 합니다. 다만, 관계 법령에 의해 보존할 필요가 있는 경우 해당 법령이 정한 기간 동안 보존합니다.
              </p>
            </section>

          </div>
        </div>
      </div>
    </>
  );
}
