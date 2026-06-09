// src/components/collection-actions.tsx
"use client";

import { useState } from "react";
import { CaretUp, ShareNetwork } from "@phosphor-icons/react";

export function CollectionActions() {
  const [votes, setVotes] = useState(12); // 임시 초기 추천수
  const [hasVoted, setHasVoted] = useState(false);
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
          <span style={{ fontSize: "0.875rem", color: "var(--muted)", fontWeight: 500 }}>컬렉션 추천 수</span>
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
          {hasVoted ? "추천됨" : "이 컬렉션 추천하기"}
        </button>
      </div>

      <button
        onClick={handleShare}
        className="btn btn-secondary"
        style={{ width: "100%" }}
      >
        <ShareNetwork size={16} />
        {copied ? "링크 복사 완료!" : "컬렉션 공유하기"}
      </button>
    </div>
  );
}
