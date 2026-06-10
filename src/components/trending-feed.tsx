// src/components/trending-feed.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FeedItem } from "@/lib/data";
import { BookmarkButton } from "@/components/bookmark-button";

function ChevronUp() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M1.5 6.5L5 3L8.5 6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
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
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))", gap: "1.25rem" }}>
        {shown.map((item, idx) => (
          <div
            key={item.id}
            onClick={handleCardClick(item.id)}
            className="card card-elevated anim-fade-up"
            style={{
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              animationDelay: `${idx * 0.05}s`,
              cursor: "pointer",
              height: "100%",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.5rem" }}>
              <span className={`badge badge-${item.catSlug}`} style={{ fontSize: "0.625rem" }}>
                {item.cat}
              </span>
              <BookmarkButton contentId={item.id} size={20} />
            </div>

            <h3 style={{ fontSize: "1rem", fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.45, color: "var(--ink)", margin: 0, flex: 1 }}>
              <Link href={`/items/${item.id}`} className="prevent-card-click" style={{ textDecoration: "none", color: "inherit" }}>
                {item.title}
              </Link>
            </h3>

            <p style={{
              fontSize: "0.875rem",
              color: "var(--muted)",
              lineHeight: 1.6,
              margin: 0,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}>
              {stripMarkdown(item.desc.replace(/—/g, ":"))}
            </p>

            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "auto",
              paddingTop: "0.625rem",
              borderTop: "1px solid var(--border-soft)",
            }}>
              <div style={{ display: "flex", gap: "0.5rem", fontSize: "0.75rem", color: "var(--subtle)", alignItems: "center" }}>
                <span>{item.author}</span>
                <span aria-hidden="true">·</span>
                <span>{item.time}</span>
                <span aria-hidden="true">·</span>
                <button
                  aria-label={`${item.title} 추천`}
                  style={{
                    display: "inline-flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "3px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    color: "var(--subtle)",
                    fontSize: "0.6875rem",
                    fontWeight: 700,
                    fontFamily: "inherit",
                    transition: "color 150ms",
                    lineHeight: 1,
                  }}
                  onClick={e => { e.preventDefault(); e.stopPropagation(); }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--accent)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--subtle)")}
                >
                  <ChevronUp />
                  {item.votes}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <div style={{ marginTop: "1.25rem" }}>
          <button
            onClick={() => setVisible((v) => v + pageSize)}
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
