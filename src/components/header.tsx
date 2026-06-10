"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";

const NAV = [
  { href: "/",            label: "홈" },
  { href: "/trending",    label: "트렌딩" },
  { href: "/explore",     label: "탐색" },
  { href: "/categories",  label: "카테고리" },
  { href: "/collections", label: "컬렉션" },
];

const AUTH_NAV = [
  { href: "/profile", label: "내 라이브러리" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const path = usePathname();
  const { data: session } = useSession();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    setNavOpen(false);
    setProfileOpen(false);
  }, [path]);

  useEffect(() => {
    if (navOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [navOpen]);

  const isActive = (href: string) =>
    href === "/" ? path === "/" : path.startsWith(href);

  const navLinks = [
    ...NAV,
    ...(session ? AUTH_NAV : []),
  ];

  return (
    <header style={{
      position: "sticky",
      top: 0,
      zIndex: 200,
      background: scrolled ? "oklch(1 0 0 / 0.88)" : "oklch(1 0 0 / 0.65)",
      backdropFilter: "blur(24px)",
      borderBottom: `1px solid ${scrolled ? "var(--border)" : "oklch(0 0 0 / 0.04)"}`,
      transition: "background 250ms, border-color 250ms",
    }}>
      <div className="page-wrap">
        <div style={{ display: "flex", alignItems: "center", height: "56px", gap: "1.5rem" }}>

          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "7px", flexShrink: 0 }}>
            <div style={{
              width: "28px", height: "28px",
              background: "var(--primary)",
              borderRadius: "0",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <circle cx="6.5" cy="6.5" r="2.2" fill="white" />
                <circle cx="6.5" cy="6.5" r="5" stroke="white" strokeWidth="1" strokeDasharray="2.2 1.6" />
              </svg>
            </div>
            <span style={{ fontSize: "0.9375rem", fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.025em" }}>
              AI 레이더
            </span>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="header-nav" style={{ display: "flex", alignItems: "center", gap: "2px", flex: 1 }}>
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`nav-link${isActive(href) ? " active" : ""}`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* ── Desktop Actions ── */}
          <div className="header-desktop-actions" style={{ display: "flex", alignItems: "center", gap: "0.375rem", flexShrink: 0 }}>
            <Link href="/search" aria-label="검색" className="icon-btn">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.6" />
                <path d="M11 11l2.5 2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </Link>

            {session ? (
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setProfileOpen((v) => !v)}
                  aria-label="프로필 메뉴"
                  style={{
                    width: "32px", height: "32px", borderRadius: "0",
                    overflow: "hidden", border: "2px solid var(--ink)",
                    background: "var(--primary-soft)", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    padding: 0,
                  }}
                >
                  {session.user?.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={session.user.image} alt="" width={32} height={32} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--primary)" }}>
                      {session.user?.name?.[0]?.toUpperCase() ?? "U"}
                    </span>
                  )}
                </button>

                {profileOpen && (
                  <>
                    <div
                      style={{ position: "fixed", inset: 0, zIndex: 99 }}
                      onClick={() => setProfileOpen(false)}
                    />
                    <div style={{
                      position: "absolute", right: 0, top: "calc(100% + 8px)",
                      background: "var(--surface)", border: "1px solid var(--border)",
                      borderRadius: "0", boxShadow: "4px 4px 0 0 var(--ink)",
                      minWidth: "180px", zIndex: 100, overflow: "hidden",
                    }}>
                      <div style={{ padding: "0.75rem 1rem", borderBottom: "1px solid var(--border)" }}>
                        <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--ink)" }}>
                          {session.user?.name ?? "사용자"}
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: "2px" }}>
                          {session.user?.email}
                        </div>
                      </div>
                      <Link
                        href="/profile"
                        onClick={() => setProfileOpen(false)}
                        style={{ display: "block", padding: "0.625rem 1rem", fontSize: "0.875rem", color: "var(--ink)" }}
                      >
                        내 프로필
                      </Link>
                      <Link
                        href="/submit"
                        onClick={() => setProfileOpen(false)}
                        style={{ display: "block", padding: "0.625rem 1rem", fontSize: "0.875rem", color: "var(--ink)" }}
                      >
                        리소스 제출
                      </Link>
                      <div style={{ borderTop: "1px solid var(--border)" }}>
                        <button
                          onClick={() => { setProfileOpen(false); signOut({ callbackUrl: "/" }); }}
                          style={{
                            width: "100%", textAlign: "left", padding: "0.625rem 1rem",
                            fontSize: "0.875rem", color: "var(--danger, #e53e3e)", background: "none",
                            border: "none", cursor: "pointer",
                          }}
                        >
                          로그아웃
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <Link href="/auth/signin" className="btn btn-ghost btn-sm">로그인</Link>
                <Link href="/auth/signup" className="btn btn-primary btn-sm" style={{ marginLeft: "4px" }}>
                  회원가입
                </Link>
              </>
            )}

            {session && (
              <Link href="/submit" className="btn btn-primary btn-sm" style={{ marginLeft: "4px" }}>
                + 제출하기
              </Link>
            )}
          </div>

          {/* ── Mobile Toggle ── */}
          <div className="header-mobile-toggle" style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0, marginLeft: "auto" }}>
            <Link href="/search" aria-label="검색" className="icon-btn">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.6" />
                <path d="M11 11l2.5 2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </Link>
            <button
              onClick={() => setNavOpen((v) => !v)}
              aria-label="메뉴 열기"
              className="icon-btn"
              style={{ position: "relative", zIndex: 210 }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                {navOpen ? (
                  <>
                    <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </>
                ) : (
                  <>
                    <path d="M2.5 4.5h13M2.5 9h13M2.5 13.5h13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </>
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      {navOpen && (
        <div className="header-mobile-drawer" style={{
          position: "fixed",
          inset: 0,
          top: "56px",
          zIndex: 190,
          background: "oklch(1 0 0 / 0.98)",
          backdropFilter: "blur(16px)",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          animation: "fade-in 0.2s var(--ease-out)",
        }}>
          <nav style={{ display: "flex", flexDirection: "column", padding: "1rem clamp(2rem, 8vw, 4rem)", gap: "2px" }}>
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`nav-link${isActive(href) ? " active" : ""}`}
                style={{
                  fontSize: "1rem",
                  padding: "0.75rem 0.75rem",
                  borderRadius: "var(--r-md)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                onClick={() => setNavOpen(false)}
              >
                {label}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: "var(--subtle)" }}>
                  <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            ))}
          </nav>

          <div style={{ padding: "0 clamp(2rem, 8vw, 4rem) 2rem" }}>
            {session ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <Link href="/submit" className="btn btn-primary" style={{ justifyContent: "center", width: "100%", height: "44px" }} onClick={() => setNavOpen(false)}>
                  + 제출하기
                </Link>
                <button
                  onClick={() => { setNavOpen(false); signOut({ callbackUrl: "/" }); }}
                  className="btn btn-ghost"
                  style={{ justifyContent: "center", width: "100%", height: "44px" }}
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <Link href="/auth/signin" className="btn btn-ghost" style={{ justifyContent: "center", width: "100%", height: "44px" }} onClick={() => setNavOpen(false)}>
                  로그인
                </Link>
                <Link href="/auth/signup" className="btn btn-primary" style={{ justifyContent: "center", width: "100%", height: "44px" }} onClick={() => setNavOpen(false)}>
                  회원가입
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
