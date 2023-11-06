import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(_request) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "This route is dev-only" },
      { status: 401 }
    );
  }

  try {
    const result = await sql`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        description TEXT,
        primary_blob_url VARCHAR(255),
        secondary_blob_url VARCHAR(255),
        created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
