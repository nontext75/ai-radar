// src/components/figma-feed.tsx
"use client";

import Link from "next/link";
import type { FeedItem } from "@/lib/data";

function ChevronUp() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M1.5 6.5L5 3L8.5 6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FigmaIcon() {
  return (
    <svg width="12" height="16" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ display: "inline-block", verticalAlign: "middle" }}>
      <path d="M0 2a2 2 0 0 1 2-2h2v4H2a2 2 0 0 1-2-2z" fill="#F24E1E"/>
      <path d="M4 0h2a2 2 0 0 1 2 2 2 2 0 0 1-2 2H4V0z" fill="#FF7262"/>
      <path d="M0 6a2 2 0 0 1 2-2h2v4H2a2 2 0 0 1-2-2z" fill="#A259FF"/>
      <path d="M6 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" fill="#1ABCFE"/>
      <path d="M0 10a2 2 0 0 1 2-2h2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2z" fill="#0ACF83"/>
    </svg>
  );
}

export default function FigmaFeed({ items }: { items: FeedItem[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))", gap: "1.25rem" }}>
      {items.map((item, idx) => (
        <Link
          key={item.id}
          href={`/items/${item.id}`}
          className="card card-elevated card-figma anim-fade-up"
          style={{
            display: "flex",
            flexDirection: "column",
            textDecoration: "none",
            color: "inherit",
            position: "relative",
            overflow: "hidden",
            animationDelay: `${idx * 0.05}s`,
            height: "100%",
          }}
        >
          <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem", flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span className={`badge badge-${item.catSlug}`} style={{ fontSize: "0.625rem", display: "inline-flex", alignItems: "center", gap: "5px" }}>
                <FigmaIcon />
                {item.cat}
              </span>
              {item.hot && (
                <span className="badge badge-soft" style={{ fontSize: "0.625rem" }}>
                  인기
                </span>
              )}
            </div>

            <h3 className="feed-item-title" style={{ marginBottom: 0, flex: 1, fontSize: "1.125rem", fontWeight: 700 }}>
              {item.title}
            </h3>
            
            <p
              className="feed-item-desc"
              style={{
                marginBottom: 0,
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis"
              }}
            >
              {item.desc}
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "auto",
                paddingTop: "0.75rem",
                borderTop: "1px solid var(--border-soft)",
              }}
              onClick={e => e.stopPropagation()}
            >
              <div className="feed-item-meta">
                <span>{item.author}</span>
                <span aria-hidden="true">·</span>
                <span>{item.time}</span>
              </div>
              <button className="upvote-btn" aria-label={`${item.title} 추천`} style={{ flexDirection: "row", gap: "4px", padding: "4px 8px" }} onClick={e => { e.preventDefault(); e.stopPropagation(); }}>
                <ChevronUp />
                {item.votes}
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
