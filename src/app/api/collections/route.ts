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
    .from("collections")
    .select(`
      id, title, description, created_at,
      collections_contents(count)
    `)
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const cols = (data ?? []).map((c: Record<string, unknown>) => ({
    id: c.id,
    title: c.title,
    desc: c.description,
    count: (c.collections_contents as { count: number } | null)?.count ?? 0,
    created: timeAgo(c.created_at as string),
  }));

  return NextResponse.json({ data: cols });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, description } = await req.json();
  if (!title || typeof title !== "string") {
    return NextResponse.json({ error: "title is required" }, { status: 400 });
  }

  const supabase = getAdminClient();
  const { data, error } = await supabase
    .from("collections")
    .insert({ title, description: description ?? "", user_id: session.user.id } as never)
    .select("id, title, description, created_at")
    .single();

  if (error || !data) {
    return NextResponse.json({ error: error?.message ?? "Failed" }, { status: 500 });
  }

  const row = data as unknown as { id: number; title: string; description: string; created_at: string };
  return NextResponse.json({
    data: {
      id: row.id,
      title: row.title,
      description: row.description,
      created: timeAgo(row.created_at),
      count: 0,
    },
  });
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
