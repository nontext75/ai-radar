import { NextResponse } from "next/server";
import { fetchCategories } from "@/lib/fetch-data";

export async function GET() {
  try {
    const data = await fetchCategories();
    return NextResponse.json({ data });
  } catch (error) {
    console.error("API /categories error:", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}
