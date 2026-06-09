// src/lib/data.ts

// ── Types ──
export interface CategoryEntry {
  slug: string;
  label: string;
  count: number;
  desc: string;
}

export interface FeedItem {
  id: number;
  cat: string;
  catSlug: string;
  title: string;
  desc: string;
  url?: string;
  imageUrl?: string;
  votes: number;
  author: string;
  time: string;
  hot: boolean;
  installGuide?: string;
  targetRoles?: string[];
}

export interface CollectionEntry {
  id: number;
  title: string;
  desc: string;
  count: number;
  author: string;
  updated: string;
  itemIds?: number[];
}


