"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  BookmarkSimple, Queue, Article, Plus, Trash,
  CaretUp, ArrowRight, Clock
} from "@phosphor-icons/react";

const TABS = [
  { label: "제출한 리소스", icon: Article },
  { label: "저장한 리소스", icon: BookmarkSimple },
  { label: "컬렉션", icon: Queue },
];

interface Item {
  id: number;
  title: string;
  desc: string;
  url?: string;
  cat: string;
  catSlug: string;
  votes: number;
  author: string;
  time: string;
}

interface Collection {
  id: number;
  title: string;
  desc: string;
  count: number;
  created: string;
}

async function api<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  const json = await res.json();
  if (!res.ok) throw new Error(json.error ?? "API error");
  return json;
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState(0);
  const [myItems, setMyItems] = useState<Item[]>([]);
  const [bookmarks, setBookmarks] = useState<Item[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateCol, setShowCreateCol] = useState(false);
  const [colTitle, setColTitle] = useState("");
  const [colDesc, setColDesc] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [myRes, bmRes, colRes] = await Promise.all([
        api<{ data: Item[] }>("/api/contents/mine"),
        api<{ data: Item[] }>("/api/bookmarks"),
        api<{ data: Collection[] }>("/api/collections"),
      ]);
      setMyItems(myRes.data);
      setBookmarks(bmRes.data);
      setCollections(colRes.data);
    } catch { /* ignore */ }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleCreateCollection = async () => {
    if (!colTitle.trim()) return;
    await api("/api/collections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: colTitle.trim(), description: colDesc.trim() }),
    });
    setColTitle("");
    setColDesc("");
    setShowCreateCol(false);
    load();
  };

  const handleDeleteCollection = async (id: number) => {
    await api(`/api/collections/${id}`, { method: "DELETE" });
    load();
  };

  if (status === "loading") {
    return (
      <div className="page-body" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh", padding: "2rem" }}>
        <p style={{ color: "var(--muted)" }}>로딩 중...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="page-body" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh", padding: "2rem" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "var(--muted)", marginBottom: "1.25rem" }}>로그인이 필요합니다.</p>
          <Link href="/auth/signin" className="btn btn-primary">로그인하기</Link>
        </div>
      </div>
    );
  }

  const user = session.user!;
  const TabIcon = TABS[activeTab].icon;
  const tabCounts = [myItems.length, bookmarks.length, collections.length];
  const activeCount = tabCounts[activeTab];

  return (
    <div className="page-body">
      <div className="profile-layout">
        {/* ── Sidebar ── */}
        <aside>
          <div className="card card-elevated" style={{ padding: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "1.25rem" }}>
              <div style={{
                width: "48px", height: "48px", borderRadius: "50%",
                background: "var(--primary-soft)", display: "flex",
                alignItems: "center", justifyContent: "center",
                fontSize: "1rem", fontWeight: 800, color: "var(--primary)",
                overflow: "hidden", flexShrink: 0,
              }}>
                {user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={user.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  user.name?.[0]?.toUpperCase() ?? "U"
                )}
              </div>
              <div style={{ minWidth: 0 }}>
                <h1 style={{
                  fontSize: "1rem", fontWeight: 800, letterSpacing: "-0.025em",
                  margin: 0, marginBottom: "0.125rem",
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                }}>
                  {user.name ?? "사용자"}
                </h1>
                <p style={{
                  fontSize: "0.8125rem", color: "var(--muted)", margin: 0,
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                }}>
                  {user.email}
                </p>
              </div>
            </div>

            <div style={{
              display: "flex", gap: "1rem",
              paddingBottom: "1.25rem", marginBottom: "1rem",
              borderBottom: "1px solid var(--border)",
            }}>
              <Stat value={myItems.length} label="제출" />
              <Stat value={bookmarks.length} label="저장" />
              <Stat value={collections.length} label="컬렉션" />
            </div>

            <nav className="profile-nav">
              {TABS.map((tab, i) => (
                <button
                  key={tab.label}
                  className={`profile-nav-btn${i === activeTab ? " active" : ""}`}
                  onClick={() => setActiveTab(i)}
                >
                  <tab.icon size={16} weight={i === activeTab ? "fill" : "regular"} />
                  {tab.label}
                  {tabCounts[i] > 0 && (
                    <span style={{
                      marginLeft: "auto", fontSize: "0.6875rem",
                      color: i === activeTab ? "var(--primary)" : "var(--subtle)",
                      fontWeight: 600,
                    }}>
                      {tabCounts[i]}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* ── Main content ── */}
        <main>
          <div style={{
            display: "flex", alignItems: "center", gap: "0.625rem",
            marginBottom: "1.5rem",
          }}>
            <TabIcon size={20} weight="bold" style={{ color: "var(--primary)" }} />
            <h2 style={{ fontSize: "1.125rem", fontWeight: 700, margin: 0, color: "var(--ink)" }}>
              {TABS[activeTab].label}
            </h2>
            {activeCount > 0 && (
              <span style={{ fontSize: "0.8125rem", color: "var(--muted)", marginLeft: "auto" }}>
                총 {activeCount}개
              </span>
            )}
            {activeTab === 2 && (
              <button
                className="btn btn-primary btn-sm"
                style={{ marginLeft: activeCount > 0 ? "0.5rem" : "auto" }}
                onClick={() => setShowCreateCol(!showCreateCol)}
              >
                <Plus size={14} weight="bold" />
                새 컬렉션
              </button>
            )}
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--muted)" }}>로딩 중...</div>
          ) : (
            <>
              {activeTab === 0 && (
                myItems.length > 0
                  ? <ItemList items={myItems} />
                  : <TabEmpty message="아직 제출한 리소스가 없습니다." href="/submit" label="첫 리소스 제출하기" />
              )}
              {activeTab === 1 && (
                bookmarks.length > 0
                  ? <ItemList items={bookmarks} />
                  : <TabEmpty message="아직 저장한 리소스가 없습니다." href="/trending" label="트렌딩 보기" />
              )}
              {activeTab === 2 && (
                <div>
                  {showCreateCol && (
                    <div className="card card-elevated" style={{ padding: "1.5rem", marginBottom: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                      <input
                        className="input"
                        placeholder="컬렉션 이름"
                        value={colTitle}
                        onChange={e => setColTitle(e.target.value)}
                      />
                      <input
                        className="input"
                        placeholder="설명 (선택)"
                        value={colDesc}
                        onChange={e => setColDesc(e.target.value)}
                      />
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button className="btn btn-primary btn-sm" onClick={handleCreateCollection}>만들기</button>
                        <button className="btn btn-ghost btn-sm" onClick={() => setShowCreateCol(false)}>취소</button>
                      </div>
                    </div>
                  )}
                  {collections.length > 0 ? (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}>
                      {collections.map(col => (
                        <div key={col.id} className="card card-elevated" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                            <Link href={`/collections/${col.id}`} style={{ fontSize: "1.0625rem", fontWeight: 700, color: "var(--ink)" }}>
                              {col.title}
                            </Link>
                            <button
                              className="btn btn-ghost"
                              style={{ padding: "4px 8px", height: "auto", color: "var(--subtle)", flexShrink: 0 }}
                              onClick={() => handleDeleteCollection(col.id)}
                              aria-label="삭제"
                            >
                              <Trash size={14} />
                            </button>
                          </div>
                          {col.desc && (
                            <p style={{ fontSize: "0.8125rem", color: "var(--muted)", lineHeight: 1.55 }}>{col.desc}</p>
                          )}
                          <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "0.75rem", color: "var(--subtle)", marginTop: "auto" }}>
                            <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                              <Queue size={12} />
                              리소스 {col.count}개
                            </span>
                            <span>·</span>
                            <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                              <Clock size={12} />
                              {col.created}
                            </span>
                            <span style={{ marginLeft: "auto" }}>
                              <Link href={`/collections/${col.id}`} style={{ color: "var(--primary)", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "2px" }}>
                                열기 <ArrowRight size={12} />
                              </Link>
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <TabEmpty message="아직 만든 컬렉션이 없습니다." label="새 컬렉션 만들기" onAction={() => setShowCreateCol(true)} />
                  )}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

// ── Sub components ──

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div style={{ flex: 1, textAlign: "center" }}>
      <div style={{
        fontSize: "1.125rem", fontWeight: 800, color: "var(--ink)",
        letterSpacing: "-0.025em",
      }}>
        {value}
      </div>
      <div style={{ fontSize: "0.6875rem", color: "var(--subtle)", fontWeight: 600, marginTop: "2px" }}>
        {label}
      </div>
    </div>
  );
}

function ItemList({ items }: { items: Item[] }) {
  return (
    <div className="card card-elevated" style={{ overflow: "hidden" }}>
      {items.map((item, idx) => (
        <div key={item.id} style={{
          padding: "1rem 1.25rem",
          borderBottom: idx < items.length - 1 ? "1px solid var(--border)" : "none",
          display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem",
        }}>
          <div>
            <div style={{ marginBottom: "0.375rem" }}>
              <span className={`badge badge-${item.catSlug}`} style={{ fontSize: "0.625rem" }}>{item.cat}</span>
            </div>
            <h3 className="feed-item-title">
              <Link href={`/items/${item.id}`} style={{ display: "block" }}>
                {item.title}
              </Link>
            </h3>
            <p className="feed-item-desc">{item.desc}</p>
            <div className="feed-item-meta" style={{ marginTop: "0.375rem" }}>
              <span>{item.author}</span>
              <span>·</span>
              <span>{item.time}</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
            <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--muted)" }}>{item.votes}</span>
            <CaretUp size={10} weight="bold" style={{ color: "var(--muted)" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function TabEmpty({ message, href, label, onAction }: {
  message: string;
  href?: string;
  label: string;
  onAction?: () => void;
}) {
  return (
    <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
      <p style={{ color: "var(--muted)", marginBottom: "1.25rem", fontSize: "0.9375rem" }}>{message}</p>
      {href ? (
        <Link href={href} className="btn btn-primary">{label}</Link>
      ) : onAction ? (
        <button className="btn btn-primary" onClick={onAction}>{label}</button>
      ) : null}
    </div>
  );
}
