"use server";

import { sql } from "@vercel/postgres";
import Image from "next/image";
import Link from "next/link";

import styles from "../gallery.module.css";

export default async function OtherProjects({ project }) {
  // Fetch up to 3 previous projects
  const { rows: prevProjects } =
    await sql`SELECT * FROM projects WHERE id < ${project.id} ORDER BY projects.id DESC LIMIT 3`;

  // Determine how many next projects to fetch
  const numPrevProjects = prevProjects.length;
  const numNextProjectsToFetch = 6 - numPrevProjects;

  // Fetch the next projects, number depends on how many previous projects were found
  const { rows: nextProjects } =
    await sql`SELECT * FROM projects WHERE id > ${project.id} ORDER BY projects.id ASC LIMIT ${numNextProjectsToFetch}`;

  // If you need them in ascending order
  prevProjects.reverse();

  // Combine the two arrays
  const otherProjects = prevProjects.concat(nextProjects);

  return (
    <ul className={styles.otherProjectGallery}>
      {otherProjects.map((project) => (
        <li key={project.id} className={styles.otherProjectGallery__item}>
          <Link href={`/gallery/${project.slug}`}>
            <Image
              src={project.primary_blob_url}
              alt={project.name}
              width={100}
              height={150}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export async function OtherProjectsSkeleton() {
  const blankProjects = Array.from({ length: 6 });

  return (
    <ul className={styles.otherProjectGallery} role="status" aria-live="polite">
      {blankProjects.map((_, index) => (
        <li
          aria-label={`Loading project ${index + 1}`}
          key={index}
          className={[
            styles.otherProjectGallery__item,
            styles.otherProjectGallery__itemSkeleton,
          ]}
        />
      ))}
    </ul>
  );
}
