import { NextResponse } from "next/server";
import { del, list } from "@vercel/blob";

export async function GET(_request) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "This route is dev-only" },
      { status: 401 }
    );
  }

  try {
    let hasMore = true;
    let cursor;
    let allBlobs = [];

    while (hasMore) {
      const listResult = await list({
        cursor,
      });
      allBlobs = allBlobs.concat(listResult.blobs);
      hasMore = listResult.hasMore;
      cursor = listResult.cursor;
    }

    for (const blob of allBlobs) {
      console.log("deleting", blob.url);
      await del(blob.url);
    }

    return NextResponse.json({ result: "ok" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
