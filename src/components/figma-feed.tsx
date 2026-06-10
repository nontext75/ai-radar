"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FeedItem } from "@/lib/data";
import { BookmarkButton } from "@/components/bookmark-button";

function UpvoteIcon() {
  return (
    <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M1 6L4.5 2.5L8 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FigmaIcon() {
  return (
    <svg width="10" height="14" viewBox="0 0 8 12" fill="none" aria-hidden="true" style={{ display: "block", flexShrink: 0 }}>
      <path d="M0 2a2 2 0 0 1 2-2h2v4H2a2 2 0 0 1-2-2z" fill="#F24E1E"/>
      <path d="M4 0h2a2 2 0 0 1 2 2 2 2 0 0 1-2 2H4V0z" fill="#FF7262"/>
      <path d="M0 6a2 2 0 0 1 2-2h2v4H2a2 2 0 0 1-2-2z" fill="#A259FF"/>
      <path d="M6 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" fill="#1ABCFE"/>
      <path d="M0 10a2 2 0 0 1 2-2h2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2z" fill="#0ACF83"/>
    </svg>
  );
}

function stripMarkdown(md: string): string {
  if (!md) return "";
  return md
    .replace(/\n+/g, " ")
    .replace(/#+\s*/g, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/-\s*/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export default function FigmaFeed({ items }: { items: FeedItem[] }) {
  const router = useRouter();

  const handleCardClick = (id: number | string) => (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("a") || target.closest(".prevent-card-click")) return;
    router.push(`/items/${id}`);
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))", gap: "1rem" }}>
      {items.map((item, idx) => (
        <article
          key={item.id}
          onClick={handleCardClick(item.id)}
          className="card card-elevated anim-fade-up"
          style={{
            padding: "1.25rem 1.375rem 1.125rem",
            display: "flex",
            flexDirection: "column",
            animationDelay: `${idx * 0.04}s`,
            cursor: "pointer",
          }}
        >
          {/* ── Top row: badge + bookmark ── */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem", marginBottom: "0.75rem" }}>
            <span className={`badge badge-${item.catSlug}`} style={{ fontSize: "0.6rem", letterSpacing: "0.04em", display: "inline-flex", alignItems: "center", gap: "4px" }}>
              <FigmaIcon />
              {item.cat}
            </span>
            <BookmarkButton contentId={item.id} size={16} />
          </div>

          {/* ── Title ── */}
          <h3 style={{
            fontSize: "1rem",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            lineHeight: 1.4,
            color: "var(--ink)",
            margin: "0 0 0.5rem",
            width: "100%",
          }}>
            <Link
              href={`/items/${item.id}`}
              className="prevent-card-click"
              style={{ textDecoration: "none", color: "inherit", display: "block", width: "100%" }}
            >
              {item.title}
            </Link>
          </h3>

          {/* ── Description ── */}
          <p style={{
            fontSize: "0.8125rem",
            color: "oklch(0.52 0.01 250)",
            lineHeight: 1.6,
            margin: "0 0 auto",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}>
            {stripMarkdown(item.desc.replace(/—/g, ":"))}
          </p>

          {/* ── Footer ── */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "0.75rem",
            marginTop: "0.875rem",
            borderTop: "1px solid oklch(0.94 0.003 250)",
          }}>
            <div style={{
              display: "flex",
              gap: "0.3rem",
              fontSize: "0.6875rem",
              color: "oklch(0.60 0.01 250)",
              alignItems: "center",
              minWidth: 0,
            }}>
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "90px" }}>
                {item.author}
              </span>
              <span aria-hidden="true" style={{ opacity: 0.35 }}>·</span>
              <span style={{ whiteSpace: "nowrap" }}>{item.time}</span>
            </div>

            <button
              aria-label={`${item.title} 추천`}
              onClick={e => { e.preventDefault(); e.stopPropagation(); }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "3px",
                padding: 0,
                border: "none",
                background: "none",
                cursor: "pointer",
                color: "oklch(0.60 0.01 250)",
                fontSize: "0.6875rem",
                fontWeight: 400,
                fontFamily: "inherit",
                lineHeight: 1,
                transition: "color 150ms",
                flexShrink: 0,
              }}
              onMouseEnter={e => { e.currentTarget.style.color = "var(--primary)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "oklch(0.60 0.01 250)"; }}
            >
              <UpvoteIcon />
              {item.votes}
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
