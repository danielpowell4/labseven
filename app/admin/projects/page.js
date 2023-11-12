import { sql } from "@vercel/postgres";
import ProjectTable from "./table";
import { LinkButton } from "components";

export const dynamic = "force-dynamic";

export default async function ProjectsIndexPage() {
  const { rows } = await sql`SELECT COUNT(*) AS count FROM projects`;
  const count = rows[0]?.count ?? 0;

  return (
    <>
      <header style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <h2>Projects</h2>
        <LinkButton href="/admin/projects/new">+ New</LinkButton>
        <LinkButton href="/gallery">View Gallery</LinkButton>
      </header>
      <p>{count} active projects.</p>
      <hr />
      <ProjectTable />
    </>
  );
}
