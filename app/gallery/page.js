"use server";

import { Suspense } from "react";
import InfiniteScroll from "./InfiniteScroll";
import styles from "./gallery.module.css";

async function GalleryPage() {
  const origin =
    process.env.VERCEL_ENV === "development"
      ? "http://localhost:3000"
      : "https://labseven.co";

  const firstPage = await fetch(`${origin}/api/project/list`, {
    next: { tags: ["projects"] },
  }).then((res) => res.json());

  if (!firstPage.items.length) {
    return <div>No projects found. Come back soon!</div>;
  }

  return <InfiniteScroll firstPage={firstPage} />;
}

function GallerySkeleton() {
  const blankProjects = Array.from({ length: 9 }, (_, i) => ({ id: i }));

  return (
    <ul className={styles.galleryGrid}>
      {blankProjects.map((project) => {
        return (
          <li
            key={project.id}
            className={[
              styles.galleryGrid__item,
              styles.galleryGrid__itemSkeleton,
            ].join(" ")}
          ></li>
        );
      })}
    </ul>
  );
}

export default async function GalleryPageWrapper() {
  return (
    <main className={styles.main}>
      <h2>Our Work</h2>
      <Suspense fallback={<GallerySkeleton />}>
        <GalleryPage />
      </Suspense>
    </main>
  );
}
