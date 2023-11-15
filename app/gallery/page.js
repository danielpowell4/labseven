"use server";

import { Suspense } from "react";
import InfiniteScroll from "./InfiniteScroll";
import styles from "./gallery.module.css";
import { sql } from "@vercel/postgres";

async function GalleryPage() {
  const origin =
    process.env.VERCEL_ENV === "development"
      ? "http://localhost:3000"
      : "https://labseven.co";

  const firstPage = await fetch(`${origin}/api/project/list`, {
    next: { tags: ["projects"], revalidate: 3600 },
  }).then((res) => res.json());

  if (!firstPage.items.length) {
    return <div>No projects found. Come back soon!</div>;
  }

  return <InfiniteScroll firstPage={firstPage} />;
}

export async function generateMetadata() {
  let images = {};
  const { rows } =
    await sql`SELECT projects.* FROM projects ORDER BY created_at DESC LIMIT 1`;
  const mostRecentProject = rows[0];

  if (mostRecentProject) {
    const imgUrl = mostRecentProject?.primary_blob_url;
    const resizedImg = `https://labseven.co/_next/image?url==${encodeURIComponent(
      imgUrl
    )}&w=400&q=75`;

    images = {
      "og:image": resizedImg,
      "twitter:image": resizedImg,
    };
  }

  return {
    title: "Featured T-Shirt Designs Gallery | Lab Seven Screen Printing Co.",
    description:
      "Explore our Featured Work in the Gallery at Lab Seven Screen Printing Co. - Denver's top destination for custom t-shirt printing and design. Discover a diverse range of custom tees, showcasing our expertise in screen printing, graphic design, and embroidery. Whether you're inspired to create your own design in our studio or collaborate with our talented artists, this gallery exemplifies the creativity and quality we bring to every custom tee project in Colorado.",
    keywords: [
      "Lab Seven Screen Printing",
      "Denver T-shirt Printing",
      "Custom Tees",
      "Screen Printing Gallery",
      "Graphic Design",
      "Embroidery",
      "T-shirt Design Studio",
      "Custom Apparel",
      "Featured T-shirt Designs",
    ],
    ...images,
  };
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
      <Suspense fallback={<GallerySkeleton />}>
        <GalleryPage />
      </Suspense>
    </main>
  );
}
