import { type FeedItem, type CategoryEntry, type CollectionEntry } from "@/lib/data";

interface DBContentItem {
  id: number;
  title: string;
  description: string | null;
  url: string | null;
  image_url: string | null;
  votes: number | null;
  created_at: string;
  categories: { slug: string; name: string } | { slug: string; name: string }[] | null;
  profiles: { name: string } | { name: string }[] | null;
  install_guide: string | null;
  target_roles: string[] | null;
}

interface DBCategoryItem {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  content_count: number | null;
  created_at: string;
}

interface DBCollectionItem {
  id: number;
  title: string;
  description: string | null;
  created_at: string;
  profiles: { name: string } | { name: string }[] | null;
  collections_contents: { content_id: number }[] | null;
}

async function getSupabase() {
  const mod = await import("@/lib/supabase/server");
  return await mod.createClient();
}

export async function fetchItems(sort: "trending" | "latest" = "trending", limit = 10, categorySlug?: string): Promise<FeedItem[]> {
  const supabase = await getSupabase();
  const order = sort === "trending" ? "votes" : "created_at";
  
  let query;
  if (categorySlug) {
    query = supabase
      .from("contents")
      .select(`
        id, title, description, url, image_url, votes, created_at, install_guide, target_roles,
        categories!inner ( slug, name ),
        profiles!contents_user_id_fkey ( name )
      `)
      .eq("categories.slug", categorySlug);
  } else {
    query = supabase
      .from("contents")
      .select(`
        id, title, description, url, image_url, votes, created_at, install_guide, target_roles,
        categories ( slug, name ),
        profiles!contents_user_id_fkey ( name )
      `);
  }

  const { data, error } = await query
    .order(order, { ascending: false })
    .limit(limit);

  if (error || !data) return [];

  return data.map((item: DBContentItem) => {
    const categoryInfo = Array.isArray(item.categories)
      ? item.categories[0]
      : (item.categories as { slug: string; name: string } | null);

    const profileInfo = Array.isArray(item.profiles)
      ? item.profiles[0]
      : (item.profiles as { name: string } | null);

    return {
      id: item.id,
      cat:     categoryInfo?.name    ?? "",
      catSlug: categoryInfo?.slug    ?? "",
      title:   item.title,
      desc:    item.description         ?? "",
      url:     item.url                 ?? undefined,
      imageUrl: item.image_url           ?? undefined,
      votes:   item.votes               ?? 0,
      author:  profileInfo?.name      ?? "anonymous",
      time:    timeAgo(item.created_at),
      hot:     (item.votes ?? 0) > 300,
      installGuide: item.install_guide  ?? undefined,
      targetRoles: item.target_roles    ?? [],
    };
  });
}

export async function fetchCategories(): Promise<CategoryEntry[]> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (error || !data) return [];

  return data.map((item: DBCategoryItem) => ({
    slug: item.slug,
    label: item.name,
    count: item.content_count ?? 0,
    desc: item.description ?? "",
  }));
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

export async function fetchItemById(id: string | number): Promise<FeedItem | null> {
  const idNum = Number(id);
  if (isNaN(idNum)) return null;

  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from("contents")
    .select(`
      id, title, description, url, image_url, votes, created_at, install_guide, target_roles,
      categories ( slug, name ),
      profiles!contents_user_id_fkey ( name )
    `)
    .eq("id", idNum)
    .single();

  if (error || !data) return null;

  const categoryInfo = Array.isArray(data.categories)
    ? data.categories[0]
    : (data.categories as { slug: string; name: string } | null);

  const profileInfo = Array.isArray(data.profiles)
    ? data.profiles[0]
    : (data.profiles as { name: string } | null);

  return {
    id: data.id,
    cat:     categoryInfo?.name    ?? "",
    catSlug: categoryInfo?.slug    ?? "",
    title:   data.title,
    desc:    data.description         ?? "",
    url:     data.url                 ?? undefined,
    imageUrl: data.image_url           ?? undefined,
    votes:   data.votes               ?? 0,
    author:  profileInfo?.name      ?? "anonymous",
    time:    timeAgo(data.created_at),
    hot:     (data.votes ?? 0) > 300,
    installGuide: (data as unknown as DBContentItem).install_guide ?? undefined,
    targetRoles: (data as unknown as DBContentItem).target_roles ?? [],
  };
}

export async function searchItems(q: string): Promise<FeedItem[]> {
  const supabase = await getSupabase();
  
  const { data, error } = await supabase
    .from("contents")
    .select(`
      id, title, description, url, image_url, votes, created_at, install_guide, target_roles,
      categories ( slug, name ),
      profiles!contents_user_id_fkey ( name )
    `)
    .or(`title.ilike.%${q}%,description.ilike.%${q}%`)
    .order("votes", { ascending: false });

  if (error || !data) return [];

  return data.map((item: DBContentItem) => {
    const categoryInfo = Array.isArray(item.categories)
      ? item.categories[0]
      : (item.categories as { slug: string; name: string } | null);

    const profileInfo = Array.isArray(item.profiles)
      ? item.profiles[0]
      : (item.profiles as { name: string } | null);

    return {
      id: item.id,
      cat:     categoryInfo?.name    ?? "",
      catSlug: categoryInfo?.slug    ?? "",
      title:   item.title,
      desc:    item.description         ?? "",
      url:     item.url                 ?? undefined,
      imageUrl: item.image_url           ?? undefined,
      votes:   item.votes               ?? 0,
      author:  profileInfo?.name      ?? "anonymous",
      time:    timeAgo(item.created_at),
      hot:     (item.votes ?? 0) > 300,
      installGuide: item.install_guide  ?? undefined,
      targetRoles: item.target_roles    ?? [],
    };
  });
}

export async function fetchCollections(): Promise<CollectionEntry[]> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from("collections")
    .select(`
      id, title, description, created_at,
      profiles ( name ),
      collections_contents ( content_id )
    `);

  if (error || !data) return [];

  return data.map((col: DBCollectionItem) => {
    const profileInfo = Array.isArray(col.profiles)
      ? col.profiles[0]
      : (col.profiles as { name: string } | null);

    return {
      id: col.id,
      title: col.title,
      desc: col.description ?? "",
      count: col.collections_contents?.length ?? 0,
      author: profileInfo?.name ?? "anonymous",
      updated: timeAgo(col.created_at),
      itemIds: col.collections_contents?.map((cc: { content_id: number }) => cc.content_id) ?? [],
    };
  });
}

export async function fetchCollectionById(id: string | number): Promise<CollectionEntry | null> {
  const idNum = Number(id);
  if (isNaN(idNum)) return null;

  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from("collections")
    .select(`
      id, title, description, created_at,
      profiles ( name ),
      collections_contents ( content_id )
    `)
    .eq("id", idNum)
    .single();

  if (error || !data) return null;

  const profileInfo = Array.isArray(data.profiles)
    ? data.profiles[0]
    : (data.profiles as { name: string } | null);

  return {
    id: data.id,
    title: data.title,
    desc: data.description ?? "",
    count: data.collections_contents?.length ?? 0,
    author: profileInfo?.name ?? "anonymous",
    updated: timeAgo(data.created_at),
    itemIds: data.collections_contents?.map((cc: { content_id: number }) => cc.content_id) ?? [],
  };
}

export async function fetchStats() {
  const supabase = await getSupabase();

  const { count: totalContents } = await supabase
    .from("contents")
    .select("*", { count: "exact", head: true });

  const { count: totalCategories } = await supabase
    .from("categories")
    .select("*", { count: "exact", head: true });

  const { count: totalCollections } = await supabase
    .from("collections")
    .select("*", { count: "exact", head: true });

  return {
    totalContents: totalContents ?? 0,
    totalCategories: totalCategories ?? 0,
    totalCollections: totalCollections ?? 0,
  };
}
