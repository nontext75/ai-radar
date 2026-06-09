"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

export default function SignInPage() {
  const [email, setEmail] = useState("");

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "3rem 1rem" }}>
      <div style={{ width: "100%", maxWidth: "400px" }}>

        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "0.5rem" }}>
            로그인
          </h1>
          <p style={{ fontSize: "0.875rem", color: "var(--muted)" }}>
            AI 커뮤니티에 참여하세요
          </p>
        </div>

        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="btn btn-secondary"
          style={{ width: "100%", justifyContent: "center", gap: "0.625rem", height: "44px", marginBottom: "1.5rem" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Google로 로그인
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
          <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
          <span style={{ fontSize: "0.8125rem", color: "var(--subtle)" }}>또는 이메일로</span>
          <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            signIn("email", { email, callbackUrl: "/" });
          }}
          style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            required
            style={{
              height: "44px", padding: "0 0.875rem", border: "1px solid var(--border)",
              borderRadius: "var(--r-sm)", fontSize: "0.9375rem", background: "var(--bg)", width: "100%",
            }}
          />
          <button type="submit" className="btn btn-primary" style={{ justifyContent: "center", height: "44px" }}>
            이메일 링크 받기
          </button>
        </form>

        <p style={{ marginTop: "1.5rem", textAlign: "center", fontSize: "0.8125rem", color: "var(--subtle)" }}>
          계정이 없으신가요?{" "}
          <Link href="/auth/signup" style={{ color: "var(--primary)", fontWeight: 600 }}>
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}
