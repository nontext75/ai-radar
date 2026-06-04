import { NextRequest, NextResponse } from "next/server";
import { fetchItems } from "@/lib/fetch-data";

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
