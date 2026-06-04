import { ITEMS, CATEGORIES, type FeedItem, type CategoryEntry } from "@/lib/data";

async function getSupabase() {
  try {
    const mod = await import("@/lib/supabase/server");
    return await mod.createClient();
  } catch {
    return null;
  }
}

function isConfigured(): boolean {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export async function fetchItems(sort: "trending" | "latest" = "trending", limit = 10): Promise<FeedItem[]> {
  if (!isConfigured()) {
    const sorted = [...ITEMS];
    if (sort === "trending") sorted.sort((a, b) => b.votes - a.votes);
    return sorted.slice(0, limit);
  }

  try {
    const supabase = await getSupabase();
    if (!supabase) return ITEMS.slice(0, limit);

    const order = sort === "trending" ? "votes" : "created_at";
    const { data, error } = await supabase
      .from("contents")
      .select(`
        id, title, description, votes, created_at,
        categories ( slug, name ),
        profiles ( name )
      `)
      .order(order, { ascending: false })
      .limit(limit);

    if (error || !data) return ITEMS.slice(0, limit);

    return data.map((item: any, idx: number) => ({
      id: idx + 1,
      cat:     item.categories?.name    ?? "",
      catSlug: item.categories?.slug    ?? "",
      title:   item.title,
      desc:    item.description         ?? "",
      votes:   item.votes               ?? 0,
      author:  item.profiles?.name      ?? "anonymous",
      time:    timeAgo(item.created_at),
      hot:     (item.votes ?? 0) > 300,
    }));
  } catch {
    return ITEMS.slice(0, limit);
  }
}

export async function fetchCategories(): Promise<CategoryEntry[]> {
  if (!isConfigured()) return CATEGORIES;

  try {
    const supabase = await getSupabase();
    if (!supabase) return CATEGORIES;

    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name");

    if (error || !data) return CATEGORIES;

    return data.map((item: any) => ({
      slug: item.slug,
      label: item.name,
      count: item.content_count ?? 0,
      desc: item.description ?? "",
    }));
  } catch {
    return CATEGORIES;
  }
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}분 전`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}시간 전`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}일 전`;
  return `${Math.floor(days / 7)}주일 전`;
}
