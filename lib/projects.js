import { sql } from "@vercel/postgres";
import { unstable_cache } from "next/cache";

// Writes are rare (admin-only, a handful per month) and every write action
// calls revalidateTag("projects"), so we can cache reads aggressively.
const CACHE_OPTIONS = { tags: ["projects"], revalidate: 21600 }; // 6 hours

export const getProjectsPage = unstable_cache(
  async (cursor, limit) => {
    const queryRes = cursor
      ? await sql`SELECT * from projects WHERE projects.id < ${cursor} ORDER BY projects.id DESC LIMIT ${limit}`
      : await sql`SELECT * from projects ORDER BY projects.id DESC LIMIT ${limit}`;

    const items = queryRes?.rows ?? [];
    const nextCursor = items.length === limit ? items[limit - 1]?.id : null;

    return { items, nextCursor };
  },
  ["projects-page"],
  CACHE_OPTIONS
);

export const getProjectBySlug = unstable_cache(
  async (slug) => {
    const { rows } = await sql`SELECT * from projects WHERE slug = ${slug}`;
    return rows[0] ?? null;
  },
  ["project-by-slug"],
  CACHE_OPTIONS
);

export const getAdjacentProjects = unstable_cache(
  async (projectId) => {
    const { rows: prevProjects } =
      await sql`SELECT * FROM projects WHERE id < ${projectId} ORDER BY projects.id DESC LIMIT 3`;

    const numNextProjectsToFetch = 6 - prevProjects.length;
    const { rows: nextProjects } =
      await sql`SELECT * FROM projects WHERE id > ${projectId} ORDER BY projects.id ASC LIMIT ${numNextProjectsToFetch}`;

    prevProjects.reverse();

    return prevProjects.concat(nextProjects);
  },
  ["project-adjacent"],
  CACHE_OPTIONS
);

export const getMostRecentProject = unstable_cache(
  async () => {
    const { rows } =
      await sql`SELECT projects.* FROM projects ORDER BY created_at DESC LIMIT 1`;
    return rows[0] ?? null;
  },
  ["project-most-recent"],
  CACHE_OPTIONS
);

export const getAllProjectsForSitemap = unstable_cache(
  async () => {
    const { rows } = await sql`SELECT * FROM projects`;
    return rows;
  },
  ["projects-all"],
  CACHE_OPTIONS
);
