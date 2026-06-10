import { NextRequest, NextResponse } from "next/server";
import { fetchItems } from "@/lib/fetch-data";
import { auth } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sort = searchParams.get("sort") ?? "latest";
  const limit = Math.min(Number(searchParams.get("limit")) || 10, 50);

  try {
    const data = await fetchItems(sort as "trending" | "latest", limit);
    return NextResponse.json({ data });
  } catch (error) {
    console.error("API /contents error:", error);
    return NextResponse.json({ error: "Failed to fetch contents" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, description, url, categorySlug, tags } = body;

    if (!title || !url || !categorySlug) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const supabase = await createClient();

    // 1. 카테고리 정보 조회 (slug -> id)
    const { data: catData, error: catError } = await supabase
      .from("categories")
      .select("id, content_count")
      .eq("slug", categorySlug)
      .single();

    if (catError || !catData) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    // 2. 콘텐츠 테이블에 삽입
    const { data: newContent, error: insertError } = await supabase
      .from("contents")
      .insert({
        title,
        description,
        url,
        category_id: catData.id,
        user_id: session.user.id,
      })
      .select()
      .single();

    if (insertError || !newContent) {
      console.error("Failed to insert content:", insertError);
      return NextResponse.json({ error: "Failed to create resource" }, { status: 500 });
    }

    // 3. 태그 처리 (태그가 존재한다면)
    if (tags && Array.isArray(tags) && tags.length > 0) {
      for (const tagName of tags) {
        const trimmedTagName = tagName.trim();
        if (!trimmedTagName) continue;

        // 태그 조회 혹은 생성
        let { data: tagData } = await supabase
          .from("tags")
          .select("id")
          .eq("name", trimmedTagName)
          .single();

        if (!tagData) {
          const { data: createdTag, error: tagCreateError } = await supabase
            .from("tags")
            .insert({ name: trimmedTagName })
            .select("id")
            .single();

          if (!tagCreateError && createdTag) {
            tagData = createdTag;
          }
        }

        if (tagData) {
          await supabase
            .from("contents_tags")
            .insert({
              content_id: newContent.id,
              tag_id: tagData.id,
            });
        }
      }
    }

    // 4. 카테고리의 content_count 증가
    await supabase
      .from("categories")
      .update({ content_count: (catData.content_count ?? 0) + 1 })
      .eq("id", catData.id);

    return NextResponse.json({ data: newContent });
  } catch (error) {
    console.error("API POST /contents error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
