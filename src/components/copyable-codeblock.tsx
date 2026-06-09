// src/components/copyable-codeblock.tsx
"use client";

import { useState } from "react";

interface CopyableCodeBlockProps {
  code: string;
  lang?: string;
}

export function CopyableCodeBlock({ code, lang }: CopyableCodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("코드를 복사하는 데 실패했습니다.");
    }
  };

  return (
    <div
      style={{
        position: "relative",
        marginBlock: "1rem",
        borderRadius: "var(--r-md)",
        background: "var(--surface-2)",
        border: "1px solid var(--border-soft)",
        overflow: "hidden",
      }}
    >
      {/* Header Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.5rem 1rem",
          background: "oklch(0.97 0 0)",
          borderBottom: "1px solid var(--border-soft)",
          fontSize: "0.75rem",
          color: "var(--muted)",
        }}
      >
        <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600 }}>
          {lang ? lang.toUpperCase() : "CODE"}
        </span>
        <button
          onClick={handleCopy}
          style={{
            background: "none",
            border: "none",
            color: copied ? "var(--success)" : "var(--primary)",
            fontWeight: 600,
            cursor: "pointer",
            fontSize: "0.75rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            padding: "2px 6px",
            borderRadius: "4px",
            transition: "background 150ms",
          }}
          aria-label="코드 복사"
        >
          {copied ? (
            <>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              복사 완료
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <rect x="3" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2" />
                <path d="M2 5V2a1 1 0 011-1h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              복사
            </>
          )}
        </button>
      </div>

      {/* Code Text Area */}
      <pre
        style={{
          margin: 0,
          padding: "1rem",
          overflowX: "auto",
          fontFamily: "var(--font-mono), monospace",
          fontSize: "0.875rem",
          lineHeight: 1.6,
          color: "var(--ink)",
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}
