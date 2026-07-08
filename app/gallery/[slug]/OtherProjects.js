"use server";

import { getAdjacentProjects } from "lib/projects";
import Image from "next/image";
import Link from "next/link";

import styles from "../gallery.module.css";

export default async function OtherProjects({ project }) {
  const otherProjects = await getAdjacentProjects(project.id);

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
          ].join(" ")}
        />
      ))}
    </ul>
  );
}
