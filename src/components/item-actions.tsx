// src/components/item-actions.tsx
"use client";

import { useState } from "react";
import { CaretUp, ShareNetwork, Bookmark } from "@phosphor-icons/react";

interface ItemActionsProps {
  initialVotes: number;
}

export function ItemActions({ initialVotes }: ItemActionsProps) {
  const [votes, setVotes] = useState(initialVotes);
  const [hasVoted, setHasVoted] = useState(false);
  const [hasBookmarked, setHasBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleVote = () => {
    if (hasVoted) {
      setVotes((v) => v - 1);
      setHasVoted(false);
    } else {
      setVotes((v) => v + 1);
      setHasVoted(true);
    }
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

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div className="card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem", alignItems: "stretch" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: "0.875rem", color: "var(--muted)", fontWeight: 500 }}>현재 추천 수</span>
          <span style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--ink)" }}>{votes}</span>
        </div>
        <button
          onClick={handleVote}
          className="btn btn-primary"
          style={{
            width: "100%",
            background: hasVoted ? "var(--primary-hover)" : "var(--primary)",
            borderColor: hasVoted ? "var(--primary)" : "transparent"
          }}
        >
          <CaretUp size={18} weight={hasVoted ? "fill" : "bold"} />
          {hasVoted ? "추천됨" : "추천하기"}
        </button>
      </div>

      <div style={{ display: "flex", gap: "0.75rem" }}>
        <button
          onClick={handleShare}
          className="btn btn-secondary"
          style={{ flex: 1, position: "relative" }}
        >
          <ShareNetwork size={16} />
          {copied ? "복사 완료!" : "공유하기"}
        </button>
        <button
          onClick={() => setHasBookmarked(!hasBookmarked)}
          className="btn btn-secondary"
          style={{ paddingInline: "0.75rem" }}
          aria-label="북마크"
        >
          <Bookmark size={16} weight={hasBookmarked ? "fill" : "regular"} style={{ color: hasBookmarked ? "var(--primary)" : "inherit" }} />
        </button>
      </div>
    </div>
  );
}
