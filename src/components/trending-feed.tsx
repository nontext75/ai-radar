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

// 카드 컬러 테마: 0=기본, 1=다크(인디고), 2=민트
const CARD_PATTERN = [0, 0, 1, 0, 0, 2];

type CardTheme = 0 | 1 | 2;

const THEMES = {
  0: {
    bg: "var(--bg)",
    border: "var(--border-soft)",
    title: "var(--ink)",
    desc: "var(--muted)",
    meta: "var(--subtle)",
    divider: "var(--border-soft)",
    badgeBorder: undefined as string | undefined,
  },
  1: {
    bg: "oklch(0.20 0.18 278)",
    border: "oklch(0.28 0.18 278)",
    title: "white",
    desc: "oklch(1 0 0 / 0.65)",
    meta: "oklch(1 0 0 / 0.45)",
    divider: "oklch(1 0 0 / 0.12)",
    badgeBorder: "oklch(1 0 0 / 0.15)",
  },
  2: {
    bg: "oklch(0.92 0.10 162)",
    border: "oklch(0.82 0.12 162)",
    title: "oklch(0.18 0.10 162)",
    desc: "oklch(0.30 0.08 162)",
    meta: "oklch(0.42 0.07 162)",
    divider: "oklch(0.78 0.10 162)",
    badgeBorder: undefined,
  },
};

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
        {shown.map((item, idx) => {
          const theme = THEMES[CARD_PATTERN[idx % CARD_PATTERN.length] as CardTheme];

          return (
            <div
              key={item.id}
              onClick={handleCardClick(item.id)}
              className="card anim-fade-up"
              style={{
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                animationDelay: `${idx * 0.05}s`,
                cursor: "pointer",
                height: "100%",
                background: theme.bg,
                borderColor: theme.border,
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.5rem" }}>
                <span
                  className={`badge badge-${item.catSlug}`}
                  style={{
                    fontSize: "0.625rem",
                    ...(theme.badgeBorder ? { border: `1px solid ${theme.badgeBorder}`, background: "oklch(1 0 0 / 0.08)", color: "oklch(1 0 0 / 0.75)" } : {}),
                  }}
                >
                  {item.cat}
                </span>
                {item.hot && (
                  <span
                    className="badge badge-soft"
                    style={{
                      fontSize: "0.625rem",
                      ...(theme.badgeBorder ? { border: `1px solid ${theme.badgeBorder}`, background: "oklch(1 0 0 / 0.1)", color: "oklch(1 0 0 / 0.75)" } : {}),
                    }}
                  >
                    인기
                  </span>
                )}
              </div>

              <h3 style={{ fontSize: "1rem", fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.45, color: theme.title, margin: 0, flex: 1 }}>
                <Link
                  href={`/items/${item.id}`}
                  className="prevent-card-click"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {item.title}
                </Link>
              </h3>

              <p style={{
                fontSize: "0.875rem",
                color: theme.desc,
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
                borderTop: `1px solid ${theme.divider}`,
              }}>
                <div style={{ display: "flex", gap: "0.5rem", fontSize: "0.75rem", color: theme.meta, alignItems: "center" }}>
                  <span>{item.author}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.time}</span>
                  <span aria-hidden="true">·</span>
                  <button
                    aria-label={`${item.title} 추천`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "3px",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      color: theme.meta,
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      fontFamily: "inherit",
                      transition: "color 150ms",
                    }}
                    onClick={e => { e.preventDefault(); e.stopPropagation(); }}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--accent)")}
                    onMouseLeave={e => (e.currentTarget.style.color = theme.meta)}
                  >
                    <ChevronUp />
                    {item.votes}
                  </button>
                </div>
                <BookmarkButton contentId={item.id} size={20} />
              </div>
            </div>
          );
        })}
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
