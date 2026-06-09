"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "3rem 1rem" }}>
      <div style={{ width: "100%", maxWidth: "400px" }}>

        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "0.5rem" }}>
            회원가입
          </h1>
          <p style={{ fontSize: "0.875rem", color: "var(--muted)" }}>
            커뮤니티에 가입하고 AI 리소스를 공유하세요
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="btn btn-secondary"
            style={{ width: "100%", justifyContent: "center", gap: "0.625rem", height: "44px" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Google로 시작하기
          </button>

          <button
            onClick={() => signIn("kakao", { callbackUrl: "/" })}
            style={{
              width: "100%", height: "44px", display: "flex", alignItems: "center",
              justifyContent: "center", gap: "0.625rem", border: "none", borderRadius: "var(--r-sm)",
              background: "#FEE500", color: "#191919", fontSize: "0.9375rem", fontWeight: 600,
              cursor: "pointer",
            }}
          >
            <svg width="20" height="18" viewBox="0 0 20 18" fill="none" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M10 0C4.477 0 0 3.358 0 7.5c0 2.671 1.693 5.012 4.243 6.374L3.18 17.5c-.09.362.322.645.63.43L8.52 14.9c.486.065.982.1 1.48.1 5.523 0 10-3.358 10-7.5S15.523 0 10 0z" fill="#191919"/>
            </svg>
            카카오로 시작하기
          </button>
        </div>

        <p style={{ marginTop: "1.5rem", textAlign: "center", fontSize: "0.8125rem", color: "var(--subtle)" }}>
          이미 계정이 있으신가요?{" "}
          <Link href="/auth/signin" style={{ color: "var(--primary)", fontWeight: 600 }}>
            로그인
          </Link>
        </p>

        <p style={{ marginTop: "1rem", textAlign: "center", fontSize: "0.75rem", color: "var(--muted)", lineHeight: 1.6 }}>
          가입하면 <Link href="/terms" style={{ color: "var(--muted)", textDecoration: "underline" }}>이용약관</Link>과{" "}
          <Link href="/privacy" style={{ color: "var(--muted)", textDecoration: "underline" }}>개인정보처리방침</Link>에 동의하는 것으로 간주됩니다.
        </p>
      </div>
    </div>
  );
}
