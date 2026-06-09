import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getAdminClient();
  const { data, error } = await supabase
    .from("bookmarks")
    .select(`
      content_id,
      contents!inner(
        id, title, description, url, image_url, votes, created_at,
        categories!inner(slug, name),
        profiles!contents_user_id_fkey(name)
      )
    `)
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const items = data.map((b: Record<string, unknown>) => {
    const c = b.contents as Record<string, unknown>;
    const cat = Array.isArray(c.categories) ? (c.categories as Record<string, unknown>[])[0] : (c.categories as Record<string, unknown>);
    const prof = Array.isArray(c.profiles) ? (c.profiles as Record<string, unknown>[])[0] : (c.profiles as Record<string, unknown>);
    return {
      id: c.id,
      title: c.title,
      desc: c.description,
      url: c.url,
      imageUrl: c.image_url,
      votes: c.votes,
      cat: cat?.name ?? "",
      catSlug: cat?.slug ?? "",
      author: prof?.name ?? "anonymous",
      time: timeAgo(c.created_at as string),
    };
  });

  return NextResponse.json({ data: items });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { contentId } = await req.json();
  if (!contentId || typeof contentId !== "number") {
    return NextResponse.json({ error: "contentId is required" }, { status: 400 });
  }

  const supabase = getAdminClient();

  const { data: existing } = await supabase
    .from("bookmarks")
    .select("content_id")
    .eq("user_id", session.user.id)
    .eq("content_id", contentId)
    .maybeSingle();

  if (existing) {
    await supabase
      .from("bookmarks")
      .delete()
      .eq("user_id", session.user.id)
      .eq("content_id", contentId);
    return NextResponse.json({ bookmarked: false });
  }

  await supabase.from("bookmarks").insert({
    user_id: session.user.id,
    content_id: contentId,
  } as never);
  return NextResponse.json({ bookmarked: true });
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
