"use client";

import Link from "next/link";
import { useState } from "react";
import { CATEGORIES } from "@/lib/data";

export default function SubmitPage() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "4rem 1rem" }}>
        <div className="anim-scale-in" style={{ textAlign: "center", maxWidth: "400px" }}>
          <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "var(--primary-soft)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5 12l5 5L20 7" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 style={{ fontSize: "1.375rem", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: "0.625rem" }}>제출 완료!</h2>
          <p style={{ fontSize: "0.9375rem", color: "var(--muted)", lineHeight: 1.65, marginBottom: "2rem" }}>
            리소스가 성공적으로 제출됐습니다. 검토 후 게시됩니다.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
            <Link href="/trending" className="btn btn-primary">트렌딩 보기</Link>
            <button className="btn btn-ghost" onClick={() => setSubmitted(false)}>또 제출하기</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="page-header">
        <div className="page-wrap">
          <h1 className="page-title">리소스 제출</h1>
          <p className="page-desc">유용한 AI 리소스를 커뮤니티와 공유하세요.</p>
        </div>
      </div>

      <div className="page-body">
        <div className="page-wrap page-body-inner">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: "3rem", alignItems: "start" }}>

            <form
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
              style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
            >
              <div className="card card-elevated" style={{ padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1.375rem" }}>
                <div>
                  <label className="label" htmlFor="title">제목 *</label>
                  <input id="title" className="input" placeholder="리소스 이름이나 핵심 기능을 간결하게 적어주세요" required />
                </div>

                <div>
                  <label className="label" htmlFor="url">URL *</label>
                  <input id="url" className="input" type="url" placeholder="https://..." required />
                </div>

                <div>
                  <label className="label" htmlFor="category">카테고리 *</label>
                  <select id="category" className="select" required>
                    <option value="">카테고리 선택</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat.slug} value={cat.slug}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label" htmlFor="desc">설명 *</label>
                  <textarea id="desc" className="textarea" placeholder="어떤 리소스인지, 어떻게 활용할 수 있는지 간략히 설명해주세요. (100자 이상 권장)" required />
                </div>

                <div>
                  <label className="label" htmlFor="tags">태그 (선택)</label>
                  <input id="tags" className="input" placeholder="태그를 쉼표로 구분해서 입력하세요 (예: Claude, 자동화, 무료)" />
                  <p style={{ fontSize: "0.8125rem", color: "var(--subtle)", marginTop: "0.375rem" }}>최대 5개</p>
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-lg" style={{ width: "100%", justifyContent: "center" }}>
                리소스 제출하기
              </button>
            </form>

            <aside style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div className="sidebar-card">
                <div className="sidebar-header">제출 가이드</div>
                <div style={{ padding: "0.5rem 1.125rem 1.125rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {[
                    { title: "구체적인 제목", desc: "리소스의 핵심을 한 문장으로 표현해주세요." },
                    { title: "정확한 URL", desc: "리소스에 바로 접근할 수 있는 주소를 입력하세요." },
                    { title: "상세한 설명", desc: "활용 방법, 장점, 대상 독자를 포함하면 더 좋습니다." },
                  ].map((g) => (
                    <div key={g.title}>
                      <div style={{ fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.25rem" }}>{g.title}</div>
                      <div style={{ fontSize: "0.8125rem", color: "var(--muted)", lineHeight: 1.55 }}>{g.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="sidebar-card">
                <div className="sidebar-header">검토 기준</div>
                <div style={{ padding: "0.5rem 1.125rem 1.125rem" }}>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                    {["AI 관련 리소스", "실제로 사용 가능한 링크", "중복 등록 아닌 것", "홍보성 내용 아닌 것"].map((c) => (
                      <li key={c} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.8125rem", color: "var(--muted)" }}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="var(--primary)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
