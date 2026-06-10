"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { Bookmark } from "lucide-react";

function UpvoteIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 9 9" fill="none" aria-hidden="true">
      <path d="M1 6L4.5 2.5L8 6" stroke="currentColor" strokeWidth={filled ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="1.8"/>
      <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/>
      <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M8.59 13.51l6.83 3.98M15.41 6.51L8.59 10.49" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

interface ItemActionsProps {
  initialVotes: number;
}

export function ItemActions({ initialVotes }: ItemActionsProps) {
  const { data: session } = useSession();
  const params = useParams();
  const contentId = Number(params.id);

  const [votes, setVotes] = useState(initialVotes);
  const [hasVoted, setHasVoted] = useState(false);
  const [hasBookmarked, setHasBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);

  useEffect(() => {
    if (!session?.user?.id || !contentId) return;
    fetch("/api/bookmarks")
      .then(r => r.json())
      .then(res => {
        const bookmarked = (res.data ?? []).some((b: { id: number }) => b.id === contentId);
        setHasBookmarked(bookmarked);
      })
      .catch(() => {});
  }, [session, contentId]);

  const handleVote = () => {
    setVotes(v => hasVoted ? v - 1 : v + 1);
    setHasVoted(v => !v);
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("링크를 복사하는 데 실패했습니다.");
    }
  };

  const handleBookmark = async () => {
    if (!session) { window.location.href = "/auth/signin"; return; }
    if (bookmarkLoading) return;
    setBookmarkLoading(true);
    try {
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contentId }),
      });
      const data = await res.json();
      setHasBookmarked(data.bookmarked);
    } catch { /* ignore */ }
    setBookmarkLoading(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>

      {/* ── 추천 카드 ── */}
      <div className="card" style={{
        padding: "1.25rem 1.375rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
          <span style={{ fontSize: "0.8125rem", color: "oklch(0.60 0.01 250)", fontWeight: 500 }}>
            현재 추천 수
          </span>
          <span style={{ fontSize: "1.75rem", fontWeight: 700, letterSpacing: "-0.04em", color: "var(--ink)", lineHeight: 1 }}>
            {votes.toLocaleString()}
          </span>
        </div>

        <button
          onClick={handleVote}
          style={{
            width: "100%",
            height: "42px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            fontSize: "0.875rem",
            fontWeight: 600,
            fontFamily: "inherit",
            transition: "background 150ms, color 150ms",
            background: hasVoted ? "oklch(0.94 0.03 285)" : "var(--primary)",
            color: hasVoted ? "var(--primary)" : "#fff",
          }}
        >
          <UpvoteIcon filled={hasVoted} />
          {hasVoted ? "추천됨" : "추천하기"}
        </button>
      </div>

      {/* ── 공유 + 스크랩 ── */}
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button
          onClick={handleShare}
          style={{
            flex: 1,
            height: "40px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            borderRadius: "6px",
            border: "1px solid oklch(0.91 0.005 250)",
            background: "#fff",
            cursor: "pointer",
            fontSize: "0.8125rem",
            fontWeight: 500,
            fontFamily: "inherit",
            color: "oklch(0.45 0.015 250)",
            transition: "background 150ms, border-color 150ms",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "oklch(0.97 0.003 250)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#fff"; }}
        >
          <ShareIcon />
          {copied ? "복사됨" : "공유하기"}
        </button>

        <button
          onClick={handleBookmark}
          disabled={bookmarkLoading}
          aria-label={hasBookmarked ? "북마크 해제" : "북마크"}
          style={{
            width: "40px",
            height: "40px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "6px",
            border: "1px solid oklch(0.91 0.005 250)",
            background: "#fff",
            cursor: "pointer",
            color: hasBookmarked ? "var(--primary)" : "oklch(0.84 0.008 250)",
            transition: "color 150ms, background 150ms",
            opacity: bookmarkLoading ? 0.5 : 1,
            flexShrink: 0,
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "oklch(0.97 0.003 250)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#fff"; }}
        >
          <Bookmark size={16} fill="currentColor" stroke="none" />
        </button>
      </div>
    </div>
  );
}
