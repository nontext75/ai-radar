"use client";

import { useState } from "react";
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

export default function TrendingFeed({ items, pageSize = 6 }: { items: FeedItem[]; pageSize?: number }) {
  const router = useRouter();
  const [visible, setVisible] = useState(pageSize);
  const shown = items.slice(0, visible);
  const hasMore = visible < items.length;

  const handleCardClick = (id: number | string) => (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("a") || target.closest(".prevent-card-click")) return;
    router.push(`/items/${id}`);
  };

  return (
    <>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
        gap: "1rem",
      }}>
        {shown.map((item, idx) => (
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
              <span className={`badge badge-${item.catSlug}`} style={{ fontSize: "0.6rem", letterSpacing: "0.04em" }}>
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
            }}>
              <Link
                href={`/items/${item.id}`}
                className="prevent-card-click"
                style={{ textDecoration: "none", color: "inherit" }}
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

      {hasMore && (
        <div style={{ marginTop: "1rem" }}>
          <button
            onClick={() => setVisible(v => v + pageSize)}
            className="btn btn-ghost"
            style={{ width: "100%", justifyContent: "center" }}
          >
            더 보기
          </button>
        </div>
      )}
    </>
  );
}
