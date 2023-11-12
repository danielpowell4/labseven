"use server";

import { sql } from "@vercel/postgres";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function PageWrapper({ params: { slug } }) {
  const { rows } = await sql`SELECT * from projects WHERE slug = ${slug}`;
  const project = rows[0];
  if (!project) {
    return notFound();
  }

  const nextProjectQuery =
    await sql`SELECT * from projects WHERE id > ${project.id} ORDER BY projects.id ASC LIMIT 1`;
  const nextProject = nextProjectQuery.rows?.[0];
  const prevProjectQuery =
    await sql`SELECT * from projects WHERE id < ${project.id} ORDER BY projects.id ASC LIMIT 1`;
  const prevProject = prevProjectQuery.rows?.[0];

  return (
    <>
      <h2>Project {slug}</h2>
      <pre>{JSON.stringify(project, null, 2)}</pre>

      <Link
        href={prevProject ? `/gallery/${prevProject.slug}` : "#"}
        disabled={!prevProject}
      >
        Previous
      </Link>
      <Link
        href={nextProject ? `/gallery/${nextProject.slug}` : "#"}
        disabled={!nextProject}
      >
        Next
      </Link>
    </>
  );
}
