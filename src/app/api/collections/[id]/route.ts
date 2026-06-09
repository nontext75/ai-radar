import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getAdminClient } from "@/lib/supabase/admin";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const idNum = Number(id);
  if (isNaN(idNum)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const supabase = getAdminClient();
  const body = await req.json();

  // metadata update
  if (body.title || body.description !== undefined) {
    const updates: Record<string, string> = {};
    if (body.title) updates.title = body.title;
    if (body.description !== undefined) updates.description = body.description;

    const { error } = await supabase
      .from("collections")
      .update(updates as never)
      .eq("id", idNum)
      .eq("user_id", session.user.id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // add/remove items
  if (body.addItem !== undefined) {
    const { error } = await supabase
      .from("collections_contents")
      .insert({ collection_id: idNum, content_id: body.addItem } as never);
    if (error && !error.message.includes("duplicate")) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  if (body.removeItem !== undefined) {
    await supabase
      .from("collections_contents")
      .delete()
      .eq("collection_id", idNum)
      .eq("content_id", body.removeItem);
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const idNum = Number(id);
  if (isNaN(idNum)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const supabase = getAdminClient();
  const { error } = await supabase
    .from("collections")
    .delete()
    .eq("id", idNum)
    .eq("user_id", session.user.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
