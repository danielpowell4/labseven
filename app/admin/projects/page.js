import ProjectTable from "./table";
import { LinkButton } from "components";

export const dynamic = "force-dynamic";

export default async function ProjectsIndexPage() {
  return (
    <>
      <header style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <h2>Projects</h2>
        <LinkButton href="/admin/projects/new">+ New</LinkButton>
        <LinkButton href="/admin/projects/gallery">Demo Gallery</LinkButton>
      </header>
      <ProjectTable />
    </>
  );
}
