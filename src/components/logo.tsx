import Link from "next/link";

interface LogoProps {
  href?: string;
  variant?: "default" | "inverted";
  size?: "sm" | "md";
}

export default function Logo({ href = "/", variant = "default", size = "md" }: LogoProps) {
  const height = size === "sm" ? 22 : 28;
  const width = Math.round((height * 287) / 68);

  return (
    <Link href={href} style={{ display: "inline-flex", alignItems: "center", flexShrink: 0 }}>
      <img
        src="/logo.svg"
        alt="AI 레이더"
        width={width}
        height={height}
        style={{
          display: "block",
          height: `${height}px`,
          width: "auto",
          filter: variant === "inverted" ? "brightness(0) invert(1)" : "none",
        }}
      />
    </Link>
  );
}
