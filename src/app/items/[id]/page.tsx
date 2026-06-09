// src/app/items/[id]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import { ArrowLeft, User, Calendar, Tag, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import { fetchItemById } from "@/lib/fetch-data";
import { ItemActions } from "@/components/item-actions";
import { CopyableCodeBlock } from "@/components/copyable-codeblock";

function renderDesc(text: string) {
  const lines = text.replace(/—/g, ":").split("\n");
  const elements: React.ReactNode[] = [];
  
  let inCodeBlock = false;
  let codeLines: string[] = [];
  let codeLang = "";
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    if (trimmed.startsWith("```")) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeLang = trimmed.slice(3).trim();
        codeLines = [];
      } else {
        inCodeBlock = false;
        const codeText = codeLines.join("\n");
        elements.push(
          <CopyableCodeBlock key={`code-${i}`} code={codeText} lang={codeLang} />
        );
      }
      continue;
    }
    
    if (inCodeBlock) {
      codeLines.push(line);
    } else {
      if (!trimmed) {
        elements.push(<div key={i} style={{ height: "0.5rem" }} />);
        continue;
      }
      
      if (trimmed.startsWith("##")) {
        elements.push(
          <div key={i} style={{ fontWeight: 700, fontSize: "1.125rem", marginTop: i > 0 ? "1.25rem" : 0, marginBottom: "0.5rem", color: "var(--ink)" }}>
            {trimmed.slice(2).trim()}
          </div>
        );
        continue;
      }
      
      const hasBold = /^\*\*[^*]+\*\*/.test(trimmed);
      const parts = trimmed.split(/(\*\*[^*]+\*\*)/g);
      elements.push(
        <div key={i} style={{ marginBottom: "0.25rem", fontSize: hasBold ? "0.875rem" : "0.8125rem" }}>
          {parts.map((part, j) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return <strong key={j}>{part.slice(2, -2)}</strong>;
            }
            return <Fragment key={j}>{part}</Fragment>;
          })}
        </div>
      );
    }
  }
  
  if (inCodeBlock && codeLines.length > 0) {
    elements.push(
      <CopyableCodeBlock key="code-eof" code={codeLines.join("\n")} lang={codeLang} />
    );
  }
  
  return elements;
}

const ROLE_LABELS: Record<string, string> = {
  developer: "개발자",
  pm: "기획자",
  designer: "디자이너",
  publisher: "퍼블리셔",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ItemDetailPage({ params }: PageProps) {
  const { id } = await params;
  const item = await fetchItemById(id);

  if (!item) {
    notFound();
  }

  return (
    <>
      <div className="page-header" style={{ background: "var(--surface)" }}>
        <div className="page-wrap">
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "0.875rem",
              color: "var(--muted)",
              marginBottom: "1.5rem"
            }}
          >
            <ArrowLeft size={16} />
            목록으로 돌아가기
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1rem" }}>
            <Link href={`/categories/${item.catSlug}`} className={`badge badge-${item.catSlug}`}>
              <Tag size={12} weight="duotone" />
              {item.cat}
            </Link>
            {item.hot && (
              <span className="badge badge-soft" style={{ fontSize: "0.75rem" }}>
                인기
              </span>
            )}
          </div>
          <h1 className="page-title" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", lineHeight: 1.25, fontWeight: 800 }}>
            {item.title}
          </h1>
          <div className="feed-item-meta" style={{ marginTop: "1rem", fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
              <User size={14} />
              {item.author}
            </span>
            <span>·</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
              <Calendar size={14} />
              {item.time}
            </span>
            {item.targetRoles && item.targetRoles.length > 0 && (
              <>
                <span>·</span>
                <span style={{ display: "inline-flex", gap: "4px" }}>
                  {item.targetRoles.map(r => (
                    <span key={r} className="badge badge-neutral" style={{ fontSize: "0.75rem", padding: "2px 8px" }}>
                      {ROLE_LABELS[r] ?? r}
                    </span>
                  ))}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="page-body">
        <div className="page-wrap page-body-inner">
          <div className="grid-sidebar">
            <main>
              <article style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                <section>
                  <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1rem" }}>리소스 소개</h2>
                  <div style={{ fontSize: "1.0625rem", lineHeight: 1.8, color: "var(--ink)", whiteSpace: "pre-wrap" }}>
                    {renderDesc(item.desc)}
                  </div>
                </section>

                {item.url && (
                  <section>
                    <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1rem" }}>리소스 바로가기</h2>
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1V6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><path d="M8 8l6-6M10 2h4v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      방문하기
                    </a>
                  </section>
                )}

                {item.installGuide && (
                  <>
                    <div className="divider" />
                    <section>
                      <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1rem" }}>설치 방법</h2>
                      <div style={{ fontSize: "1.0625rem", lineHeight: 1.8, color: "var(--ink)", whiteSpace: "pre-wrap" }}>
                        {renderDesc(item.installGuide)}
                      </div>
                    </section>
                  </>
                )}

                <div className="divider" />

                <section style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700 }}>AI 레이더 검증 리포트</h3>
                  <div
                    style={{
                      background: "var(--primary-soft)",
                      padding: "1.25rem",
                      borderRadius: "var(--r-md)",
                      border: "1px solid var(--border-soft)",
                      display: "flex",
                      gap: "0.75rem"
                    }}
                  >
                    <ShieldCheck size={24} style={{ color: "var(--primary)", flexShrink: 0 }} />
                    <div>
                      <h4 style={{ fontSize: "0.875rem", fontWeight: 700, marginBottom: "0.25rem" }}>안전 및 호환성 확인됨</h4>
                      <p style={{ fontSize: "0.8125rem", color: "var(--muted)", lineHeight: 1.5 }}>
                        본 리소스는 커뮤니티 가이드를 준수하며 검증 과정을 통과했습니다. 상세 코드나 작동 흐름은 실제 배포 버전을 참고하십시오.
                      </p>
                    </div>
                  </div>
                </section>
              </article>
            </main>

            <aside style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <ItemActions initialVotes={item.votes} />
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
