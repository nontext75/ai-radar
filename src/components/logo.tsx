import Link from "next/link";

interface LogoProps {
  href?: string;
  variant?: "default" | "inverted";
  size?: "sm" | "md";
}

export default function Logo({ href = "/", variant = "default", size = "md" }: LogoProps) {
  const iconSize = size === "sm" ? 24 : 28;
  const fontSize = size === "sm" ? "0.875rem" : "0.9375rem";
  const textColor = variant === "inverted" ? "white" : "var(--ink)";
  const iconBg = variant === "inverted" ? "oklch(1 0 0 / 0.15)" : "var(--primary)";

  return (
    <Link
      href={href}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        textDecoration: "none",
        flexShrink: 0,
      }}
    >
      {/* 로고 마크 — 나중에 실제 애셋으로 교체 */}
      <div
        style={{
          width: `${iconSize}px`,
          height: `${iconSize}px`,
          background: iconBg,
          borderRadius: "7px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <circle cx="6" cy="6" r="2" fill="white" />
          <circle cx="6" cy="6" r="4.5" stroke="white" strokeWidth="1" strokeDasharray="2 1.5" />
        </svg>
      </div>
      <span
        style={{
          fontSize,
          fontWeight: 800,
          color: textColor,
          letterSpacing: "-0.025em",
        }}
      >
        AI 레이더
      </span>
    </Link>
  );
}
