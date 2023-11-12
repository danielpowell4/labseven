import { sql } from "@vercel/postgres";
import Image from "next/image";
import Link from "next/link";

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
          <th>
            Name
            <br />
            URL Slug
          </th>
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
                <LinkButton href={`/gallery/${row.slug}`}>View</LinkButton>
                <LinkButton href={`/admin/projects/${row.id}/edit`}>
                  Edit
                </LinkButton>
                <RemoveForm projectId={row.id} />
              </span>
            </td>
            <td>{row.id}</td>
            <td>
              {row.name}
              <br />
              {row.slug}
              {Boolean(row.product_path) && (
                <>
                  <br />
                  <Link href={row.product_path}>View Linked Product</Link>
                </>
              )}
            </td>
            <td>{row.description?.substring(0, 120) ?? "-"}</td>
            <td>
              <Image src={row.primary_blob_url} width={123} height={185} />
            </td>
            <td>
              <Image src={row.secondary_blob_url} width={123} height={185} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
