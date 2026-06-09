// src/app/terms/page.tsx
import Link from "next/link";
import { ArrowLeft, Article } from "@phosphor-icons/react/dist/ssr";

export default function TermsPage() {
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
            이용약관
          </h1>
          <p className="page-desc" style={{ marginTop: "0.5rem" }}>
            AI 레이더 서비스 이용을 환영합니다. 본 약관은 서비스 이용에 관한 권리와 의무를 규정합니다.
          </p>
        </div>
      </div>

      <div className="page-body">
        <div className="page-wrap page-body-inner" style={{ maxWidth: "800px" }}>
          <div style={{ background: "var(--bg)", padding: "2.5rem", borderRadius: "var(--r-lg)", border: "1px solid var(--border-soft)", display: "flex", flexDirection: "column", gap: "2rem" }}>
            
            <section>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1rem" }}>
                <Article size={20} style={{ color: "var(--primary)" }} />
                <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--ink)" }}>제 1 조 (목적)</h2>
              </div>
              <p style={{ fontSize: "0.9375rem", color: "var(--muted)", lineHeight: 1.75 }}>
                본 약관은 AI 레이더(이하 "회사" 또는 "서비스")가 제공하는 모든 서비스의 이용조건 및 절차, 이용자와 회사의 권리, 의무, 책임사항을 규정함을 목적으로 합니다.
              </p>
            </section>

            <div className="divider" />

            <section>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1rem" }}>
                <Article size={20} style={{ color: "var(--primary)" }} />
                <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--ink)" }}>제 2 조 (용어의 정의)</h2>
              </div>
              <p style={{ fontSize: "0.9375rem", color: "var(--muted)", lineHeight: 1.75 }}>
                1. "서비스"란 AI 레이더 웹사이트를 통해 제공되는 리소스 공유 및 탐색 기능을 말합니다.<br />
                2. "회원"이란 본 약관에 동의하고 서비스를 이용하는 고객을 말합니다.<br />
                3. "리소스"란 회원이 서비스에 게시하거나 등록한 프롬프트, 코드, 이미지, 가이드 등을 의미합니다.
              </p>
            </section>

            <div className="divider" />

            <section>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1rem" }}>
                <Article size={20} style={{ color: "var(--primary)" }} />
                <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--ink)" }}>제 3 조 (리소스 등록 및 저작권)</h2>
              </div>
              <p style={{ fontSize: "0.9375rem", color: "var(--muted)", lineHeight: 1.75 }}>
                1. 회원이 서비스 내에 게시한 리소스의 저작권은 해당 회원에게 귀속됩니다.<br />
                2. 회원은 자신이 등록한 리소스가 타인의 지식재산권을 침해하지 않음을 보증하여야 합니다.<br />
                3. 서비스의 안전성과 퀄리티 유지를 위해 비정상적이거나 유해한 리소스는 사전 예고 없이 비공개 처리될 수 있습니다.
              </p>
            </section>

          </div>
        </div>
      </div>
    </>
  );
}
