import { NextResponse } from "next/server";
import { getProjectsPage } from "lib/projects";

export async function GET(request) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const cursor = searchParams?.get("cursor");
  const limit = searchParams?.get("limit") ?? 9;

  try {
    const { items, nextCursor } = await getProjectsPage(cursor, limit);
    return NextResponse.json({ items, nextCursor }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
