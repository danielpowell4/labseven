import { sql } from "@vercel/postgres";
import Image from "next/image";

import styles from "app/admin/admin.module.css";
import { LinkButton } from "components";

import RemoveForm from "./form/RemoveForm";

export default async function ProjectTable() {
  const { rows } = await sql`SELECT * from projects ORDER BY projects.id DESC`;

  if (!rows.length) {
    return <div>No projects found.</div>;
  }

  return (
    <table className={styles.adminTable}>
      <thead>
        <tr>
          <th>{/* actions */}</th>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Primary Image</th>
          <th>Hover Image</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id}>
            <td style={{ width: "7rem", paddingRight: "1rem" }}>
              <span
                style={{
                  display: "inline-flex",
                  gap: "0.5rem",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <LinkButton href={`/admin/projects/${row.id}/edit`}>
                  Edit
                </LinkButton>
                <RemoveForm projectId={row.id} />
              </span>
            </td>
            <td>{row.id}</td>
            <td>{row.name}</td>
            <td>{row.description ?? "-"}</td>
            <td>
              <Image src={row.primary_blob_url} width={80} height={80} />
            </td>
            <td>
              <Image src={row.secondary_blob_url} width={80} height={80} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
