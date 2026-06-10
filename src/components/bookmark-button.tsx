"use client";

import { useState, useEffect } from "react";
import { Bookmark } from "lucide-react";
import { useSession } from "next-auth/react";

interface Props {
  contentId: number;
  size?: number;
  className?: string;
}

export function BookmarkButton({ contentId, size = 14, className }: Props) {
  const { data: session } = useSession();
  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!session?.user?.id) return;
    fetch("/api/bookmarks")
      .then(r => r.json())
      .then(res => {
        const ids = (res.data ?? []).map((b: { id: number }) => b.id);
        setBookmarked(ids.includes(contentId));
      })
      .catch(() => {});
  }, [session, contentId]);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!session) { window.location.href = "/auth/signin"; return; }
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contentId }),
      });
      const data = await res.json();
      setBookmarked(data.bookmarked);
    } catch { /* ignore */ }
    setLoading(false);
  };

  return (
    <button
      className={className}
      onClick={handleClick}
      aria-label={bookmarked ? "북마크 해제" : "북마크"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        border: "none",
        background: "none",
        cursor: "pointer",
        padding: 0,
        color: bookmarked ? "var(--primary)" : "oklch(0.84 0.008 250)",
        transition: "color 150ms",
        opacity: loading ? 0.5 : 1,
        flexShrink: 0,
      }}

      onMouseEnter={e => { e.currentTarget.style.color = bookmarked ? "var(--primary)" : "var(--ink)"; }}
      onMouseLeave={e => { e.currentTarget.style.color = bookmarked ? "var(--primary)" : "oklch(0.84 0.008 250)"; }}
    >
      <Bookmark size={size} fill="currentColor" stroke="none" />
    </button>
  );
}
