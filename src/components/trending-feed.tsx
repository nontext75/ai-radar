"use client";

import { useState } from "react";
import Link from "next/link";
import type { FeedItem } from "@/lib/data";

function ChevronUp() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M1.5 6.5L5 3L8.5 6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}


export default function TrendingFeed({ items, pageSize = 6 }: { items: FeedItem[]; pageSize?: number }) {
  const [visible, setVisible] = useState(pageSize);
  const shown = items.slice(0, visible);
  const hasMore = visible < items.length;

  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))", gap: "1.25rem" }}>
        {shown.map((item, idx) => (
          <Link
            key={item.id}
            href={`/items/${item.id}`}
            className="card card-elevated anim-fade-up"
            style={{
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              animationDelay: `${idx * 0.05}s`,
              textDecoration: "none",
              color: "inherit",
              height: "100%",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.5rem" }}>
              <span className={`badge badge-${item.catSlug}`} style={{ fontSize: "0.625rem" }}>
                {item.cat}
              </span>
              {item.hot && (
                <span className="badge badge-soft" style={{ fontSize: "0.625rem" }}>
                  인기
                </span>
              )}
            </div>

            <h3 className="feed-item-title" style={{ marginBottom: 0, flex: 1, fontSize: "1.25rem" }}>
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
              {item.desc.replace(/—/g, ":")}
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "auto",
                paddingTop: "0.5rem",
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
          </Link>
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
