"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const NAV = [
  { href: "/",            label: "홈" },
  { href: "/trending",    label: "트렌딩" },
  { href: "/explore",     label: "탐색" },
  { href: "/categories",  label: "카테고리" },
  { href: "/collections", label: "컬렉션" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const path = usePathname();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? path === "/" : path.startsWith(href);

  return (
    <header style={{
      position: "sticky",
      top: 0,
      zIndex: 200,
      background: scrolled ? "oklch(1 0 0 / 0.88)" : "oklch(1 0 0 / 0.65)",
      backdropFilter: "blur(24px)",
      borderBottom: `1px solid ${scrolled ? "var(--border)" : "transparent"}`,
      transition: "background 250ms, border-color 250ms",
    }}>
      <div className="page-wrap">
        <div style={{ display: "flex", alignItems: "center", height: "56px", gap: "1.5rem" }}>

          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "7px", flexShrink: 0 }}>
            <div style={{
              width: "26px", height: "26px",
              background: "var(--primary)",
              borderRadius: "7px",
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

          <nav style={{ display: "flex", alignItems: "center", gap: "2px", flex: 1 }}>
            {NAV.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`nav-link${isActive(href) ? " active" : ""}`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", flexShrink: 0 }}>
            <Link href="/search" aria-label="검색" className="icon-btn">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.6" />
                <path d="M11 11l2.5 2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </Link>
            <Link href="/profile" aria-label="프로필" className="icon-btn">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.6" />
                <path d="M2.5 13.5c0-2.76 2.46-5 5.5-5s5.5 2.24 5.5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </Link>
            <Link href="/submit" className="btn btn-primary btn-sm" style={{ marginLeft: "4px" }}>
              + 제출하기
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}
