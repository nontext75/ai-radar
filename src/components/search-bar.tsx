// src/components/search-bar.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function SearchBar({
  placeholder = "검색...",
  paramName = "q",
  style,
}: {
  placeholder?: string;
  paramName?: string;
  style?: React.CSSProperties;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const queryVal = searchParams?.get(paramName) || "";
  const [value, setValue] = useState(queryVal);
  const [prevQuery, setPrevQuery] = useState(queryVal);

  if (queryVal !== prevQuery) {
    setPrevQuery(queryVal);
    setValue(queryVal);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const params = new URLSearchParams(searchParams?.toString() || "");
      if (value.trim()) {
        params.set(paramName, value);
      } else {
        params.delete(paramName);
      }
      router.push(`?${params.toString()}`);
    }
  };

  return (
    <input
      className="input"
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleKeyDown}
      style={style}
    />
  );
}
